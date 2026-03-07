"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

const images = [
  "/memories/Acer_Wallpaper_01_3840x2400.jpg",
  "/memories/Acer_Wallpaper_02_3840x2400.jpg",
  "/memories/Acer_Wallpaper_03_3840x2400.jpg",
  "/memories/Acer_Wallpaper_04_3840x2400.jpg",
  "/memories/Acer_Wallpaper_05_3840x2400.jpg",
];

export default function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center text-white overflow-hidden">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 grid grid-cols-3 gap-4 opacity-80">
        {images.map((img, i) => (
          <motion.div
            key={i}
            className="relative h-64 rounded-xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: 1,
              rotate: [0, 2, -2, 0],
            }}
            transition={{
              duration: 2,
              delay: i * 0.2,
              rotate: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
          >
            <Image
              src={img}
              fill
              className="object-cover"
              alt={`Sahara memory ${i + 1}`}
            />
          </motion.div>
        ))}
      </div>

      {/* Glassmorphism Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/60 backdrop-blur-sm"></div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl px-6">
        <motion.h1
          className="text-6xl md:text-8xl font-serif font-bold mb-6 bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Reconnect. Remember. Rise Together.
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-gray-200 mb-12 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          Sahara Connect brings together everyone who once called Sahara home — building lifelong friendships and opportunities.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
        >
          <Button
            size="lg"
            className="bg-black hover:bg-gray-800 text-white font-semibold px-8 py-4 text-lg rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            Join the Network
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-4 text-lg rounded-full backdrop-blur-sm bg-white/10 transform hover:scale-105 transition-all duration-300"
          >
            Explore Batches
          </Button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="w-8 h-8 text-white/70" />
      </motion.div>
    </section>
  );
}