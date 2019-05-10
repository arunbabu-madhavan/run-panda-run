import Entity from '../entity.js'
import { loadSpritesheet } from '../loaders.js'
import Jump from '../traits/Jump.js'
import Go from '../traits/go.js';
import { createAnimation } from '../animation.js';
import Stomper from '../traits/stomper.js';
import Killable from '../traits/killable.js';
import Solid from '../traits/Solid.js';
import Physics from '../traits/Physics.js';



export function loadPanda(){
   
   return loadSpritesheet("panda")
   .then(createPandaFactory);
    
}


function createPandaFactory(pandaSprite){
    const runAnim = createAnimation(['walk-1','walk-2','idle'],26);
    
    function routeFrame(panda){
        if(panda.killable.dead)
            return "dead";
        if(panda.jump.engageTime!==0 ||panda.jump.falling)
        {
            if(panda.vel.y < 0)
                return 'jump-1';
            else if(!panda.jump.falling && Math.abs(panda.vel.x) <= 120)
                return 'jump-2';
            else if(panda.jump.falling)
                return 'jump-3';
            panda.jump.cancel();
        }
        else if(panda.go.distance > 0 ){

            if((panda.vel.x > 0 && panda.go.dir < 0) ||
                (panda.vel.x <0 && panda.go.dir > 0))
            {
                return 'break';
            }
            return runAnim(panda.go.distance);
        }
         

        return 'idle';
    }

    function drawPanda(context){
        pandaSprite.draw(routeFrame(this),context,0,0,this.go.heading < 0);
    }

    return function createPanda(){

        const panda = new Entity(48,62);
        panda.addTrait(new Physics());

        panda.addTrait(new Solid());
        panda.addTrait(new Go());
        panda.addTrait(new Jump());
        panda.addTrait(new Stomper());
        panda.addTrait(new Killable());

        
        panda.pos.set(128,400);
        panda.killable.removeAfter = 1;
        panda.draw = drawPanda;

        return panda;
    }

   
}