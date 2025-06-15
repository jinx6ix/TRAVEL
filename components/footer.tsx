"use client"

import Link from "next/link"
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react"
import { useLanguage } from "@/hooks/useLanguage"

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="text-2xl">🦁</div>
              <span className="text-xl font-bold">JaeTravel Expedition</span>
            </div>
            <p className="text-gray-400 mb-4">{t("trustedPartner")}</p>
            <div className="flex space-x-4">
              <Facebook size={20} className="hover:text-orange-400 cursor-pointer" />
              <Twitter size={20} className="hover:text-orange-400 cursor-pointer" />
              <Instagram size={20} className="hover:text-orange-400 cursor-pointer" />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">{t("quickLinks")}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/tours" className="text-gray-400 hover:text-white">
                  {t("tours")}
                </Link>
              </li>
              <li>
                <Link href="/destinations" className="text-gray-400 hover:text-white">
                  {t("destinations")}
                </Link>
              </li>
              <li>
                <Link href="/vehicle-hire" className="text-gray-400 hover:text-white">
                  {t("vehicleHire")}
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white">
                  {t("about")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">{t("services")}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/other-services" className="text-gray-400 hover:text-white">
                  {t("otherServices")}
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-white">
                  {t("blog")}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white">
                  {t("contact")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">{t("contactInfo")}</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Phone size={16} />
                <span className="text-gray-400">+254 726 485 228</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail size={16} />
                <span className="text-gray-400">Jaetravelexpeditions@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin size={16} />
                <span className="text-gray-400">Nairobi, Kenya</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">© 2024 JaeTravel Expedition. {t("allRightsReserved")}</p>
        </div>
      </div>
    </footer>
  )
}
