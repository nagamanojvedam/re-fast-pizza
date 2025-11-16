import CartOverview from "@/components/CartOverview";
import MenuItem from "@/components/MenuItem";

type PizzaType = {
  id: string;
  name: string;
  unitPrice: number;
  imageUrl: string;
  ingredients: string[];
  soldOut: boolean;
};

async function Page() {
  const res = await fetch("http://localhost:3000/api/menu", {
    cache: "no-store",
  });

  const { data: menu } = await res.json();
  return (
    <ul className="divide-y divide-stone-200 px-2">
      {menu.map((pizza: PizzaType) => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  );
}

export default Page;
