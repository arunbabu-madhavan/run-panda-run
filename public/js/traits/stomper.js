import Trait from './Trait.js'
import { Sides } from '../Entity.js'
export default class Stomper extends Trait{
    constructor()
    {
      super('stomper');
      this.queueBounce = false;
      this.defaultbounce = 450;
      this.bounceSpeed =  this.defaultbounce;
      this.onKill = function(){

      }

      this.onCollect =  () =>{

      }
      
      this.onCollectOneUp =  () =>{

    }

      this.onGrow =()=>{}
      this.onCollectLevelUp = () =>{}
    }

    bounce(bounceSpeed)
    {
        if(bounceSpeed)
            this.bounceSpeed = bounceSpeed;

        this.queueBounce = true;
        this.onKill();
    }

    obstruct(entity,side,type)
    {

    }
   
    update(entity,deltaTime)
    {
          if(this.queueBounce){
              entity.vel.y = -this.bounceSpeed;
              this.queueBounce = false;
              this.bounceSpeed =  this.defaultbounce;
          }
    }
    

  
}