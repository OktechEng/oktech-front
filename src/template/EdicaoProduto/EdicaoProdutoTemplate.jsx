
'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PRODUCT_CONSTANTS } from './model/schema';
import { useEdicaoProduto } from './hook/useEdicaoProduto';

export default function EdicaoProdutoTemplate() {
  const router = useRouter();
  const { productId, productData, loading, error, successMessage, setSuccessMessage, setError, handleUpdateProduct } = useEdicaoProduto();

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset, setValue } = useForm({
    resolver: zodResolver(PRODUCT_CONSTANTS.PRODUCT_FORM_SCHEMA),
    defaultValues: {
      name: "",
      description: "",
      category: "",
      stock: 0,
      price: 0,
    },
  });

  useEffect(() => {
    if (productData) {
      setValue('name', productData.name);
      setValue('description', productData.description);
      setValue('category', productData.category);
      setValue('stock', productData.stock);
      setValue('price', productData.price);
    } else if (!productId && !loading) {
      // Se não há productId e não está carregando, é um novo cadastro, reseta o formulário
      reset();
    }
  }, [productData, productId, loading, reset, setValue]);

  const onSubmit = async (data) => {
    await handleUpdateProduct(data);
  };

    return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-green-800">
              {productId ? 'Editar Produto' : 'Cadastrar Produto'}
            </h1>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Mensagens de erro/sucesso */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex justify-between items-center">
            <span>{error}</span>
            <button onClick={() => setError(null)} className="text-red-500 hover:text-red-700">
              ✕
            </button>
          </div>
        )}
        {successMessage && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6 flex justify-between items-center">
            <span>{successMessage}</span>
            <button onClick={() => setSuccessMessage('')} className="text-green-500 hover:text-green-700">
              ✕
            </button>
          </div>
        )}

        {/* Formulário de Edição */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            {productId ? 'Detalhes do Produto' : 'Cadastrar Novo Produto'}
          </h2>
          
          {loading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
              <p className="mt-2 text-gray-600">Carregando produto...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome do Produto *
                </label>
                <input
                  type="text"
                  required
                  {...register('name')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preço (R$) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  required
                  {...register('price', { valueAsNumber: true })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Categoria *
                </label>
                <input
                  type="text"
                  required
                  {...register('category')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Estoque
                </label>
                <input
                  type="number"
                  min="0"
                  {...register('stock', { valueAsNumber: true })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                {errors.stock && <p className="text-red-500 text-xs mt-1">{errors.stock.message}</p>}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descrição
                </label>
                <textarea
                  rows="3"
                  {...register('description')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
              </div>

              {/* Campo de imagem - pode ser mais complexo para upload/exibição */}
              {/* <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Imagem do Produto
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => { /* Lógica de upload de imagem }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div> */}

              {/* <div className="flex items-center">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    {...register('active')}
                    className="mr-2"
                  />
                  <span className="text-sm font-medium text-gray-700">Produto ativo</span>
                </label>
              </div> */}

              <div className="md:col-span-2 flex gap-4">
                <button
                  type="submit"
                  disabled={isSubmitting || loading}
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium disabled:opacity-50"
                >
                  {isSubmitting ? 'Salvando...' : (productId ? 'Atualizar Produto' : 'Cadastrar Produto')}
                </button>
                <button
                  type="button"
                  onClick={() => router.push('/meusProdutos')}
                  className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors font-medium"
                >
                  Cancelar
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      <footer className="bg-white border-t py-6 text-center text-gray-600 text-sm mt-12">
        © 2025 Boa Saúde - Todos os direitos reservados.
      </footer>
    </div>
  );
}


