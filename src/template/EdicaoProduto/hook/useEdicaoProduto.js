
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useProdutos } from '../../MeusProdutos/hook/useProdutos.js';
import { Product } from '../model/schema';
import api from '../../../services/api.js';

export const useEdicaoProduto = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get('id');

  const { buscarProdutoPorId, atualizarProduto, loading, error, setError } = useProdutos();

  const [productData, setProductData] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  

  useEffect(() => {
    if (productId) {
      const fetchProduct = async () => {
        setFormLoading(true);
        try {
          const fetchedProduct = await buscarProdutoPorId(productId);
          if (fetchedProduct) {
            setProductData(fetchedProduct);
          } else {
            setError('Produto não encontrado.');
            router.push('/meus-produtos'); // Redireciona se o produto não for encontrado
          }
        } catch (err) {
          setError('Erro ao carregar produto para edição: ' + err.message);
          router.push('/meus-produtos');
        } finally {
          setFormLoading(false);
        }
      };
      fetchProduct();
    } else {
      setProductData(null); // Limpa os dados do produto se não houver ID
    }
  }, [productId, buscarProdutoPorId, router, setError]);

  const handleUpdateProduct = async (data) => {

    setFormLoading(true);
    setSuccessMessage('');
    setError(null);

    try {
      const shopResponse = await api.get('/v1/shops');
      const shopId = shopResponse.data.id;
      console.log("Shop ID obtido:", shopId);

      if (!shopId) {
        throw new Error("ID da loja não encontrado. Verifique se você está logado.");
      }

      // 2. Criar a instância do produto com todos os dados necessários
      const productToUpdate = new Product({
        id: productId,
        ...data,
        shopId: shopId, // Passando o shopId para o construtor
      });

      // 3. Validar o objeto. Agora a validação do shopId deve passar.
      const validation = productToUpdate.validate();
      if (!validation.isValid) {
        // Este throw não deve mais acontecer pelo motivo de 'Shop ID is required'
        throw new Error(validation.errors.join(', '));
      }

      // 4. Chamar a função de atualização com os argumentos corretos
      // A função 'atualizarProduto' deve receber o ID e o corpo da requisição.
      // O corpo já é gerado pelo toApiFormat(), que agora inclui o shopId.
      await atualizarProduto(productId, productToUpdate.toApiFormat()); // <-- CORREÇÃO: Removido o terceiro argumento

      setSuccessMessage('Produto atualizado com sucesso!');
      // Opcional: redirecionar ou limpar formulário após sucesso
      // router.push('/meus-produtos');
    } catch (err) {
      // --- LÓGICA DE TRATAMENTO DE ERRO MELHORADA ---

      // 1. Verifique se a resposta de erro do servidor existe
      if (err.response && err.response.data) {
        // 2. Extraia a mensagem de erro específica do back-end.
        // A propriedade pode ser 'message', 'error', 'detail', etc. Ajuste conforme sua API.
        const backendMessage = err.response.data.message || err.response.data.error;

        // 3. Se encontrou uma mensagem, use-a. Senão, use a mensagem genérica.
        const errorMessage = backendMessage || JSON.stringify(err.response.data);
        setError(`Erro ao atualizar: ${errorMessage}`);

      } else {
        // 4. Se não houver 'err.response', foi um erro de rede ou de validação local.
        // Use a mensagem de erro padrão do 'err' objeto.
        setError('Erro ao atualizar produto: ' + (err.message || 'Erro desconhecido. Verifique sua conexão.'));
      }
      // --- FIM DA LÓGICA MELHORADA ---

    } finally {
      setFormLoading(false);
    }
  };

  return {
    productId,
    productData,
    loading: loading || formLoading,
    error,
    successMessage,
    setSuccessMessage,
    setError,
    handleUpdateProduct
  };
};


