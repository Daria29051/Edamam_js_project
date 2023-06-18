// Даша
const recipeContainer = document.querySelector('.recipe');//элемент-контейнер для вставки карточки рецепта
const recipeInput = document.getElementById('recipe-input'); //инпут ввода названия рецепта
const cuisineTypeInput = document.getElementById('cuisine-type'); //выпад список выбора cuisine-type
const dishTypeInput = document.getElementById('dish-type'); //выпад список выбора dish-type
const searchButton = document.querySelector('.search-screen__button');

//функция выбора meal-type
function getMealType() {
    let checkboxes = document.querySelectorAll('input[name="meal-type"]:checked');
    let output = [];
    checkboxes.forEach((checkbox) => {
        output.push(checkbox.value);
    });
    console.log(output); 
}

//функция выбора diet-type
function getDietType() {
    let checkboxes = document.querySelectorAll('input[name="diet-type"]:checked');
    let output = [];
    checkboxes.forEach((checkbox) => {
        output.push(checkbox.value);
    });
    console.log(output);
}

//функция выбора extra-params
function getExtraParams() {
    let checkboxes = document.querySelectorAll('input[name="extra-param"]:checked');
    let output = [];
    checkboxes.forEach((checkbox) => {
        output.push(checkbox.value);
    });
    console.log(output);
}


searchButton.addEventListener('click',getMealType );
searchButton.addEventListener('click',getDietType );
searchButton.addEventListener('click',getExtraParams);



// заполняем карточку рецепта
function getRecipeByName() {
    recipeContainer.innerHTML="";
    fetch(`https://api.edamam.com/search?app_id=49cb99a1&app_key=6fdb65e8bebf7aae4729017d5d272627&q=${recipeInput.value}`)
    .then(response =>response.json())
    .then(data => {
    console.log(data);
    const recipesArray = data.hits;
    console.log(recipesArray);
    for (let recipe of recipesArray) {
    console.log(recipe);
    console.log(recipe.recipe.label);
    console.log(recipe.recipe.calories);
    console.log(recipe.recipe.ingredients);
    const ingredientsArray = recipe.recipe.ingredients;
    const ingredientText=document.createElement('p'); //создаём элемент под вывод ингредиентов
    for (let ingredient of ingredientsArray) {
        console.log(ingredient.text);
        ingredientText.innerText+=`${ingredient.text} <br>`
    } //выводим текст каждого из ингредиентов
    
    recipeContainer.innerHTML+=`<div class="recipe__container">
    <div class="recipe__wrapper">
        <div class="recipe__description">
            <h3>${recipe.recipe.label}</h3>
            <div class="recipe__text">
            <div class="recipe__ingredients">
                <h4>Ingredients:</h4>
                <p>${ingredientText.innerText}</p>
            </div>
            <div class="recipe__calories">
                <h4>Calories:</h4>
                <p>${Math.round(recipe.recipe.calories)} cal</p>
            </div>
            </div>
            <a href="${recipe.recipe.url}" target="_blank"><button class="recipe__btn">To the recipe</button></a>
        </div>
        <div class="recipe__img">
            <img
                src="${recipe.recipe.image}"
                alt="recipe-image"
            />
        </div>
    </div>
    </div> `
    }}
    )
    .catch (error => console.log(error));
    }


// функция получения данных с API
function getRecipe() {
recipeContainer.innerHTML="";
fetch(`https://api.edamam.com/search?app_id=49cb99a1&app_key=6fdb65e8bebf7aae4729017d5d272627&q=${recipeInput.value}&cuisineType=${cuisineTypeInput.value}&dishType=${dishTypeInput.value}`)
.then(response =>response.json())
.then(data => {
console.log(data);
const recipesArray = data.hits;
console.log(recipesArray);
for (let recipe of recipesArray) {
console.log(recipe);
console.log(recipe.recipe.label);
console.log(recipe.recipe.calories);
console.log(recipe.recipe.ingredients);
const ingredientsArray = recipe.recipe.ingredients;
const ingredientText=document.createElement('p'); //создаём элемент под вывод ингредиентов
for (let ingredient of ingredientsArray) {
    console.log(ingredient.text);
    ingredientText.innerText+=`${ingredient.text} <br>`
} //выводим текст каждого из ингредиентов

recipeContainer.innerHTML+=`<div class="recipe__container">
<div class="recipe__wrapper">
    <div class="recipe__description">
        <h3>${recipe.recipe.label}</h3>
        <div class="recipe__text">
        <div class="recipe__ingredients">
            <h4>Ingredients:</h4>
            <p>${ingredientText.innerText}</p>
        </div>
        <div class="recipe__calories">
            <h4>Calories:</h4>
            <p>${Math.round(recipe.recipe.calories)} cal</p>
        </div>
        </div>
        <a href="${recipe.recipe.url}" target="_blank"><button class="recipe__btn">To the recipe</button></a>
    </div>
    <div class="recipe__img">
        <img
            src="${recipe.recipe.image}"
            alt="recipe-image"
        />
    </div>
</div>
</div> `
}}
)
.catch (error => console.log(error));
}

// функция выборазапроса в зависимости от выбора параметров поиска
function chooseOption() {
    if ((cuisineTypeInput.value==="") || (dishTypeInput.value==="")) {
        getRecipeByName();
    } else {
        getRecipe();
    }
};

// добавляем обработчик событий на Search
searchButton.addEventListener('click', chooseOption);

