const l = (p) => {
  p.setup = function() {
    let canvas = p.createCanvas(0.3*p.windowWidth,p.windowHeight)
    canvas.position(0.7*p.windowWidth,0)
    center_inputs()

  }

  p.draw = function() {
    p.background(250)
  }

  center_inputs = function() {
    x_input = p.createInput()
    x_input.position(0.7*p.windowWidth,0)
    x_input.size(20,15)

    y_input = p.createInput()
    y_input.position(x_input.x + x_input.width, x_input.y)
    y_input.size(20,15)

    z_input = p.createInput()
    z_input.position(y_input.x + y_input.width,x_input.y)
    z_input.size(20,15)

    center_button = p.createButton('Submit')
    center_button.position(z_input.x + z_input.width, x_input.y)
    center_button.mousePressed(update_center)
  }

  update_center = function() {
    center[0] = x_input.value()
    center[1] = y_input.value()
    center[2] = z_input.value()
  }

  
  

}


let my = new p5(l)
