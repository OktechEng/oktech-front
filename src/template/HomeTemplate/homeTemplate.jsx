'use client'

import Image from "next/image";
import { useRouter } from "next/navigation";
import ImageSlider from "@/components/ImageSlider";
import ProductCard from "@/components/ProductCard";
import CheckoutButton from "@/components/CheckoutButton";
import { useHome } from "./hook/useHome";
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card"
import SobreNosTemplate from "@/template/SobreNos/SobreNosTemplate";
import TelaFaq from "./components/faq"

export default function HomeTemplate() {
  const router = useRouter();
  const {
    scrollContainerRef,
    scrollLeft,
    scrollRight,
    products,
    loading,
    error,
  } = useHome();

  return (
    <div className="min-h-screen bg-white">
      {/* Slider Section */}
      <ImageSlider />

      {/* Categories Section */}
      {/* TODO: Criar categorias Depende do banco de dados */}

      {/* Products Section */}
      <section className="py-16 px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-orange-500 mb-4">
              Produtos
            </h2>
            <div className="w-24 h-1 bg-green-500 mx-auto"></div>
          </div>

          {/* Horizontal Scroll Container */}
          <div className="relative">
            {/* Navigation Arrows */}
            <button
              onClick={scrollLeft}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-gray-600 hover:text-green-600 p-2 rounded-full shadow-lg transition-all duration-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={scrollRight}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-gray-600 hover:text-green-600 p-2 rounded-full shadow-lg transition-all duration-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Fade Left */}
            <div className="absolute left-0 top-0 bottom-0 w-8 fade-left z-10 pointer-events-none"></div>

            {/* Fade Right */}
            <div className="absolute right-0 top-0 bottom-0 w-8 fade-right z-10 pointer-events-none"></div>

            {/* Scrollable Products */}
            <div
              ref={scrollContainerRef}
              className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide pb-4 px-4"
            >
              {loading && <p className="text-sm text-gray-500">Carregando...</p>}
              {error && <p className="text-sm text-red-600">{error}</p>}
              {!loading && !error && products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>

          {/* Ações */}
          <div className="flex items-center justify-center mt-8">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold text-md transition-all duration-300 hover:scale-105 shadow-lg" onClick={() => router.push("/produtos")} >
              Ver Todos os Produtos
            </Button>
          </div>
        </div>
      </section>

      <section id="sobre-nos">
        <SobreNosTemplate />
      </section>

      {/* Features Section */}
      <section className="py-16 px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-orange-500 mb-4">
              Por que escolher a BOA SAUDE?
            </h2>
            <div className="w-24 h-1 bg-green-500 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Image
                  src="/img/frescos.png"
                  alt="Produtos Frescos"
                  width={32}
                  height={32}
                  className="w-8 h-8"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">Produtos Frescos</h3>
              <p className="text-gray-600">Selecionamos os melhores produtos diretamente dos produtores</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Image
                  src="/img/entrega.png"
                  alt="Entrega Rápida"
                  width={32}
                  height={32}
                  className="w-8 h-8"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">Entrega Rápida</h3>
              <p className="text-gray-600">Entregamos na sua casa em até 24 horas</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Image
                  src="/img/qualidade.png"
                  alt="Qualidade Garantida"
                  width={32}
                  height={32}
                  className="w-8 h-8"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">Qualidade Garantida</h3>
              <p className="text-gray-600">Todos os produtos passam por rigoroso controle de qualidade</p>
            </div>
          </div>
        </div>
      </section>
      <section id="faq">
      <TelaFaq />
    </section>
{/* Footer */}
<footer className="bg-[#FFF9EA] text-gray-800 pt-12" id="footer">
  <div className="max-w-7xl mx-auto px-6 md:px-12">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

      {/* Logo - Movida mais para a direita */}
      <div className="flex justify-center md:justify-start">
        <div className="ml-4">
          <Image
            src="/img/logo.svg"
            alt="BOA SAUDE"
            width={200}
            height={10}
            className="h-30 w-auto"
          />
        </div>
      </div>

      {/* Newsletter - Centralizada */}
      <div className="md:col-span-2 flex justify-center">
        <div className="w-full max-w-md">
          <h3 className="font-bold text-sm mb-3 text-center md:text-left pl-4">Receba Ofertas Exclusivas</h3>
          <form className="flex items-center">
            <input
              type="email"
              placeholder="seuemail@gmail.com"
              className="w-64 px-4 py-3 rounded-l-full bg-gray-100 text-sm outline-none"
            />
            <button
              type="submit"
              className="bg-[#FC8A06] text-white px-6 py-3 rounded-r-full text-sm font-medium hover:bg-[#fca35b] transition whitespace-nowrap"
            >
              Inscreva-se
            </button>
          </form>
          <p className="text-xs text-gray-500 mt-2 text-center md:text-left pl-4">
            Leia nossa <a href="#" className="underline">política de email</a>
          </p>
          <div className="flex space-x-4 mt-4 justify-center md:justify-start">
            <a href="#" className="text-gray-600 hover:text-black">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="text-gray-600 hover:text-black">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="text-gray-600 hover:text-black">
              <i className="fab fa-tiktok"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Container para Páginas Jurídicas e Links Importantes */}
      <div className="flex justify-end">
        <div className="flex gap-11">
          {/* Páginas Jurídicas */}
          <div>
            <h3 className="font-bold text-sm mb-3">Páginas Jurídicas</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:underline">Termos e condições</a></li>
              <li><a href="#" className="hover:underline">Privacidade</a></li>
              <li><a href="#" className="hover:underline">Cookies</a></li>
            </ul>
          </div>

          {/* Links Importantes */}
          <div>
            <h3 className="font-bold text-sm mb-3">Links Importantes</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#faq" className="hover:underline">Ajuda</a></li>
              <li><a href="#faq" className="hover:underline">Seja fornecedor</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>

  {/* Rodapé inferior */}
  <div className="bg-[#FDBA74] mt-10 py-4">
    <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center text-sm text-gray-800 space-y-2 md:space-y-0">
      <p>Boa Saúde Copyright 2025</p>
      <div className="flex space-x-6">
        <a href="#" className="hover:underline">Políticas de Privacidade</a>
        <a href="#" className="hover:underline">Termos</a>
        <a href="#" className="hover:underline">Não venda ou compartilhe informações pessoais</a>
      </div>
    </div>
  </div>
</footer>
    </div>
  );
}