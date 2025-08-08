"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { createOrder } from "@/services/orders";

export default function CheckoutButton() {
  const { items, clearCart, setIsCheckingOut, isCheckingOut } = useCart();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleCheckout = async () => {
    setError("");
    setSuccess("");
    if (items.length === 0) return;
    try {
      setIsCheckingOut(true);
      const payload = items.map(({ product, quantity }) => ({
        productId: product.id,
        quantity,
      }));
      await createOrder(payload);
      clearCart();
      setSuccess("Pedido criado com sucesso!");
    } catch (err) {
      setError("Falha ao criar pedido. Tente novamente.");
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <div className="flex flex-col items-end gap-2">
      {error && <p className="text-sm text-red-600">{error}</p>}
      {success && <p className="text-sm text-green-600">{success}</p>}
      <Button
        className="bg-green-600 hover:bg-green-700"
        disabled={items.length === 0 || isCheckingOut}
        onClick={handleCheckout}
      >
        {isCheckingOut ? "Processando..." : "Finalizar compra"}
      </Button>
    </div>
  );
}


