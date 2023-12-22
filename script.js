let mainCharacter;
let obstacles = [];
let currentStageIndex = 0;
let bg;
let speed = 5;

function setup() {
  createCanvas(800, 400);
  mainCharacter = new Character(); // 캐릭터 생성
  bg = new Background(); // 배경 생성
  loadStage(currentStageIndex); // 첫 번째 스테이지 로드
}

function loadStage(stageIndex) {
  const stage = stages[stageIndex];
  obstacles = stage.obstacles.map((ob) => new Obstacle(ob.type, ob.xPosition));
  speed = stage.speed;
}

function draw() {
  background(220);

  bg.show(); // 배경 표시
  bg.update(speed); // 배경 업데이트

  mainCharacter.show(); // 캐릭터 표시
  mainCharacter.update(); // 캐릭터 업데이트

  for (let obs of obstacles) {
    obs.show(); // 장애물 표시
    obs.update(speed); // 장애물 업데이트

    if (obs.hits(mainCharacter)) {
      alert("Game Over");
      noLoop(); // 게임 오버 처리
    }
  }

  // 기타 게임 로직 (스코어, 스테이지 전환 등)
}

function keyPressed() {
  if (key == " ") {
    mainCharacter.jump(); // 캐릭터 점프
  }
}
