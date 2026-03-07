"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Calendar } from "lucide-react";
import { useState, useEffect } from "react";

import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";

export default function FestSection() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const targetDate = new Date("2026-03-15T00:00:00").getTime();

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <Section className="bg-secondary/20 border-t border-border">
      <Container>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
            Sahara <span className="text-accent tracking-tight">Fest</span> 2026
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Help us make this year&apos;s festival unforgettable. Your contributions keep the
            spirit of Sahara alive and create new memories for generations to come.
          </p>
        </motion.div>

        <div className="flex justify-center items-center">
          {/* Countdown Timer */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="w-full max-w-2xl"
          >
            <Card className="bg-primary text-primary-foreground border-0 shadow-2xl relative overflow-hidden">
               {/* Decorative background element */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
              
              <CardHeader className="text-center relative z-10">
                <CardTitle className="text-2xl font-serif flex items-center justify-center gap-2">
                  <Calendar className="w-6 h-6 text-accent" />
                  Fest Countdown
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="grid grid-cols-4 gap-4 text-center mb-8">
                  {[
                    { label: "Days", value: timeLeft.days },
                    { label: "Hours", value: timeLeft.hours },
                    { label: "Minutes", value: timeLeft.minutes },
                    { label: "Seconds", value: timeLeft.seconds },
                  ].map((item) => (
                    <div key={item.label} className="bg-background/10 rounded-xl p-4 backdrop-blur-sm border border-background/10">
                      <div className="text-4xl font-bold font-mono">{item.value.toString().padStart(2, '0')}</div>
                      <div className="text-sm uppercase tracking-wider opacity-80 mt-2">{item.label}</div>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-center">
                  <Button
                    size="lg"
                    className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold rounded-full py-6 px-12 text-lg shadow-lg flex items-center justify-center gap-2 group transition-all duration-300 transform hover:scale-[1.02]"
                  >
                    <Heart className="w-5 h-5 group-hover:scale-125 group-hover:fill-current transition-all" />
                    RSVP Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}