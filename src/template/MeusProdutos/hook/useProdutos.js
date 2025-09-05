import { useState, useEffect, useCallback } from 'react';
import { Product } from '../model/schema.js';

/**
 * Hook customizado para gerenciar produtos
 * Integra com as APIs de produtos e imagens
 */
export const useProdutos = (shopId) => {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProdutos, setFilteredProdutos] = useState([]);

  // Base URL da API (ajuste conforme necessário)
  const API_BASE_URL = 'http://loktech-boasaude-production.up.railway.app';

  /**
   * Função para fazer requisições HTTP
   */
  const apiRequest = async (url, options = {}) => {
    try {
      const response = await fetch(`${API_BASE_URL}${url}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (err) {
      console.error('Erro na requisição:', err);
      throw err;
    }
  };

  /**
   * Busca todos os produtos
   */
  const buscarProdutos = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await apiRequest('/v1/products');
      const produtosInstances = data.map(produto => Product.fromApiData(produto));
      setProdutos(produtosInstances);
    } catch (err) {
      setError('Erro ao buscar produtos: ' + err.message);
      setProdutos([]);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Busca um produto específico por ID
   */
  const buscarProdutoPorId = useCallback(async (id) => {
    setLoading(true);
    setError(null);

    try {
      const data = await apiRequest(`/v1/products/${id}`);
      return Product.fromApiData(data);
    } catch (err) {
      setError('Erro ao buscar produto: ' + err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Cria um novo produto
   */
  const criarProduto = useCallback(async (dadosProduto) => {
    setLoading(true);
    setError(null);

    try {
      const produto = new Product(dadosProduto);
      const validation = produto.validate();

      if (!validation.isValid) {
        throw new Error(validation.errors.join(', '));
      }

      const data = await apiRequest(`/v1/products/${shopId}`, {
        method: 'POST',
        body: JSON.stringify(produto.toApiFormat()),
      });

      const novoProduto = Product.fromApiData(data);
      setProdutos(prev => [...prev, novoProduto]);
      return novoProduto;
    } catch (err) {
      setError('Erro ao criar produto: ' + err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [shopId]);

  /**
   * Atualiza um produto existente
   */
  const atualizarProduto = useCallback(async (id, dadosProduto) => {
    setLoading(true);
    setError(null);

    try {
      const produto = new Product(dadosProduto);
      const validation = produto.validate();

      if (!validation.isValid) {
        throw new Error(validation.errors.join(', '));
      }

      const data = await apiRequest(`/v1/products/${id}`, {
        method: 'PUT',
        body: JSON.stringify(produto.toApiFormat()),
      });

      const produtoAtualizado = Product.fromApiData(data);
      setProdutos(prev => 
        prev.map(p => p.id === id ? produtoAtualizado : p)
      );
      return produtoAtualizado;
    } catch (err) {
      setError('Erro ao atualizar produto: ' + err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Remove um produto
   */
  const removerProduto = useCallback(async (id) => {
    setLoading(true);
    setError(null);

    try {
      await apiRequest(`/v1/products/${id}`, {
        method: 'DELETE',
      });

      setProdutos(prev => prev.filter(p => p.id !== id));
      return true;
    } catch (err) {
      setError('Erro ao remover produto: ' + err.message);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Upload de imagem para um produto
   */
  const uploadImagemProduto = useCallback(async (file, productId = null) => {
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('image', file);
      if (productId) {
        formData.append('productId', productId);
      }

      const response = await fetch(`${API_BASE_URL}/api/product-images/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Erro no upload: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (err) {
      setError('Erro ao fazer upload da imagem: ' + err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Busca imagens de um produto
   */
  const buscarImagensProduto = useCallback(async (productId) => {
    try {
      const data = await apiRequest(`/api/product-images/product/${productId}`);
      return data;
    } catch (err) {
      console.error('Erro ao buscar imagens do produto:', err);
      return [];
    }
  }, []);

  /**
   * Filtra produtos baseado no termo de busca
   */
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredProdutos(produtos);
    } else {
      const filtered = produtos.filter(produto =>
        produto.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        produto.categoria.toLowerCase().includes(searchTerm.toLowerCase()) ||
        produto.descricao.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProdutos(filtered);
    }
  }, [produtos, searchTerm]);

  /**
   * Carrega produtos na inicialização
   */
  useEffect(() => {
    if (shopId) {
      buscarProdutos();
    }
  }, [shopId, buscarProdutos]);

  /**
   * Estatísticas dos produtos
   */
  const estatisticas = {
    total: produtos.length,
    ativos: produtos.filter(p => p.ativo).length,
    inativos: produtos.filter(p => !p.ativo).length,
    emEstoque: produtos.filter(p => p.isInStock()).length,
    semEstoque: produtos.filter(p => !p.isInStock()).length,
    valorTotalEstoque: produtos.reduce((total, p) => total + (p.preco * p.estoque), 0),
    categorias: [...new Set(produtos.map(p => p.categoria).filter(Boolean))].length,
  };

  return {
    // Estado
    produtos: filteredProdutos,
    todosOsProdutos: produtos,
    loading,
    error,
    searchTerm,
    estatisticas,

    // Ações
    buscarProdutos,
    buscarProdutoPorId,
    criarProduto,
    atualizarProduto,
    removerProduto,
    uploadImagemProduto,
    buscarImagensProduto,
    setSearchTerm,
    setError,

    // Utilitários
    limparErro: () => setError(null),
    recarregar: buscarProdutos,
  };
};

