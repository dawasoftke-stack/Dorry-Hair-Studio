import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, CheckCircle2, AlertCircle, Phone, MessageCircle, Sparkles } from 'lucide-react';
import { SERVICES, SALON_INFO } from '../data/salonData';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedServiceName?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preselectedServiceName
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [serviceName, setServiceName] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('');
  const [notes, setNotes] = useState('');
  const [honeypot, setHoneypot] = useState('');

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [bookingResult, setBookingResult] = useState<{
    bookingId: string;
    whatsappLink: string;
    name: string;
    serviceName: string;
    preferredDate: string;
    preferredTime: string;
  } | null>(null);

  // Set default date to tomorrow
  useEffect(() => {
    if (isOpen) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const tomorrowStr = tomorrow.toISOString().split('T')[0];
      setPreferredDate(tomorrowStr);
      setPreferredTime('10:00 AM');
      if (preselectedServiceName) {
        setServiceName(preselectedServiceName);
      } else if (!serviceName) {
        setServiceName(SERVICES[0].name);
      }
      setErrorMessage('');
      setBookingResult(null);
    }
  }, [isOpen, preselectedServiceName]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!name.trim()) {
      setErrorMessage('Please provide your full name.');
      return;
    }
    if (!phone.trim() || phone.trim().replace(/\D/g, '').length < 8) {
      setErrorMessage('Please enter a valid phone number (e.g. 0728 173 197 or +254...) so we can confirm your appointment.');
      return;
    }
    if (!preferredDate) {
      setErrorMessage('Please select a preferred date for your appointment.');
      return;
    }

    // Match service category
    const selectedObj = SERVICES.find(s => s.name === serviceName);
    const serviceCategory = selectedObj ? selectedObj.categoryLabel : 'Natural Hair Care';

    setLoading(true);

    try {
      const response = await fetch('/api/bookings', {
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
        })
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit booking request.');
      }

      setBookingResult({
        bookingId: data.booking.bookingId,
        whatsappLink: data.whatsappLink,
        name: data.booking.name,
        serviceName: data.booking.serviceName,
        preferredDate: data.booking.preferredDate,
        preferredTime: data.booking.preferredTime
      });
    } catch (err: any) {
      setErrorMessage(err.message || 'An unexpected error occurred. Please call or message us on WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setName('');
    setPhone('');
    setEmail('');
    setNotes('');
    setBookingResult(null);
    setErrorMessage('');
    onClose();
  };

  const todayStr = new Date().toISOString().split('T')[0];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
    >
      <div className="relative w-full max-w-xl bg-[#FFFDF8] rounded-md shadow-2xl border border-[#C6A15B]/30 overflow-hidden max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="bg-[#263522] px-6 py-5 flex items-center justify-between text-[#FFFDF8] border-b border-[#C6A15B]/30 shrink-0">
          <div>
            <span className="text-[10px] tracking-[0.25em] text-[#C6A15B] uppercase block">
              Dorry Hair Studio • Nairobi
            </span>
            <h2 id="booking-modal-title" className="font-serif text-xl sm:text-2xl font-medium tracking-wide">
              {bookingResult ? 'Appointment Request Confirmed' : 'Book Your Salon Experience'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#F8F5EE]/80 hover:text-[#C6A15B] rounded-full hover:bg-[#35452E] transition-colors"
            aria-label="Close booking modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto">
          {bookingResult ? (
            /* Success confirmation screen */
            <div className="text-center py-4 space-y-6 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 bg-[#263522] text-[#C6A15B] rounded-full flex items-center justify-center mx-auto border-2 border-[#C6A15B]">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-[#C6A15B]">
                  Reference #{bookingResult.bookingId}
                </span>
                <h3 className="font-serif text-2xl text-[#24251F] font-medium mt-1">
                  Thank You, {bookingResult.name}!
                </h3>
                <p className="text-sm text-[#555] max-w-md mx-auto mt-2 leading-relaxed">
                  Your appointment request for{' '}
                  <strong className="text-[#263522]">{bookingResult.serviceName}</strong> has been
                  successfully recorded for{' '}
                  <strong className="text-[#263522]">{bookingResult.preferredDate}</strong> at{' '}
                  <strong className="text-[#263522]">{bookingResult.preferredTime}</strong>.
                </p>
              </div>

              {/* Status Notice */}
              <div className="bg-[#F8F5EE] border-l-4 border-[#C6A15B] p-4 text-left rounded-sm text-xs text-[#444] space-y-1">
                <p className="font-semibold text-[#263522] text-sm">
                  Schedule Notice:
                </p>
                <p>
                  Your preferred date and time is a requested reservation. Our salon team will verify
                  stylist availability and finalize your confirmation via WhatsApp or phone call.
                </p>
                <p className="text-[11px] text-[#777] pt-1">
                  New clients receive our verified <strong>15% Off</strong> welcome benefit on signature services!
                </p>
              </div>

              {/* WhatsApp instant confirmation button */}
              <div className="space-y-3 pt-2">
                <a
                  href={bookingResult.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white font-medium text-sm py-3 px-4 rounded-sm shadow-md transition-all active:scale-95"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Instant Confirm via WhatsApp</span>
                </a>

                <button
                  onClick={handleReset}
                  className="w-full inline-flex items-center justify-center text-xs tracking-wider uppercase text-[#263522] hover:text-[#C6A15B] py-2 font-medium"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            /* Booking Form */
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Promotion banner inside modal */}
              <div className="flex items-center gap-2 bg-[#F8F5EE] border border-[#C6A15B]/30 px-3.5 py-2 rounded-sm text-xs text-[#263522]">
                <Sparkles className="w-4 h-4 text-[#C6A15B] shrink-0" />
                <span>
                  <strong>New to Dorry Hair Studio?</strong> Enjoy 15% off your first appointment.
                </span>
              </div>

              {errorMessage && (
                <div className="flex items-start gap-2 bg-red-50 border border-red-200 text-red-700 px-3.5 py-2.5 rounded-sm text-xs">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Honeypot hidden input for anti-spam */}
              <div className="hidden">
                <label htmlFor="modal-honeypot">Leave blank</label>
                <input
                  id="modal-honeypot"
                  type="text"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {/* Service Selection */}
              <div>
                <label htmlFor="service-select" className="block text-xs font-semibold tracking-wider uppercase text-[#263522] mb-1.5">
                  Select Desired Service *
                </label>
                <select
                  id="service-select"
                  value={serviceName}
                  onChange={(e) => setServiceName(e.target.value)}
                  required
                  className="w-full bg-white border border-[#A5AD91]/50 focus:border-[#C6A15B] focus:ring-1 focus:ring-[#C6A15B] rounded-sm px-3.5 py-2.5 text-sm text-[#24251F] transition-all outline-none"
                >
                  {SERVICES.map((s) => (
                    <option key={s.id} value={s.name}>
                      [{s.categoryLabel}] {s.name}
                    </option>
                  ))}
                  <option value="Consultation & Custom Styling">General Consultation & Custom Styling</option>
                </select>
              </div>

              {/* Client Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="client-name" className="block text-xs font-semibold tracking-wider uppercase text-[#263522] mb-1.5">
                    Your Full Name *
                  </label>
                  <input
                    id="client-name"
                    type="text"
                    required
                    placeholder="e.g. Amani Wanjiru"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-white border border-[#A5AD91]/50 focus:border-[#C6A15B] focus:ring-1 focus:ring-[#C6A15B] rounded-sm px-3.5 py-2 text-sm text-[#24251F] transition-all outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="client-phone" className="block text-xs font-semibold tracking-wider uppercase text-[#263522] mb-1.5">
                    Phone / WhatsApp *
                  </label>
                  <input
                    id="client-phone"
                    type="tel"
                    required
                    placeholder="e.g. 0728 173 197"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-white border border-[#A5AD91]/50 focus:border-[#C6A15B] focus:ring-1 focus:ring-[#C6A15B] rounded-sm px-3.5 py-2 text-sm text-[#24251F] transition-all outline-none"
                  />
                </div>
              </div>

              {/* Email (Optional) */}
              <div>
                <label htmlFor="client-email" className="block text-xs font-semibold tracking-wider uppercase text-[#263522] mb-1.5">
                  Email Address <span className="text-gray-400 font-normal lowercase">(optional for calendar invite)</span>
                </label>
                <input
                  id="client-email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white border border-[#A5AD91]/50 focus:border-[#C6A15B] focus:ring-1 focus:ring-[#C6A15B] rounded-sm px-3.5 py-2 text-sm text-[#24251F] transition-all outline-none"
                />
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="pref-date" className="block text-xs font-semibold tracking-wider uppercase text-[#263522] mb-1.5">
                    Preferred Date *
                  </label>
                  <div className="relative">
                    <input
                      id="pref-date"
                      type="date"
                      min={todayStr}
                      required
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="w-full bg-white border border-[#A5AD91]/50 focus:border-[#C6A15B] focus:ring-1 focus:ring-[#C6A15B] rounded-sm px-3.5 py-2 text-sm text-[#24251F] transition-all outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="pref-time" className="block text-xs font-semibold tracking-wider uppercase text-[#263522] mb-1.5">
                    Preferred Time Slot *
                  </label>
                  <select
                    id="pref-time"
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    className="w-full bg-white border border-[#A5AD91]/50 focus:border-[#C6A15B] focus:ring-1 focus:ring-[#C6A15B] rounded-sm px-3.5 py-2 text-sm text-[#24251F] transition-all outline-none"
                  >
                    <option value="08:00 AM">Morning — 08:00 AM</option>
                    <option value="10:00 AM">Morning — 10:00 AM</option>
                    <option value="12:00 PM">Midday — 12:00 PM</option>
                    <option value="02:00 PM">Afternoon — 02:00 PM</option>
                    <option value="04:00 PM">Late Afternoon — 04:00 PM</option>
                    <option value="06:00 PM">Evening — 06:00 PM</option>
                    <option value="08:00 PM">Night — 08:00 PM (by request)</option>
                  </select>
                </div>
              </div>

              {/* Hair notes / questions */}
              <div>
                <label htmlFor="booking-notes" className="block text-xs font-semibold tracking-wider uppercase text-[#263522] mb-1.5">
                  Hair Condition or Special Request <span className="text-gray-400 font-normal lowercase">(optional)</span>
                </label>
                <textarea
                  id="booking-notes"
                  rows={2}
                  placeholder="Tell us about your hair texture, current protective style, or any scalp sensitivities..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-white border border-[#A5AD91]/50 focus:border-[#C6A15B] focus:ring-1 focus:ring-[#C6A15B] rounded-sm px-3.5 py-2 text-sm text-[#24251F] transition-all outline-none resize-none"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#C6A15B] hover:bg-[#D9BD83] text-[#24251F] font-semibold text-sm tracking-wider uppercase py-3.5 px-6 rounded-sm shadow-md transition-all active:scale-[0.99] disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <span className="inline-flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4 text-[#24251F]" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      Securing Your Slot...
                    </span>
                  ) : (
                    <>
                      <Calendar className="w-4 h-4" />
                      <span>Request Appointment</span>
                    </>
                  )}
                </button>
                <p className="text-[11px] text-[#777] text-center mt-2">
                  No payment required now. Our team reviews availability and confirms with you directly.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
