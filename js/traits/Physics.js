import Trait from './Trait.js'
import { Sides } from '../entity.js';
export default class Physics extends Trait{
    constructor()
    {
        super('physics');
        this.obstructs = true;
    }

    update(entity,deltaTime,level)
    {
        if(this.obstructs){
        entity.pos.x +=entity.vel.x * deltaTime;
        level.tileCollider.checkX(entity);
   
        entity.pos.y +=entity.vel.y * deltaTime;
        level.tileCollider.checkY(entity);
   
        
            entity.vel.y += level.gravity * deltaTime   ;
        }
    }

}