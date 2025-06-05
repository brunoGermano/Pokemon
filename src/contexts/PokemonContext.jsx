// src/context/PokemonContext.jsx
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

  // Função para buscar Pokemons da API
  const fetchPokemons = useCallback(async (currentOffset) => {
    //  if (loading) return; // Previne múltiplas buscas simultâneas
    setLoading(true);
    try {
      // Faz uma chamada à API para obter uma lista de Pokemons, limitando a 10 por requisição
      const response = await api.get(`/pokemon?limit=10&offset=${currentOffset}`);
      const newPokemons = response.data.results;

      // Mapeia os resultados para adicionar o ID numérico e manter as outras propriedades
      const newPokemonsWithId = newPokemons.map(pokemon => {
        // console.log(pokemon.url);
        const urlParts = pokemon.url.split('/');
        const id = parseInt(urlParts[urlParts.length - 2], 10); // Extrai e converte ID para número
        return {
          ...pokemon, // Mantém 'name' e 'url'
          id: id,     // Adiciona 'id' numérico
        };
      }); 

      // Atualiza a lista de Pokemons, anexando os novos à lista existente
      setPokemons( (prevPokemons) =>{
        // console.log(newPokemonsWithId);
        return(
          currentOffset === 0 ? newPokemonsWithId :  [...prevPokemons, ...newPokemonsWithId]
        )
      });

      // Verifica se há mais Pokemons para carregar
      setHasMore(response.data.next !== null);
    } catch (error) {
      console.error('Erro ao buscar Pokemons:', error);
    } finally {
      setLoading(false);
    }
  }, []); // Dependências para useCallback

  // useEffect para buscar Pokemons quando o componente é montado ou o offset muda
  // useEffect(() => {
  //   // alterado devido a perda da lista de pokemons ao voltar neste componente
  //   // A lista só será carregada do zero se não houver pokemons já carregados,
  //   // garantindo que o estado seja mantido ao retornar.
  //   if (pokemons.length === 0 || offset > 0) {
  //     fetchPokemons();
  //   }
  // }, [fetchPokemons, offset, pokemons.length]);


// useEffect para buscar Pokémons quando o componente é montado
  useEffect(() => {
    // A primeira carga não precisa verificar 'loading' pois é o estado inicial.
    fetchPokemons(0); // Busca os primeiros Pokémons (offset 0)
  // ALTERAÇÃO: Com fetchPokemons agora estável (por não depender de 'loading'),
  // este useEffect só executará na montagem inicial (ou se 'LIMIT' mudasse,
  // o que recriaria 'fetchPokemons'). Isso previne o loop de carregamento.
  }, [fetchPokemons]); // Dependência: a função fetchPokemons memorizada 



  // Função para lidar com o clique do botão "Carregar Mais"
  // const handleLoadMore = () => {
  //   // Incrementa o offset em 10 para buscar o próximo conjunto de Pokemons
  //   setOffset((prevOffset) => prevOffset + 10);
  // };
  
  // Função para lidar com o clique do botão "Carregar Mais"
  const handleLoadMore = () => {
    if (!loading && hasMore) {
      const nextOffset = offset + 10;
      setOffset(nextOffset); // Atualiza o offset para a próxima busca
      fetchPokemons(nextOffset); // Busca o próximo conjunto de Pokémons com o novo offset
    }
  }; 



  // O valor do contexto que será fornecido aos componentes filhos
  const contextValue = {
    pokemons,
    loading,
    hasMore,
    handleLoadMore,
  };

  return (
    <PokemonContext.Provider value={contextValue}>
      {children}
    </PokemonContext.Provider>
  );
};