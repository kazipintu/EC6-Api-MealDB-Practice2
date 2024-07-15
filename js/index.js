//console.log('connected');
const searchFood = () => {
  const searchInput = document.getElementById("search-input");
  const serachInputValue = searchInput.value;
  //console.log(serachInputValue);

  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${serachInputValue}`)
    .then(response => response.json())
    .then(data => displayMeals(data.meals))
}

const displayMeals = (foods) => {

  const displayFood = document.getElementById('display-meals');

  foods.forEach(food => {

    const displayDiv = document.createElement('div');
    displayDiv.classList.add("col")

    displayDiv.innerHTML = `
      <div onclick="loadSingleMeal(${food.idMeal})" class="card">
        <img src="${food.strMealThumb}" class="..." alt="...">
        <div class="card-body">
          <h5 class="card-title">${food.strMeal}</h5>
          <p class="card-text">Recipe: ${food.strInstructions.slice(0, 200)}....</p>
          <button type="button" class="btn btn-outline-primary w-100">Show Details</button>
        </div>
      </div>

`
    displayFood.appendChild(displayDiv)
  })

}

const loadSingleMeal = (idRecipe) => {
  //console.log(idRecipe);
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idRecipe}`
  //console.log(url);
  fetch(url)
    .then(response => response.json())
    .then(data => displaySingleMeal(data.meals[0]))
}

const displaySingleMeal = (recipe) => {
  //console.log(recipe);

  const displayMealDiv = document.getElementById('single-meal');
  displayMealDiv.textContent = "";

  const displayRecipeDiv = document.createElement('div');
  displayRecipeDiv.classList.add("col")

  displayRecipeDiv.innerHTML = `
    <div onclick="loadSingleMeal(${recipe.idMeal})" class="card single-meal">
      <img src="${recipe.strMealThumb}" class="img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${recipe.strMeal}</h5>
        <p class="card-text">Recipe: ${recipe.strInstructions.slice(0, 400)}....</p>
        <button type="button" class="btn btn-outline-primary w-100">Show Details</button>
      </div>
    </div>

`
  displayMealDiv.appendChild(displayRecipeDiv)
  window.scrollTo({ top: 0, behavior: 'instant' })

}
