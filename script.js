// for dev tool testing
console.log('testing');

// Array of image for guess match
const cardsArray = [
    { 'name': 'CSS', 'img': 'https://github.com/robgmerrill/img/blob/master/css3-logo.png?raw=true', },
    { 'name': 'HTML', 'img': 'https://github.com/robgmerrill/img/blob/master/html5-logo.png?raw=true', },
    { 'name': 'jQuery', 'img': 'https://github.com/robgmerrill/img/blob/master/jquery-logo.png?raw=true', },
    { 'name': 'JS', 'img': 'https://github.com/robgmerrill/img/blob/master/js-logo.png?raw=true', },
    { 'name': 'Node', 'img': 'https://github.com/robgmerrill/img/blob/master/nodejs-logo.png?raw=true', },
    { 'name': 'Photo Shop', 'img': 'https://github.com/robgmerrill/img/blob/master/photoshop-logo.png?raw=true', },
    { 'name': 'PHP', 'img': 'https://github.com/robgmerrill/img/blob/master/php-logo_1.png?raw=true', },
    { 'name': 'Python', 'img': 'https://github.com/robgmerrill/img/blob/master/python-logo.png?raw=true', },
    { 'name': 'Ruby', 'img': 'https://github.com/robgmerrill/img/blob/master/rails-logo.png?raw=true', },
    { 'name': 'Sass', 'img': 'https://github.com/robgmerrill/img/blob/master/sass-logo.png?raw=true', },
    { 'name': 'Sublime', 'img': 'https://github.com/robgmerrill/img/blob/master/sublime-logo.png?raw=true', },
    { 'name': 'Wordpress', 'img': 'https://github.com/robgmerrill/img/blob/master/wordpress-logo.png?raw=true', },
];

// cardArray[0].name; //'CSS'
// cardArray[0].img; // 'https://github.com/robgmerrill/img/blob/master/sass-logo.png?raw=true'

// Duplicate the cardsArry using concat(cardsArray)
const gamegrid = cardsArray.concat(cardsArray);

// Randomize game grid on each load so each image will be random
gamegrid.sort(function(){
    return 0.5 - Math.random();
})

// 
const game = document.getElementById('game-board');
// Create a section element and assign it to variable grida class of grid


const grid = document.createElement('section')
// Give a section element class of grid
grid.setAttribute('class', 'grid');

// append the child grid to game
game.appendChild(grid)

// loop through each item in our cardArrays
for (let i = 0; i < gamegrid.length; i++) {
    // const element = array[index];

    // create a div element and assign to variable card
    const card = document.createElement('div');
    // Apply a card class to that div
    card.classList.add('card');
    // set the dataset.name attribute of the div to the cardsArray name
    card.dataset.name = gamegrid[i].name;
    // Apply background image of the div to the cardaArray image
    card.style.backgroundImage = `url(${gamegrid[i].img})`;
    // Append the div to the grid section
    grid.appendChild(card);
};

// store first and second selected cards 
let firstGuess = '';
let secondGuess = '';


// limiting only to cards to select at a time and reset
let count = 0
let previousTarget = null;

let delay =200;// 1 sec


// add match css by using querySelectorAll
const match = function(){
    const selected = document.querySelectorAll('.selected');
    for (i =0;i<selected.length; i++){
        selected[i].classList.add('match');
    }
};

// Reset guesses after two attempts
let resetGuesses = function(){
    firstGuess = "";
    secondGuess = "";
    count =0;
    previousTarget = null;

    let selected  = document.querySelectorAll('.selected');
    for (i=0; i < selected.length; i++){
        selected[i].classList.add('aftermatch');
        selected[i].classList.remove('selected');
        
    }

}

// add event listener to grid, when any card is clicked the selected class should allied to each card
grid.addEventListener('click', function(e){
    let clicked = e.target;
    // exlcuding the section element
    if (clicked.nodeName === 'SECTION' || clicked === previousTarget || clicked.parentNode.classList.contains('match') || clicked.parentNode.classList.contains('selected') ){
        return;
    }
    // limiting only to cards to select at a time and reset
    if (count < 2) {
        count++;
        if (count === 1){
            firstGuess = clicked.dataset.name;
            clicked.classList.add('selected');
        }else{
            secondGuess = clicked.dataset.name;
            clicked.classList.add('selected');
        }
        // if watched qguess are not empty
        if (firstGuess !== "" && secondGuess !== ""){
            // and the firstguess matches secondguess
            if (firstGuess === secondGuess){
                // run the match function
                match();
                // add delay to show the match
                setTimeout(match,delay);
                setTimeout(resetGuesses,delay)
                // resetGuesses();

            }else{
                setTimeout(resetGuesses,delay)
                // resetGuesses();
            }
        }
        previousTarget= clicked;
    }
   
})


