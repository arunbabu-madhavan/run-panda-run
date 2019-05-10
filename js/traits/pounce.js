import Trait from './Trait.js'
import { Sides } from '../entity.js';
export default class Pounce extends Trait{
    constructor(){
        super('pounce');
        this.ready = 0;
        this.duration = 0.85;
        this.velocity = 280;
        this.engageTime = 0;
        this.gracePeriod = 0.3;
        this.speedBoost = 0.8;
    }

    start()
    {
        this.engageTime =  this.duration ;
    }

    get falling()
    {
        return this.ready < 0;
    }

    cancel(){
        this.engageTime = 0;
    }

    obstruct(entity,side){
    
        if(side === Sides.BOTTOM){
            this.ready = 1;
            
        }
        else if(side === Sides.TOP){
            this.cancel();
            
        }
    }

    update(entity,deltatime){
        
        const heading = entity.vel.x > 0;
        if(this.engageTime > 0)
        {
            entity.vel.x = heading ? this.velocity + Math.abs(entity.vel.x) * this.speedBoost  :  -(this.velocity + Math.abs(entity.vel.x) * this.speedBoost);
            this.engageTime -= deltatime;
        }

        this.ready--;
    }
}