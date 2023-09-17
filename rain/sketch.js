let value, x, y, d;

function setup() {
  createCanvas(windowWidth - 20, windowHeight - 20);
  background(255);
  arr = [[windowWidth / 2, windowHeight / 2,150,10]];
}

function draw() {
  for (let i = 0; i < arr.length; i++) {
    const [x, y, value, d] = arr[i];
    this.getCircle(x, y, i, value, d);
  }
  this.addCircle(1);
}

function addCircle(n) {
  const newArr = Array.from(new Array(n), (_) => [
    random(0, windowWidth),
    random(0, windowHeight),
    150,
    10,
  ]);
  arr.push(...newArr);
}

function getCircle(x, y, i, value, d) {
  if (value === 255) {
    arr.splice(i, 1);
  }
  arr[i][2]++;
  arr[i][3]++;
  fill(value);
  stroke(value);
  circle(x, y, d);
}

function mousePressed() {
  background(255);
}
