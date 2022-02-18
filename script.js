const grid = document.querySelector(".grid");
const width = 10;
const gridCellCount = width * width;
const cells = [];

function createGrid() {
  for (let i = 0; i < gridCellCount; i++) {
    const cell = document.createElement("div");
    cell.setAttribute("data-id", i);
    cells.push(cell);
    grid.appendChild(cell);
  }
}
createGrid();

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
  }, 1000);
}
moveSpeedoSteve();

// **** BOUNCERAPTER MOVING ACROSS THE BOARD ******
function addRaptor(position) {
  cells[position].classList.add("raptor");
}
function removeRaptor(position) {
  cells[position].classList.remove("raptor");
}
function moveRaptor() {
  let i = 0;
  const raptorWalk = [18, 28, 38, 48, 47, 46, 45, 46, 47, 48, 38, 28, 18];
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
  }, 800);
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

moveSpeedoSteve();
moveRaptor();
moveExplorer();
