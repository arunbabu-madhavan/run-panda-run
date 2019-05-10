import { Vec2 } from "./math.js";

export async function loadAllLevels(loadlevel){
    var levels = [];
    const level1  = await loadlevel("level1");
    level1.checkpoints = [ new Vec2(150,420),new Vec2(3758,420),
        new Vec2(8319,420),
        new Vec2(6198,420)
                            ];
    levels.push(level1);
    
    const level2  = await loadlevel("level2");
    level2.checkpoints = [ new Vec2(150,420),new Vec2(2780,17),
        new Vec2(6745,220), new Vec2(9922,220), new Vec2(13580,220)
                            ];
    levels.push(level2);

    return levels;

}
