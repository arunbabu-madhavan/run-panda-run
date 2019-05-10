import Entity from '../Entity.js';
import Trait from '../traits/Trait.js';
import { loadSpritesheet } from '../loaders.js';
import Swim from '../traits/Swim.js';
import Solid from '../traits/Solid.js';
import Physics from '../traits/Physics.js';
import Killable from '../traits/killable.js';


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
                us.solid.obstructs = false;
                them.stomper.bounce(700);
            }
            else {
                them.killable.kill();
            }
        }
    }
}

export function loadCroc(){
   
    return loadSpritesheet("croc",128,32)
    .then(createCrocFactory);
     
 }
 
 function createCrocFactory(sprite){

    const walkAnim = sprite.animations.get('walk');


    function drawCroc(context){
        sprite.draw(walkAnim(this.lifeTime),context,0,0, this.vel.x >0);
    }

    return function createCroc(){

        const croc = new Entity(128,32);
        croc.offset.y  =10;
        croc.canSwim = true;

        croc.addTrait(new Physics());

        croc.addTrait(new Solid());
        croc.addTrait(new Behavior());
        croc.addTrait(new Swim(-10,false));
        
        croc.addTrait(new Killable());
       
        croc.draw = drawCroc;
        return croc;
    }
 }