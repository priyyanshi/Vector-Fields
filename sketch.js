let center = [0,0,0]

const s = (p) => {
  var easycam
  let fr = 20
  let size = 50
  let increment = 20
  var length = 1000
  var myFont
  let equation = []

  var state1 = {
    distance : 200,
    center   : [0,0,0],
    rotation : [1,0.5,0.25,0],
  };

  p.preload = function() {
    myFont = p.loadFont('./fonts/Inconsolata-Black.ttf')
  }

  p.setup = function() {
    let canvas = p.createCanvas(0.7*p.windowWidth,p.windowHeight, p.WEBGL)
    canvas.position(0,0)
    easycam = new Dw.EasyCam(this._renderer, state1)
    easycam.setRotation(Dw.Rotation.create({angles_xyz:[8*p.PI, 8*p.PI, 9*p.PI]}), 50000)
    p.frameRate(fr)
  }

  p.draw = function() {

    easycam.setRotation(Dw.Rotation.create({angles_xyz:[8*p.PI, 8*p.PI, 9*p.PI]}), 50000)
    p.background(15)
    draw_grid()
    draw_field()
  }
  
  draw_grid = function() {
    p.strokeWeight(0.8)
    p.push()
    // x axis: red
    p.stroke(250,0,0)
    p.line(-1*length,-1*center[1],-1*center[2],length,-1*center[1],-1*center[2])
    // y axis: green
    p.stroke(0,250,0)
    p.line(-1*center[0],-1*length,-1*center[2],-1*center[0],length,-1*center[2])
    // z axis: blue 
    p.stroke(0,0,250)
    p.line(-1*center[0],-1*center[1],-1*length,-1*center[0],-1*center[1],length)
    
    for (var i=-1*length ; i<length; i+=20){
      if (i != 0) {
        p.strokeWeight(0.25)
        p.stroke(255,0,0)
        p.line(i,-1*center[1],-1.5-center[2],i,-1*center[1],1.5-center[2])
        p.line(i,-1.5-center[1],-1*center[2],i,1.5-center[1],-1*center[2])
        p.stroke(0,255,0)
        p.line(-1.5-center[0],i,-1*center[2],1.5-center[0],i,-1*center[2])
        p.line(-1*center[0],i,-1.5-center[2],-1*center[0],i,1.5-center[2])
        p.stroke(0,0,255)
        p.line(-1*center[0],-1.5-center[1],i,-1*center[0],1.5-center[1],i)
        p.line(-1.5-center[0],-1*center[1],i,1.5-center[0],-1*center[1],i)
      }
    }
   
  }

  draw_field = function() {
    // vector field F(x,y,z) = <x,y,z>
    // vector field F(x,y,z) = <-y,x,z>
    for (var k = (-1*size); k <= (size); k+=increment) {
      for (var i = (-1*size); i <= (size); i += increment) {
        for (var j = (-1*size); j <= (size); j+=increment) {
          p.strokeWeight(5)
          p.stroke(255,255,255)
          p.point(i,j,k)
          p.strokeWeight(1)
          p.line(i,j,k,1.2*i,1.2*j,1.2*k)

        }
      }
    }
  }

}


let myp5 = new p5(s)
