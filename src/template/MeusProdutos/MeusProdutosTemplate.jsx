'use client';
import React, { useState } from 'react';
import { useProdutos } from './hook/useProdutos.js';
import { PRODUCT_CONSTANTS } from './model/schema.js';
import { useRouter } from 'next/navigation';

export default function MeusProdutosTemplate({ shopId = "default-shop" }) {
  const {
    produtos,
    loading,
    error,
    searchTerm,
    estatisticas,
    criarProduto,
    atualizarProduto,
    removerProduto,
    uploadImagemProduto,
    setSearchTerm,
    limparErro,
    recarregar
  } = useProdutos(shopId);

  console.log('shopId em MeusProdutosTemplate:', shopId);

  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    stock: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  // Resetar formulário
  const resetForm = () => {
    setFormData({
      nome: '',
      price: '',
      description: '',
      category: '',
      stock: ''
    });
    setImageFile(null);
    setEditingProduct(null);
    setShowForm(false);
  };

  // Preencher formulário para edição
  const editProduct = (produto) => {
    setFormData({
      name: produto.name,
      price: produto.price.toString(),
      description: produto.description,
      category: produto.category,
      stock: produto.stock.toString()
    });
    setEditingProduct(produto);
    setShowForm(true);
  };

  // Submeter formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);

    try {
      const produtoData = {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock) || 0,
        shopId
      };

      let produto;
      if (editingProduct) {
        produto = await atualizarProduto(editingProduct.id, produtoData);
      } else {
        produto = await criarProduto(produtoData);
      }

      // Upload da imagem se fornecida
      if (imageFile && produto) {
        await uploadImagemProduto(imageFile, produto.id);
      }

      resetForm();
      recarregar();
    } catch (err) {
      console.error('Erro ao salvar produto:', err);
    } finally {
      setFormLoading(false);
    }
  };

  // Deletar produto
  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja remover este produto?')) {
      await removerProduto(id);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-green-800">Gerenciar Produtos</h1>
            <div className="flex items-center gap-4">
              <input
                type="text"
                placeholder="Pesquisar produto..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Dashboard de Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total de Produtos</p>
                <p className="text-3xl font-bold text-gray-900">{estatisticas.total}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 text-xl">📦</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Em Estoque</p>
                <p className="text-3xl font-bold text-orange-600">{estatisticas.emEstoque}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <span className="text-orange-600 text-xl">📊</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Valor Total</p>
                <p className="text-3xl font-bold text-purple-600">
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format(estatisticas.valorTotalEstoque)}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-purple-600 text-xl">💰</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mensagens de erro */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex justify-between items-center">
            <span>{error}</span>
            <button onClick={limparErro} className="text-red-500 hover:text-red-700">
              ✕
            </button>
          </div>
        )}


        {/* Loading */}
        {loading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
            <p className="mt-2 text-gray-600">Carregando produtos...</p>
          </div>
        )}

        {/* Lista de Produtos */}
        {!loading && (
          <div className="bg-white rounded-xl shadow-sm border">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-900">
                Produtos Cadastrados ({produtos.length})
              </h2>
            </div>
            
            {produtos.length === 0 ? (
              <div className="p-12 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-gray-400 text-2xl">📦</span>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum produto encontrado</h3>
                <p className="text-gray-600 mb-4">
                  {searchTerm ? 'Tente ajustar sua pesquisa' : 'Comece cadastrando seu primeiro produto'}
                </p>
                {!searchTerm && (
                  <button
                    onClick={() => setShowForm(true)}
                    className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium"
                  >
                    Cadastrar Produto
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
                {produtos.map((produto) => (
                  <div
                    key={produto.id}
                    className="bg-white rounded-lg border hover:shadow-lg transition-shadow overflow-hidden"
                  >
                    <div className="aspect-square bg-gray-100 flex items-center justify-center">
                      <img
                        src={produto.getPrimaryImage()}
                        alt={produto.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = PRODUCT_CONSTANTS.DEFAULT_IMAGE;
                        }}
                      />
                    </div>
                    
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-gray-900 text-lx leading-tight">
                          {produto.name}
                        </h3>
                      </div>
                      
                      <p className="text-lg font-bold text-green-600 mb-2">
                        {produto.getFormattedPrice()}
                      </p>
                      
                      {produto.category && (
                        <p className="text-xs text-gray-500 mb-2">{produto.category}</p>
                      )}
                      
                      <p className="text-xs text-gray-600 mb-3">
                        Estoque: {produto.stock} unidades
                      </p>

                      {/* <div className='border-t border-gray-600 my-4'></div>

                      {produto.description && (
                        <p className="text-xs text-gray-500 mb-2">{produto.description}</p>
                      )} */}

                      <div className="flex gap-2">
                        <button
                          onClick={() => router.push(`/edicao-produto?id=${produto.id}`)}
                          className="flex-1 bg-blue-50 text-blue-600 px-3 py-2 rounded text-xs font-medium hover:bg-blue-100 transition-colors"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDelete(produto.id)}
                          className="flex-1 bg-red-50 text-red-600 px-3 py-2 rounded text-xs font-medium hover:bg-red-100 transition-colors"
                        >
                          Remover
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-white border-t py-6 text-center text-gray-600 text-sm mt-12">
        © 2025 Boa Saúde - Todos os direitos reservados.
      </footer>
    </div>
  );
}