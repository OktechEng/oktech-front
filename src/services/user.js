import api from './api';

// Serviços relacionados ao usuário
export const userService = {
  // Buscar dados do usuário atual
  getCurrentUser: async () => {
    try {
      const response = await api.get('/v1/users');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar dados do usuário:', error);
      throw error;
    }
  },

  // Atualizar dados do usuário
  // NOTA: O Swagger não possui endpoint PUT para atualizar dados do usuário
  // Esta funcionalidade pode ser implementada quando o endpoint estiver disponível
  updateUser: async (userData) => {
    try {
      // Por enquanto, vamos simular uma atualização bem-sucedida
      // pois não há endpoint disponível no Swagger
      console.warn('Endpoint de atualização de usuário não disponível no Swagger');
      return { message: 'Funcionalidade de atualização de usuário não implementada no backend' };
    } catch (error) {
      console.error('Erro ao atualizar dados do usuário:', error);
      throw error;
    }
  },

  // Excluir conta do usuário
  deleteAccount: async () => {
    try {
      const response = await api.delete('/v1/users/me');
      return response.data;
    } catch (error) {
      console.error('Erro ao excluir conta do usuário:', error);
      
      // Tratamento específico de erros
      if (error.response?.status === 500) {
        throw new Error('Erro interno do servidor. Tente novamente mais tarde ou entre em contato com o suporte.');
      } else if (error.response?.status === 401) {
        throw new Error('Sessão expirada. Faça login novamente.');
      } else if (error.response?.status === 403) {
        throw new Error('Você não tem permissão para realizar esta ação.');
      } else if (error.response?.status === 404) {
        throw new Error('Conta não encontrada.');
      } else if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error('Erro inesperado ao excluir conta. Tente novamente.');
      }
    }
  },

  // Buscar endereços do usuário
  getAddresses: async () => {
    try {
      const response = await api.get('/v1/addresses/me');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar endereços:', error);
      throw error;
    }
  },

  // Criar endereço
  createAddress: async (addressData) => {
    try {
      const response = await api.post('/v1/addresses', addressData);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar endereço:', error);
      throw error;
    }
  },

  // Atualizar endereço
  updateAddress: async (addressId, addressData) => {
    try {
      const response = await api.put(`/v1/addresses/${addressId}`, addressData);
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar endereço:', error);
      throw error;
    }
  },

  // Excluir endereço
  deleteAddress: async (addressId) => {
    try {
      const response = await api.delete(`/v1/addresses/${addressId}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao excluir endereço:', error);
      throw error;
    }
  }
};

export default userService;
