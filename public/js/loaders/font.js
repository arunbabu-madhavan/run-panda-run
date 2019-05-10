import {loadImage} from '../loaders.js'
import SpriteSheet from '../spritesheet.js'


const CHARS = 'MNOPQRSTUVWXYZ@L&1234567890FGHIJKABCDE* ';


class Font {
    constructor(sprites, size) {
        this.sprites = sprites;
        this.size = size;
    }

    print(text, context, x, y) {
        [...text].forEach((char, pos) => {
            this.sprites.draw(char, context, x + pos * this.size, y);
        });
    }
}

export function loadFont()
{
    return loadImage('atlas/font1.png')
        .then(image => {
            const fontSprite = new SpriteSheet(image,16,16);

            const size = 16;
            const rowLen = image.width;
            for (let [index, char] of [...CHARS].entries()) {
                const x = index * size % rowLen;
                const y = Math.floor(index * size / rowLen) * size;
                fontSprite.define(char, x, y, size, size);
            }
    
            return new Font(fontSprite, size);
        });
}
