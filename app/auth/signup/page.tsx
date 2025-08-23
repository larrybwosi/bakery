"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Instagram, Chrome, ArrowLeft } from "lucide-react"
import { z } from "zod"

const customerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required").optional().or(z.literal("")),
  phone: z.string().optional(),
  address: z.string().optional(),
  notes: z.string().optional(),
  referralCode: z.string().optional(),
})

type CustomerData = z.infer<typeof customerSchema>

export default function SignUpPage() {
  const [step, setStep] = useState<"auth" | "customer">("auth")
  const [authData, setAuthData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [authErrors, setAuthErrors] = useState<Record<string, string>>({})
  const [customerData, setCustomerData] = useState<CustomerData>({
    name: "",
    email: "",
    phone: "",
    address: "",
    notes: "",
    referralCode: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showEmailForm, setShowEmailForm] = useState(false)
  const searchParams = useSearchParams()

  useEffect(() => {
    const referral = searchParams.get("ref")
    if (referral) {
      setCustomerData((prev) => ({ ...prev, referralCode: referral }))
    }
  }, [searchParams])

  const handleAuthMethod = (method: "google" | "instagram" | "email") => {
    console.log(`[v0] Auth method selected: ${method}`)

    if (method === "email") {
      setShowEmailForm(true)
    } else {
      // Simulate successful social auth and move to customer registration
      setStep("customer")
    }
  }

  const handleEmailSignup = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: Record<string, string> = {}

    if (!authData.email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(authData.email)) {
      newErrors.email = "Please enter a valid email"
    }

    if (!authData.password) {
      newErrors.password = "Password is required"
    } else if (authData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    if (authData.password !== authData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    if (Object.keys(newErrors).length > 0) {
      setAuthErrors(newErrors)
      return
    }

    // Simulate email verification success
    setCustomerData((prev) => ({ ...prev, email: authData.email }))
    setStep("customer")
  }

  const handleCustomerSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    try {
      customerSchema.parse(customerData)
      setErrors({})

      console.log("[v0] Customer registration data:", customerData)
      alert("Registration successful! Welcome to Golden Crust Bakery.")

      // Redirect to products page
      window.location.href = "/products"
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {}
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message
          }
        })
        setErrors(newErrors)
      }
    }
  }

  const handleInputChange = (field: keyof CustomerData, value: string) => {
    setCustomerData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-serif font-black text-xl">GC</span>
            </div>
            <h1 className="text-3xl font-serif font-black text-foreground">Golden Crust</h1>
          </div>
          <p className="text-muted-foreground">Join our bakery family</p>
        </div>

        {step === "auth" ? (
          <Card className="border-border bg-background">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-serif font-bold">Sign Up</CardTitle>
              <p className="text-muted-foreground">Choose your preferred sign-up method</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {!showEmailForm ? (
                <>
                  <Button
                    onClick={() => handleAuthMethod("google")}
                    variant="outline"
                    className="w-full flex items-center justify-center gap-3 h-12 border-border hover:bg-card"
                  >
                    <Chrome className="w-5 h-5 text-blue-600" />
                    Continue with Google
                  </Button>

                  <Button
                    onClick={() => handleAuthMethod("instagram")}
                    variant="outline"
                    className="w-full flex items-center justify-center gap-3 h-12 border-border hover:bg-card"
                  >
                    <Instagram className="w-5 h-5 text-pink-600" />
                    Continue with Instagram
                  </Button>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-border" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">Or</span>
                    </div>
                  </div>

                  <Button
                    onClick={() => handleAuthMethod("email")}
                    className="w-full flex items-center justify-center gap-3 h-12 bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    <Mail className="w-5 h-5" />
                    Continue with Email
                  </Button>
                </>
              ) : (
                <form onSubmit={handleEmailSignup} className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowEmailForm(false)}
                      className="p-1 h-8 w-8"
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </Button>
                    <h3 className="text-lg font-semibold">Create Account</h3>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="auth-email">Email Address</Label>
                    <Input
                      id="auth-email"
                      type="email"
                      value={authData.email}
                      onChange={(e) => {
                        setAuthData((prev) => ({ ...prev, email: e.target.value }))
                        if (authErrors.email) setAuthErrors((prev) => ({ ...prev, email: "" }))
                      }}
                      className={authErrors.email ? "border-red-500" : ""}
                      placeholder="your.email@example.com"
                    />
                    {authErrors.email && <p className="text-sm text-red-500">{authErrors.email}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="auth-password">Password</Label>
                    <Input
                      id="auth-password"
                      type="password"
                      value={authData.password}
                      onChange={(e) => {
                        setAuthData((prev) => ({ ...prev, password: e.target.value }))
                        if (authErrors.password) setAuthErrors((prev) => ({ ...prev, password: "" }))
                      }}
                      className={authErrors.password ? "border-red-500" : ""}
                      placeholder="Create a secure password"
                    />
                    {authErrors.password && <p className="text-sm text-red-500">{authErrors.password}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="auth-confirm-password">Confirm Password</Label>
                    <Input
                      id="auth-confirm-password"
                      type="password"
                      value={authData.confirmPassword}
                      onChange={(e) => {
                        setAuthData((prev) => ({ ...prev, confirmPassword: e.target.value }))
                        if (authErrors.confirmPassword) setAuthErrors((prev) => ({ ...prev, confirmPassword: "" }))
                      }}
                      className={authErrors.confirmPassword ? "border-red-500" : ""}
                      placeholder="Confirm your password"
                    />
                    {authErrors.confirmPassword && <p className="text-sm text-red-500">{authErrors.confirmPassword}</p>}
                  </div>

                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12">
                    Create Account & Verify
                  </Button>
                </form>
              )}

              <div className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <a href="/auth/signin" className="text-primary hover:underline">
                  Sign in
                </a>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="border-border bg-background">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Button variant="ghost" size="sm" onClick={() => setStep("auth")} className="p-1 h-8 w-8">
                  <ArrowLeft className="w-4 h-4" />
                </Button>
                <CardTitle className="text-xl font-serif font-bold">Complete Your Profile</CardTitle>
              </div>
              <p className="text-muted-foreground text-sm">
                Tell us a bit about yourself to personalize your bakery experience
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCustomerSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={customerData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className={errors.name ? "border-red-500" : ""}
                    placeholder="Enter your full name"
                  />
                  {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={customerData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className={errors.email ? "border-red-500" : ""}
                    placeholder="your.email@example.com"
                  />
                  {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={customerData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="(555) 123-4567"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    value={customerData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    placeholder="Your delivery address (optional)"
                    rows={2}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Special Notes</Label>
                  <Textarea
                    id="notes"
                    value={customerData.notes}
                    onChange={(e) => handleInputChange("notes", e.target.value)}
                    placeholder="Any dietary restrictions, preferences, or special requests..."
                    rows={3}
                  />
                </div>

                {customerData.referralCode && (
                  <div className="space-y-2">
                    <Label htmlFor="referralCode">Referral Code</Label>
                    <Input
                      id="referralCode"
                      value={customerData.referralCode}
                      onChange={(e) => handleInputChange("referralCode", e.target.value)}
                      placeholder="Referral code"
                      className="bg-green-50 border-green-200"
                    />
                    <p className="text-sm text-green-600">🎉 You'll receive a special discount with this referral!</p>
                  </div>
                )}

                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12">
                  Complete Registration
                </Button>

                <div className="text-center text-xs text-muted-foreground">
                  By registering, you agree to our{" "}
                  <a href="/terms" className="text-primary hover:underline">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="/privacy" className="text-primary hover:underline">
                    Privacy Policy
                  </a>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <div className="text-center mt-6">
          <a href="/" className="text-muted-foreground hover:text-primary transition-colors text-sm">
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  )
}
