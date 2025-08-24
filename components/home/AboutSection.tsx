// components/AboutSection.tsx
"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function AboutSection() {
  const [aboutRef, aboutInView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const stats = [
    { number: "50+", label: "Years Experience" },
    { number: "100+", label: "Daily Varieties" },
    { number: "5000+", label: "Happy Customers" },
  ];

  return (
    <section id="about" className="py-20 px-4" ref={aboutRef}>
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -50 }}
            animate={aboutInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <motion.h3
              className="text-4xl font-serif font-black text-foreground"
              initial={{ opacity: 0, y: 30 }}
              animate={aboutInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Our Story
            </motion.h3>
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={aboutInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <p className="text-lg text-muted-foreground leading-relaxed">
                For over three generations, The Cake Panier Bakery has been
                crafting exceptional baked goods using time-honored techniques
                and the finest ingredients. What started as a small family
                recipe collection has grown into a beloved neighborhood
                institution.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Every morning before dawn, our master bakers begin their craft,
                ensuring that each loaf, pastry, and dessert meets our exacting
                standards of quality and taste. We source our ingredients
                locally whenever possible, supporting our community while
                delivering unmatched freshness.
              </p>
            </motion.div>
            <motion.div
              className="grid grid-cols-3 gap-6 pt-6"
              initial={{ opacity: 0, y: 30 }}
              animate={aboutInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={aboutInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                >
                  <div className="text-3xl font-serif font-black text-primary mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={aboutInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            whileHover={{ scale: 1.02 }}
          >
            <img
              src="https://i.pinimg.com/736x/bf/c6/37/bfc637f342c9834e605a87a9ad8c51a3.jpg"
              alt="Baker at work"
              className="rounded-lg shadow-xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
