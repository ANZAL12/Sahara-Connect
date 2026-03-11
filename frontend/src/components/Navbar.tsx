"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Container } from "./layout/Container";

const NAV_LINKS = [
  { name: "About", href: "/about" },
  { name: "Events", href: "/events" },
  { name: "Alumni", href: "/alumni" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <motion.nav
      className="fixed top-0 w-full z-50 bg-black/20 text-white"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Container className="flex justify-between items-center py-4">
        <Link href="/">
          <motion.div
            className="text-xl font-bold text-white cursor-pointer"
            whileHover={{ scale: 1.05 }}
          >
            Sahara Connect
          </motion.div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-8 text-sm font-medium">
          {NAV_LINKS.map((item, index) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-white/90 hover:text-white transition-colors duration-300"
            >
              <motion.span
                whileHover={{ scale: 1.1 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="inline-block"
              >
                {item.name}
              </motion.span>
            </Link>
          ))}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <Menu className="w-6 h-6 text-white" />
          )}
        </button>
      </Container>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden overflow-hidden bg-black/40"
          >
            <Container className="py-4 flex flex-col space-y-1">
              {NAV_LINKS.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.08 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="block px-4 py-3 rounded-lg text-base font-medium text-white/90 hover:text-white hover:bg-white/10 transition-all duration-200"
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}