import Trait from './Trait.js'
import { Sides } from '../Entity.js'
export default class PendulumMove extends Trait{
    constructor(speed,randomize=false){
        super('pendulumMove');
        this.speed=speed;
        this.initSpeed = speed;
        this.randomize = randomize;
    }

    obstruct(entity,side,type){

            if(side === Sides.LEFT || side === Sides.RIGHT ){
                if(type == 'block' || type =='ground')
                  this.speed = -this.speed;
            }

            
          
    }
        update(entity,deltaTime){
            entity.vel.x = this.speed;
            if(this.randomize){
            if(((entity.lifeTime) % 13 | 0)  === 5){
                
                this.speed = Math.random() < 0.8 ?  -this.speed : this.speed;
                entity.lifeTime+=1;
            }
        }
        }
    

  
}