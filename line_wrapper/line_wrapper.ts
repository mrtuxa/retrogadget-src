import {registerUpdate} from "./common/helper";

// add your components like so:
type System = Gadget & WithWifi & WithLeds<5>
// System = Gadget & WithCPU;
declare const gdt: System;

const font = gdt.ROM.System.SpriteSheets["StandardFont"];

function wrapText(text: string, maxWidth: number): string[] {
    const words = text.split(' ');
    let line = '';
    const lines: string[] = [];
    for (const word of words) {
        if (line.length + word.length + 1 > maxWidth) {
            lines.push(line);
            line = '';
        }
        line += line? ` ${word}` : word;
    }
    if (line) {
        lines.push(line);
    }
    return lines;
}

// @ts-ignore
function println(text: string, videochip: VideoChip, x: number, y: number, backgroundColor: color, textColor: color) {
    const maxLineWidth = 63; // or the maximum number of characters per line
    const lines = wrapText(text, maxLineWidth);

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        videochip.DrawText(vec2(x, y + i * 16 /* adjust line height if needed */), font, `${line}\n`, textColor, backgroundColor);
    }
}


function update() {
    const text = "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.";
    println(text, gdt.VideoChip0, 0, 0, color.black, color.green);
    print(text);
}

registerUpdate(update);