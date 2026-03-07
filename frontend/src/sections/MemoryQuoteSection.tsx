"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";

export default function MemoryQuoteSection() {
  return (
    <Section className="bg-primary text-primary-foreground py-32">
      <div className="absolute inset-0 bg-[url('/memories/Acer_Wallpaper_05_3840x2400.jpg')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
      
      <Container className="text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <blockquote className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold leading-tight mb-8">
            &quot;Once a Saharian,<br />
            <span className="text-accent">Always a Saharian.&quot;</span>
          </blockquote>

          <motion.div
            className="w-24 h-1 bg-accent mx-auto rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{ once: true }}
          />
        </motion.div>
      </Container>
    </Section>
  );
}