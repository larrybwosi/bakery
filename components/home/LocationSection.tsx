// components/LocationSection.tsx
"use client";

import { MapPin, Clock, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function LocationSection() {
  const [locationRef, locationInView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const locationInfo = [
    {
      icon: MapPin,
      title: "Address",
      content: ["Cheptulu - Chavakali Road", "Kaimosi KE", "+254 0114020977"],
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
      content: ["+254 0114020977", "orders@thecackepanier.com"],
      delay: 0.6,
    },
  ];

  return (
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
            Come experience the warmth and aroma of fresh-baked goodness in our
            welcoming neighborhood bakery
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={locationInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            {locationInfo.map((item, index) => (
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
              src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d249.36302052435647!2d34.8596463734228!3d0.12822903139438946!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2ske!4v1755964557051!5m2!1sen!2ske"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="The Cake Panier Bakery Location"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
