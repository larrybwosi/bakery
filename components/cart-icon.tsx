"use client"

import { ShoppingCart } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function CartIcon() {
  const { state } = useCart()

  return (
    <Link href="/checkout">
      <Button variant="ghost" size="sm" className="relative">
        <ShoppingCart className="w-5 h-5" />
        {state.itemCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {state.itemCount}
          </span>
        )}
      </Button>
    </Link>
  )
}
