"use client";

import { useEffect, useRef, useState } from "react";
import { listProducts } from "@/services/products";



export function useHome() {
  const scrollContainerRef = useRef(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await listProducts();
        setProducts(Array.isArray(data?.content) ? data.content : []);
      } catch (err) {
        setError("Falha ao carregar produtos");
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


