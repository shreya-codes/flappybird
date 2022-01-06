document.addEventListener("DOMContentLoaded",()=>{
    const bird=document.querySelector('.bird');
    const gameDisplay=document.querySelector('.gamecontainer');
    const ground= document.querySelector('.ground');
    const startScreen =document.querySelector('.startScreen')
    
    let birdBottom=100;
    let birdLeft = 220;
    let gravity=2;
    let isGameOver=false;
    let gap=430;
    let score=-1;
    
    function startGame(){
        birdBottom-=gravity;
        bird.style.bottom=birdBottom+'px';
        bird.style.left=birdLeft+'px';
        startScreen.classList.add('hide');
        
    }
    function jump(){
        if(birdBottom<500){
            birdBottom+=50;
        }

        bird.style.bottom=birdBottom+'px';
       // console.log(birdBottom)
    }
    document.addEventListener('keyup',control)
    let gamerId=setInterval(startGame,20);
    function control(e){
        if (e.keyCode===32 )//spacebar and arrow up
        {
            jump();
        }
    }
    function generateObstacles(){
        let obstacleLeft=600;
        let randomHeight =Math.random()*60
        obstacleBottom=randomHeight
        const obstacle= document.createElement('div');
        const topObstacle= document.createElement('div');
        if(!isGameOver){
             obstacle.classList.add('obstacle');
             topObstacle.classList.add('topObstacle');
             score++
            }
        gameDisplay.appendChild(obstacle);
        gameDisplay.appendChild(topObstacle);
        obstacle.style.left=obstacleLeft+'px';
        obstacle.style.bottom=obstacleBottom+'px'
        topObstacle.style.left=obstacleLeft+'px';
        topObstacle.style.bottom=obstacleBottom+gap+'px'
       // console.log(gameDisplay)

        function moveObstacle(){
            obstacleLeft-=2
            obstacle.style.left=obstacleLeft+'px';
            topObstacle.style.left=obstacleLeft+'px';
            if(obstacleLeft===-60){
                clearInterval(timerId)
                gameDisplay.removeChild(obstacle)
                gameDisplay.removeChild(topObstacle)
               
            }
            if(
                obstacleLeft >200 && obstacleLeft<280 && birdLeft===220
                && (birdBottom<(obstacleBottom+154) ||(birdBottom>obstacleBottom+gap-200))
                || birdBottom===0){
                gameOver(); 
                console.log('here')
                clearInterval(timerId)
            }
            
            

        }
        let timerId=setInterval(moveObstacle,20);
        if(!isGameOver){
            setTimeout(generateObstacles,3000)
        } 
    }
    function gameOver(){
        clearInterval(gamerId);
        console.log('gameover')
        isGameOver=true;
        document.removeEventListener('keyup',control )
        startScreen.classList.remove('hide');
    startScreen.innerHTML="Game Over <br> Final score:"+score;
    }

    generateObstacles();
})