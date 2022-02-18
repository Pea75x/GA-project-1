const grid = document.querySelector(".grid");
const width = 10;
const gridCellCount = width * width;
const cells = [];
let pete = 0;
const trees = [
  7, 17, 27, 37, 36, 35, 33, 43, 42, 20, 21, 13, 14, 59, 58, 57, 66, 76, 77, 89,
  64, 74, 83, 62, 71, 61, 87,
];

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

// **** SPEEDO STEVE MOVING ACROSS THE BOARD ******
// to add! smooth the transition, and make the player lose points when they colide
function addSpeedoSteve(position) {
  cells[position].classList.add("speedoSteve");
}
function removeSpeedoSteve(position) {
  cells[position].classList.remove("speedoSteve");
}
function moveSpeedoSteve() {
  let i = 0;
  const steveWalk = [68, 78, 88, 98, 97, 96, 95, 96, 97, 98, 88, 78, 68];
  setInterval(() => {
    if (i < steveWalk.length - 1) {
      removeSpeedoSteve(steveWalk[i]);
      i++;
      addSpeedoSteve(steveWalk[i]);
    } else {
      removeSpeedoSteve(steveWalk[i]);
      i = 0;
      addSpeedoSteve(steveWalk[i]);
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
  let i = 0;
  const raptorWalk = [28, 38, 48, 47, 46, 45, 46, 47, 48, 38, 28];
  setInterval(() => {
    if (i < raptorWalk.length - 1) {
      removeRaptor(raptorWalk[i]);
      i++;
      addRaptor(raptorWalk[i]);
    } else {
      removeRaptor(raptorWalk[i]);
      i = 0;
      addRaptor(raptorWalk[i]);
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
  let i = 0;
  const explorerWalk = [22, 12, 2, 3, 4, 5, 15, 25, 24, 23];
  setInterval(() => {
    if (i < explorerWalk.length - 1) {
      removeExplorer(explorerWalk[i]);
      i++;
      addexplorer(explorerWalk[i]);
    } else {
      removeExplorer(explorerWalk[i]);
      i = 0;
      addexplorer(explorerWalk[i]);
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
  let i = 0;
  const davyWalk = [60, 70, 80, 81, 82, 92, 93, 92, 82, 81, 80, 70, 60];
  setInterval(() => {
    if (i < davyWalk.length - 1) {
      removeDavy(davyWalk[i]);
      i++;
      addDavy(davyWalk[i]);
    } else {
      removeDavy(davyWalk[i]);
      i = 0;
      addDavy(davyWalk[i]);
    }
  }, 600);
}

addTrees();
moveSpeedoSteve();
moveRaptor();
moveExplorer();
moveDavy();
