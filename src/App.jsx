
// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PokemonDetail from './pages/PokemonDetail';
import GlobalStyle from './styles/GlobalStyles';
import { PokemonProvider } from './contexts/PokemonContext'; // Importa o Provedor
import styled from "styled-components";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ThemeTogglerButton } from './components/ThemeTogglerButton';
import { pokemonDetailPagePath, pokemonsMainPagePath } from './globalVariables';

function App() {
  
  return (
  <Div className='brunoGG'>
  
  {  /* O elemento "<ThemeProvider>" é responsável por gerar o contexto onde seus filhos terão acesso a suas "props" sem que tenha que passar de filho para filho, usando o contexto gerado e evitando o problema do props drilling. */}
    <ThemeProvider>
      <ThemeTogglerButton/>
          {/* // BrowserRouter habilita o roteamento do lado do cliente */}
          <Router>
              {/* Aplica estilos globais */}
              <GlobalStyle />
              {/* alterado devido a perda da lista de pokemons ao voltar neste componente */}
              {/* Envolve as rotas com o PokemonProvider para que o estado seja compartilhado */}
              <PokemonProvider >

                {/* Routes define os caminhos para diferentes componentes */}
                <Routes>
                  {/* Rota para a página inicial (lista de Pokémons) */}
                  
                  {/* <Route path="/Pokemons" element={<Home />} /> */}
                  <Route path= {`/${pokemonsMainPagePath}`} element={<Home />} />


                  
                  {/* Rota para a página de detalhes do Pokémon, com um parâmetro dinâmico 'name' */}

                  {/* <Route path="/pokemonDetail/:name" element={<PokemonDetail />} /> */}
                  <Route path={`/${pokemonDetailPagePath}/:name`} element={<PokemonDetail />} />

                </Routes>

              </PokemonProvider>

        </Router>
      </ThemeProvider>  
    </Div>
  );
}

const Div = styled.div`
  // width: 100%;
  position:relative;
  // background:rgb(5, 5, 51);

`

export default App;