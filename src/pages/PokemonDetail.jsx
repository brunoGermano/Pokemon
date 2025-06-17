/*
 Este é um componente "Staless" pois apenas mostrará os componentes na tela. Quem fará a lógica,ou seja, quem será os componentes "Statefull" serão os componentes que estão na pasta "components", eles, sim, tem hook de state para guardar o state dos componentes em que estão, deste modo eles mantém o estado deles e permite alterações neste estado.
*/


// src/pages/PokemonDetail.jsx
import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';
import {
  DetailContainer,
  DetailImage,
  DetailName,
  AbilitiesList,
  HomeButton,
} from '../styles/DetailStyles';
import { Listing } from '../styles/DetailStyles';
import { ThemeContext } from '../contexts/ThemeContext';
import { pokemonsMainPagePath } from '../globalVariables';


const PokemonDetail = () => {
  // Obtém o nome do Pokémon dos parâmetros da URL
  const { name } = useParams();
  // Estado para armazenar os detalhes do Pokémon selecionado
  const [pokemonDetails, setPokemonDetails] = useState(null);
  // Estado para gerenciar o estado de carregamento
  const [loading, setLoading] = useState(true);
  // Estado para gerenciar o estado de erro
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { currentTheme } = useContext(ThemeContext);

  // useEffect para buscar os detalhes do Pokémon quando o componente é montado ou o nome muda
  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        // Faz uma chamada à API para obter os detalhes do Pokémon específico
        const response = await api.get(`/pokemon/${name}`);
        setPokemonDetails(response.data);
      } catch (err) {
        console.error('Erro ao buscar detalhes do Pokémon:', err);
        setError('Falha ao carregar os detalhes do Pokémon. Por favor, tente novamente.');
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonDetails();
  }, [name]); // Dependência: busca novamente se o nome do Pokémon na URL mudar

  if (loading) {
    return <DetailContainer>Carregando detalhes do Pokémon...</DetailContainer>;
  }

  if (error) {
    return <DetailContainer>{error}</DetailContainer>;
  }

  if (!pokemonDetails) {
    return <DetailContainer>Pokémon não encontrado.</DetailContainer>;
  }

  return (

    <DetailContainer style={{color:currentTheme.color, backgroundColor:currentTheme.background}}>
      {/* Exibe a imagem do Pokémon */}
      <DetailImage
        src={pokemonDetails.sprites.front_default}
        alt={pokemonDetails.name}
        />
      {/* Exibe o nome do Pokémon */}
      <DetailName>{pokemonDetails.name}</DetailName>

      <h3>Tipo(s) ({(pokemonDetails.types.length)}):</h3>
      <Listing>
        {pokemonDetails.types.map((typeInfo) => (
          <li key={typeInfo.type.name}>{typeInfo.type.name}</li>
          ))}
      </Listing>

      <h3>Habilidades:({pokemonDetails.abilities.length})</h3>
      {/* Exibe uma lista de habilidades do Pokémon */}
      <AbilitiesList>
        {pokemonDetails.abilities.map((abilityInfo) => (
          <li key={abilityInfo.ability.name}>{abilityInfo.ability.name}</li>
        ))}
      </AbilitiesList>

      <h3>Movimentos({pokemonDetails.moves.length}):</h3>
      <Listing>
        {console.log(pokemonDetails)}
        {pokemonDetails.moves.map((movieInfo) => (
          <li key={movieInfo.move.name}>{movieInfo.move.name}</li>
          ))}
      </Listing>

      {/* Botão para voltar para a página inicial */}
      
      {/* <HomeButton onClick={() => navigate('/Pokemons')}>Voltar para a Lista</HomeButton> */}
      {console.log(pokemonsMainPagePath)}
      <HomeButton onClick={() => navigate(`/${pokemonsMainPagePath}`)}>Voltar para a Lista</HomeButton>

      {/* Este aqui gera um erro na construção do caminho da url por parte do react-dom, ele cria o caminho "http://localhost:5173/pokemonDetail/caterpie/Pokemons", isso acontece porque ele apenas incrementa o valor da variável, "Pokemons", no link que já estava na barra que era "http://localhost:5173/pokemonDetail/caterpie/", em vez de substituir tudo que estava na barra por "/Pokemons", que é o definido como caminho do meu diretório principal, ou seja, o meu "home". Portanto, isso faria o navegador voltar para o diretório principal e mostrar a lista de pokemons novamente, lista essa que é mostrada pelo componente <Home/>. */}

      {/* <HomeButton onClick={() => navigate(pokemonsMainPagePath)}>Voltar para a Lista</HomeButton> */}

    </DetailContainer>
  );
};

export default PokemonDetail;