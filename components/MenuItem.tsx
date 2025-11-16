"use client";

import { formatCurrency } from "@/utils/helpers";
// import Image from "next/image";
import Button from "./Button";
import UpdateItemQuantity from "./UpdateItemQuantity";
import DeleteItem from "./DeleteItem";
import { useCart } from "@/context/CartContext";

type PizzaType = {
  id: string;
  name: string;
  unitPrice: number;
  imageUrl: string;
  ingredients: string[];
  soldOut: boolean;
};

function MenuItem({ pizza }: { pizza: PizzaType }) {
  // const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const { id, name, unitPrice, ingredients, soldOut } = pizza;
  const { getCurrentQuantityById, addItem } = useCart();

  const currentQuantity = getCurrentQuantityById(id);

  const isInCart = currentQuantity > 0;

  const handleAddToCart = () => {
    const newItem = {
      id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice,
    };
    addItem(newItem);
  };
  return (
    <li className="flex gap-4 py-2">
      {/* <Image
        src={imageUrl}
        alt={`${name}`}
        width={50}
        height={50}
        className={`h-24 ${soldOut ? "opacity-70 grayscale" : ""}`}
      /> */}
      <div className="h-16 w-16 bg-yellow-100 flex items-center justify-center text-4xl">
        🍕
      </div>

      <div className="flex grow flex-col pt-0.5">
        <p className="font-medium">{name}</p>
        <p className="text-sm text-stone-500 capitalize italic">
          {ingredients.join(", ")}
        </p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <p className="text-sm">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm font-medium text-stone-500 uppercase">
              Sold Out
            </p>
          )}

          {isInCart && (
            <div className="flex items-center gap-3 sm:gap-8">
              <UpdateItemQuantity
                pizzaId={id}
                currentQuantity={currentQuantity}
              />
              <DeleteItem pizzaId={id} />
            </div>
          )}

          {!soldOut && !isInCart && (
            <Button type="small" onClick={handleAddToCart}>
              Add to cart
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
