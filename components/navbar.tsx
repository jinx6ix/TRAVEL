"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { Menu, Search, Phone, ChevronDown } from "lucide-react"
import { motion } from "framer-motion"
import { LanguageSelector } from "@/components/language-selector"
import { useLanguage } from "@/hooks/useLanguage"
import logo from "@/public/logo.svg"
import Image from "next/image"
import SearchButton from "./searchButton"

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
  const [isNavHovered, setIsNavHovered] = useState(false)

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
    {name: t("disabilityTours"), href: "/disability-tours-kenya"},
    { name: t("about"), href: "/about" },
    { name: t("blog"), href: "/blog" },
    { name: t("contact"), href: "/contact" },
  ]

  const handleWhatsApp = () => {
    window.open("https://wa.me/254726485228?text=Hello! I'm interested in your safari tours.", "_blank")
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b z-50"
      onMouseEnter={() => setIsNavHovered(true)}
      onMouseLeave={() => {
        setIsNavHovered(false)
        setActiveDropdown(null)
      }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16"> {/* Reduced height */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-xl"> {/* Reduced size */}
              <Image src={logo} alt="Logo" width={80} height={80} /> {/* Smaller logo */}
            </div>
            <span className="text-lg font-bold text-orange-600">JaeTravel Expeditions</span> {/* Reduced text size */}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6"> {/* Reduced spacing */}
            {navItems.map((item) => (
              <div
                key={item.name}
                className="relative group"
                onMouseEnter={() => item.dropdown && setActiveDropdown(item.name)}
              >
                <Link
                  href={item.href}
                  className="text-sm text-gray-700 hover:text-orange-600 transition-colors font-medium flex items-center gap-1" // Smaller text
                >
                  {item.name}
                  {item.dropdown && <ChevronDown size={14} />} {/* Smaller icon */}
                </Link>

                {item.dropdown && activeDropdown === item.name && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border py-2 z-50" // Slightly narrower
                    onMouseLeave={() => {
                      if (!isNavHovered) setActiveDropdown(null)
                    }}
                  >
                    {item.dropdown.map((dropdownItem) => (
                      <Link
                        key={dropdownItem.name}
                        href={dropdownItem.href}
                        className="block px-3 py-1.5 text-sm text-gray-700 hover:text-orange-600 hover:bg-orange-50 transition-colors" // Smaller text and padding
                        onMouseEnter={() => setActiveDropdown(item.name)}
                      >
                        {dropdownItem.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </div>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-3"> {/* Reduced spacing */}
            <LanguageSelector />
            <Button variant="ghost" size="icon" className="h-8 w-8"> {/* Smaller button */}
              <Search size={16} /> {/* Smaller icon */}
            </Button>
            <Button className="bg-orange-600 hover:bg-orange-700 text-sm h-8 px-3" onClick={handleWhatsApp}> {/* Smaller button */}
              <Phone size={14} className="mr-1" /> {/* Smaller icon */}
              {t("whatsAppUs")}
            </Button>
          </div>

          {/* Mobile Navigation */}
          <div className="left-0">
            <SearchButton />
          </div>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="h-8 w-8"> {/* Smaller button */}
                <Menu size={20} /> {/* Smaller icon */}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px]"> {/* Slightly narrower */}
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle> {/* Added DialogTitle for accessibility */}
              <div className="flex flex-col space-y-3 mt-6"> {/* Reduced spacing */}
                {navItems.map((item) => (
                  <div key={item.name}>
                    <Link
                      href={item.href}
                      className="text-base font-medium text-gray-700 hover:text-orange-600 transition-colors block" // Smaller text
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                    {item.dropdown && (
                      <div className="ml-3 mt-1.5 space-y-1.5"> {/* Reduced spacing */}
                        {item.dropdown.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.name}
                            href={dropdownItem.href}
                            className="block text-xs text-gray-600 hover:text-orange-600 transition-colors" // Smaller text
                            onClick={() => setIsOpen(false)}
                          >
                            {dropdownItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <Button className="mt-3 bg-orange-600 hover:bg-orange-700 text-sm h-8" onClick={handleWhatsApp}> {/* Smaller button */}
                  <Phone size={14} className="mr-1" /> {/* Smaller icon */}
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