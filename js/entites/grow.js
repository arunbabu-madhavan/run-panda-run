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
            them.stomper.onGrow();
            them.stomper.bounce();
        }
    }

    update(us, deltaTime,level){
        if(this.collected){
            this.queue(() => level.entities.delete(us));
        }
    }
}
export function loadGrowthPower(){
   
    return loadSpritesheet("grow",64,32)
    .then(createGrowthPowerFactory);
     
}

function createGrowthPowerFactory(sprite){

    function drawGrowthPower(context){
        sprite.draw("growth_power",context,0,0,false);
    }

    return function createGrowthPower(){

        const growthPower = new Entity(38,43);
        growthPower.addTrait(new Behavior());
        growthPower.draw = drawGrowthPower;
        return growthPower;
    }
}