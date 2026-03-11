"use client";

import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Calendar, Heart } from "lucide-react";

const batches = [
  {
    year: "2015",
    members: 45,
    active: 32,
    color: "from-primary/90 to-primary",
    avatars: ["/memories/Acer_Wallpaper_01_3840x2400.jpg", "/memories/Acer_Wallpaper_02_3840x2400.jpg", "/memories/Acer_Wallpaper_03_3840x2400.jpg"],
    backgroundImage: "/memories/Acer_Wallpaper_01_3840x2400.jpg",
  },
  {
    year: "2016",
    members: 52,
    active: 41,
    color: "from-primary/80 to-primary/90",
    avatars: ["/memories/Acer_Wallpaper_02_3840x2400.jpg", "/memories/Acer_Wallpaper_03_3840x2400.jpg", "/memories/Acer_Wallpaper_04_3840x2400.jpg"],
    backgroundImage: "/memories/Acer_Wallpaper_02_3840x2400.jpg",
  },
  {
    year: "2017",
    members: 38,
    active: 29,
    color: "from-primary/70 to-primary/80",
    avatars: ["/memories/Acer_Wallpaper_03_3840x2400.jpg", "/memories/Acer_Wallpaper_04_3840x2400.jpg", "/memories/Acer_Wallpaper_05_3840x2400.jpg"],
    backgroundImage: "/memories/Acer_Wallpaper_03_3840x2400.jpg",
  },
  {
    year: "2018",
    members: 61,
    active: 48,
    color: "from-primary/60 to-primary/70",
    avatars: ["/memories/Acer_Wallpaper_01_3840x2400.jpg", "/memories/Acer_Wallpaper_04_3840x2400.jpg", "/memories/Acer_Wallpaper_05_3840x2400.jpg"],
    backgroundImage: "/memories/Acer_Wallpaper_04_3840x2400.jpg",
  },
];

export default function BatchNetworkSection() {
  return (
    <Section className="bg-background">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '0s' }} />
      <div className="absolute top-40 right-20 w-16 h-16 bg-accent/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-primary/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }} />

      <Container>
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-block p-4 bg-primary rounded-2xl mb-6 shadow-md"
            whileHover={{ scale: 1.05 }}
          >
            <Users className="w-8 h-8 text-primary-foreground" />
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-foreground mb-6">
            Batch <span className="text-primary tracking-tight">Network</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Connect with your batchmates and relive the memories that shaped your journey.
            Each batch represents a unique chapter in Sahara&apos;s legendary story.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {batches.map((batch, index) => (
            <motion.div
              key={batch.year}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <Card className="group relative overflow-hidden border border-border shadow-sm hover:shadow-xl transition-all duration-500 h-full bg-card">
                {/* Background Image Overlay */}
                <div className="absolute inset-0 opacity-[0.05] group-hover:opacity-[0.15] transition-opacity duration-500 grayscale">
                  <img
                    src={batch.backgroundImage}
                    alt={`Batch ${batch.year} memories`}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-linear-to-br ${batch.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                <CardHeader className="text-center pb-4 relative z-10">
                  <motion.div
                    className={`w-20 h-20 bg-linear-to-br ${batch.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Calendar className="w-10 h-10 text-primary-foreground" />
                  </motion.div>

                  <CardTitle className="text-3xl font-serif text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                    {batch.year}
                  </CardTitle>
                </CardHeader>

                <CardContent className="text-center space-y-4 relative z-10">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="bg-secondary rounded-xl p-3 ring-1 ring-border/50">
                      <Users className="w-4 h-4 text-foreground mx-auto mb-1" />
                      <div className="font-bold text-foreground">{batch.members}</div>
                      <div className="text-muted-foreground text-xs">Total</div>
                    </div>
                    <div className="bg-secondary/50 rounded-xl p-3 ring-1 ring-border/50">
                      <div className="w-4 h-4 bg-emerald-500/80 rounded-full mx-auto mb-1 ring-2 ring-emerald-500/20"></div>
                      <div className="font-bold text-foreground">{batch.active}</div>
                      <div className="text-muted-foreground text-xs">Active</div>
                    </div>
                  </div>

                  {/* Enhanced Avatar Stack */}
                  <div className="flex justify-center -space-x-3 mb-4">
                    {batch.avatars.map((avatar, i) => (
                      <motion.div
                        key={i}
                        className="w-10 h-10 rounded-full border-2 border-background overflow-hidden shadow-sm"
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
                    <div className="w-10 h-10 rounded-full bg-muted border-2 border-background flex items-center justify-center text-muted-foreground text-xs font-bold shadow-sm">
                      +{batch.members - 3}
                    </div>
                  </div>

                  <Button
                    size="sm"
                    className={`w-full bg-linear-to-r ${batch.color} hover:opacity-90 text-primary-foreground font-semibold rounded-full group-hover:scale-[1.02] transition-all duration-300`}
                  >
                    <Heart className="w-4 h-4 mr-2" />
                    Connect
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="text-muted-foreground mb-6">Can&apos;t find your batch? Help us grow the network!</p>
          <Button className="font-semibold px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            Add Your Batch
          </Button>
        </motion.div>
      </Container>
    </Section>
  );
}