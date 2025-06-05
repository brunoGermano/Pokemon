// src/api.js
import axios from 'axios';

// Cria uma instância Axios com a URL base para a API Pokémon
const api = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/',
});

export default api;