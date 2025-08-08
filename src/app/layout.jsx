import { Header } from "@/components/header";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";

export const metadata = {
  title: "BOA SAUDE",
  };


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Header/>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
