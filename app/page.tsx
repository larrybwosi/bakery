"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Phone, Clock, ShoppingCart, Heart } from "lucide-react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

export default function BakeryHomePage() {
  const [heroRef, heroInView] = useInView({ threshold: 0.3, triggerOnce: true })
  const [featuredRef, featuredInView] = useInView({ threshold: 0.2, triggerOnce: true })
  const [aboutRef, aboutInView] = useInView({ threshold: 0.3, triggerOnce: true })
  const [locationRef, locationInView] = useInView({ threshold: 0.2, triggerOnce: true })

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border"
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <motion.div
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-serif font-black text-lg">
                GC
              </span>
            </div>
            <h1 className="text-2xl font-serif font-black text-foreground">
              The Cake Panier
            </h1>
          </motion.div>

          <nav className="hidden md:flex items-center space-x-8">
            {["Home", "Products", "About", "Location"].map((item, index) => (
              <motion.a
                key={item}
                href={
                  item === "Products" ? "/products" : `#${item.toLowerCase()}`
                }
                className="text-foreground hover:text-primary transition-colors"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
                whileHover={{ scale: 1.1 }}
              >
                {item}
              </motion.a>
            ))}
          </nav>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Order Now
            </Button>
          </motion.div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section id="home" className="relative py-20 px-4" ref={heroRef}>
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -50 }}
              animate={heroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.h2
                className="text-5xl lg:text-6xl font-serif font-black text-foreground leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                The taste of
                <motion.span
                  className="text-primary block"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={heroInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  home-baked
                </motion.span>
                goodness.
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="space-y-4"
              >
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Experience the warmth and comfort of freshly baked artisanal
                  goods, crafted with love and the finest ingredients every
                  single day. Our master bakers start before dawn to bring you
                  the perfect blend of tradition and innovation.
                </p>
                <p className="text-base text-muted-foreground">
                  From our signature sourdough breads to decadent chocolate
                  creations, every bite tells a story of three generations of
                  baking excellence.
                </p>
              </motion.div>

              <motion.div
                className="flex gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
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
                  whileHover={{ scale: 1.05 }}
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
              initial={{ opacity: 0, x: 50 }}
              animate={heroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    src: "https://cdn.sanity.io/images/7rkl59hi/production/0b93c4f7ab54a2abf8d4e4a4d45b6735cba22b95-2912x1632.png?fm=webp&q=75&auto=format?fm=webp&q=75&auto=format",
                    alt: "Chocolate croissant",
                    delay: 0.1,
                  },
                  {
                    src: "https://cdn.sanity.io/images/7rkl59hi/production/9c0563bcfc02284c21a5f77706ba864be8fbada7-1024x1024.png?fm=webp&q=75&auto=format",
                    alt: "Vanilla Birthday Cake",
                    delay: 0.2,
                  },
                  {
                    src: "/placeholder.svg?height=200&width=250",
                    alt: "Macarons",
                    delay: 0.3,
                  },
                  {
                    src: "/placeholder.svg?height=300&width=250",
                    alt: "Chocolate cake",
                    delay: 0.4,
                  },
                ].map((image, index) => (
                  <motion.img
                    key={index}
                    src={image.src}
                    alt={image.alt}
                    className={`rounded-lg shadow-lg ${
                      index === 1 ? "mt-8" : index === 2 ? "-mt-4" : ""
                    }`}
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    animate={heroInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                    transition={{ duration: 0.6, delay: image.delay }}
                    whileHover={{
                      scale: 1.05,
                      rotate: index % 2 === 0 ? 2 : -2,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
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
            {[
              {
                title: "Triple Chocolate Tiger",
                description:
                  "Rich chocolate layers with fresh berries and premium cocoa, finished with gold leaf",
                price: "$24.99",
                image:
                  "https://cdn.sanity.io/images/7rkl59hi/production/0b93c4f7ab54a2abf8d4e4a4d45b6735cba22b95-2912x1632.png?fm=webp&q=75&auto=format",
                badge: "Bestseller",
                delay: 0.1,
              },
              {
                title: "French Buttercream Delight",
                description:
                  "Silky smooth buttercream with artisanal chocolate garnish and vanilla bean infusion",
                price: "$6.99",
                image: "/placeholder.svg?height=250&width=400",
                delay: 0.2,
              },
              {
                title: "Artisanal Sourdough",
                description:
                  "Traditional fermented bread with perfect crust and crumb, aged 48 hours for depth",
                price: "$8.99",
                image: "/placeholder.svg?height=250&width=400",
                delay: 0.3,
              },
            ].map((product, index) => (
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

      {/* About Section */}
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
                  For over three generations, Golden Crust Bakery has been
                  crafting exceptional baked goods using time-honored techniques
                  and the finest ingredients. What started as a small family
                  recipe collection has grown into a beloved neighborhood
                  institution.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Every morning before dawn, our master bakers begin their
                  craft, ensuring that each loaf, pastry, and dessert meets our
                  exacting standards of quality and taste. We source our
                  ingredients locally whenever possible, supporting our
                  community while delivering unmatched freshness.
                </p>
              </motion.div>
              <motion.div
                className="grid grid-cols-3 gap-6 pt-6"
                initial={{ opacity: 0, y: 30 }}
                animate={aboutInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                {[
                  { number: "50+", label: "Years Experience" },
                  { number: "100+", label: "Daily Varieties" },
                  { number: "5000+", label: "Happy Customers" },
                ].map((stat, index) => (
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
                src="/placeholder.svg?height=500&width=600"
                alt="Baker at work"
                className="rounded-lg shadow-xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section id="location" className="py-20 px-4 bg-card" ref={locationRef}>
        <div className="container mx-auto max-w-6xl">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={locationInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-4xl font-serif font-black text-foreground mb-4">
              Visit Our Bakery
            </h3>
            <p className="text-muted-foreground text-lg">
              Come experience the warmth and aroma of fresh-baked goodness in
              our welcoming neighborhood bakery
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -50 }}
              animate={locationInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              {[
                {
                  icon: MapPin,
                  title: "Address",
                  content: [
                    "123 Baker Street",
                    "Downtown District",
                    "New York, NY 10001",
                  ],
                  delay: 0.2,
                },
                {
                  icon: Clock,
                  title: "Hours",
                  content: [
                    "Monday - Friday: 6:00 AM - 8:00 PM",
                    "Saturday: 7:00 AM - 9:00 PM",
                    "Sunday: 8:00 AM - 6:00 PM",
                  ],
                  delay: 0.4,
                },
                {
                  icon: Phone,
                  title: "Contact",
                  content: ["(555) 123-BAKE", "orders@goldencrust.com"],
                  delay: 0.6,
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, y: 30 }}
                  animate={locationInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: item.delay }}
                  whileHover={{ x: 10 }}
                >
                  <item.icon className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-serif font-bold text-foreground mb-2">
                      {item.title}
                    </h4>
                    <div className="text-muted-foreground space-y-1">
                      {item.content.map((line, i) => (
                        <p key={i}>{line}</p>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              className="rounded-lg overflow-hidden shadow-xl"
              initial={{ opacity: 0, x: 50 }}
              animate={locationInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              whileHover={{ scale: 1.02 }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095343008!2d-74.00425878459418!2d40.74844097932681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259bf5c1654f3%3A0xc80f9cfce5383d5d!2sGoogle!5e0!3m2!1sen!2sus!4v1635959687750!5m2!1sen!2sus"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Golden Crust Bakery Location"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
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
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8">
                  Subscribe
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
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
                <h4 className="text-xl font-serif font-black">Golden Crust</h4>
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
                <p>123 Baker Street</p>
                <p>New York, NY 10001</p>
                <p>(555) 123-BAKE</p>
                <p>orders@goldencrust.com</p>
              </div>
            </div>
          </div>

          <div className="border-t border-background/20 mt-8 pt-8 text-center text-background/60">
            <p>&copy; 2024 Golden Crust Bakery. All rights reserved.</p>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}
