import {loadImage} from '../loaders.js'
import SpriteSheet from '../spritesheet.js'


class GameOver {
    constructor(sprites) {
        this.sprites = sprites;
    }

    draw(context, x, y) {
            this.sprites.draw("GameOver", context, x , y);
    }
}

export function loadGameOverSprite()
{
    return loadImage('atlas/game-over.png')
        .then(image => {
            const gameOverSprite = new SpriteSheet(image);
            gameOverSprite.define("GameOver", 0, 0, 256, 256);
            return new GameOver(gameOverSprite);
        });
}
