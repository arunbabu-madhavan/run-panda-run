import Keyboard from './keyboard.js'

export function setupKeyboard(entity){
    
    const UP = 38;
    const RIGHT = 39;
    const LEFT = 37;
   const input = new Keyboard();
    input.addMapping('ArrowUp',keyState => {
        if(keyState){
            entity.jump.start();
        }
        else
          entity.jump.cancel();

    });


    input.addMapping('Space',keyState => {
        entity.go.turbo(keyState);
        
    });
    input.addMapping('ArrowRight',keyState => {
      
        entity.go.dir += keyState ? 1:-1;
        
    });
    input.addMapping('ArrowLeft',keyState => {
       
        entity.go.dir += keyState ? -1 : 1;
        
    });

    return input;

}