function start(){
    alert('Break out game made in Visual studio code by Saadman Nuheen!\nUse A and D or Right and Left arrow keys to move the paddle!');
    var w = 750;
    var h = window.innerHeight - 20;
    var c = document.getElementById('c');
    window.addEventListener('keydown',function(event){
        if (event.key == 'Right' || event.key == 'ArrowRight' || event.key == 'd'){
            rightPressed = true;
        }
        else if (event.key == 'Left' || event.key == 'ArrowLeft' || event.key == 'a'){
            leftPressed = true;
        }
    });
    window.addEventListener('keyup',function(event){
        if (event.key == 'Right' || event.key == 'ArrowRight' || event.key == 'd'){
            rightPressed = false;
        }
        else if (event.key == 'Left' || event.key == 'ArrowLeft' || event.key == 'a'){
            leftPressed = false;
        }
    });
    c.width = w;
    c.height = h;
    var rightPressed = false,leftPressed = false;
    var ctx = c.getContext('2d');
    var b = new Ball(w/2,h/2,10,'green',ctx);
    var p = new Paddle(w/2-140,h-30,200,30,'blue',ctx);
    var lives = new Text('',20,20,ctx,'green');
    var livesNum = 3;
    var scoreNum = 0;
    var score = new Text('',w-140,20,ctx,'green');
    var bricks = [];
    var bColumn = 6;
    var bRow = 3;
    var bPadding = 30;
    var bWidth = 90;
    var bHeight = 30;
    for (var i=0;i<bRow;i++){
        bricks.push([]);
        for (var j=0;j<bColumn;j++){
            var x = bPadding + (bPadding + bWidth) * j;
            var y = bPadding + (bPadding + bHeight) * i;
            bricks[i][j] = new Brick(x,y,bWidth,bHeight,'blue',ctx);
        }
    }
    var bx = 3, by = -3;
    var int = setInterval(function(){
        ctx.clearRect(0,0,w,h);
        var scoreTxt = 'Score:' + scoreNum;
        score.text = scoreTxt;
        score.draw();
        var livesTxt = 'Lives:' + livesNum;
        lives.text = livesTxt;
        lives.draw();
        p.draw();
        b.draw();
        for (var i=0;i<bRow;i++){
            for (var j=0;j<bColumn;j++){
                var brick = bricks[i][j];
                brick.draw();
                if (brick.stat && b.x + b.radius >= brick.x && b.x - b.radius <= brick.x + brick.w && b.y + b.radius >= brick.y && b.y - b.radius <= brick.y + brick.h){
                    scoreNum += livesNum;
                    brick.die();
                    if (b.y < brick.y || b.y > brick.y + brick.h){
                        by = -by;
                    }
                    else {
                        bx = -bx;
                    }
                }
            }
        }
        var dead = [];
        for (var i=0;i<bRow;i++){
            for (var j=0;j<bColumn;j++){
                var brick = bricks[i][j];
                dead.push(brick.isDead());
            }
        }
        if (didWeWin(dead) == true){
            alert('Your Score:' + scoreNum + '\nHighest score:' + (!localStorage.getItem('highestScore'))?scoreNum:localStorage.getItem('highestScore'));
            localStorage.setItem('highestScore',scoreNum);
            document.location.reload();
            clearInterval(int);
        }
        b.move(bx,by);
        if (b.x - b.radius <= 0 || b.x + b.radius >= w){
            bx = -bx;
        }
        else if (b.y - b.radius <= 0){
            by = -by;
        }
        if (b.y + b.radius >= h){
            livesNum--;
            alert('Lives left:' + livesNum);
            b.x = p.x;
            b.y = h/2;
            bx = 3;
            by = -3;
            if (!livesNum){
                alert('Game over!!\nYour Score:' + scoreNum + '\nHighest score:' + localStorage.getItem('highestScore'));
                document.location.reload();
                clearInterval(int);
            }
        }
        if (b.x + b.radius >= p.x && b.x - b.radius <= p.x + p.width && b.y + b.radius >= p.y && b.y - b.radius <= p.y + p.height){
            if (b.y <= p.y){
                by = -by;
            }
            else {
                bx = -bx;
            }
        }
        if (rightPressed){
            p.move(10,0);
        }
        else if (leftPressed){
            p.move(-10,0);
        }
        p.x = clamp(p.x,0,w - p.width);
    },10);
}
function didWeWin(dead){
    for (var i=0;i<dead.length;i++){
            var stat = dead[i];
            if (stat == false){
                return false;
            }
    }
    return true;
}