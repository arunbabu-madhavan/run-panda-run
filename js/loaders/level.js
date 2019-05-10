import Level from '../level.js'
import { LoadJSON, loadSpritesheet } from '../loaders.js';
import Matrix from '../math.js';

import { createBackgroundLayer } from '../layers/background.js';
import { createSpriteLayer } from '../layers/sprite.js';

function createCollisionGrid(tiles,patterns){
    const grid = new Matrix();
    for(const {tile,x,y} of expandTiles(tiles,patterns)){
        grid.set(x,y,{
            type:tile.type
        });
    }
    return grid;
}


function createBackgroundGrid(tiles,patterns){
    const grid = new Matrix();
    for(const {tile,x,y} of expandTiles(tiles,patterns)){
        grid.set(x,y,{
            name:tile.name
        });
    }
    return grid;
}

function setupCollisionGrid(levelSpec,level){
    
    const mergedTiles = levelSpec.layers.reduce((mergedTiles,layerSpec)=>{
        return mergedTiles.concat(layerSpec.tiles);
    },[]);
    const collisionGrid = createCollisionGrid(mergedTiles,levelSpec.patterns);
    level.setCollisionGrid(collisionGrid);
}

function setupBackground(levelSpec,level,bgsprites){
    levelSpec.layers.forEach(layer => {
        const backgroundGrid = createBackgroundGrid(layer.tiles,levelSpec.patterns);
        const backgroundLayer = createBackgroundLayer(level,backgroundGrid,bgsprites,layer.main);
        level.compositor.layers.push(backgroundLayer);
        });
}

function setupEntities(levelSpec,level,entityFactory){

    levelSpec.entities.forEach(({name,pos,canSwim,offsetY,offsetX}) => {
        const createEntity = entityFactory[name];
        pos.forEach(([x,y])=> {
            const entity = createEntity();
               entity.pos.set(x,y);
               level.entities.add(entity);
               entity.canSwim = canSwim;
               if(offsetY)
                 entity.offset.y = offsetY;
               if(offsetX)
                 entity.offset.x = offsetX;
            
        });
       
    });

    const spriteLayer = createSpriteLayer(level.entities);
    level.compositor.layers.push(spriteLayer);
}


export function createLevelLoader(entityFactory){
    
   return function loadLevel(name){
        return LoadJSON(`levels/${name}.json`).then
        (levelSpec => 
            Promise.all([levelSpec, loadSpritesheet(levelSpec.spritesheet)]))
            .then(([levelSpec,bgsprites]) =>{

                const level = new Level();
                setupCollisionGrid(levelSpec,level);
                setupBackground(levelSpec,level,bgsprites);
                setupEntities(levelSpec,level,entityFactory);
            
                return level;
            });
}

}

function* expandSpan(xStart, xLen, yStart, yLen) {
    const coords = [];
    const xEnd = xStart + xLen;
    const yEnd = yStart + yLen;
    for (let x = xStart; x < xEnd; ++x) {
        for (let y = yStart; y < yEnd; ++y) {
           yield({x,y});
        }
    }
}

function* expandTiles(tiles,patterns) {

    function* walkTiles(tiles,offsetX,offsetY)
    {

    for(const tile of tiles)
            {
            for(const {x,y} of expandRanges(tile.ranges)) {
                const derivedX = x + offsetX;
                const derivedY = y + offsetY;
                if(tile.pattern)
                {
                    const tiles = patterns[tile.pattern].tiles;
                   yield* walkTiles(tiles,derivedX,derivedY);
                }
                else{
                    yield {
                    tile,
                    x: derivedX,
                    y: derivedY,};
            }
            }
        }
   
}
    yield* walkTiles(tiles,0,0);

}

function* expandRanges(ranges){
    for(const range of ranges){
        yield* expandRange(range);
    }
}

function expandRange(range){
    if (range.length === 4) {
        const [xStart, xLen, yStart, yLen] = range;
       return expandSpan( xStart, xLen, yStart, yLen);

    } else if (range.length === 3) {
        const [xStart, xLen, yStart] = range;
        return expandSpan( xStart, xLen, yStart, yLen);

    } else if (range.length === 2) {
        const [xStart, yStart] = range;
        return expandSpan( xStart, 1, yStart, 1);
    }
}
