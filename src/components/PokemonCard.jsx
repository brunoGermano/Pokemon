// src/components/PokemonCard.jsx
import React from 'react';
import { PokemonCardWrapper } from '../styles/ListStyles';
import { useNavigate } from 'react-router-dom';

// Componente para exibir um único Pokémon na lista
const PokemonCard = ({ pokemon }) => {
  const navigate = useNavigate();

  // Função para lidar com o clique em um cartão de Pokémon
  const handleClick = () => {
    // Navega para a página de detalhes, passando o nome do Pokémon como parâmetro
    navigate(`/pokemon/${pokemon.name}`);
  };

  return (
    <PokemonCardWrapper onClick={handleClick}>
      {/* Exibe a imagem do Pokémon (usando uma URL de sprite genérica, pode precisar de ajuste) */}
      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/')[6]}.png`}
        alt={pokemon.name}
      />
      {/* Exibe o nome do Pokémon */}
      <h3>{pokemon.name}</h3>
    </PokemonCardWrapper>
  );
};

export default PokemonCard;