"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const aboutImages = [
  "/memories/Acer_Wallpaper_01_3840x2400.jpg",
  "/memories/Acer_Wallpaper_02_3840x2400.jpg",
  "/memories/Acer_Wallpaper_03_3840x2400.jpg",
  "/memories/Acer_Wallpaper_04_3840x2400.jpg",
];

export default function AboutSection() {
  return (
    <section className="py-24 px-6 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-800 mb-8">
              About <span className="text-black">Sahara</span>
            </h2>

            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>
                Sahara Hostel isn't just a place to stay—it's where lifelong bonds are forged.
                From late-night conversations that turn into lifelong friendships, to shared
                adventures that create unforgettable memories, Sahara represents the essence
                of brotherhood and community.
              </p>

              <p>
                Our alumni network spans across the globe, working in diverse fields,
                yet united by the common thread of having called Sahara home. Whether
                you're a recent graduate or someone who stayed decades ago, the spirit
                of Sahara lives on in each of us.
              </p>

              <p>
                Through Sahara Connect, we maintain these connections, celebrate our
                shared history, and continue to support each other's journeys forward.
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
                className="relative h-48 rounded-2xl overflow-hidden shadow-lg"
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
      </div>
    </section>
  );
}