// components/NewsletterSection.tsx
"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function NewsletterSection() {
  return (
    <motion.section
      className="py-20 px-4"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="container mx-auto max-w-4xl text-center">
        <motion.div
          className="bg-card rounded-2xl p-12 border border-border"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <h3 className="text-3xl font-serif font-black text-foreground mb-4">
            Subscribe to Our Newsletter
          </h3>
          <p className="text-muted-foreground text-lg mb-8">
            Get the latest updates on new products, special offers, and baking
            tips delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8">
                Subscribe
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
