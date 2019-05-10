import Trait from './Trait.js'
export default class Go extends Trait{
    constructor(){
        super('go');

        this.dir = 0;
        this.acceleration = 1500;
        this.dragFactor = 1/2500;
        this.deceleration = 300;
        this.distance = 0;
        this.heading = 1;
    }

    turbo(keyState){
        this.dragFactor = (keyState) ? 1/6000 : 1/2500;
    }
   
    update(entity,deltatime){
        if(entity.killable.dead)
        {
            return;
        }
            const absX =   Math.abs(entity.vel.x);
           if(this.dir){
            entity.vel.x += (this.acceleration * deltatime) * this.dir;
              if(entity.jump){
                  if(!entity.jump.falling)
                   this.heading = this.dir;
              }
            this.heading  =  this.dir;
           } else if( entity.vel !== 0){
               const decl = Math.min(absX, this.deceleration * deltatime);
               entity.vel.x += entity.vel.x > 0 ? -decl :decl;
           }
           else
            this.distance =0;

            const drag = this.dragFactor * entity.vel.x * absX;
            entity.vel.x -= drag;
            this.distance += absX * deltatime;
    }

  
}