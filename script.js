let mainCharacter;
let obstacles = [];
let bg;
let gameManager;
let speed = 5;

function setup() {
  createCanvas(800, 400);
  mainCharacter = new Character();
  bg = new Background();
  gameManager = new GameManager(stages);
}

function draw() {
  background(220);

  bg.show(); // 배경 표시
  bg.update(speed); // 배경 업데이트

  if (gameManager.isGameStarted()) {
    mainCharacter.show(); // 캐릭터 표시
    mainCharacter.update(); // 캐릭터 업데이트

    for (let i = obstacles.length - 1; i >= 0; i--) {
      const obs = obstacles[i];
      obs.show();
      obs.update(speed);

      if (obs.hits(mainCharacter)) {
        alert("Game Over");
        noLoop();
      }

      if (obs.offscreen()) {
        obstacles.splice(i, 1);
        gameManager.updateScore(1); // 점수 업데이트
      }
    }

    if (obstacles.length === 0) {
      gameManager.nextStage();
    }
  } else if (gameManager.isGameEnded()) {
    gameManager.showEndingScreen();
  } else {
    gameManager.showStartScreen();
  }
}

function keyPressed() {
  if (key == " ") {
    if (!gameManager.isGameStarted() && !gameManager.isGameEnded()) {
      gameManager.startGame();
    } else mainCharacter.jump(); // 캐릭터 점프
  }
}
