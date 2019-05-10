import Entity from '../entity.js';
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
            them.vel.x =0;
            them.stomper.onCollectOneUp();
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
export function loadOneUpPower(){
   
    return loadSpritesheet("oneup",64,64)
    .then(createOneUpFactory);
     
}

function createOneUpFactory(sprite){

    function drawOneUpPower(context){
        sprite.draw("oneup_power",context,0,0,false);
    }

    return function createOneUpPower(){

        const oneUpPower = new Entity(32,32);
        oneUpPower.addTrait(new Behavior());
        oneUpPower.draw = drawOneUpPower;
        return oneUpPower;
    }
}