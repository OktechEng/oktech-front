export default function TelaFaq() {
  return (
    <div className="max-w-7xl mx-auto bg-[#FFF9EA] rounded-2xl border border-orange-200 shadow-lg p-12 mb-26 mt-8">
      {/* Título */}
      <h1 className="text-4xl font-bold text-center mb-10">
        Saiba mais sobre nós!
      </h1>

      {/* Abas */}
      <div className="flex justify-center space-x-10 text-lg font-semibold mb-10">
        <button className="border-b-4 border-orange-400 pb-2 text-orange-500">
          Perguntas Frequentes
        </button>
        <button className="hover:text-orange-500 transition-colors">
          Quem somos?
        </button>
        <button className="hover:text-orange-500 transition-colors">
          Ajuda &amp; Suporte
        </button>
      </div>

      {/* Bloco com perguntas + cards */}
      <div className="bg-[#FFF9EA] rounded-2xl border border-orange-200 p-15 flex flex-col md:flex-row items-center justify-center gap-16">
        {/* Coluna de perguntas */}
        <div className="flex flex-col space-y-6 text-xl max-w-[280px]">
          <button className="bg-orange-400 text-black px-8 py-4 rounded-full font-bold text-xl shadow hover:bg-orange-500 transition text-center">
            Como faço um pedido?
          </button>
          <p className="hover:text-black-500 cursor-pointer transition text-center">
            Como agendar entregas recorrentes?
          </p>
          <p className="hover:text-black-500 cursor-pointer transition text-center">
            Sou produtor, como me cadastro?
          </p>
          <p className="hover:text-black-500 cursor-pointer transition text-center">
            Como funciona o cálculo do frete?
          </p>
        </div>

        {/* Grid de cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 text-center max-w-3xl">
          <div className="bg-orange-100 rounded-2xl py-5 px-1 w-[260px] hover:scale-105 transition-transform shadow">
            <h3 className="font-bold text-2xl">Faça um<br /> Pedido!</h3>
            <img
              src="https://img.icons8.com/color/128/shopping-cart.png"
              alt="Carrinho"
              className="mx-auto mb-4 mt-2"
            />
            
            <p className="text-lg mt-2">
              Faça seu pedido logo após o cadastro.
            </p>
          </div>

          <div className="bg-orange-100 rounded-2xl py-5 px-1 w-[260px] hover:scale-105 transition-transform shadow">
            <h3 className="font-bold text-2xl">Agende a Entrega</h3>
            <img
              src="https://img.icons8.com/color/128/delivery.png"
              alt="Entrega"
              className="mx-auto mb-4 mt-2" 
            />
            
            <p className="text-lg mt-2">Agende a data e a frequência.</p>
          </div>

          <div className="bg-orange-100 rounded-2xl py-5 px-1 w-[260px] hover:scale-105 transition-transform shadow">
            <h3 className="font-bold text-2xl">Receba os Produtos!</h3>
            <img
              src="https://img.icons8.com/color/128/ingredients.png"
              alt="Produtos"
              className="mx-auto mb-4 mt-2"
            /> 
            <p className="text-lg mt-3">
              Entregue com rapidez e qualidade.
            </p>
          </div>
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