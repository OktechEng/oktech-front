'use client'

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useCadastroLoja } from "./hook/useCadastroLoja";

export default function CadastroTemplate() {
  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting,
    cadastroError,
    cadastroSuccess,
    authError,
    isLoading,
    isAuthenticated,
    router,
    handleCnpjChange,
  } = useCadastroLoja();

  // Mostrar loading enquanto verifica autenticação
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-400 mx-auto"></div>
          <p className="mt-4 text-gray-600">Verificando autenticação...</p>
        </div>
      </div>
    );
  }

  // Se não estiver autenticado, mostrar apenas a mensagem de erro
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg">{authError}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4">
      <h1 className="text-2xl font-bold text-center my-6">Cadastro de Loja</h1>
      <div className="flex justify-center">
        <hr className="border-8 rounded-3xl w-2/6 border-orange-400" />
      </div>
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {cadastroError && <p className="text-red-600 text-sm">{cadastroError}</p>}
          {cadastroSuccess && <p className="text-green-600 text-sm">{cadastroSuccess}</p>}

          {/* Nome */}
          <div>
            <Label htmlFor="name">Nome</Label>
            <Input placeholder="Nome" id="name" type="text" {...register("name")} />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          {/* Descrição */}
          <div>
            <Label htmlFor="description">Descrição</Label>
            <Input placeholder="Descrição" id="description" type="text" {...register("description")} />
            {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
          </div>

          {/* CNPJ */}
          <div>
            <Label htmlFor="cnpj">CNPJ</Label>
            <Input 
              placeholder="00.000.000/0000-00" 
              id="cnpj" 
              type="text" 
              {...register("cnpj")} 
              onChange={handleCnpjChange}
              maxLength={18} 
            />
            {errors.cnpj && <p className="text-red-500 text-sm">{errors.cnpj.message}</p>}
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full bg-green-500 hover:bg-green-400">
            {isSubmitting ? "Cadastrando loja..." : "Cadastrar Loja"}
          </Button>
        </form>
        <p className="text-center text-sm mt-4">
          Já tem uma conta?{" "}
          <a onClick={() => router.push("/login")} className="text-blue-500 hover:underline cursor-pointer">Faça login</a>
        </p>
      </div>
    </div>
  );
}
