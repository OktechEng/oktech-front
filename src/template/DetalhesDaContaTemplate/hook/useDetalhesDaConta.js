import { useState, useEffect } from 'react';
import api from '@/services/api';
import { useAuth } from '@/hooks/useAuth';

export function useDetalhesDaConta() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('detalhe');
  
  // Usar o hook genérico de autenticação
  const { isAuthenticated, authError, isLoading: authLoading, checkAuth } = useAuth();

  useEffect(() => {
    // Só buscar dados se estiver autenticado
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

  return {
    userData,
    loading,
    error,
    activeTab,
    isAuthenticated,
    authError,
    authLoading,
    handleTabChange,
    handleEditInfo,
    handleDeleteAccount
  };
}