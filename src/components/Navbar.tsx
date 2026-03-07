"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "./ui/button";

export default function Navbar() {
  return (
    <motion.nav
      className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-sm text-white border-b border-white/10"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        <motion.div
          className="text-xl font-bold text-white"
          whileHover={{ scale: 1.05 }}
        >
          Sahara Connect
        </motion.div>

        <div className="hidden md:flex space-x-8 text-sm font-medium">
          {["About", "Batches", "Alumni"].map((item, index) => (
            <motion.a
              key={item}
              href="#"
              className="text-white hover:text-gray-300 transition-colors duration-300"
              whileHover={{ scale: 1.1 }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {item}
            </motion.a>
          ))}
        </div>

        <div className="flex space-x-4">
          <Button
            variant="ghost"
            className="text-white hover:text-gray-300 hover:bg-white/10"
          >
            Login
          </Button>
          <Button className="bg-black hover:bg-gray-800 text-white rounded-full">
            Join Now
          </Button>
        </div>
      </div>
    </motion.nav>
  );
}