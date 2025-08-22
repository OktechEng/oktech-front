'use client'

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useCadastroLoja } from "./hook/useCadastroLoja";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CadastroTemplate() {
  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting,
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
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <h1 className="text-2xl font-bold text-center my-6">Cadastro de Loja</h1>
      <div className="flex justify-center">
        <hr className="border-4 rounded-3xl w-1/6 border-orange-400" />
      </div>
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Nome */}
          <div>
            <Label htmlFor="name">Nome da Loja</Label>
            <Input placeholder="Nome" id="name" type="text" {...register("name")} />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          {/* Descrição - Textarea com contador */}
          <div>
            <Label htmlFor="description">Descrição da loja</Label>
            <Textarea 
              placeholder="Descrição da loja" 
              id="description" 
              {...register("description")}
              className="min-h-20"
              maxLength={512}
              showCounter={true}
            />
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
      </div>
    </div>
  );
}
