const grid = document.querySelector(".grid");
const width = 10;
const gridCellCount = width * width;
const cells = [];
let score = 0;
let player = 0;
let r = 0;
let e = 0;
let s = 0;
let dj = 0;
let m = 0;
let whichPlayer = 0;
const progressBar = document.querySelector(".progress-inner");
const anouncement = document.querySelector(".anouncement");
const gate1 = 8;
const gate2 = 9;
const speechBubble = document.querySelector(".speechBubbleText");
const jungleAmbience = document.querySelector(".jungleMusic");
const soundEffect = document.querySelector(".soundEffect");
const badGuy = document.querySelector("#image");
const playButton = document.querySelector(".play");
const pointsPanel = document.querySelector(".pointsPanel");
const sidekick = document.querySelector(".sidekick");
const speechImage = document.querySelector(".speechBubble");
const losingImage = document.querySelector(".losingImage");
const lostSection = document.querySelector(".lostSection");
const playerChoose = document.querySelector(".playerChoose");
const playerPick = document.querySelectorAll("#playerPick");
const pickPlease = document.querySelector(".pickPlease");
const scroll = document.querySelector("#scroll");
let trees = [
  7, 17, 27, 37, 36, 35, 33, 43, 42, 20, 21, 13, 14, 59, 58, 57, 66, 76, 77, 89,
  64, 74, 83, 62, 71, 61, 87,
];
let raptorWalk = [28, 38, 48, 47, 46, 45, 46, 47, 48, 38, 28];
let explorerWalk = [22, 12, 2, 3, 4, 5, 15, 25, 24, 23];
let steveWalk = [68, 78, 88, 98, 97, 96, 95, 96, 97, 98, 88, 78, 68];
let davyWalk = [60, 70, 80, 81, 82, 92, 93, 92, 82, 81, 80, 70, 60];
let rum1 = [1, 2, 4, 5];
let rum2 = [6, 16, 26, 25];
let coconut = [3, 24, 23, 34];
let cocktail = [79];
let x = [10];
const mermaidText = [
  "Watch out for Speedo Steve! \nHis unwanted pervyness will sober you up!",
  "Dont let the Bouncer-Raptor catch you! \nHe will send you home!",
  "This Paleo-Pirate party is so fun! You're missing out!",
  "Curious Kevin is out on an expedition today! Dont get caught up in his endless questions..",
];
pointsPanel.style.display = "none";
sidekick.style.display = "none";
speechImage.style.display = "none";
lostSection.style.display = "none";

function createGrid() {
  for (let i = 0; i < gridCellCount; i++) {
    const cell = document.createElement("div");
    cell.setAttribute("data-id", i);
    cells.push(cell);
    grid.appendChild(cell);
  }
}

// *** ADD OR REMOVE ANY ELEMENT **
function addElement(position, object) {
  cells[position].classList.add(object);
}
function removeElement(position, object) {
  cells[position].classList.remove(object);
}

// *** SOUND EFFECTS **
function playSound(event) {
  soundEffect.src = `./sounds/${event}.mp3`;
  soundEffect.play();
}
// ** STAGE 1 - GET DRUNKOMETER UP TO 100 ***
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
// *** STAGE 2- GET TREASURE ****
function treasure() {
  let treasureTimer = setInterval(() => {
    if (cells[player].classList.contains("treasure")) {
      removeElement(player, "treasure");
      anouncement.innerHTML = `You got the gold! And the doors have opened..`;
      //ADD IN THE WIN WHEN HE GOES TO THE JURASSIC GATES
      removeElement(gate1, "gate1");
      addElement(gate1, "openGates");
      removeElement(gate2, "gate2");
      addElement(gate2, "openGates");
      playSound("door");
      clearInterval(treasureTimer);
    }
  }, 200);
}

// *** ADD TREES,JURRASIC ENTRANCE AND DRINKS**
function addTrees() {
  trees.forEach((tree) => {
    addElement(tree, "trees");
  });

  addElement(gate1, "gate1");
  addElement(gate2, "gate2");
}

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

//** REMOVE TREES DRINKS AND ENTRANCE */
function removeTrees() {
  trees.forEach((tree) => {
    removeElement(tree, "trees");
  });

  removeElement(gate1, "openGates");
  removeElement(gate2, "openGates");
}

// ** ADD DRINKS **
function removeDrinks() {
  rum1.forEach((bottle) => {
    removeElement(bottle, "rum1");
  });
  rum2.forEach((bottle) => {
    removeElement(bottle, "rum2");
  });
  coconut.forEach((cup) => {
    removeElement(cup, "coconut");
  });
  removeElement(cocktail, "cocktail");
  removeElement(x, "x");
}

// ** WHAT HAPPENS WHEN YOU LOSE **
function lose(howYouLost) {
  lostSection.style.display = "initial";
  pointsPanel.style.display = "none";
  speechImage.style.display = "none";
  badGuy.style.display = "none";
  losingImage.classList.add(howYouLost);
  grid.style.display = "none";
  playButton.addEventListener("click", newPage);
}
// ** START AGAIN **
function newPage() {
  window.location.reload(true);
}

// ** collision with the bad guys **
function pointsRemoved(points) {
  score = score - points;
  removeElement(player, whichPlayer);
  player = 0;
  addElement(player, whichPlayer);
}

// ** START LEVEL 1 **
function playGame(event) {
  whichPlayer = event.target.className;
  pickPlease.style.display = "none";
  playerChoose.style.display = "none";
  pointsPanel.style.display = "initial";
  sidekick.style.display = "initial";
  speechImage.style.display = "initial";
  jungleAmbience.play();

  if (whichPlayer === "playerMermaid") {
    sidekick.src = "./images/pirate.png";
  } else if (whichPlayer === "playerPete") {
    sidekick.src = "./images/mermaid.png";
  }
  createGrid();

  // *** COLLISION DETECTION ***
  function treeBash(futurePosition) {
    return trees.includes(futurePosition);
  }

  // *** MOVE PETE ACROSS THE BOARD ***
  addElement(0, whichPlayer);

  function playerMove(event) {
    const xPosition = player % width;
    const yPosition = Math.floor(player / width);
    //left
    if (event.keyCode === 37) {
      if (xPosition > 0 && !treeBash(player - 1)) {
        removeElement(player, whichPlayer);
        player--;
        addElement(player, whichPlayer);
      }
    }
    //right
    if (event.keyCode === 39) {
      if (xPosition < width - 1 && !treeBash(player + 1)) {
        removeElement(player, whichPlayer);
        player++;
        addElement(player, whichPlayer);
      }
    }
    // up
    if (event.keyCode === 38) {
      if (yPosition > 0 && !treeBash(player - width)) {
        removeElement(player, whichPlayer);
        player = player - width;
        addElement(player, whichPlayer);
      }
    }
    //down
    if (event.keyCode === 40) {
      if (yPosition < width - 1 && !treeBash(player + width)) {
        removeElement(player, whichPlayer);
        player = player + width;
        addElement(player, whichPlayer);
      }
    }
  }
  document.addEventListener("keyup", playerMove);

  function caught() {
    setInterval(() => {
      if (steveWalk[s] === player) {
        pointsRemoved(10);
        anouncement.innerText = `Why hello there.. Can I come aboard.. \n \nScore = ${score}`;
        soundEffect.src = "./sounds/speedoSteve.wav";
        soundEffect.play();
        badGuy.src = "./images/speedoSteve.png";
      } else if (raptorWalk[r] === player) {
        pointsRemoved(10);
        anouncement.innerText = `RAHHHH Youre way too drunk to come to our beach party! Go home! \n \nScore = ${score}`;
        playSound("raptor");
        badGuy.src = "./images/bouncer-raptor.png";
      } else if (explorerWalk[e] === player) {
        pointsRemoved(5);
        anouncement.innerText = `Hello mr pirate! What happened to your leg? Where are you going? How did you get so round? ... \n \nScore = ${score}`;
        playSound("littleExplorer");
        badGuy.src = "./images/Explorer.png";
      } else if (davyWalk[dj] === player) {
        pointsRemoved(5);
        anouncement.innerText = `aaarrrrr ye off to the beach party? Without me! Ye lily-livered Rapscallion! \n \nScore = ${score}`;
        playSound("davyJones");
        badGuy.src = "./images/DavyJones.png";
      }
    }, 100);
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
      if (cells[player].classList.contains("rum1")) {
        add(5);
        removeElement(player, "rum1");
      } else if (cells[player].classList.contains("rum2")) {
        add(10);
        removeElement(player, "rum2");
      } else if (cells[player].classList.contains("coconut")) {
        add(10);
        removeElement(player, "coconut");
      } else if (cells[player].classList.contains("cocktail")) {
        add(20);
        removeElement(player, "cocktail");
      }
    }, 100);
  }
  addPoints();

  //** Mermaid speech */
  function mermaid() {
    const mermaidSpeech = setInterval(() => {
      if (m < mermaidText.length - 1) {
        speechBubble.innerText = mermaidText[m];
        m++;
      } else if ((m = mermaidText.length - 1)) {
        speechBubble.innerText = mermaidText[m];
        m = 0;
      }
      //** the next few lines dont work  */
      if (cells[player].classList.contains("openGates")) {
        speechBubble.innerHTML = "YAY you made it!";
        speechBubble.style.right = "45px";
        clearInterval(mermaidSpeech);
      }
    }, 5000);
  }
  mermaid();
  sufficientlyDrunk();

  // ** STAGE 3 - GET TO ENTRANCE - WINNING **
  function win() {
    anouncement.innerHTML = "Time to party!";
    soundEffect.src = `./sounds/win.wav`;
    soundEffect.play();
    removeDrinks();
    removeTrees();
    removeElement(player, whichPlayer);
    steveWalk.forEach((steve) => {
      removeElement(steve, "speedoSteve");
    });
    raptorWalk.forEach((raptor) => {
      removeElement(raptor, "raptor");
    });
    explorerWalk.forEach((explorer) => {
      removeElement(explorer, "explorer");
    });
    davyWalk.forEach((davy) => {
      removeElement(davy, "davy");
    });
    progressBar.classList.remove("completelyDrunk");
    level2(whichPlayer);
  }
  // **** MOVING BADGUYS ACROSS THE BOARD ******
  // Ive moved them all into the same set interval which is sad cos they now all go the same speed
  function gameTimer() {
    let badGuyTimer = setInterval(() => {
      //** MOVE SPEEDO STEVE */
      if (s < steveWalk.length - 1) {
        removeElement(steveWalk[s], "speedoSteve");
        s++;
        addElement(steveWalk[s], "speedoSteve");
      } else {
        removeElement(steveWalk[s], "speedoSteve");
        s = 0;
        addElement(steveWalk[s], "speedoSteve");
      }
      //** MOVE RAPTOR */
      if (r < raptorWalk.length - 1) {
        removeElement(raptorWalk[r], "raptor");
        r++;
        addElement(raptorWalk[r], "raptor");
      } else {
        removeElement(raptorWalk[r], "raptor");
        r = 0;
        addElement(raptorWalk[r], "raptor");
      }
      //** MOVE EXPLORER */
      if (e < explorerWalk.length - 1) {
        removeElement(explorerWalk[e], "explorer");
        e++;
        addElement(explorerWalk[e], "explorer");
      } else {
        removeElement(explorerWalk[e], "explorer");
        e = 0;
        addElement(explorerWalk[e], "explorer");
      }
      //** MOVE DAVY JONES */
      if (dj < davyWalk.length - 1) {
        removeElement(davyWalk[dj], "davy");
        dj++;
        addElement(davyWalk[dj], "davy");
      } else {
        removeElement(davyWalk[dj], "davy");
        dj = 0;
        addElement(davyWalk[dj], "davy");
      }
      // ** HOW TO LOSE THE GAME **
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
      // ** STOPS THE GAME IF YOU WIN **
      if (cells[player].classList.contains("openGates")) {
        clearInterval(badGuyTimer);
        win();
      }
    }, 500);
  }

  addDrinks();
  addTrees();
  gameTimer();
}

playerPick.forEach((button) => button.addEventListener("click", playGame));

//***** LEVEL 2 *******/
function level2(samePlayer) {
  score = 0;
  player = 0;
  rum1 = [6, 37, 94, 89];
  rum2 = [14, 64, 77, 90];
  coconut = [23, 46, 60];
  cocktail = [57];
  x = 91;
  trees = [
    1, 11, 13, 24, 34, 33, 31, 51, 52, 55, 47, 36, 38, 28, 17, 7, 78, 68, 58,
    87, 76, 80, 81, 84, 73, 95,
  ];
  const lava = 72;
  raptorWalk = [19, 29, 39, 49, 59, 69, 79, 69, 59, 49, 39, 29, 19];
  steveWalk = [2, 3, 4, 5, 6, 16, 26, 27, 26, 16, 6, 5, 4, 3, 2];
  explorerWalk = [32, 42, 41, 40, 30, 20, 21, 22];
  r = 0;
  e = 0;
  s = 0;
  dj = null;
  let skull = 40;
  mermaidText.push(
    "You should never trust a volcano, they erupt to no good at all."
  );
  mermaidText.push("Stay away from Count Scapula, he's off his head!");

  // *** ADD PLAYER TO THE BOARD ***
  addElement(score, samePlayer);

  //** CHANGE MAP TO THE HARDER LEVEL */
  scroll.classList.remove("scroll");
  scroll.classList.add("level2scroll");

  // ** ADD TREES, DRINKS, LAVA TO THE MAP **
  lavaFlow();
  addTrees();
  addDrinks();

  //** ADD LAVA */
  function lavaFlow() {
    setInterval(() => {
      if (cells[lava].classList.contains("lava")) {
        removeElement(lava, "lava");
      } else {
        addElement(lava, "lava");
      }
    }, 3000);
  }
  // ** STAGE 3 - GET TO ENTRANCE - WINNING **
  function win2() {
    anouncement.innerHTML = "Time to party!";
    soundEffect.src = `./sounds/win.wav`;
    soundEffect.play();
    removeDrinks();
    removeTrees();
    removeElement(player, samePlayer);
    steveWalk.forEach((steve) => {
      removeElement(steve, "speedoSteve");
    });
    raptorWalk.forEach((raptor) => {
      removeElement(raptor, "raptor");
    });
    explorerWalk.forEach((explorer) => {
      removeElement(explorer, "explorer");
    });
    davyWalk.forEach((davy) => {
      removeElement(davy, "davy");
    });
    removeElement(skull, "skull");
    progressBar.classList.remove("completelyDrunk");
    window.location.assign("./winnerPage.html");
  }
  let direction = "right";
  function game2Timer() {
    let level2Timer = setInterval(() => {
      //** skull movement */
      function treeBash(futurePosition) {
        return trees.includes(futurePosition);
      }
      // *** COLLISION DETECTION ***
      addElement(skull, "skull");

      const xPosition = skull % width;
      const yPosition = Math.floor(skull / width);

      function moveSkull() {
        switch (direction) {
          case "right":
            if (xPosition < width - 1 && !treeBash(skull + 1)) {
              removeElement(skull, "skull");
              skull++;
              addElement(skull, "skull");
            } else {
              changeDirection();
            }
            break;
          case "down":
            if (yPosition < width - 1 && !treeBash(skull + width)) {
              removeElement(skull, "skull");
              skull = skull + width;
              addElement(skull, "skull");
            } else {
              changeDirection();
            }
            break;
          case "up":
            if (yPosition > 0 && !treeBash(skull - width)) {
              removeElement(skull, "skull");
              skull = skull - width;
              addElement(skull, "skull");
            } else {
              changeDirection();
            }
            break;
          case "left":
            if (xPosition > 0 && !treeBash(skull - 1)) {
              removeElement(skull, "skull");
              skull = skull - 1;
              addElement(skull, "skull");
            } else {
              changeDirection();
            }
        }
      }
      moveSkull();

      function changeDirection() {
        let randomNumber = Math.floor(Math.random() * 4);
        if (randomNumber === 0) {
          direction = "right";
          console.log(direction);
        }
        if (randomNumber === 1) {
          direction = "down";
          console.log(direction);
        }
        if (randomNumber === 2) {
          direction = "up";
          console.log(direction);
        }
        if (randomNumber === 3) {
          direction = "left";
          console.log(direction);
        }
      }

      //** collision with lava and skull */
      if (cells[player].classList.contains("lava")) {
        playSound("fire");
        pointsRemoved(10);
        anouncement.innerText = `OOOUCHH! Watch out for the lava! \n \nScore = ${score}`;
        badGuy.src = "./images/volcano.png";
      }
      if (player === skull) {
        playSound("skullLaugh");
        pointsRemoved(10);
        anouncement.innerText = `MWAHA\nHAHA..\n \nscore = ${score}`;
        badGuy.src = "./images/skull.png";
      }
      //** MOVE SPEEDO STEVE */
      if (s < steveWalk.length - 1) {
        // s < 8 - 1
        removeElement(steveWalk[s], "speedoSteve");
        s++;
        addElement(steveWalk[s], "speedoSteve");
      } else {
        removeElement(steveWalk[s], "speedoSteve");
        s = 0;
        addElement(steveWalk[s], "speedoSteve");
      }
      //** MOVE RAPTOR */
      if (r < raptorWalk.length - 1) {
        removeElement(raptorWalk[r], "raptor");
        r++;
        addElement(raptorWalk[r], "raptor");
      } else {
        removeElement(raptorWalk[r], "raptor");
        r = 0;
        addElement(raptorWalk[r], "raptor");
      }
      //** MOVE EXPLORER */
      if (e < explorerWalk.length - 1) {
        removeElement(explorerWalk[e], "explorer");
        e++;
        addElement(explorerWalk[e], "explorer");
      } else {
        removeElement(explorerWalk[e], "explorer");
        e = 0;
        addElement(explorerWalk[e], "explorer");
      }
      // ** HOW TO LOSE THE GAME **
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
      // ** STOPS THE GAME IF YOU WIN **
      if (cells[player].classList.contains("openGates")) {
        clearInterval(level2Timer);
        win2();
      }
    }, 500);
  }
  game2Timer();
  sufficientlyDrunk();
}
