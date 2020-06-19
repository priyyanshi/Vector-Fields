var easycam;
let fr = 20;
let size = 50;
let increment = 20;

var state1 = {
  distance : 100,
  center   : [0,0,0],
  rotation : [1,0.5,0.25,0],
};

function setup() {
  createCanvas(0.9*windowWidth,0.9*windowHeight, WEBGL);
  easycam = new Dw.EasyCam(this._renderer, state1);
  easycam.setRotation(Dw.Rotation.create({angles_xyz:[8*PI, 8*PI, 9*PI]}), 50000);
  frameRate(fr);
}
function draw() {

  // rotation animation
  easycam.setRotation(Dw.Rotation.create({angles_xyz:[8*PI, 8*PI, 9*PI]}), 50000);
  background(10);
  
  // x,y,z axis
  strokeWeight(0.8)
  push();
  stroke(250,0,0);
  line(-200,0,0,200,0,0);
  stroke(0,250,0);
  line(0,-200,0,0,200,0);
  stroke(0,0,250);
  line(0,0,-200,0,0,200);
  pop();
  
  // vector field F(x,y,z) = <x,y,z>
  // vector field F(x,y,z) = <-y,x,z>
  for (var k=-1*size; k<=size; k+=increment)
    for (var i = -1*size; i <= size; i += increment) {
      for (var j = -1*size; j<= size; j+=increment) {
        var ball = new Arrow(i,j,k);
        ball.draw();
        ball.drawArrow();
      }
    }


    
}


class Arrow {
  constructor(x,y,z) {
    this.x = x;
    this.y = y;
    this.z = z; 
    this.r = 0.1;
  }

  draw() {
    push();
    point(this.x,this.y,this.z);
    pop();
  }

  drawArrow() {
    push();
    stroke(195,195,195);
    strokeWeight(0.5);
    line(this.x, this.y, this.z, 1.2*this.x, 1.2*this.y, 1.2*this.z);
    strokeWeight(5)
    point(1.2*this.x, 1.2*this.y, 1.2*this.z);
    pop();
  }

}

