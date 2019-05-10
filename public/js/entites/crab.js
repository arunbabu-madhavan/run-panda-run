import Entity from '../entity.js';
import { loadSpritesheet } from '../loaders.js';
import PendulumMove  from '../traits/PendulumMove.js'
import Trait from '../traits/Trait.js';
import Killable from '../traits/killable.js';
import Solid from '../traits/Solid.js';
import Physics from '../traits/Physics.js';

export function loadCrab(){
   
    return loadSpritesheet("crab",128,64)
    .then(createCrabFactory);
     
 }

 const STATE_WALKING = Symbol('walking');
 const STATE_DEFENDING = Symbol('defending');
 
class Behavior extends Trait {
    constructor(){
        super('behavior');
        this.state = STATE_WALKING;
        this.defendTime = 0;
        this.defendDuration = 1;
    }

    collides(us,them){
        
        if(us.killable.dead)
            return;

        if(them.stomper && them.killable && ! them.killable.dead){
            if(them.vel.y > us.vel.y){
                this.handleStomp(us,them)
            }
            else{
                this.handleKick(us,them)
            }
        }
    }

    handleStomp(us,them){
        if(this.state === STATE_WALKING){
            them.killable.kill();
            this.defend(us);
        }
        else if(this.state === STATE_DEFENDING){
            us.killable.kill();
            us.vel.x=0;
            us.pendulumMove.speed = 0;
            them.stomper.bounce();
        }
    }

    update(us, deltaTime){
        if(this.state === STATE_DEFENDING){
            this.defendTime += deltaTime;
            if(this.defendTime > this.defendDuration && !us.killable.dead){
                this.state = STATE_WALKING;
                us.pendulumMove.speed = us.pendulumMove.initSpeed;
            }
        }
    }

    handleKick(us,them){
        if(this.state === STATE_WALKING){
            this.defend(us);
        }
        
    }

    defend(us){
        us.pendulumMove.speed = 100;
        this.defendTime = 0;
        this.state = STATE_DEFENDING; 
    }
}
 
 function createCrabFactory(sprite){

    const walkAnim = sprite.animations.get('walk');
    const defendAnim = sprite.animations.get('defend');

    function routeAnim(crab){

        if(crab.killable.dead)
            return "dead";

        if(crab.behavior.state == STATE_WALKING)
             return walkAnim(crab.lifeTime);
        else 
            return defendAnim(crab.lifeTime);
    }

    function drawCrab(context){
        sprite.draw(routeAnim(this),context,0,0, this.vel.x >0);
    }

    return function createCrab(){

        const crab = new Entity(32,32);
        crab.addTrait(new Physics());

        crab.addTrait(new Solid());
        crab.addTrait(new PendulumMove((Math.random() * 20) + 20,true));
        crab.addTrait(new Behavior());
        crab.addTrait(new Killable());


        crab.draw = drawCrab;
        crab.offset.y = -12;
        
        return crab;
    }
 }