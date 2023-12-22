// background.js
class Background {
  constructor() {
    this.x = 0;
  }

  show() {
    rectMode(CORNER);

    fill(200);
    noStroke();
    rect(0, 0, width, height); // 단순한 회색 배경

    fill(10);
    rect(this.x, 300, width, height); // 단순한 회색 배경
    rect(this.x + width, 300, width, height);
  }

  update(speed) {
    this.x -= speed;
    if (this.x <= -width) {
      this.x = 0;
    }
  }
}
