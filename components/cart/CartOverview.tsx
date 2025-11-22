"use client";

import { useCart } from "@/context/CartContext";
import { formatCurrency } from "@/utils/helpers";
import { ShoppingCart, X, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

function CartOverview() {
  const {
    cart,
    clearCart,
    getTotalPizzaQuantity,
    getTotalPizzaCost,
    removeItem,
  } = useCart();
  const [isExpanded, setIsExpanded] = useState(false);

  const quantity = getTotalPizzaQuantity();
  const amount = getTotalPizzaCost();

  if (quantity === 0) return null;

  return (
    <div className="fixed bottom-16 right-12 z-50 flex flex-col items-end gap-2">
      {/* Expanded Cart Items List */}
      {isExpanded && (
        <div className="animate-in slide-in-from-bottom-4 max-h-96 w-80 overflow-hidden rounded-lg border-2 border-yellow-400 bg-white shadow-2xl duration-200">
          {/* Header */}
          <div className="flex items-center gap-2 bg-yellow-400 p-3">
            <h3 className="flex items-center gap-2 text-sm font-semibold text-stone-900">
              <ShoppingCart className="h-4 w-4" />
              Cart Items ({cart.length})
            </h3>
            <button
              onClick={clearCart}
              className="flex items-center gap-1 text-xs text-red-600 transition-colors hover:text-red-700"
            >
              <Trash2 className="h-3 w-3" />
            </button>
          </div>

          {/* Cart Items - Max 5 visible with scroll */}
          <div className="max-h-60 overflow-y-auto">
            {cart.map((item) => (
              <div
                key={item.id}
                className="border-b border-stone-200 p-3 transition-colors hover:bg-stone-50"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-stone-800">
                      {item.name}
                    </p>
                    <p className="mt-1 text-xs text-stone-600">
                      {item.quantity} × {formatCurrency(item.unitPrice)} ={" "}
                      {formatCurrency(item.totalPrice)}
                    </p>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="flex-shrink-0 text-red-600 transition-colors hover:text-red-700"
                    aria-label={`Remove ${item.name}`}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-between gap-2 border-t border-stone-200 bg-stone-50 p-3">
            <span className="font-semibold">
              Total: {formatCurrency(amount)}
            </span>
            <Link
              href="/cart"
              className="rounded-md bg-yellow-400 px-4 py-1.5 text-xs font-semibold text-stone-900 transition-colors hover:bg-yellow-400"
            >
              Checkout →
            </Link>
          </div>
        </div>
      )}

      {/* Snackbar Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="relative flex items-center gap-3 rounded-full bg-yellow-400 px-4 py-3 text-stone-900 shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl"
        aria-label={isExpanded ? "Collapse cart" : "Expand cart"}
      >
        <ShoppingCart className="h-6 w-6" />
        <div className="absolute right-[-5px] top-[-5px] flex items-center rounded-full bg-red-600 px-1.5 text-sm font-semibold text-white">
          {quantity}
        </div>
      </button>
    </div>
  );
}

export default CartOverview;
