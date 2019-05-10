import Entity from '../entity.js';
import { loadSpritesheet } from '../loaders.js';
import PendulumMove from '../traits/PendulumMove.js'
import Pounce from '../traits/pounce.js';
import Trait from '../traits/Trait.js';
import Killable from '../traits/killable.js';
import Solid from '../traits/Solid.js';
import Physics from '../traits/Physics.js';


class Behavior extends Trait {
    constructor(){
        super('behavior');
    }

    collides(us,them){

        if(us.killable.dead)
            return;

        if(them.stomper && them.killable && ! them.killable.dead){
            if(them.vel.y > us.vel.y){
                us.killable.kill();
                us.pendulumMove.speed = 0;
                them.stomper.bounce();
            }
            else{
                if(us.vel.x * them.go.heading > 0 && them.vel.x !== 0){
                    us.pendulumMove.speed = -us.pendulumMove.speed;
                    us.vel.x = us.pendulumMove.speed;
                }
                us.pounce.start();
                
                them.killable.kill();
            }
        }
    }
}

export function loadFox(){
   
    return loadSpritesheet("fox",128,64)
    .then(createFoxFactory);
     
 }
 
 function createFoxFactory(sprite){

    const walkAnim = sprite.animations.get('walk');
    const pounceAnim = sprite.animations.get('pounce');
    
    function routeFrame(entity){

        if(entity.killable.dead){
            return "dead";
        }

        else if(entity.pounce.engageTime > 0)
        {
          return pounceAnim(entity.lifeTime);
        }
       else{
            entity.pounce.cancel();
            return walkAnim(entity.lifeTime);
       }
    }

    function drawFox(context){
        sprite.draw(routeFrame(this),context,0,0, this.vel.x >0);
    }

    return function createFox(){

        const fox = new Entity(128,32);
        fox.addTrait(new Solid());
        fox.addTrait(new Physics());

        fox.addTrait(new PendulumMove(-50,true));
        fox.addTrait(new Pounce());
        fox.addTrait(new Behavior());
        fox.addTrait(new Killable());

        fox.draw = drawFox;
        fox.offset.y = 20;
        fox.offset.x = -32;
        return fox;
    }
 }