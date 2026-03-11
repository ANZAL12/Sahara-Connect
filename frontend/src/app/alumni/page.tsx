"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Briefcase, Linkedin, User as UserIcon } from "lucide-react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";

interface Alumnus {
  id: string;
  name: string;
  job_title: string;
  company: string;
  country: string;
  profile_image_url: string;
  batch: string;
  linkedin_url: string;
}

export default function AlumniDirectoryPage() {
  const [alumni, setAlumni] = useState<Alumnus[]>([]);
  const [batches, setBatches] = useState<string[]>(["All"]);
  const [selectedBatch, setSelectedBatch] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlumni = async () => {
      try {
        const { data, error } = await supabase
          .from('batch_members')
          .select('*')
          .order('batch', { ascending: false })
          .order('name', { ascending: true });

        if (error) throw error;
        
        const alumniData = data || [];
        setAlumni(alumniData);

        // Generate dynamic batch list
        const uniqueBatches = Array.from(new Set(alumniData.map((a: Alumnus) => a.batch)))
          .sort((a, b) => b.localeCompare(a)); // Sort descending (newest first)
        
        setBatches(["All", ...uniqueBatches]);
      } catch (error) {
        console.error("Error fetching alumni:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAlumni();
  }, []);

  const filteredAlumni =
    selectedBatch === "All"
      ? alumni
      : alumni.filter((alumnus) => alumnus.batch === selectedBatch);

  // Grouping logic for "All" view
  const groupedAlumni = filteredAlumni.reduce((acc, person) => {
    const batch = person.batch || "Unknown";
    if (!acc[batch]) acc[batch] = [];
    acc[batch].push(person);
    return acc;
  }, {} as Record<string, Alumnus[]>);

  // Sort batches for display (descending)
  const sortedBatchKeys = Object.keys(groupedAlumni).sort((a, b) => b.localeCompare(a));

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
        {batches.length > 2 && (
          <motion.div 
            className="flex flex-wrap justify-center gap-3 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {batches.map((batch) => (
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
        )}

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          /* Alumni Groups */
          <div className="space-y-20">
            {sortedBatchKeys.map((batch) => (
              <motion.div 
                key={batch}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <div className="flex items-center gap-4">
                  <h2 className="text-3xl font-serif font-bold text-foreground shrink-0">
                    Batch of <span className="text-primary">{batch}</span>
                  </h2>
                  <div className="h-px bg-border flex-grow" />
                  <Badge variant="outline" className="text-muted-foreground">{groupedAlumni[batch].length} Members</Badge>
                </div>

                <div className="grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  <AnimatePresence mode="popLayout">
                    {groupedAlumni[batch].map((person) => (
                      <motion.div
                        key={person.id}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.4 }}
                      >
                        <Card className="group h-full flex flex-col hover:scale-[1.03] hover:shadow-2xl transition-all duration-500 border border-border bg-card overflow-hidden">
                          <div className="relative h-56 overflow-hidden bg-muted flex items-center justify-center">
                            {person.profile_image_url ? (
                              <Image
                                src={person.profile_image_url}
                                alt={person.name}
                                fill
                                unoptimized
                                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                              />
                            ) : (
                              <UserIcon className="w-20 h-20 text-muted-foreground/20" />
                            )}
                          </div>

                          <CardContent className="p-6 flex flex-col flex-grow">
                            <div className="mb-4 flex-grow">
                              <h3 className="text-2xl font-serif font-bold text-foreground mb-1 leading-tight">
                                {person.name}
                              </h3>

                              <div className="space-y-2 mt-4 text-muted-foreground">
                                {person.job_title && (
                                  <div className="flex items-start gap-2">
                                    <Briefcase className="w-4 h-4 text-primary mt-1 shrink-0" />
                                    <div>
                                      <span className="font-semibold text-foreground block leading-tight">{person.job_title}</span>
                                      {person.company && (
                                        <span className="text-sm font-medium text-primary block mt-0.5">{person.company}</span>
                                      )}
                                    </div>
                                  </div>
                                )}

                                {person.country && (
                                  <div className="flex items-center gap-2 text-sm pt-1">
                                    <MapPin className="w-4 h-4 shrink-0 text-muted-foreground" />
                                    <span>{person.country}</span>
                                  </div>
                                )}
                              </div>
                            </div>

                            {person.linkedin_url && (
                              <Button 
                                className="w-full mt-4 bg-secondary hover:bg-secondary/80 text-secondary-foreground border border-border shadow-sm group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300"
                                asChild
                              >
                                <a href={person.linkedin_url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                                  <Linkedin className="w-4 h-4" />
                                  Connect
                                </a>
                              </Button>
                            )}
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredAlumni.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-2xl text-muted-foreground font-serif">
              {selectedBatch === "All" 
                ? "No alumni found in the directory yet." 
                : `No alumni found for Batch of ${selectedBatch} yet.`}
            </p>
          </motion.div>
        )}
      </Container>
    </Section>
  );
}