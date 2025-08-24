import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { Transition, AnimationGeneratorType } from "framer-motion";
import { Button } from "@/components/ui/button";

const ProfessionalBakeryHero = () => {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  // Spring animation configuration for more bouncy effects
  const springConfig: Transition = {
    type: "spring" as AnimationGeneratorType,
    stiffness: 100,
    damping: 15,
    mass: 0.8,
  };

  const strongSpringConfig: Transition = {
    type: "spring" as AnimationGeneratorType,
    stiffness: 120,
    damping: 12,
    mass: 1.2,
  };

  // Image animation variants with dramatic entrances
  const imageVariants = {
    hidden: (direction: string) => ({
      opacity: 0,
      x: direction === "left" ? -300 : direction === "right" ? 300 : 0,
      y: direction === "top" ? -200 : direction === "bottom" ? 200 : 0,
      scale: 0.3,
      rotate: direction === "left" ? -45 : direction === "right" ? 45 : 0,
    }),
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      rotate: 0,
      transition: strongSpringConfig,
    },
  };

  return (
    <section
      id="home"
      className="relative py-20 px-4 bg-gradient-to-br from-amber-50 to-orange-50"
      ref={heroRef}
    >
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -50 }}
            animate={heroInView ? { opacity: 1, x: 0 } : {}}
            transition={{ ...springConfig, delay: 0.2 }}
          >
            <motion.h2
              className="text-5xl lg:text-6xl font-serif font-black text-foreground leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ ...springConfig, delay: 0.4 }}
            >
              Artisan Excellence
              <motion.span
                className="text-amber-600 block"
                initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                animate={heroInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
                transition={{ ...strongSpringConfig, delay: 0.6 }}
              >
                Redefined
              </motion.span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ ...springConfig, delay: 0.8 }}
              className="space-y-4"
            >
              <p className="text-lg text-muted-foreground leading-relaxed">
                Discover our award-winning collection of premium baked goods,
                meticulously crafted using time-honored techniques and the
                world's finest ingredients. Our certified master bakers combine
                decades of expertise with innovative culinary artistry.
              </p>
              <p className="text-base text-muted-foreground">
                From our signature European-style breads to our celebrated
                pastry collections, each creation represents our unwavering
                commitment to excellence and culinary innovation.
              </p>
            </motion.div>

            <motion.div
              className="flex gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ ...springConfig, delay: 1.0 }}
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={springConfig}
              >
                <Button
                  size="lg"
                  className="bg-amber-600 hover:bg-amber-700 text-white shadow-lg"
                  asChild
                >
                  <a href="/products">View Collection</a>
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={springConfig}
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="border-amber-600 text-amber-700 hover:bg-amber-600 hover:text-white bg-transparent shadow-lg"
                >
                  Our Story
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0 }}
            animate={heroInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.3 }}
          >
            <div className="grid grid-cols-2 gap-4 relative">
              {[
                {
                  src: "https://i.pinimg.com/1200x/8e/43/b4/8e43b43a71525cc8c22f76fbecd2c09c.jpg",
                  alt: "Artisan chocolate croissant",
                  delay: 0.2,
                  direction: "left",
                  className: "",
                },
                {
                  src: "https://i.pinimg.com/736x/97/d3/17/97d3179bf7f823b5b9dd67e51ad0395f.jpg",
                  alt: "Premium celebration cake",
                  delay: 0.4,
                  direction: "top",
                  className: "mt-8",
                },
                {
                  src: "https://cdn.sanity.io/images/7rkl59hi/production/e0e4b16cbe5dc4df16b8fa281ad5ca69d94a1d76-960x1200.png?fm=webp&q=75&auto=format",
                  alt: "French macarons collection",
                  delay: 0.6,
                  direction: "bottom",
                  className: "-mt-4",
                },
                {
                  src: "https://i.pinimg.com/1200x/37/01/2f/37012fef776a85af506533f64b80164d.jpg",
                  alt: "Gourmet chocolate creation",
                  delay: 0.8,
                  direction: "right",
                  className: "",
                },
              ].map((image, index) => (
                <motion.div
                  key={index}
                  className={`relative ${image.className}`}
                  variants={imageVariants}
                  initial="hidden"
                  animate={heroInView ? "visible" : "hidden"}
                  custom={image.direction}
                  transition={{
                    ...strongSpringConfig,
                    delay: image.delay,
                    duration: 0.8,
                  }}
                  whileHover={{
                    scale: 1.08,
                    rotate: index % 2 === 0 ? 3 : -3,
                    y: -8,
                    transition: { ...springConfig, duration: 0.3 },
                  }}
                >
                  <motion.img
                    src={image.src}
                    alt={image.alt}
                    className="rounded-xl shadow-2xl w-full h-auto border-2 border-white"
                    whileHover={{
                      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                    }}
                  />

                  {/* Floating elements for extra visual interest */}
                  <motion.div
                    className="absolute -top-2 -right-2 w-6 h-6 bg-amber-400 rounded-full opacity-80"
                    initial={{ scale: 0, rotate: 0 }}
                    animate={
                      heroInView
                        ? {
                            scale: [0, 1.2, 1],
                            rotate: [0, 180, 360],
                          }
                        : {}
                    }
                    transition={{
                      delay: image.delay + 0.5,
                      duration: 0.8,
                      type: "spring",
                      stiffness: 200,
                      damping: 10,
                    }}
                  />

                  <motion.div
                    className="absolute -bottom-1 -left-1 w-4 h-4 bg-orange-300 rounded-full opacity-60"
                    initial={{ scale: 0, rotate: 0 }}
                    animate={
                      heroInView
                        ? {
                            scale: [0, 1.3, 1],
                            rotate: [0, -180, -360],
                          }
                        : {}
                    }
                    transition={{
                      delay: image.delay + 0.7,
                      duration: 0.8,
                      type: "spring",
                      stiffness: 180,
                      damping: 12,
                    }}
                  />
                </motion.div>
              ))}
            </div>

            {/* Background decorative elements */}
            <motion.div
              className="absolute -top-8 -left-8 w-24 h-24 bg-gradient-to-br from-amber-200 to-orange-200 rounded-full opacity-20 blur-xl"
              initial={{ scale: 0, rotate: 0 }}
              animate={
                heroInView
                  ? {
                      scale: [0, 1.5, 1],
                      rotate: [0, 360],
                    }
                  : {}
              }
              transition={{
                delay: 1.2,
                duration: 2,
                type: "spring",
                stiffness: 50,
                damping: 15,
              }}
            />

            <motion.div
              className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-orange-200 to-amber-200 rounded-full opacity-15 blur-2xl"
              initial={{ scale: 0, rotate: 0 }}
              animate={
                heroInView
                  ? {
                      scale: [0, 1.3, 1],
                      rotate: [0, -360],
                    }
                  : {}
              }
              transition={{
                delay: 1.4,
                duration: 2.5,
                type: "spring",
                stiffness: 40,
                damping: 20,
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProfessionalBakeryHero;
