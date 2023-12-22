const SPIN_MULTIPLIER = 45;
const MIN_PARTICLE_COUNT = 200;
const MAX_PARTICLE_COUNT = 700;
const MIN_PARTICLE_SIZE = 12;
const MAX_PARTICLE_SIZE = 100;
const MIN_FORCE = 0.01;
const MAX_FORCE = 0.02;
const REPULSION_RADIUS = 50;
const REPULSION_STRENGTH = 0.2;

var particles = [];
var particleCount = 550;
var maxSize = 50;

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  canvas.canvas.oncontextmenu = () => false;
}

function draw() {
  background(160, 0, 0);

  fill(255);
  noStroke();

  push();

  rectMode(CENTER);

  particles.forEach((particle) => {
    particle.move();

    push();
    translate(particle.pos.x - width / 2, particle.pos.y - height / 2);

    let spin = particle.vel.mag() * SPIN_MULTIPLIER;
    rotate(radians(particle.mapped_angle + spin));

    fill(particle.color);
    if (particle.shape >= 3) {
      // 육각 결정 모양의 눈꽃 그리기
      fill(255, 255, 255, 255);
      beginShape();
      vertex(0, -particle.size / 2);
      vertex(-particle.size / 2, -particle.size / 4);
      vertex(-particle.size / 2, particle.size / 4);
      vertex(0, particle.size / 2);
      vertex(particle.size / 2, particle.size / 4);
      vertex(particle.size / 2, -particle.size / 4);
      endShape(CLOSE);
    } else if (particle.shape >= 2) {
      fill(255, 255, 255, 230);

      // astrict * 모양 그리기
      beginShape();
      vertex(0, -particle.size / 2);
      vertex(-particle.size / 2, -particle.size / 4);
      vertex(-particle.size / 2, particle.size / 4);
      vertex(0, particle.size / 2);
      vertex(particle.size / 2, particle.size / 4);
      vertex(particle.size / 2, -particle.size / 4);
      endShape(CLOSE);
    } else if (particle.shape >= 1) {
      // 육각 별 모양의 눈꽃 그리기
      beginShape();
      vertex(0, -particle.size / 2);
      vertex(-particle.size / 4, -particle.size / 4);
      vertex(-particle.size / 2, 0);
      vertex(-particle.size / 4, particle.size / 4);
      vertex(0, particle.size / 2);
      vertex(particle.size / 4, particle.size / 4);
      vertex(particle.size / 2, 0);
      vertex(particle.size / 4, -particle.size / 4);
      endShape(CLOSE);
    } else {
      ellipse(0, 0, particle.size, particle.size);
    }

    pop();
  });

  rectMode(CORNER);

  pop();
}

function keyPressed() {
  if (key == "+") {
    particleCount = min(particleCount + 50, MAX_PARTICLE_COUNT);
    spawnParticles();
  }

  if (key == "-") {
    particleCount = max(particleCount - 50, MIN_PARTICLE_COUNT);
    spawnParticles();
  }
}

function mousePressed() {
  spawnParticles();
}
