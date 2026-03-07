"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Briefcase } from "lucide-react";

const alumni = [
  {
    name: "Rahul Sharma",
    role: "Senior Software Engineer",
    company: "Google",
    location: "Bangalore, India",
    image: "/memories/Acer_Wallpaper_01_3840x2400.jpg",
    batch: "2015",
  },
  {
    name: "Priya Patel",
    role: "Product Manager",
    company: "Microsoft",
    location: "Seattle, USA",
    image: "/memories/Acer_Wallpaper_02_3840x2400.jpg",
    batch: "2016",
  },
  {
    name: "Arun Kumar",
    role: "Entrepreneur",
    company: "TechStart Inc.",
    location: "Mumbai, India",
    image: "/memories/Acer_Wallpaper_03_3840x2400.jpg",
    batch: "2017",
  },
  {
    name: "Sneha Reddy",
    role: "Data Scientist",
    company: "Amazon",
    location: "New York, USA",
    image: "/memories/Acer_Wallpaper_04_3840x2400.jpg",
    batch: "2018",
  },
];

export default function AlumniSpotlightSection() {
  return (
    <section className="py-24 px-6 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-800 mb-6">
            Alumni <span className="text-black">Spotlight</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Meet some of our remarkable alumni who are making waves in their fields.
            Their journeys inspire us all to reach greater heights.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {alumni.map((person, index) => (
            <motion.div
              key={person.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="group hover:shadow-2xl transition-all duration-500 border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:bg-white overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={person.image}
                    alt={person.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-black text-white font-semibold">
                      Batch {person.batch}
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-6">
                  <h3 className="text-xl font-serif font-bold text-gray-800 mb-2">
                    {person.name}
                  </h3>

                  <div className="space-y-2 text-gray-600">
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-black" />
                      <span className="font-semibold">{person.role}</span>
                    </div>

                    <div className="text-sm text-black font-medium">
                      {person.company}
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4" />
                      <span>{person.location}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}