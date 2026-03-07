"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Container } from "./layout/Container";

export default function Navbar() {
  return (
    <motion.nav
      className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md text-foreground border-b border-border shadow-sm"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Container className="flex justify-between items-center py-4">
        <Link href="/">
          <motion.div
            className="text-xl font-bold text-foreground cursor-pointer"
            whileHover={{ scale: 1.05 }}
          >
            Sahara Connect
          </motion.div>
        </Link>

        <div className="hidden md:flex space-x-8 text-sm font-medium">
          {[
            { name: "About", href: "/about" },
            { name: "Events", href: "/events" },
            { name: "Alumni", href: "/alumni" }
          ].map((item, index) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-foreground/80 hover:text-primary transition-colors duration-300"
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

      </Container>
    </motion.nav>
  );
}