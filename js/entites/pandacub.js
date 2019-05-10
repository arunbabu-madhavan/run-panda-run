import Entity from '../entity.js'
import { loadSpritesheet } from '../loaders.js'
import Jump from '../traits/Jump.js'
import Go from '../traits/go.js';
import { createAnimation } from '../animation.js';
import Stomper from '../traits/stomper.js';
import Killable from '../traits/killable.js';
import Solid from '../traits/Solid.js';
import Physics from '../traits/Physics.js';

export function loadPandaCub(){
   return loadSpritesheet("pandacub")
       .then(createPandaCubFactory);
}

function createPandaCubFactory(pandaCubSprite){
    const runAnim = createAnimation(['walk-1','walk-2','walk-3','walk-4'],30);
    
    function routeFrame(panda){
        if(panda.killable.dead)
            return "dead";
        
     if(panda.swim)
        {
            panda.offset.y = -40;
            panda.stateChangeF = 0;
            return "swim-1";
        }
    if(!panda.swim && panda.offset.y != -15)
        {
            panda.stateChangeF++;
            if(panda.stateChangeF > 20 )
                panda.offset.y = -15;
            panda.stateChangeT = 0;
        }
        
        if(panda.jump.engageTime!==0 ||panda.jump.falling)
        {
            if(panda.vel.y < 0)
                return 'jump';
            else if(!panda.jump.falling && Math.abs(panda.vel.x) <= 120)
                return 'jump';
            else if(panda.jump.falling)
                return 'jump';
            panda.jump.cancel();
        }
        else if(panda.go.distance > 0 ){

            if((panda.vel.x > 0 && panda.go.dir < 0) ||
                (panda.vel.x <0 && panda.go.dir > 0))
            {
                return 'break';
            }

            if(panda.vel.x == 0)
                return 'idle';
            return runAnim(panda.go.distance);
        }
         
        return 'idle';
    }

    function drawPanda(context){
        pandaCubSprite.draw(routeFrame(this),context,0,0,this.go.heading > 0);
    }

    return function createPandaCub(){

        const pandacub = new Entity(48,62);
        pandacub.isCub = true;
        pandacub.addTrait(new Physics());
        pandacub.stateChangeT = pandacub.stateChangeF = 0;
        pandacub.addTrait(new Solid());
        var goTrait = new Go();
        goTrait.acceleration = 1000;
    //    goTrait.turbo = (keyState)=>{};
        pandacub.addTrait(goTrait);
        pandacub.addTrait(new Jump());
        pandacub.addTrait(new Stomper());
        pandacub.addTrait(new Killable());
     //   pandacub.canSwim = true;
        pandacub.pos.set(128,0);
        pandacub.killable.removeAfter = 1;
        pandacub.draw = drawPanda;
        return pandacub;
    }

   
}