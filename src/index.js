import 'regenerator-runtime/runtime';

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'

const URL = "https://acnhapi.com/v1";

// Function to pull the various critters, etc. from the API
async function getAnimalCrossing(type) {
  const response = await fetch(`${URL}/${type}`);
  const data = response.json();
  return data
}

// Function to populate the specific chosen critter, etc to build the grid icon display
function getStuff(param1) {
  const iconGrid = document.querySelector(".icongrid");
  let variousGrid = "";

  for (let item in param1) {
    variousGrid += `
            <div class="col-md-2">
                <div class="card" title="${param1[item]['name']['name-USen']}">
                <div class="card-body">
                <img src="${param1[item].hasOwnProperty('icon_uri') ? param1[item].icon_uri : param1[item].image_uri}" class="iconpic">
                </div>
                </div>
            </div>
          `;
  }
  iconGrid.innerHTML = variousGrid;
}

// Fetch request - invoking the function above - what to show on page load 
getAnimalCrossing("fish")
  .then(response => {
    getStuff(response)
  })

// Adding event listener to the links (fish, bugs, etc)
document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.list-group-item')
  for (const button of buttons) {
    button.addEventListener('click', (e) => {
      const type = e.target.getAttribute("data-endpoint")
      document.querySelector('.icongrid').innerHTML = `<i class="fas fa-spinner fa-spin"></i>`
      getAnimalCrossing(type)
        .then(response => {
          getStuff(response)
        })
      console.log(type)
    })
  }
})
