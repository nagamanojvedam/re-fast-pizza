import { CartProvider } from "@/context/CartContext";
import { UserProvider } from "@/context/UserContext";

function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider>
      <CartProvider>{children}</CartProvider>
    </UserProvider>
  );
}

export default ClientProviders;
