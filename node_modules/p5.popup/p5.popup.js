/*
Repo: https://github.com/wisehackermonkey/p5.popup
Created by oran collins
github.com/wisehackermonkey
oranbusiness@gmail.com
20200629
MIT License

v0.0.9
*/

console.log("### p5.popup v0.0.9 ###");

p5.prototype.popup = (
    message,
    seconds = 1,
    x = width / 2,
    y = height / 2,
    size = Math.max(innerWidth, innerHeight) / 50
) => {
    let stop_frame_number = seconds * frameRate();
    if (frameCount <= stop_frame_number) {
        let opacity_value = floor(
            map(
                abs(frameCount - stop_frame_number),
                0,
                stop_frame_number,
                0,
                255
            )
        );

        push();
        rectMode(CENTER);
        textAlign(CENTER, CENTER);
        textSize(size);

        let popup_width = 0;
        let popup_height = 0;

        let buffer = 10;

        let text_offset_y = 0;

        let font_size = textSize();

        popup_width = (font_size * message.length) / 2;
        popup_height = font_size + buffer;

        if (message.includes("\n")) {
            let newline_count = message.split("\n").length - 1;
            let longest_newline_string_width =
                max(message.split("\n").map((x) => x.length)) + 1;

            popup_width =
                font_size * (longest_newline_string_width / 2) + buffer;
            popup_height = (newline_count + 3) * font_size + buffer;
            text_offset_y = 11; //map(mouseY, 0, height, 1,100)
        }

        noStroke();
        fill(255, 192, 203, opacity_value); //pink

        rect(
            x,
            y,
            popup_width, //(font_size / 1.5) * message.length,
            popup_height, //newline_count * font_size + font_size ,
            5 // rounded corners
        );

        fill(0, 161, 211, opacity_value); //light blue

        text(message, x, y);
        pop();
    }
};
