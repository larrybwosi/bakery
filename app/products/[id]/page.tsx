"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, ArrowLeft, ShoppingCart, Plus, Minus } from "lucide-react"
import { motion } from "framer-motion"
import { useCart } from "@/contexts/cart-context"

const products = [
  {
    id: 1,
    name: "Triple Chocolate Tiger",
    category: "cakes",
    price: 24.99,
    images: [
      "/placeholder.svg?height=500&width=500",
      "/placeholder.svg?height=500&width=500",
      "/placeholder.svg?height=500&width=500",
      "/placeholder.svg?height=500&width=500",
    ],
    rating: 5,
    reviews: 127,
    description: "Rich chocolate layers with fresh berries and premium cocoa",
    fullDescription:
      "Our signature Triple Chocolate Tiger cake features three decadent layers of moist chocolate sponge, filled with rich chocolate ganache and fresh seasonal berries. Topped with premium cocoa powder and chocolate shavings, this masterpiece is perfect for chocolate lovers. Made with Belgian dark chocolate and organic ingredients.",
    badge: "Bestseller",
    badgeColor: "bg-secondary text-secondary-foreground",
    ingredients: ["Belgian Dark Chocolate", "Fresh Berries", "Premium Cocoa", "Organic Flour", "Free-Range Eggs"],
    allergens: ["Gluten", "Eggs", "Dairy"],
    weight: "2.5 lbs",
    servings: "8-10 people",
    availability: "In Stock",
  },
  {
    id: 2,
    name: "French Buttercream Delight",
    category: "cakes",
    price: 6.99,
    images: [
      "/placeholder.svg?height=500&width=500",
      "/placeholder.svg?height=500&width=500",
      "/placeholder.svg?height=500&width=500",
    ],
    rating: 5,
    reviews: 89,
    description: "Silky smooth buttercream with artisanal chocolate garnish",
    fullDescription:
      "Indulge in our French Buttercream Delight, featuring layers of vanilla sponge cake filled with silky French buttercream and topped with artisanal chocolate garnish. Each bite melts in your mouth with perfect balance of sweetness and texture.",
    ingredients: ["French Butter", "Vanilla Bean", "Artisanal Chocolate", "Organic Sugar"],
    allergens: ["Gluten", "Eggs", "Dairy"],
    weight: "1 lb",
    servings: "2-3 people",
    availability: "In Stock",
  },
  // Add more products as needed
]

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isLiked, setIsLiked] = useState(false)
  const { addToCart, state } = useCart()

  const product = products.find((p) => p.id === Number.parseInt(params.id as string))

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center p-8">
          <h2 className="text-2xl font-serif font-bold mb-4 text-foreground">Product Not Found</h2>
          <Button onClick={() => router.push("/products")} variant="outline">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Products
          </Button>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    addToCart(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        category: product.category,
      },
      quantity,
    )

    alert(`Added ${quantity} ${product.name} to cart!`)
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="flex items-center justify-between p-4">
          <Button variant="ghost" size="sm" onClick={() => router.back()}>
            <ArrowLeft className="w-5 h-5" />
          </Button>

          <h1 className="text-lg font-semibold">Product Details</h1>

          <Button variant="ghost" size="sm" onClick={() => router.push("/checkout")}>
            <div className="relative">
              <ShoppingCart className="w-5 h-5" />
              {state.itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {state.itemCount}
                </span>
              )}
            </div>
          </Button>
        </div>
      </header>

      <div className="p-4 max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative mb-6"
        >
          <div className="aspect-square rounded-2xl overflow-hidden bg-card mb-4">
            <img
              src={product.images[selectedImageIndex] || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.badge && <Badge className={`absolute top-4 left-4 ${product.badgeColor}`}>{product.badge}</Badge>}
          </div>

          {product.images.length > 1 && (
            <div className="flex gap-2 justify-center">
              {product.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    selectedImageIndex === index ? "bg-primary" : "bg-muted"
                  }`}
                />
              ))}
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-4"
        >
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-2">{product.name}</h1>
            <p className="text-3xl font-bold text-primary mb-2">TK {product.price.toFixed(0)}</p>
            <p className="text-sm text-muted-foreground mb-4">{product.fullDescription}</p>

            <div className="flex items-center gap-2 mb-4">
              <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
                {product.availability}
              </Badge>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{product.rating}</span>
                <span className="text-sm text-muted-foreground">({product.reviews})</span>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-lg p-4 space-y-3">
            <h3 className="font-semibold text-foreground">Product Information</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Weight:</span>
                <span className="font-medium">{product.weight}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Servings:</span>
                <span className="font-medium">{product.servings}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between py-4">
            <span className="font-semibold">Quantity</span>
            <div className="flex items-center border border-border rounded-lg">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-2"
              >
                <Minus className="w-4 h-4" />
              </Button>
              <span className="px-4 py-2 font-semibold min-w-[3rem] text-center">{quantity}</span>
              <Button variant="ghost" size="sm" onClick={() => setQuantity(quantity + 1)} className="px-3 py-2">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4">
        <div className="max-w-md mx-auto">
          <Button
            onClick={handleAddToCart}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-4 rounded-xl font-semibold text-lg"
            size="lg"
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>

      <div className="h-20" />
    </div>
  )
}
