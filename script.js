

const baseUrl = 'https://api.sampleapis.com/coffee';
let currentCoffeType;

// generating random drink of the day
let counter = Math.round(Math.random());
let urlAddition = counter ? "hot" : "iced";

fetch(`${baseUrl }/${urlAddition}`)
  .then(data => data.json())
  .then(json =>{
    let featuredDrinks = [];
    for(let i=0; i<2; i++){
      let counter = Math.floor(Math.random()*json.length);
      featuredDrinks.push(json[counter])
    }
    if (featuredDrinks[0].title === featuredDrinks[1].title){
      let newCounter = Math.floor(Math.random()*json.length);
      featuredDrinks.pop()
      featuredDrinks.push(json[newCounter])
    }

  document.getElementById("btn-home").classList.add("button-active");
  buildingCards(featuredDrinks);
})



// function that builds out coffee cards dynamicaly
buildingCards = (json) => {
  // console.log(json)
    let cards = document.getElementById("coffe-cards-container");

    // removing previously added cards
    if (json.length < 1){
      const emptySearchMessage = document.createElement("h3");
      emptySearchMessage.innerText = "No coffe found with provided name! Please enter correct name.";
      cards.appendChild(emptySearchMessage);
    }

    //building new cards
    for(let i=0; i<json.length; i++) {

      const card = document.createElement("div");
      card.classList.add("card-container");

      // title
      const title = document.createElement("h4");
      title.innerText = json[i].title;
      title.classList.add("name");
      card.appendChild(title);

      // image
      const image = document.createElement("img");
      image.src = json[i].image;
      image.classList.add("image");
      card.appendChild(image);

      // description
      const description = document.createElement("p");
      description.innerText = json[i].description;
      description.classList.add("description");
      card.appendChild(description);

      // ingredients
      const ingredients = document.createElement("div");
      ingredients.classList.add("ingredients-container");

      const ingredientHeader = document.createElement("h5");
      ingredientHeader.innerHTML = "Ingredients:";
      ingredientHeader.classList.add("ingredient-header");
      card.appendChild(ingredientHeader);

      let dairyFree = true;
      let sugarFree = true;

      for(let j=0; j<json[i].ingredients.length; j++) {

        //checking ingredients for dairy
        if (json[i].ingredients[j].toLowerCase().includes("milk") || json[i].ingredients[j].toLowerCase().includes("foam") || json[i].ingredients[j].toLowerCase().includes("cream") || json[i].ingredients[j].toLowerCase().includes("whip*")){
          dairyFree = false; 
        }

        //checking ingredients for sugar
        if (json[i].ingredients[j].toLowerCase().includes("chocolate") || json[i].ingredients[j].toLowerCase().includes("ice cream") || json[i].ingredients[j].toLowerCase().includes("sugar") || json[i].ingredients[j].toLowerCase().includes("sweet")){
          sugarFree = false;    
        }

        // adding ingredients
        const ingredient = document.createElement("p");
        ingredient.innerText = json[i].ingredients[j];
        ingredient.classList.add("ingredients");
        ingredients.appendChild(ingredient);
      }
      card.appendChild(ingredients);

      // adding dietary comments
      const dieteryContainier = document.createElement("div");
      dieteryContainier .classList.add("dietary-notes");

      if (dairyFree){
        let dairy = document.createElement("p");
        dairy.innerText = "DairyFree";
        dieteryContainier.appendChild(dairy);
        card.appendChild(dieteryContainier);
      }

      if (sugarFree){
        // adding vertical divider only if dring is dairy free
        if (dairyFree){
          let separator = document.createElement("p");
          separator.innerText = " | ";
          dieteryContainier.appendChild(separator);
        } 
        let sugar = document.createElement("p");
        sugar.innerText = "SugarFree";
        dieteryContainier.appendChild(sugar);
        card.appendChild(dieteryContainier);
      }

      // adding wikipedia link
      const a = document.createElement("a");
      let link = document.createTextNode("Open in Wikipedia >");
      a.appendChild(link); 
      a.title = "Wiki link"; 
      a.href = `https://en.wikipedia.org/wiki/${json[i].title.replace(/\s/g, '_')}`; 
      console.log(json[i].title.replace(/\s/g, '_'));
      a.setAttribute("target", "_blank");
      card.appendChild(a);

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

// Buttons event listeners that also fire api call 

// home
document.getElementById("btn-home").addEventListener("click", function(event){
  event.preventDefault();
  location.reload();
  
});

// hot drinks
document.getElementById("btn-hot").addEventListener("click", function(event){
  event.preventDefault();

  document.getElementById("btn-home").classList.remove("button-active");
  document.getElementById("btn-iced").classList.remove("button-active");
  document.getElementById("btn-hot").classList.add("button-active");

  document.getElementById("search").classList.remove("show-hide");
  document.querySelector("h2").classList.add("show-hide");
  document.getElementById("search-value").placeholder = "Search HOT coffee drinks"

  currentCoffeType = "hot";
  getDrinks(baseUrl, currentCoffeType)
});

// iced drinks
document.getElementById("btn-iced").addEventListener("click", function(event){
  event.preventDefault();

  document.getElementById("btn-home").classList.remove("button-active");
  document.getElementById("btn-hot").classList.remove("button-active");
  document.getElementById("btn-iced").classList.add("button-active");

  document.getElementById("search").classList.remove("show-hide");
  document.querySelector("h2").classList.add("show-hide");
  document.getElementById("search-value").placeholder = "Search ICED coffee drinks"

  currentCoffeType = "iced"
  getDrinks(baseUrl, currentCoffeType)
});

// func that triggers api call with each letter input into the search form
search = () => {
  let value = document.getElementById("search-value").value;
  getDrinks(baseUrl, currentCoffeType, value)
}

