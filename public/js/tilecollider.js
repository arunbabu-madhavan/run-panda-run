import TileResolver from "./tileresolver.js";
import { Sides } from "./entity.js";

export default class TileCollider{
    constructor(tileMatrix)
    {
        this.tiles = new TileResolver(tileMatrix,64);
    }

    checkX(entity)
    {

        let x;

        if(entity.vel.x > 0){
            x = entity.bounds.right;
        }
        else if (entity.vel.x < 0){
            x = entity.bounds.left;
        }
        else{
            return;
        }

        const  matches = 
            this.tiles.searchByRange(x,x ,
                entity.bounds.top , entity.bounds.bottom);
                matches.forEach(match =>{

                    if(match.tile.type === 'water' && entity.canSwim)
                        entity.swim = true;  
                    else 
                        entity.swim = false;

                    if(match.tile.type === 'water' && !entity.canSwim)
                        return;
                    

                    if(match.tile.type === 'block' && entity.stomper)
                        return;
                    

                    if(match.tile.type !== 'block' && match.tile.type !== 'ground' 
                                    && match.tile.type !== 'water')
                        return;
       
        if(entity.vel.x > 0) {
            if(entity.bounds.right  > match.x1){
                entity.obstruct(Sides.RIGHT,match.tile.type,match);
            }
        }
        else if(entity.vel.x < 0){
            if((entity.bounds.left)  < match.x2){
            entity.obstruct(Sides.LEFT,match.tile.type,match);
            }
            
        }
    });
}


    checkY(entity){

        let y;

        if(entity.vel.y > 0){
            y = entity.bounds.bottom;
        }
        else if (entity.vel.y < 0){
            y = entity.bounds.top;
        }
        else{
            return;
        }
        const  matches = 
            this.tiles.searchByRange(entity.bounds.left, entity.bounds.right ,
                y,y);
                matches.forEach(match =>{

                    if(match.tile.type === 'water' && entity.canSwim )
                    {
                        entity.swim = true;  
                    }
                    else 
                        entity.swim = false;
                        
                    if(match.tile.type === 'water' && !entity.canSwim)
                        return;

                        if(match.tile.type === 'block' && entity.stomper)
                        return;
                    

                    if(match.tile.type !== 'ground' && match.tile.type !== 'water' 
                    && match.tile.type !== 'block' )
                        return;

        if(entity.vel.y > 0){
           
            if(entity.bounds.bottom  > match.y1 ){
                entity.obstruct(Sides.BOTTOM, match.tile.type, match);
            }
          
        }
        else if(entity.vel.y < 0){
            if((entity.bounds.top)  < match.y2){
                
                entity.obstruct(Sides.TOP, match.tile.type,match);
            }
        }
    });
  
}
}
