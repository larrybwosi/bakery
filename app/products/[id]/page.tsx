"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Star,
  ArrowLeft,
  ShoppingCart,
  Plus,
  Minus,
  Heart,
  Share2,
  Truck,
  Shield,
  Clock,
  Award,
  ChefHat,
  Leaf,
  Users,
  Camera,
  MessageCircle,
  ThumbsUp,
  Zap,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Mock data with more products
const products = [
  {
    id: 1,
    name: "Triple Chocolate Tiger",
    category: "cakes",
    price: 24.99,
    originalPrice: 29.99,
    images: [
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&h=500&fit=crop",
      "https://i.pinimg.com/1200x/ab/44/d3/ab44d337a6aa14c71b3e5c5de357cdca.jpg",
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=500&h=500&fit=crop",
    ],
    rating: 4.8,
    reviews: 127,
    description: "Rich chocolate layers with fresh berries and premium cocoa",
    fullDescription:
      "Our signature Triple Chocolate Tiger cake features three decadent layers of moist chocolate sponge, filled with rich chocolate ganache and fresh seasonal berries. Topped with premium cocoa powder and chocolate shavings, this masterpiece is perfect for chocolate lovers. Made with Belgian dark chocolate and organic ingredients.",
    badge: "Bestseller",
    badgeColor: "bg-orange-100 text-orange-800 border-orange-200",
    ingredients: [
      "Belgian Dark Chocolate",
      "Fresh Berries",
      "Premium Cocoa",
      "Organic Flour",
      "Free-Range Eggs",
    ],
    allergens: ["Gluten", "Eggs", "Dairy"],
    weight: "2.5 lbs",
    servings: "8-10 people",
    availability: "In Stock",
    deliveryTime: "2-3 hours",
    features: ["Handcrafted", "Premium Quality", "Fresh Daily"],
    discount: 17,
  },
  {
    id: 2,
    name: "French Buttercream Delight",
    category: "cakes",
    price: 18.99,
    images: [
      "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=500&h=500&fit=crop",
    ],
    rating: 4.7,
    reviews: 89,
    description: "Silky smooth buttercream with artisanal chocolate garnish",
    fullDescription:
      "Indulge in our French Buttercream Delight, featuring layers of vanilla sponge cake filled with silky French buttercream and topped with artisanal chocolate garnish.",
    ingredients: [
      "French Butter",
      "Vanilla Bean",
      "Artisanal Chocolate",
      "Organic Sugar",
    ],
    allergens: ["Gluten", "Eggs", "Dairy"],
    weight: "1 lb",
    servings: "2-3 people",
    availability: "In Stock",
    deliveryTime: "1-2 hours",
  },
  {
    id: 3,
    name: "Red Velvet Supreme",
    category: "cakes",
    price: 22.99,
    images: [
      "https://images.unsplash.com/photo-1586985289906-406988974504?w=500&h=500&fit=crop",
    ],
    rating: 4.9,
    reviews: 156,
    description: "Classic red velvet with cream cheese frosting",
    fullDescription:
      "Our Red Velvet Supreme features the perfect balance of cocoa and vanilla with a hint of buttermilk, topped with our signature cream cheese frosting.",
    availability: "In Stock",
    deliveryTime: "2-3 hours",
  },
  {
    id: 4,
    name: "Lemon Zest Paradise",
    category: "cakes",
    price: 19.99,
    images: [
      "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=500&h=500&fit=crop",
    ],
    rating: 4.6,
    reviews: 74,
    description: "Fresh lemon cake with citrus glaze",
    fullDescription:
      "Light and airy lemon sponge cake infused with fresh lemon zest and topped with a tangy citrus glaze.",
    availability: "In Stock",
    deliveryTime: "1-2 hours",
  },
];

export default function ProductDetailPage() {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const [activeTab, setActiveTab] = useState("description");
  const [showFullscreen, setShowFullscreen] = useState(false);
  const [cartItems, setCartItems] = useState(0);

  // Mock current product (first one)
  const product = products[0];
  const similarProducts = products.slice(1, 4);

  const handleAddToCart = () => {
    setCartItems((prev) => prev + quantity);

    // Create a nice feedback animation
    const button = document.querySelector("#add-to-cart-btn");
    if (button) {
      button.classList.add("animate-pulse");
      setTimeout(() => button.classList.remove("animate-pulse"), 600);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.6,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      {/* Mobile Header */}
      <header className="lg:hidden sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="flex items-center justify-between p-4">
          <Button variant="ghost" size="sm" className="rounded-full p-2">
            <ArrowLeft className="w-5 h-5" />
          </Button>

          <h1 className="text-lg font-semibold">Product Details</h1>

          <Button
            variant="ghost"
            size="sm"
            className="rounded-full p-2 relative"
          >
            <ShoppingCart className="w-5 h-5" />
            {cartItems > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium"
              >
                {cartItems}
              </motion.span>
            )}
          </Button>
        </div>
      </header>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="lg:grid lg:grid-cols-2 lg:gap-12 lg:max-w-7xl lg:mx-auto lg:px-8 lg:py-12"
      >
        {/* Image Section */}
        <motion.div
          variants={itemVariants}
          className="lg:sticky lg:top-8 lg:h-fit"
        >
          <div className="p-4 lg:p-0">
            <motion.div
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: {
                  opacity: 1,
                  scale: 1,
                  transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
                },
              }}
              className="relative mb-6 group"
            >
              <div className="aspect-square rounded-3xl overflow-hidden bg-white shadow-xl lg:shadow-2xl mb-4 relative">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={selectedImageIndex}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    src={product.images[selectedImageIndex]}
                    alt={product.name}
                    className="w-full h-full object-cover cursor-pointer"
                    onClick={() => setShowFullscreen(true)}
                  />
                </AnimatePresence>

                {/* Overlays */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="rounded-full backdrop-blur-sm"
                  >
                    <Camera className="w-4 h-4 mr-2" />
                    View Full
                  </Button>
                </div>

                {/* Badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                  {product.badge && (
                    <Badge
                      className={`${product.badgeColor} font-medium backdrop-blur-sm`}
                    >
                      {product.badge}
                    </Badge>
                  )}
                  {product.discount && (
                    <Badge className="bg-red-500 text-white font-medium">
                      -{product.discount}%
                    </Badge>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="rounded-full p-2 backdrop-blur-sm"
                    onClick={() => setIsLiked(!isLiked)}
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        isLiked ? "fill-red-500 text-red-500" : ""
                      }`}
                    />
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="rounded-full p-2 backdrop-blur-sm"
                  >
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Image Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex gap-3 justify-center lg:justify-start">
                  {product.images.map((image, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`w-16 h-16 lg:w-20 lg:h-20 rounded-xl overflow-hidden border-2 transition-all ${
                        selectedImageIndex === index
                          ? "border-blue-500 shadow-lg"
                          : "border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </motion.button>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </motion.div>

        {/* Content Section */}
        <motion.div variants={itemVariants} className="lg:py-0">
          <div className="px-4 lg:px-0 space-y-6">
            {/* Product Header */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Badge
                  variant="outline"
                  className="text-green-600 border-green-200 bg-green-50"
                >
                  <Zap className="w-3 h-3 mr-1" />
                  {product.availability}
                </Badge>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{product.rating}</span>
                  <span className="text-sm text-slate-500">
                    ({product.reviews} reviews)
                  </span>
                </div>
              </div>

              <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-3">
                {product.name}
              </h1>

              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl lg:text-4xl font-bold text-blue-600">
                  KSH {product.price.toFixed(0)}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-slate-400 line-through">
                    KSH {product.originalPrice.toFixed(0)}
                  </span>
                )}
              </div>

              <p className="text-slate-600 text-lg leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Features */}
            <div className="flex flex-wrap gap-2">
              {product.features?.map((feature, index) => (
                <Badge key={index} variant="secondary" className="px-3 py-1">
                  <Award className="w-3 h-3 mr-1" />
                  {feature}
                </Badge>
              ))}
            </div>

            {/* Quick Info Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
                <div className="flex items-center gap-2 mb-1">
                  <Truck className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-medium">Delivery</span>
                </div>
                <p className="text-sm text-slate-600">{product.deliveryTime}</p>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
                <div className="flex items-center gap-2 mb-1">
                  <Users className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium">Serves</span>
                </div>
                <p className="text-sm text-slate-600">{product.servings}</p>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 col-span-2 lg:col-span-1">
                <div className="flex items-center gap-2 mb-1">
                  <Shield className="w-4 h-4 text-purple-500" />
                  <span className="text-sm font-medium">Quality</span>
                </div>
                <p className="text-sm text-slate-600">Premium</p>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="flex border-b border-slate-200">
                {[
                  { id: "description", label: "Description", icon: ChefHat },
                  { id: "ingredients", label: "Ingredients", icon: Leaf },
                  { id: "reviews", label: "Reviews", icon: MessageCircle },
                ].map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setActiveTab(id)}
                    className={`flex-1 px-4 py-3 text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                      activeTab === id
                        ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50/50"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </button>
                ))}
              </div>

              <div className="p-6">
                <AnimatePresence mode="wait">
                  {activeTab === "description" && (
                    <motion.div
                      key="description"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <p className="text-slate-700 leading-relaxed">
                        {product.fullDescription}
                      </p>
                    </motion.div>
                  )}

                  {activeTab === "ingredients" && (
                    <motion.div
                      key="ingredients"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-4"
                    >
                      <div>
                        <h4 className="font-semibold mb-2 text-slate-900">
                          Ingredients
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {product.ingredients?.map((ingredient, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="px-3 py-1"
                            >
                              {ingredient}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2 text-slate-900">
                          Allergens
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {product.allergens?.map((allergen, index) => (
                            <Badge
                              key={index}
                              variant="destructive"
                              className="px-3 py-1"
                            >
                              {allergen}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === "reviews" && (
                    <motion.div
                      key="reviews"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-4"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                            <span className="text-2xl font-bold">
                              {product.rating}
                            </span>
                          </div>
                          <p className="text-sm text-slate-600">
                            {product.reviews} reviews
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Write Review
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center justify-between py-4">
              <span className="font-semibold text-lg">Quantity</span>
              <div className="flex items-center bg-white rounded-xl border-2 border-slate-200 shadow-sm">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-3 rounded-l-xl hover:bg-slate-50"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="px-6 py-3 font-bold text-lg min-w-[4rem] text-center border-x border-slate-200">
                  {quantity}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-3 rounded-r-xl hover:bg-slate-50"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Similar Products */}
      <motion.div
        variants={itemVariants}
        className="mt-12 px-4 lg:max-w-7xl lg:mx-auto lg:px-8"
      >
        <h2 className="text-2xl font-bold mb-6 text-slate-900">
          You might also like
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {similarProducts.map((similarProduct, index) => (
            <motion.div
              key={similarProduct.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg transition-all duration-300 group cursor-pointer"
            >
              <div className="aspect-square overflow-hidden relative">
                <img
                  src={similarProduct.images[0]}
                  alt={similarProduct.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                  {similarProduct.name}
                </h3>
                <p className="text-sm text-slate-600 mb-2">
                  {similarProduct.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-blue-600">
                    KSH {similarProduct.price.toFixed(0)}
                  </span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">
                      {similarProduct.rating}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Sticky Add to Cart */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-slate-200 p-4 lg:hidden">
        <div className="max-w-md mx-auto flex gap-3">
          <Button
            variant="outline"
            size="lg"
            className="flex-shrink-0 rounded-xl px-6"
            onClick={() => setIsLiked(!isLiked)}
          >
            <Heart
              className={`w-5 h-5 ${
                isLiked ? "fill-red-500 text-red-500" : ""
              }`}
            />
          </Button>
          <Button
            id="add-to-cart-btn"
            onClick={handleAddToCart}
            className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            size="lg"
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            Add to Cart • KSH {(product.price * quantity).toFixed(0)}
          </Button>
        </div>
      </div>

      {/* Desktop Add to Cart */}
      <div className="hidden lg:block fixed bottom-8 right-8">
        <div className="flex gap-3">
          <Button
            variant="outline"
            size="lg"
            className="rounded-full p-4 shadow-lg hover:shadow-xl backdrop-blur-md bg-white/90"
            onClick={() => setIsLiked(!isLiked)}
          >
            <Heart
              className={`w-5 h-5 ${
                isLiked ? "fill-red-500 text-red-500" : ""
              }`}
            />
          </Button>
          <Button
            id="add-to-cart-btn"
            onClick={handleAddToCart}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            size="lg"
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            Add {quantity} to Cart • KSH {(product.price * quantity).toFixed(0)}
          </Button>
        </div>
      </div>

      <div className="h-24 lg:h-0" />
    </div>
  );
}
// Note: Fullscreen image viewer can be implemented as needed