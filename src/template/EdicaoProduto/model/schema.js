import { z } from "zod";

/**
 * Classe modelo para Produto, focada nos dados para criação e atualização.
 */
export class Product {
  // O construtor agora só aceita os campos que podem ser editados/criados.
  // O 'id' do produto é gerenciado fora desta classe (no hook).
  constructor(data = {}) {
    this.name = data.name || '';
    this.price = data.price || 0;
    this.description = data.description || '';
    this.category = data.category || '';
    this.stock = data.stock || 0;
    this.shopId = data.shopId || ''; // Essencial para a API
  }

  /**
   * Valida os campos obrigatórios para a API.
   * @returns {{isValid: boolean, errors: string[]}}
   */
  validate() {
    const errors = [];

    if (!this.name || this.name.trim() === "") {
      errors.push("O nome do produto é obrigatório.");
    }
    if (!this.price || this.price <= 0) {
      errors.push("O preço deve ser um número maior que zero.");
    }
    if (!this.category || this.category.trim() === "") {
      errors.push("A categoria é obrigatória.");
    }
    if (!this.shopId) {
      errors.push("O ID da loja (shopId) é obrigatório.");
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Converte o objeto para o formato exato esperado pela API no corpo da requisição.
   * @returns {Object} Objeto formatado para a API.
   */
  toApiFormat() {
    return {
      name: this.name,
      description: this.description,
      category: this.category,
      stock: this.stock,
      price: this.price,
      shopId: this.shopId,
    };
  }
}

/**
 * Constantes e Schema de Validação para o formulário (react-hook-form).
 */
export const PRODUCT_CONSTANTS = {
  // Schema Zod para validação do formulário no front-end.
  PRODUCT_FORM_SCHEMA: z.object({
    name: z.string().min(1, "O nome do produto é obrigatório."),
    description: z.string().optional(),
    category: z.string().min(1, "A categoria é obrigatória."),
    stock: z.number({ invalid_type_error: "O estoque deve ser um número." })
      .int("O estoque deve ser um número inteiro.")
      .min(0, "O estoque não pode ser negativo.")
      .optional(),
    price: z.number({ required_error: "O preço é obrigatório.", invalid_type_error: "O preço deve ser um número." })
      .min(0.01, "O preço deve ser maior que zero."),
  }),
};
