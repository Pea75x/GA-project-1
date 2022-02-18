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
      if (raptorWalk[r] === pete) {
        caughtByraptor();
      }
    }
  }
  //right
  if (event.keyCode === 39) {
    if (xPosition < width - 1 && !treeBash(pete + 1)) {
      removePete(pete);
      pete++;
      addPete(pete);
      if (raptorWalk[r] === pete) {
        caughtByraptor();
      }
    }
  }
  // up
  if (event.keyCode === 38) {
    if (yPosition > 0 && !treeBash(pete - width)) {
      removePete(pete);
      pete = pete - width;
      addPete(pete);
      if (raptorWalk[r] === pete) {
        caughtByraptor();
      }
    }
  }
  //down
  if (event.keyCode === 40) {
    if (yPosition < width - 1 && !treeBash(pete + width)) {
      removePete(pete);
      pete = pete + width;
      addPete(pete);
      if (raptorWalk[r] === pete) {
        caughtByraptor();
      }
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
  setInterval(() => {
    if (s < steveWalk.length - 1) {
      removeSpeedoSteve(steveWalk[s]);
      s++;
      addSpeedoSteve(steveWalk[s]);
      if (steveWalk[s] === pete) {
        caughtBySteve();
      }
    } else {
      removeSpeedoSteve(steveWalk[s]);
      s = 0;
      addSpeedoSteve(steveWalk[s]);
      if (steveWalk[s] === pete) {
        caughtBySteve();
      }
    }
  }, 500);
}

function caughtBySteve() {
  score = score - 10;
  console.log("Why hello there sexy pirate.. Can I come aboard..");
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
      if (raptorWalk[r] === pete) {
        caughtByraptor();
      }
    } else {
      removeRaptor(raptorWalk[r]);
      r = 0;
      addRaptor(raptorWalk[r]);
      if (raptorWalk[r] === pete) {
        caughtByraptor();
      }
    }
  }, 700);
}
function caughtByraptor() {
  score = score - 10;
  removePete(pete);
  pete = 0;
  addPete(pete);
  console.log(
    "RAHHHH Youre way too drunk to come to our beach party! Go home!"
  );
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
      if (explorerWalk[e] === pete) {
        caughtByExplorer();
      }
    } else {
      removeExplorer(explorerWalk[e]);
      e = 0;
      addexplorer(explorerWalk[e]);
      if (explorerWalk[e] === pete) {
        caughtByExplorer();
      }
    }
  }, 800);
}
function caughtByExplorer() {
  score = score - 10;
  console.log(
    "Hello mr pirate! What happened to your leg? Where are you going? How did you get so round? ..."
  );
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
      if (davyWalk[dj] === pete) {
        caughtByDavy();
      }
    } else {
      removeDavy(davyWalk[dj]);
      dj = 0;
      addDavy(davyWalk[dj]);
      if (davyWalk[dj] === pete) {
        caughtByDavy();
      }
    }
  }, 600);
}
function caughtByDavy() {
  score = score - 10;
  console.log(
    `aaarrrrrrrr ye off to the beach party? Without me! Ye lily-livered Rapscallion!`
  );
}

addTrees();
moveSpeedoSteve();
moveRaptor();
moveExplorer();
moveDavy();
