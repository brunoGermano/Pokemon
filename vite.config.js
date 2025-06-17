import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { pokemonsMainPagePath } from './src/globalVariables'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // base:"/Pokemons", // COnfigura diretório de exibição do servidor, o que é mostrado no "http://localhost:5173/<base>"
  base: pokemonsMainPagePath, // COnfigura diretório de exibição do servidor, o que é mostrado no "http://localhost:5173/<base>"
})
