import React, { useState } from 'react';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { BookingModal } from './components/BookingModal';
import { LightboxModal } from './components/LightboxModal';

import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { GalleryPage } from './pages/GalleryPage';
import { HairCarePage } from './pages/HairCarePage';
import { ContactPage } from './pages/ContactPage';

import { GALLERY_ITEMS } from './data/salonData';

export default function App() {
  const [activePage, setActivePage] = useState<string>('home');
  const [bookingModalOpen, setBookingModalOpen] = useState<boolean>(false);
  const [preselectedService, setPreselectedService] = useState<string | undefined>(undefined);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const handleOpenBooking = (serviceName?: string) => {
    setPreselectedService(serviceName);
    setBookingModalOpen(true);
  };

  const handleOpenLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const handleCloseLightbox = () => {
    setLightboxIndex(null);
  };

  const handleBookFromLightbox = (styleName: string) => {
    setPreselectedService(styleName);
    setBookingModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDF8] text-[#24251F] selection:bg-[#C6A15B]/30 selection:text-[#263522]">
      {/* 1. Announcement Strip */}
      <AnnouncementBar />

      {/* 2. Premium Navigation */}
      <Navbar
        activePage={activePage}
        setActivePage={setActivePage}
        onOpenBooking={handleOpenBooking}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activePage === 'home' && (
          <HomePage
            setActivePage={setActivePage}
            onOpenBooking={handleOpenBooking}
            onOpenLightbox={handleOpenLightbox}
          />
        )}

        {activePage === 'about' && (
          <AboutPage
            onOpenBooking={handleOpenBooking}
            setActivePage={setActivePage}
          />
        )}

        {activePage === 'services' && (
          <ServicesPage onOpenBooking={handleOpenBooking} />
        )}

        {activePage === 'gallery' && (
          <GalleryPage
            onOpenLightbox={handleOpenLightbox}
            onOpenBooking={handleOpenBooking}
          />
        )}

        {activePage === 'hair-care' && (
          <HairCarePage
            onOpenBooking={handleOpenBooking}
            setActivePage={setActivePage}
          />
        )}

        {activePage === 'contact' && <ContactPage />}
      </main>

      {/* 12. Premium Footer */}
      <Footer
        setActivePage={setActivePage}
        onOpenBooking={handleOpenBooking}
      />

      {/* Floating WhatsApp Quick Action */}
      <FloatingWhatsApp />

      {/* Global Interactive Booking Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        preselectedServiceName={preselectedService}
      />

      {/* Global Accessible Lightbox Modal */}
      {lightboxIndex !== null && (
        <LightboxModal
          isOpen={true}
          onClose={handleCloseLightbox}
          currentIndex={lightboxIndex}
          items={GALLERY_ITEMS}
          onNavigate={(newIdx) => setLightboxIndex(newIdx)}
          onBookStyle={handleBookFromLightbox}
        />
      )}
    </div>
  );
}
