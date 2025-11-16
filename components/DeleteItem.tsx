import { useCart } from "@/context/CartContext";
import Button from "./Button";

function DeleteItem({ pizzaId }: { pizzaId: string }) {
  const { removeItem } = useCart();
  return (
    <Button type="small" onClick={() => removeItem(pizzaId)}>
      Delete
    </Button>
  );
}

export default DeleteItem;
