// by oran collins
// github.com/wisehackermonkey
// oranbusiness@gmail.com
// 20200630

function setup() {
    // createCanvas(100, 100);
    // createCanvas(windowWidth,windowHeight);

    createCanvas(500, 400);
}

function draw() {
    background(50);

    // one line example
    popup("p5.Popup.js", 1,width/2,(height/4)*1,);
    
    // Mulit line example
    popup("Example: One line popup",3,width/2,(height/4)*2)
    // or
    popup(
        `Multi-line example
one
two
three`,
    5,width/2,(height/5)*4
    );
}
