import { z } from "zod";

const cadastroLojaSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  description: z.string().min(1, "Descrição é obrigatória"),
  cnpj: z.string().min(14, "CNPJ inválido").max(18, "CNPJ inválido"),
});

export default cadastroLojaSchema;
