
export function createDashBoardLayer(font,gameOverSprite,player,gameOverSpriteWin){
    const LINE1 = font.size;
    const LINE2 = font.size * 2 +2;


    return function drawDashBoard(context){
        const {score, time, coins, lives,level,win} = player.playerController;



        font.print('PANDA', context, 16, LINE1);
        font.print(score.toString().padStart(6, '0'), context, 16, LINE2);

        if(lives > 5)
            font.print('*X' + lives.toString(), context, 195, LINE1);
        else
            font.print(''.padStart(lives*2, '* '), context, 195, LINE1);
        font.print('@X' + coins.toString().padStart(5, '0'), context, 195, LINE2);

        font.print('LEVEL ' + level, context, 355, LINE1);

        font.print('TIME', context, 560, LINE1);
     
        if(lives != 0 && !win)
         font.print(time.toFixed().toString().padStart(4, ' '), context, 560, LINE2);

        if(lives == 0)
            gameOverSprite.draw(context,200,LINE2 * 2);
        if(win)
            gameOverSpriteWin.draw(context,200,LINE2 * 2);
        
    }

}