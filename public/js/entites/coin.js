import Entity from '../Entity.js';
import Trait from '../traits/Trait.js';
import { loadSpritesheet } from '../loaders.js';


class Behavior extends Trait {
    constructor(){
        super('behavior');
        this.collected = false;
    }

    collides(us,them){
        if(them.stomper && !this.collected)
        {   
            this.collected =true;
            them.stomper.onCollect();
        }
    }

    
 
    update(us, deltaTime,level){
        if(this.collected){
            if(us.pos.y > -10)
                us.pos.y -=5;
            else
            { 
                this.queue(() => level.entities.delete(us));
            }
        }
    }
}
export function loadCoin(){
   
    return loadSpritesheet("coin",32,32)
    .then(createCoinFactory);
     
}

function createCoinFactory(sprite){

    const walkAnim = sprite.animations.get('coins');

    function drawCoin(context){
        sprite.draw(walkAnim(this.lifeTime),context,0,0,false);
    }

    return function createCoin(){

        const coin = new Entity(32,32);
        coin.addTrait(new Behavior());
        coin.draw = drawCoin;
        return coin;
    }
}