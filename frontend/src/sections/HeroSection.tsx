"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";

import { Container } from "@/components/layout/Container";

const images = [
  "/memories/Acer_Wallpaper_01_3840x2400.jpg",
  "/memories/Acer_Wallpaper_02_3840x2400.jpg",
  "/memories/Acer_Wallpaper_03_3840x2400.jpg",
  "/memories/Acer_Wallpaper_04_3840x2400.jpg",
  "/memories/Acer_Wallpaper_05_3840x2400.jpg",
];

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center text-foreground overflow-hidden">
      {/* Animated Background Slider */}
      <div className="absolute inset-0 z-0 bg-black">
        <AnimatePresence initial={false}>
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "-100%" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={images[currentIndex]}
              fill
              className="object-cover"
              alt={`Sahara memory ${currentIndex + 1}`}
              priority
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Modern Gradient Overlay */}
      <div className="absolute inset-0 z-0 bg-black/40 backdrop-blur-[2px]"></div>
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-background/20 to-background"></div>

      {/* Content */}
      <Container className="text-center relative z-10">
        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-serif font-extrabold mb-6 tracking-tight text-white drop-shadow-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Reconnect. Remember. Rise Together.
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed drop-shadow-md"
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
            className="rounded-full shadow-xl px-8 py-6 text-lg transform hover:scale-105 transition-all duration-300"
          >
            Join the Network
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="bg-background/50 backdrop-blur-sm border-2 border-primary/20 hover:bg-primary hover:text-primary-foreground px-8 py-6 text-lg rounded-full transform hover:scale-105 transition-all duration-300"
          >
            Explore Batches
          </Button>
        </motion.div>
      </Container>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="w-8 h-8 text-white/60" />
      </motion.div>
    </section>
  );
}