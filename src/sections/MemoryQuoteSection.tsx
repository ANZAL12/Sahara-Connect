"use client";

import { motion } from "framer-motion";

export default function MemoryQuoteSection() {
  return (
    <section className="py-32 px-6 bg-gradient-to-r from-black to-gray-800 text-white">
      <div className="max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <blockquote className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold leading-tight mb-8">
            "Once a Saharian,<br />
            <span className="text-white">Always a Saharian.</span>"
          </blockquote>

          <motion.div
            className="w-24 h-1 bg-white mx-auto rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{ once: true }}
          />
        </motion.div>
      </div>
    </section>
  );
}