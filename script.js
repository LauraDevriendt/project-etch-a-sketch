
/****** Choose gridsize *******/

//link button and gridcontainer to javascript
document.getElementById("choose-size-button").addEventListener("click", setGrid);
const gridContainer = document.querySelector(".grid-container");

// ask user how many rows and columns he likes (only positive integers allowed)
function setGrid(){
    do{
        var numberOfColumns = parseInt(window.prompt("How many columns you like (max 100)?", ""), 10);
    }while(isNaN(numberOfColumns) || numberOfColumns > 100 || numberOfColumns < 1);
    
    do{
        var numberOfRows = parseInt(window.prompt("How many rows you like (max 100)?", ""), 10);
    }while(isNaN(numberOfRows) || numberOfRows > 100 || numberOfRows < 1);

grid(numberOfColumns, numberOfRows);
}

//setting up the grid that is choosen
function grid(numberOfColumns, numberOfRows) {
    // Set grid container
    gridContainer.style.gridTemplateColumns = "repeat(" + numberOfColumns + ", minmax(" + gridContainer.clientWidth/numberOfColumns + "px, 1fr))";
    gridContainer.style.gridTemplateRows = "repeat(" + numberOfRows + ", minmax(" + gridContainer.clientHeight/numberOfRows + "px, 1fr))";
    // Add grid items (squares)
    for (let r = 1; r <= numberOfRows; r++){
        for (let c = 1; c <= numberOfColumns; c++){
            let gridSquare = document.createElement("div");
            gridSquare.setAttribute("grid-column", c);
            gridSquare.setAttribute("grid-row", r);
            gridSquare.classList.add('square-border');
            gridSquare.classList.add('grid-square');
            gridContainer.appendChild(gridSquare);
        }
    }
    
}
/****** concerning color when hovering *******/
let isRandomOn = false;

// which color?
function setColorByHover(){
    const gridsquares = document.querySelectorAll('.grid-square');

    
    gridsquares.forEach((e) => {  
        e.addEventListener('mouseover', () => {
            if (isRandomOn == false){
                e.style.background = 'black';
            }else if (isRandomOn == true){
                let randomColor = RandomColor(); 
                e.style.backgroundColor = randomColor;
            } 
        });
    })
}



// random color function 
function RandomColor() {
    // Math.pow is slow, use constant instead.
    var color = Math.floor(Math.random() * 16777216).toString(16);
    // Avoid loops.
    return '#000000'.slice(0, -color.length) + color;
    }

// random color 
document.getElementById("random-color-hover").addEventListener("click", getRandomColor);

function getRandomColor() {
    isRandomOn = true; 
    setColorByHover()
}

// black color
document.getElementById("black-color-hover").addEventListener("click", getBlackColor);

function getBlackColor() {
    isRandomOn = false; 
    setColorByHover()
}

// make color from light to dark
document.getElementById("darker-button").addEventListener("click", colorDarker);


function colorDarker() {
	let gridsquares = document.querySelectorAll('.grid-square');
	gridsquares.forEach((e) => {
		e.style.opacity = 0;
		e.addEventListener('mouseover', increaseOpacity);
	});
}

function increaseOpacity() {
	let opacity = this.style.opacity;
	if (opacity < 1) {
		opacity = parseFloat(opacity) + 0.1;
		this.style.opacity = opacity;
    }
}
/****** Clear grid *******/

//button 
document.getElementById("clear-grid").addEventListener("click",clearGrid);
//function
function clearGrid(){
    const gridsquares = document.querySelectorAll('.grid-square');

    
    gridsquares.forEach((e) => {  
       e.style.background = 'white';     
    })

}

/****** Erase ******/
document.getElementById("erase-button").addEventListener("click",erase);

function erase(){
    const gridsquares = document.querySelectorAll('.grid-square');

    
    gridsquares.forEach((e) => {  
        e.addEventListener('mouseover', () => {
            
            e.style.background = 'white';
            e.style.cssText="border: 1px solid rgb(161, 155, 155);"
            
        });
    })
}

