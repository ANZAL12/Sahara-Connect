"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  MapPin,
  Clock,
  ArrowRight,
  Sparkles,
  Music,
  Trophy,
  Palette,
  Users,
  Mic2,
} from "lucide-react";

import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";

/* ── Mock Data ─────────────────────────────────────────── */

const SAHARA_FEST = {
  title: "Sahara Fest 2026",
  tagline: "The Grand Annual Celebration",
  date: "March 15, 2026",
  time: "10:00 AM onwards",
  venue: "Sahara Campus Grounds",
  description:
    "The flagship event of the Sahara community. Three days of competitions, performances, reunions, and unforgettable memories that bring every generation together.",
  image: "/memories/Acer_Wallpaper_03_3840x2400.jpg",
};

const PRE_EVENTS = [
  {
    id: 1,
    title: "Battle of Bands",
    date: "March 10, 2026",
    time: "5:00 PM",
    venue: "Open Air Theatre",
    category: "Music",
    icon: Music,
    description:
      "Bands from across batches compete in an electrifying showdown of talent and nostalgia.",
  },
  {
    id: 2,
    title: "Alumni Cricket Premier League",
    date: "March 11, 2026",
    time: "7:00 AM",
    venue: "Sports Complex",
    category: "Sports",
    icon: Trophy,
    description:
      "Batch vs batch cricket tournament. Relive your school-ground glory days.",
  },
  {
    id: 3,
    title: "Art & Canvas Night",
    date: "March 12, 2026",
    time: "6:00 PM",
    venue: "Exhibition Hall",
    category: "Creative",
    icon: Palette,
    description:
      "Collaborative mural painting and live art installations by alumni artists.",
  },
  {
    id: 4,
    title: "Panel Talk: Career Journeys",
    date: "March 13, 2026",
    time: "3:00 PM",
    venue: "Auditorium",
    category: "Talk",
    icon: Mic2,
    description:
      "Distinguished alumni share career insights and mentor current students.",
  },
  {
    id: 5,
    title: "Networking Mixer",
    date: "March 14, 2026",
    time: "7:00 PM",
    venue: "Rooftop Lounge",
    category: "Networking",
    icon: Users,
    description:
      "An evening of connections, conversations, and community over cocktails.",
  },
];

const OTHER_EVENTS = [
  {
    id: 101,
    title: "Quarterly Alumni Meet – Q2",
    date: "June 20, 2026",
    time: "4:00 PM",
    venue: "Virtual (Zoom)",
    category: "Community",
    description:
      "Stay connected with quarterly virtual catch-ups. Open to all batches.",
  },
  {
    id: 102,
    title: "Sahara Hackathon 2026",
    date: "August 8-9, 2026",
    time: "All Day",
    venue: "Innovation Lab",
    category: "Tech",
    description:
      "48-hour hackathon bringing alumni coders together to build solutions for real-world problems.",
  },
  {
    id: 103,
    title: "Annual Charity Run",
    date: "October 2, 2026",
    time: "6:00 AM",
    venue: "City Waterfront",
    category: "Social",
    description:
      "Run for a cause! Proceeds go to Sahara scholarship funds for underprivileged students.",
  },
];

const TABS = ["All", "Sahara Fest", "Other Events"];

/* ── Component ─────────────────────────────────────────── */

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState("All");

  return (
    <div className="bg-background min-h-screen">
      {/* ── Hero Banner ── */}
      <div className="relative h-[420px] md:h-[480px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${SAHARA_FEST.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background" />

        <Container className="relative z-10 flex flex-col justify-end h-full pb-16 pt-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="bg-accent text-accent-foreground mb-4 text-sm px-4 py-1 rounded-full shadow-md">
              <Sparkles className="w-4 h-4 mr-1 inline" /> Upcoming
            </Badge>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-3 drop-shadow-lg">
              {SAHARA_FEST.title}
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl">
              {SAHARA_FEST.tagline}
            </p>
            <div className="flex flex-wrap gap-6 mt-6 text-white/90 text-sm">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" /> {SAHARA_FEST.date}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" /> {SAHARA_FEST.time}
              </span>
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4" /> {SAHARA_FEST.venue}
              </span>
            </div>
          </motion.div>
        </Container>
      </div>

      {/* ── Main Content ── */}
      <Section className="pt-16">
        <Container>
          {/* Tab Filters */}
          <motion.div
            className="flex flex-wrap justify-center gap-3 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {TABS.map((tab) => (
              <Button
                key={tab}
                variant={activeTab === tab ? "default" : "outline"}
                className={`rounded-full px-6 transition-all duration-300 ${
                  activeTab === tab
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "border-border text-foreground hover:border-primary hover:text-primary"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </Button>
            ))}
          </motion.div>

          <AnimatePresence mode="wait">
            {/* ── Sahara Fest Section ── */}
            {(activeTab === "All" || activeTab === "Sahara Fest") && (
              <motion.div
                key="fest"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                {/* Fest highlight card */}
                <div className="mb-14">
                  <h2 className="text-3xl font-serif font-bold text-foreground mb-2">
                    <Sparkles className="w-6 h-6 text-accent inline mr-2" />
                    Sahara Fest 2026
                  </h2>
                  <p className="text-muted-foreground mb-8 max-w-3xl">
                    {SAHARA_FEST.description}
                  </p>
                </div>

                {/* Pre-Events Timeline */}
                <h3 className="text-xl font-semibold text-foreground mb-8 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" /> Pre-Event
                  Schedule
                </h3>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
                  {PRE_EVENTS.map((event, i) => {
                    const Icon = event.icon;
                    return (
                      <motion.div
                        key={event.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: i * 0.08 }}
                        viewport={{ once: true }}
                      >
                        <Card className="group h-full border border-border bg-card hover:scale-[1.02] hover:shadow-xl transition-all duration-500 overflow-hidden">
                          {/* Colour accent bar */}
                          <div className="h-1 w-full bg-gradient-to-r from-primary via-accent to-primary" />

                          <CardContent className="p-6 flex flex-col h-full">
                            <div className="flex items-center gap-3 mb-4">
                              <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                <Icon className="w-5 h-5" />
                              </div>
                              <Badge
                                variant="secondary"
                                className="text-xs font-medium"
                              >
                                {event.category}
                              </Badge>
                            </div>

                            <h4 className="text-lg font-bold text-foreground mb-2">
                              {event.title}
                            </h4>
                            <p className="text-sm text-muted-foreground mb-4 flex-grow">
                              {event.description}
                            </p>

                            <div className="space-y-1 text-xs text-muted-foreground border-t border-border pt-4 mt-auto">
                              <div className="flex items-center gap-2">
                                <Calendar className="w-3.5 h-3.5" />{" "}
                                {event.date}
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock className="w-3.5 h-3.5" /> {event.time}
                              </div>
                              <div className="flex items-center gap-2">
                                <MapPin className="w-3.5 h-3.5" />{" "}
                                {event.venue}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* ── Other Events Section ── */}
            {(activeTab === "All" || activeTab === "Other Events") && (
              <motion.div
                key="other"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <h2 className="text-3xl font-serif font-bold text-foreground mb-8 flex items-center gap-2">
                  <Calendar className="w-6 h-6 text-primary" /> Upcoming
                  Community Events
                </h2>

                <div className="space-y-6">
                  {OTHER_EVENTS.map((event, i) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <Card className="group border border-border bg-card hover:shadow-lg hover:border-primary/30 transition-all duration-500">
                        <CardContent className="p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-6">
                          {/* Date Block */}
                          <div className="flex-shrink-0 w-20 h-20 rounded-2xl bg-primary/10 text-primary flex flex-col items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                            <span className="text-2xl font-bold leading-none">
                              {event.date.split(" ")[1]?.replace(",", "")}
                            </span>
                            <span className="text-xs font-medium uppercase mt-1">
                              {event.date.split(" ")[0]?.slice(0, 3)}
                            </span>
                          </div>

                          {/* Details */}
                          <div className="flex-grow">
                            <div className="flex flex-wrap items-center gap-2 mb-1">
                              <h4 className="text-xl font-bold text-foreground">
                                {event.title}
                              </h4>
                              <Badge
                                variant="secondary"
                                className="text-xs font-medium"
                              >
                                {event.category}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">
                              {event.description}
                            </p>
                            <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Clock className="w-3.5 h-3.5" /> {event.time}
                              </span>
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3.5 h-3.5" />{" "}
                                {event.venue}
                              </span>
                            </div>
                          </div>

                          {/* CTA */}
                          <Button
                            variant="outline"
                            className="rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all flex-shrink-0 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary"
                          >
                            Details <ArrowRight className="w-4 h-4 ml-1" />
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Container>
      </Section>
    </div>
  );
}
