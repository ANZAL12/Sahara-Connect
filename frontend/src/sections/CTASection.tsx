"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { UserPlus } from "lucide-react";

import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";

export default function CTASection() {
  return (
    <Section className="bg-background">
      <Container className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
            Ready to Reconnect?
          </h2>

          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Join thousands of Saharians who are already part of this growing community.
            Whether you&apos;re looking to network, share memories, or contribute to our events,
            Sahara Connect is your home away from home.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-6 text-lg rounded-full shadow-lg flex items-center gap-3"
              >
                <UserPlus className="w-5 h-5" />
                Register Now
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Card className="border border-border shadow-sm bg-card hover:shadow-md transition-shadow">
            <CardContent className="p-8 text-center">
              <div className="text-4xl font-serif font-bold text-primary mb-2">2,500+</div>
              <div className="text-muted-foreground font-medium">Active Members</div>
            </CardContent>
          </Card>

          <Card className="border border-border shadow-sm bg-card hover:shadow-md transition-shadow">
            <CardContent className="p-8 text-center">
              <div className="text-4xl font-serif font-bold text-primary mb-2">15+</div>
              <div className="text-muted-foreground font-medium">Batches Connected</div>
            </CardContent>
          </Card>

          <Card className="border border-border shadow-sm bg-card hover:shadow-md transition-shadow">
            <CardContent className="p-8 text-center">
              <div className="text-4xl font-serif font-bold text-primary mb-2">50+</div>
              <div className="text-muted-foreground font-medium">Countries Reached</div>
            </CardContent>
          </Card>
        </motion.div>
      </Container>
    </Section>
  );
}