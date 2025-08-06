import { useState, useEffect } from 'react';
import api from '@/services/api';

export function useDetalhesDaConta() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('detalhe');

  useEffect(() => {
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
  }, []);

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
    handleTabChange,
    handleEditInfo,
    handleDeleteAccount
  };
}