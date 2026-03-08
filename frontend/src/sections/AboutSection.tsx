"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";

const aboutImages = [
  "/memories/Acer_Wallpaper_01_3840x2400.jpg",
  "/memories/Acer_Wallpaper_02_3840x2400.jpg",
  "/memories/Acer_Wallpaper_03_3840x2400.jpg",
  "/memories/Acer_Wallpaper_04_3840x2400.jpg",
];

export default function AboutSection() {
  return (
    <Section className="bg-secondary/50">
      <Container>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-8">
              About <span className="text-primary tracking-tight">Sahara</span>
            </h2>

            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                Sahara Hostel isn&apos;t just a place to stay—it&apos;s where lifelong bonds are forged.
                From late-night conversations that turn into lifelong friendships, to shared
                adventures that create unforgettable memories, Sahara represents the essence
                of brotherhood and community.
              </p>

              <p>
                Our alumni network spans across the globe, working in diverse fields,
                yet united by the common thread of having called Sahara home. Whether
                you&apos;re a recent graduate or someone who stayed decades ago, the spirit
                of Sahara lives on in each of us.
              </p>

              <p>
                Through Sahara Connect, we maintain these connections, celebrate our
                shared history, and continue to support each other&apos;s journeys forward.
              </p>
            </div>
          </motion.div>

          {/* Image Grid */}
          <motion.div
            className="grid grid-cols-2 gap-4"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {aboutImages.map((img, i) => (
              <motion.div
                key={i}
                className="relative h-48 rounded-2xl overflow-hidden shadow-md ring-1 ring-border"
                whileHover={{ scale: 1.05, rotate: 2 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={img}
                  fill
                  className="object-cover"
                  alt={`Sahara memory ${i + 1}`}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}