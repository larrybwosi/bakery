// components/FeaturedProducts.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Heart, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function FeaturedProducts() {
  const [featuredRef, featuredInView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const products = [
    {
      title: "Vanilla Bean Cake",
      description:
        "Rich chocolate layers with fresh berries and premium cocoa, finished with gold leaf",
      price: "KSH 2400",
      image:
        "https://cdn.sanity.io/images/7rkl59hi/production/0b93c4f7ab54a2abf8d4e4a4d45b6735cba22b95-2912x1632.png?fm=webp&q=75&auto=format",
      badge: "Bestseller",
      delay: 0.1,
    },
    {
      title: "Madeleines",
      description:
        "Silky smooth buttercream with artisanal chocolate garnish and vanilla bean infusion",
      price: "KSH 600",
      image:
        "https://cdn.sanity.io/images/7rkl59hi/production/bc4e23e988fa057cca803e1fb29346cc1cbe94b3-736x736.jpg?fm=webp&q=75&auto=format",
      delay: 0.2,
    },
    {
      title: "Black forest Cake",
      description:
        "Traditional fermented bread with perfect crust and crumb, aged 48 hours for depth",
      price: "KSH 800",
      image:
        "https://cdn.sanity.io/images/7rkl59hi/production/e0e4b16cbe5dc4df16b8fa281ad5ca69d94a1d76-960x1200.png?fm=webp&q=75&auto=format",
      delay: 0.3,
    },
  ];

  return (
    <section id="products" className="py-20 px-4 bg-card" ref={featuredRef}>
      <div className="container mx-auto max-w-6xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={featuredInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-4xl font-serif font-black text-foreground mb-4">
            Most Popular Items
          </h3>
          <p className="text-muted-foreground text-lg">
            Discover our customers' favorite artisanal creations, each one a
            masterpiece of flavor and craftsmanship
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={featuredInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: product.delay }}
              whileHover={{ y: -10 }}
            >
              <Card className="group hover:shadow-2xl transition-all duration-500 border-border bg-background overflow-hidden">
                <div className="relative overflow-hidden">
                  <motion.img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-64 object-cover transition-transform duration-500"
                    whileHover={{ scale: 1.1 }}
                  />
                  {product.badge && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: product.delay + 0.3 }}
                    >
                      <Badge className="absolute top-4 left-4 bg-secondary text-secondary-foreground shadow-lg">
                        {product.badge}
                      </Badge>
                    </motion.div>
                  )}
                  <motion.div
                    className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Button
                      size="sm"
                      variant="secondary"
                      className="rounded-full w-10 h-10 p-0"
                    >
                      <Heart className="w-4 h-4" />
                    </Button>
                  </motion.div>
                </div>
                <CardContent className="p-6">
                  <motion.h4
                    className="text-xl font-serif font-bold text-foreground mb-2"
                    initial={{ opacity: 0 }}
                    animate={featuredInView ? { opacity: 1 } : {}}
                    transition={{ delay: product.delay + 0.4 }}
                  >
                    {product.title}
                  </motion.h4>
                  <motion.p
                    className="text-muted-foreground mb-4 text-sm leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={featuredInView ? { opacity: 1 } : {}}
                    transition={{ delay: product.delay + 0.5 }}
                  >
                    {product.description}
                  </motion.p>
                  <motion.div
                    className="flex items-center justify-between"
                    initial={{ opacity: 0, y: 20 }}
                    animate={featuredInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: product.delay + 0.6 }}
                  >
                    <span className="text-2xl font-bold text-primary">
                      {product.price}
                    </span>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={
                              featuredInView ? { opacity: 1, scale: 1 } : {}
                            }
                            transition={{
                              delay: product.delay + 0.7 + i * 0.1,
                            }}
                          >
                            <Star className="w-4 h-4 fill-secondary text-secondary" />
                          </motion.div>
                        ))}
                      </div>
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Button
                          size="sm"
                          className="bg-primary hover:bg-primary/90 text-primary-foreground"
                        >
                          <ShoppingCart className="w-4 h-4 mr-1" />
                          Add
                        </Button>
                      </motion.div>
                    </div>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
