"use client"

import Script from "next/script"

export default function BookingWidgetSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Instant Booking</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Secure your adventure with our easy booking system
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md border border-gray-200">
          {/* Loader script deferred until after interactive */}
          <Script
            src="https://widgets.bokun.io/assets/javascripts/apps/build/BokunWidgetsLoader.js?bookingChannelUUID=c1b81411-c441-4e77-9045-5ed0256bd1b4"
            strategy="afterInteractive"
          />
          <div
            className="bokunWidget"
            data-src="https://widgets.bokun.io/online-sales/c1b81411-c441-4e77-9045-5ed0256bd1b4/experience/1052204"
          />
          <noscript>Please enable JavaScript in your browser to view the booking widget</noscript>
        </div>
      </div>
    </section>
  )
}
