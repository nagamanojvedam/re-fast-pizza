"use client";

import { useCart } from "@/context/CartContext";
import { formatCurrency } from "@/utils/helpers";
import Link from "next/link";

function CartOverview() {
  const { getTotalPizzaQuantity, getTotalPizzaCost } = useCart();

  const quantity = getTotalPizzaQuantity();
  const amount = getTotalPizzaCost();

  if (quantity === 0) return null;

  return (
    <div className="flex items-center justify-between bg-stone-800 p-4 text-sm text-stone-200 uppercase sm:px-6 md:text-base">
      <p className="space-x-4 font-semibold text-stone-300 sm:space-x-6">
        <span>
          {quantity} pizza{quantity > 1 ? "s" : ""}
        </span>
        <span>{formatCurrency(amount)}</span>
      </p>
      <Link href="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
