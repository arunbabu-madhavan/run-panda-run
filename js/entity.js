
import {Vec2} from './math.js'
import BoundingBox from './boundingbox.js';
export const Sides ={
    TOP: 1,
    BOTTOM: 2,
    LEFT: 3,
    RIGHT: 4
}

export default class Entity{
    constructor(width,height)
    {
        this.pos = new Vec2(0,0);
        this.vel = new Vec2(0,0);
        this.offset = new Vec2(0,0);
        this.width = width, 
        this.height =height;
        this.heading = true;
        this.size = new Vec2(width, height);
        this.traits = [];
        this.lifeTime = 0;
        this.bounds = new BoundingBox(this.pos,this.size, this.offset);
        this.canSwim = false;

    }


    obstruct(side,type,match)
    {
        this.traits.forEach(trait => {
            trait.obstruct(this,side,type,match);
        });
    }

    collides(candidate)
    {
        this.traits.forEach(trait => {
            trait.collides(this,candidate);
        });
    }

    addTrait(trait)
    {
        this.traits.push(trait);
        this[trait.NAME] = trait;
    }

    finalize()
    {
        this.traits.forEach(trait => trait.finalize());
    }

    update(deltaTime,level)
    {
        this.traits.forEach(trait => {
            if(this.vel.x * this.offset.x < 0){
                this.offset.x = - this.offset.x;
            }
            trait.update(this,deltaTime,level);
        });
        this.lifeTime += deltaTime;

        if(this.killable &&  !this.killable.dead && this.pos.y > 700  )
        {
            this.killable.kill();
            this.physics.obstructs = false;

        }
    }

    draw()
    {
    
    }
    
}
