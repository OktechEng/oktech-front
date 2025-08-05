import { z } from "zod";

const cadastroSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.email("E-mail inválido"),
  confirmEmail: z.email("Confirmação de e-mail inválida"),
  cpf: z.string().min(11, "CPF inválido"),
  phone: z
    .string()
    .min(8, "Telefone inválido")
    .regex(/^\d+$/, "O telefone deve conter apenas números"),  
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
  confirmPassword: z.string().min(6, "Confirmação da senha obrigatória"),
}).refine((data) => data.email === data.confirmEmail, {
  message: "Os e-mails não coincidem",
  path: ["confirmEmail"],
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
});

export default cadastroSchema;
