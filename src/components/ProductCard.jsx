"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useState } from "react";

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const [imageError, setImageError] = useState(false);

  // Resolve URL da imagem (suporta caminhos relativos retornados pela API)
  const resolveImageUrl = (url) => {
    console.log('Resolving image URL:', url);
    
    // Se não há URL, retorna imagem padrão
    if (!url || url === '') {
      console.log('No image URL, using default');
      return "/img/produto-default.png";
    }
    
    // Se já é uma URL completa, retorna como está
    if (url.startsWith("http://") || url.startsWith("https://")) {
      console.log('Full URL detected:', url);
      return url;
    }
    
    // Se já começa com /, retorna como está (URL relativa)
    if (url.startsWith("/")) {
      console.log('Relative URL starting with /:', url);
      return url;
    }
    
    // Constrói URL completa usando a base da API
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
    const cleanBase = baseUrl.replace(/\/$/, "");
    const fullUrl = `${cleanBase}/${url}`;
    console.log('Constructed full URL:', fullUrl);
    return fullUrl;
  };

  // Verifica se há imagens disponíveis
  const hasImages = product.images && Array.isArray(product.images) && product.images.length > 0;
  const imageUrl = hasImages ? product.images[0].imageUrl : null;
  const productImage = resolveImageUrl(imageUrl);
  
  console.log('Product data:', product);
  console.log('Has images:', hasImages);
  console.log('Image URL:', imageUrl);
  console.log('Final product image:', productImage);

  // Função para lidar com erro de carregamento da imagem
  const handleImageError = () => {
    console.log('Image failed to load, using default');
    setImageError(true);
  };

  return (
    <div className="bg-white p-4 md:p-6 rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 text-center group border border-gray-100 flex-shrink-0 w-48 md:w-56">
      <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 relative bg-gray-50 rounded-lg overflow-hidden">
        <Image
          src={imageError ? "/img/produto-default.png" : productImage}
          alt={product.name}
          fill
          className="object-contain group-hover:scale-110 transition-transform duration-300"
          sizes="(max-width: 768px) 64px, 80px"
          style={{ objectFit: "contain", maxWidth: "100%", maxHeight: "100%" }}
          onError={handleImageError}
        />
      </div>
      <p className="font-semibold text-gray-800 mb-2 text-sm md:text-base group-hover:text-green-600 transition-colors">
        {product.name}
      </p>
      <p className="text-green-600 font-bold mb-3 text-sm md:text-base">
        R$ {(product.price ?? 0).toFixed(2)}
      </p>
      <Button
        className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg text-xs md:text-sm transition-all duration-300 flex items-center justify-center gap-1 mx-auto group-hover:shadow-lg group-hover:scale-105"
        onClick={() => addItem(product, 1)}
      >
        Adicionar
      </Button>
    </div>
  );
}


