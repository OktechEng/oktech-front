// src/template/MeusProdutos/MeusProdutosTemplate.jsx

import React from "react";

const produtos = [
  { id: 1, nome: "Banana da Prata", preco: "R$ 6,00", imagem: "/img/banana.png" },
  { id: 2, nome: "Morango", preco: "R$ 8,00", imagem: "/img/morango.png" },
  { id: 3, nome: "Laranja", preco: "R$ 5,00", imagem: "/img/laranja.png" },
  { id: 4, nome: "Melancia", preco: "R$ 10,00", imagem: "/img/melancia.png" },
  { id: 5, nome: "Tomate", preco: "R$ 4,50", imagem: "/img/tomate.png" },
  { id: 6, nome: "Melão", preco: "R$ 9,00", imagem: "/img/melao.png" },
  { id: 7, nome: "Mamão", preco: "R$ 7,50", imagem: "/img/mamao.png" },
  { id: 8, nome: "Pêra", preco: "R$ 6,50", imagem: "/img/pera.png" },
];

export default function MeusProdutosTemplate() {
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-green-100 px-6 py-4 flex justify-between items-center border-b">
        <h1 className="text-2xl font-bold text-green-800">Meus Produtos</h1>
        <input
          type="text"
          placeholder="Pesquisar produto..."
          className="px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </header>
      <main className="p-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {produtos.map((produto) => (
          <div
            key={produto.id}
            className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden flex flex-col items-center text-center border"
          >
            <img
              src={produto.imagem}
              alt={produto.nome}
              className="h-32 object-contain mt-4"
            />
            <div className="p-4 flex-1 flex flex-col justify-between">
              <h2 className="text-lg font-semibold text-green-800">{produto.nome}</h2>
              <p className="text-sm text-gray-600">{produto.preco}</p>
              <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">
                Ver detalhes
              </button>
            </div>
          </div>
        ))}
      </main>

      <footer className="bg-green-100 py-4 text-center text-green-800 text-sm border-t">
        © 2025 Boa Saúde - Todos os direitos reservados.
      </footer>
    </div>
  );
}
