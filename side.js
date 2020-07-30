const l = (p) => {
  p.preload = function() {
    myFont = p.loadFont('./fonts/rob.ttf')
  }

  p.setup = function() {
    let canvas = p.createCanvas(0.3*p.windowWidth,p.windowHeight)
    canvas.position(0.7*p.windowWidth,0)
   
  }

  p.draw = function() {
    p.background(15,15,15,255)
    p.textFont(myFont, 0.012*p.windowWidth)
    
    centerText()

  }

  centerText = function() {

    p.noStroke()
    p.fill(35,35,40,255)
    p.rect(0,0,0.3*p.windowWidth,0.075*p.windowHeight)
    p.fill(35,35,40,255)
    p.rect(0,0.2*p.windowHeight,0.3*p.windowWidth,0.075*p.windowHeight)
    p.fill(35,35,40,255)
    p.rect(0,0.5*p.windowHeight,0.3*p.windowWidth,0.075*p.windowHeight)
    p.fill(35,35,40,255)
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
    p.textFont("Helvetica", 0.013*p.windowWidth)
    p.text("î",0.225*p.windowWidth,0.28*p.windowHeight,0.1*p.windowWidth,0.075*p.windowHeight)
    p.text("ĵ",0.225*p.windowWidth,0.335*p.windowHeight,0.1*p.windowWidth,0.075*p.windowHeight)
    p.text("k̂",0.223*p.windowWidth,0.40*p.windowHeight,0.1*p.windowWidth,0.075*p.windowHeight)
    p.pop()
    p.pop()

  }

  
  

}


let my = new p5(l)
