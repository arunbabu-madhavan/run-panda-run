import Entity from '../Entity.js';
import { loadSpritesheet } from '../loaders.js';
import PendulumMove  from '../traits/PendulumMove.js'
import Trait from '../traits/Trait.js';
import Killable from '../traits/killable.js';
import Solid from '../traits/Solid.js';
import Physics from '../traits/Physics.js';

export function loadWolf(){
   
    return loadSpritesheet("wolf",64,32)
    .then(createWolfFactory);
     
 }

 const STATE_WALKING = Symbol('walking');
 const STATE_SLEEPING = Symbol('sleeping');
 const STATE_GROWLING = Symbol('growling');

 class Behavior extends Trait {
    constructor(){
        super('behavior');
        this.state = STATE_WALKING;
        this.walkTime = Math.random() * 18 | 0;
        this.walkDuration = 18;
        this.sleepTime = 0;
        this.sleepDuration =  Math.random() * 7 | 0;
        this.growlTime = 0;
        this.growlDuration=1;
    }

    collides(us,them){
        
        if(!them.stomper)
             return;
        if(them.killable.dead)
            return;
        if(us.killable.dead)
            return;
        
       if(this.state != STATE_SLEEPING)
        {
            if(us.vel.x * them.go.heading > 0 && them.vel.x != 0){
                us.heading =  us.vel.x  > 0;
                us.vel.x = 0;
                us.pendulumMove.speed  = 0;
                us.heading = !us.heading;
            }
            if(!them.grown)
           {    
                them.killable.kill();
                this.state = STATE_GROWLING;
                us.pos.x =  (them.pos.x + ((us.heading ? -1 :1) * 64));
           }
           else{
               
            if(them.vel.y > us.vel.y){
                them.stomper.bounce();
                this.state = STATE_SLEEPING;
                us.heading = us.vel.x > 0;
                us.pendulumMove.speed = 0;
                us.vel.x = 0;
                this.walkTime = 0;
            }
            else{
                them.killable.kill();
                us.pos.x =  (them.pos.x + ((us.heading ? -1 :1) * 64));
                this.state = STATE_GROWLING;

            }
        
           }

        }
    }

    update(us, deltaTime){
        if(this.state === STATE_WALKING){
            this.walkTime += deltaTime;
            if(this.walkTime > this.walkDuration && !us.killable.dead){
                this.state = STATE_SLEEPING;
                us.heading = us.vel.x > 0;
                us.pendulumMove.speed = 0;
                us.vel.x = 0;
                this.walkTime = 0;
            }
        }
        else if(this.state === STATE_SLEEPING)
        {
            this.sleepTime += deltaTime;
            if(this.sleepTime > this.sleepDuration && !us.killable.dead){
                this.state = STATE_WALKING;
                us.pendulumMove.speed = us.pendulumMove.initSpeed;
                this.sleepTime = 0;
            }
        }
        else{
            this.growlTime += deltaTime;
            us.pendulumMove.speed  = 0;
            us.vel.x = 0;
           
            if(this.growlTime > this.growlDuration && !us.killable.dead){
                this.state = STATE_WALKING;
                us.pendulumMove.speed = us.pendulumMove.initSpeed;
                this.growlTime =0;
            }
        }
    }

}
 
 function createWolfFactory(sprite){

    const walkAnim = sprite.animations.get('walk');
    const getupAnim = sprite.animations.get('getup');
    const growlAnim = sprite.animations.get('growl');


    function routeAnim(wolf){

        if(wolf.killable.dead)
          return "sleep";


        if(wolf.behavior.state == STATE_WALKING){
            return walkAnim(wolf.lifeTime);
        }

        if(wolf.behavior.state == STATE_SLEEPING)
             return "sleep";
        if(wolf.behavior.state == STATE_GROWLING)
            return growlAnim(wolf.lifeTime);
    }

    function drawWolf(context){
        if(this.vel.x != 0)
            sprite.draw(routeAnim(this),context,0,0, this.vel.x > 0 );
        if(this.vel.x == 0)
            sprite.draw(routeAnim(this),context,0,0, this.heading );
    }

    return function createWolf(){

        const wolf = new Entity(64,32);
        wolf.addTrait(new Physics());

        wolf.addTrait(new Solid());
        wolf.addTrait(new PendulumMove((Math.random() * 9) + 9,true));
        wolf.addTrait(new Behavior());
        wolf.addTrait(new Killable());


        wolf.draw = drawWolf;
        wolf.offset.y = 28;

        
        return wolf;
    }
 }