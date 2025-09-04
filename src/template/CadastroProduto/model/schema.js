import { z } from "zod";

const cadastroProdutoSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  description: z.string(),
  category: z.string().min(1, "Categoria é obrigatória"),
  stock: z.number().int(),
  price: z.number(),
});

export default cadastroProdutoSchema;
