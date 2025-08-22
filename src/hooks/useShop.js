import { useState, useCallback } from 'react';
import api from '@/services/api';

export function useShop() {
  const [shopData, setShopData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasShop, setHasShop] = useState(false);

  const fetchShopData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await api.get('/v1/shops');
      
      if (response.data) {
        setShopData(response.data);
        setHasShop(true);
      } else {
        setShopData(null);
        setHasShop(false);
      }
    } catch (err) {
      console.error('Erro ao buscar dados da loja:', err);
      
      // Se o erro for 404, significa que o produtor não tem loja
      if (err.response?.status === 404) {
        setShopData(null);
        setHasShop(false);
        setError(null); // Não é um erro, apenas não tem loja
      } else {
        setError('Erro ao carregar dados da loja');
        setHasShop(false);
      }
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError, setShopData, setHasShop]);

  const clearShopData = useCallback(() => {
    setShopData(null);
    setHasShop(false);
    setError(null);
  }, []);

  return {
    shopData,
    loading,
    error,
    hasShop,
    fetchShopData,
    clearShopData
  };
}