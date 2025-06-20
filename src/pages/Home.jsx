
// src/pages/Home.jsx
import React, { useContext, useEffect } from 'react'; // Removido useLayoutEffect
import PokemonCard from '../components/PokemonCard';
import {
  ListContainer,
  PokemonGrid,
  LoadMoreButton,
  Button
} from '../styles/ListStyles';
import { usePokemonContext } from '../contexts/PokemonContext';
import { Search } from '../components/Search';
import { ThemeContext } from '../contexts/ThemeContext';

const Home = () => {
  const { currentTheme } = useContext(ThemeContext);
  const { pokemons, loading, hasMore, handleLoadMore, filteredPokemon, initialSearch } = usePokemonContext();



/*
  //  CRIAÇÃO DOS useEffects para ver os ciclos de vida do componente "Home"
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








  useEffect(() => {
    return () => {
      console.log(`2. useEffect (Atualização): qtde de pokemons da lista: ${pokemons.length}`);
      localStorage.setItem("limitPokemons", JSON.stringify(pokemons.length))
    }
  },[pokemons]); 

  useLayoutEffect(()=> {
    const limitPokemons = JSON.parse(localStorage.getItem("limitPokemons"));
    console.log(`0. useLayoutEffect (Antes da Montagem): qtde de pokemons da lista: ${limitPokemons+10}`);
  }, [])
  
*/


  // CORREÇÃO: Efeito para salvar o tamanho da lista ao sair/recarregar a página
  useEffect(() => {
    // Função que será chamada quando o usuário tentar recarregar ou fechar a página
    const handleBeforeUnload = () => {
      // Apenas salva se a lista tiver pokémons, para não salvar "0"
      if (pokemons.length > 0) {
        console.log(`Saindo da página. Salvando a quantidade de pokémons: ${pokemons.length}`);
        localStorage.setItem('pokemonListLength', JSON.stringify(pokemons.length));
      }
    };

    // Adiciona o listener ao evento 'beforeunload' do navegador
    window.addEventListener('beforeunload', handleBeforeUnload);

    // A função de cleanup do useEffect é executada quando o componente é desmontado
    // (por exemplo, ao navegar para outra rota na sua aplicação)
    return () => {
      console.log('Componente Home desmontado. Removendo listener.');
      window.removeEventListener('beforeunload', handleBeforeUnload);
      
      // Também salvamos aqui para garantir que a navegação interna (SPA) funcione
      handleBeforeUnload();
    };
    
  // A dependência [pokemons] garante que a função `handleBeforeUnload`
  // dentro do listener sempre tenha acesso ao valor mais recente de `pokemons.length`.
  }, [pokemons]);


  // CRIAÇÃO DA SEÇÃO DO RETURN (NENHUMA MUDANÇA AQUI)
  return (
    <ListContainer style={{color: currentTheme.color, backgroundColor: currentTheme.background}}>
      <Search/>
      <h1>Lista de Pokemons({pokemons.length}):</h1>
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

          {loading && pokemons.length === 0 && <p>Carregando Pokemons...</p>}

          {hasMore && !loading && pokemons.length > 0 && (
            <LoadMoreButton onClick={handleLoadMore} disabled={loading}>
              Carregar Mais (10)
            </LoadMoreButton>
          )}
          {hasMore && loading && pokemons.length > 0 && (
              <LoadMoreButton disabled={true}>
                Carregando...
              </LoadMoreButton>
          )}

          {!hasMore && pokemons.length > 0 && <p>Não há mais Pokémons para carregar!</p>}

          <Button onClick={initialSearch}>Carregar Do Início</Button>

        </>
      )}
    </ListContainer>
  );
};

export default Home;