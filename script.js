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
const rum1 = [1, 10];
const rum2 = [2];
const coconut = [3, 5, 6, 15, 16, 25, 26];
const cocktail = [4];
const x = [67];
const progressBar = document.querySelector(".progress-inner");
const anouncement = document.querySelector(".anouncement");
const gate1 = 8;
const gate2 = 9;
const speechBubble = document.querySelector(".speechBubbleText");
const mermaidText = [
  "Watch out for Speedo Steve! \nHis unwanted pervyness will sober you up!",
  "Dont let the Bouncer-Raptor catch you! \nHe will send you home!",
  "This Paleo-Pirate party is so fun! You're missing out!",
  "Curious Kevin is out on an expedition today! Dont get caught up in his endless questions..",
];
let m = 0;
const jungleAmbience = document.querySelector(".jungleMusic");
const soundEffect = document.querySelector(".soundEffect");
const badGuy = document.querySelector("#image");
const playButton = document.querySelector(".play");
const pointsPanel = document.querySelector(".pointsPanel");
const mermaidImage = document.querySelector(".mermaid");
const speechImage = document.querySelector(".speechBubble");
const losingImage = document.querySelector(".losingImage");

pointsPanel.style.display = "none";
mermaidImage.style.display = "none";
speechImage.style.display = "none";

// ** set everything into the play game function to start the game when youre ready **
function playGame() {
  playButton.style.display = "none";
  pointsPanel.style.display = "initial";
  mermaidImage.style.display = "initial";
  speechImage.style.display = "initial";
  jungleAmbience.play();

  function createGrid() {
    for (let i = 0; i < gridCellCount; i++) {
      const cell = document.createElement("div");
      cell.setAttribute("data-id", i);
      cells.push(cell);
      grid.appendChild(cell);
    }
  }
  createGrid();

  function playSound(event) {
    soundEffect.src = `./sounds/${event}.mp3`;
    soundEffect.play();
  }

  // *** ADD TREES AND JURRASIC ENTRANCE**
  function addTrees() {
    trees.forEach((tree) => {
      addElement(tree, "trees");
    });

    addElement(gate1, "gate1");
    addElement(gate2, "gate2");
  }

  // ** ADD DRINKS **
  function addDrinks() {
    rum1.forEach((bottle) => {
      addElement(bottle, "rum1");
    });
    rum2.forEach((bottle) => {
      addElement(bottle, "rum2");
    });
    coconut.forEach((cup) => {
      addElement(cup, "coconut");
    });
    addElement(cocktail, "cocktail");
    addElement(x, "x");
  }

  // *** COLLISION DETECTION ***
  function treeBash(futurePosition) {
    return trees.includes(futurePosition);
  }

  // *** ADD OR REMOVE ANY ELEMENT **
  function addElement(position, object) {
    cells[position].classList.add(object);
  }
  function removeElement(position, object) {
    cells[position].classList.remove(object);
  }

  // *** MOVE PETE ACROSS THE BOARD ***
  addElement(0, "pete");

  function playerMove(event) {
    const xPosition = pete % width;
    const yPosition = Math.floor(pete / width);
    //left
    if (event.keyCode === 37) {
      if (xPosition > 0 && !treeBash(pete - 1)) {
        removeElement(pete, "pete");
        pete--;
        addElement(pete, "pete");
      }
    }
    //right
    if (event.keyCode === 39) {
      if (xPosition < width - 1 && !treeBash(pete + 1)) {
        removeElement(pete, "pete");
        pete++;
        addElement(pete, "pete");
      }
    }
    // up
    if (event.keyCode === 38) {
      if (yPosition > 0 && !treeBash(pete - width)) {
        removeElement(pete, "pete");
        pete = pete - width;
        addElement(pete, "pete");
      }
    }
    //down
    if (event.keyCode === 40) {
      if (yPosition < width - 1 && !treeBash(pete + width)) {
        removeElement(pete, "pete");
        pete = pete + width;
        addElement(pete, "pete");
      }
    }
  }
  document.addEventListener("keyup", playerMove);

  // ** collision with the bad guys **
  function pointsRemoved(points) {
    score = score - points;
    removeElement(pete, "pete");
    pete = 0;
    addElement(pete, "pete");
  }

  function caught() {
    setInterval(() => {
      if (steveWalk[s] === pete) {
        pointsRemoved(10);
        anouncement.innerText = `Why hello there.. Can I come aboard.. \n \nScore = ${score}`;
        soundEffect.src = "./sounds/speedoSteve.wav";
        soundEffect.play();
        badGuy.src = "./images/speedoSteve.png";
      } else if (raptorWalk[r] === pete) {
        pointsRemoved(10);
        anouncement.innerText = `RAHHHH Youre way too drunk to come to our beach party! Go home! \n \nScore = ${score}`;
        playSound("raptor");
        badGuy.src = "./images/bouncer-raptor.png";
      } else if (explorerWalk[e] === pete) {
        pointsRemoved(5);
        anouncement.innerText = `Hello mr pirate! What happened to your leg? Where are you going? How did you get so round? ... \n \nScore = ${score}`;
        playSound("littleExplorer");
        badGuy.src = "./images/Explorer.png";
      } else if (davyWalk[dj] === pete) {
        pointsRemoved(5);
        anouncement.innerText = `aaarrrrr ye off to the beach party? Without me! Ye lily-livered Rapscallion! \n \nScore = ${score}`;
        playSound("davyJones");
        badGuy.src = "./images/DavyJones.png";
      }
    }, 200);
  }
  caught();

  // ** collision with the rum **
  function addPoints() {
    function add(points) {
      score = score + points;
      anouncement.innerText = `+ ${points} Points! \n \n ${score} Points in total`;
      badGuy.src = "";
      playSound("slurp");
    }
    setInterval(() => {
      if (cells[pete].classList.contains("rum1")) {
        add(5);
        removeElement(pete, "rum1");
      } else if (cells[pete].classList.contains("rum2")) {
        add(10);
        removeElement(pete, "rum2");
      } else if (cells[pete].classList.contains("coconut")) {
        add(10);
        removeElement(pete, "coconut");
      } else if (cells[pete].classList.contains("cocktail")) {
        add(20);
        removeElement(pete, "cocktail");
      }
      if (
        cells.some((cell) => cell.classList.contains("rum2")) === false &&
        cells.some((cell) => cell.classList.contains("rum1")) === false &&
        cells.some((cell) => cell.classList.contains("coconut")) === false &&
        cells.some((cell) => cell.classList.contains("cocktail")) === false &&
        score < 100
      ) {
        lose("rumsGone");
      }
      if (score < 0) {
        lose("belowZero");
      }
    }, 100);
  }
  addPoints();

  // ** HOW TO LOSE THE GAME **
  function lose(howYouLost) {
    playButton.style.display = "initial";
    playButton.innerHTML = "Play Again?";
    pointsPanel.style.display = "none";
    speechImage.style.display = "none";
    losingImage.classList.add(howYouLost);
    grid.style.display = "none";
    playButton.addEventListener("click", newPage);
  }

  // ** START AGAIN **
  function newPage() {
    window.location.reload(true);
  }

  // ** Progress Bar - When you get to 100 points **
  function sufficientlyDrunk() {
    let pointsTimer = setInterval(() => {
      if (score < 100) {
        progressBar.style.height = `${score}%`;
      } else {
        progressBar.style.height = "100%";
        anouncement.innerHTML =
          "You are sufficiently drunk! Find the treasure chest and make your way to the paleo-pirate party!";
        progressBar.classList.add("completelyDrunk");
        removeElement(x, "x");
        addElement(x, "treasure");
        playSound("treasure");
        clearInterval(pointsTimer);
        treasure();
      }
    }, 200);
  }
  sufficientlyDrunk();

  function treasure() {
    let treasureTimer = setInterval(() => {
      if (cells[pete].classList.contains("treasure")) {
        score = score + 20;
        removeElement(pete, "treasure");
        anouncement.innerHTML = `You got the gold! And the doors have opened..`;
        //ADD IN THE WIN WHEN HE GOES TO THE JURASSIC GATES
        removeElement(gate1, "gate1");
        addElement(gate1, "openGates");
        removeElement(gate2, "gate2");
        addElement(gate2, "openGates");
        playSound("door");
        clearInterval(treasureTimer);
        win();
      }
    }, 200);
  }

  //open the doors

  // ** Getting to the entrance - WINNING **
  function win() {
    const winTimer = setInterval(() => {
      if (cells[pete].classList.contains("openGates")) {
        anouncement.innerHTML = "You have won!";
        soundEffect.src = `./sounds/win.wav`;
        soundEffect.play();
        clearInterval(winTimer);
      }
    }, 200);
  }

  //** Mermaid speech */
  function mermaid() {
    const mermaidSpeech = setInterval(() => {
      if (m < mermaidText.length - 1) {
        speechBubble.innerText = mermaidText[m];
        m++;
      } else {
        speechBubble.innerText = mermaidText[m];
        m = 0;
      }
      if (cells[pete].classList.contains("openGates")) {
        speechBubble.innerHTML = "YAY you made it!";
        speechBubble.style.right = "45px";
        clearInterval(mermaidSpeech);
      }
    }, 5000);
  }
  mermaid();

  // **** SPEEDO STEVE MOVING ACROSS THE BOARD ******
  // to add! smooth the transition
  function moveSpeedoSteve() {
    setInterval(() => {
      if (s < steveWalk.length - 1) {
        removeElement(steveWalk[s], "speedoSteve");
        s++;
        addElement(steveWalk[s], "speedoSteve");
      } else {
        removeElement(steveWalk[s], "speedoSteve");
        s = 0;
        addElement(steveWalk[s], "speedoSteve");
      }
    }, 500);
  }

  // **** BOUNCERAPTER MOVING ACROSS THE BOARD ******
  function moveRaptor() {
    setInterval(() => {
      if (r < raptorWalk.length - 1) {
        removeElement(raptorWalk[r], "raptor");
        r++;
        addElement(raptorWalk[r], "raptor");
      } else {
        removeElement(raptorWalk[r], "raptor");
        r = 0;
        addElement(raptorWalk[r], "raptor");
      }
    }, 700);
  }

  // **** EXPLORER MOVING ACROSS THE BOARD ******
  function moveExplorer() {
    setInterval(() => {
      if (e < explorerWalk.length - 1) {
        removeElement(explorerWalk[e], "explorer");
        e++;
        addElement(explorerWalk[e], "explorer");
      } else {
        removeElement(explorerWalk[e], "explorer");
        e = 0;
        addElement(explorerWalk[e], "explorer");
      }
    }, 800);
  }

  // **** DAVY MOVING ACROSS THE BOARD ******
  function moveDavy() {
    setInterval(() => {
      if (dj < davyWalk.length - 1) {
        removeElement(davyWalk[dj], "davy");
        dj++;
        addElement(davyWalk[dj], "davy");
      } else {
        removeElement(davyWalk[dj], "davy");
        dj = 0;
        addElement(davyWalk[dj], "davy");
      }
    }, 600);
  }

  addDrinks();
  addTrees();
  moveSpeedoSteve();
  moveRaptor();
  moveExplorer();
  moveDavy();
}

playButton.addEventListener("click", playGame);
