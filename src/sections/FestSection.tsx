"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Calendar, Target } from "lucide-react";
import { useState, useEffect } from "react";

export default function FestSection() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const targetDate = new Date("2026-03-15T00:00:00").getTime();
  const currentAmount = 75000;
  const targetAmount = 100000;

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

  const progressPercentage = (currentAmount / targetAmount) * 100;

  return (
    <section className="py-24 px-6 bg-gradient-to-b from-gray-100 to-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-800 mb-6">
            Sahara <span className="text-black">Fest</span> 2026
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Help us make this year's festival unforgettable. Your contributions keep the
            spirit of Sahara alive and create new memories for generations to come.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Countdown Timer */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gradient-to-br from-black to-gray-800 text-white border-0 shadow-2xl">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-serif flex items-center justify-center gap-2">
                  <Calendar className="w-6 h-6" />
                  Fest Countdown
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-4 text-center">
                  <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                    <div className="text-3xl font-bold">{timeLeft.days}</div>
                    <div className="text-sm opacity-90">Days</div>
                  </div>
                  <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                    <div className="text-3xl font-bold">{timeLeft.hours}</div>
                    <div className="text-sm opacity-90">Hours</div>
                  </div>
                  <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                    <div className="text-3xl font-bold">{timeLeft.minutes}</div>
                    <div className="text-sm opacity-90">Minutes</div>
                  </div>
                  <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                    <div className="text-3xl font-bold">{timeLeft.seconds}</div>
                    <div className="text-sm opacity-90">Seconds</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Fundraising Progress */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-serif flex items-center justify-center gap-2 text-gray-800">
                  <Target className="w-6 h-6 text-black" />
                  Fundraising Goal
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-black mb-2">
                    ₹{currentAmount.toLocaleString()}
                  </div>
                  <div className="text-gray-600">
                    of ₹{targetAmount.toLocaleString()} raised
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-black to-gray-800 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${progressPercentage}%` }}
                    transition={{ duration: 2, delay: 0.5 }}
                    viewport={{ once: true }}
                  />
                </div>

                <div className="text-center text-sm text-gray-600">
                  {progressPercentage.toFixed(1)}% of goal reached
                </div>

                <Button
                  className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-semibold rounded-full py-3 flex items-center justify-center gap-2 group"
                >
                  <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  Contribute Now
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}