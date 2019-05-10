
import SpriteSheet from './spritesheet.js';
import { createAnimation } from './animation.js';

export function loadImage(url){
    return new Promise(resolve =>{
        const image = new Image();
        image.onload = () =>{
            resolve(image);
        };
        image.src = url;
    });
}

export function LoadJSON(url){
   return fetch(url)
    .then(r=>r.json());
}

export function loadSpritesheet(name){
   return LoadJSON(`sprites/${name}.json`)
                .then(sheetSpec =>  Promise.all([sheetSpec,loadImage(sheetSpec.imageUrl)])
                    .then(([sheetSpec,image])=>{
                        const sprites = new SpriteSheet(image,sheetSpec.tileW,sheetSpec.tileH);
                    if(sheetSpec.tiles) {
                        sheetSpec.tiles.forEach(tileSpec =>{
                            try{sprites.defineTile(tileSpec.name
                                ,tileSpec.index[0],tileSpec.index[1]);

                            }catch{
                                console.log(tileSpec.name)
                            }
                        });
                    }
                    if(sheetSpec.frames) {
                        sheetSpec.frames.forEach(frameSpec => {
                            sprites.define(frameSpec.name,...frameSpec.rect);
                        });
                    }
                    if(sheetSpec.animations) {
                        sheetSpec.animations.forEach(animSpec => {
                            const animation = createAnimation(animSpec.frames,animSpec.frameLen);
                            sprites.defineAnimation(animSpec.name,animation);
                        });
                    }
            
                return sprites;
   }));
}
