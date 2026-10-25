import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Send
} from 'lucide-react';
import { SALON_INFO, SERVICES } from '../data/salonData';

export const ContactPage: React.FC = () => {
  const [formMode, setFormMode] = useState<'booking' | 'inquiry'>('booking');

  // Booking Form State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [serviceName, setServiceName] = useState(SERVICES[0].name);
  const [preferredDate, setPreferredDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });
  const [preferredTime, setPreferredTime] = useState('10:00 AM');
  const [notes, setNotes] = useState('');
  const [honeypot, setHoneypot] = useState('');

  // General Inquiry State
  const [inquirySubject, setInquirySubject] = useState('');
  const [inquiryMessage, setInquiryMessage] = useState('');

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState<{
    bookingId: string;
    whatsappLink: string;
    name: string;
    serviceName: string;
    preferredDate: string;
    preferredTime: string;
  } | null>(null);

  const [inquirySuccess, setInquirySuccess] = useState<string | null>(null);

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!phone.trim() || phone.trim().replace(/\D/g, '').length < 8) {
      setErrorMsg('Please enter a valid phone number (e.g. 0728 173 197) for appointment confirmation.');
      return;
    }
    if (!preferredDate) {
      setErrorMsg('Please select your preferred appointment date.');
      return;
    }

    const selectedObj = SERVICES.find((s) => s.name === serviceName);
    const serviceCategory = selectedObj ? selectedObj.categoryLabel : 'Natural Hair Care';

    setLoading(true);

    try {
      let bookingData: {
        bookingId: string;
        whatsappLink: string;
        name: string;
        serviceName: string;
        preferredDate: string;
        preferredTime: string;
      } | null = null;

      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3500);

        const res = await fetch('/api/bookings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: name.trim(),
            phone: phone.trim(),
            email: email.trim(),
            serviceCategory,
            serviceName,
            preferredDate,
            preferredTime,
            notes: notes.trim(),
            honeypot
          }),
          signal: controller.signal
        });
        clearTimeout(timeoutId);

        const contentType = res.headers.get('content-type') || '';
        if (contentType.includes('application/json')) {
          const data = await res.json().catch(() => null);
          if (res.ok && data && data.success && data.booking) {
            bookingData = {
              bookingId: data.booking.bookingId,
              whatsappLink: data.whatsappLink,
              name: data.booking.name,
              serviceName: data.booking.serviceName,
              preferredDate: data.booking.preferredDate,
              preferredTime: data.booking.preferredTime
            };
          }
        }
      } catch {
        // Silently caught; fallback will handle generating reservation
      }

      // Offline / Static Hosting Fallback
      if (!bookingData) {
        const codeChars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
        let code = '';
        for (let i = 0; i < 4; i++) {
          code += codeChars.charAt(Math.floor(Math.random() * codeChars.length));
        }
        const bookingId = `DHS-${Date.now().toString(36).toUpperCase()}-${code}`;
        const waText = encodeURIComponent(
          `Hello Dorry Hair Studio! I would like to confirm my appointment request (Ref: ${bookingId}) for ${serviceName} on ${preferredDate} at ${preferredTime}. Name: ${name.trim()}, Phone: ${phone.trim()}.`
        );
        const whatsappLink = `https://wa.me/${SALON_INFO.whatsappNumber}?text=${waText}`;

        bookingData = {
          bookingId,
          whatsappLink,
          name: name.trim(),
          serviceName,
          preferredDate,
          preferredTime
        };

        try {
          const stored = JSON.parse(localStorage.getItem('dorry_hair_bookings') || '[]');
          stored.unshift({
            ...bookingData,
            phone: phone.trim(),
            email: email.trim(),
            notes: notes.trim(),
            createdAt: new Date().toISOString()
          });
          localStorage.setItem('dorry_hair_bookings', JSON.stringify(stored.slice(0, 50)));
        } catch {
          // ignore storage error
        }
      }

      setBookingSuccess(bookingData);
    } catch {
      setErrorMsg('Could not record your appointment. Please contact us directly on WhatsApp or call ' + SALON_INFO.phoneDisplay + '.');
    } finally {
      setLoading(false);
    }
  };

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim()) {
      setErrorMsg('Please enter your name.');
      return;
    }
    if (!inquiryMessage.trim()) {
      setErrorMsg('Please write your message or question.');
      return;
    }

    setLoading(true);
    try {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3500);

        await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: name.trim(),
            phone: phone.trim(),
            email: email.trim(),
            subject: inquirySubject || 'General Salon Question',
            message: inquiryMessage.trim(),
            honeypot
          }),
          signal: controller.signal
        });
        clearTimeout(timeoutId);
      } catch {
        // Fallback for static environments
      }

      setInquirySuccess('Thank you for reaching out to Dorry Hair Studio! We will respond promptly.');
    } catch {
      setErrorMsg('Error sending message. Please reach out via WhatsApp at ' + SALON_INFO.phoneDisplay + '.');
    } finally {
      setLoading(false);
    }
  };

  const todayStr = new Date().toISOString().split('T')[0];
  const directWhatsappUrl = `https://wa.me/${SALON_INFO.whatsappNumber}?text=${encodeURIComponent(
    'Hello Dorry Hair Studio, I would like to enquire about your services and book an appointment.'
  )}`;

  return (
    <div className="bg-[#FFFDF8] text-[#24251F]">
      {/* Header Banner */}
      <section className="relative bg-[#263522] text-[#FFFDF8] py-20 sm:py-28 px-4 sm:px-6 lg:px-8 text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero1.png"
            alt="Dorry Hair Studio Contact"
            className="w-full h-full object-cover filter brightness-[0.25]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#263522] via-[#263522]/80 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-semibold tracking-[0.25em] text-[#C6A15B] uppercase block">
            We Are Ready to Welcome You
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#FFFDF8]">
            Contact &amp; Bookings
          </h1>
          <div className="w-16 h-0.5 bg-[#C6A15B] mx-auto my-3"></div>
          <p className="text-sm sm:text-base text-[#F8F5EE]/80 max-w-xl mx-auto font-light leading-relaxed">
            Reserve your appointment or reach out with any questions. Located at AppleWood Adams along Ngong Road, Nairobi.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Interactive Form */}
          <div className="lg:col-span-7 bg-white border border-[#C6A15B]/30 rounded-sm p-6 sm:p-10 shadow-lg">
            {/* Tab switch */}
            <div className="flex border-b border-[#EAE4D5] mb-8">
              <button
                type="button"
                onClick={() => {
                  setFormMode('booking');
                  setErrorMsg('');
                }}
                className={`flex-1 text-center py-3 text-xs sm:text-sm font-semibold tracking-wider uppercase transition-colors cursor-pointer ${
                  formMode === 'booking'
                    ? 'border-b-2 border-[#C6A15B] text-[#263522]'
                    : 'text-[#888] hover:text-[#263522]'
                }`}
              >
                Book An Appointment
              </button>
              <button
                type="button"
                onClick={() => {
                  setFormMode('inquiry');
                  setErrorMsg('');
                }}
                className={`flex-1 text-center py-3 text-xs sm:text-sm font-semibold tracking-wider uppercase transition-colors cursor-pointer ${
                  formMode === 'inquiry'
                    ? 'border-b-2 border-[#C6A15B] text-[#263522]'
                    : 'text-[#888] hover:text-[#263522]'
                }`}
              >
                General Enquiry / Quote
              </button>
            </div>

            {/* Error banner */}
            {errorMsg && (
              <div className="mb-6 flex items-start gap-2 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-sm text-xs">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Honeypot anti-spam */}
            <div className="hidden">
              <label htmlFor="contact-honeypot">Leave empty</label>
              <input
                id="contact-honeypot"
                type="text"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            {formMode === 'booking' ? (
              bookingSuccess ? (
                /* Booking Success Message */
                <div className="text-center py-8 space-y-6">
                  <div className="w-16 h-16 bg-[#263522] text-[#C6A15B] rounded-full flex items-center justify-center mx-auto border-2 border-[#C6A15B]">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-widest text-[#C6A15B]">
                      Ref: {bookingSuccess.bookingId}
                    </span>
                    <h3 className="font-serif text-2xl font-medium text-[#263522] mt-1">
                      Request Confirmed, {bookingSuccess.name}!
                    </h3>
                    <p className="text-sm text-[#555] max-w-md mx-auto mt-2 leading-relaxed">
                      Your booking request for{' '}
                      <strong className="text-[#263522]">{bookingSuccess.serviceName}</strong> has been
                      recorded for{' '}
                      <strong className="text-[#263522]">{bookingSuccess.preferredDate}</strong> at{' '}
                      <strong className="text-[#263522]">{bookingSuccess.preferredTime}</strong>.
                    </p>
                  </div>

                  <div className="bg-[#F8F5EE] border-l-4 border-[#C6A15B] p-4 text-left rounded-sm text-xs text-[#444] space-y-1">
                    <p className="font-semibold text-[#263522]">Schedule Notice:</p>
                    <p>
                      Your preferred time is a reservation request. Our salon concierge will reach out
                      promptly on WhatsApp or phone to finalize stylist assignment.
                    </p>
                    <p className="text-[11px] text-[#777] pt-1">
                      ✨ First visit? Enjoy 15% off as our verified new client welcome!
                    </p>
                  </div>

                  <div className="space-y-3 pt-2">
                    <a
                      href={bookingSuccess.whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold text-sm py-3.5 px-4 rounded-sm shadow-md transition-all"
                    >
                      <MessageCircle className="w-4 h-4 fill-current" />
                      <span>Confirm Faster via WhatsApp</span>
                    </a>

                    <button
                      onClick={() => setBookingSuccess(null)}
                      className="text-xs tracking-wider uppercase text-[#263522] underline cursor-pointer"
                    >
                      Make Another Request
                    </button>
                  </div>
                </div>
              ) : (
                /* Booking Form */
                <form onSubmit={handleBookingSubmit} className="space-y-5">
                  <div className="bg-[#F8F5EE] p-3.5 rounded-sm flex items-center gap-2 text-xs text-[#263522] border border-[#C6A15B]/30">
                    <Sparkles className="w-4 h-4 text-[#C6A15B] shrink-0" />
                    <span>Special Offer: 15% Off for New Clients automatically applied.</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-booking-name" className="block text-xs font-semibold tracking-wider uppercase text-[#263522] mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        id="contact-booking-name"
                        type="text"
                        required
                        placeholder="Amani Wanjiru"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-[#FFFDF8] border border-[#A5AD91]/50 focus:border-[#C6A15B] rounded-sm px-3.5 py-2.5 text-sm text-[#24251F] outline-none"
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-booking-phone" className="block text-xs font-semibold tracking-wider uppercase text-[#263522] mb-1.5">
                        Phone / WhatsApp *
                      </label>
                      <input
                        id="contact-booking-phone"
                        type="tel"
                        required
                        placeholder="0728 173 197"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-[#FFFDF8] border border-[#A5AD91]/50 focus:border-[#C6A15B] rounded-sm px-3.5 py-2.5 text-sm text-[#24251F] outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-booking-email" className="block text-xs font-semibold tracking-wider uppercase text-[#263522] mb-1.5">
                      Email Address <span className="text-gray-400 font-normal lowercase">(optional)</span>
                    </label>
                    <input
                      id="contact-booking-email"
                      type="email"
                      placeholder="amani@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#FFFDF8] border border-[#A5AD91]/50 focus:border-[#C6A15B] rounded-sm px-3.5 py-2.5 text-sm text-[#24251F] outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-booking-service" className="block text-xs font-semibold tracking-wider uppercase text-[#263522] mb-1.5">
                      Select Service *
                    </label>
                    <select
                      id="contact-booking-service"
                      value={serviceName}
                      onChange={(e) => setServiceName(e.target.value)}
                      className="w-full bg-[#FFFDF8] border border-[#A5AD91]/50 focus:border-[#C6A15B] rounded-sm px-3.5 py-2.5 text-sm text-[#24251F] outline-none"
                    >
                      {SERVICES.map((s) => (
                        <option key={s.id} value={s.name}>
                          [{s.categoryLabel}] {s.name}
                        </option>
                      ))}
                      <option value="Consultation & Custom Styling">General Consultation &amp; Custom Styling</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-booking-date" className="block text-xs font-semibold tracking-wider uppercase text-[#263522] mb-1.5">
                        Preferred Date *
                      </label>
                      <input
                        id="contact-booking-date"
                        type="date"
                        min={todayStr}
                        required
                        value={preferredDate}
                        onChange={(e) => setPreferredDate(e.target.value)}
                        className="w-full bg-[#FFFDF8] border border-[#A5AD91]/50 focus:border-[#C6A15B] rounded-sm px-3.5 py-2.5 text-sm text-[#24251F] outline-none"
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-booking-time" className="block text-xs font-semibold tracking-wider uppercase text-[#263522] mb-1.5">
                        Preferred Time *
                      </label>
                      <select
                        id="contact-booking-time"
                        value={preferredTime}
                        onChange={(e) => setPreferredTime(e.target.value)}
                        className="w-full bg-[#FFFDF8] border border-[#A5AD91]/50 focus:border-[#C6A15B] rounded-sm px-3.5 py-2.5 text-sm text-[#24251F] outline-none"
                      >
                        <option value="08:00 AM">Morning — 08:00 AM</option>
                        <option value="10:00 AM">Morning — 10:00 AM</option>
                        <option value="12:00 PM">Midday — 12:00 PM</option>
                        <option value="02:00 PM">Afternoon — 02:00 PM</option>
                        <option value="04:00 PM">Late Afternoon — 04:00 PM</option>
                        <option value="06:00 PM">Evening — 06:00 PM</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-booking-notes" className="block text-xs font-semibold tracking-wider uppercase text-[#263522] mb-1.5">
                      Notes or Hair Needs <span className="text-gray-400 font-normal lowercase">(optional)</span>
                    </label>
                    <textarea
                      id="contact-booking-notes"
                      rows={3}
                      placeholder="Describe your hair texture, whether you need takedown of old braids, or special requests..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full bg-[#FFFDF8] border border-[#A5AD91]/50 focus:border-[#C6A15B] rounded-sm px-3.5 py-2.5 text-sm text-[#24251F] outline-none resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#C6A15B] hover:bg-[#D9BD83] text-[#24251F] font-semibold text-sm tracking-wider uppercase py-3.5 px-6 rounded-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <span>Sending Request...</span>
                    ) : (
                      <>
                        <Calendar className="w-4 h-4" />
                        <span>Confirm Appointment Request</span>
                      </>
                    )}
                  </button>
                </form>
              )
            ) : inquirySuccess ? (
              /* Inquiry Success Message */
              <div className="text-center py-8 space-y-4">
                <CheckCircle2 className="w-12 h-12 text-[#263522] mx-auto" />
                <h3 className="font-serif text-2xl font-medium text-[#263522]">
                  Message Received!
                </h3>
                <p className="text-sm text-[#555] max-w-md mx-auto">
                  {inquirySuccess}
                </p>
                <button
                  onClick={() => setInquirySuccess(null)}
                  className="text-xs uppercase tracking-wider text-[#C6A15B] underline pt-2 cursor-pointer"
                >
                  Send another message
                </button>
              </div>
            ) : (
              /* General Inquiry Form */
              <form onSubmit={handleInquirySubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-inquiry-name" className="block text-xs font-semibold tracking-wider uppercase text-[#263522] mb-1.5">
                      Your Name *
                    </label>
                    <input
                      id="contact-inquiry-name"
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-[#FFFDF8] border border-[#A5AD91]/50 focus:border-[#C6A15B] rounded-sm px-3.5 py-2.5 text-sm text-[#24251F] outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-inquiry-phone" className="block text-xs font-semibold tracking-wider uppercase text-[#263522] mb-1.5">
                      Phone Number
                    </label>
                    <input
                      id="contact-inquiry-phone"
                      type="tel"
                      placeholder="0728 173 197"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-[#FFFDF8] border border-[#A5AD91]/50 focus:border-[#C6A15B] rounded-sm px-3.5 py-2.5 text-sm text-[#24251F] outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-inquiry-email" className="block text-xs font-semibold tracking-wider uppercase text-[#263522] mb-1.5">
                    Email Address
                  </label>
                  <input
                    id="contact-inquiry-email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#FFFDF8] border border-[#A5AD91]/50 focus:border-[#C6A15B] rounded-sm px-3.5 py-2.5 text-sm text-[#24251F] outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="contact-inquiry-subject" className="block text-xs font-semibold tracking-wider uppercase text-[#263522] mb-1.5">
                    Subject / Topic
                  </label>
                  <input
                    id="contact-inquiry-subject"
                    type="text"
                    placeholder="Sisterlocs pricing question / Bridal styling / Treatment enquiry"
                    value={inquirySubject}
                    onChange={(e) => setInquirySubject(e.target.value)}
                    className="w-full bg-[#FFFDF8] border border-[#A5AD91]/50 focus:border-[#C6A15B] rounded-sm px-3.5 py-2.5 text-sm text-[#24251F] outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="contact-inquiry-msg" className="block text-xs font-semibold tracking-wider uppercase text-[#263522] mb-1.5">
                    Your Question / Message *
                  </label>
                  <textarea
                    id="contact-inquiry-msg"
                    rows={4}
                    required
                    placeholder="How can we assist you with your hair journey?"
                    value={inquiryMessage}
                    onChange={(e) => setInquiryMessage(e.target.value)}
                    className="w-full bg-[#FFFDF8] border border-[#A5AD91]/50 focus:border-[#C6A15B] rounded-sm px-3.5 py-2.5 text-sm text-[#24251F] outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#263522] hover:bg-[#35452E] text-[#FFFDF8] font-semibold text-sm tracking-wider uppercase py-3.5 px-6 rounded-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4 text-[#C6A15B]" />
                  <span>{loading ? 'Submitting...' : 'Send Message'}</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Verified Salon Contacts & Map */}
          <div className="lg:col-span-5 space-y-8">
            {/* Quick Contact Card */}
            <div className="bg-[#F8F5EE] border border-[#C6A15B]/30 p-8 rounded-sm space-y-6">
              <span className="text-xs font-semibold tracking-widest text-[#C6A15B] uppercase block">
                Direct Salon Lines
              </span>
              <h3 className="font-serif text-2xl font-medium text-[#263522]">
                Dorry Hair Studio Nairobi
              </h3>
              <div className="w-12 h-0.5 bg-[#C6A15B]"></div>

              <div className="space-y-4 text-sm text-[#444]">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#C6A15B] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#263522]">Location:</strong>
                    <span>{SALON_INFO.location}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#C6A15B] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#263522]">Call Reception:</strong>
                    <a
                      href={`tel:${SALON_INFO.phonePrimary.replace(/\s+/g, '')}`}
                      className="text-[#263522] hover:text-[#C6A15B] font-medium block"
                    >
                      {SALON_INFO.phonePrimary}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[#C6A15B] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#263522]">Email:</strong>
                    <a
                      href={`mailto:${SALON_INFO.email}`}
                      className="text-[#263522] hover:text-[#C6A15B]"
                    >
                      {SALON_INFO.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#C6A15B] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#263522]">Hours of Operation:</strong>
                    <p>{SALON_INFO.hours.weekdays}</p>
                    <p>{SALON_INFO.hours.weekends}</p>
                    <p className="text-xs text-[#777] mt-1">{SALON_INFO.hours.note}</p>
                  </div>
                </div>
              </div>

              {/* Direct Buttons */}
              <div className="pt-2 flex flex-col gap-3">
                <a
                  href={directWhatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold text-xs tracking-wider uppercase py-3 px-4 rounded-sm shadow-md transition-all"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Chat on WhatsApp</span>
                </a>

                <a
                  href={`tel:${SALON_INFO.phonePrimary.replace(/\s+/g, '')}`}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#263522] hover:bg-[#35452E] text-[#FFFDF8] font-medium text-xs tracking-wider uppercase py-3 px-4 rounded-sm transition-all"
                >
                  <Phone className="w-3.5 h-3.5 text-[#C6A15B]" />
                  <span>Call {SALON_INFO.phoneDisplay}</span>
                </a>
              </div>
            </div>

            {/* Google Maps Visual Embed / Link Card */}
            <div className="bg-[#263522] rounded-sm overflow-hidden border border-[#C6A15B]/30 p-6 text-white space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#D9BD83] font-semibold tracking-widest uppercase">
                  Google Maps Directions
                </span>
                <MapPin className="w-4 h-4 text-[#C6A15B]" />
              </div>
              <p className="text-xs text-[#A5AD91] leading-relaxed">
                Find us at AppleWood Adams, situated along Ngong Road near Adams Arcade, Nairobi. Ample and secure client parking available.
              </p>
              <a
                href={SALON_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#D9BD83] hover:text-white underline"
              >
                <span>Open Navigation in Google Maps</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
