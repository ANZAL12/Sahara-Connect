"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Calendar, Heart, Loader2 } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

// Aesthetic configurations we can map dynamic batches to
const aestheticConfigs = [
  {
    color: "from-gray-800 to-black",
    avatars: ["/memories/Acer_Wallpaper_01_3840x2400.jpg", "/memories/Acer_Wallpaper_02_3840x2400.jpg", "/memories/Acer_Wallpaper_03_3840x2400.jpg"],
    backgroundImage: "/memories/Acer_Wallpaper_01_3840x2400.jpg",
  },
  {
    color: "from-gray-700 to-gray-900",
    avatars: ["/memories/Acer_Wallpaper_02_3840x2400.jpg", "/memories/Acer_Wallpaper_03_3840x2400.jpg", "/memories/Acer_Wallpaper_04_3840x2400.jpg"],
    backgroundImage: "/memories/Acer_Wallpaper_02_3840x2400.jpg",
  },
  {
    color: "from-gray-600 to-gray-800",
    avatars: ["/memories/Acer_Wallpaper_03_3840x2400.jpg", "/memories/Acer_Wallpaper_04_3840x2400.jpg", "/memories/Acer_Wallpaper_05_3840x2400.jpg"],
    backgroundImage: "/memories/Acer_Wallpaper_03_3840x2400.jpg",
  },
  {
    color: "from-gray-500 to-gray-700",
    avatars: ["/memories/Acer_Wallpaper_01_3840x2400.jpg", "/memories/Acer_Wallpaper_04_3840x2400.jpg", "/memories/Acer_Wallpaper_05_3840x2400.jpg"],
    backgroundImage: "/memories/Acer_Wallpaper_04_3840x2400.jpg",
  },
];

type BatchData = {
  year: string;
  members: number;
  active: number;
  color: string;
  avatars: string[];
  backgroundImage: string;
};

export default function BatchNetworkSection() {
  const [batches, setBatches] = useState<BatchData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBatches() {
      try {
        // 1. Fetch all members to get counts and derive fallback batches
        const { data: membersData, error: membersError } = await supabase
          .from('batch_members')
          .select('batch');

        if (membersError) throw membersError;

        // Group members by batch
        const batchCounts: Record<string, number> = {};
        membersData?.forEach((row) => {
          batchCounts[row.batch] = (batchCounts[row.batch] || 0) + 1;
        });

        // 2. Try fetching explicit batches created by Admin
        const { data: explicitBatches } = await supabase
          .from('batches')
          .select('year')
          .order('year', { ascending: false });

        // 3. Merge explicit and derived batches uniquely
        const uniqueYears = new Set<string>();

        // Add explicit batches first
        if (explicitBatches && explicitBatches.length > 0) {
          explicitBatches.forEach(b => uniqueYears.add(b.year));
        }

        // Add derived batches (in case the admin table is empty but members exist)
        Object.keys(batchCounts).forEach(year => uniqueYears.add(year));

        // Sort years descending
        const sortedYears = Array.from(uniqueYears).sort().reverse();

        // 4. Format to UI array
        const formattedBatches = sortedYears.map((year, index) => {
          const config = aestheticConfigs[index % aestheticConfigs.length];
          const count = batchCounts[year] || 0;
          return {
            year,
            members: count,
            active: count, // Keeping it same as count for now since we don't track active status
            color: config.color,
            avatars: config.avatars,
            backgroundImage: config.backgroundImage,
          };
        });

        setBatches(formattedBatches);
      } catch (error) {
        console.error("Error fetching batches:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchBatches();
  }, []);

  return (
    <section className="py-24 px-6 bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden flex flex-col items-center">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-gray-200 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '0s' }} />
      <div className="absolute top-40 right-20 w-16 h-16 bg-gray-300 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-gray-400 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '2s' }} />

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-block p-2 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Users className="w-8 h-8 text-white" />
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-gray-800 mb-6">
            Batch <span className="text-black">Network</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Connect with your batchmates and relive the memories that shaped your journey.
            Each batch represents a unique chapter in Sahara&apos;s legendary story.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center py-20 min-h-[300px]">
            <Loader2 className="w-10 h-10 animate-spin text-gray-500" />
            <span className="ml-3 text-lg text-gray-600 font-medium">Loading network...</span>
          </div>
        ) : batches.length === 0 ? (
          <div className="text-center py-20 bg-white/50 backdrop-blur-sm rounded-2xl border border-gray-100 min-h-[300px] flex flex-col justify-center items-center h-full">
            <Users className="w-16 h-16 text-gray-300 mb-4" />
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No Batches Yet</h3>
            <p className="text-gray-500 max-w-md mx-auto">Be the first to create a network for your batch by joining!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {batches.map((batch, index) => (
              <motion.div
                key={batch.year}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <Card className="group relative overflow-hidden border-0 shadow-xl bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 h-full">
                  {/* Background Image Overlay */}
                  <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                    <img
                      src={batch.backgroundImage}
                      alt={`Batch ${batch.year} memories`}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${batch.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                  <CardHeader className="text-center pb-4 relative z-10">
                    <motion.div
                      className={`w-20 h-20 bg-gradient-to-br ${batch.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Calendar className="w-10 h-10 text-white" />
                    </motion.div>

                    <CardTitle className="text-3xl font-serif text-gray-800 mb-2 group-hover:text-black transition-colors duration-300">
                      {batch.year}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="text-center space-y-4 relative z-10">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="bg-gray-50 rounded-lg p-3">
                        <Users className="w-4 h-4 text-black mx-auto mb-1" />
                        <div className="font-bold text-gray-800">{batch.members}</div>
                        <div className="text-gray-600 text-xs">Total</div>
                      </div>
                      <div className="bg-green-50 rounded-lg p-3">
                        <div className="w-4 h-4 bg-green-500 rounded-full mx-auto mb-1"></div>
                        <div className="font-bold text-gray-800">{batch.active}</div>
                        <div className="text-gray-600 text-xs">Active</div>
                      </div>
                    </div>

                    {/* Enhanced Avatar Stack */}
                    <div className="flex justify-center -space-x-3 mb-4">
                      {batch.avatars.map((avatar, i) => (
                        <motion.div
                          key={i}
                          className="w-10 h-10 rounded-full border-3 border-white overflow-hidden shadow-md"
                          whileHover={{ scale: 1.2, zIndex: 10 }}
                          transition={{ duration: 0.2 }}
                        >
                          <img
                            src={avatar}
                            alt={`Member ${i + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </motion.div>
                      ))}
                      {batch.members > 3 && (
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 border-3 border-white flex items-center justify-center text-white text-xs font-bold shadow-md">
                          +{batch.members - 3}
                        </div>
                      )}
                    </div>

                    <Link href={`/batches/join?batch=${batch.year}`} className="w-full">
                      <Button
                        size="sm"
                        className={`w-full bg-gradient-to-r ${batch.color} hover:opacity-90 text-white font-semibold rounded-full group-hover:scale-105 transition-all duration-300`}
                      >
                        <Heart className="w-4 h-4 mr-1" />
                        Connect
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-600 mb-6">Can&apos;t find your batch? Help us grow the network!</p>
          <Link href="/batches/join">
            <Button className="bg-gradient-to-r from-black to-gray-800 hover:from-gray-800 hover:to-black text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
              Add Your Batch
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}