import Trait from './Trait.js'
export default class Killable extends Trait{
    constructor()
    {
        super('killable');
      this.dead = false;
      this.deadTime = 0;
      this.removeAfter = 4;
      this.onDead = function(){
      
      }
      this.onRevive = function(){
            
      }
    }

    kill()
    {
        this.queue(()=> this.dead = true);
        this.dead =  true;
        this.onDead();
    }
    revive()
    {
        this.dead =  false;
        this.deadTime = 0;
        this.onRevive();
    }
    
    update(entity,deltaTime,level)
    {
        if(this.dead){
          
            entity.vel.x = 0;
            this.deadTime +=deltaTime;
            if(this.deadTime > this.removeAfter){
                this.queue(() => level.entities.delete(entity));
            }
          }
    }
    

  
}