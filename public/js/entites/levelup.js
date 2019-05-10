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
            them.vel.x =0;
            them.stomper.onCollectLevelUp();
        }
    }

    update(us, deltaTime,level){
        if(this.collected){
            this.queue(() => level.entities.delete(us));
        }
    }
}
export function loadLevelUpPower(){
   
    return loadSpritesheet("levelup",64,64)
    .then(createLevelUpFactory);
     
}

function createLevelUpFactory(sprite){


    function drawLevelUpPower(context){
        sprite.draw("levelup_power",context,0,0,false);
    }

    return function createLevelUpPower(){

        const levelUpPower = new Entity(32,32);
        levelUpPower.addTrait(new Behavior());
        levelUpPower.draw = drawLevelUpPower;
        return levelUpPower;
    }
}