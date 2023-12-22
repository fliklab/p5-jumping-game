function spawnParticles() {
  particles = [];

  maxSize = map(
    particleCount,
    MIN_PARTICLE_COUNT,
    MAX_PARTICLE_COUNT,
    MAX_PARTICLE_SIZE,
    MIN_PARTICLE_SIZE
  );

  for (let i = 0; i < particleCount; i++) {
    let max_attempts = 20;
    let attempts = 0;
    let newParticle = null;

    // Pick a random position from the active image and attempt to spawn a valid particle.
    while (newParticle == null) {
      let x = random(width);
      let y = random(height);

      if (particles.length > 0) {
        let smallestSize = null;

        for (let i = 0; i < particles.length; i++) {
          let otherParticle = particles[i];
          let d = dist(x, y, otherParticle.target.x, otherParticle.target.y);
          let newSize = (d - otherParticle.size / 2) * 2;

          if (smallestSize == null || newSize < smallestSize) {
            smallestSize = newSize;
          }
        }

        if (smallestSize > 0) {
          newParticle = new Particle(
            x,
            y,
            min(smallestSize, maxSize) * 0.75,
            color(255, 255, 255, 200),
            int(random(4))
          );
        }
      } else {
        newParticle = new Particle(
          x,
          y,
          maxSize,
          color(255, 255, 255, 200),
          int(random(4))
        );
      }

      attempts += 1;
      if (attempts > max_attempts) {
        break;
      }
    }

    if (newParticle != null) {
      particles.push(newParticle);
    }
  }
}
