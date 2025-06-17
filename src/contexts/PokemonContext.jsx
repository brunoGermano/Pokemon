
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
    try {
      const response = await api.get(`/pokemon?limit=10&offset=${currentOffset}`);
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