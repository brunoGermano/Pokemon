/*
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

  */


//       {/* <ThemeTogglerButton/> */}
//       <Search/>
//       <h1>Lista de Pokemons({pokemons.length}):</h1>
//       {/* Exibe uma grade de cartões de Pokémon */}
//       <PokemonGrid>
//         {/* {console.log(pokemons)} */}
//         {pokemons.map((pokemon, index) => (
//           // Agora pokemon.id é um número único e pode ser usado como key
//           <PokemonCard key={index} pokemon={pokemon} />
//         ))}
//       </PokemonGrid>

//       {/* Feedback de carregamento enquanto a lista inicial está sendo buscada e está vazia */}
//       {loading && pokemons.length === 0 && <p>Carregando Pokemons...</p>}

//       {/* Botão "Carregar Mais", desabilitado se estiver carregando ou não houver mais Pokémons */}
//       {hasMore && !loading && pokemons.length > 0 && ( // Mostra apenas se houver mais, não estiver carregando e já tiver pokemons
//         <LoadMoreButton onClick={handleLoadMore} disabled={loading}>
//           Carregar Mais (10)
//         </LoadMoreButton>
//       )}
//       {/* Mostra o botão "Carregando..." apenas durante o "Carregar Mais" */}
//       {hasMore && loading && pokemons.length > 0 && (
//           <LoadMoreButton disabled={true}>
//             Carregando...
//           </LoadMoreButton>
//       )}

//       {!hasMore && pokemons.length > 0 && <p>Não há mais Pokémons para carregar!</p>}
//     </ListContainer>
//   );
// };

// export default Home;





// --------------- fffffffff -----------------------------

// src/pages/Home.jsx
import React, {useContext, useEffect, useLayoutEffect} from 'react';
import PokemonCard from '../components/PokemonCard';
import {
  ListContainer,
  PokemonGrid,
  LoadMoreButton,
} from '../styles/ListStyles';
import { usePokemonContext } from '../contexts/PokemonContext'; // Importa o hook do contexto
import { Search } from '../components/Search'; // Importa o novo componente Search
import { ThemeTogglerButton } from "../components/ThemeTogglerButton" // Assumindo que você tem este componente
import { ThemeContext } from '../contexts/ThemeContext'; // Assumindo que você tem este contexto

const Home = () => {
  const { currentTheme } = useContext(ThemeContext);
  // alterado devido a perda da lista de pokemons ao voltar neste componente
  // Consome o estado e as funções do PokemonContext, incluindo filteredPokemon
  const { pokemons, loading, hasMore, handleLoadMore, filteredPokemon } = usePokemonContext();



  // === Antes da Montagem (Before Mounting) ===
  useLayoutEffect(()=> {
    console.log("0. useLayoutEffect (Antes da Montagem) Equivale ao ComponentWillMount dos componentes de CLASSE")
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




  // CRIAÇÃO DA SEÇÃO DO RETURN
  return (
    <ListContainer style={{color: currentTheme.color, backgroundColor: currentTheme.background}}>
      {/* <ThemeTogglerButton/> */} {/* Mantido se você tiver */}
      <Search/> {/* Adiciona o componente de busca */}
      <h1>Lista de Pokemons({pokemons.length}):</h1>
      {/* alterado devido a perda da lista de pokemons ao voltar neste componente */}
      {/* Renderiza o Pokémon filtrado se houver, caso contrário, renderiza a lista completa, // condition ? true : false */}
      {filteredPokemon ? (
        <PokemonGrid>
          <PokemonCard key={filteredPokemon.id} pokemon={filteredPokemon} />
        </PokemonGrid>
      ) : (
        <>
          <PokemonGrid>
            {pokemons.map((pokemon) => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} />
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
        </>
      )}
    </ListContainer>
  );
};

export default Home;