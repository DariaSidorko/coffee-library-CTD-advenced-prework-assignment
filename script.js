

const baseUrl = 'https://api.sampleapis.com/coffee';
let currentCoffeType;


// function that builds out coffee cards dynamicaly
buildingCards = (json) => {

    let cards = document.getElementById("coffe-cards-container");

    if (json.length < 1){
      const emptySearchMessage = document.createElement("h2");
      emptySearchMessage.innerText = "No coffe found with provided name! Please enter correct name.";
      cards.appendChild(emptySearchMessage);
    }

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
      if (searchParam){
        let filtered = [];
        for(let i=0; i<json.length; i++){
          if(json[i].title.toLowerCase().slice(0, searchParam.length) === searchParam.toLowerCase()){
            filtered.push(json[i])
          }
        }
        buildingCards(filtered)
      } else {
        buildingCards(json)
      }

    }) 

  }

// Buttons event listeners that also fire api calls
document.getElementById("btn-hot").addEventListener("click", function(event){
  event.preventDefault();

  document.getElementById("btn-iced").classList.remove("button-active");
  document.getElementById("btn-hot").classList.add("button-active");

  document.getElementById("search").classList.remove("show-hide");
  document.getElementById("search-value").placeholder = "Search HOT coffee drinks"

  currentCoffeType = "hot";
  getDrinks(baseUrl, currentCoffeType)
});


  document.getElementById("btn-iced").addEventListener("click", function(event){
  event.preventDefault();

  document.getElementById("btn-hot").classList.remove("button-active");
  document.getElementById("btn-iced").classList.add("button-active");

  document.getElementById("search").classList.remove("show-hide");
  document.getElementById("search-value").value = "";
  document.getElementById("search-value").placeholder = "Search ICED coffee drinks"

  currentCoffeType = "iced"
  getDrinks(baseUrl, currentCoffeType)
});

// func that triggers api call with each letter input into the search form
search = () => {
  let value = document.getElementById("search-value").value;
  getDrinks(baseUrl, currentCoffeType, value)
}

