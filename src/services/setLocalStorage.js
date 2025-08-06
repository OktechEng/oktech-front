import api from "@/services/api";

/**
 * Busca dados da API e salva TODO o response no localStorage
 * @param {string} url - URL da API para o GET
 * @param {string} storageKey - chave onde os dados serão armazenados no localStorage
 */
export async function fetchAndStoreUserData(url, storageKey = "userData") {
  try {
    console.log('✅ Buscando dados do usuário da API:', url);
    const response = await api.get(url);
    const data = response.data;

    console.log("✅ Dados recebidos da API:", data);
    localStorage.setItem(storageKey, JSON.stringify(data));
    return data;
  } catch (error) {
    if (error.response) {
      console.error("❌ Erro na resposta da API:", error.response.data);
    } else if (error.request) {
      console.error("❌ Sem resposta da API. Verifique a conexão ou se o servidor está online.");
    } else {
      console.error("❌ Erro inesperado ao fazer a requisição:", error.message);
    }
    throw error;
  }
}
