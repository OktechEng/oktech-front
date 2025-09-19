import { useState, useEffect } from 'react';
import api from '@/services/api';
import userService from '@/services/user';
import { useAuth } from '@/hooks/useAuth';
import { useShop } from '@/hooks/useShop';

export function useDetalhesDaConta() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('detalhe');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  
  const { isAuthenticated, authError, isLoading: authLoading, checkAuth } = useAuth();
  
  const { 
    shopData, 
    loading: shopLoading, 
    error: shopError, 
    hasShop, 
    fetchShopData, 
    clearShopData,
    updateShopData
  } = useShop();

  useEffect(() => {
    if (isAuthenticated && !authLoading) {
      const fetchUserData = async () => {
        try {
          setLoading(true);
          const response = await api.get('/v1/users');
          setUserData(response.data);
          setError(null);
        } catch (err) {
          console.error('Erro ao buscar dados do usuário:', err);
          setError('Erro ao carregar dados do usuário');
        } finally {
          setLoading(false);
        }
      };

      fetchUserData();
    }
  }, [isAuthenticated, authLoading]);

  useEffect(() => {
    if (userData) {
      if (userData.role === 'PRODUCTOR') {
        fetchShopData();
      } else {
        clearShopData();
      }
    }
  }, [userData, fetchShopData, clearShopData]);

  const handleTabChange = (tabValue) => {
    setActiveTab(tabValue);
  };

  const handleEditInfo = () => {
    setIsEditModalOpen(true);
  };

  const handleDeleteAccount = () => {
    setIsDeleteModalOpen(true);
  };

  const handleEditSuccess = async () => {
    // Recarregar dados do usuário e da loja após edição
    try {
      setLoading(true);
      const response = await userService.getCurrentUser();
      setUserData(response);
      setError(null);
      
      // Se for produtor, recarregar dados da loja também
      if (response.role === 'PRODUCTOR') {
        await fetchShopData();
      }
    } catch (err) {
      console.error('Erro ao recarregar dados do usuário:', err);
      setError('Erro ao recarregar dados do usuário');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSuccess = () => {
    // Limpar dados locais e redirecionar para login
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('userData');
    window.location.href = '/login';
  };

  const userRole = userData?.role;
  const isProducer = userRole === 'PRODUCTOR';
  const isUser = userRole === 'USER';

  return {
    userData,
    loading: loading || shopLoading,
    error: error || shopError,
    activeTab,
    isAuthenticated,
    authError,
    authLoading,
    userRole,
    isProducer,
    isUser,
    shopData,
    hasShop,
    isEditModalOpen,
    isDeleteModalOpen,
    handleTabChange,
    handleEditInfo,
    handleDeleteAccount,
    handleEditSuccess,
    handleDeleteSuccess,
    setIsEditModalOpen,
    setIsDeleteModalOpen,
    updateShopData
  };
}