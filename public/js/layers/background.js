import TileResolver from "../tileresolver.js";

export function createBackgroundLayer(level,tiles,sprites,main = false)
{
    const resolver = new TileResolver(tiles,64);
    const buffer = document.createElement('canvas');
    buffer.width = 640 + 128;
    buffer.height = 640;
    
  
    const context = buffer.getContext('2d');
    context.fillStyle="#DDF8FF";
    context.fillRect(0,0, buffer.width,buffer.height);
    function redraw(startIndex,endIndex){
  

        context.clearRect(0,0,buffer.width,buffer.height);
        if(main){
            
        context.fillStyle="#DDF8FF";
        context.fillRect(0,0,buffer.width,buffer.height)
        }
        // if(drawFrom === startIndex && drawTo === endIndex)
        //     return;
   
         
        for(let x=startIndex;x<=endIndex;++x){
            const col= tiles.grid[x];
            window.tt = tiles.grid;
            if(col)
            {
                col.forEach((tile,y)=>{
                    if(sprites.animations.has(tile.name)){
                        sprites.drawAnimation(tile.name,context,x - startIndex,y,level.totalTime);
                    }else
                  {  
                      
                      sprites.drawTile(tile.name,context,x - startIndex,y);
                }
                });
            }
        }
        
    }


   
    return function drawBackgroundLayer(context,camera){
        const drawWidth = resolver.toIndex(camera.size.x);
        const drawFrom = resolver.toIndex(camera.pos.x);
        const drawTo = drawFrom + drawWidth;
         redraw(drawFrom,drawTo);

        // console.log('drawBackgroundLayer',-Math.floor(Math.abs(camera.pos.x)/(64))*64,drawFrom,drawTo);
        if(main)
            {
                sprites.clear(context,-camera.pos.x%64,buffer);
            
            }
        context.drawImage(buffer,-camera.pos.x%64,-camera.pos.y);
    }
}
