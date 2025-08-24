// components/Footer.tsx
"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer
      className="bg-foreground text-background py-12 px-4"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-serif font-black">
                  GC
                </span>
              </div>
              <h4 className="text-xl font-serif font-black">The Cake Panier</h4>
            </div>
            <p className="text-background/80">
              Crafting exceptional baked goods with love and tradition since
              1970.
            </p>
          </div>

          <div>
            <h5 className="font-serif font-bold mb-4">Quick Links</h5>
            <ul className="space-y-2 text-background/80">
              <li>
                <a
                  href="#home"
                  className="hover:text-primary transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/products"
                  className="hover:text-primary transition-colors"
                >
                  Products
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="hover:text-primary transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#location"
                  className="hover:text-primary transition-colors"
                >
                  Location
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-serif font-bold mb-4">Products</h5>
            <ul className="space-y-2 text-background/80">
              <li>Artisanal Breads</li>
              <li>Fresh Pastries</li>
              <li>Custom Cakes</li>
              <li>Seasonal Specials</li>
            </ul>
          </div>

          <div>
            <h5 className="font-serif font-bold mb-4">Contact Info</h5>
            <div className="space-y-2 text-background/80">
              <p>Cheptulu - Chavakali Road</p>
              <p>Kaimosi KE</p>
              <p>+254 0114020977</p>
              <p>orders@thecackepanier.com</p>
            </div>
          </div>
        </div>

        <div className="border-t border-background/20 mt-8 pt-8 text-center text-background/60">
          <p>&copy; 2025 The Cake Panier Bakery. All rights reserved.</p>
        </div>
      </div>
    </motion.footer>
  );
}
