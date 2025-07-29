'use client' // <- Adicione esta linha no topo para a maquina interpretar como client side

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLogin } from "./hook/useLogin"; // Importa o hook customizado

export function LoginTemplate() {
    // Usa o hook customizado para obter tudo que precisa do formulário
    const { register, handleSubmit, errors, isSubmitting, onSubmit } = useLogin();

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
                <h1 className="mb-6 text-center text-2xl font-bold">Login</h1>
                {/* handleSubmit faz a validação automática antes de chamar onSubmit */}
                <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <Label htmlFor="email">E-mail</Label>
                        <Input
                            type="email"
                            id="email"
                            {...register("email")}
                            required
                            className="mt-1"
                        />
                        {errors.email && (
                            <span className="text-red-500 text-sm">{errors.email.message}</span>
                        )}
                    </div>
                    <div>
                        <Label htmlFor="password">Senha</Label>
                        <Input
                            type="password"
                            id="password"
                            {...register("password")}
                            required
                            className="mt-1"
                        />
                        {errors.password && (
                            <span className="text-red-500 text-sm">{errors.password.message}</span>
                        )}
                    </div>
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? "Entrando..." : "Login"}
                    </Button>
                </form>
            </div>
        </div>
    );
}