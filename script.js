async function printData(){
  const planetsDiv = document.getElementById('planets-container');
  let result = await fetch('https://swapi.dev/api/planets/?format=json')
  let {results} = await result.json()
  console.log(results);
  results.forEach(planet => {
    let li = document.createElement('li');
    li.innerHTML = `<button onclick="getData('${planet['name']}')">${planet['name']}</button>`;
    planetsDiv.appendChild(li)
  })
}

async function getData(planetName){
  const planetResults = document.getElementById('show-results');
  const tableResults = document.getElementById('table-results');
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
                <h1>Informações do planeta ${planetInfo['name']}</h1>
                <p>
                  <p>Nome = ${planetInfo['name']}</p>
                  <p>Clima = ${planetInfo['climate']}</p>
                  <p>População = ${planetInfo['population']}</p>
                  <p>Terreno = ${planetInfo['terrain']}</p>
                </p>
                `;
  planetResults.appendChild(p);
  
  residentsURL = planetInfo['residents'];

  if (residentsURL.length === 0){
    tableResults.innerHTML = '<p>Não há habitantes famosos que tenham vindo desse planeta!</p>';
    return
  }

  tableResults.innerHTML = `
                        <h1>Habitantes mais famosos do planeta ${planetInfo['name']}</h1>
                        <table border="4">
                          <thead>
                            <tr>
                              <th>Nome</th>
                              <th>Data de nascimento</th>
                            </tr>
                          </thead>
                          <tbody id="table-body">

                          </tbody>
                        </table>
                        `;

  residentsURL.forEach(resident => getResident(resident));

  async function getResident(resident){
    residentInfo = await (await fetch(resident)).json();
    const tableBody = document.getElementById('table-body');
    let tr = document.createElement('tr');
    tr.innerHTML = `
                      <th>${residentInfo['name']}</th>
                      <th>${residentInfo['birth_year']}</th>
                    `;
    tableBody.appendChild(tr);
  }
}

printData();