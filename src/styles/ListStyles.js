// src/styles/ListStyles.js
import styled from "styled-components";

export const ListContainer = styled.div`
  // max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
`;

export const PokemonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 20px;
  margin-top: 30px;
`;

export const LoadMoreButton = styled.button`
  margin-top: 30px;
  padding: 12px 25px;
  font-size: 18px;
`;

export const PokemonCardWrapper = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  cursor: pointer;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }

  img {
    width: 96px;
    height: 96px;
    margin-bottom: 10px;
  }

  h3 {
    margin: 0;
    color: #333;
    text-transform: capitalize;
  }
`;
