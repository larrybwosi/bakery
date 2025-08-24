// components/Header.tsx
"use client";

import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";

// Navigation items array
const navigationItems = [
  { name: "Home", href: "#home" },
  { name: "Products", href: "/products" },
  { name: "About", href: "#about" },
  { name: "Location", href: "#location" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  
  // Transform scroll value to opacity for dynamic header background
  const headerOpacity = useTransform(scrollY, [0, 100], [0.95, 0.98]);
  const headerBlur = useTransform(scrollY, [0, 100], [8, 16]);

  useEffect(() => {
    const unsubscribe = scrollY.onChange((latest) => {
      setIsScrolled(latest > 50);
    });
    return () => unsubscribe();
  }, [scrollY]);

  // Animation variants
  const headerVariants = {
    initial: { y: -100, opacity: 0 },
    animate: { 
      y: 0, 
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94], // Custom cubic-bezier
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    },
  };

  const logoVariants = {
    initial: { scale: 0, rotate: -180 },
    animate: { 
      scale: 1, 
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
        duration: 1,
      }
    },
  };

  const navItemVariants = {
    initial: { opacity: 0, y: -30 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      }
    },
  };

  const buttonVariants = {
    initial: { opacity: 0, scale: 0.3, x: 50 },
    animate: { 
      opacity: 1, 
      scale: 1, 
      x: 0,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 10,
        delay: 0.5,
      }
    },
  };

  return (
    <motion.header
      variants={headerVariants}
      initial="initial"
      animate="animate"
      className={`sticky top-0 z-50 transition-all duration-300 border-b ${
        isScrolled 
          ? 'border-border/50 shadow-lg' 
          : 'border-border/20'
      }`}
      style={{
        backgroundColor: `rgba(255, 255, 255, ${headerOpacity.get()})`,
        backdropFilter: `blur(${headerBlur.get()}px)`,
      }}
    >
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo Section */}
          <motion.div
            variants={logoVariants}
            className="flex items-center space-x-3"
            whileHover={{ 
              scale: 1.05,
              transition: { type: "spring", stiffness: 400, damping: 17 }
            }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div 
              className="relative"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <div className="w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center shadow-lg">
                <motion.span 
                  className="text-primary-foreground font-serif font-black text-lg lg:text-xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  TCP
                </motion.span>
              </div>
              {/* Subtle glow effect */}
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl scale-150 -z-10" />
            </motion.div>
            <div className="flex flex-col">
              <motion.h1 
                className="text-xl lg:text-2xl font-serif font-black text-foreground leading-none"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                The Cake Panier
              </motion.h1>
              <motion.p 
                className="text-xs text-muted-foreground font-medium tracking-wide"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                Artisan Bakery
              </motion.p>
            </div>
          </motion.div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navigationItems.map((item, index) => (
              <motion.div
                key={item.name}
                variants={navItemVariants}
                custom={index}
              >
                <motion.a
                  href={item.href}
                  className="relative px-4 py-2 text-foreground/80 hover:text-primary font-medium text-sm lg:text-base transition-colors duration-200 group"
                  whileHover={{ 
                    scale: 1.05,
                    transition: { type: "spring", stiffness: 400, damping: 17 }
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.name}
                  {/* Animated underline */}
                  <motion.div
                    className="absolute bottom-0 left-1/2 h-0.5 bg-primary origin-center"
                    initial={{ width: 0, x: "-50%" }}
                    whileHover={{ 
                      width: "80%",
                      transition: { duration: 0.3, ease: "easeOut" }
                    }}
                  />
                </motion.a>
              </motion.div>
            ))}
          </nav>

          {/* CTA Button */}
          <motion.div
            variants={buttonVariants}
            whileHover={{ 
              scale: 1.05,
              transition: { type: "spring", stiffness: 400, damping: 17 }
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground font-semibold px-6 py-2 lg:px-8 lg:py-3 shadow-lg hover:shadow-xl transition-all duration-300"
              size="default"
            >
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                Order Now
              </motion.span>
              {/* Button shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                initial={{ x: "-100%" }}
                whileHover={{ 
                  x: "100%",
                  transition: { duration: 0.6, ease: "easeOut" }
                }}
              />
            </Button>
          </motion.div>

          {/* Mobile Menu Button (placeholder) */}
          <motion.button
            className="md:hidden p-2 text-foreground"
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            transition={{ delay: 0.7 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </motion.button>
        </div>
      </div>

      {/* Subtle bottom border animation */}
      <motion.div
        className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 1, duration: 1.2, ease: "easeOut" }}
      />
    </motion.header>
  );
}