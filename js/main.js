
import  Timer from './timer.js'
import  Camera from './camera.js'
import { createLevelLoader } from './loaders/level.js'
import Entity from './entity.js'
import { createCameraLayer} from './layers/camera.js'
import { setupKeyboard } from './input.js';
import {setupMouseControl} from'./debug.js'
import { loadEntities } from './entities.js';
import PlayerController from './traits/playerController.js';
import { createCollisionLayer } from './layers/collision.js';
import { loadFont } from './loaders/font.js';
import { createDashBoardLayer } from './layers/dashboard.js';
import { loadGameOverSprite } from './loaders/gameOver.js';
import { loadAllLevels } from './levelManager.js';
import { loadGameOverWinSprite } from './loaders/gameOver.win.js';

function createPlayerEnvironment(playerEntitity1,playerEntitity2,maxLevels){
    const playerEnv = new Entity();
    const playerController = new PlayerController();
    playerController.setPlayer(playerEntitity1,playerEntitity2);
    playerController.maxLevels = maxLevels;
    playerEnv.addTrait(playerController);
    return playerEnv;
}

async function main(canvas){
    const context = canvas.getContext("2d");
    context.fillStyle="#DDF8FF";
    context.fillRect(0,0,640+128,640);

    const [factory,font,gOverSprite,gOverSpriteWin] = await Promise.all([loadEntities(),loadFont(),loadGameOverSprite(),loadGameOverWinSprite()]);
    const loadlevel = await createLevelLoader(factory);
    const levels = await loadAllLevels(loadlevel);
    var level = levels[0];

    const panda = factory.panda();
    const pandacub = factory.pandacub();
    const player = createPlayerEnvironment(panda,pandacub,levels.length);
    const inputPanda = setupKeyboard(panda);
    const inputPandaCub = setupKeyboard(pandacub);
    
    window.pandacub = pandacub;
    window.panda = panda;
    inputPanda.listenTo(window);
    inputPandaCub.listenTo(window);

    levels.forEach(lvl => {
        lvl.entities.add(player);
    //   lvl.compositor.layers.push(createCollisionLayer(lvl));

        lvl.compositor.layers.push(createDashBoardLayer(font,gOverSprite,player,gOverSpriteWin));
    });   

    const camera  = new Camera();

        //setupMouseControl(canvas,panda,camera);
        const timer = new Timer();
        window.timer = timer;
        timer.update = function update(deltaTime){
            
                        if(level.levelUp)
                           {
                               
                                player.playerController.levelUp = false;

                                level = levels[player.playerController.level - 1];
                                player.playerController.player.pos.x = 150;
                           }
                        level.update(deltaTime);
                        camera.pos.x = Math.max(0,player.playerController.player.pos.x - 128);
                        level.compositor.draw(context,camera);
        }

        window.onfocus = function(){timer.pause = false;};
        window.onblur = function(){timer.pause = true;
        
        };

        timer.start();
 }
 


const canvas = document.getElementById('screen');
main(canvas);