'use client';

import { useDetalhesDaConta } from './hook/useDetalhesDaConta';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/tabs';
import DetalhesDaConta from './pages/DetalhesDaConta';
import HistoricoPedidos from './pages/HistoricoPedidos';
import MetodosPagamento from './pages/MetodosPagamento';
import React from "react";

export default function DetalhesDaContaTemplate() {
  const {
    userData,
    loading,
    error,
    activeTab,
    isAuthenticated,
    authError,
    authLoading,
    handleTabChange,
    handleEditInfo,
    handleDeleteAccount,
  } = useDetalhesDaConta();

  // Mostrar loading enquanto verifica autenticação
  if (authLoading) {
    return (
      <div className="flex justify-center items-center h-64 px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-400 mx-auto"></div>
          <p className="mt-4 text-gray-600">Verificando autenticação...</p>
        </div>
      </div>
    );
  }

  // Se não estiver autenticado, mostrar mensagem de erro
  if (!isAuthenticated) {
    return (
      <div className="flex justify-center items-center h-64 px-4">
        <div className="text-center">
          <p className="text-red-600 text-lg">{authError}</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 px-4">
        <p className="text-lg">Carregando...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64 px-4">
        <p className="text-lg text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="w-full px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold mb-2">Conta</h1>
        <Tabs value={activeTab} className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger
              value="detalhe"
              activeTab={activeTab}
              onClick={() => handleTabChange("detalhe")}
            >
              Detalhe da conta
            </TabsTrigger>
            <TabsTrigger
              value="historico"
              activeTab={activeTab}
              onClick={() => handleTabChange("historico")}
            >
              Histórico de Pedidos
            </TabsTrigger>
            <TabsTrigger
              value="pagamento"
              activeTab={activeTab}
              onClick={() => handleTabChange("pagamento")}
            >
              Método de Pagamento
            </TabsTrigger>
          </TabsList>
          <TabsContent value="detalhe" activeTab={activeTab}>
            <DetalhesDaConta
              userData={userData}
              handleEditInfo={handleEditInfo}
              handleDeleteAccount={handleDeleteAccount}
            />
          </TabsContent>
          <TabsContent value="historico" activeTab={activeTab}>
            <HistoricoPedidos />
          </TabsContent>
          <TabsContent value="pagamento" activeTab={activeTab}>
            <MetodosPagamento />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
