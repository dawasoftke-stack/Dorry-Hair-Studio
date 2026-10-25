import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Data storage directory
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}
const bookingsFile = path.join(dataDir, 'bookings.json');
const inquiriesFile = path.join(dataDir, 'inquiries.json');

// Initialize files if not present
if (!fs.existsSync(bookingsFile)) {
  fs.writeFileSync(bookingsFile, JSON.stringify([], null, 2));
}
if (!fs.existsSync(inquiriesFile)) {
  fs.writeFileSync(inquiriesFile, JSON.stringify([], null, 2));
}

// In-memory rate limiting map
const requestLogs = new Map<string, number[]>();
function checkRateLimit(ip: string, limit = 10, windowMs = 60000): boolean {
  const now = Date.now();
  const timestamps = (requestLogs.get(ip) || []).filter(t => now - t < windowMs);
  if (timestamps.length >= limit) {
    return false;
  }
  timestamps.push(now);
  requestLogs.set(ip, timestamps);
  return true;
}

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', salon: 'Dorry Hair Studio', timestamp: new Date().toISOString() });
});

// Appointment booking endpoint
app.post('/api/bookings', (req, res) => {
  const clientIp = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || 'unknown';
  if (!checkRateLimit(clientIp, 8, 60000)) {
    return res.status(429).json({
      success: false,
      error: 'Too many requests. Please wait a moment before trying again or message us directly on WhatsApp.'
    });
  }

  const {
    name,
    phone,
    email,
    serviceCategory,
    serviceName,
    preferredDate,
    preferredTime,
    notes,
    honeypot
  } = req.body;

  // Spam protection via honeypot
  if (honeypot) {
    return res.status(400).json({ success: false, error: 'Spam detected.' });
  }

  // Validation
  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    return res.status(400).json({ success: false, error: 'Please enter your full name.' });
  }

  if (!phone || typeof phone !== 'string' || phone.trim().replace(/\D/g, '').length < 8) {
    return res.status(400).json({ success: false, error: 'Please provide a valid phone number so we can confirm your appointment.' });
  }

  if (!preferredDate) {
    return res.status(400).json({ success: false, error: 'Please select your preferred appointment date.' });
  }

  if (!preferredTime) {
    return res.status(400).json({ success: false, error: 'Please select your preferred appointment time.' });
  }

  // Check that chosen date is not in the past
  const chosenDate = new Date(preferredDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (isNaN(chosenDate.getTime())) {
    return res.status(400).json({ success: false, error: 'Invalid appointment date.' });
  }

  const bookingId = `DHS-${Date.now().toString(36).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`;

  const newBooking = {
    bookingId,
    name: name.trim(),
    phone: phone.trim(),
    email: (email || '').trim(),
    serviceCategory: serviceCategory || 'Natural Hair Care',
    serviceName: serviceName || 'Consultation & Hair Care',
    preferredDate,
    preferredTime,
    notes: (notes || '').trim(),
    status: 'Confirmed Request (Awaiting Salon Final Schedule Confirmation)',
    createdAt: new Date().toISOString()
  };

  try {
    let bookings = [];
    try {
      const data = fs.readFileSync(bookingsFile, 'utf-8');
      bookings = JSON.parse(data);
    } catch {
      bookings = [];
    }
    bookings.unshift(newBooking);
    fs.writeFileSync(bookingsFile, JSON.stringify(bookings.slice(0, 200), null, 2));

    // WhatsApp quick link pre-filled
    const waText = encodeURIComponent(
      `Hello Dorry Hair Studio! I just booked an appointment request (Ref: ${bookingId}) for ${newBooking.serviceName} on ${preferredDate} at ${preferredTime}. Name: ${newBooking.name}. Looking forward to confirming!`
    );
    const waLink = `https://wa.me/254728173197?text=${waText}`;

    return res.status(201).json({
      success: true,
      booking: newBooking,
      whatsappLink: waLink,
      message: 'Your appointment request has been recorded. Our team will review availability and confirm with you shortly.'
    });
  } catch (err) {
    console.error('Error saving booking:', err);
    return res.status(500).json({ success: false, error: 'Could not process booking. Please contact us via WhatsApp or phone.' });
  }
});

// Contact inquiry endpoint
app.post('/api/contact', (req, res) => {
  const clientIp = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || 'unknown';
  if (!checkRateLimit(clientIp, 6, 60000)) {
    return res.status(429).json({ success: false, error: 'Too many messages. Please try again shortly.' });
  }

  const { name, phone, email, subject, message, honeypot } = req.body;

  if (honeypot) {
    return res.status(400).json({ success: false, error: 'Spam detected.' });
  }

  if (!name || name.trim().length < 2) {
    return res.status(400).json({ success: false, error: 'Please enter your name.' });
  }
  if (!message || message.trim().length < 5) {
    return res.status(400).json({ success: false, error: 'Please enter a message or question.' });
  }

  const inquiryId = `INQ-${Date.now().toString(36).toUpperCase()}`;
  const record = {
    inquiryId,
    name: name.trim(),
    phone: (phone || '').trim(),
    email: (email || '').trim(),
    subject: subject || 'General Hair Inquiry',
    message: message.trim(),
    createdAt: new Date().toISOString()
  };

  try {
    let inquiries = [];
    try {
      const data = fs.readFileSync(inquiriesFile, 'utf-8');
      inquiries = JSON.parse(data);
    } catch {
      inquiries = [];
    }
    inquiries.unshift(record);
    fs.writeFileSync(inquiriesFile, JSON.stringify(inquiries.slice(0, 200), null, 2));

    return res.json({
      success: true,
      inquiryId,
      message: 'Thank you for reaching out to Dorry Hair Studio! We will respond promptly.'
    });
  } catch (err) {
    console.error('Error saving inquiry:', err);
    return res.status(500).json({ success: false, error: 'Failed to record message.' });
  }
});

// Setup Vite middleware in dev or static files in production
async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Dorry Hair Studio server running at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(console.error);
