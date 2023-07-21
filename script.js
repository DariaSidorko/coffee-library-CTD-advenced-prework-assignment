

const baseUrl = 'https://api.sampleapis.com/coffee';
let currentCoffeType;


// function that builds out coffee cards dynamicaly
buildingCards = (json) => {

    let cards = document.getElementById("coffe-cards-container");
    for(let i=0; i<json.length; i++) {

      const card = document.createElement("div");
      card.classList.add("card-container");

      const title = document.createElement("h3");
      title.innerText = json[i].title;
      title.classList.add("name");
      card.appendChild(title);

      const image = document.createElement("img");
      image.src = json[i].image;
      image.classList.add("image");
      card.appendChild(image);

      const description = document.createElement("p");
      description.innerText = json[i].description;
      description.classList.add("description");
      card.appendChild(description);

      const ingredients = document.createElement("div");
      ingredients.classList.add("ingredients");

      const ingredientHeader = document.createElement("h5");
      ingredientHeader.innerHTML = "Ingredients:";
      ingredientHeader.classList.add("ingredient-header");
      card.appendChild(ingredientHeader);

      for(let j=0; j<json[i].ingredients.length; j++) {
        const ingredient = document.createElement("p");
        ingredient.innerText = json[i].ingredients[j];
        ingredient.classList.add("ingredients");
        ingredients.appendChild(ingredient);
      }
      card.appendChild(ingredients);

      cards.appendChild(card);
  }
}

  // api call function
  getDrinks = async (url, addition, searchParam) => {
    await fetch(`${url}/${addition}`)
    .then(data => data.json())
    .then(json =>{

      // femovin previously fetched coffee cards
      let cards = document.getElementById("coffe-cards-container");
      while (cards.firstChild) {
        cards.removeChild(cards.firstChild);
      }

      // building up new coffee cards either all of filtered based on search input
        buildingCards(json)

    }) 

  }

// Buttons event listeners that also fire api calls
document.getElementById("btn-hot").addEventListener("click", function(event){
  event.preventDefault();

  currentCoffeType = "hot";
  getDrinks(baseUrl, currentCoffeType)
});


document.getElementById("btn-iced").addEventListener("click", function(event){
  event.preventDefault();

  currentCoffeType = "iced"
  getDrinks(baseUrl, currentCoffeType)
});


