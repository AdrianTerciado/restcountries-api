const cardTemplate = function (country) {
  return `<div class="card">
              <img id="flag-image" src=${country.flags.png} alt="flag" />
              <h1 class="center">${country.name.common}</h1>
            </div>`;
};

const countriesNode = document.getElementById("countries");


fetch("https://restcountries.com/v3.1/all")
  /*   .then(function (response) {
      // fetch() returns a promise containing the response (a Response object).
      // This is just an HTTP response, not the actual JSON. 
      // To extract the JSON body content from the response, 
      // we use the json() method and pass it into the next .then()
      return response.json();
    }) */

  /* Podemos refactorizar este primer then con una funcion flecha:*/
  .then(response => response.json())

  /*  .then(function (countries) {
      // Here is where you'll need to add into the DOM all the countries received from API 
      // 1 - We will need to iterate the countries variable with a loop
      // 2 - You can use the cardTemplate() function to create a div with a class card already styled
      // 💡 you can use countriesNode variable to add elements
      
      for (let i = 0; i < countries.length; i++) {
        countriesNode.innerHTML += cardTemplate(countries[i]);
      }
    });*/

  /* Este segundo then también podemos refactorizarlo con una función flecha y un foreach aunque el for each no reduce mucho el código*/
  .then(countries => countries
    .sort((a, b) => (a.name.common).localeCompare(b.name.common))
    .forEach(country => countriesNode.innerHTML += cardTemplate(country)));

/* En el ejemplo salen los países ordenados alfabeticamente, tengo que mirar cómo hacerlo */

/* Para cada país pintamos imagen con un id que se repite siempre pero los id deberían ser únicos. Podemos eliminar ese id y cambiarlo por un class pero tenemos que cambiar también el selector de CSS que le da estilo. */


/* Bonus */

// Cuando hacemos click en el input (el botón)
document.querySelector("input").addEventListener("click", function () {

  // Capturamos en una variable el valor del selector para despues comparar aunque podemos meterlo a capón pero es menos legible
  
  let seleccion = document.getElementById("continente").value;

  // Si elegimos todos: mostramos lo que hemos hecho arriba, se quedaría igual.
  if (seleccion == "All") {
    countriesNode.innerHTML = "";
    fetch("https://restcountries.com/v3.1/all")
      .then(response => response.json())
      .then(countries => countries
        .sort((a, b) => (a.name.common).localeCompare(b.name.common))
        .forEach(country => countriesNode.innerHTML += cardTemplate(country))
      );
  }
  // Pero si no "All" es porque estamos eligiendo alguna region, entonces...
  else {
      countriesNode.innerHTML = "";
      fetch(`https://restcountries.com/v3.1/region/${seleccion}`)
        .then(response => response.json())
        .then(countries => countries
          .sort((a, b) => a.name.common.localeCompare(b.name.common))
          .forEach(country =>
            countriesNode.innerHTML += cardTemplate(country)))
  }
});