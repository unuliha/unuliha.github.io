let r, g, b, x, y, d;
let alpha;
function setup() {
  createCanvas(windowWidth-20, windowHeight-20);
  background(255);
}

function draw() {
  r = random(0, 255);
  g = random(0, 255);
  b = random(0, 255);
  alpha = random(0, 255);
  x = random(0, windowWidth);
  y = random(0, windowHeight);
  d = random(0, windowHeight / 10);
  fill(r, g, b, alpha);
  circle(x, y, d);
}

function mousePressed() {
  background(255);
}
