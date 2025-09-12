import api from './api';

// Serviços relacionados à loja
export const shopService = {
  // Buscar dados da loja do usuário atual
  getCurrentShop: async () => {
    try {
      const response = await api.get('/v1/shops');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar dados da loja:', error);
      throw error;
    }
  },

  // Criar loja
  createShop: async (shopData) => {
    try {
      const response = await api.post('/v1/shops', shopData);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar loja:', error);
      throw error;
    }
  },

  // Atualizar loja
  updateShop: async (shopId, shopData) => {
    try {
      const response = await api.put(`/v1/shops/${shopId}`, shopData);
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar loja:', error);
      throw error;
    }
  },

  // Excluir loja
  deleteShop: async (shopId) => {
    try {
      const response = await api.delete(`/v1/shops/${shopId}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao excluir loja:', error);
      throw error;
    }
  },

  // Buscar produtos da loja
  getShopProducts: async (shopId, page = 0, size = 10, sort = []) => {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        size: size.toString(),
        ...(sort.length > 0 && { sort })
      });
      
      const response = await api.get(`/v1/shops/${shopId}/products?${params}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar produtos da loja:', error);
      throw error;
    }
  },

  // Buscar todas as lojas (para listagem)
  getAllShops: async (page = 0, size = 10, sort = []) => {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        size: size.toString(),
        ...(sort.length > 0 && { sort })
      });
      
      const response = await api.get(`/v1/shops/all?${params}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar todas as lojas:', error);
      throw error;
    }
  }
};

export default shopService;
