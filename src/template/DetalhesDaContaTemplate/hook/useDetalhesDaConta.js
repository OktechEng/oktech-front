import { useState, useEffect } from 'react';
import api from '@/services/api';
import { useAuth } from '@/hooks/useAuth';
import { useShop } from '@/hooks/useShop';

export function useDetalhesDaConta() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('detalhe');
  const [userRole, setUserRole] = useState(null);
  
  // Usar o hook genérico de autenticação
  const { isAuthenticated, authError, isLoading: authLoading, checkAuth } = useAuth();
  
  // Usar o hook da loja
  const { 
    shopData, 
    loading: shopLoading, 
    error: shopError, 
    hasShop, 
    fetchShopData, 
    clearShopData 
  } = useShop();

  useEffect(() => {
    // Só buscar dados se estiver autenticado
    if (isAuthenticated && !authLoading) {
      const fetchUserData = async () => {
        try {
          setLoading(true);
          const response = await api.get('/v1/users');
          setUserData(response.data);
          setUserRole(response.data.role);
          
          // Se for produtor, buscar dados da loja
          if (response.data.role === 'PRODUCTOR') {
            await fetchShopData();
          } else {
            // Limpar dados da loja se não for produtor
            clearShopData();
          }
          
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
  }, [isAuthenticated, authLoading, fetchShopData, clearShopData]);

  const handleTabChange = (tabValue) => {
    setActiveTab(tabValue);
  };

  const handleEditInfo = () => {
    // TODO: Funcionalidade a ser implementada
    console.log('Editar informações');
  };

  const handleDeleteAccount = () => {
    // TODO: Funcionalidade a ser implementada
    console.log('Excluir conta');
  };

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
    handleTabChange,
    handleEditInfo,
    handleDeleteAccount
  };
}