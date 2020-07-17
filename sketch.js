let center = [0,0,0]

const s = (p) => {
  var easycam
  let fr = 20
  var size = 45
  let increment = 45
  var length = 1000
  var myFont
  var x_comp, y_comp, z_comp, slider, s_val, slider1, s_val1, help_button
  var parser = math.parser()
  var field = ['0','0','0']
 
  var state1 = {
    distance : 300,
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
    common_fields()
    help()
  }

  p.draw = function() {
    easycam.update()
    easycam.setRotation(Dw.Rotation.create({angles_xyz:[8*p.PI, 8*p.PI, 9*p.PI]}), 50000)
    p.background(15)
    draw_grid()
    draw_field()
    adjust_vectors()
  }

  adjust_vectors = function() {
    if (slider1.value() == 1) increment = 45
    else if (slider1.value() == 2) increment = 30
    else if (slider1.value() == 3) increment = 20
  }
  
  draw_grid = function() {
    p.strokeWeight(0.8)
    p.push()
    // x axis: red
    p.stroke(250,0,0)
    p.line(-1*length,-1*center[1],-1*center[2],length,-1*center[1],-1*center[2])
    p.pop()
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

  common_fields = function() {
    p.textAlign(p.CENTER)
    sel = p.createSelect()
    sel.position(p.windowWidth*0.735, p.windowHeight*0.4)
    sel.option('Examples')
    sel.option('F(x,y,z) = (x)î + (y)ĵ + (z)k̂')
    sel.option('F(x,y,z) = (-y)î + (x)ĵ + (z)k̂')
    sel.option('F(x,y,z) = (1)î + (0)ĵ + (0)k̂')
    sel.option('F(x,y,z) = (1)î + (sin(y))ĵ + (0)k̂')
    sel.selected('Examples')
    sel.changed(mySelectEvent);
  }

  mySelectEvent = function() {
    if (sel.value() === 'F(x,y,z) = (x)î + (y)ĵ + (z)k̂') {
      field[0] = 'x'
      field[1] = 'y'
      field[2] =  'z'
    } else if (sel.value() === 'F(x,y,z) = (-y)î + (x)ĵ + (z)k̂') {
      field[0] = '-y'
      field[1] = 'x'
      field[2] =  'z'
    } else if (sel.value() === 'F(x,y,z) = (1)î + (0)ĵ + (0)k̂') {
      field[0] = '10'
      field[1] = '0'
      field[2] =  '0'
    } else if (sel.value() === 'F(x,y,z) = (1)î + (sin(y))ĵ + (0)k̂') {
      field[0] = '10'
      field[1] = '10sin(y)'
      field[2] =  '0'
    } else {
      field[0] = '0'
      field[1] = '0'
      field[2] =  '0'
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

    x = p.createButton('✓')
    x.position(0.94*p.windowWidth, x_comp.y)
    x.mousePressed(update_x)

    y_comp = p.createInput()
    y_comp.position(x_comp.x,x_comp.y+x_comp.height+10)
    y_comp.size(0.05*p.windowWidth,15)
    y_div = p.createDiv('ĵ')
    y_div.position(x_comp.width+x_comp.x+ 8,y_comp.y-1)

    y = p.createButton('✓')
    y.position(0.94*p.windowWidth, y_comp.y)
    y.mousePressed(update_y)

    z_comp = p.createInput()
    z_comp.position(x_comp.x,y_comp.y+y_comp.height+10)
    z_comp.size(0.05*p.windowWidth,15)
    z_div = p.createDiv('k̂')
    z_div.position(x_comp.width+x_comp.x+ 6,z_comp.y+3)

    z = p.createButton('✓')
    z.position(0.94*p.windowWidth, z_comp.y)
    z.mousePressed(update_z)

    v_div = p.createDiv('F(x, y, z) = ')
    v_div.position(0.71*p.windowWidth,y_comp.y-1)

    slider = p.createSlider(0,10,1,0.2)
    slider.position(0.75*p.windowWidth, 200)
    s_val = p.createDiv(slider.value())
    s_val.position(0.75*p.windowWidth, 220)

    slider1 = p.createSlider(1,3,1,1)
    slider1.position(0.75*p.windowWidth, 250)
    s_val1 = p.createDiv(slider1.value())
    s_val1.position(0.75*p.windowWidth, 270)
  }

  draw_field = function() {

    for (var k = (-1*size)+center[2]; k <= (size)+center[2]; k+=increment) {
      for (var i = (-1*size)+center[0]; i <= (size)+center[0]; i += increment) {
        for (var j = (-1*size)+center[1]; j <= (size)+center[1]; j+=increment) {
          let val = slider.value()
          s_val.html(val)
          let val2 = slider1.value()
          s_val1.html(val2)

          parser.evaluate('x='+i)
          parser.evaluate('y='+j)
          parser.evaluate('z='+k)

          x_inp = parser.evaluate(field[0])
          y_inp = parser.evaluate(field[1])
          z_inp = parser.evaluate(field[2])

          let v0 = p.createVector(i,j,k)
          let v1 = p.createVector((x_inp*val), (y_inp*val), (z_inp*val))
      
          p.push()
          p.stroke(200,200,0)
          p.translate(v0.x,v0.y,v0.z)
          p.strokeWeight(0.7)
          p.line(0,0,0,v1.x,v1.y,v1.z)
          p.translate((x_inp*val), (y_inp*val), (z_inp*val))
          p.fill(255,0,0)
          p.sphere(1.5)
          p.translate(0.03*(x_inp*val), 0.03*(y_inp*val), 0.03*(z_inp*val))
          p.sphere(1)
          p.translate(0.02*(x_inp*val), 0.02*(y_inp*val), 0.02*(z_inp*val))
          p.sphere(0.5)
          p.pop()
        }
      }
    }
  }

  help = function() {
    help_button = p.createButton('Help?')
    help_button.position(0.8*p.windowWidth, 0.6*p.windowHeight)
    help_button.mousePressed(help_info)
  }

  help_info = function() {
    alert('Hello')
  }
}




let myp5 = new p5(s)
