<!--
comentário 
-->

# 📚 Pokémon Explorer 🚀
Bem-vindo ao Pokémon Explorer! Esta aplicação React tem como propósito fornecer uma interface interativa e eficiente para consultar dados de Pokémons através da API pública.
É um projeto simples e dinâmico mas que envolve vários conceitos importantes de programação frontend e permite a você navegar por uma lista de Pokémons, carregar mais criaturas e até mesmo buscar por seus personagens favoritos. Tudo isso possibilita aos usuários explorar a vasta coleção de criaturas de forma dinâmica e persistente.

## ✨ Funcionalidades Incríveis
A aplicação entrega as seguintes funcionalidades principais:

+ Lista Infinita de Pokémons: 📈 Carregue 10 Pokémons por vez com um clique de botão, adicionando-os de forma incremental à sua lista atual.

+ Página de Detalhes por Pokémon: 🔍 Ao clicar em qualquer Pokémon da lista, uma nova página é aberta exibindo seus detalhes específicos, incluindo imagem e habilidades.

+ Estado da Lista Persistente: 🔄 A lista de Pokémons e seu estado de carregamento (offset) são mantidos mesmo ao navegar para a página de detalhes e retornar, garantindo uma experiência de usuário fluida.

+ Busca Rápida e Local: 💡 Encontre Pokémons específicos dentro da lista já carregada através de um campo de busca intuitivo. Caso o Pokémon não esteja na lista atual, um alerta é emitido.

+ Estilização Moderna e Modular: 💅 Componentes estilizados com styled-components para uma interface limpa, responsiva e de fácil manutenção.

+ Permite escolher uma cor de tema do website entre dark ou light, além disso, mantém a escolha salva bem como a última lista carregada, deste modo, sempre que retornar ao site, suas preferências estarão salvas.

## 🛠️ Tecnologias Utilizadas e Justificativa
Este projeto foi construído com as seguintes tecnologias e bibliotecas, escolhidas por sua robustez, flexibilidade e adequação para o desafio proposto:

* React: Uma biblioteca JavaScript para construir interfaces de usuário. ⚛️ Escolhido pela sua abordagem baseada em componentes, que facilita a modularização e reusabilidade da UI.

* React Router DOM: Para roteamento declarativo dentro da aplicação. 🛣️ Essencial para criar uma experiência de navegação de "múltiplas páginas" (single-page application) de forma eficiente e amigável.

* Styled Components: Para escrever CSS-in-JS, permitindo a criação de componentes com estilos encapsulados. 🎨 Selecionado por promover a componentização de estilos, evitar conflitos de CSS e melhorar a manutenibilidade do código visual.

* Axios: Um cliente HTTP baseado em Promises para fazer requisições à API Pokémon. 🌐 Preferido por sua simplicidade, robustez e recursos como interceptores de requisição/resposta, tornando as chamadas à API mais organizadas.

* Context API: Para gerenciamento de estado global simples, garantindo que a lista de Pokémons persista entre as navegações. 🔗 Escolhida como uma solução nativa do React para compartilhamento de estado sem a necessidade de passar props manualmente em todos os níveis, ideal para o problema de persistência da lista.

## 💡 Decisões de Projeto e Justificativas
Durante o planejamento e execução deste desafio, algumas decisões chave foram adotadas:

1. Uso da Context API para Persistência da Lista: A decisão de usar a Context API (no PokemonContext.jsx) para gerenciar o estado da lista de Pokémons (pokemons, offset, hasMore, loading) e as funções de carregamento foi crucial. Isso evita a perda dos dados da lista ao navegar para a página de detalhes e retornar, pois o provedor de contexto permanece montado e ativo, mantendo o estado centralizado e acessível.

2. Componentização da Busca (Search.jsx): O campo de busca foi isolado em um componente próprio (Search.jsx). Isso promove a reusabilidade, mantém a Home.jsx mais limpa e centraliza a lógica de busca no componente responsável por ela, comunicando-se com o contexto Pokémon para filtrar a lista exibida.

3. Renderização Condicional na Home.jsx: A lógica de exibir a lista completa ou apenas o Pokémon buscado (filteredPokemon ? (...) : (...)) diretamente na Home.jsx simplifica a interface do usuário. Optou-se por não criar uma rota separada para o Pokémon buscado para manter a busca no escopo da lista já carregada e oferecer feedback imediato ao usuário.

4. Tipagem Implícita e JavaScript Puro para Estilos/API: Embora o uso de .jsx para componentes seja priorizado para clareza visual de JSX, arquivos como api.js e os de estilo (.js) foram mantidos com a extensão .js por não conterem sintaxe JSX diretamente. Esta é uma convenção comum que distingue arquivos de lógica pura ou de configuração de arquivos de componentes de UI.

## 🚀 Como Rodar o Projeto
Para colocar o Pokémon Explorer em funcionamento na sua máquina local, siga estes passos:

Clone o Repositório:

git clone https://github.com/seu-usuario/pokemon-explorer.git
cd pokemon-explorer

### Instale as Dependências:

npm install
## ou
yarn install

Inicie a Aplicação:

npm start
## ou
yarn start

Isso abrirá o aplicativo no seu navegador em http://localhost:3000.

💖 Contribuição
Sinta-se à vontade para explorar, modificar e melhorar este projeto! Se tiver sugestões ou encontrar bugs, por favor, abra uma issue ou envie um Pull Request.

Feito com ❤️ por [Bruno/brunoGermano]
