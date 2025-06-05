import styled from "styled-components"

const Search = () => {
    return(
        <div>
            <Input type="text" placeholder="Search a Pokemon by name here" id="SearchPokemon"/>
            <button type="submit">Search</button>
        </div>

    )
}

const Input = styled.input`
    width: 250px;
    height: 20px;
    text-align: center;
    border-radius: 10px;
    right:20px;
    position:relative;
`
 export { Search }