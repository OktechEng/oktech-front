"use client";

import { useEffect, useRef, useState } from "react";
import { listProductsWithImages } from "@/services/products";

export function useHome() {
  const scrollContainerRef = useRef(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await listProductsWithImages({ size: 10 }); // Limita a 10 produtos na home
        setProducts(response.content || []);
      } catch (err) {
        setError("Falha ao carregar produtos e imagens");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return {
    scrollContainerRef,
    scrollLeft,
    scrollRight,
    products,
    loading,
    error,
  };
}


