const l = (p) => {

  p.setup = function() {
    let canvas = p.createCanvas(0.3*p.windowWidth,p.windowHeight)
    canvas.position(0.7*p.windowWidth,0)
    center_inputs()
    // common_fields()
  }

  p.draw = function() {
    p.background(250)
  }

  center_inputs = function() {
    x_input = p.createInput()
    x_input.position(0.75*p.windowWidth,0)
    x_input.size(20,15)

    y_input = p.createInput()
    y_input.position(x_input.x + x_input.width, x_input.y)
    y_input.size(20,15)

    z_input = p.createInput()
    z_input.position(y_input.x + y_input.width,x_input.y)
    z_input.size(20,15)

    center_button = p.createButton('Change')
    center_button.position(z_input.x + z_input.width, x_input.y)
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
