import {loadImage} from '../loaders.js'
import SpriteSheet from '../spritesheet.js'


class GameOverWin {
    constructor(sprites) {
        this.sprites = sprites;
    }

    draw(context, x, y) {
            this.sprites.draw("GameOverWin", context, x , y);
    }
}

export function loadGameOverWinSprite()
{
    return loadImage('atlas/panda_win.png')
        .then(image => {
            const gameOverSprite = new SpriteSheet(image);
            gameOverSprite.define("GameOverWin", 0, 0, 358, 512);
            return new GameOverWin(gameOverSprite);
        });
}
