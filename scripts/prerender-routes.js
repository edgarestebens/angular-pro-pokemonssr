const TOTAL_POKEMONS = 151;
const TOTAL_PAGES = 5;


(async () =>{

  const fs = require('fs');

  //pokemons por ID
  const pokemonIds = Array.from({length: TOTAL_POKEMONS}, ( _, i) => i +1);
  let fileContent = pokemonIds.map(
    id => `/pokemons/${id}`
  ).join('\n');


  //PARA LOS PAGES de pokemon
  for (let index = 1; index <= TOTAL_PAGES; index++) {

    fileContent += `\n/pokemons/pages/${index}`;

  }

  const pokemonNameList = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${TOTAL_POKEMONS}`)
    .then(res => res.json());

  fileContent += '\n';
  fileContent += pokemonNameList.results.map(
    pokemon => `/pokemon/${pokemon.name}`
  ).join('\n');

  fs.writeFileSync('routes.txt', fileContent);

  console.log('Routes.txt Generated');

})();
