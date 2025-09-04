'use client'

import { useAuth } from '@/hooks/useAuth';

export const ProtectedRoute = ({ children, redirectTo = "/login", delay = 3000 }) => {
  const { isAuthenticated, authError, isLoading } = useAuth(redirectTo, delay);

  // Mostrar loading enquanto verifica autenticação
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-400 mx-auto"></div>
          <p className="mt-4 text-gray-600">Verificando autenticação...</p>
        </div>
      </div>
    );
  }

  // Se não estiver autenticado, mostrar apenas a mensagem de erro
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg">{authError}</p>
        </div>
      </div>
    );
  }

  // Se estiver autenticado, renderizar o conteúdo
  return children;
};
