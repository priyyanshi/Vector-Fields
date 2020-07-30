const l = (p) => {
  var c_input, v_input, s_input, e_input, vx, vy, vz, func, size, amount
  p.preload = function() {
    myFont = p.loadFont('./fonts/rob.ttf')
  }

  p.setup = function() {
    let canvas = p.createCanvas(0.3*p.windowWidth,p.windowHeight)
    canvas.position(0.7*p.windowWidth,0)
    centerText()

   
  }

  p.draw = function() {
    p.background(15,15,15,255)
    p.textFont(myFont, 0.012*p.windowWidth)
    

  }

  centerText = function() {

    p.noStroke()
    p.fill(35,35,40,255)
    c_input = p.createDiv(
      '<img style="width:50%; height:auto; max-width:100%; max-height:100%; margin:auto; display:block; left:0; right:0; position:absolute; top:0; bottom:0;" src="./pics/Color_Center.png"/>'
    )
    c_input.size(0.3*p.windowWidth,0.075*p.windowHeight)
    c_input.position(0.7*p.windowWidth,0)
    c_input.style('background', p.color(40,40,40,255))

    v_input = p.createDiv(
      '<img style="width:46%; height:auto; max-width:100%; max-height:100%; margin:auto; display:block; left:0; right:0; position:absolute; top:0; bottom:0;" src="./pics/Color_Vector.png"/>'
    )
    v_input.size(0.3*p.windowWidth,0.075*p.windowHeight)
    v_input.position(0.7*p.windowWidth,0.2*p.windowHeight)
    v_input.style('background', p.color(40,40,40,255))

    s_input = p.createDiv(
      '<img style="width:42%; height:auto; max-width:100%; max-height:100%; margin:auto; display:block; left:0; right:0; position:absolute; top:0; bottom:0;" src="./pics/Color_Scale.png"/>'
    )
    s_input.size(0.3*p.windowWidth,0.075*p.windowHeight)
    s_input.position(0.7*p.windowWidth,0.5*p.windowHeight)
    s_input.style('background', p.color(40,40,40,255))

    e_input = p.createDiv(
      '<img style="width:50%; height:auto; max-width:100%; max-height:100%; margin:auto; display:block; left:0; right:0; position:absolute; top:0; bottom:0;" src="./pics/Examples.png"/>'
    )
    e_input.size(0.15*p.windowWidth,0.075*p.windowHeight)
    e_input.position(0.7*p.windowWidth,0.7*p.windowHeight)
    e_input.style('background', p.color(40,40,40,255))

    p.push()
    p.textSize(0.012*p.windowWidth)
    p.textAlign(p.LEFT, p.CENTER)

    vx = p.createDiv(
      '<img style="width:100%; height:auto; max-width:100%; max-height:100%; margin:auto; display:block; left:0; right:0; position:absolute; top:0; bottom:0;" src="./pics/x.png"/>'
    )
    vx.size(0.015*p.windowWidth,0.03*p.windowHeight)
    vx.position(0.72*p.windowWidth,0.11*p.windowHeight)

    vy = p.createDiv(
      '<img style="width:auto; height:auto; max-width:100%; max-height:100%; margin:auto; display:block; left:0; right:0; position:absolute; top:0; bottom:0;" src="./pics/y.png"/>'
    )
    vy.size(0.015*p.windowWidth,0.03*p.windowHeight)
    vy.position(0.787*p.windowWidth,0.11*p.windowHeight)

    vz = p.createDiv(
      '<img style="width:auto; height:auto; max-width:100%; max-height:100%; margin:auto; display:block; left:0; right:0; position:absolute; top:0; bottom:0;" src="./pics/z.png"/>'
    )
    vz.size(0.015*p.windowWidth,0.03*p.windowHeight)
    vz.position(0.855*p.windowWidth,0.11*p.windowHeight)

    func = p.createDiv(
      '<img style="width:auto; height:auto; max-width:100%; max-height:100%; margin:auto; display:block; left:0; right:0; position:absolute; top:0; bottom:0;" src="./pics/func.png"/>'
    )
    func.size(0.057*p.windowWidth,0.027*p.windowHeight)
    func.position(0.72*p.windowWidth,0.37*p.windowHeight)

    size = p.createDiv(
      '<img style="width:auto; height:auto; max-width:100%; max-height:100%; margin:auto; display:block; left:0; right:0; position:absolute; top:0; bottom:0;" src="./pics/Size.png"/>'
    )
    size.size(0.057*p.windowWidth,0.026*p.windowHeight)
    size.position(0.72*p.windowWidth,0.60*p.windowHeight)

    amount = p.createDiv(
      '<img style="width:auto; height:auto; max-width:100%; max-height:100%; margin:auto; display:block; left:0; right:0; position:absolute; top:0; bottom:0;" src="./pics/Amount.png"/>'
    )
    amount.size(0.057*p.windowWidth,0.026*p.windowHeight)
    amount.position(0.72*p.windowWidth,0.645*p.windowHeight)

    p.push()
    p.textFont("Helvetica", 0.013*p.windowWidth)
    p.fill(255)
    p.text("î",0.225*p.windowWidth,0.28*p.windowHeight,0.1*p.windowWidth,0.075*p.windowHeight)
    p.text("ĵ",0.225*p.windowWidth,0.335*p.windowHeight,0.1*p.windowWidth,0.075*p.windowHeight)
    p.text("k̂",0.223*p.windowWidth,0.40*p.windowHeight,0.1*p.windowWidth,0.075*p.windowHeight)
    p.pop()
    p.pop()

  }

  
  

}


let my = new p5(l)
