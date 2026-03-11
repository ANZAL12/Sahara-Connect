"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, MapPin, Clock, ChevronLeft, ChevronRight, Sparkles, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { supabase } from "@/lib/supabase";

interface FestEvent {
  id: string;
  title: string;
  description?: string;
  date: string;
  time?: string;
  venue?: string;
  image_url?: string;
}

export default function FestSection() {
  const [events, setEvents] = useState<FestEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function fetchFestEvents() {
      try {
        const { data, error } = await supabase
          .from('events')
          .select('*')
          .eq('type', 'Sahara Fest')
          .gte('date', new Date().toISOString().split('T')[0])
          .order('date', { ascending: true });

        if (error) throw error;
        setEvents(data || []);
      } catch (err) {
        console.error("Error fetching fest events:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchFestEvents();
  }, []);

  const nextEvent = () => {
    setCurrentIndex((prev) => (prev + 1) % events.length);
  };

  const prevEvent = () => {
    setCurrentIndex((prev) => (prev - 1 + events.length) % events.length);
  };

  if (loading) {
    return (
      <Section className="bg-secondary/20 border-t border-border min-h-[400px] flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </Section>
    );
  }

  if (events.length === 0) {
    return null; // Don't show the section if there are no upcoming fest events
  }

  const currentEvent = events[currentIndex];

  return (
    <Section className="bg-secondary/10 border-t border-border overflow-hidden relative">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-[100px] -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -ml-48 -mb-48" />

      <Container>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-bold mb-6">
            <Sparkles className="w-4 h-4" />
            Upcoming Fest Events
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
            Experience the <span className="text-black">Spirit</span> of Sahara
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join us for a series of unforgettable events celebrating our community&apos;s 
            vibrant culture and enduring connections.
          </p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentEvent.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <Card className="grid md:grid-cols-2 gap-0 overflow-hidden border-0 shadow-2xl bg-card rounded-3xl">
                {/* Event Image */}
                <div className="relative h-[300px] md:h-full min-h-[400px]">
                  <Image
                    src={currentEvent.image_url || "/memories/Acer_Wallpaper_03_3840x2400.jpg"}
                    alt={currentEvent.title}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:hidden" />
                  <div className="absolute bottom-6 left-6 md:hidden">
                    <h3 className="text-2xl font-bold text-white shrink-0">{currentEvent.title}</h3>
                  </div>
                </div>

                {/* Event Details */}
                <CardContent className="p-8 md:p-12 flex flex-col justify-center bg-white">
                  <div className="hidden md:block mb-4">
                    <h3 className="text-4xl font-serif font-bold text-gray-900 leading-tight">
                      {currentEvent.title}
                    </h3>
                  </div>

                  <p className="text-lg text-gray-600 mb-8 leading-relaxed line-clamp-4">
                    {currentEvent.description || "Be part of this amazing celebration and create memories that will last a lifetime."}
                  </p>

                  <div className="space-y-4 mb-10">
                    <div className="flex items-center gap-4 text-gray-700">
                      <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-black" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs uppercase tracking-wider font-bold text-gray-400">Date</span>
                        <span className="font-semibold">{new Date(currentEvent.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-gray-700">
                      <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center">
                        <Clock className="w-5 h-5 text-black" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs uppercase tracking-wider font-bold text-gray-400">Time</span>
                        <span className="font-semibold">{currentEvent.time || "10:00 AM onwards"}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-gray-700">
                      <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-black" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs uppercase tracking-wider font-bold text-gray-400">Venue</span>
                        <span className="font-semibold">{currentEvent.venue || "Sahara Campus Grounds"}</span>
                      </div>
                    </div>
                  </div>

                  <Link href="/events" className="mt-auto">
                    <Button
                      size="lg"
                      className="w-full md:w-auto bg-black hover:bg-gray-800 text-white font-bold rounded-2xl py-7 px-10 text-lg shadow-xl translate-y-0 hover:-translate-y-1 transition-all duration-300"
                    >
                      Explore All Events
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Carousel Controls */}
          {events.length > 1 && (
            <div className="flex justify-center md:justify-end gap-4 mt-8">
              <Button
                variant="outline"
                size="icon"
                onClick={prevEvent}
                className="rounded-full w-12 h-12 border-gray-200 hover:border-black hover:bg-black hover:text-white transition-all duration-300 shadow-md"
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>
              <div className="flex items-center gap-2 px-4 bg-gray-50 rounded-full text-sm font-bold text-gray-400">
                <span className="text-black">{currentIndex + 1}</span> / {events.length}
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={nextEvent}
                className="rounded-full w-12 h-12 border-gray-200 hover:border-black hover:bg-black hover:text-white transition-all duration-300 shadow-md"
              >
                <ChevronRight className="w-6 h-6" />
              </Button>
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
}