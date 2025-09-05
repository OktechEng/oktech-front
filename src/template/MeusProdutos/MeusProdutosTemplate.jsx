'use client';
import React, { useState } from 'react';
import { useProdutos } from './hook/useProdutos.js';
import { PRODUCT_CONSTANTS } from './model/schema.js';

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
    recarregar,
  } = useProdutos(shopId);

  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    nome: '',
    preco: '',
    descricao: '',
    categoria: '',
    estoque: '',
    ativo: true
  });
  const [imageFile, setImageFile] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  // Resetar formulário
  const resetForm = () => {
    setFormData({
      nome: '',
      preco: '',
      descricao: '',
      categoria: '',
      estoque: '',
      ativo: true
    });
    setImageFile(null);
    setEditingProduct(null);
    setShowForm(false);
  };

  // Preencher formulário para edição
  const editProduct = (produto) => {
    setFormData({
      nome: produto.nome,
      preco: produto.preco.toString(),
      descricao: produto.descricao,
      categoria: produto.categoria,
      estoque: produto.estoque.toString(),
      ativo: produto.ativo
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
        preco: parseFloat(formData.preco),
        estoque: parseInt(formData.estoque) || 0,
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
              <button
                onClick={() => setShowForm(!showForm)}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                {showForm ? 'Cancelar' : 'Novo Produto'}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Dashboard de Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
                <p className="text-sm font-medium text-gray-600">Produtos Ativos</p>
                <p className="text-3xl font-bold text-green-600">{estatisticas.ativos}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-green-600 text-xl">✅</span>
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

        {/* Formulário de Cadastro/Edição */}
        {showForm && (
          <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              {editingProduct ? 'Editar Produto' : 'Novo Produto'}
            </h2>
            
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome do Produto *
                </label>
                <input
                  type="text"
                  required
                  value={formData.nome}
                  onChange={(e) => setFormData({...formData, nome: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preço (R$) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={formData.preco}
                  onChange={(e) => setFormData({...formData, preco: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Categoria
                </label>
                <select
                  value={formData.categoria}
                  onChange={(e) => setFormData({...formData, categoria: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Selecione uma categoria</option>
                  {PRODUCT_CONSTANTS.CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Estoque
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.estoque}
                  onChange={(e) => setFormData({...formData, estoque: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descrição
                </label>
                <textarea
                  rows="3"
                  value={formData.descricao}
                  onChange={(e) => setFormData({...formData, descricao: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Imagem do Produto
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files[0])}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div className="flex items-center">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.ativo}
                    onChange={(e) => setFormData({...formData, ativo: e.target.checked})}
                    className="mr-2"
                  />
                  <span className="text-sm font-medium text-gray-700">Produto ativo</span>
                </label>
              </div>

              <div className="md:col-span-2 flex gap-4">
                <button
                  type="submit"
                  disabled={formLoading}
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium disabled:opacity-50"
                >
                  {formLoading ? 'Salvando...' : (editingProduct ? 'Atualizar' : 'Cadastrar')}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors font-medium"
                >
                  Cancelar
                </button>
              </div>
            </form>
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
                        alt={produto.nome}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = PRODUCT_CONSTANTS.DEFAULT_IMAGE;
                        }}
                      />
                    </div>
                    
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-gray-900 text-sm leading-tight">
                          {produto.nome}
                        </h3>
                        <div className="flex gap-1 ml-2">
                          {!produto.ativo && (
                            <span className="w-2 h-2 bg-red-500 rounded-full" title="Inativo"></span>
                          )}
                          {!produto.isInStock() && (
                            <span className="w-2 h-2 bg-orange-500 rounded-full" title="Sem estoque"></span>
                          )}
                        </div>
                      </div>
                      
                      <p className="text-lg font-bold text-green-600 mb-2">
                        {produto.getFormattedPrice()}
                      </p>
                      
                      {produto.categoria && (
                        <p className="text-xs text-gray-500 mb-2">{produto.categoria}</p>
                      )}
                      
                      <p className="text-xs text-gray-600 mb-3">
                        Estoque: {produto.estoque} unidades
                      </p>
                      
                      <div className="flex gap-2">
                        <button
                          onClick={() => editProduct(produto)}
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



