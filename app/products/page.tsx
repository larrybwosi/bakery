"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Search, ShoppingCart } from "lucide-react"

const categories = [
  { id: "all", name: "All Products", count: 30 },
  { id: "breads", name: "Artisanal Breads", count: 8 },
  { id: "pastries", name: "Fresh Pastries", count: 6 },
  { id: "cakes", name: "Custom Cakes", count: 5 },
  { id: "cookies", name: "Cookies & Treats", count: 5 },
  { id: "event-cakes", name: "Event Cakes", count: 6 },
]

const products = [
  {
    id: 1,
    name: "Triple Chocolate Tiger",
    category: "cakes",
    price: 24.99,
    image: "/placeholder.svg?height=300&width=400",
    rating: 5,
    description: "Rich chocolate layers with fresh berries and premium cocoa",
    badge: "Bestseller",
    badgeColor: "bg-secondary text-secondary-foreground",
  },
  {
    id: 2,
    name: "French Buttercream Delight",
    category: "cakes",
    price: 6.99,
    image: "/placeholder.svg?height=300&width=400",
    rating: 5,
    description: "Silky smooth buttercream with artisanal chocolate garnish",
  },
  {
    id: 3,
    name: "Artisanal Sourdough",
    category: "breads",
    price: 8.99,
    image: "/placeholder.svg?height=300&width=400",
    rating: 5,
    description: "Traditional fermented bread with perfect crust and crumb",
    badge: "Fresh Daily",
    badgeColor: "bg-green-100 text-green-800",
  },
  {
    id: 4,
    name: "Chocolate Croissant",
    category: "pastries",
    price: 4.5,
    image: "/placeholder.svg?height=300&width=400",
    rating: 4,
    description: "Flaky, buttery pastry filled with premium dark chocolate",
  },
  {
    id: 5,
    name: "Classic Baguette",
    category: "breads",
    price: 3.99,
    image: "/placeholder.svg?height=300&width=400",
    rating: 5,
    description: "Traditional French baguette with crispy crust and airy interior",
  },
  {
    id: 6,
    name: "Almond Macarons",
    category: "cookies",
    price: 12.99,
    image: "/placeholder.svg?height=300&width=400",
    rating: 5,
    description: "Delicate French macarons in assorted flavors (box of 6)",
    badge: "Premium",
    badgeColor: "bg-purple-100 text-purple-800",
  },
  {
    id: 7,
    name: "Cinnamon Danish",
    category: "pastries",
    price: 3.75,
    image: "/placeholder.svg?height=300&width=400",
    rating: 4,
    description: "Sweet Danish pastry swirled with cinnamon and topped with glaze",
  },
  {
    id: 8,
    name: "Whole Wheat Loaf",
    category: "breads",
    price: 5.99,
    image: "/placeholder.svg?height=300&width=400",
    rating: 4,
    description: "Nutritious whole wheat bread made with organic flour",
  },
  {
    id: 9,
    name: "Red Velvet Cake",
    category: "cakes",
    price: 28.99,
    image: "/placeholder.svg?height=300&width=400",
    rating: 5,
    description: "Classic red velvet with cream cheese frosting and elegant decoration",
  },
  {
    id: 10,
    name: "Chocolate Chip Cookies",
    category: "cookies",
    price: 8.99,
    image: "/placeholder.svg?height=300&width=400",
    rating: 5,
    description: "Freshly baked chocolate chip cookies (dozen)",
    badge: "Family Favorite",
    badgeColor: "bg-orange-100 text-orange-800",
  },
  {
    id: 11,
    name: "Apple Turnover",
    category: "pastries",
    price: 4.25,
    image: "/placeholder.svg?height=300&width=400",
    rating: 4,
    description: "Flaky puff pastry filled with spiced apple filling",
  },
  {
    id: 12,
    name: "Focaccia Bread",
    category: "breads",
    price: 7.5,
    image: "/placeholder.svg?height=300&width=400",
    rating: 5,
    description: "Italian-style focaccia topped with herbs and olive oil",
  },
  {
    id: 13,
    name: "Wedding Celebration Cake",
    category: "event-cakes",
    price: 299.99,
    image: "/placeholder.svg?height=300&width=400",
    rating: 5,
    description: "Three-tier elegant wedding cake with custom decorations and fresh flowers",
    badge: "Custom Order",
    badgeColor: "bg-pink-100 text-pink-800",
  },
  {
    id: 14,
    name: "Birthday Party Cake",
    category: "event-cakes",
    price: 45.99,
    image: "/placeholder.svg?height=300&width=400",
    rating: 5,
    description: "Festive birthday cake with custom message and colorful decorations",
    badge: "Popular",
    badgeColor: "bg-blue-100 text-blue-800",
  },
  {
    id: 15,
    name: "Anniversary Cake",
    category: "event-cakes",
    price: 65.99,
    image: "/placeholder.svg?height=300&width=400",
    rating: 5,
    description: "Romantic anniversary cake with gold accents and elegant design",
  },
  {
    id: 16,
    name: "Graduation Cake",
    category: "event-cakes",
    price: 55.99,
    image: "/placeholder.svg?height=300&width=400",
    rating: 5,
    description: "Celebration cake for graduations with custom school colors and decorations",
  },
  {
    id: 17,
    name: "Baby Shower Cake",
    category: "event-cakes",
    price: 42.99,
    image: "/placeholder.svg?height=300&width=400",
    rating: 5,
    description: "Adorable baby shower cake with custom gender reveal or neutral design",
    badge: "Gender Reveal",
    badgeColor: "bg-yellow-100 text-yellow-800",
  },
  {
    id: 18,
    name: "Corporate Event Cake",
    category: "event-cakes",
    price: 89.99,
    image: "/placeholder.svg?height=300&width=400",
    rating: 5,
    description: "Professional corporate cake with custom logo and branding",
  },
]

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-serif font-black text-lg">GC</span>
            </div>
            <h1 className="text-2xl font-serif font-black text-foreground">Golden Crust</h1>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-foreground hover:text-primary transition-colors">
              Home
            </a>
            <a href="/products" className="text-primary font-medium">
              Products
            </a>
            <a href="#about" className="text-foreground hover:text-primary transition-colors">
              About
            </a>
            <a href="#location" className="text-foreground hover:text-primary transition-colors">
              Location
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Button variant="outline" className="hidden sm:flex bg-transparent">
              <a href="/auth/signup">Sign Up</a>
            </Button>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Cart (0)
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-black text-foreground mb-4">Our Artisanal Collection</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our complete range of freshly baked goods, from traditional breads to decadent desserts, all
            crafted with the finest ingredients and time-honored techniques.
          </p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 px-4 border-b border-border">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            {/* Category Filter - Mobile Scrollable */}
            <div className="w-full lg:w-auto">
              <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`whitespace-nowrap flex-shrink-0 ${
                      selectedCategory === category.id
                        ? "bg-primary text-primary-foreground"
                        : "border-border hover:bg-card"
                    }`}
                  >
                    {category.name}
                    <span className="ml-2 text-xs opacity-70">({category.count})</span>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-8 flex items-center justify-between">
            <h3 className="text-2xl font-serif font-bold text-foreground">
              {selectedCategory === "all" ? "All Products" : categories.find((c) => c.id === selectedCategory)?.name}
            </h3>
            <p className="text-muted-foreground">
              Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Card
                key={product.id}
                className="group hover:shadow-xl transition-all duration-300 border-border bg-background"
              >
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {product.badge && (
                    <Badge className={`absolute top-3 left-3 ${product.badgeColor}`}>{product.badge}</Badge>
                  )}
                  <Button
                    size="sm"
                    className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-background/90 hover:bg-background text-foreground border border-border"
                  >
                    <ShoppingCart className="w-4 h-4" />
                  </Button>
                </div>
                <CardContent className="p-4">
                  <h4 className="text-lg font-serif font-bold text-foreground mb-2 line-clamp-1">{product.name}</h4>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-primary">${product.price}</span>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < product.rating ? "fill-secondary text-secondary" : "text-muted-foreground/30"
                          }`}
                        />
                      ))}
                      <span className="text-xs text-muted-foreground ml-1">({product.rating})</span>
                    </div>
                  </div>
                  <Button className="w-full mt-4 bg-primary hover:bg-primary/90 text-primary-foreground">
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-serif font-bold text-foreground mb-2">No products found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 px-4 bg-card">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="bg-background rounded-2xl p-8 md:p-12 border border-border">
            <h3 className="text-2xl md:text-3xl font-serif font-black text-foreground mb-4">
              Subscribe to Our Newsletter
            </h3>
            <p className="text-muted-foreground text-lg mb-8">
              Get the latest updates on new products, special offers, and baking tips delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8">Subscribe</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-primary-foreground font-serif font-black">GC</span>
                </div>
                <h4 className="text-xl font-serif font-black">Golden Crust</h4>
              </div>
              <p className="text-background/80">Crafting exceptional baked goods with love and tradition since 1970.</p>
            </div>

            <div>
              <h5 className="font-serif font-bold mb-4">Quick Links</h5>
              <ul className="space-y-2 text-background/80">
                <li>
                  <a href="/" className="hover:text-primary transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/products" className="hover:text-primary transition-colors">
                    Products
                  </a>
                </li>
                <li>
                  <a href="#about" className="hover:text-primary transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#location" className="hover:text-primary transition-colors">
                    Location
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="font-serif font-bold mb-4">Categories</h5>
              <ul className="space-y-2 text-background/80">
                <li>Artisanal Breads</li>
                <li>Fresh Pastries</li>
                <li>Custom Cakes</li>
                <li>Cookies & Treats</li>
                <li>Event Cakes</li>
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
      </footer>
    </div>
  )
}
