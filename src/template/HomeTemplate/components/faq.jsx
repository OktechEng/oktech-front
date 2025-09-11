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
        texto: "Faça seu pedido logo após o cadastro. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        img: "https://img.icons8.com/color/128/shopping-cart.png",
        alt: "Carrinho"
      },
      {
        titulo: "Escolha os Produtos",
        texto: "Selecione os itens frescos de sua preferência. Lorem ipsum dolor sit amet.",
        img: "https://img.icons8.com/color/128/apple.png",
        alt: "Produtos"
      },
      {
        titulo: "Confirme o Pedido",
        texto: "Verifique as informações antes de finalizar. Lorem ipsum dolor sit amet.",
        img: "https://img.icons8.com/color/128/checkmark.png",
        alt: "Confirmação"
      },
      {
        titulo: "Receba em Casa",
        texto: "Entregue com rapidez e qualidade. Lorem ipsum dolor sit amet.",
        img: "https://img.icons8.com/color/128/delivery.png",
        alt: "Entrega"
      }
    ],
    [
      {
        titulo: "Agende a Entrega",
        texto: "Escolha a data e frequência da entrega. Lorem ipsum dolor sit amet.",
        img: "https://img.icons8.com/color/128/delivery.png",
        alt: "Entrega"
      },
      {
        titulo: "Gerencie Pedidos",
        texto: "Visualize e altere seus pedidos facilmente. Lorem ipsum dolor sit amet.",
        img: "https://img.icons8.com/color/128/list.png",
        alt: "Gerenciamento"
      },
      {
        titulo: "Notificações",
        texto: "Receba alertas sobre entregas e promoções. Lorem ipsum dolor sit amet.",
        img: "https://img.icons8.com/color/128/bell.png",
        alt: "Notificação"
      },
      {
        titulo: "Suporte Rápido",
        texto: "Entre em contato em caso de dúvidas. Lorem ipsum dolor sit amet.",
        img: "https://img.icons8.com/color/128/help.png",
        alt: "Suporte"
      }
    ],
    [
      {
        titulo: "Cadastro de Produtor",
        texto: "Cadastre seus produtos e alcance novos clientes. Lorem ipsum dolor sit amet.",
        img: "https://img.icons8.com/color/128/ingredients.png",
        alt: "Produtos"
      },
      {
        titulo: "Perfil do Produtor",
        texto: "Atualize suas informações e fotos de produtos. Lorem ipsum dolor sit amet.",
        img: "https://img.icons8.com/color/128/user.png",
        alt: "Perfil"
      },
      {
        titulo: "Controle de Estoque",
        texto: "Gerencie quantidades disponíveis. Lorem ipsum dolor sit amet.",
        img: "https://img.icons8.com/color/128/warehouse.png",
        alt: "Estoque"
      },
      {
        titulo: "Pagamentos",
        texto: "Receba pagamentos com segurança. Lorem ipsum dolor sit amet.",
        img: "https://img.icons8.com/color/128/money.png",
        alt: "Pagamentos"
      }
    ],
    [
      {
        titulo: "Cálculo do Frete",
        texto: "O frete é calculado com base na distância e quantidade. Lorem ipsum dolor sit amet.",
        img: "https://img.icons8.com/color/128/truck.png",
        alt: "Frete"
      },
      {
        titulo: "Opções de Entrega",
        texto: "Escolha entre entrega rápida ou econômica. Lorem ipsum dolor sit amet.",
        img: "https://img.icons8.com/color/128/calendar.png",
        alt: "Opções"
      },
      {
        titulo: "Taxas Extras",
        texto: "Entenda possíveis cobranças adicionais. Lorem ipsum dolor sit amet.",
        img: "https://img.icons8.com/color/128/price-tag.png",
        alt: "Taxas"
      },
      {
        titulo: "Política de Cancelamento",
        texto: "Saiba como cancelar ou reagendar. Lorem ipsum dolor sit amet.",
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
        processo de compra de hortifrúti. Navegue pelo nosso catálogo de
        produtos frescos, escolha seus itens preferidos e agende a entrega com
        facilidade.
      </p>
    </div>
  );
}