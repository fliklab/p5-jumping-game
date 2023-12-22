// obstacles.js
const obstacleTypes = {
  redBox: {
    color: [255, 0, 0],
    size: 40,
    image: null,
  },
  blueBox: {
    color: [0, 0, 255],
    size: 30,
    image: null,
  },
};

class Obstacle {
  constructor(type, xPosition) {
    this.type = obstacleTypes[type];
    this.x = xPosition;
    this.y = 300 - this.type.size * 0.5;
    this.image = this.type.image;
  }

  show() {
    rectMode(CENTER);
    if (this.image) {
      image(this.image, this.x, this.y, this.type.size, this.type.size);
    } else {
      fill(this.type.color);
      noStroke();
      rect(this.x, this.y, this.type.size, this.type.size);
    }
  }

  update(speed) {
    this.x -= speed;
  }

  hits(character) {
    let distance = dist(this.x, this.y, character.x, character.y);
    return distance < 25;
  }

  offscreen() {
    // 화면 밖으로 나갔는지 판별
    return this.x < -this.type.size;
  }
}
