
async function fetchDetails(pokemonName){
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}/`
    console.log(`url de consulta dos detalhes do pokemon: ${url}`)
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}/`)
    console.log("dentro da fetchDetails", await response.json())
    return await response.json()
}

// -------- ----------------f----------f-f--------------f----------------
