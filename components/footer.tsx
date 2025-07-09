"use client"

import Link from "next/link"
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react"
import { useLanguage } from "@/hooks/useLanguage"
import logo from "@/public/logo.svg"
import Image from "next/image"
import Script from "next/script"

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="bg-gray-900 text-white">
      {/* SafariBookings Widget Script */}
      <Script 
        id="safaribookings-widget"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function(){var sb=document.createElement('script');sb.type='text/javascript';sb.async=true;sb.src='https://s3.amazonaws.com/z_437er23a/73f68887a.js';var s=document.getElementsByTagName('script')[0];s.parentNode.insertBefore(sb,s);})();`
        }}
      />

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info Column */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Image src={logo} alt="JaeTravel Expeditions Logo" width={80} height={80} />
              <span className="text-xl font-bold">JaeTravel Expeditions</span>
            </div>
            <p className="text-gray-400 mb-4">{t("trustedPartner")}</p>
            <div className="flex space-x-4">
              <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <Facebook size={20} className="hover:text-orange-400 transition-colors" />
              </Link>
              <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <Twitter size={20} className="hover:text-orange-400 transition-colors" />
              </Link>
              <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <Instagram size={20} className="hover:text-orange-400 transition-colors" />
              </Link>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t("quickLinks")}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/tours" className="text-gray-400 hover:text-white transition-colors">
                  {t("tours")}
                </Link>
              </li>
              <li>
                <Link href="/destinations" className="text-gray-400 hover:text-white transition-colors">
                  {t("destinations")}
                </Link>
              </li>
              <li>
                <Link href="/vehicle-hire" className="text-gray-400 hover:text-white transition-colors">
                  {t("vehicleHire")}
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                  {t("about")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t("services")}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/other-services" className="text-gray-400 hover:text-white transition-colors">
                  {t("otherServices")}
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-white transition-colors">
                  {t("blog")}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                  {t("contact")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t("contactInfo")}</h3>
            <div className="space-y-2">
              <Link href="tel:+254726485228" className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
                <Phone size={16} />
                <span>+254 726 485 228</span>
              </Link>
              <Link href="mailto:Info@jaetravel.co.ke" className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
                <Mail size={16} />
                <span>Info@jaetravel.co.ke</span>
              </Link>
              <Link href="https://maps.google.com?q=Nairobi,Kenya" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
                <MapPin size={16} />
                <span>Nairobi, Kenya</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Partners and Review Widgets Section */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Partner Logos */}
            <div className="flex flex-col md:flex-row items-center gap-6">
              <p className="text-gray-400 hidden md:block">Our Partners:</p>
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex flex-col items-center">
                  <Link href="https://www.kws.go.ke" target="_blank" rel="noopener noreferrer">
                    <img 
                      src="https://jaetravel.co.ke/wp-content/uploads/2025/05/logo_2.jpeg" 
                      alt="Kenya Wildlife Service" 
                      className="h-16 object-contain hover:opacity-90 transition-opacity"
                    />
                  </Link>
                  <p className="text-sm text-orange-400 mt-1">Proudly Partnered</p>
                </div>
                <div className="flex flex-col items-center">
                  <Link href="https://www.tourismauthority.go.ke" target="_blank" rel="noopener noreferrer">
                    <img 
                      src="https://jaetravel.co.ke/wp-content/uploads/2025/05/Logo-TRA-removebg-preview-1.png" 
                      alt="Tourism Regulatory Authority" 
                      className="h-16 object-contain hover:opacity-90 transition-opacity"
                    />
                  </Link>
                  <p className="text-sm text-orange-400 mt-1">Proudly Certified</p>
                </div>
              </div>
            </div>

            {/* Review Widgets and Partner Links */}
            <div className="flex items-center gap-6">
              {/* SafariBookings Widget */}
              <div className="flex flex-col items-center">
                <Link href="https://www.safaribookings.com" target="_blank" rel="noopener noreferrer">
                  <img 
                    src="https://operators.safaribookings.com/images/new/login-new-logo.png" 
                    alt="SafariBookings" 
                    className="h-10 object-contain hover:opacity-90 transition-opacity"
                  />
                </Link>
                <div id="sb_widget_73f68887a"></div>
                <p className="text-xs text-gray-400 mt-1">SafariBookings Reviews</p>
              </div>

              {/* Your African Safari Widget */}
              <div className="flex flex-col items-center">
                <div className="bg-white p-1 rounded hover:shadow-md transition-shadow">
                  <iframe 
                    scrolling="no" 
                    frameBorder="0" 
                    width="130" 
                    src="https://www.yourafricansafari.com/c/3443-jae-travel-expeditions/widget_1/"
                    title="Your African Safari Reviews"
                  ></iframe>
                </div>
                <p className="text-xs text-gray-400 mt-1">Customer Reviews</p>
              </div>
              
              {/* Safarigo Link */}
              <div className="flex flex-col items-center">
                <Link 
                  href="https://www.safarigo.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                >
                  <img 
                    src="https://www.safarigo.com/images/logo.png" 
                    alt="Safarigo" 
                    className="h-8"
                  />
                </Link>
                <p className="text-xs text-gray-400 mt-1">Book with Safarigo</p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Spacer Div */}
        <div style={{ display: 'block', textAlign: 'center', padding: '0 5px 5px 5px' }}>
          <span className="ce41e68889017">&nbsp;</span>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 <Link href="/" className="hover:text-orange-400 transition-colors">JaeTravel Expeditions</Link>. {t("allRightsReserved")}
          </p>
        </div>
      </div>
    </footer>
  )
}