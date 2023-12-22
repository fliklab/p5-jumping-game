class GameManager {
  constructor(stages) {
    this.stages = stages;
    this.currentStageIndex = 0;
    this.score = 0;
    this.gameStarted = false;
    this.gameEnded = false;
  }

  startGame() {
    this.gameStarted = true;
    this.loadStage(this.currentStageIndex);
  }

  loadStage(stageIndex) {
    this.currentStage = this.stages[stageIndex];
    obstacles = this.currentStage.obstacles.map(
      (ob) => new Obstacle(ob.type, ob.xPosition)
    );
    this.score = 0; // 스테이지가 시작될 때 스코어 초기화
  }

  //
  nextStage() {
    if (this.currentStageIndex < this.stages.length - 1) {
      this.currentStageIndex++;
      this.startGame();
    } else {
      this.gameEnded = true;
      this.gameStarted = false;
    }
  }

  updateScore(points) {
    this.score += points;
  }

  showStartScreen() {
    fill(0);
    textAlign(CENTER);
    textSize(32);
    text("시작하려면 Space를 누르세요", width / 2, height / 2);
  }

  showEndingScreen() {
    fill(0);
    textAlign(CENTER);
    textSize(32);
    text("성공! 축하합니다!", width / 2, height / 2);
  }

  isGameStarted() {
    return this.gameStarted;
  }

  isGameEnded() {
    return this.gameEnded;
  }
}
