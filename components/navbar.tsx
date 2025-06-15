"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Search, Phone, ChevronDown } from "lucide-react"
import { motion } from "framer-motion"
import { LanguageSelector } from "@/components/language-selector"
import { useLanguage } from "@/hooks/useLanguage"

const destinations = [
  { name: "Kenya", href: "/destinations/kenya" },
  { name: "Tanzania", href: "/destinations/tanzania" },
  { name: "Rwanda", href: "/destinations/rwanda" },
  { name: "Uganda", href: "/destinations/uganda" },
]

const vehicleTypes = [
  { name: "Toyota Landcruiser", href: "/vehicle-hire/landcruiser" },
  { name: "Toyota Prado", href: "/vehicle-hire/prado" },
  { name: "Luxury Roof Top Camping", href: "/vehicle-hire#luxury-camping" },
  { name: "Photography Vehicle", href: "/vehicle-hire#photography" },
  { name: "Wheelchair Accessible", href: "/vehicle-hire#wheelchair" },
]

export function Navbar() {
  const { t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  const navItems = [
    { name: t("home"), href: "/" },
    { name: t("tours"), href: "/tours" },
    {
      name: t("destinations"),
      href: "/destinations",
      dropdown: destinations,
    },
    {
      name: t("vehicleHire"),
      href: "/vehicle-hire",
      dropdown: vehicleTypes,
    },
    { name: t("about"), href: "/about" },
    { name: t("blog"), href: "/blog" },
    { name: t("contact"), href: "/contact" },
  ]

  const handleWhatsApp = () => {
    window.open("https://wa.me/254757662968?text=Hello! I'm interested in your safari tours.", "_blank")
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b z-50"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-2xl">🦁</div>
            <span className="text-xl font-bold text-orange-600">JaeTravel Expedition</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <div
                key={item.name}
                className="relative group"
                onMouseEnter={() => item.dropdown && setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className="text-gray-700 hover:text-orange-600 transition-colors font-medium flex items-center gap-1"
                >
                  {item.name}
                  {item.dropdown && <ChevronDown size={16} />}
                </Link>

                {item.dropdown && activeDropdown === item.name && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border py-2 z-50"
                  >
                    {item.dropdown.map((dropdownItem) => (
                      <Link
                        key={dropdownItem.name}
                        href={dropdownItem.href}
                        className="block px-4 py-2 text-gray-700 hover:text-orange-600 hover:bg-orange-50 transition-colors"
                      >
                        {dropdownItem.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </div>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <LanguageSelector />
            <Button variant="ghost" size="icon">
              <Search size={20} />
            </Button>
            <Button className="bg-orange-600 hover:bg-orange-700" onClick={handleWhatsApp}>
              <Phone size={16} className="mr-2" />
              {t("whatsAppUs")}
            </Button>
          </div>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu size={24} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <div className="flex flex-col space-y-4 mt-8">
                {navItems.map((item) => (
                  <div key={item.name}>
                    <Link
                      href={item.href}
                      className="text-lg font-medium text-gray-700 hover:text-orange-600 transition-colors block"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                    {item.dropdown && (
                      <div className="ml-4 mt-2 space-y-2">
                        {item.dropdown.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.name}
                            href={dropdownItem.href}
                            className="block text-sm text-gray-600 hover:text-orange-600 transition-colors"
                            onClick={() => setIsOpen(false)}
                          >
                            {dropdownItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <Button className="mt-4 bg-orange-600 hover:bg-orange-700" onClick={handleWhatsApp}>
                  <Phone size={16} className="mr-2" />
                  {t("whatsAppUs")}
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.nav>
  )
}
