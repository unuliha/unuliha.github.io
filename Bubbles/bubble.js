class Bubble {
  constructor(pos, dia) {
    this.pos = pos;
    this.dia = dia;
    this.rad = dia / 2;
    this.speed = 3.5;
    this.vel = createVector(
      random(-this.speed, this.speed),
      random(-this.speed, this.speed)
    );
    this.col = color(random(30, 255), random(30, 255), random(30, 255));
  }

  collision(bubble) {
    let diff = p5.Vector.sub(this.pos, bubble.pos);
    let dst = p5.Vector.dist(bubble.pos, this.pos);

    if (dst >= bubble.rad + this.rad) return;

    let overLapHalf = 0.5 * (dst - this.rad - bubble.rad);
    this.pos = p5.Vector.sub(
      this.pos,
      p5.Vector.div(p5.Vector.mult(diff, overLapHalf), dst)
    ); // overlap correction this
    bubble.pos = p5.Vector.add(
      bubble.pos,
      p5.Vector.div(p5.Vector.mult(diff, overLapHalf), dst)
    ); // overlap correction them

    let normal = p5.Vector.div(diff, dst);
    let vdiff = p5.Vector.sub(bubble.vel, this.vel);
    let dotProd = p5.Vector.dot(normal, vdiff);

    this.vel = p5.Vector.add(this.vel, p5.Vector.mult(normal, dotProd));
    bubble.vel = p5.Vector.sub(bubble.vel, p5.Vector.mult(normal, dotProd));
  }

  update() {
    this.pos.add(this.vel);
    let rad = this.dia / 2;

    if (this.pos.x - rad <= 0) {
      this.vel.x *= -1;
      this.pos.x = rad;
    }
    if (this.pos.x + rad >= width) {
      this.vel.x *= -1;
      this.pos.x = width - rad;
    }
    if (this.pos.y - rad <= 0) {
      this.vel.y *= -1;
      this.pos.y = rad;
    }
    if (this.pos.y + rad >= height) {
      this.vel.y *= -1;
      this.pos.y = height - rad;
    }
  }

  draw() {
    push();
    stroke("white");
    ellipse(this.pos.x - this.rad + 5, this.pos.y, 2, 6);

    push();
    noFill();
    stroke(this.col);
    strokeWeight(2);
    ellipse(this.pos.x, this.pos.y, this.dia);
    pop();
  }
}
