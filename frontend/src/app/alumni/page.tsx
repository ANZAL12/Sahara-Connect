"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Briefcase, Linkedin } from "lucide-react";
import Image from "next/image";

import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";

// Mock Data for Alumni (to be replaced with DB fetch later)
const ALL_ALUMNI = [
  {
    id: 1,
    name: "Rahul Sharma",
    role: "Senior Software Engineer",
    company: "Google",
    location: "Bangalore, India",
    image: "/memories/Acer_Wallpaper_01_3840x2400.jpg",
    batch: "2015",
    linkedin: "https://linkedin.com",
  },
  {
    id: 2,
    name: "Priya Patel",
    role: "Product Manager",
    company: "Microsoft",
    location: "Seattle, USA",
    image: "/memories/Acer_Wallpaper_02_3840x2400.jpg",
    batch: "2016",
    linkedin: "https://linkedin.com",
  },
  {
    id: 3,
    name: "Arun Kumar",
    role: "Entrepreneur",
    company: "TechStart Inc.",
    location: "Mumbai, India",
    image: "/memories/Acer_Wallpaper_03_3840x2400.jpg",
    batch: "2017",
    linkedin: "https://linkedin.com",
  },
  {
    id: 4,
    name: "Sneha Reddy",
    role: "Data Scientist",
    company: "Amazon",
    location: "New York, USA",
    image: "/memories/Acer_Wallpaper_04_3840x2400.jpg",
    batch: "2018",
    linkedin: "https://linkedin.com",
  },
  {
    id: 5,
    name: "Karan Desai",
    role: "UX Designer",
    company: "Apple",
    location: "London, UK",
    image: "/memories/Acer_Wallpaper_05_3840x2400.jpg",
    batch: "2016",
    linkedin: "https://linkedin.com",
  },
  {
    id: 6,
    name: "Aisha Khan",
    role: "Marketing Director",
    company: "Netflix",
    location: "Singapore",
    image: "/memories/Acer_Wallpaper_01_3840x2400.jpg",
    batch: "2018",
    linkedin: "https://linkedin.com",
  },
];

const BATCHES = ["All", "2015", "2016", "2017", "2018"];

export default function AlumniDirectoryPage() {
  const [selectedBatch, setSelectedBatch] = useState("All");

  const filteredAlumni =
    selectedBatch === "All"
      ? ALL_ALUMNI
      : ALL_ALUMNI.filter((alumnus) => alumnus.batch === selectedBatch);

  return (
    <Section className="min-h-screen bg-background pt-32">
      <Container>
        {/* Page Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground mb-6">
            Alumni 
            <span className="text-primary tracking-tight ml-3">Directory</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Connect with registered members of the Sahara community. Discover where your batchmates are today and expand your professional network.
          </p>
        </motion.div>

        {/* Batch Filter Tabs */}
        <motion.div 
          className="flex flex-wrap justify-center gap-3 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {BATCHES.map((batch) => (
            <Button
              key={batch}
              variant={selectedBatch === batch ? "default" : "outline"}
              className={`rounded-full px-6 transition-all duration-300 ${
                selectedBatch === batch 
                  ? "bg-primary text-primary-foreground shadow-md" 
                  : "border-border text-foreground hover:border-primary hover:text-primary"
              }`}
              onClick={() => setSelectedBatch(batch)}
            >
              {batch === "All" ? "All Batches" : `Batch of ${batch}`}
            </Button>
          ))}
        </motion.div>

        {/* Alumni Cards Grid */}
        <motion.div 
          layout
          className={`grid gap-6 md:gap-8 ${
            filteredAlumni.length > 8 
              ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6" 
              : filteredAlumni.length > 4
              ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          <AnimatePresence mode="popLayout">
            {filteredAlumni.map((person) => (
              <motion.div
                key={person.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
              >
                <Card className="group h-full flex flex-col hover:scale-[1.03] hover:shadow-2xl transition-all duration-500 border border-border bg-card overflow-hidden">
                  <div className="relative h-56 overflow-hidden bg-muted">
                    <Image
                      src={person.image}
                      alt={person.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-background/90 text-foreground backdrop-blur-md font-semibold border-border shadow-sm">
                        Class of {person.batch}
                      </Badge>
                    </div>
                  </div>

                  <CardContent className="p-6 flex flex-col flex-grow">
                    <div className="mb-4 flex-grow">
                      <h3 className="text-2xl font-serif font-bold text-foreground mb-1">
                        {person.name}
                      </h3>

                      <div className="space-y-2 mt-4 text-muted-foreground">
                        <div className="flex items-start gap-2">
                          <Briefcase className="w-4 h-4 text-primary mt-1 shrink-0" />
                          <div>
                            <span className="font-semibold text-foreground block leading-tight">{person.role}</span>
                            <span className="text-sm font-medium text-primary block mt-0.5">{person.company}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 text-sm pt-1">
                          <MapPin className="w-4 h-4 shrink-0 text-muted-foreground" />
                          <span>{person.location}</span>
                        </div>
                      </div>
                    </div>

                    <Button 
                      className="w-full mt-4 bg-secondary hover:bg-secondary/80 text-secondary-foreground border border-border shadow-sm group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300"
                      asChild
                    >
                      <a href={person.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                        <Linkedin className="w-4 h-4" />
                        Connect
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredAlumni.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-2xl text-muted-foreground font-serif">
              No alumni found for this batch yet.
            </p>
          </motion.div>
        )}
      </Container>
    </Section>
  );
}