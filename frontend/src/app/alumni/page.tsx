"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Briefcase,
  Linkedin,
  GraduationCap,
  Camera,
  X,
  ChevronLeft,
  ChevronRight,
  Upload,
  ImageIcon,
} from "lucide-react";
import Image from "next/image";

import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";

// ── Mock Data ────────────────────────────────────────────

const ALL_ALUMNI = [
  {
    id: 1,
    name: "Rahul Sharma",
    role: "Senior Software Engineer",
    company: "Google",
    dept: "Computer Science",
    location: "Bangalore, India",
    image: "/profiles/pexels-pixabay-415829.jpg",
    batch: "2015",
    linkedin: "https://linkedin.com",
  },
  {
    id: 2,
    name: "Priya Patel",
    role: "Product Manager",
    company: "Microsoft",
    dept: "Information Technology",
    location: "Seattle, USA",
    image: "/profiles/pexels-luisbecerrafotografo-5906433.jpg",
    batch: "2016",
    linkedin: "https://linkedin.com",
  },
  {
    id: 3,
    name: "Arun Kumar",
    role: "Entrepreneur",
    company: "TechStart Inc.",
    dept: "Mechanical Engineering",
    location: "Mumbai, India",
    image: "/profiles/pexels-luisbecerrafotografo-5906261.jpg",
    batch: "2017",
    linkedin: "https://linkedin.com",
  },
  {
    id: 4,
    name: "Sneha Reddy",
    role: "Data Scientist",
    company: "Amazon",
    dept: "Electronics & Communication",
    location: "New York, USA",
    image: "/profiles/pexels-linkedin-2182970.jpg",
    batch: "2018",
    linkedin: "https://linkedin.com",
  },
  {
    id: 5,
    name: "Karan Desai",
    role: "UX Designer",
    company: "Apple",
    dept: "Computer Science",
    location: "London, UK",
    image: "/profiles/pexels-kindelmedia-7298855.jpg",
    batch: "2016",
    linkedin: "https://linkedin.com",
  },
  {
    id: 6,
    name: "Aisha Khan",
    role: "Marketing Director",
    company: "Netflix",
    dept: "Business Administration",
    location: "Singapore",
    image: "/profiles/pexels-dziana-hasanbekava-7275385.jpg",
    batch: "2018",
    linkedin: "https://linkedin.com",
  },
   {
    id: 6,
    name: "Aisha Khan",
    role: "Marketing Director",
    company: "Netflix",
    dept: "Business Administration",
    location: "Singapore",
    image: "/profiles/pexels-dziana-hasanbekava-7275385.jpg",
    batch: "2018",
    linkedin: "https://linkedin.com",
  },
   {
    id: 6,
    name: "Aisha Khan",
    role: "Marketing Director",
    company: "Netflix",
    dept: "Business Administration",
    location: "Singapore",
    image: "/profiles/pexels-simon-robben-55958-614810.jpg",
    batch: "2018",
    linkedin: "https://linkedin.com",
  },
];

const BATCHES = ["All", "2015", "2016", "2017", "2018"];

// Mock gallery photos per batch
const BATCH_GALLERY: Record<string, { id: number; src: string; caption: string }[]> = {
  "2015": [
    { id: 1, src: "/memories/Acer_Wallpaper_01_3840x2400.jpg", caption: "Farewell Day 2015" },
    { id: 2, src: "/memories/Acer_Wallpaper_03_3840x2400.jpg", caption: "Annual Sports Meet" },
    { id: 3, src: "/memories/Acer_Wallpaper_05_3840x2400.jpg", caption: "Cultural Night" },
    { id: 4, src: "/memories/Acer_Wallpaper_02_3840x2400.jpg", caption: "Graduation Ceremony" },
  ],
  "2016": [
    { id: 1, src: "/memories/Acer_Wallpaper_02_3840x2400.jpg", caption: "College Trip - Goa" },
    { id: 2, src: "/memories/Acer_Wallpaper_04_3840x2400.jpg", caption: "Hackathon Winners" },
    { id: 3, src: "/memories/Acer_Wallpaper_01_3840x2400.jpg", caption: "Fresher Party" },
    { id: 4, src: "/memories/Acer_Wallpaper_03_3840x2400.jpg", caption: "Farewell 2016" },
    { id: 5, src: "/memories/Acer_Wallpaper_05_3840x2400.jpg", caption: "Lab Days" },
  ],
  "2017": [
    { id: 1, src: "/memories/Acer_Wallpaper_03_3840x2400.jpg", caption: "Batch Reunion" },
    { id: 2, src: "/memories/Acer_Wallpaper_01_3840x2400.jpg", caption: "Project Exhibition" },
    { id: 3, src: "/memories/Acer_Wallpaper_04_3840x2400.jpg", caption: "Canteen Memories" },
  ],
  "2018": [
    { id: 1, src: "/memories/Acer_Wallpaper_04_3840x2400.jpg", caption: "Last Day at Campus" },
    { id: 2, src: "/memories/Acer_Wallpaper_02_3840x2400.jpg", caption: "Tech Fest 2018" },
    { id: 3, src: "/memories/Acer_Wallpaper_05_3840x2400.jpg", caption: "Class Photo" },
    { id: 4, src: "/memories/Acer_Wallpaper_01_3840x2400.jpg", caption: "Annual Day" },
    { id: 5, src: "/memories/Acer_Wallpaper_03_3840x2400.jpg", caption: "Field Trip" },
    { id: 6, src: "/memories/Acer_Wallpaper_04_3840x2400.jpg", caption: "Graduation Smiles" },
  ],
};

// Masonry row-span pattern for visual variety
const SPAN_PATTERN = [
  "row-span-2",
  "row-span-1",
  "row-span-1",
  "row-span-1",
  "row-span-2",
  "row-span-1",
];

// ── Component ────────────────────────────────────────────

export default function AlumniDirectoryPage() {
  const [selectedBatch, setSelectedBatch] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredAlumni =
    selectedBatch === "All"
      ? ALL_ALUMNI
      : ALL_ALUMNI.filter((alumnus) => alumnus.batch === selectedBatch);

  const galleryPhotos =
    selectedBatch !== "All" ? BATCH_GALLERY[selectedBatch] ?? [] : [];

  const openLightbox = (idx: number) => setLightboxIndex(idx);
  const closeLightbox = () => setLightboxIndex(null);
  const prevPhoto = () =>
    setLightboxIndex((prev) =>
      prev !== null ? (prev - 1 + galleryPhotos.length) % galleryPhotos.length : null
    );
  const nextPhoto = () =>
    setLightboxIndex((prev) =>
      prev !== null ? (prev + 1) % galleryPhotos.length : null
    );

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
            Connect with registered members of the Sahara community. Discover
            where your batchmates are today and expand your professional network.
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
              onClick={() => {
                setSelectedBatch(batch);
                setLightboxIndex(null);
              }}
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

                  <CardContent className="p-6 flex flex-col grow">
                    <div className="mb-4 grow">
                      <h3 className="text-2xl font-serif font-bold text-foreground mb-1">
                        {person.name}
                      </h3>
                      <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <GraduationCap className="w-3.5 h-3.5 shrink-0" />
                        <span>{person.dept}</span>
                      </div>

                      <div className="space-y-2 mt-4 text-muted-foreground">
                        <div className="flex items-start gap-2">
                          <Briefcase className="w-4 h-4 text-primary mt-1 shrink-0" />
                          <div>
                            <span className="font-semibold text-foreground block leading-tight">
                              {person.role}
                            </span>
                            <span className="text-sm font-medium text-primary block mt-0.5">
                              {person.company}
                            </span>
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
                      <a
                        href={person.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2"
                      >
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

        {/* ── Photo Gallery (only when a specific batch is selected) ── */}
        <AnimatePresence>
          {selectedBatch !== "All" && galleryPhotos.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.6 }}
              className="mt-24"
            >
              {/* Gallery Header */}
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
                <div>
                  <div className="flex items-center gap-2 text-primary mb-2">
                    <Camera className="w-5 h-5" />
                    <span className="text-sm font-semibold uppercase tracking-wider">
                      Memory Lane
                    </span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
                    Batch of {selectedBatch}{" "}
                    <span className="text-primary">Gallery</span>
                  </h2>
                  <p className="text-muted-foreground mt-2">
                    Relive the golden days — photos shared by your batchmates.
                  </p>
                </div>
                <Button
                  variant="outline"
                  className="rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all flex items-center gap-2 self-start sm:self-auto"
                >
                  <Upload className="w-4 h-4" />
                  Upload Photos
                </Button>
              </div>

              {/* Masonry Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[180px] md:auto-rows-[200px] gap-3 md:gap-4">
                {galleryPhotos.map((photo, idx) => (
                  <motion.div
                    key={photo.id}
                    className={`relative group cursor-pointer overflow-hidden rounded-2xl ${
                      SPAN_PATTERN[idx % SPAN_PATTERN.length]
                    }`}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: idx * 0.06 }}
                    viewport={{ once: true }}
                    onClick={() => openLightbox(idx)}
                  >
                    <Image
                      src={photo.src}
                      alt={photo.caption}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4">
                      <div className="flex items-center gap-2 text-white">
                        <ImageIcon className="w-4 h-4" />
                        <span className="text-sm font-medium">
                          {photo.caption}
                        </span>
                      </div>
                    </div>
                    {/* Border glow */}
                    <div className="absolute inset-0 rounded-2xl ring-1 ring-white/10 group-hover:ring-primary/40 transition-all duration-500" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>

      {/* ── Full-screen Lightbox ── */}
      <AnimatePresence>
        {lightboxIndex !== null && galleryPhotos[lightboxIndex] && (
          <motion.div
            className="fixed inset-0 z-100 bg-black/90 backdrop-blur-md flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              className="absolute top-6 right-6 text-white/70 hover:text-white z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              onClick={closeLightbox}
            >
              <X className="w-6 h-6" />
            </button>

            {/* Prev */}
            <button
              className="absolute left-4 md:left-8 text-white/70 hover:text-white z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                prevPhoto();
              }}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Image */}
            <motion.div
              key={lightboxIndex}
              className="relative w-[90vw] h-[80vh] max-w-5xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={galleryPhotos[lightboxIndex].src}
                alt={galleryPhotos[lightboxIndex].caption}
                fill
                className="object-contain rounded-xl"
              />
              <div className="absolute bottom-0 left-0 right-0 text-center py-4 bg-linear-to-t from-black/60 to-transparent rounded-b-xl">
                <p className="text-white font-medium text-lg">
                  {galleryPhotos[lightboxIndex].caption}
                </p>
                <p className="text-white/50 text-sm mt-1">
                  {lightboxIndex + 1} / {galleryPhotos.length}
                </p>
              </div>
            </motion.div>

            {/* Next */}
            <button
              className="absolute right-4 md:right-8 text-white/70 hover:text-white z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                nextPhoto();
              }}
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}