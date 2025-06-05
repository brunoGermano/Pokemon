
/*

// src/pages/Home.jsx
// CRIAÇÃO DA SEÇÃO DOS IMPORTS
import React, { useState, useEffect, useCallback } from 'react';
import api from '../api'; // Certifique-se que este caminho está correto e api.js está configurado
import PokemonCard from '../components/PokemonCard'; // Certifique-se que este caminho está correto
import {
  ListContainer,
  PokemonGrid,
  LoadMoreButton,
} from '../styles/ListStyles'; // Certifique-se que este caminho está correto
import { Search } from '../components/Search';



const Home = () => {
  // CRIAÇÃO DA SEÇÃO DOS HOOKS
  // Estado para armazenar a lista de Pokémons (agora com ID)
  const [pokemons, setPokemons] = useState([]);
  // Estado para gerenciar o offset para as chamadas da API
  const [offset, setOffset] = useState(0);
  // Estado para verificar se há mais Pokémons disponíveis
  const [hasMore, setHasMore] = useState(true);
  // Estado para gerenciar o estado de carregamento
  const [loading, setLoading] = useState(false);
  // Limite de Pokémons por requisição
  const LIMIT = 10; // Você pode ajustar este valor


  // CRIAÇÃO DA SEÇÃO DE FUNÇÕES
  // Função para buscar Pokémons da API
  const fetchPokemons = useCallback(async (currentOffset) => {
    // ALTERAÇÃO: Removida a guarda 'if (loading && currentOffset !== 0) return;' daqui.
    // A verificação de 'loading' antes de chamar fetchPokemons (para 'load more')
    // já é feita em handleLoadMore. Para a carga inicial, queremos que ela sempre execute.
    // Manter 'loading' aqui com 'loading' fora das dependências do useCallback tornaria
    // o valor de 'loading' aqui obsoleto (sempre o valor da primeira renderização).

    setLoading(true);

    try {
      const response = await api.get(`/pokemon?limit=${LIMIT}&offset=${currentOffset}`);
      const results = response.data.results;

      // Mapeia os resultados para adicionar o ID numérico e manter as outras propriedades
      const newPokemonsWithId = results.map(pokemon => {
        const urlParts = pokemon.url.split('/');
        const id = parseInt(urlParts[urlParts.length - 2], 10); // Extrai e converte ID para número
        return {
          ...pokemon, // Mantém 'name' e 'url'
          id: id,     // Adiciona 'id' numérico
        };
      });

      // Se for o carregamento inicial (offset 0), substitui a lista.
      // Caso contrário (carregar mais), anexa os novos à lista existente.
      setPokemons((prevPokemons) =>
        currentOffset === 0 ? newPokemonsWithId : [...prevPokemons, ...newPokemonsWithId]
      );

      setHasMore(response.data.next !== null); // Verifica se há mais Pokémons para carregar
    } catch (error) {
      console.error('Erro ao buscar Pokémons:', error);
      // Poderia adicionar um estado de erro aqui para mostrar uma mensagem ao usuário
    } finally {
      setLoading(false);
    }
  // ALTERAÇÃO: Removido 'loading' das dependências do useCallback.
  // 'LIMIT' é incluído pois é uma variável do escopo do componente que é usada dentro do callback.
  // Se LIMIT fosse uma constante global/módulo, as dependências poderiam ser [].
  // As funções de atualização de estado (setPokemons, setLoading, setHasMore) são estáveis
  // e não precisam ser listadas como dependências.
  }, [LIMIT]);

  // useEffect para buscar Pokémons quando o componente é montado
  useEffect(() => {
    // A primeira carga não precisa verificar 'loading' pois é o estado inicial.
    fetchPokemons(0); // Busca os primeiros Pokémons (offset 0)
  // ALTERAÇÃO: Com fetchPokemons agora estável (por não depender de 'loading'),
  // este useEffect só executará na montagem inicial (ou se 'LIMIT' mudasse,
  // o que recriaria 'fetchPokemons'). Isso previne o loop de carregamento.
  }, [fetchPokemons]); // Dependência: a função fetchPokemons memorizada

  // Função para lidar com o clique do botão "Carregar Mais"
  const handleLoadMore = () => {
    if (!loading && hasMore) {
      const nextOffset = offset + LIMIT;
      console.log(nextOffset, offset);
      setOffset(nextOffset); // Atualiza o offset para a próxima busca
      fetchPokemons(nextOffset); // Busca o próximo conjunto de Pokémons com o novo offset
    }
  };

  */

  // ------ f ----------- ff------------------f-f----------
// src/pages/Home.jsx
import React, {useContext, useEffect, useLayoutEffect} from 'react';
import PokemonCard from '../components/PokemonCard';
import {
  ListContainer,
  PokemonGrid,
  LoadMoreButton,
} from '../styles/ListStyles';
import { usePokemonContext } from '../contexts/PokemonContext'; // Importa o hook do contexto
import { Search } from '../components/Search';
import { ThemeTogglerButton } from "../components/ThemeTogglerButton"
import { ThemeContext } from '../contexts/ThemeContext';
import styled from 'styled-components';


const Home = () => {

  const { currentTheme, setCurrentTheme } = useContext(ThemeContext)
  // console.log("Button Themes: ", theme)
  // console.log("Button props: ", props)
  
  // === Antes da Montagem (Before Mounting) ===
  useLayoutEffect(()=> {
    console.log("0. useEffect (Antes da Montagem) Equivale ao ComponentWillMount dos componentes de CLASSE")
  }, [])
  
  // === Montagem (Mounting) ===
  // O efeito com array de dependências vazio ([]) roda apenas na montagem
  useEffect(() => {
    console.log('1. useEffect (Montagem): Componente montado (no DOM)');

    // === Desmontagem (Unmounting) ===
    // O retorno da função de efeito é a função de limpeza (cleanup)
    return () => {
      console.log('4. useEffect (Desmontagem): Componente prestes a ser desmontado (removido do DOM)');
    };
  }, []); // Array de dependências vazio significa que o efeito roda apenas uma vez na montagem e uma vez na desmontagem

  // === Atualização (Updating) ===
  // O efeito que roda a cada renderização (sem array de dependências) ou
  // quando as dependências mudam.
  useEffect(() => {
    console.log('2. useEffect (Atualização): Componente renderizado ou atualizado (props ou state mudaram)');
    // Este efeito roda a cada renderização, a menos que você especifique dependências.
  });


  // alterado devido a perda da lista de pokemons ao voltar neste componente
  // Consome o estado e as funções do PokemonContext
  const { pokemons, loading, hasMore, handleLoadMore } = usePokemonContext();

  
  // CRIAÇÃO DA SEÇÃO DO RETURN
  return (
    <ListContainer style={{color: currentTheme.color, backgroundColor: currentTheme.background}}>
      {/* <ThemeTogglerButton/> */}
      <Search/>
      <h1>Lista de Pokemons({pokemons.length}):</h1>
      {/* Exibe uma grade de cartões de Pokémon */}
      <PokemonGrid>
        {/* {console.log(pokemons)} */}
        {pokemons.map((pokemon, index) => (
          // Agora pokemon.id é um número único e pode ser usado como key
          <PokemonCard key={index} pokemon={pokemon} />
        ))}
      </PokemonGrid>

      {/* Feedback de carregamento enquanto a lista inicial está sendo buscada e está vazia */}
      {loading && pokemons.length === 0 && <p>Carregando Pokemons...</p>}

      {/* Botão "Carregar Mais", desabilitado se estiver carregando ou não houver mais Pokémons */}
      {hasMore && !loading && pokemons.length > 0 && ( // Mostra apenas se houver mais, não estiver carregando e já tiver pokemons
        <LoadMoreButton onClick={handleLoadMore} disabled={loading}>
          Carregar Mais (10)
        </LoadMoreButton>
      )}
      {/* Mostra o botão "Carregando..." apenas durante o "Carregar Mais" */}
      {hasMore && loading && pokemons.length > 0 && (
          <LoadMoreButton disabled={true}>
            Carregando...
          </LoadMoreButton>
      )}

      {!hasMore && pokemons.length > 0 && <p>Não há mais Pokémons para carregar!</p>}
    </ListContainer>
  );
};

export default Home;