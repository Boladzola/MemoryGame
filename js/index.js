const imagesList = [
  "img/alice.png",
  "img/cat.png",
  "img/cups.jpg",
  "img/hatter.png",
  "img/hear.jpg",
  "img/queen.jpg",
  "img/rabbit.png",
  "img/time.jpg",
  "img/key.jpg"
];

const root = document.getElementById("root");
const shuffledImages = [...imagesList, ...imagesList];
function shuffle(array) {
  let currentIndex = array.length;
  while (currentIndex != 0) {
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
}
shuffle(shuffledImages);

const memoryGame = {
  gameLauncher: "",
  launchGame() {
    const startButton = document.createElement("button");
    startButton.textContent = "Start Game!";
    startButton.onclick = () => {
      this.startGame();
      startButton.remove();
    };
    root.append(startButton);
  },
  statusBox: null,
  openedCardsList: [],
  currentCardsList: [],



  toggleCard(node) {
    if (node.classList.contains("openedImageBox")) {
      node.classList.remove("openedImageBox");
      node.classList.add("closedImageBox");
      this.currentCardsList = this.currentCardsList.filter(
        (item) => item.id !== node.id
      );
    } else {
      node.classList.remove("closedImageBox");
      node.classList.add("openedImageBox");
      this.currentCardsList.push(node);
    }
  },
  checkIsSame() {
    const image1 = this.currentCardsList[0].children[0].src;
    const image2 = this.currentCardsList[1].children[0].src;
    const isImageSame = image1 === image2;
    if (isImageSame) {
      this.openedCardsList = [
        ...this.openedCardsList, 
        ...this.currentCardsList,
    ];
      this.currentCardsList = [];
      if (this.openedCardsList.length === shuffledImages.length) {
        const congratulation = document.createElement("h2");
        congratulation.textContent = "You won!";
        const newGameButton = document.createElement("button");
        newGameButton.textContent = "New Game";
        newGameButton.onclick = () => {
          window.location.reload();
        };
        this.statusBox.append(congratulation, newGameButton);
      }
    } else {
      setTimeout(() => {
        this.currentCardsList.forEach((item) => this.toggleCard(item));
        this.currentCardsList = [];
      }, 1500);
    }
  },

  startGame() {
    const gameTitle = document.createElement("h1");
    gameTitle.textContent = "MEMORY GAME";
    const gameStatusBox = document.createElement("div");
    this.statusBox = gameStatusBox;

    const gameBox = document.createElement("section");
    gameBox.className = "gameBox";

    for (const item of shuffledImages) {
      const imageBox = document.createElement("div");
      imageBox.classList.add("imageBox");
      imageBox.classList.add("closedImageBox");
      imageBox.id = item + Math.random();
      imageBox.onclick = () => {
        const openedCount = this.currentCardsList.length;
        if (openedCount === 0) {
          this.toggleCard(imageBox);
        }
        if (openedCount === 1) {
          this.toggleCard(imageBox);
          this.checkIsSame();
        }
      };
      const image = document.createElement("img");
      image.src = item;
      imageBox.append(image);
      gameBox.append(imageBox);
    }
    root.append(gameTitle, gameStatusBox, gameBox);
  },
};

memoryGame.launchGame();

