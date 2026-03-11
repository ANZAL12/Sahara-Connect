"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
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

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <section className="relative h-screen flex items-center justify-center text-foreground overflow-hidden">
      {/* Animated Background Slider */}
      <div className="absolute inset-0 z-0 bg-black">
        <AnimatePresence initial={false}>
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
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

      {/* Dark Overlay for Text Readability */}
      <div className="absolute inset-0 z-0 bg-black/40"></div>

      {/* Content */}
      <Container className="text-center relative z-10">
        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-black mb-4 tracking-tight text-white drop-shadow-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Sahara <br className="hidden md:block" /> Connect
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-white/90 mb-12 drop-shadow-md"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          Building lifelong connections
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
        >
          <Button
            size="lg"
            className="rounded-full shadow-xl px-8 py-6 text-lg transform hover:scale-105 transition-all duration-300 bg-white/20 border-2 border-white text-white hover:bg-white hover:text-foreground"
          >
            Join Us
          </Button>
        </motion.div>
      </Container>

      {/* Carousel Controls */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 flex items-center gap-6">
        {/* Left Arrow */}
        <button
          onClick={goToPrevious}
          className="text-white hover:text-white/70 transition"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Dots Indicator */}
        <div className="flex gap-2">
          {images.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex ? "bg-white" : "bg-white/40"
              }`}
              animate={{
                width: index === currentIndex ? "24px" : "8px",
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={goToNext}
          className="text-white hover:text-white/70 transition"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </section>
  );
}