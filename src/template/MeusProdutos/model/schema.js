/**
 * Schema para o modelo de Produto
 * Baseado nas rotas da API disponíveis
 */

export const ProductSchema = {
  id: {
    type: 'string',
    required: true,
    description: 'Identificador único do produto'
  },
  nome: {
    type: 'string',
    required: true,
    description: 'Nome do produto'
  },
  preco: {
    type: 'number',
    required: true,
    description: 'Preço do produto em reais'
  },
  descricao: {
    type: 'string',
    required: false,
    description: 'Descrição detalhada do produto'
  },
  categoria: {
    type: 'string',
    required: false,
    description: 'Categoria do produto'
  },
  estoque: {
    type: 'number',
    required: false,
    description: 'Quantidade em estoque'
  },
  ativo: {
    type: 'boolean',
    required: false,
    default: true,
    description: 'Status do produto (ativo/inativo)'
  },
  imagens: {
    type: 'array',
    required: false,
    description: 'Array de URLs das imagens do produto'
  },
  shopId: {
    type: 'string',
    required: true,
    description: 'ID da loja à qual o produto pertence'
  },
  dataCriacao: {
    type: 'string',
    required: false,
    description: 'Data de criação do produto (ISO string)'
  },
  dataAtualizacao: {
    type: 'string',
    required: false,
    description: 'Data da última atualização do produto (ISO string)'
  }
};

/**
 * Classe modelo para Produto
 */
export class Product {
  constructor(data = {}) {
    this.id = data.id || null;
    this.nome = data.nome || '';
    this.preco = data.preco || 0;
    this.descricao = data.descricao || '';
    this.categoria = data.categoria || '';
    this.estoque = data.estoque || 0;
    this.ativo = data.ativo !== undefined ? data.ativo : true;
    this.imagens = data.imagens || [];
    this.shopId = data.shopId || '';
    this.dataCriacao = data.dataCriacao || new Date().toISOString();
    this.dataAtualizacao = data.dataAtualizacao || new Date().toISOString();
  }

  /**
   * Valida se o produto possui os campos obrigatórios
   * @returns {Object} { isValid: boolean, errors: string[] }
   */
  validate() {
    const errors = [];

    if (!this.nome || this.nome.trim() === '') {
      errors.push('Nome é obrigatório');
    }

    if (!this.preco || this.preco <= 0) {
      errors.push('Preço deve ser maior que zero');
    }

    if (!this.shopId || this.shopId.trim() === '') {
      errors.push('ID da loja é obrigatório');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Converte o produto para o formato esperado pela API
   * @returns {Object} Objeto formatado para envio à API
   */
  toApiFormat() {
    return {
      id: this.id,
      nome: this.nome,
      preco: this.preco,
      descricao: this.descricao,
      categoria: this.categoria,
      estoque: this.estoque,
      ativo: this.ativo,
      shopId: this.shopId,
      dataCriacao: this.dataCriacao,
      dataAtualizacao: new Date().toISOString()
    };
  }

  /**
   * Formata o preço para exibição
   * @returns {string} Preço formatado em reais
   */
  getFormattedPrice() {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(this.preco);
  }

  /**
   * Obtém a primeira imagem do produto ou uma imagem padrão
   * @returns {string} URL da imagem
   */
  getPrimaryImage() {
    return this.imagens && this.imagens.length > 0 
      ? this.imagens[0] 
      : '/img/produto-default.png';
  }

  /**
   * Verifica se o produto está em estoque
   * @returns {boolean} True se há estoque disponível
   */
  isInStock() {
    return this.estoque > 0;
  }

  /**
   * Cria uma instância de Product a partir de dados da API
   * @param {Object} apiData Dados recebidos da API
   * @returns {Product} Nova instância de Product
   */
  static fromApiData(apiData) {
    return new Product(apiData);
  }
}

/**
 * Constantes relacionadas aos produtos
 */
export const PRODUCT_CONSTANTS = {
  DEFAULT_IMAGE: '/img/produto-default.png',
  CATEGORIES: [
    'Frutas',
    'Verduras',
    'Legumes',
    'Grãos',
    'Laticínios',
    'Carnes',
    'Bebidas',
    'Outros'
  ],
  STATUS: {
    ATIVO: true,
    INATIVO: false
  }
};

