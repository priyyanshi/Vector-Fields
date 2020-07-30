
var x_comp, y_comp, z_comp, slider, s_val, slider1, s_val1, help_button, x, y, z
window.addEventListener('resize', function () { 
  "use strict";
  window.location.reload(); 
});

const s = (p) => {
  var center = [0,0,0]
  var easycam
  let fr = 20
  var size = 45
  let increment = 45
  var length = 1000
  var myFont
  var x_input, y_input, z_input, center_button
  var parser = math.parser()
  var field = ['0','0','0']
  var help_div, close, welcome, close_intro
  var show = false
  var show_intro = true 
 
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
    intro()

  }

  p.draw = function() {

    console.log(show_intro, show)
    p.background(5)

    p.textFont(myFont, 0.015*p.windowWidth)
    easycam.update()
    easycam.setRotation(Dw.Rotation.create({angles_xyz:[8*p.PI, 8*p.PI, 9*p.PI]}), 50000)
    draw_grid()
    draw_field()
    adjust_vectors()


    if (show_intro) {
      welcome.position(0.15*p.windowWidth, 0.2*p.windowHeight)
      close_intro.position(0.15*p.windowWidth+3, 1/5*p.windowHeight+3)

    } else {
      welcome.position(-1500,-1500)
      close_intro.position(-1500,-1500)
    }

    if (!show) {
      help_div.position(-1500,-1500)
      close.position(-1500,-1500)
    } else {
      help_div.position(0.15*p.windowWidth, 1/5*p.windowHeight)
      close.position(0.15*p.windowWidth+3, 1/5*p.windowHeight+3)
    }
  }

  intro = function() {
    welcome = p.createDiv(
      '<br/> <br/> <br/> <img style="width:100%;display:block;margin-left:auto;margin-right:auto"" src="./pics/3D-VECTOR.png"/>' +
      '<p style="font-size:30px;text-align:center"> Click the ? button for the user guide and instructions! </p>'
    )
    welcome.size(2/6*p.windowWidth,3/5*p.windowHeight)
    welcome.position(-1500,-1500)
    welcome.style('background', p.color(40,40,40,255))
    welcome.style('color', p.color(140,140,140,255))
    welcome.style('font-family', "Helvetica")
    welcome.style('font-size', '25px')
    welcome.style('font-weight', '600')
    welcome.style('padding-top', '30px')
    welcome.style('border-radius', '5px')
    welcome.style('font-size', '15px')
    welcome.style('overflow-y', 'scroll')
    welcome.style('overflow-x', 'scroll')
    welcome.style('padding-left', '30px')
    welcome.style('padding-right', '30px')
    welcome.style('box-shadow', '0px 0px 5px 1px rgba(40,40,40,40.75)')


    close_intro = p.createButton('X')
    close_intro.position(-1500,-1500)
    close_intro.size(0.02*p.windowWidth,0.02*p.windowWidth)
    close_intro.style('border', 'none')
    close_intro.style('font-size', '20px')
    close_intro.style('border-radius', '20px')
    close_intro.style('background-color', p.color(40,40,40,255))
    close_intro.style('color', p.color(180,180,180,255))    
    close_intro.position(-1500,-1500)
    close_intro.mousePressed(function() {show_intro = false})

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
    p.stroke(255,75,66)
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
    sel.style('background-color', p.color(140,140,140,255))
    sel.style('color', p.color(40,40,40,255))
    sel.style('padding-left', '10px')
    sel.style('border','none')
    sel.style('font-family', "Helvetica")
    sel.style('font-size', '17px')
    sel.style('font-weight', '650')
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


  update_center = function() {
    if (isNaN(parseInt(x_input.value()))) {
      center[0] = 0
    } else {
      center[0] = parseInt(x_input.value())
    }

    if (isNaN(parseInt(y_input.value()))) {
      center[1] = 0
    } else {
      center[1] = parseInt(y_input.value())
    }

    if (isNaN(parseInt(z_input.value()))) {
      center[2] = 0
    } else {
      center[2] = parseInt(z_input.value())
    }
  }


  vector_inputs = function() {
    var width = 0.03*p.windowWidth
    var height = 0.04*p.windowHeight
    var b_width = 0.12*(p.windowWidth)
    var b_height = 0.04*p.windowHeight

    var sidebar = p.createDiv()
    sidebar.position(0.7*p.windowWidth,0)
    sidebar.size(0.3*p.windowWidth,p.windowHeight)
    sidebar.style('background-color', p.color(255,0,0,0))
    sidebar.style('box-shadow', '0px 0px 5px 2px rgba(0,0,0,255)')


    var i_width = 0.036*p.windowWidth
    var i_height = 0.05*p.windowHeight
    var font_size =0.014*p.windowWidth

    x_input = p.createInput()
    x_input.position(0.74*p.windowWidth,0.1*p.windowHeight)
    x_input.size(i_width,i_height)
    x_input.style('text-align', 'center')
    x_input.style('font-size', '20px')

    y_input = p.createInput()
    y_input.position(x_input.x + 5*x_input.width/3, x_input.y)
    y_input.style('text-align', 'center')
    y_input.style('font-size', '20px')
    y_input.size(i_width,i_height)

    z_input = p.createInput()
    z_input.position(y_input.x + 5*x_input.width/3,x_input.y)
    z_input.style('text-align', 'center')
    z_input.style('font-size', '20px')
    z_input.size(i_width,i_height)
    
    center_button = p.createButton('✓')
    center_button.position(z_input.x + 1.5*z_input.width , x_input.y+2)
    center_button.size(i_width,i_height)
    center_button.style('background-color', p.color(55,55,55))
    center_button.style('color', p.color(255,255,255))
    center_button.style('border', 'none')
    center_button.style('border-radius', '4px')
    center_button.style('font-size', font_size+'px')

    center_button.mousePressed(update_center)

    x_comp = p.createInput()
    x_comp.position(0.79*p.windowWidth,0.32*p.windowHeight)
    x_comp.size(b_width,b_height)
    x_comp.style('text-align', 'center')
    x_comp.style('font-size', '20px')

    x = p.createButton('✓')
    x.position(0.94*p.windowWidth, x_comp.y+2)
    x.size(width,height)
    x.style('background-color', p.color(55,55,55))
    x.style('color', p.color(255,255,255))
    x.style('border', 'none')
    x.style('border-radius', '4px')
    x.style('font-size', font_size+'px')
    x.mousePressed(update_x)

    y_comp = p.createInput()
    y_comp.position(x_comp.x,x_comp.y+x_comp.height)
    y_comp.size(b_width,b_height)
    y_comp.style('text-align', 'center')
    y_comp.style('font-size', '20px')
    
    y = p.createButton('✓')
    y.position(0.94*p.windowWidth, y_comp.y+2)
    y.size(width,height)
    y.style('background-color', p.color(55,55,55))
    y.style('color', p.color(255,255,255))
    y.style('border', 'none')
    y.style('border-radius', '4px')
    y.style('font-size', font_size+'px')
    y.mousePressed(update_y)

    z_comp = p.createInput()
    z_comp.position(x_comp.x,y_comp.y+y_comp.height)
    z_comp.size(b_width,b_height)
    z_comp.style('text-align', 'center')
    z_comp.style('font-size', '20px')

    z = p.createButton('✓')
    z.position(0.94*p.windowWidth, z_comp.y+2)
    z.size(width,height)
    z.style('background-color', p.color(55,55,55))
    z.style('color', p.color(255,255,255))
    z.style('border', 'none')
    z.style('border-radius', '4px')
    z.style('font-size', font_size+'px')
    z.mousePressed(update_z)

    slider = p.createSlider(0.2,10,1,0.2)
    slider.position(0.79*p.windowWidth, 0.60*p.windowHeight)
    slider.size(0.19*p.windowWidth,10)
    //slider.style()
    // s_val = p.createDiv(slider.value())
    // s_val.position(0.75*p.windowWidth, 520)

    slider1 = p.createSlider(1,3,1,1)
    slider1.position(0.79*p.windowWidth, 0.65*p.windowHeight)
    slider1.size(0.19*p.windowWidth,10)
    // s_val1 = p.createDiv(slider1.value())
    // s_val1.position(0.75*p.windowWidth, 570)

    help_button = p.createButton('?')
    help_button.position(0.825*p.windowWidth, 0.85*p.windowHeight)
    help_button.size(0.05*p.windowWidth, 50)
    help_button.style('background-color', p.color(40,40,40,255))
    help_button.style('color', p.color(255,255,255))
    help_button.style('border', 'none')
    help_button.style('border-radius', '4px')
    help_button.style('font-size', '20px')
    help_button.mousePressed(help_info)

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
    
    p.push()
    help_div = p.createDiv(
      '<img style="width:50%;display:block;margin-left:auto;margin-right:auto" src="./pics/User-Guide.png"/> <br/>'+
      '<img style="width:25%;display:block;" src="./pics/General.png"/>' +
      '<ul> <li> The <span style="color:red;">red</span> axis is the x-axis, <span style="color:green;">green</span> is the y-axis, and <span style="color:blue;">blue</span> is the z-axis.</li><li> Notches on the axes, indicate increments of <span style="font-weight:bold;"> 20 units </span>.</li> <li>Double-tap on display to reset view.</li> <li> Pinch or spread to zoom in and out the display.</li> <li>Left-click and drag to rotate the display.</li></ul>' + 
      '<br/>' +
      '<img style="width:54%;display:block;" src="./pics/Center.png"/>' +
      '<ul> <li>Visualizer is centered around (0,0,0) by default. </li> <li> To see the field at another point in space, enter the coordinates in the fields provided on the top-right. </li> </ul>' +
      '<br/>' +
      '<img style="width:52%;display:block;" src="./pics/Input.png"/>' +
      '<ul> <li> Use * when to indicate multiplication, e.g. enter "x*y" not "xy". </li> <li> When using built-in function like sqrt() and sin(), be sure to include brackets, e.g. enter "sin(x)" not "sinx". </li></ul>' +
      '<br/>' +
      '<img style="width:45%;display:block;" src="./pics/Scale.png"/>' +
      '<ul> <li> The Size slider scales the size of each vector.</li> <li>The Amount slider changes the number of vectors displayed.</li></ul>' +
      '<br/>' +
      '<img style="width:27%;display:block;" src="./pics/Examples.png"/>' +
      '<ul> <li> A few examples of vector fields are provided in the Examples dropdown to help you get started.</li> </ul> <br/>'  
      )
    help_div.position(-1500,-1500)
    help_div.size(2/6*p.windowWidth,3/5*p.windowHeight)
    help_div.style('background', p.color(40,40,40))
    help_div.style('color', p.color(140,140,140))
    help_div.style('font-family', "Helvetica")
    help_div.style('font-size', '25px')
    help_div.style('font-weight', '600')
    help_div.style('padding-top', '30px')
    help_div.style('border-radius', '5px')
    help_div.style('font-size', '15px')
    help_div.style('overflow-y', 'scroll')
    help_div.style('overflow-x', 'scroll')
    help_div.style('padding-left', '30px')
    help_div.style('padding-right', '30px')
    help_div.style('box-shadow', '0px 0px 5px 1px rgba(40,40,40,40.75)')

    close = p.createButton('X')
    close.position(-1500,-1500)
    close.size(0.02*p.windowWidth,0.02*p.windowWidth)
    close.style('border', 'none')
    close.style('font-size', '20px')
    close.style('border-radius', '20px')
    close.style('background-color', p.color(40,40,40,255))
    close.style('color', p.color(180,180,180,255))
    close.mousePressed(help_info)
    p.pop()
  }

  help_info = function() {
    if (show) {
      show = false
      show_intro = false
    } else {
      show = true
      show_intro = false
    }
  }
}




let myp5 = new p5(s)
