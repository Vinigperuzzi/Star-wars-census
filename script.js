async function printData(){
  const planetsDiv = document.getElementById('planets-container');
  let result = await fetch('https://swapi.dev/api/planets/?format=json')
  let {results} = await result.json()
  console.log(results);
  results.forEach((planet, index) => {
    let li = document.createElement('li');
    li.innerHTML = `<button onclick="getData('${planet['name']}')">${planet['name']}</button>`;
    planetsDiv.appendChild(li)
  })
}

async function getData(planetName){
  const planetResults = document.getElementById('show-results');
  const tableBody = document.getElementById('table-body');
  if(!planetName){
    const search_box = document.getElementById('search-box');
    planetName = search_box.value;
    search_box.value = '';
  }
  let planetInfo = await (await fetch(`https://swapi.dev/api/planets/?search=${planetName}`)).json();
  planetInfo = await planetInfo.results['0'];
  planetResults.innerHTML = '';
  let p = document.createElement('p');
  if (planetInfo == undefined){
    p.innerHTML = `
                <p>
                  Não há planetas com esse nome... Talvez você queira buscar as informações a partir de um
                  dos listados acima.
                </p>
                `;
    planetResults.appendChild(p);
    return;
  }
  p.innerHTML = `
                <p>
                  <p>Nome = ${planetInfo['name']}</p>
                  <p>Clima = ${planetInfo['climate']}</p>
                  <p>População = ${planetInfo['population']}</p>
                  <p>Terreno = ${planetInfo['terrain']}</p>
                </p>
                `;
  planetResults.appendChild(p);
  residents = planetInfo['residents'];
  console.log(residents);
}

printData();