//All of this first stuff is either Landgreen or AI
const canvas = document.getElementById("canvas-1");
const ctx = canvas.getContext("2d");

// Resize canvas function
function resizeCanvas() {
  canvas.width = window.innerWidth - 20;
  canvas.height = window.innerWidth * 0.55;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Mouse input
let mouse = {
  down: false,
  x: 0,
  y: 0
};
canvas.addEventListener("mousemove", (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});
canvas.addEventListener("mousedown", (event) => {
  mouse.down = true;
  console.log(mouse);
});
canvas.addEventListener("mouseup", (event) => {
  mouse.down = false;
});

//___________________new key input method___________________
let left = false;
let right = false;
let up = false;
let down = false;

window.addEventListener("keyup", function (event) {
  switch (event.code) {
    case "ArrowRight":
      right = false;
      break;
    case "ArrowLeft":
      left = false;
      break;
    case "ArrowUp":
      up = false;
      break;
    case "ArrowDown":
      down = false;
      break;
  }
});

window.addEventListener("keydown", function (event) {
  console.log(event.code);
  switch (event.code) {
    case "ArrowRight":
      right = true;
      break;
    case "ArrowLeft":
      left = true;
      break;
    case "ArrowUp":
      up = true;
      break;
    case "ArrowDown":
      down = true;
      break;
  }
});

//declaring some locations for drawing
let startX = canvas.width / 6;
let startY = canvas.height / 6;

//initializes the color to white so the color can change to black when someone guesses a letter right
let textColor = "white";


let category = ""
let word = ""

//this is where my code runs into an issue and causes it to not work
let mistakes = 0

//declaring radius for the hangman
const radius = canvas.width * 0.0569;
const eyeRadius = canvas.width * 0.005;
const mouthRadius = canvas.width * 0.03;

const foods = [
  "Asparagus",
  "Biscuits",
  "Cookie",
  "Cracker",
  "Ginger snap",
  "Bread",
  "Bagel",
  "Bialy",
  "Croissant",
  "Baguette",
  "Toast",
  "Burrito",
  "Cabbage",
  "Cake",
  "Cheesecake",
  "Chocolate cake",
  "Carrot cake",
  "Strawberry cake",
  "Ice-cream cake",
  "Vanilla cake",
  "Cupcake",
  "Chocolate",
  "Pancake",
  "Poundcake",
  "Chopped liver",
  "Cheese",
  "Gruyère cheese",
  "Mozzarella",
  "Brie",
  "Feta",
  "Blue cheese",
  "Parmesan",
  "Cow milk",
  "Soy milk",
  "Almond milk",
  "Congee",
  "Donuts",
  "Jam",
  "Sprinkles",
  "Donut holes",
  "Dumplings",
  "Arepa",
  "Pierogi",
  "Wonton",
  "Fruits",
  "Apricot",
  "Apple",
  "Banana",
  "Cantaloupe",
  "Orange",
  "Cherry",
  "Kiwi",
  "Watermelon",
  "Avocado",
  "Pear",
  "Pineapple",
  "Strawberry",
  "Blueberry",
  "Raspberry",
  "Blackberry",
  "French fries",
  "Poutine",
  "Cereal",
  "Corn",
  "Popcorn",
  "Rice",
  "Ice cream",
  "Vanilla",
  "Mashed potatoes",
  "Beef",
  "Wagyu",
  "Steak",
  "Pork",
  "Bacon",
  "Ham",
  "Buffalo wing",
  "Chicken nuggets",
  "Roast chicken",
  "Ribs",
  "Fish",
  "Salmon",
  "Shrimp and prawn",
  "Eggs",
  "Scrambled egg",
  "Omelette",
  "Boiled egg",
  "Milk",
  "Onion rings",
  "Pasta",
  "Lasagna",
  "Ravioli",
  "Spaghetti",
  "Fettuccine",
  "Pudding",
  "Pupusa",
  "Pie",
  "Apple pie",
  "Cream pie",
  "Pumpkin pie",
  "Key lime pie",
  "Peach pie",
  "Pizza",
  "Pepperoni",
  "Rolls",
  "Croquette",
  "Egg roll",
  "Spring roll",
  "Burrito",
  "Sandwiches",
  "Vegetable sandwich",
  "Grilled Cheese",
  "Panini",
  "Cheeseburgers",
  "Bacon cheeseburger",
  "Hamburgers",
  "Whopper",
  "Chicken burger",
  "Hot dogs",
  "Submarine sandwich",
  "Soup",
  "Chowder",
  "Clam Chowder",
  "Corn chowder"
];

function generateFood() {
  //returns a random food
  const randomFoodIndex = Math.floor(Math.random() * foods.length);
  return foods[randomFoodIndex];
}


const randomFood = generateFood();
//splits random food into a array with each letter
const foodArray = randomFood.split("");

//this is what rund when the category selector button is pushed
function consoleFood() {
  category = "Food"
  console.log(foodArray);

  let xPosition = canvas.width / 2.8;
  let yPosition = canvas.height / 2;

  for (let i = 0; i < foodArray.length; i++) {
    let letter = foodArray[i].toUpperCase(); //<--makes it all uppercase so it doesn't get confused when i

    //AI did this
    let letterColor = guessedLetters.includes(letter) ? "black" : "white";

    ctx.font = "30px monospace";
    ctx.fillStyle = letterColor; // Set color based on guessed letters

    ctx.fillText(foodArray[i], xPosition, yPosition);
    xPosition += 30;

    // Underline the letter if it's not a space
    if (foodArray[i] != " ") {
      var underline = ctx.measureText(foodArray[i]);
      ctx.fillStyle = "black";
      ctx.fillRect(xPosition - 30, yPosition, underline.width, 3);
    }
  }
}

// AI did this
function updateCanvasFood() {
  ctx.clearRect(canvas.width * 0.32, 0, canvas.width, canvas.height); // Clear the canvas
  consoleFood();
}

const animal = [
  "Dog",
  "Cow",
  "Cat",
  "Horse",
  "Donkey",
  "Tiger",
  "Lion",
  "Panther",
  "Leopard",
  "Cheetah",
  "Bear",
  "Elephant",
  "Polar bear",
  "Turtle",
  "Tortoise",
  "Crocodile",
  "Rabbit",
  "Porcupine",
  "Hare",
  "Hen",
  "Pigeon",
  "Albatross",
  "Crow",
  "Fish",
  "Dolphin",
  "Frog",
  "Whale",
  "Alligator",
  "Eagle",
  "Flying squirrel",
  "Ostrich",
  "Fox",
  "Goat",
  "Jackal",
  "Emu",
  "Armadillo",
  "Eel",
  "Goose",
  "Arctic fox",
  "Wolf",
  "Beagle",
  "Gorilla",
  "Chimpanzee",
  "Monkey",
  "Beaver",
  "Orangutan",
  "Antelope",
  "Bat",
  "Badger",
  "Giraffe",
  "Hermit Crab",
  "Giant Panda",
  "Hamster",
  "Cobra",
  "Hammerhead shark",
  "Camel",
  "Hawk",
  "Deer",
  "Chameleon",
  "Hippopotamus",
  "Jaguar",
  "Chihuahua",
  "King Cobra",
  "Ibex",
  "Lizard",
  "Koala",
  "Kangaroo",
  "Iguana",
  "Llama",
  "Chinchillas",
  "Dodo",
  "Jellyfish",
  "Rhinoceros",
  "Hedgehog",
  "Zebra",
  "Possum",
  "Wombat",
  "Bison",
  "Bull",
  "Buffalo",
  "Sheep",
  "Meerkat",
  "Mouse",
  "Otter",
  "Sloth",
  "Owl",
  "Vulture",
  "Flamingo",
  "Racoon",
  "Mole",
  "Duck",
  "Swan",
  "Lynx",
  "Monitor lizard",
  "Elk",
  "Boar",
  "Lemur",
  "Mule",
  "Baboon",
  "Mammoth",
  "Blue whale",
  "Rat",
  "Snake",
  "Peacock"
];

function generateAnimal() {
  const randomAnimalIndex = Math.floor(Math.random() * animal.length);
  return animal[randomAnimalIndex];
}

const randomAnimal = generateAnimal();
const animalArray = randomAnimal.split("");

function consoleAnimal() {
  category = "Animal"
  console.log(animalArray);

  
  //where on the canvas the text + lines show up
  let xPosition = canvas.width / 2.8;
  let yPosition = canvas.height / 2;

  for (let i = 0; i < animalArray.length; i++) {
    let letter = animalArray[i].toUpperCase(); //<--makes it all uppercase so it doesn't get confused when i

    //AI did this
    let letterColor = guessedLetters.includes(letter) ? "black" : "white";
    //if guessed letters includes the letter the player typed, letterColor equals black, else equals white (cant see)

    ctx.font = "30px monospace"; // makes the lines readable and the game harder
    ctx.fillStyle = letterColor; // Set color based on guessed letters

    ctx.fillText(animalArray[i], xPosition, yPosition);
    xPosition += 30;

    // Underline the letter if it's not a space
    if (animalArray[i] != " ") {
      var underline = ctx.measureText(animalArray[i]);
      ctx.fillStyle = "black";
      ctx.fillRect(xPosition - 30, yPosition, underline.width, 3);
    }
  }
}

// AI did this
function updateCanvasAnimal() {
  ctx.clearRect(canvas.width * 0.32, 0, canvas.width, canvas.height); // Clear the canvas except the part where the hangman is
  consoleAnimal();
}

const movies = [
  "The Shawshank Redemption",
  "The Godfather",
  "The Dark Knight",
  "Schindler's List",
  "Pulp Fiction",
  "The Lord of the Rings: The Return of the King",
  "Forrest Gump",
  "Inception",
  "Fight Club",
  "Star Wars: Episode V - The Empire Strikes Back",
  "The Matrix",
  "Goodfellas",
  "The Silence of the Lambs",
  "The Usual Suspects",
  "Se7en",
  "The Lion King",
  "Gladiator",
  "Parasite",
  "Interstellar",
  "The Green Mile",
  "Back to the Future",
  "The Prestige",
  "The Departed",
  "Whiplash",
  "The Shining",
  "City of God",
  "The Pianist",
  "A Clockwork Orange",
  "The Dark Knight Rises",
  "The Intouchables",
  "Jaws",
  "Casablanca",
  "Citizen Kane",
  "Gone with the Wind",
  "The Wizard of Oz",
  "12 Angry Men",
  "Lawrence of Arabia",
  "It's a Wonderful Life",
  "The Godfather: Part II",
  "A Beautiful Mind",
  "Titanic",
  "American History X",
  "The Revenant",
  "Memento",
  "The Social Network",
  "The Grand Budapest Hotel",
  "Oldboy",
  "The Wolf of Wall Street",
  "The Bridge on the River Kwai",
  "Amadeus",
  "The Terminator",
  "The Big Lebowski",
  "No Country for Old Men",
  "The Sound of Music",
  "The Fugitive",
  "The Breakfast Club",
  "There Will Be Blood",
  "The Princess Bride",
  "Shutter Island",
  "The Hunt",
  "Blade Runner 2049",
  "Joker",
  "The Martian",
  "Her",
  "The Exorcist",
  "The Dark Knight Trilogy",
  "The Incredibles",
  "Mad Max: Fury Road",
  "Eternal Sunshine of the Spotless Mind",
  "Sicario",
  "Moonlight",
  "Gladiator",
  "The Godfather: Part III",
  "The King's Speech",
  "Slumdog Millionaire",
  "The Great Escape",
  "The Hurt Locker",
  "Inglourious Basterds",
  "The Curious Case of Benjamin Button",
  "Fargo",
  "The Incredibles 2",
  "Batman Begins",
  "The Shape of Water",
  "The Sixth Sense",
  "The Prestige",
  "A Ghost Story",
  "The Pianist",
  "Trainspotting",
  "The Conjuring",
  "Requiem for a Dream"
];

function generateMovie() {
  const randomMovieIndex = Math.floor(Math.random() * movies.length);
  return movies[randomMovieIndex];
}

const randomMovie = generateMovie();
const movieArray = randomMovie.split("");

function consoleMovie() {
  category = "Movie"
  console.log(movieArray);

  let xPosition = canvas.width / 2.8;
  let yPosition = canvas.height / 2;

  for (let i = 0; i < movieArray.length; i++) {
    let letter = movieArray[i].toUpperCase(); //<--makes it all uppercase so it doesn't get confused when i

    //AI did this
    let letterColor = guessedLetters.includes(letter) ? "black" : "white";

    ctx.font = "30px monospace";
    ctx.fillStyle = letterColor; // Set color based on guessed letters

    ctx.fillText(movieArray[i], xPosition, yPosition);
    xPosition += 30;

    // Underline the letter if it's not a space
    if (movieArray[i] != " ") {
      var underline = ctx.measureText(movieArray[i]);
      ctx.fillStyle = "black";
      ctx.fillRect(xPosition - 30, yPosition, underline.width, 3);
    }
  }
}

// AI did this
function updateCanvasMovie() {
  ctx.clearRect(canvas.width * 0.32, 0, canvas.width, canvas.height); // Clear the canvas
  consoleMovie();
}

//some of these are too long which is annoying
const countries = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cabo Verde",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Congo (Congo-Brazzaville)",
  "Congo (Congo-Kinshasa)",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czechia",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Eswatini",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Grenada",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Korea (North)",
  "Korea (South)",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "North Macedonia",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor-Leste",
  "Togo",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States of America",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Vatican City",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zambia",
  "Zimbabwe"
];

function generateCountry() {
  const randomCountriesIndex = Math.floor(Math.random() * countries.length);
  return countries[randomCountriesIndex];
}

const randomCountry = generateCountry();
const countryArray = randomCountry.split("");

function consoleCountry() {
  category = "Country"
  console.log(countryArray);

  let xPosition = canvas.width / 2.8;
  let yPosition = canvas.height / 2;

  for (let i = 0; i < countryArray.length; i++) {
    let letter = countryArray[i].toUpperCase(); //<--makes it all uppercase so it doesn't get confused 

    //AI did this
    let letterColor = guessedLetters.includes(letter) ? "black" : "white";

    ctx.font = "30px monospace";
    ctx.fillStyle = letterColor; // Set color based on guessed letters

    ctx.fillText(countryArray[i], xPosition, yPosition);
    xPosition += 30;

    // Underline the letter if it's not a space
    if (countryArray[i] != " ") {
      var underline = ctx.measureText(countryArray[i]);
      ctx.fillStyle = "black";
      ctx.fillRect(xPosition - 30, yPosition, underline.width, 3);
    }
  }
}

// AI did this
function updateCanvasCountry() {
  ctx.clearRect(canvas.width * 0.32, 0, canvas.width, canvas.height); // Clear the canvas
  consoleCountry();
}

//AI helped with some of this
let guessedLetters = []; // Array to store guessed letters

// Function to handle a letter being guessed
function guessLetter() {
  let typedLetter = document.getElementById("letter").value.toUpperCase(); // Get the guessed letter -- takes the letter that is typed and makes it uppercase
  if (typedLetter && !guessedLetters.includes(typedLetter)) {
    guessedLetters.push(typedLetter); // Add to guessed letters if it's not already guessed

    
    console.log(guessedLetters);
    
    //Landgreen helped with this and i dont entierly understand why its needed
    if(category === "Food"){
      updateCanvasFood();
    }
    else if(category === "Animal"){
      updateCanvasAnimal();
    }
     else if(category === "Movie"){
      updateCanvasMovie();
    } 
    else if(category === "Country"){
      updateCanvasCountry();
    } 
  }
  
  
  if(category === "Food"){
      word = foodArray;
    }
    else if(category === "Animal"){
      word = animalArray;
    }
     else if(category === "Movie"){
      word = movieArray;
    } 
    else if(category === "Country"){
      word = countryArray;
    }

//right here is the problem: mistakes incresdes no matter what letter is pressed
   if (!word.includes(letter)) {  // If the letter is not in the word
    mistakes++;
     console.log(mistakes)
  }
  
if(mistakes===1){
  //head

ctx.beginPath();
ctx.arc(
  startX + canvas.width / 11,
  startY + canvas.height / 20 + radius,
  radius,
  0,
  2 * Math.PI
);
ctx.stroke();
}
if(mistakes===2){
  ctx.beginPath();
ctx.moveTo(
  startX + canvas.width / 11,
  startY + canvas.height / 20 + radius * 2
);
   ctx.lineTo(
  startX + canvas.width / 11,
  startY + canvas.height / 20 + canvas.height / 2.3
);
ctx.stroke();
}

if(mistakes===3){
  ctx.beginPath();
ctx.moveTo(startX + canvas.width / 11, startY + canvas.height * 0.4);
ctx.lineTo(
  startX + canvas.width / 20,
  startY + canvas.height * 0.4 - canvas.height / 9
);
ctx.stroke();
}

if(mistakes===4){
  ctx.beginPath();
ctx.moveTo(startX + canvas.width / 11, startY + canvas.height * 0.4);
ctx.lineTo(
  startX + canvas.width / 7.6,
  startY + canvas.height * 0.4 - canvas.height / 9
);
ctx.stroke();
}

if(mistakes===5){
  ctx.beginPath();
ctx.moveTo(
  startX + canvas.width / 11,
  startY + canvas.height / 20 + canvas.height / 2.3
);
ctx.lineTo(
  startX + canvas.width / 20,
  startY + canvas.height / 20 + (canvas.height * 4) / 7
);
ctx.stroke();
}

if(mistakes===6){
 ctx.beginPath();
ctx.moveTo(
  startX + canvas.width / 11,
  startY + canvas.height / 20 + canvas.height / 2.3
);
ctx.lineTo(
  startX + canvas.width / 11 + canvas.width / 15,
  startY + canvas.height / 20 + (canvas.height * 4) / 7
);
ctx.stroke();
}

if(mistakes===7){
  ctx.beginPath();
ctx.arc(canvas.width * 0.24, canvas.height * 0.3, eyeRadius, 0, 2 * Math.PI);
ctx.stroke();
}

if(mistakes===8){
  ctx.beginPath();
ctx.arc(
  canvas.width * 0.24 + canvas.width * 0.04,
  canvas.height * 0.3,
  eyeRadius,
  0,
  2 * Math.PI
);
ctx.stroke();
}

if(mistakes===9){
  ctx.beginPath();
ctx.arc(canvas.width * 0.26, canvas.height * 0.35, mouthRadius, 0, Math.PI);
ctx.stroke();
}
}


//drawing thing that hangman hangs on
ctx.beginPath();
ctx.moveTo(startX, startY);
ctx.lineTo(startX, startY + canvas.height * 0.7);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(startX, startY);
ctx.lineTo(startX + canvas.width / 11, startY);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(startX + canvas.width / 11, startY);
ctx.lineTo(startX + canvas.width / 11, startY + canvas.height / 20);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(startX - canvas.width / 12, startY + canvas.height * 0.7);
ctx.lineTo(startX + canvas.width / 12, startY + canvas.height * 0.7);
ctx.stroke();