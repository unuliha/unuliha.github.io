let bubbles = [];
const diameter = 150;
const numBubble = 20;

function setup() {
    // displayWidth、displayHeight是当前屏幕实际像素尺寸
    createCanvas(displayWidth,displayHeight-200);
    background(0);
    
    for(var i=0; i<numBubble; ++i) {
        // width、height就是createCanvas函数传入的宽和高
        let xPos = random(diameter, width-diameter);
        let yPos = random(diameter, height-diameter);
        // 用(x,y)向量表示位置
        let pos = createVector(xPos, yPos);
        bubbles.push(new Bubble(pos, diameter));
    }

}

function draw() {
    background(30);

    for(var b of bubbles) {
        b.draw();
        b.update();
    }

    for(var i=0; i<bubbles.length; ++i) {
        for(var j=0; j<bubbles.length; ++j) {
            if(i!=j) {
                bubbles[i].collision(bubbles[j]);
            }
        }
    }
}