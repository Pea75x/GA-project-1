const grid = document.querySelector(".grid");
const width = 10;
const gridCellCount = width * width;
const cells = [];
let pete = 0;
let score = 0;
const trees = [
  7, 17, 27, 37, 36, 35, 33, 43, 42, 20, 21, 13, 14, 59, 58, 57, 66, 76, 77, 89,
  64, 74, 83, 62, 71, 61, 87,
];
let r = 0;
const raptorWalk = [28, 38, 48, 47, 46, 45, 46, 47, 48, 38, 28];
let e = 0;
const explorerWalk = [22, 12, 2, 3, 4, 5, 15, 25, 24, 23];
let s = 0;
const steveWalk = [68, 78, 88, 98, 97, 96, 95, 96, 97, 98, 88, 78, 68];
let dj = 0;
const davyWalk = [60, 70, 80, 81, 82, 92, 93, 92, 82, 81, 80, 70, 60];
const rum1 = [50, 94, 55, 16];
const rum2 = [34, 91, 99, 39];

function createGrid() {
  for (let i = 0; i < gridCellCount; i++) {
    const cell = document.createElement("div");
    cell.setAttribute("data-id", i);
    cells.push(cell);
    grid.appendChild(cell);
  }
}
createGrid();

// *** ADD TREES **
function addTrees() {
  trees.forEach((tree) => {
    cells[tree].classList.add("trees");
  });
}

// ** ADD DRINKS **
function addDrinks() {
  rum1.forEach((bottle) => {
    cells[bottle].classList.add("rum1");
  });
  rum2.forEach((bottle) => {
    cells[bottle].classList.add("rum2");
  });
}

// *** COLLISION DETECTION ***
function treeBash(futurePosition) {
  return trees.includes(futurePosition);
}

// *** MOVE PETE ACROSS THE BOARD ***
function addPete(position) {
  cells[position].classList.add("pete");
}
function removePete(position) {
  cells[position].classList.remove("pete");
}
addPete(0);

function playerMove(event) {
  const xPosition = pete % width;
  const yPosition = Math.floor(pete / width);
  //left
  if (event.keyCode === 37) {
    if (xPosition > 0 && !treeBash(pete - 1)) {
      removePete(pete);
      pete--;
      addPete(pete);
    }
  }
  //right
  if (event.keyCode === 39) {
    if (xPosition < width - 1 && !treeBash(pete + 1)) {
      removePete(pete);
      pete++;
      addPete(pete);
    }
  }
  // up
  if (event.keyCode === 38) {
    if (yPosition > 0 && !treeBash(pete - width)) {
      removePete(pete);
      pete = pete - width;
      addPete(pete);
    }
  }
  //down
  if (event.keyCode === 40) {
    if (yPosition < width - 1 && !treeBash(pete + width)) {
      removePete(pete);
      pete = pete + width;
      addPete(pete);
    }
  }
}
document.addEventListener("keyup", playerMove);

// ** collision with the bad guys **
function pointsRemoved(points) {
  score = score - points;
  removePete(pete);
  pete = 0;
  addPete(pete);
}

function caught() {
  setInterval(() => {
    if (steveWalk[s] === pete) {
      pointsRemoved(10);
      console.log(
        `Why hello there sexy pirate.. Can I come aboard.. \n score = ${score}`
      );
    } else if (raptorWalk[r] === pete) {
      pointsRemoved(10);
      console.log(
        `RAHHHH Youre way too drunk to come to our beach party! Go home! \n score = ${score}`
      );
    } else if (explorerWalk[e] === pete) {
      pointsRemoved(5);
      console.log(
        `Hello mr pirate! What happened to your leg? Where are you going? How did you get so round? ... \n score = ${score}`
      );
    } else if (davyWalk[dj] === pete) {
      pointsRemoved(5);
      console.log(
        `aaarrrrrrrr ye off to the beach party? Without me! Ye lily-livered Rapscallion! \n score = ${score}`
      );
    }
  }, 200);
}
caught();

// ** collision with the rum **
function removeDrink(position, object) {
  cells[position].classList.remove(object);
}

function addPoints() {
  setInterval(() => {
    if (cells[pete].classList.contains("rum1")) {
      score = score + 5;
      removeDrink(pete, "rum1");
      console.log(score);
    } else if (cells[pete].classList.contains("rum2")) {
      score = score + 10;
      removeDrink(pete, "rum2");
      console.log(score);
    }
  }, 200);
}
addPoints();

// **** SPEEDO STEVE MOVING ACROSS THE BOARD ******
// to add! smooth the transition, and make the player lose points when they colide
function addSpeedoSteve(position) {
  cells[position].classList.add("speedoSteve");
}
function removeSpeedoSteve(position) {
  cells[position].classList.remove("speedoSteve");
}
function moveSpeedoSteve() {
  setInterval(() => {
    if (s < steveWalk.length - 1) {
      removeSpeedoSteve(steveWalk[s]);
      s++;
      addSpeedoSteve(steveWalk[s]);
    } else {
      removeSpeedoSteve(steveWalk[s]);
      s = 0;
      addSpeedoSteve(steveWalk[s]);
    }
  }, 500);
}

// **** BOUNCERAPTER MOVING ACROSS THE BOARD ******
function addRaptor(position) {
  cells[position].classList.add("raptor");
}
function removeRaptor(position) {
  cells[position].classList.remove("raptor");
}

function moveRaptor() {
  setInterval(() => {
    if (r < raptorWalk.length - 1) {
      removeRaptor(raptorWalk[r]);
      r++;
      addRaptor(raptorWalk[r]);
    } else {
      removeRaptor(raptorWalk[r]);
      r = 0;
      addRaptor(raptorWalk[r]);
    }
  }, 700);
}

// **** EXPLORER MOVING ACROSS THE BOARD ******
function addexplorer(position) {
  cells[position].classList.add("explorer");
}
function removeExplorer(position) {
  cells[position].classList.remove("explorer");
}
function moveExplorer() {
  setInterval(() => {
    if (e < explorerWalk.length - 1) {
      removeExplorer(explorerWalk[e]);
      e++;
      addexplorer(explorerWalk[e]);
    } else {
      removeExplorer(explorerWalk[e]);
      e = 0;
      addexplorer(explorerWalk[e]);
    }
  }, 800);
}

// **** DAVY MOVING ACROSS THE BOARD ******
function addDavy(position) {
  cells[position].classList.add("davy");
}
function removeDavy(position) {
  cells[position].classList.remove("davy");
}
function moveDavy() {
  setInterval(() => {
    if (dj < davyWalk.length - 1) {
      removeDavy(davyWalk[dj]);
      dj++;
      addDavy(davyWalk[dj]);
    } else {
      removeDavy(davyWalk[dj]);
      dj = 0;
      addDavy(davyWalk[dj]);
    }
  }, 600);
}

addDrinks();
addTrees();
moveSpeedoSteve();
moveRaptor();
moveExplorer();
moveDavy();
