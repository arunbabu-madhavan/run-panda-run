
import Compositor from "./compositior.js";

import TileCollider from "./tilecollider.js";
import EntityCollider from "./entityCollider.js";
import { Vec2 } from "./math.js";

export default class Level{
    constructor(){

        this.gravity = 1200;
        this.totalTime =  0;
        this.compositor = new Compositor();
        this.entities = new Set;
        this.tileCollider = null;//new TileCollider(this.tiles,64);
        this.levelUp = false;
        this.entityCollider = new EntityCollider(this.entities);
        this.checkpoints = [ new Vec2(160,160)];
    }

    setCollisionGrid(matrix){
        this.tileCollider = new TileCollider(matrix);
    }

    update(deltaTime){
        this.entities.forEach(entity =>{
            entity.update(deltaTime,this);
            this.entityCollider.check(entity);
            entity.finalize();
           
            if(entity.levelUp)
                this.levelUp = true;
        });

        this.totalTime +=deltaTime;
    }
}