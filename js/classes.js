class Ball{
    constructor(x,y,radius,color,context){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.context = context;
    }
    draw(){
        this.context.beginPath();
        this.context.arc(this.x,this.y,this.radius,0,Math.PI*2);
        this.context.fillStyle = this.color;
        this.context.fill();
        this.context.closePath();
    }
    move(offX,offY){
        this.x += offX;
        this.y += offY;
    }
}
class Paddle{
    constructor(x,y,w,h,color,context){
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        this.color = color;
        this.context = context;
    }
    draw(){
        this.context.beginPath();
        this.context.rect(this.x,this.y,this.width,this.height);
        this.context.fillStyle = this.color;
        this.context.fill();
        this.context.closePath();
    }
    move(offX,offY){
        this.x += offX;
        this.y += offY;
    }
}
class Brick{
    constructor(x,y,w,h,color,context){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.stat = 1;
        this.color = color;
        this.context = context;
    }
    die(){
        this.stat = 0;
    }
    draw(){
        if (this.stat == 1){
            this.context.beginPath();
            this.context.rect(this.x,this.y,this.w,this.h);
            this.context.fillStyle = this.color;
            this.context.fill();
            this.context.closePath();
        }
    }
    isDead(){
        return Boolean(this.stat == 0);
    }
}
class Text{
    constructor(text,x,y,context,color='black',fontSize='20pt',fontName='Arial'){
        this.text = text;
        this.x = x;
        this.y = y;
        this.context = context;
        this.color = color;
        this.fontSize = fontSize;
        this.fontName = fontName;
        this.font = this.fontSize + ' ' + this.fontName;
    }
    draw(){
        this.context.beginPath();
        this.context.font = this.font;
        this.context.fillStyle = this.color;
        this.context.fillText(this.text,this.x,this.y);
        this.context.closePath();
    }
}
function clamp(n,minimum,maximum){
    if (n >= minimum && n <= maximum){
        return n;
    }
    else if (n < minimum){
        return minimum;
    }
    return maximum;
}
function randomInt(min,max){
    return Math.floor(Math.random() * max - min);
}
