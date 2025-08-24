// components/HeroSection.tsx
"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

// Image data array
const heroImages = [
  {
    src: "https://i.pinimg.com/1200x/8e/43/b4/8e43b43a71525cc8c22f76fbecd2c09c.jpg",
    alt: "Chocolate croissant",
    delay: 0.1,
  },
  {
    src: "https://i.pinimg.com/736x/97/d3/17/97d3179bf7f823b5b9dd67e51ad0395f.jpg",
    alt: "Vanilla Birthday Cake",
    delay: 0.2,
  },
  {
    src: "https://cdn.sanity.io/images/7rkl59hi/production/e0e4b16cbe5dc4df16b8fa281ad5ca69d94a1d76-960x1200.png?fm=webp&q=75&auto=format",
    alt: "Macarons",
    delay: 0.3,
  },
  {
    src: "https://i.pinimg.com/1200x/37/01/2f/37012fef776a85af506533f64b80164d.jpg",
    alt: "Chocolate cake",
    delay: 0.4,
  },
];

export default function HeroSection() {
  const [heroRef, heroInView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  // Spring animation variants for images
  const imageVariants = {
    hidden: (index: number) => ({
      opacity: 0,
      x: index % 2 === 0 ? -200 : 200, // Alternate coming from left and right
      y: index < 2 ? -100 : 100, // Top images from above, bottom from below
      scale: 0.3,
      rotate: index % 2 === 0 ? -45 : 45,
    }),
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 200,
        mass: 0.8,
      },
    },
  };

  // Container animation for staggered children
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  // Text animations with spring effects
  const textSpring = {
    type: "spring",
    damping: 20,
    stiffness: 100,
  };

  return (
    <section
      id="home"
      className="relative py-20 px-4 overflow-hidden"
      ref={heroRef}
    >
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -100 }}
            animate={heroInView ? { opacity: 1, x: 0 } : {}}
            transition={{ ...textSpring, duration: 0.8 }}
          >
            <motion.h2
              className="text-5xl lg:text-6xl font-serif font-black text-foreground leading-tight"
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              animate={heroInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ ...textSpring, delay: 0.1 }}
            >
              Artisan Excellence
              <motion.span
                className="text-primary block"
                initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                animate={heroInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
                transition={{
                  type: "spring",
                  damping: 12,
                  stiffness: 150,
                  delay: 0.3,
                }}
              >
                Redefined
              </motion.span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ ...textSpring, delay: 0.4 }}
              className="space-y-4"
            >
              <p className="text-lg text-muted-foreground leading-relaxed">
                Experience the warmth and comfort of freshly baked artisanal
                goods, crafted with love and the finest ingredients every single
                day. Our master bakers start before dawn to bring you the
                perfect blend of tradition and innovation.
              </p>
              <p className="text-base text-muted-foreground">
                From our signature sourdough breads to decadent chocolate
                creations, every bite tells a story of three generations of
                baking excellence.
              </p>
            </motion.div>

            <motion.div
              className="flex gap-4"
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={heroInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ ...textSpring, delay: 0.6 }}
            >
              <motion.div
                whileHover={{
                  scale: 1.05,
                  transition: { type: "spring", stiffness: 300, damping: 10 },
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  asChild
                >
                  <a href="/products">Explore Menu</a>
                </Button>
              </motion.div>
              <motion.div
                whileHover={{
                  scale: 1.05,
                  transition: { type: "spring", stiffness: 300, damping: 10 },
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
                >
                  Learn More
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative"
            variants={containerVariants}
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
          >
            <div className="grid grid-cols-2 gap-4">
              {heroImages.map((image, index) => (
                <motion.div
                  key={index}
                  custom={index}
                  variants={imageVariants}
                  whileHover={{
                    scale: 1.08,
                    rotate: index % 2 === 0 ? 3 : -3,
                    transition: {
                      type: "spring",
                      stiffness: 300,
                      damping: 15,
                    },
                  }}
                  className={`relative ${
                    index === 1 ? "mt-8" : index === 2 ? "-mt-4" : ""
                  }`}
                >
                  <motion.img
                    src={image.src}
                    alt={image.alt}
                    className="rounded-lg shadow-lg w-full h-auto"
                    whileHover={{
                      filter: "brightness(1.1)",
                    }}
                    transition={{
                      filter: { duration: 0.3 },
                    }}
                  />
                  {/* Subtle floating animation */}
                  <motion.div
                    className="absolute inset-0"
                    animate={{
                      y: [0, -8, 0],
                    }}
                    transition={{
                      duration: 3 + index * 0.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.2,
                    }}
                  />
                </motion.div>
              ))}
            </div>

            {/* Background decorative elements */}
            <motion.div
              className="absolute -top-4 -right-4 w-20 h-20 bg-primary/10 rounded-full blur-xl"
              initial={{ opacity: 0, scale: 0 }}
              animate={heroInView ? { opacity: 1, scale: 1 } : {}}
              transition={{
                type: "spring",
                stiffness: 100,
                delay: 1,
              }}
            />
            <motion.div
              className="absolute -bottom-8 -left-8 w-32 h-32 bg-primary/5 rounded-full blur-2xl"
              initial={{ opacity: 0, scale: 0 }}
              animate={heroInView ? { opacity: 1, scale: 1 } : {}}
              transition={{
                type: "spring",
                stiffness: 80,
                delay: 1.2,
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
