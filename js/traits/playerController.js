import Trait from './Trait.js'
import { Vec2 } from '../math.js';


export default class PlayerController extends Trait{
    constructor()
    {
        super('playerController');
        this.player = null;
        this.playerCub = null;
        this.playerBig = null;
        this.checkpoint = new Vec2(128,400);
        this.INIT_TIME = 128;
        this.time =  this.INIT_TIME;
        this.score = 0;
        this.coins = 0;
        this.bonusLifeThreshold = 64;
        this.lifeBonusCoin = 0;
        this.maxLevels = 1;
        this.win = false;
        this.remove =false;
        this.level = 1;
        this.lives = 4; 
        this.levelUp = false;

        this.checkpoints =[];
    }

    setPlayer(entity1,entity2)
    {
        

        [entity1,entity2].forEach((entity) =>{

        this.player = entity;
        this.player.stomper.onKill = () =>{
            this.score+=64;
        }
        this.player.killable.onDead = () => {
            this.player.offset.set(0,-25);
            this.lives+=-1;
        }

        this.player.stomper.onGrow = () => {
            this.checkpoint  = this.player.pos;
            this.player.killable.kill();
            this.player.killable.deadTime = 4;
            this.player.grown = true;
            this.lives++;
        }
        this.player.killable.onRevive = () => {
            this.player.pos.set(this.checkpoint);
            this.player.physics.obstructs = true;
        }

        this.player.stomper.onCollect = () =>{
            this.coins+=1;
            this.lifeBonusCoin++;
            if(this.lifeBonusCoin  >= this.bonusLifeThreshold)
                {
                    this.lives++;
                    this.lifeBonusCoin = 0;
                }
            this.score+= 64;
        }
        
        this.player.stomper.onCollectLevelUp = () =>{
            if(this.level + 1 <= this.maxLevels)
            {
           this.levelUp  = true;
           this.time = this.INIT_TIME;
           this.checkpoint = new Vec2(150,70);
           this.player.pos.set(150,420);
           this.level++;
           this.score+=512;
            }else{
                this.remove =true;
                this.win = true;
            }
        }

        this.player.stomper.onCollectOneUp = () =>{
            this.lives++;
         }

    });
        
        this.playerCub = entity2;
        this.playerBig = entity1;
        this.player = this.playerCub;
}
    

  
    update(entity,deltaTime,level)
    {
        level.levelUp = this.levelUp;
        this.checkpoints = level.checkpoints;
    if(this.remove){
        level.entities.delete(this.player);
    }
        if(this.player.grown)
            {
                this.player =  this.playerBig;
                this.player.grown = true;
            }
        this.setCheckPoint();
        if(this.lives > 0 && !this.remove && !level.entities.has(this.player)){
                     this.player.killable.revive();
                     level.entities.add(this.player);
                     this.player.offset.set(0,-10);
                     this.player.pos.set(this.checkpoint.x,this.checkpoint.y);
        }
        else{
            this.time -=deltaTime;
            if(this.time <=0)
                {
                    this.lives--;
                    this.time =this.INIT_TIME;
                }

        }

     
    }
    setCheckPoint(){
        this.checkpoints.forEach((checkpoint)=>{
            if(this.player.pos.x > checkpoint.x){
                this.checkpoint = checkpoint;
                return;
            }
        });
    }

}
    

  
