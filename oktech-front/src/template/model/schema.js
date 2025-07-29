import { z } from "zod";

/**
 * Esquema de validação para o login de usuário.
 * 
 * Campos:
 * - email: string obrigatória, deve ser um e-mail válido.
 *   Mensagem de erro: "E-mail inválido"
 * - password: string obrigatória, mínimo de 6 caracteres.
 *   Mensagem de erro: "A senha deve ter pelo menos 6 caracteres"
 */
const loginSchema = z.object({
    email: z.string().email("E-mail inválido"),
    password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

export default loginSchema;
