function Particle(_x, _y, _size, _color, _shape) {
  this.pos = new p5.Vector(_x, _y);
  this.vel = new p5.Vector(0, 0);
  this.acc = new p5.Vector(0, 0);
  this.target = new p5.Vector(_x, _y);
  this.size = _size;
  this.shape = _shape;
  this.mapped_angle =
    map(_x, 0, width, -180, 180) + map(_y, 0, height, -180, 180);
  this.color = _color;
  this.maxForce = random(MIN_FORCE, MAX_FORCE);

  this.goToTarget = function () {
    let steer = new p5.Vector(this.target.x, this.target.y);

    let distance = dist(this.pos.x, this.pos.y, this.target.x, this.target.y);
    if (distance > 0.5) {
      let distThreshold = 20;
      steer.sub(this.pos);
      steer.normalize();
      steer.mult(
        map(min(distance, distThreshold), 0, distThreshold, 0, this.maxForce)
      );
      this.acc.add(steer);
    }
  };

  this.avoidMouse = function () {
    let mx = mouseX;
    let my = mouseY;

    let mouseDistance = dist(this.pos.x, this.pos.y, mx, my);

    if (mouseDistance < REPULSION_RADIUS) {
      let repulse = new p5.Vector(this.pos.x, this.pos.y);
      repulse.sub(mx, my);
      repulse.mult(
        map(mouseDistance, REPULSION_RADIUS, 0, 0, REPULSION_STRENGTH)
      );
      this.acc.add(repulse);
    }
  };

  this.move = function () {
    // this.goToTarget();

    this.avoidMouse();

    this.vel.mult(0.95);

    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  };
}
