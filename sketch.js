let center = [0,0,0]

const s = (p) => {
  var easycam
  let fr = 20
  let size = 50
  let increment = 20
  var length = 1000
  var myFont
  var x_comp, y_comp, z_comp, slider, s_val
  var parser = math.parser()
  var field = [0,0,0]

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
    vector_inputs()

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
  
  update_x = function() {
    field[0] = x_comp.value()
  }

  update_y = function() {
    field[1] = y_comp.value()
  }

  update_z = function() {
    field[2] = z_comp.value()
  }

  vector_inputs = function() {

    x_comp = p.createInput()
    x_comp.position(0.85*p.windowWidth,50)
    x_comp.size(0.05*p.windowWidth,15)
    x_div = p.createDiv('î')
    x_div.position(x_comp.width+x_comp.x+ 8,x_comp.y)

    x = p.createButton('Ok')
    x.position(0.94*p.windowWidth, x_comp.y)
    x.mousePressed(update_x)

    y_comp = p.createInput()
    y_comp.position(x_comp.x,x_comp.y+x_comp.height+10)
    y_comp.size(0.05*p.windowWidth,15)
    y_div = p.createDiv('ĵ')
    y_div.position(x_comp.width+x_comp.x+ 8,y_comp.y-1)

    y = p.createButton('Ok')
    y.position(0.94*p.windowWidth, y_comp.y)
    y.mousePressed(update_y)

    z_comp = p.createInput()
    z_comp.position(x_comp.x,y_comp.y+y_comp.height+10)
    z_comp.size(0.05*p.windowWidth,15)
    z_div = p.createDiv('k̂')
    z_div.position(x_comp.width+x_comp.x+ 6,z_comp.y+3)

    z = p.createButton('Ok')
    z.position(0.94*p.windowWidth, z_comp.y)
    z.mousePressed(update_z)

    v_div = p.createDiv('F(x, y, z) = ')
    v_div.position(0.71*p.windowWidth,y_comp.y-1)

    slider = p.createSlider(0,10,1,0.5)
    slider.position(0.75*p.windowWidth, 200)
    s_val = p.createDiv(slider.value())
    s_val.position(0.75*p.windowWidth, 220)
  }

  draw_field = function() {
    // vector field F(x,y,z) = <x,y,z>
    // vector field F(x,y,z) = <-y,x,z>
    for (var k = (-1*size); k <= (size); k+=increment) {
      for (var i = (-1*size); i <= (size); i += increment) {
        for (var j = (-1*size); j <= (size); j+=increment) {

          let val = slider.value()
          s_val.html(val)

          parser.evaluate('x='+i)
          parser.evaluate('y='+j)
          parser.evaluate('z='+k)

          x_inp = parser.evaluate(field[0])
          y_inp = parser.evaluate(field[1])
          z_inp = parser.evaluate(field[2])

          p.line(i,j,k,val*(i+x_inp),val*(j+y_inp),val*(k+z_inp))
        }
      }
    }
  }

}


let myp5 = new p5(s)
