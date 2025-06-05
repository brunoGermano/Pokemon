// src/styles/DetailStyles.js
import styled from "styled-components";

export const DetailContainer = styled.div`
  // max-width: 800px;
  margin: 20px auto;
  padding: 30px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

export const DetailImage = styled.img`
  width: 200px;
  height: 200px;
  object-fit: contain;
  margin-bottom: 20px;
`;

export const DetailName = styled.h2`
  text-transform: capitalize;
  color: #333;
  margin-bottom: 15px;
`;

export const AbilitiesList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 20px;

  li {
    background-color: #e9e9e9;
    padding: 8px 15px;
    margin: 5px auto;
    border-radius: 5px;
    display: inline-block; /* Para melhor espaçamento se houver várias habilidades */
    margin-right: 10px;
    text-transform: capitalize;
    font-weight: bold;
    color: #555;
  }
`;

export const Listing = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 20px;
  // background-color:rgb(48, 46, 46);
  
  li {
    background-color: #e9e9e9;
    padding: 8px 15px;
    margin: 5px auto;
    border-radius: 5px;
    display: inline-block; /* For better spacing if multiple abilities */
    margin-right: 10px;
    text-transform: capitalize;
    font-weight: bold;
    color: #555;
  }
`; 

export const HomeButton = styled.button`
  margin-top: 30px;
  padding: 10px 20px;
  font-size: 16px;
`;
