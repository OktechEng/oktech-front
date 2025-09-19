/**
 * Schema para o modelo de Produto
 * Baseado nas rotas da API disponíveis
 */

export const ProductSchema = {
  id: {
    type: 'string',
    required: true,
    description: 'Unique product identifier'
  },
  name: {
    type: 'string',
    required: true,
    description: 'Product name'
  },
  price: {
    type: 'number',
    required: true,
    description: 'Product price in BRL'
  },
  description: {
    type: 'string',
    required: false,
    description: 'Detailed product description'
  },
  category: {
    type: 'string',
    required: false,
    description: 'Product category'
  },
  stock: {
    type: 'number',
    required: false,
    description: 'Quantity in stock'
  },
  active: {
    type: 'boolean',
    required: false,
    default: true,
    description: 'Product status (active/inactive)'
  },
  images: {
    type: 'array',
    required: false,
    description: 'Array of product image URLs'
  },
  shopId: {
    type: 'string',
    required: true,
    description: 'ID of the shop the product belongs to'
  },
  createdAt: {
    type: 'string',
    required: false,
    description: 'Product creation date (ISO string)'
  },
  updatedAt: {
    type: 'string',
    required: false,
    description: 'Product last update date (ISO string)'
  }
};

/**
 * Classe modelo para Produto
 */
export class Product {
  constructor(data = {}) {
    this.id = data.id || null;
    this.name = data.name || '';
    this.price = data.price || 0;
    this.description = data.description || '';
    this.category = data.category || '';
    this.stock = data.stock || 0;
    this.active = data.active !== undefined ? data.active : true;
    this.images = data.images || [];
    this.shopId = data.shopId || '';
    this.createdAt = data.createdAt || new Date().toISOString();
    this.updatedAt = data.updatedAt || new Date().toISOString();
  }

  /**
   * Valida se o produto possui os campos obrigatórios
   * @returns {Object} { isValid: boolean, errors: string[] }
   */
  validate() {
    const errors = [];

    if (!this.name || this.name.trim() === "") {
      errors.push("Name is required");
    }

    if (!this.price || this.price <= 0) {
      errors.push("Price must be greater than zero");
    }

    if (!this.shopId || this.shopId.trim() === "") {
      errors.push("Shop ID is required");
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
      name: this.name,
      description: this.description,
      category: this.category,
      stock: this.stock,
      price: this.price
    };
  }

  /**
   * Formata o preço para exibição
   * @returns {string} Preço formatado em reais
   */
  getFormattedPrice() {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL"
    }).format(this.price);
  }

  /**
   * Obtém a primeira imagem do produto ou uma imagem padrão
   * @returns {string} URL da imagem
   */
  getPrimaryImage() {
    return this.images && this.images.length > 0 
      ? this.images[0] 
      : '/img/produto-default.png';
  }

  /**
   * Verifica se o produto está em estoque
   * @returns {boolean} True se há estoque disponível
   */
  isInStock() {
    return this.stock > 0;
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

