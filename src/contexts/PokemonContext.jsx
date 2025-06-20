
/*
// src/contexts/PokemonContext.jsx
// Este arquivo conterá o Contexto React e o Provedor (Provider) que gerenciará o estado da lista de Pokemons.
import React, { createContext, useState, useEffect, useCallback, useContext } from 'react';
import api from '../api';

// Cria o Contexto Pokemon
const PokemonContext = createContext();

// Hook personalizado para consumir o contexto Pokemon
export const usePokemonContext = () => {
  return useContext(PokemonContext);
};

// Provedor do Contexto Pokemon
export const PokemonProvider = ({ children }) => {

  // Estado para armazenar a lista de Pokemons
  const [pokemons, setPokemons] = useState([]);
  // Estado para gerenciar o offset para as chamadas da API (quantos Pokemons pular)
  const [offset, setOffset] = useState(0);
  // Estado para verificar se há mais Pokemons disponíveis
  const [hasMore, setHasMore] = useState(true);
  // Estado para gerenciar o estado de carregamento
  const [loading, setLoading] = useState(false);
  // alterado devido a perda da lista de pokemons ao voltar neste componente
  // Novo estado para armazenar o Pokémon filtrado pela busca
  const [filteredPokemon, setFilteredPokemon] = useState(null);

  // Função para buscar Pokemons da API
  const fetchPokemons = useCallback(async (currentOffset) => {
    setLoading(true);
    // try {
    //   const response = await api.get(`/pokemon?limit=10&offset=${currentOffset}`);

    try {
      const limitPokemons = JSON.parse(localStorage.getItem("limitPokemons"));
      console.log(limitPokemons+10);

      //const response = await api.get(`/pokemon?limit=10&offset=${currentOffset}`);
      let response = null
      if (currentOffset === 0) {
         response = await api.get(`/pokemon?limit=${limitPokemons+10}&offset=0`);
         console.log(`dentro do if : /pokemon?limit=${limitPokemons+10}&offset=0`)
      }else{
         response = await api.get(`/pokemon?limit=10&offset=${currentOffset}`);
         console.log(`dentro do else :/pokemon?limit=10&offset=${currentOffset}`)
      } 

      const newPokemons = response.data.results;

      // Mapeia os resultados para adicionar o ID numérico e manter as outras propriedades
      const newPokemonsWithId = newPokemons.map(pokemon => {
        const urlParts = pokemon.url.split('/');
        const id = parseInt(urlParts[urlParts.length - 2], 10);
        return {
          ...pokemon,
          id: id,
        };
      });

      setPokemons( (prevPokemons) => {
        return (
          // condition ? true : false
          currentOffset === 0 ? newPokemonsWithId :  [...prevPokemons, ...newPokemonsWithId]
        );
      });

      setHasMore(response.data.next !== null);
    } catch (error) {
      console.error('Erro ao buscar Pokemons:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // useEffect para buscar Pokémons quando o componente é montado
  useEffect(() => {
    // alterado devido a perda da lista de pokemons ao voltar neste componente
    // A lista só será carregada do zero se estiver vazia.
    // Isso garante que o estado seja mantido ao retornar de PokemonDetail.
    if (pokemons.length === 0 && !loading) {
      fetchPokemons(0);
    }
  }, [fetchPokemons, pokemons.length, loading]);

  // Função para lidar com o clique do botão "Carregar Mais"
  const handleLoadMore = () => {
    if (!loading && hasMore) {
      const nextOffset = offset + 10;
      setOffset(nextOffset); // Atualiza o offset para a próxima busca
      fetchPokemons(nextOffset); // Busca o próximo conjunto de Pokémons com o novo offset
    }
  };

  // alterado devido a perda da lista de pokemons ao voltar neste componente
  // Função para limpar a busca e mostrar a lista completa novamente
  const clearSearch = useCallback(() => {
    setFilteredPokemon(null);
  }, []);

  // O valor do contexto que será fornecido aos componentes filhos
  const contextValue = {
    pokemons,
    loading,
    hasMore,
    handleLoadMore,
    filteredPokemon, // Novo estado para o Pokémon filtrado
    setFilteredPokemon, // Nova função para definir o Pokémon filtrado
    clearSearch, // Nova função para limpar o filtro
  };

  return (
    <PokemonContext.Provider value={contextValue}>
      {children}
    </PokemonContext.Provider>
  );
};

*/


// ------ ff -------ff----------ff--------------


// src/contexts/PokemonContext.jsx
import React, { createContext, useState, useEffect, useCallback, useContext } from 'react';
import api from '../api';

const PokemonContext = createContext();

export const usePokemonContext = () => {
  return useContext(PokemonContext);
};

// --- ALTERAÇÃO 1: Definir um valor padrão para a busca inicial ---
// Isso será usado caso não haja nada salvo no localStorage.
const DEFAULT_INITIAL_LIMIT = 10;

export const PokemonProvider = ({ children }) => {
  const [pokemons, setPokemons] = useState([]);
  const [offset, setOffset] = useState(0); // O offset agora será gerenciado de forma mais centralizada
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [filteredPokemon, setFilteredPokemon] = useState(null);

  // --- ALTERAÇÃO 2: Simplificar a função `fetchPokemons` ---
  // Agora ela recebe 'limit' e 'currentOffset' como parâmetros, tornando-a mais reutilizável.
  // Ela não precisa mais saber se é uma busca inicial ou não.
  const fetchPokemons = useCallback(async (limit, currentOffset) => {
    // Não busca se já estiver carregando ou se o componente tentar buscar com um offset já carregado.
    if (loading) return;
    
    setLoading(true);
    try {
      console.log(`Buscando da API: /pokemon?limit=${limit}&offset=${currentOffset}`);
      const response = await api.get(`/pokemon?limit=${limit}&offset=${currentOffset}`);
      const newPokemons = response.data.results;

      const newPokemonsWithId = newPokemons.map(pokemon => {
        const urlParts = pokemon.url.split('/');
        const id = parseInt(urlParts[urlParts.length - 2], 10);
        return { ...pokemon, id };
      });

      // A lógica para adicionar ou substituir pokémons é mantida.
      // Se o offset for 0, é uma nova lista. Caso contrário, adiciona ao final.
      setPokemons((prevPokemons) => {
        return currentOffset === 0 ? newPokemonsWithId : [...prevPokemons, ...newPokemonsWithId];
      });

      setHasMore(response.data.next !== null);
    } catch (error) {
      console.error('Erro ao buscar Pokemons:', error);
    } finally {
      setLoading(false);
    }
  }, [loading]); // A dependência agora é apenas `loading` para evitar re-criações desnecessárias.

  // --- ALTERAÇÃO 3: Efeito para a busca INICIAL e ÚNICA ---
  // Este useEffect roda apenas UMA VEZ quando o Provider é montado.
  useEffect(() => {
    // Só executa a lógica se a lista de pokémons estiver vazia.
    // Isso preserva o estado ao navegar entre páginas (sem recarregar).
    if (pokemons.length === 0) {
      // Tenta pegar o tamanho salvo do localStorage.
      // Usando 'pokemonListLength' para corresponder ao que salvamos em Home.jsx
      const savedLength = JSON.parse(localStorage.getItem('pokemonListLength'));

      // Decide quantos pokémons buscar: o valor salvo ou o padrão.
      const initialLimit = savedLength > 0 ? savedLength : DEFAULT_INITIAL_LIMIT;

      // Chama a função de busca com o limite calculado e offset 0.
      fetchPokemons(initialLimit, 0);

      // ATUALIZA O OFFSET para que o próximo "Carregar Mais" comece do lugar certo.
      setOffset(initialLimit);
    }
    // O array de dependências vazio `[]` garante que este código rode APENAS UMA VEZ.
    // Adicionamos fetchPokemons e pokemons.length para seguir as regras do linter, mas a lógica interna previne re-execuções.
  }, [fetchPokemons, pokemons.length]);
  
  // O useEffect antigo foi removido, pois sua funcionalidade foi absorvida pelo de cima.

  // --- ALTERAÇÃO 4: Pequeno ajuste no `handleLoadMore` ---
  // Agora ele passa o limite (que é sempre 10 para "carregar mais") e o offset atual.
  const handleLoadMore = () => {
    if (!loading && hasMore) {
      // Chama a busca com o offset atual
      fetchPokemons(10, offset);
      // Prepara o offset para a PRÓXIMA busca
      setOffset(prevOffset => prevOffset + 10);
    }
  };
  
  const clearSearch = useCallback(() => {
    setFilteredPokemon(null);
  }, []);
  
  const initialSearch = useCallback(() => {
    fetchPokemons(DEFAULT_INITIAL_LIMIT, 0);// limit=DEFAULT_INITIAL_LIMIT e offset=0, buscando os pokemons começando do início da lista provida pela API
  }, []);

  const contextValue = {
    pokemons,
    loading,
    hasMore,
    handleLoadMore,
    filteredPokemon,
    setFilteredPokemon,
    clearSearch,
    initialSearch,
  };

  return (
    <PokemonContext.Provider value={contextValue}>
      {children}
    </PokemonContext.Provider>
  );
};


