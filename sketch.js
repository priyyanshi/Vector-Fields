
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
  var help_div
  var show = false

 
  var state1 = {
    distance : 300,
    center   : [0,0,0],
    rotation : [1,0.5,0.25,0],
  };

  p.preload = function() {
    myFont = p.loadFont('./fonts/rob.ttf')
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
    p.background(15)

    p.textFont(myFont, 0.015*p.windowWidth)
    easycam.update()
    easycam.setRotation(Dw.Rotation.create({angles_xyz:[8*p.PI, 8*p.PI, 9*p.PI]}), 50000)
    
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
    p.stroke(245,75,66)
    p.line(-1*length,-1*center[1],-1*center[2],length,-1*center[1],-1*center[2])
    p.pop()
    // y axis: green
    p.stroke(66,245,114)
    p.line(-1*center[0],-1*length,-1*center[2],-1*center[0],length,-1*center[2])
    // z axis: blue 
    p.stroke(66,90,245)
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
    sel.position(p.windowWidth*0.85, p.windowHeight*0.7)
    sel.option('')
    sel.option('F(x,y,z) = (x)î + (y)ĵ + (z)k̂')
    sel.option('F(x,y,z) = (-y)î + (x)ĵ + (z)k̂')
    sel.option('F(x,y,z) = (1)î + (0)ĵ + (0)k̂')
    sel.option('F(x,y,z) = (1)î + (sin(y))ĵ + (0)k̂')
    sel.selected('Examples')
    sel.changed(mySelectEvent)

    sel.size(0.15*p.windowWidth,0.075*p.windowHeight)
    sel.style('background-color', p.color(54,54,54,255))
    sel.style('color', p.color(250,250,250,255))
    sel.style('padding-left', '10px')
    sel.style('border','none')
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
    var width = 0.03*p.windowWidth
    var height = 40
    var b_width = 0.12*(p.windowWidth)
    var b_height = 40

    var sidebar = p.createDiv()
    sidebar.position(0.7*p.windowWidth,0)
    sidebar.size(0.3*p.windowWidth,p.windowHeight)
    sidebar.style('background-color', p.color(255,0,0,0))
    sidebar.style('box-shadow', '0px 0px 5px 5px rgba(0,0,0,0.5)')

    
    x_comp = p.createInput()
    x_comp.position(0.79*p.windowWidth,0.3*p.windowHeight)
    x_comp.size(b_width,b_height)
    x_comp.style('text-align', 'center')
    x_comp.style('font-size', '30px')

    x = p.createButton('✓')
    x.position(0.94*p.windowWidth, x_comp.y)
    x.size(width,height)
    x.style('background-color', p.color(55,55,55))
    x.style('color', p.color(255,255,255))
    x.style('border', 'none')
    x.style('border-radius', '4px')
    x.style('font-size', '28px')
    x.mousePressed(update_x)

    y_comp = p.createInput()
    y_comp.position(x_comp.x,x_comp.y+x_comp.height+10)
    y_comp.size(b_width,b_height)
    y_comp.style('text-align', 'center')
    y_comp.style('font-size', '30px')
    
    y = p.createButton('✓')
    y.position(0.94*p.windowWidth, y_comp.y)
    y.size(width,height)
    y.style('background-color', p.color(55,55,55))
    y.style('color', p.color(255,255,255))
    y.style('border', 'none')
    y.style('border-radius', '4px')
    y.style('font-size', '28px')
    y.mousePressed(update_y)

    z_comp = p.createInput()
    z_comp.position(x_comp.x,y_comp.y+y_comp.height+10)
    z_comp.size(b_width,b_height)
    z_comp.style('text-align', 'center')
    z_comp.style('font-size', '30px')

    z = p.createButton('✓')
    z.position(0.94*p.windowWidth, z_comp.y)
    z.size(width,height)
    z.style('background-color', p.color(55,55,55))
    z.style('color', p.color(255,255,255))
    z.style('border', 'none')
    z.style('border-radius', '4px')
    z.style('font-size', '28px')
    z.mousePressed(update_z)



    slider = p.createSlider(0.2,10,1,0.2)
    slider.position(0.78*p.windowWidth, 0.61*p.windowHeight)
    slider.size(0.19*p.windowWidth,10)
    //slider.style()
    // s_val = p.createDiv(slider.value())
    // s_val.position(0.75*p.windowWidth, 520)

    slider1 = p.createSlider(1,3,1,1)
    slider1.position(0.78*p.windowWidth, 0.66*p.windowHeight)
    slider1.size(0.19*p.windowWidth,10)
    // s_val1 = p.createDiv(slider1.value())
    // s_val1.position(0.75*p.windowWidth, 570)

  }

  draw_field = function() {

    for (var k = (-1*size)+center[2]; k <= (size)+center[2]; k+=increment) {
      for (var i = (-1*size)+center[0]; i <= (size)+center[0]; i += increment) {
        for (var j = (-1*size)+center[1]; j <= (size)+center[1]; j+=increment) {
          let val = slider.value()
          // s_val.html(val)
          // let val2 = slider1.value()
          // s_val1.html(val2)

          parser.evaluate('x='+i)
          parser.evaluate('y='+j)
          parser.evaluate('z='+k)

          x_inp = parser.evaluate(field[0])
          y_inp = parser.evaluate(field[1])
          z_inp = parser.evaluate(field[2])

          let v0 = p.createVector(i,j,k)
          let v1 = p.createVector((x_inp*val), (y_inp*val), (z_inp*val))
      
          p.push()
          p.stroke(255,255,255)
          p.ambientMaterial(250)
          p.translate(v0.x,v0.y,v0.z)
          p.strokeWeight(0.7)
          p.line(0,0,0,v1.x,v1.y,v1.z)
          p.translate((x_inp*val), (y_inp*val), (z_inp*val))
          p.fill(255,255,255)
          p.sphere(1.5)
          p.translate(0.02*(x_inp*val), 0.02*(y_inp*val), 0.02*(z_inp*val))
          p.sphere(1)
          p.translate(0.01*(x_inp*val), 0.01*(y_inp*val), 0.01*(z_inp*val))
          p.sphere(0.5)
          p.pop()
        }
      }
    }
  }

  help = function() {
    help_button = p.createButton('Help?')
    help_button.position(0.8*p.windowWidth, 0.85*p.windowHeight)
    help_button.size(0.1*p.windowWidth, 50)
    help_button.style('background-color', p.color(44,44,44,255))
    help_button.style('color', p.color(255,255,255))
    help_button.style('border', 'none')
    help_button.style('border-radius', '4px')
    help_button.style('font-size', '20px')
    help_button.mousePressed(help_info)
  }

  help_info = function() {
    console.log(show)
    if (show) {
      show = false
    } else {
      show = true
    }
  }
}




let myp5 = new p5(s)
