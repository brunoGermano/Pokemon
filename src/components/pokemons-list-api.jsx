/* SOBRE EXECUTAR ESTE PROJETO NO TERMINAL:
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process
npm run dev
pode trocar o "Process" por "Currentuser"
*/


/* SOBRE O COMPONENTE CRIADO NESTE ARQUIVO JSX:
O que esse componente deve fazer é buscar da API e devolver os dados em uma lista
*/
import {useState, useEffect} from "react" // importando o hook de estado, usando importação nomeada
import styled from "styled-components";
// O hook de estado inicializa o estado do nosso componente de função. Já o hook de efeito atualiza o estado do nosso componente.
import { Link } from 'react-router-dom';

const PokemonsList = () => {
    const [pokemons, setPokemons] = useState({ /* "pokemons" é o objeto dado pelo hook "useState" para acessar o estado do componente, já o "setPokemons" é a função dada pelo hook para alterar o estado do componente. Atenção neles! */
        pokemonsObtidos:[] /* array de pokemons vazio */
    })

    /* O hook de efeito, "useEffect", recebe uma função que será sempre executada quando o componente for montado e quando ele é atualizado. */
    useEffect( () => { /* O hook de efeito espera uma callback e não uma promisse, por isso não pode colocar o async na arrow function */
        async function fetchPokemonImage(imageUrl){
            const response = await fetch(imageUrl);
            const pokemon = await response.json();
            const pokemonImage = pokemon.sprites.front_default; 
            return pokemonImage;
        }

        async function fetchFPokemons() {
            try {
                const response = await fetch("https://pokeapi.co/api/v2/pokemon/")
                const data = await response.json()
                // console.log("teste", data.results[3].url);
                return data.results;
             } catch (error) { console.log( `error = ${error}`) }
         }

        async function fetchAll() {
            try {
                const pokemonsArray = await fetchFPokemons() /* busca os pokemons */
                
                // console.log("Array retornado com os pokemons sem imagem: ", pokemonsArray);

                const pokemonsWithTheirImages = await Promise.all( /** o método "all" do "Promise" espera que todas as promisses passada para ele executem antes de retornar, ele retorna todos os resultdos de resolved delas ou então o primeiro reject da primeira promise que falhar, não retornando mais nada. */
                    pokemonsArray.map(async (pokemon) => {
                            const pokemonImage = await fetchPokemonImage(pokemon.url);
                            // console.log(pokemonImage);
                            return {...pokemon, pokemonImageUrl:pokemonImage} /* preciso devolver o objeto "pokemon" pro meu "map", dou um spread pegando os atributos do objeto "pokemon" passo o novo atributo "pokemonImageUrl" criando um novo objeto "pokemon" completo contendo a imagem dele que veio de outro endpoint diferente do que recuperei o nome do pokemon. */
                    })
                );
                // console.log("pokemonsWithTheirImages: ", pokemonsWithTheirImages);

                setPokemons({
                    pokemonsObtidos: pokemonsWithTheirImages // Atribuo no meu vetor "pokemonsObtidos" os pokemons retornados. olhei a documentação da API no site "https://pokeapi.co" para descobrir o nome do atributo devolvido por ela.
                })
            } catch (error) { console.log( `error = ${error}`) }
        }
         
        fetchAll() //  busca as imagens dos pokemons

    }, []) // como o hook de efeito sempre atualiza ao mudar o estado do vetor "pokemons" do hook de estado quando se chama a "setPokemons", isso cria um loop, portanto usa-se o "[]" como segundo parâmetro dele que é uma dependência pois como ele é um hook de efeito, ele depende da alteração de algum dado para que ele possa ser chamado.
    
    // console.log(pokemons.pokemonsObtidos)

    function showDetails(pokemon){
        console.log("Clicou na showDetails() function!", pokemon.url)
        return(
            <a src={pokemon.url} target="blank"></a>
        )
    }

    return(
        <>
            <section>
                <Ul>
                    {
                        pokemons.pokemonsObtidos.map((pokemon,index) => {
                            return (
                                <Li key={index}> 
                                    <div onClick={() => showDetails(pokemon)}>
                                        <Link to={`/details/${pokemon.name}`}>
                                        <p>{pokemon.name}</p>
                                        <img src={pokemon.pokemonImageUrl} value={pokemon.name} />
                                        </Link>
                                    </div>
                                </Li>
                            )
                        })
                        
                    }
                </Ul>
            </section>
        </>
    )

}

const Li = styled.li `list-style: none;`
const Section = styled.section `display:flex; justify-content:center;`
const Ul = styled.ul `display:grid;
grid-template-columns: repeat(3, 1fr);
grid-auto-rows: 200px;`
// const Ul = styled.ul `display:flex;
// justify-content:center;`

export { PokemonsList }