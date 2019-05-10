
export default class SpriteSheet
{
    constructor(image, width, height){
        this.image = image;
        this.tiles = new Map;
        this.dimensions = new Map;
        this.animations = new Map;
        this.height = height;
        this.width = width;
    }


    defineAnimation(name,animation){
        this.animations.set(name,animation);
    }

    define(name,x,y,width,height){
        const buffers = [false,true].map(flip=>{
            const buffer = document.createElement('canvas');
            buffer.width= width;
            buffer.height = height;
            const context =  buffer.getContext('2d');
           
            if(flip){
                context.scale(-1,1);
                context.translate(-width,0);
            } 
            
            context.drawImage(this.image,
                       x,y, width, height,
                       0,0, width, height);
            
             return buffer;
                    });

        this.dimensions.set(name,{x:width,y:height});
        this.tiles.set(name,buffers);
    }

    defineTile(name,x,y){
        this.define(name, x * this.width, y * this.height, this.width, this.height);
    }

    draw(name,context,x,y, flip =false){
        const buffer = this.tiles.get(name)[flip?1:0];
        context.drawImage(buffer,x,y); 
    }
    clear(context,x,buffer){
        context.clearRect(x=0 , 0, buffer.width, buffer.height);
    }
    drawAnimation(name,context,x,y,distance){
        const animation = this.animations.get(name);
        this.drawTile(animation(distance),context,x,y);
    }

    drawTile(name,context,x,y){
       
       this.draw
          (name,context,  (x*  this.width),
                    (y *  this.height));
                     
        // context.drawImage
        //   (buffer,  (x*  this.size)%dim.width ,
        //             (y *  this.size)%dim.height, 
        //             this.size, this.size,
        //             x* this.size,y* this.size,
        //              this.size, this.size
    
    }
}