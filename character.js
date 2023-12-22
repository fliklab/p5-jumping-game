const FLOOR = 300;
// character.js
class Character {
  constructor() {
    this.x = 50;
    this.y = FLOOR - 15;
    this.gravity = 0.5;
    this.velocity = 0;
    this.jumpHeight = -15;
  }

  show() {
    fill(255);
    ellipse(this.x, this.y, 30, 30); // 기본적인 원형 캐릭터
  }

  update() {
    this.velocity += this.gravity;
    this.y += this.velocity;

    if (this.y > FLOOR - 15) {
      this.y = FLOOR - 15;
      this.velocity = 0;
    }
  }

  jump() {
    if (this.y == FLOOR - 15) {
      this.velocity += this.jumpHeight;
    }
  }
}
