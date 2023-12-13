// ... your existing code ...

// function openModal(title, image, instructions, ingredients) {
//   var modal = document.getElementById("mealModal");
//   var modalTitle = document.getElementById("modal-title");
//   var modalImage = document.getElementById("modal-image");
//   var modalInstructions = document.getElementById("modal-instructions");
//   console.log("HI");
//   modalTitle.innerText = "Random meal ingredients";
//   let ulTag = document.createElement("ul");
//   ingredients.forEach((e) => {
//     let liTag = document.createElement("li");
//     liTag.innerText = e;
//     ulTag.append(liTag);
//   });
//   // modalImage.src = image;
//   // modalInstructions.innerText = instructions;

//   modal.style.display = "block";
// }

function closeModal() {
  document.getElementById("mealModal").style.display = "none";
}

// ... your existing code ...

const apiurl = "https://www.themealdb.com/api/json/v1/1/random.php";

async function fetchDataFromApi(apiurl) {
  try {
    const response = await axios.get(apiurl);
    return response.data;
    console.log(response.data);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// fetchDataFromApi();

function displayRandomMeal(meal) {
  const randomMealContent = document.getElementById("randomMealContent");
  randomMealContent.innerHTML = `
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}" id="randomMealImage"/>
      <h2>${meal.strMeal}</h2>
    `;
  document.body.append(randomMealContent);
  // Add event listener to the random image using JavaScript
  const randomImage = document.getElementById("randomMealImage");
  let ingredients = [
    meal.strIngredient1,
    meal.strIngredient2,
    meal.strIngredient3,
    meal.strIngredient4,
    meal.strIngredient5,
    meal.strIngredient6,
    // meal.strIngredient7,
    // meal.strIngredient8,
    // meal.strIngredient9,
    // meal.strIngredient10,
    // meal.strIngredient11,
    // meal.strIngredient12,
    // meal.strIngredient13,
  ];

  console.log(ingredients);
  randomImage.addEventListener("click", () => {
    openModal(
      meal.strMeal,
      meal.strMealThumb,
      meal.strInstructions,
      ingredients
    );
  });
}

function openModal(title, image, instructions, ingredients) {
  var modal = document.getElementById("mealModal");
  var modalTitle = document.getElementById("modal-title");
  var modalImage = document.getElementById("modal-image");
  var modalInstructions = document.getElementById("modal-instructions");

  modalTitle.innerText = title;

  console.log("HI");
  modalTitle.innerText = "Random meal ingredients";
  let ulTag = document.createElement("ul");
  ingredients.forEach((e) => {
    let liTag = document.createElement("li");
    liTag.innerText = e;
    ulTag.append(liTag);
  });
  modalInstructions.append(ulTag);
  modal.style.display = "block";
}

function closeModal() {
  document.getElementById("mealModal").style.display = "none";
}

fetchDataFromApi(apiurl)
  .then((data) => {
    const randomMeal = data.meals[0];
    console.log(randomMeal);
    displayRandomMeal(randomMeal);
  })
  .catch((error) => {
    console.error(error);
  });

function searchByCategory() {
  var userInput = document.querySelector(".inputbox").value;

  // Check if the user input is not empty
  if (userInput.trim() !== "") {
    // Make a request to the API using Axios
    axios
      .get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${userInput}`)
      .then(function (response) {
        var meals = response.data.meals;
        displaySearchedMeals(meals);
      })
      .catch(function (error) {
        console.error("Error fetching data from the API:", error);
        displayError();
      });
  }
}

// ... your existing JavaScript code ...

function displaySearchedMeals(meals) {
  var container = document.getElementById("searchedMealContainer");
  container.innerHTML = "";

  if (meals) {
    meals.forEach(function (meal) {
      var img = document.createElement("img");
      img.src = meal.strMealThumb;
      img.alt = meal.strMeal;
      img.onclick = function () {
        openModal(meal.strMeal, meal.strMealThumb, meal.strInstructions);
      };

      container.appendChild(img);
    });

    // Calculate the number of columns and rows
    var columns = 4;
    var rows = Math.ceil(meals.length / columns);

    // Set the grid template columns and rows dynamically
    container.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${rows}, 1fr)`;

    document.getElementById("searchedMealText").innerText =
      "Click on a meal to view ingredients.";
  } else {
    document.getElementById("searchedMealText").innerText =
      "No meals found for the given category.";
  }
}

// ... your existing JavaScript code ...

function displayError() {
  console.error("An error occurred.");
}

function displaySearchedMeals(meals) {
  var container = document.getElementById("searchedMealContainer");
  container.innerHTML = "";

  if (meals) {
    meals.forEach(function (meal) {
      var mealContainer = document.createElement("div");
      mealContainer.className = "meal-item";

      var img = document.createElement("img");
      img.src = meal.strMealThumb;
      img.alt = meal.strMeal;
      img.onclick = function () {
        openModal(meal.strMeal, meal.strMealThumb, meal.strInstructions);
      };

      var caption = document.createElement("p");
      caption.innerText = meal.strMeal;

      mealContainer.appendChild(img);
      mealContainer.appendChild(caption);
      container.appendChild(mealContainer);
    });

    // Calculate the number of columns and rows
    var columns = 4;
    var rows = Math.ceil(meals.length / columns);

    // Set the grid template columns and rows dynamically
    container.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${rows}, 1fr)`;

    document.getElementById("searchedMealText").innerText =
      "Click on a meal to view ingredients.";
  } else {
    document.getElementById("searchedMealText").innerText =
      "No meals found for the given category.";
  }
}
