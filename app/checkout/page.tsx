"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Minus, Plus, Trash2, Gift, CreditCard, MapPin } from "lucide-react"
import { motion } from "framer-motion"

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
}

interface User {
  name: string
  email: string
  points: number
  isLoggedIn: boolean
}

export default function CheckoutPage() {
  const router = useRouter()
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [user, setUser] = useState<User>({ name: "", email: "", points: 0, isLoggedIn: false })
  const [pointsToRedeem, setPointsToRedeem] = useState(0)
  const [promoCode, setPromoCode] = useState("")
  const [isPromoApplied, setIsPromoApplied] = useState(false)

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]")
    setCartItems(cart)

    // Mock user data - replace with actual auth logic
    const mockUser = {
      name: "John Doe",
      email: "john@example.com",
      points: 250,
      isLoggedIn: true, // Set to false to test non-logged-in state
    }
    setUser(mockUser)
  }, [])

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity === 0) {
      removeItem(id)
      return
    }

    const updatedCart = cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item))
    setCartItems(updatedCart)
    localStorage.setItem("cart", JSON.stringify(updatedCart))
  }

  const removeItem = (id: number) => {
    const updatedCart = cartItems.filter((item) => item.id !== id)
    setCartItems(updatedCart)
    localStorage.setItem("cart", JSON.stringify(updatedCart))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const pointsDiscount = pointsToRedeem * 0.01 // 1 point = $0.01
  const promoDiscount = isPromoApplied ? subtotal * 0.1 : 0 // 10% discount
  const tax = (subtotal - pointsDiscount - promoDiscount) * 0.08 // 8% tax
  const total = subtotal - pointsDiscount - promoDiscount + tax

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "welcome10") {
      setIsPromoApplied(true)
      alert("Promo code applied! 10% discount added.")
    } else {
      alert("Invalid promo code")
    }
  }

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!")
      return
    }

    // Mock checkout process
    alert("Order placed successfully! You will receive a confirmation email shortly.")
    localStorage.removeItem("cart")
    router.push("/")
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Button variant="ghost" onClick={() => router.back()} className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <h1 className="text-xl font-serif font-black">Shopping Cart</h1>
            <div></div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-16 text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-2xl font-serif font-bold mb-4">Your cart is empty</h2>
          <p className="text-muted-foreground mb-8">Add some delicious items to get started!</p>
          <Button onClick={() => router.push("/products")} className="bg-primary hover:bg-primary/90">
            Browse Products
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Button variant="ghost" onClick={() => router.back()} className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <h1 className="text-xl font-serif font-black">Shopping Cart</h1>
          <Badge variant="secondary">{cartItems.length} items</Badge>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-2xl font-serif font-bold mb-6">My Orders</h2>

            {cartItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">${item.price.toFixed(2)} each</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <Button variant="outline" size="sm" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            {/* Points Redemption */}
            {user.isLoggedIn && user.points > 0 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Gift className="w-5 h-5 text-primary" />
                      Redeem Points
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Available Points:</span>
                      <Badge variant="secondary">{user.points} points</Badge>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="points">
                        Points to redeem (max {Math.min(user.points, Math.floor(subtotal * 100))})
                      </Label>
                      <Input
                        id="points"
                        type="number"
                        min="0"
                        max={Math.min(user.points, Math.floor(subtotal * 100))}
                        value={pointsToRedeem}
                        onChange={(e) => setPointsToRedeem(Math.max(0, Number.parseInt(e.target.value) || 0))}
                        placeholder="Enter points"
                      />
                      <p className="text-xs text-muted-foreground">1 point = $0.01 discount</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Promo Code */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Promo Code</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      disabled={isPromoApplied}
                    />
                    <Button onClick={applyPromoCode} disabled={isPromoApplied || !promoCode} variant="outline">
                      Apply
                    </Button>
                  </div>
                  {isPromoApplied && (
                    <Badge className="bg-green-100 text-green-800">WELCOME10 applied - 10% off!</Badge>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    {pointsDiscount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Points Discount</span>
                        <span>-${pointsDiscount.toFixed(2)}</span>
                      </div>
                    )}
                    {promoDiscount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Promo Discount</span>
                        <span>-${promoDiscount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button
                      onClick={handleCheckout}
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3"
                    >
                      <CreditCard className="w-4 h-4 mr-2" />
                      Proceed to Checkout
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full bg-transparent"
                      onClick={() => router.push("/products")}
                    >
                      Continue Shopping
                    </Button>
                  </div>

                  <div className="text-xs text-muted-foreground text-center">
                    <p className="flex items-center justify-center gap-1">
                      <MapPin className="w-3 h-3" />
                      Delivery to 123 Baker Street, NY
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
