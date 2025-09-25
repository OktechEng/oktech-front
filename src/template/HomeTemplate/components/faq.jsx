'use client'

import { useState } from "react";

export default function TelaFaq() {
const scrollToSection = (id) => {
  const el = document.getElementById(id);
  if (!el) return;

  // Ajuste individual para cada seção
  let yOffset = 0;
  if (id === "ajuda") yOffset = -50; // Ajuste para a seção de ajuda
  if (id === "sobre-nos") yOffset = -100; // Ajuste para a seção sobre nós

  const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
  window.scrollTo({ top: y, behavior: "smooth" });
};

  const [perguntaAtiva, setPerguntaAtiva] = useState(0);

  // Conteúdos para cada pergunta (4 cards por pergunta)
  const conteudos = [
    [
      {
        titulo: "Faça um Pedido!",
        texto: "É muito fácil fazer o seu pedido, realize o seu cadastro logo, utilize o Facebook ou Google.",
        img: "https://img.icons8.com/color/128/shopping-cart.png",
        alt: "Carrinho"
      },
      {
        titulo: "Escolha os Produtos",
        texto: "Selecione frutas, verduras e legumes frescos diretamente do nosso catálogo atualizado.",
        img: "https://img.icons8.com/color/128/apple.png",
        alt: "Produtos"
      },
      {
        titulo: "Confirme o Pedido",
        texto: "Receba sua cesta de produtos frescos no conforto da sua casa, no dia e horário escolhidos.",
        img: "https://img.icons8.com/color/128/checkmark.png",
        alt: "Confirmação"
      },
      {
        titulo: "Receba em Casa",
        texto: "Receba sua cesta de produtos frescos no conforto da sua casa, no dia e horário escolhidos.",
        img: "https://img.icons8.com/color/128/delivery.png",
        alt: "Entrega"
      }
    ],
    [
      {
        titulo: "Agende a Entrega",
        texto: "Escolha a frequência de entrega que melhor se adapta à sua rotina, semanal ou quinzenal.",
        img: "https://img.icons8.com/color/128/delivery.png",
        alt: "Entrega"
      },
      {
        titulo: "Gerencie Pedidos",
        texto: "Altere datas ou produtos de pedidos futuros com facilidade, sem precisar refazer o pedido.",
        img: "https://img.icons8.com/color/128/list.png",
        alt: "Gerenciamento"
      },
      {
        titulo: "Notificações",
        texto: "Receba alertas sobre entregas, novidades e promoções exclusivas no seu e-mail ou app.",
        img: "https://img.icons8.com/color/128/bell.png",
        alt: "Notificação"
      },
      {
        titulo: "Suporte Rápido",
        texto: "Nossa equipe está disponível para tirar dúvidas e solucionar problemas rapidamente.",
        img: "https://img.icons8.com/color/128/help.png",
        alt: "Suporte"
      }
    ],
    [
      {
        titulo: "Cadastro de Produtor",
        texto: "Cadastre seus produtos e alcance novos clientes interessados em alimentos frescos e locais.",
        img: "https://img.icons8.com/color/128/ingredients.png",
        alt: "Produtos"
      },
      {
        titulo: "Perfil do Produtor",
        texto: "Mantenha suas informações atualizadas, incluindo fotos e descrições dos produtos.",
        img: "https://img.icons8.com/color/128/user.png",
        alt: "Perfil"
      },
      {
        titulo: "Controle de Estoque",
        texto: "Gerencie a quantidade disponível de cada produto de forma prática e segura.",
        img: "https://img.icons8.com/color/128/warehouse.png",
        alt: "Estoque"
      },
      {
        titulo: "Pagamentos",
        texto: "Receba pagamentos de forma segura e transparente, diretamente na sua conta.",
        img: "https://img.icons8.com/color/128/money.png",
        alt: "Pagamentos"
      }
    ],
    [
      {
        titulo: "Cálculo do Frete",
        texto: "O valor do frete é baseado na distância do endereço de entrega e no volume do pedido.",
        img: "https://img.icons8.com/color/128/truck.png",
        alt: "Frete"
      },
      {
        titulo: "Opções de Entrega",
        texto: "Escolha entre entrega rápida, para pedidos urgentes, ou econômica, para mais flexibilidade.",
        img: "https://img.icons8.com/color/128/calendar.png",
        alt: "Opções"
      },
      {
        titulo: "Taxas Extras",
        texto: "Alguns pedidos podem incluir taxas, como embalagens especiais ou regiões distantes.",
        img: "https://img.icons8.com/color/128/price-tag.png",
        alt: "Taxas"
      },
      {
        titulo: "Cancelar Pedido",
        texto: "É possível cancelar ou reagendar pedidos com antecedência sem custos adicionais.",
        img: "https://img.icons8.com/color/128/cancel.png",
        alt: "Cancelamento"
      }
    ]
  ];

  return (
    <div className="max-w-7xl mx-auto bg-[#FFF9EA] rounded-2xl border border-orange-200 shadow-lg p-12 mb-26 mt-8">
      {/* Título */}
      <h1 className="text-4xl font-bold text-center mb-10">
        Saiba mais sobre nós!
      </h1>

      {/* Abas externas */}
      <div className="flex justify-center space-x-10 text-lg font-semibold mb-10">
        <button
          onClick={() => scrollToSection("perguntas")}
          className="border-b-4 border-orange-400 pb-2 text-orange-500"
        >
          Perguntas Frequentes
        </button>

        <button
          onClick={() => scrollToSection("sobre-nos")}
          className="hover:text-orange-500 transition-colors"
        >
          Quem somos?
        </button>

        <button
          onClick={() => scrollToSection("footer")} // agora vai rolar para o footer
          className="hover:text-orange-500 transition-colors"
        >
          Ajuda &amp; Suporte
        </button>
      </div>

      {/* Bloco FAQ */}
      <div className="bg-[#FFF9EA] rounded-2xl border border-orange-200 p-10 flex flex-col md:flex-row items-center md:items-start justify-start gap-10">
        {/* Coluna de perguntas */}
        <div className="flex flex-col space-y-6 text-xl min-w-[250px] justify-center">
          {["Como faço um pedido?", "Como agendar entregas recorrentes?", "Sou produtor, como me cadastro?", "Como funciona o cálculo do frete?"].map((pergunta, index) => (
            <p
              key={index}
              className={`cursor-pointer transition px-6 py-3 rounded-full text-center ${perguntaAtiva === index ? "bg-orange-400 text-black font-bold" : "hover:bg-orange-100"
                }`}
              onClick={() => setPerguntaAtiva(index)}
            >
              {pergunta}
            </p>
          ))}
        </div>

        {/* Grid de 4 cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8 flex-1">
          {conteudos[perguntaAtiva].map((card, i) => (
            <div key={i} className="bg-orange-100 rounded-2xl py-5 px-6 hover:scale-105 transition-transform shadow flex flex-col items-center">
              <h3 className="font-bold text-2xl mb-2 text-center">{card.titulo}</h3>
              <img src={card.img} alt={card.alt} className="mx-auto mb-4 mt-2 w-24 h-24" />
              <p className="text-lg text-center">{card.texto}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Texto Final */}
      <p className="text-center text-lg text-gray-700 mt-12 max-w-3xl mx-auto leading-relaxed">
        Nós do <span className="font-semibold">Boa Saúde</span> simplificamos o
        processo de compra de hortifruti. Navegue pelo nosso catálogo de
        produtos frescos, escolha seus itens preferidos e agende a entrega com
        facilidade.
      </p>
    </div>
  );
}