"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { UserPlus, Globe, Users, GraduationCap, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";

export default function CTASection() {
  const [stats, setStats] = useState({
    members: 0,
    batches: 0,
    countries: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const { data, error } = await supabase
          .from('batch_members')
          .select('batch, country');

        if (error) throw error;

        if (data) {
          const uniqueBatches = new Set(data.map(m => m.batch).filter(Boolean));
          const uniqueCountries = new Set(data.map(m => m.country).filter(Boolean));

          setStats({
            members: data.length,
            batches: uniqueBatches.size,
            countries: uniqueCountries.size,
          });
        }
      } catch (err) {
        console.error("Error fetching CTA stats:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  return (
    <Section className="bg-background relative overflow-hidden">
      {/* Decorative background blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <Container className="text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 text-primary text-sm font-bold mb-8">
            <Users className="w-4 h-4" />
            Join Our Global Community
          </div>

          <h2 className="text-4xl md:text-6xl font-serif font-bold text-foreground mb-8">
            Ready to <span className="text-black italic">Reconnect?</span>
          </h2>

          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            Join thousands of Saharians who are already part of this growing community. 
            Whether you&apos;re looking to network, share memories, or contribute to our events, 
            Sahara Connect is your home away from home.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/batches/join">
                <Button
                  size="lg"
                  className="bg-black hover:bg-gray-800 text-white font-bold px-10 py-8 text-xl rounded-2xl shadow-2xl flex items-center gap-3 transition-all duration-300"
                >
                  <UserPlus className="w-6 h-6" />
                  Become a Member
                </Button>
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {loading ? (
            <div className="col-span-1 md:col-span-3 flex justify-center py-10">
              <Loader2 className="w-8 h-8 animate-spin text-gray-300" />
            </div>
          ) : (
            <>
              <Card className="border-0 shadow-xl bg-white rounded-3xl group hover:-translate-y-2 transition-all duration-500">
                <CardContent className="p-10 text-center">
                  <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-black group-hover:text-white transition-colors duration-500">
                    <Users className="w-8 h-8" />
                  </div>
                  <div className="text-5xl font-serif font-bold text-gray-900 mb-2">
                    {stats.members.toLocaleString()}+
                  </div>
                  <div className="text-gray-400 font-bold uppercase tracking-widest text-xs">Active Members</div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-xl bg-white rounded-3xl group hover:-translate-y-2 transition-all duration-500">
                <CardContent className="p-10 text-center">
                  <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-black group-hover:text-white transition-colors duration-500">
                    <GraduationCap className="w-8 h-8" />
                  </div>
                  <div className="text-5xl font-serif font-bold text-gray-900 mb-2">
                    {stats.batches}+
                  </div>
                  <div className="text-gray-400 font-bold uppercase tracking-widest text-xs">Batches Connected</div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-xl bg-white rounded-3xl group hover:-translate-y-2 transition-all duration-500">
                <CardContent className="p-10 text-center">
                  <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-black group-hover:text-white transition-colors duration-500">
                    <Globe className="w-8 h-8" />
                  </div>
                  <div className="text-5xl font-serif font-bold text-gray-900 mb-2">
                    {stats.countries}+
                  </div>
                  <div className="text-gray-400 font-bold uppercase tracking-widest text-xs">Countries Reached</div>
                </CardContent>
              </Card>
            </>
          )}
        </motion.div>
      </Container>
    </Section>
  );
}