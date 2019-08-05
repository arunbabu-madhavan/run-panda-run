import Trait from './Trait.js'
import { Sides } from '../entity.js';
export default class Jump extends Trait{
    constructor()
    {
        super('jump');
        this.ready = 0;
        this.duration = 0.35;
        this.velocity = 320;
        this.engageTime = 0;
        this.gracePeriod = 0.3;
        this.speedBoost = 0.4;
    }

    start()
    {
        this.requestTime = this.gracePeriod;
    }

    get falling()
    {
        return this.ready < 0;


        
    }

    cancel()
    {
        this.engageTime = 0;
        this.requestTime = 0;
    }

    obstruct(entity,side)
    {
    
        if(side === Sides.BOTTOM){
            this.ready = 1;
            
        }
        else if(side === Sides.TOP){
            this.cancel();
            
        }
    }

    update(entity,deltatime)
    {
        
        if(this.requestTime > 0){
            if(this.ready > 0)
            {
                this.engageTime = this.duration;
                this.requestTime = 0;
            }
            
            this.requestTime -= deltatime;
        }

        if(this.engageTime > 0 && !entity.killable.dead)
        {
            entity.vel.y = - (this.velocity + Math.abs(entity.vel.x) * this.speedBoost);
            this.engageTime -= deltatime;
        }
        this.ready--;
    }
}