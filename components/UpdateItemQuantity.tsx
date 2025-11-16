"use client";

import { useCart } from "@/context/CartContext";
import Button from "./Button";

type UpdateItemQuantityType = {
  pizzaId: string;
  currentQuantity: number;
};

function UpdateItemQuantity({
  pizzaId,
  currentQuantity,
}: UpdateItemQuantityType) {
  const { increaseItemQuantity, decreaseItemQuantity } = useCart();

  return (
    <div className="flex items-center gap-2 md:gap-3">
      <Button type="round" onClick={() => decreaseItemQuantity(pizzaId)}>
        -
      </Button>
      <span>{currentQuantity}</span>
      <Button type="round" onClick={() => increaseItemQuantity(pizzaId)}>
        +
      </Button>
    </div>
  );
}

export default UpdateItemQuantity;
