import { useState, useCallback } from 'react';
import api from '@/services/api';
import shopService from '@/services/shop';

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

  const updateShopData = useCallback(async (shopId, updateData) => {
    try {
      setLoading(true);
      setError(null);
      
      const updatedShop = await shopService.updateShop(shopId, updateData);
      setShopData(updatedShop);
      
      return updatedShop;
    } catch (err) {
      console.error('Erro ao atualizar dados da loja:', err);
      setError('Erro ao atualizar dados da loja');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    shopData,
    loading,
    error,
    hasShop,
    fetchShopData,
    clearShopData,
    updateShopData
  };
}