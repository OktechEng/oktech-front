"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";

export default function ProductCard({ product }) {
  const { addItem } = useCart();

  return (
    <div className="bg-white p-4 md:p-6 rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 text-center group border border-gray-100 flex-shrink-0 w-48 md:w-56">
      <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 relative bg-gray-50 rounded-lg overflow-hidden">
        <Image
          src={"/img/banana.png"}
          alt={product.name}
          fill
          className="object-contain group-hover:scale-110 transition-transform duration-300"
          sizes="(max-width: 768px) 64px, 80px"
          style={{ objectFit: 'contain', maxWidth: '100%', maxHeight: '100%' }}
        />
      </div>
      <p className="font-semibold text-gray-800 mb-2 text-sm md:text-base group-hover:text-green-600 transition-colors">{product.name}</p>
      <p className="text-green-600 font-bold mb-3 text-sm md:text-base">R$ {(product.price ?? 0).toFixed(2)}</p>
      <Button
        className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg text-xs md:text-sm transition-all duration-300 flex items-center justify-center gap-1 mx-auto group-hover:shadow-lg group-hover:scale-105"
        onClick={() => addItem(product, 1)}
      >
        Adicionar
      </Button>
    </div>
  );
}


