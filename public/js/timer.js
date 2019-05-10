export default class Timer{
    constructor(deltaTime= 1/60)
    {
        this.deltaTime = deltaTime;
        let accumulatedTime = 0;
        let lastTime =0;
       
        if (accumulatedTime > 1) {
            accumulatedTime = 1;
        }
        this.pause =false;

    this.updateProxy = (time) => {
        if(!this.pause){
            accumulatedTime += (time - lastTime)/1000;
            
            while(accumulatedTime > deltaTime){
                this.update(this.deltaTime);
                accumulatedTime-=deltaTime;
        }
         
    }
    lastTime = time;
    this.enqueue();
}
   }
   
   enqueue()
   {
        requestAnimationFrame(this.updateProxy);
   }

   start()
   {
    this.enqueue();
   }

}