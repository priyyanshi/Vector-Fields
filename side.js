const l = (p) => {
  p.preload = function() {
    myFont = p.loadFont('./fonts/rob.ttf')
  }

  p.setup = function() {
    let canvas = p.createCanvas(0.3*p.windowWidth,p.windowHeight)
    canvas.position(0.7*p.windowWidth,0)
    center_inputs()
   
  }

  p.draw = function() {
    p.background(15,15,15,255)
    p.textFont(myFont, 0.012*p.windowWidth)
    
    centerText()
  }

  centerText = function() {

    p.noStroke()
    p.fill(35,35,35,255)
    p.rect(0,0,0.3*p.windowWidth,0.075*p.windowHeight)
    p.rect(0,0.2*p.windowHeight,0.3*p.windowWidth,0.075*p.windowHeight)
    p.rect(0,0.5*p.windowHeight,0.3*p.windowWidth,0.075*p.windowHeight)
    p.rect(0,0.7*p.windowHeight,0.3*p.windowWidth,0.075*p.windowHeight)
    
    p.fill(255,255,255,255)
    p.textStyle(p.BOLD)
    p.textAlign(p.CENTER, p.CENTER)
    p.text("CENTER COORDINATES",0,0,0.3*p.windowWidth,0.075*p.windowHeight)
    p.text("INPUT VECTOR FIELD ",0,0.2*p.windowHeight,0.3*p.windowWidth,0.075*p.windowHeight)
    p.text("SCALE VECTORS",0,0.50*p.windowHeight,0.3*p.windowWidth,0.075*p.windowHeight)
    p.text("EXAMPLES: ",0.01*p.windowWidth,0.70*p.windowHeight,0.15*p.windowWidth,0.075*p.windowHeight)

    p.push()
    p.textSize(0.012*p.windowWidth)
    p.textAlign(p.LEFT, p.CENTER)

    p.text("x:",0.025*p.windowWidth,0.1*p.windowHeight,0.01*p.windowWidth,0.075*p.windowHeight)
    p.text("y:",0.093*p.windowWidth,0.1*p.windowHeight,0.01*p.windowWidth,0.075*p.windowHeight)
    p.text("z:",0.160*p.windowWidth,0.1*p.windowHeight,0.01*p.windowWidth,0.075*p.windowHeight)
    p.text("Size:",0.025*p.windowWidth,0.59*p.windowHeight,0.02*p.windowWidth,0.075*p.windowHeight)
    p.text("Amount:",0.025*p.windowWidth,0.64*p.windowHeight,0.02*p.windowWidth,0.075*p.windowHeight)
    p.textSize(0.012*p.windowWidth)
    p.text("F(x,y,z) = ",0.025*p.windowWidth,0.35*p.windowHeight,0.1*p.windowWidth,0.075*p.windowHeight)

    p.push()
    p.textFont("Helvetica", 0.015*p.windowWidth)
    p.text("î",0.225*p.windowWidth,0.28*p.windowHeight,0.1*p.windowWidth,0.075*p.windowHeight)
    p.text("ĵ",0.225*p.windowWidth,0.335*p.windowHeight,0.1*p.windowWidth,0.075*p.windowHeight)
    p.text("k̂",0.223*p.windowWidth,0.40*p.windowHeight,0.1*p.windowWidth,0.075*p.windowHeight)
    p.pop()
    p.pop()

  }

  center_inputs = function() {
    var x = 0.036*p.windowWidth
    var y = 40

    x_input = p.createInput()
    x_input.position(0.74*p.windowWidth,0.1*p.windowHeight)
    x_input.style('text-align', 'center')
    x_input.style('font-size', '30px')
    x_input.size(x,y)

    y_input = p.createInput()
    y_input.position(x_input.x + 5*x_input.width/3, x_input.y)
    y_input.style('text-align', 'center')
    y_input.style('font-size', '30px')
    y_input.size(x,y)

    z_input = p.createInput()
    z_input.position(y_input.x + 5*x_input.width/3,x_input.y)
    z_input.style('text-align', 'center')
    z_input.style('font-size', '30px')
    z_input.size(x,y)

    center_button = p.createButton('✓')
    center_button.position(z_input.x + 1.5*z_input.width , x_input.y+2)
    center_button.size(x,y)
    center_button.style('background-color', p.color(55,55,55))
    center_button.style('color', p.color(255,255,255))
    center_button.style('border', 'none')
    center_button.style('border-radius', '4px')
    center_button.style('font-size', '28px')

    center_button.mousePressed(update_center)
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

  

}


let my = new p5(l)
