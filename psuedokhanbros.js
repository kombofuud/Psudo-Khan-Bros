//uses processing javascript. I haven't tested this outside of khan academy.
//GENERAL FUNCTIONS----------------------------------
    var fr = 30;
    frameRate(fr);
    imageMode(CENTER);
    textAlign(CENTER,CENTER);
    var keys = [];
    var prevkeys = [];
    var keyDown = [];
    var keyUp = [];
    var keyList = [];
    var mouse = false;
    var mouseDown = false;
    var mouseUp = false;
    var mouseIn = true;
    var i;
    var iMax;
    var j;
    var jMax;
    var k;
    var l;
    var m;
    var n;
    var t;
    var o;
    var u;
    var centerRect = function(x,y,w,h,r){
        rect(floor(x-w/2),floor(y-h/2),w,h,r);
    };
    var blocks = [function(a,b,c){},function(a,b,c){centerRect(a,b,c,c);},function(a,b,c){centerRect(floor(a+0.5),floor(b-c*7/16+0.5),c,c/8);},function(a,b,c){triangle(a-c/2,b-c/2,a+c/2,b-c/2,a+c/2,b+c/2);},function(a,b,c){triangle(a-c/2,b-c/2,a+c/2,b-c/2,a-c/2,b+c/2);},function(a,b,c){fill(255,255,0);ellipse(a,b,c/2,c/2);}];
    var sprites = [];
        for(i = 0;i<2;i++){
        sprites[i] = [getImage("avatars/piceratops-ultimate"), getImage("creatures/Hopper-Happy"), getImage("creatures/OhNoes"), getImage("creatures/Winston"), getImage("avatars/questionmark")];
        }
        var alts = [getImage("avatars/piceratops-ultimate"),getImage("avatars/primosaur-ultimate"),getImage("avatars/starky-ultimate"),getImage("avatars/leafers-ultimate"),getImage("avatars/duskpin-ultimate"),getImage("avatars/aqualine-ultimate")];
        var downBim = [getImage("avatars/piceratops-seedling"),getImage("avatars/primosaur-seedling"),getImage("avatars/starky-seedling"),getImage("avatars/leafers-seedling"),getImage("avatars/duskpin-seedling"),getImage("avatars/aqualine-seedling")];
        var upBim = [getImage("avatars/piceratops-seed"),getImage("avatars/primosaur-seed"),getImage("avatars/starky-seed"),getImage("avatars/leafers-seed"),getImage("avatars/duskpin-seed"),getImage("avatars/aqualine-seed")];
        var spriteAttributes = [];//jumps,groundfriction,airfriction
        var directions = [-1,-1,1,1,1,1];
    keyPressed = function(){
        keys[keyCode] = true;
        keyList[keyCode] = key.toString();
    };
    keyReleased = function(){
        keys[keyCode] = false;
    };
    mousePressed = function(){
        mouse = true;
        mouseDown = true;
    };
    mouseReleased = function(){
        mouse = false;
        mouseUp = true;
    };
    mouseOut = function(){
        mouseIn = false;
    };
    mouseOver = function(){
        mouseIn = true;
    };
    var dim = min(width,height);
    var cornerX = (width-dim)/2;
    var cornerY = (height-dim)/2;
        translate(cornerX,cornerY);
        pushMatrix();
    var screen = [0,0];
    var mod = function(a,b){
        if(b === 0){
            return 0;
        }
        else{
            a = (a%b+b)%b;
            return a;
        }
    };
    var rnd = function(a,b){
        return round(a*pow(10,b))/pow(10,b);
    };
    var logo = function(x,y,r,shade){
            translate(x,y);
            //shade
            if(shade){
                fill(0,0,0,148);
                stroke(0,0,0,148);
                strokeWeight(1);
                ellipse(0,0,2*r,2*r);
            }

            //top right
                noStroke();
                fill(0, 0, 127);
                beginShape();
                vertex(r*8/15,-2/5*r);
                for(l = 0; l < 13/10*r; l++){
                    vertex(r*cos((45-asin(2/5)-asin(1/15))*3/2/r*l+asin(2/5)),-r*sin((45-asin(2/5)-asin(1/15))*3/2/r*l+asin(2/5)));
                }
                vertex(r*8/15,-2/5*r);
                endShape();

            //top left
                fill(0, 63, 63);
                beginShape();
                vertex(2*r/15,-2/5*r);
                for(l = 0; l <= 4/3*r; l++){
            vertex(r*cos((45-2*asin(1/15))*3/2/r*l+2*asin(1/15)+acos(2/5)+2*asin(1/15)),-r*sin((45-2*asin(1/15))*3/2/r*l+2*asin(1/15)+acos(2/5)+2*asin(1/15)));
                }
                vertex(2*r/15,-2/5*r);
                endShape();

            //bottom left
                fill(0, 63, 0);
                beginShape();
                vertex(2*r/15,-4*r/15);
                for(l = 0; l <= 4/3*r; l++){
                    vertex(-r*cos((45+asin(1/3)-2*asin(1/15))*3/2/r*l-asin(1/3)+asin(1/15)),r*sin((45+asin(1/3)-2*asin(1/15))*3/2/r*l-asin(1/3)+asin(1/15)));
                }
                vertex(2*r/15,-4*r/15);
                endShape();

            //bottom right
                fill(127, 0, 0);
                beginShape();
                vertex(r*8/15,-4*r/15);
                for(l = 0; l < 4/3*r; l++){
                    vertex(r*sin((45-2*asin(1/15))*3/2/r*l+asin(1/3)+3*asin(1/15)),r*cos((45-2*asin(1/15))*3/2/r*l+asin(1/3)+3*asin(1/15)));
                }
                vertex(r*8/15,-4*r/15);
                endShape();
        popMatrix();pushMatrix();
    };
    var clock = function(x,y,r,m,s){
        ellipse(x,y,r,r);
        line(x,y,x+r/3*sin(6*m+s/60),y-r/3*cos(6*m+s/60));
        line(x,y,x+r/2*sin(6*s),y-r/2*cos(6*s));
        line(x,y-r*3/8,x,y-r*15/32);
        line(x,y+r*3/8,x,y+r*15/32);
        line(x-r*3/8,y,x-r*15/32,y);
        line(x+r*3/8,y,x+r*15/32,y);
    };
    var xor = function(a,b){
        return !(a && b) && (a || b);
    };
    var xnor = function(a,b){
        return (a && b) || !(a || b);
    };
    var nulf = function(x){
        if(x === null || isNaN(x) || x === undefined){
            return false;
        }
        else{
            return true;
        }
    };
    var sign = function(x){
        if(x > 0 || x === true){
            return 1;
        }
        else if(x < 0 || x === false){
            return -1;
        }
        else{
            return 0;
        }
    };
    //PLAYER VARIABLES--------------------------------------
        var player = function(x,y,c){
            this.x = x;
            this.prevX = x;
            this.y = y;
            this.prevY = y;
            this.c = c;
            this.rand = false;
            this.vx = 0;
            this.prevVx = 0;
            this.vy = 0;
            this.prevVy = 0;
            this.size = 30;
            this.direction = floor(2*random())*2-1;
            this.startUp = 0;
            this.lag = 0;
            this.afriction = 14/15;
            this.gfriction = 9/10;
            this.friction = this.afriction;
            this.contact = 1;
            this.move = "";
            this.prevMove = "";
            this.jumps = 2;
            this.upSpecial = 1;
            this.sideSpecial = 1;
            this.downSpecial = 1;
            this.neutralSpecial = 1;
            this.lives = 3;
            this.damage = 0;
            this.kill = false;
            this.invisible = 0;
            this.airdodges = 1;
            this.shieldHP = 20;
            this.hitbox = [[null,null,[null,null],null,null,null,null,null,null,null,null,null,null,null,null]];
            this.hurtbox = [];
            this.hitstun = 0;
            this.save = [];
        };
        var p = [];
        for(i = 0; i < 2 ; i++){
            p[i] = new player(dim*3/20+7/10*i, dim/2, round(random(0,sprites[i].length-1)));
        }

//SCREEN SPECIFIC VARIABLES---------------------------------
    
    //HELP SCREEN VARIABLES---------------------------------
        var screenCount = 6;
        var change = true;
        var leaves = [getImage("avatars/leaf-blue"),getImage("avatars/leaf-green"),getImage("avatars/leaf-orange"),getImage("avatars/leaf-red"),getImage("avatars/leaf-yellow")];
        var helpScreen = [];

            //HELP SCREENS-----------------------------------
            helpScreen[0] = function(){
                //text background----------------------------
                    if(screen[0] !== 0){
                        stroke(0);
                        strokeWeight(1);
                        fill(0,127,127);
                        rect(dim*3/20,dim*3/40,dim*7/10,dim*3/4);
                    }
                //screen name--------------------------------
                    fill(0);
                    textSize(dim*3/40);
                    text("Menu Navigation",dim/2,dim/8);
                    line(dim/5,dim*13/80,dim*4/5,dim*13/80);

                //displaying keys----------------------------

                    //key outlines---------------------------
                        fill(255,255,0);
                        rect(dim*33/40,dim*7/40,-dim/20,dim/20);
                        rect(dim*49/64,dim*7/40,-dim/6,dim/20);
                        fill(255, 159, 0);
                        rect(dim*7/40,dim*7/40,dim/20,dim/20);
                        rect(dim*15/64,dim*7/40,dim*2/15,dim/20);
                        fill(0, 255, 255);
                        rect(dim*7/40,dim*13/40,dim/20,dim/20);
                        rect(dim*15/64,dim*13/40,dim/6,dim/20);
                        fill(0,255,0);
                        centerRect(dim*31/40,dim*14/40,dim*19/320,dim/20);
                        centerRect(dim*21/32,dim*14/40,dim*13/160,dim/20);
                        fill(255);
                        centerRect(dim*21/80,dim*18/40,dim*7/40,dim/20);
                        centerRect(dim*41/160,dim*41/80,dim*3/20,dim/20);
                        centerRect(dim*17/64,dim*23/40,dim*7/40,dim/20);
                        fill(127,0,0);
                        rect(dim*83/160,dim*17/40,dim*49/160,dim/20);
                        fill(0);
                        ellipse(dim*29/40,dim*23/40,dim/5,dim/20);
                        fill(63, 0, 127);
                        centerRect(dim/2,dim*11/16,dim/20,dim/20);

                    //key text-------------------------------
                        fill(0);
                        textSize(dim/20);
                        text("D",dim*4/5,dim/5);
                        text("RIGHT",dim*109/160,dim/5);
                        text("A",dim/5,dim/5);
                        text("LEFT",dim*97/320,dim/5);
                        text("W",dim*31/40,dim*7/20);
                        text("UP",dim*21/32,dim*7/20);
                        text("S",dim/5,dim*7/20);
                        text("DOWN",dim*51/160,dim*7/20);
                        text("ENTER",dim*17/64,dim*9/20);
                        text("SHIFT",dim*41/160,dim*41/80);
                        text("SPACE",dim*17/64,dim*23/40);
                        text("BACKSPACE",dim*27/40,dim*9/20);
                        fill(255);
                        text("MOUSE",dim*29/40,dim*23/40);
                        fill(0);
                        text("H",dim/2,dim*11/16);

                //displaying text----------------------------
                    textSize(dim*11/400);
                    fill(255, 255, 0);
                    text("Increase numbers\nPick option on Right",dim*17/24,dim*21/80);
                    fill(255,159,0);
                    text("Decrease Numbers\nPick option on Left",dim*7/24,dim*21/80);
                    fill(0,255,255);
                    text("Pick option below",dim*7/24,dim*2/5);
                    fill(0,255,0);
                    text("Pick option above",dim*17/24,dim*2/5);
                    fill(255);
                    text("Go to next screen\nSelect",dim*7/24,dim*51/80);
                    fill(159, 0, 0);
                    text("go to previous screen\nExit help menu",dim*11/16,dim*41/80);
                    fill(0);
                    text("Click on things\nto select them",dim*29/40,dim*51/80);
                    fill(63,0,127);
                    text("Go to help Menu\nExit menu navigation",dim/2,dim*3/4);
            };
            helpScreen[1] = function(){
                //text background----------------------------
                    if(screen[0] !== 0){
                        stroke(0);
                        strokeWeight(1);
                        fill(127,0,127);
                        rect(dim*3/20,dim*3/40,dim*7/10,dim*3/4);
                    }
                //Details
                    fill(255);
                    strokeWeight(dim/80);
                    stroke(0);
                    centerRect(dim/2,dim*3/20,dim/2,dim/10);
                    fill(0);
                    textSize(dim*3/80);
                    text("Select Computers\nor Human Players",dim/2,dim*3/20);
                    fill(127,0,127);
                    stroke(255);
                    strokeWeight(1);
                    centerRect(dim/2,dim*17/40,dim/4,dim/4);
                    fill(255, 0, 0);
                    centerRect(dim/2,dim*39/80,dim/4,dim/8);
                    fill(0,255,0);
                    text("Set Item\nfrequency",dim/2,dim*29/80);
                    fill(0);
                    text("Select With\nSpace/Shift\nor Mouse",dim/2,dim*39/80);
                    fill(255, 255, 0);
                    stroke(0);
                    rect(dim*3/20,dim*5/8,dim/5,dim/5);
                    rect(dim*13/20,dim*5/8,dim/5,dim/5);
                    fill(0);
                    text("Go Back\n(Delete)",dim/4,dim*29/40);
                    text("Pick Stage\n(Enter)",dim*3/4,dim*29/40);
                    noFill();
                    stroke(255);
                    centerRect(dim/2,260,80,35);
                    fill(0,255,0);
                    text("Lives/Time\nToggle",dim/2,dim*13/20);
            };
            helpScreen[2] = function(){
                //text background----------------------------
                    if(screen[0] !== 0){
                        stroke(0);
                        strokeWeight(1);
                        fill(0,0,63);
                        stroke(255,255,0);
                        strokeWeight(dim/100);
                        rect(dim*3/20,dim*3/40,dim*7/10,dim*3/4);
                    }
                //Details
                    fill(191,0,0);
                    textSize(20);
                    text("Change Life Count",dim/2,dim*5/32);
                    fill(255);
                    stroke(0);
                    strokeWeight(1);
                    ellipse(dim/2,dim*3/8,dim/4,dim/4);
                    line(dim/2,dim*15/32,dim/2,dim*63/128);
                    line(dim/2,dim*9/32,dim/2,dim*33/128);
                    line(dim*49/128,dim*3/8,dim*13/32,dim*3/8);
                    line(dim*79/128,dim*3/8,dim*19/32,dim*3/8);
                    fill(0);
                    text("Change\nTime\nLimit",dim/2,dim*3/8);
                    centerRect(dim/2,dim*5/8,dim/4,dim/5);
                    fill(191,127,31);
                    text("Pick Stage\n(Shift\nEdit Mode)",dim/2,dim*5/8);
                    fill(191,191,0);
                    stroke(191,191,0);
                    strokeWeight(1);
                    centerRect(dim/4,dim*63/80,dim*3/16,dim/16);
                    fill(0,127,0);
                    stroke(0,127,0);
                    centerRect(dim*3/4,dim*63/80,dim*3/16,dim/16);
                    fill(0);
                    textSize(dim/40);
                    text("Items\n(backspace)",dim/4,dim*63/80);
                    text("Characters\n(Enter)",dim*3/4,dim*63/80);
            };
            helpScreen[3] = function(){
                //text background----------------------------
                    if(screen[0] !== 0){
                        noStroke();
                        fill(0);
                        rect(dim*3/20,dim*3/40,dim*7/10,dim*3/4);
                    }
                //details
                    fill(191,127,31);
                    rect(dim*3/20,dim*3/10,dim*7/10,dim*7/20);
                    fill(63,0,127);
                    centerRect(dim*3/4,dim*3/16,dim/8,dim/8);
                    fill(255);
                    centerRect(dim/2,dim/8,dim/4,dim/16);
                    fill(255,255,0);
                    centerRect(dim/2,dim*17/80,dim/4,dim/16);
                    fill(255, 0, 0);
                    centerRect(dim*19/80,dim*59/80,dim*7/40,dim*7/40);
                    fill(0,127,0);
                    centerRect(dim*61/80,dim*59/80,dim*7/40,dim*7/40);
                    noFill();
                    strokeWeight(dim/200);
                    stroke(255);
                    centerRect(dim/2,dim*59/80,dim*7/20,dim*7/40);
                //text
                    fill(0);
                    textSize(dim*3/100);
                    text("Rename Stage",dim/2,dim/8);
                    text("Rand Select?",dim/2,dim*17/80);
                    text("Click to select a block\nArrow keys/wasd to change selected block",dim/2,dim*19/40);
                    text("Delete\nStage\n(click)",dim*19/80,dim*59/80);
                    text("Save\nChanges\n(click)",dim*61/80,dim*59/80);
                    fill(255);
                    if(blocks.length <= 9){
                        text("Change block type\nby typing number",dim/2,dim*59/80);
                    }
                    else{
                        text("Change block type\nby typing number\nHold shift to type\nmulti-digit numbers",dim/2,dim*59/80);
                    }
                    text("Prints\nStage\nText",dim*3/4,dim*3/16);
            };
            helpScreen[4] = function(){
                //text background----------------------------
                    if(screen[0] !== 0){
                        noStroke();
                        fill(127,0,127);
                        rect(dim*3/20,dim*3/40,dim*7/10,dim*3/4);
                        fill(0,63,127);
                        rect(dim*3/20,dim*3/40,dim*7/20,dim*3/4);
                    }
                //display
                fill(255,255,0);
                centerRect(dim/2,dim*17/160,dim/4,dim/16);
                fill(0, 63, 0);
                centerRect(dim/2,dim*53/80,dim/3,dim/3);
                
                //text
                textSize(dim*3/100);
                fill(0);
                text("Go to Stages",dim/2,dim*17/160);
                fill(255);
                text("Start by pressing the\nZ and M keys or by\nclicking and holding\nSTART",dim/2,dim*53/80);
                text("P1:\nW and S or Click\nto select Character\n\nA and D or\n Click Arrows\nto change\n \"Ultimate\" Character", dim*13/40,dim*11/40);
                text("P1:\nUP and DOWN or Click\nto select Character\n\nLEFT and RIGHT or\nClick Arrows\nto change\n \"Ultimate\" Character", dim*27/40,dim*11/40);
            };
            helpScreen[5] = function(){};

    //STAGE SELECT VARIABLES---------------------------------
        var stage = 0;
        var stages = [[1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,1,1,0,5,0,0,0,0,5,0,1,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,"Test","1"],[0,0,0,0,0,0,0,0,0,0,0,0,5,0,2,2,0,5,0,0,0,0,2,2,0,0,2,2,0,0,0,1,1,1,1,1,1,1,1,0,0,3,1,1,1,1,1,1,4,0,"Mountain","1"],[0,0,0,0,0,0,0,0,0,0,0,0,5,0,0,0,0,5,0,0,0,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,0,"Plateau","1"],[0,0,0,0,0,0,0,0,0,0,2,0,5,2,2,2,2,5,0,2,0,0,2,2,0,0,2,2,0,0,3,1,1,4,0,0,3,1,1,4,0,3,4,0,0,0,0,3,4,0,"Island Pair","1"],[0,0,0,0,0,0,0,0,0,0,0,0,0,5,0,0,5,0,0,0,0,0,2,2,2,2,2,2,0,0,0,3,1,1,1,1,1,1,4,0,0,0,0,0,0,0,0,0,0,0,"Terrace","1"],"rand",true,false];
        var stageList = [];
            for(i = 0; i < stages.length; i++){
                if(stages[i] !== true && stages[i] !== false && stages[i] !== "rand"){
                    stageList[stageList.length] = stages[i];
                }
            }
        var stageNameList = [];
            for(i=0; i<stages.length; i++){
                if(stages[i] !== true && stages[i] !== false && stages[i] !== "rand"){
                    stageNameList[stageNameList.length] = stages[i][51];
                }
            }
        var stageDisplay = function(cx,cy,w,x,invis){
            strokeWeight(1);
            fill(191,127,31);
            stroke(191,127,31);
            centerRect(cx,cy,w,w/2);
            fill(127);
            stroke(127);
            for(l = -2; l <= 2; l++){
                for(m = -4.5; m <= 5; m++){
                    for(n = 1; n <= blocks.length; n++){
                        if(x[10*l+m+24.5] === n){
                            if(n !== 5 || !invis){
                                fill(127);
                                stroke(127);
                                blocks[n](cx+m*w/10,cy+l*w/10,w/10);
                            }
                        }
                    }
                }
            }
            popMatrix();pushMatrix();
        };
        var time = 480*fr;
        var timer = 0;
        var hands = 480*fr;
        var spinCount = 0;
        var lives = 3;
        var maxLives = 20;
        var centerLives = [];
            for(i = 0; i < maxLives; i++){
                centerLives[i] = dim/2+mod(11/80*dim*(i-lives)+maxLives*11/160*dim,maxLives*11/80*dim)-maxLives*11/160*dim;
                centerLives[i] = round(centerLives[i]*400/dim)*dim/400;
            }
        var select = 0;
        var editOn = false;
        var d = [0,0,0];
        if(screen[0] === 3 || screen[1] === 3){
            d[0] = -1;
            d[1] = -1;
        }

    //STAGE BUILDER VARIABLES
        var deleteRectSize = 0;
        var deleteRect = function(x){
            stroke(0);
            strokeWeight(dim/80);
            fill(255,255,255,215);
            centerRect(dim/2,dim/2,2*x,x,x/20);
            fill(255,0,0);
            strokeWeight(1);
            centerRect(dim/2-x/2,dim/2+x*3/10,x/2,x/4);
            fill(0,154,0);
            centerRect(dim/2+x/2,dim/2+x*3/10,x/2,x/4);
            fill(0);
            textSize(x/6);
            text("No",dim/2-x/2,dim/2+x*3/10);
            text("Yes",dim/2+x/2,dim/2+x*3/10);
            text("Are you sure you want to\nDelete the stage named\n"+stages[stage][50]+"?",dim/2,dim/2-x/5);
        };
        var editSelectedArea = 1;
        var blockType = 0;
        var blockSelect = -1;
        var blockTypeSelect = 0;
        var selectedX = 0;
        var selectedY = 0;
        var stringCount = 0;
        var stringCountChange = 0;
        var stringInput = "";

    //ITEM SELECT VARIABLES
        var ai = [0,180];
        var flip = [0,180];
        var itemList = [getImage("avatars/marcimus"),getImage("avatars/mr-pants"),getImage("avatars/old-spice-man"),getImage("avatars/purple-pi"),getImage("cute/ChestClosed"),function(a,b,s){logo(a,b,s*11/24,true);},function(a,b,s){clock(a,b,s,8,0);}];
        var itemTime = [];
        var itemsOn = [];
            for(i = 0; i < itemList.length; i++){
                itemsOn[i] = 0;
            }
        var itemLevel = ["OFF","LOW","MID","HIGH"];
        var itemHighlight = 0;
        var outline = [];
        var livesTime = 0;
        var livesOn = true;
        var timeOn = true;
        var transition = false;
    
    //SELECT SCREEN VARIABLES--------------------------------
        var names = [];
        for(i = 0; i < 2; i++){
            names[i] = ["PICERATOPS","HOPPER","ERROR BUDDY", "WINSTON", "RANDOM"];
        }
        var altnames = ["PICERATOPS","PRIMOSAUR","STARKY","LEAFERS","DUSKPIN","AQUALINE"];
        var ready = [0,0];
        var load = 0;

    //SELECTABLE CHARACTER CREATION FUNCTION-------------
        var option = function(x,y){
            this.x = x;
            this.y = y;
        };
        var options = [];
        var visuals = [];
            for(i = 0; i<2; i++){
                options[i] = [];
                visuals[i] = [];
            }
            for(i=0;i < 2;i++){
                for(j = 0; j<sprites[i].length; j++){
                    options[i][j] = new option(dim*3/20+7/10*dim*i,mod((dim*sprites[i].length+dim/2)*(j-floor(p[i].c)+sprites[i].length/2+1)/pow(sprites[i].length,2),dim+dim/2/sprites[i].length)-dim/4/sprites[i].length);
                }
            }

//BATTLE SCREEN VARIABLES------------------------------------
var spawn;
var barriers = [];
var softBarriers = [];
var pointBarriers = [];
var kill = false;
var barrierLines = function(){
    for(i = 0; i < stages[stage].length-2;i++){
        if(stages[stage][i] === 1){
            barriers[barriers.length] = [mod(i,10)*40-215,floor(i/10)*40-100,mod(i,10)*40-215,floor(i/10)*40-60,0];
            barriers[barriers.length] = [mod(i,10)*40-200,floor(i/10)*40-115,mod(i,10)*40-160,floor(i/10)*40-115,1];
            barriers[barriers.length] = [mod(i,10)*40-145,floor(i/10)*40-100,mod(i,10)*40-145,floor(i/10)*40-60,0];
            barriers[barriers.length] = [mod(i,10)*40-200,floor(i/10)*40-45,mod(i,10)*40-160,floor(i/10)*40-45,0];
            pointBarriers[pointBarriers.length] = [mod(i,10)*40-200,floor(i/10)*40-100,30,1];
            pointBarriers[pointBarriers.length] = [mod(i,10)*40-200,floor(i/10)*40-60,30,0];
            pointBarriers[pointBarriers.length] = [mod(i,10)*40-160,floor(i/10)*40-100,30,1];
            pointBarriers[pointBarriers.length] = [mod(i,10)*40-160,floor(i/10)*40-60,30,0];
        }
        if(stages[stage][i] === 2){
            softBarriers[softBarriers.length] = [mod(i,10)*40-200,floor(i/10)*40-115,mod(i,10)*40-160,floor(i/10)*40-115,1];
        }
            if(stages[stage][i] === 3){
            barriers[barriers.length] = [mod(i,10)*40-200,floor(i/10)*40-115,mod(i,10)*40-160,floor(i/10)*40-115,1];
            barriers[barriers.length] = [mod(i,10)*40-145,floor(i/10)*40-100,mod(i,10)*40-145,floor(i/10)*40-60,0];
            barriers[barriers.length] = [mod(i,10)*40-200-15/sqrt(2),floor(i/10)*40-100+15/sqrt(2),mod(i,10)*40-160-15/sqrt(2),floor(i/10)*40-60+15/sqrt(2),0];
            pointBarriers[pointBarriers.length] = [mod(i,10)*40-200,floor(i/10)*40-100,30,1];
            pointBarriers[pointBarriers.length] = [mod(i,10)*40-160,floor(i/10)*40-100,30,1];
            pointBarriers[pointBarriers.length] = [mod(i,10)*40-160,floor(i/10)*40-60,30,0];
        }
        if(stages[stage][i] === 4){
            barriers[barriers.length] = [mod(i,10)*40-200,floor(i/10)*40-115,mod(i,10)*40-160,floor(i/10)*40-115,1];
            barriers[barriers.length] = [mod(i,10)*40-215,floor(i/10)*40-100,mod(i,10)*40-215,floor(i/10)*40-60,0];
            barriers[barriers.length] = [mod(i,10)*40-200+15/sqrt(2),floor(i/10)*40-60+15/sqrt(2),mod(i,10)*40-160+15/sqrt(2),floor(i/10)*40-100+15/sqrt(2),0];
            pointBarriers[pointBarriers.length] = [mod(i,10)*40-200,floor(i/10)*40-100,30,1];
            pointBarriers[pointBarriers.length] = [mod(i,10)*40-160,floor(i/10)*40-100,30,1];
            pointBarriers[pointBarriers.length] = [mod(i,10)*40-200,floor(i/10)*40-60,30,0];
        }
    }
};
var blastZone = function(player,minx,miny,maxx,maxy){
    if((p[player].x < minx || p[player].y < miny || p[player].x > maxx || p[player].y > maxy)){
        if(!p[player].kill){
            p[player].damage = 0;
            p[player].lives -= 1;
            kill = true;
        }
        else{
            p[player].kill = false;
        }
        p[player].vx = 0.0001;
        p[player].vy = 0.0001;
        p[player].hitstun = 0;
        p[player].lag = 0;
        p[player].move = "";
        spawn = floor(random(1,3));
        for(j = 0; j < stages[stage].length-2; j++){
            if(stages[stage][j] === 5){
                spawn -= 1;
                if(spawn === 0){
                    p[player].x = mod(j,10)*40-180;
                    p[player].y = floor(j/10)*40-80;
                }
            }
        }
    }
};
var charStatDisplay = function(){
    textAlign(LEFT,TOP);
    textSize(20);
    text("P1",-200,-200);
    text("Lives: "+p[0].lives,-200,-180);
    text("Damage: "+p[0].damage,-200,-160);
    textAlign(RIGHT,TOP);
    text("P2",200,-200);
    text("Lives: "+p[1].lives,200,-180);
    text("Damage: "+p[1].damage,200,-160);
};
var gameEnd = function(){
    screen[0] = 2;
    screen[1] = 3;
};
var restore = function(player){
    p[player].jumps = 2;
    p[player].friction = p[player].gfriction;
    p[player].kill = false;
    p[player].contact = 1;
    p[player].friction = p[player].gfriction;
};
var controls = [[87,65,83,68,67,86,66],[38,37,40,39,79,80,219]];//up,left,down,right,attack,shield,special
var netPoint = function(quid){
   if(quid === 0){
       return sign(keys[controls[0][0]])+abs(sign(keys[controls[0][0]]))-sign(keys[controls[0][2]])-abs(sign(keys[controls[0][2]]));
   }
   if(quid === 1){
       return sign(keys[controls[0][3]])+abs(sign(keys[controls[0][3]]))-sign(keys[controls[0][1]])-abs(sign(keys[controls[0][1]]));
   }
   if(quid === 2){
       return sign(keys[controls[1][0]])+abs(sign(keys[controls[1][0]]))-sign(keys[controls[1][2]])-abs(sign(keys[controls[1][2]]));
   }
   if(quid === 3){
       return sign(keys[controls[1][3]])+abs(sign(keys[controls[1][3]]))-sign(keys[controls[1][1]])-abs(sign(keys[controls[1][1]]));
   }
};
var contact = Infinity;
var compute = function(string,varlist,valuelist){
    if(string === null){
        return null;
    }
    else{
        varlist = varlist.concat(["x0","y0","vx0","vy0","size0","damage0","up0","down0","left0","right0","attack0","special0","shield0","d0v","d0h","x1","y1","vx1","vy1","size1","damage1","up1","down1","left1","right1","attack1","special1","shield1","d1v","d1h"]);
        valuelist = valuelist.concat([p[0].prevX,p[0].prevY,p[0].prevVx,p[0].prevVy,p[0].size,p[0].damage,sign(keyDown[controls[0][0]]),sign(keyDown[controls[0][2]]),sign(keyDown[controls[0][1]]),sign(keyDown[controls[0][3]]),sign(keyDown[controls[0][4]]),sign(keyDown[controls[0][6]]),sign(keyDown[controls[0][5]]),netPoint(0),netPoint(1),p[1].prevX,p[1].prevY,p[1].prevVx,p[i].prevVy,p[1].size,p[1].damage,sign(keyDown[controls[1][0]]),sign(keyDown[controls[1][2]]),sign(keyDown[controls[1][1]]),sign(keyDown[controls[1][3]]),sign(keyDown[controls[1][4]]),sign(keyDown[controls[1][6]]),sign(keyDown[controls[1][5]]),netPoint(2),netPoint(3)]);
        var str = "("+String(string)+")";
        var substr = [-1,-1,""];
        var nums = [];
        var numsa = [];
        var i;
        var j;
        var k;
        var l;
        var parenthMax = 0;
        var vars = [];
        var values = [];
        //organizing variables in decending order by length
        j = 0;
        for(i = 0; i < varlist.length;i++){
            j = max(j,varlist[i].length);
        }
        for(i = j; i > 0; i--){
            for(j = 0; j < varlist.length;j++){
                if(varlist[j].length >= i){
                    vars[vars.length] = varlist[j];
                    values[values.length] = valuelist[j];
                    varlist[j] = "";
                }
            }
        }
        //replacing variables with their values
        for(i = 0;i<vars.length;i++){
            for(j = 0;j<str.length-vars[i].length+1;j++){
                if(str.substring(j,j+vars[i].length)===vars[i]){
                    str = str.substring(0,j)+String(values[i])+str.substring(j+vars[i].length,str.length);
                }
            }
        }
        //inserting missing parentheses and comuting the maximum nested amount
        j = 0;
        for(i = 0; i < str.length;i++){
            if(str.substring(i,i+1) === "("){
                j++;
                parenthMax = max(parenthMax,j);
            }
            else if(str.substring(i,i+1) === ")"){
                j-=1;
                if(j < 0){
                    str = "("+str;
                    j=0;
                    parenthMax++;
                    i+=1;
                }
            }
        }
        for(i = j; i > 0;i--){
            str = str+")";
        }
        for(i = 0; i < str.length-1;i++){
            if(str.substring(i,i+2)==="()"){
                str = str.substring(0,i)+str.substring(i+2,str.length);
                i -= 1;
            }
        }
        //finding substrings of a given set of parentheses
        j = 0;
        for(i = parenthMax; i > 0;i--){
            for(k = 0; k < str.length;k++){
                if(str.substring(k,k+1) === "("){
                    j+=1;
                    if(j === i){
                        substr[0] = k;
                    }
                }
                else if(str.substring(k,k+1) === ")"){
                    j-=1;
                    if(substr[0] !== -1){
                        substr[1] = k;
                    }
                }
                if(substr[1] !== -1){
                    substr[2] = str.substring(substr[0]+1,substr[1]);
                    nums = [0];
                    //breaking substring into numbers and operations
                    for(l = 0; l < substr[2].length;l++){
                        if("0123456789".indexOf(substr[2].substring(l,l+1)) > -1){
                            nums[nums.length-1] = 10*nums[nums.length-1]+"0123456789".indexOf(substr[2].substring(l,l+1));
                        }
                        else if("+-*/%^.".indexOf(substr[2].substring(l,l+1)) > -1){
                            nums[nums.length] = "+-*/%^."["+-*/%^.".indexOf(substr[2].substring(l,l+1))];
                            if(substr[2].substring(l,l+1) === "."){
                                nums[nums.length] = 1;
                            }
                            else if(substr[2].substring(l+1,l+2) !== "-"){
                                nums[nums.length] = 0;
                            }
                        }
                        else{
                            //notifies user if a variable is undefined, computer pretends
                            //variable isn't there
                            println(substr);
                            println(nums);
                            println("variable undefined");
                            println("___________________________________");
                        }
                    }
                    //executing operations
                    numsa = [];
                    for(l = 0; l < nums.length; l++){
                        if(nums[l] === "."){
                            numsa[numsa.length-1] = numsa[numsa.length-1]+nums[l+1]/pow(10,String(nums[l+1]).length-1)-1;
                            l+=1;
                        }
                        else{
                            numsa[numsa.length] = nums[l];
                        }
                    }
                    nums = numsa;
                    numsa = [];
                    for(l = 0; l < nums.length; l++){
                        if("+-*/%^".indexOf(nums[l]) > -1 && nums[l+1] === "-"){
                            numsa[numsa.length] = nums[l];
                            numsa[numsa.length] = nums[l+2]*-1;
                            l+=2;
                        }
                        else{
                            numsa[numsa.length] = nums[l];
                        }
                    }
                    nums = numsa;
                    numsa = [];
                    for(l = 0; l < nums.length; l++){
                        if(nums[l] === "^"){
                            numsa[numsa.length-1] = pow(numsa[numsa.length-1],nums[l+1]);
                            l++;
                        }
                        else{
                            numsa[numsa.length] = nums[l];
                        }
                    }
                    nums = numsa;
                    numsa = [];
                    for(l = 0; l < nums.length; l++){
                        if(nums[l] === "*"){
                            numsa[numsa.length-1] *= nums[l+1];
                            l++;
                        }
                        else if(nums[l] === "/"){
                            numsa[numsa.length-1] /= nums[l+1];
                            l++;
                        }
                        else if(nums[l] === "%"){
                            numsa[numsa.length-1] = numsa[numsa.length-1]%nums[l+1];
                            l++;
                        }
                        else {
                            numsa[numsa.length] = nums[l];
                        }
                    }
                    nums = numsa;
                    numsa = [];
                    for(l = 0; l < nums.length; l++){
                        if(nums[l] === "+"){
                            numsa[numsa.length-1] +=nums[l+1];
                            l++;
                        }
                        else if(nums[l] === "-"){
                            numsa[numsa.length-1] -= nums[l+1];
                            l++;
                        }
                        else{
                            numsa[numsa.length] = nums[l];
                        }
                    }
                    str = str.substring(0,substr[0])+numsa[0]+str.substring(substr[1]+1,str.length);
                    k = substr[0];
                    substr = [-1,-1,""];
                }
            }
        }
        return(numsa[0]);
    }
};

//CONTROL VARIABLES
var jump = function(player,startup,lag,jumpheight){
    if((p[player].lag <= 0 || p[player].move === "shield") && keyDown[controls[player][0]] && p[player].jumps > 0 && p[player].hitstun <= 0){
        p[player].startUp = startup;
        p[player].lag = lag;
        p[player].move = "jump";
        p[player].jumps -= 1;
        for(j=0;j<p[player].hitbox.length;j++){
            if(p[player].hitbox[j][2][0] === null || p[player].hitbox[j][2][1] === null){
                for(k = 0; k < p[player].hitbox[j].length;k++){
                    if(k !== 2){
                        p[player].hitbox[j][k] = null;
                    }
                }
            }
        }
    }
    else if(p[player].startUp === 0 && p[player].move === "jump"){
        p[player].vy = -jumpheight*sqrt(parseFloat(stages[stage][51]));
        p[player].friction = p[player].afriction;
        if(keys[controls[player][1]] && keys[controls[player][3]]){
            p[player].vx = 0;
        }
        else if(keys[controls[player][1]]){
            p[player].vx = -5/sqrt(p[player].friction);
        }
        else if(keys[controls[player][3]]){
            p[player].vx = 5/sqrt(p[player].friction);
        }
        if(keys[controls[player][2]]){
            p[player].vy/=sqrt(2);
            p[player].vx/=sqrt(2);
        }
    }
};
var movement = function(player,ax){
    if(p[player].lag <= 0 && p[player].hitstun <= 0){
        if(keys[controls[player][1]] && !keys[controls[player][3]]){
            p[player].vx -= ax;
            if(p[player].contact === 1){
                p[player].direction = -1;
            }
        }
        if(keys[controls[player][3]] && !keys[controls[player][1]]){
            p[player].vx += ax;
            if(p[player].contact === 1){
                p[player].direction = 1;
            }
        }
        if(keys[controls[player][1]] && keys[controls[player][3]]){
                p[i].vx *= 0.000000001;
        }
    }
};
var dodge = function(player,startup,lag,invisibility){
    if(keyDown[controls[player][5]]){
        if(p[player].lag <= 0 && p[player].hitstun <=0){
            p[player].move = "dodge";
            p[player].startUp = startup;
            p[player].lag = lag;
            for(j=0;j<p[player].hitbox.length;j++){
                if(p[player].hitbox[j][2][0] === null || p[player].hitbox[j][2][1] === null){
                    for(k = 0; k < p[player].hitbox[j].length;k++){
                        if(k !== 2){
                            p[player].hitbox[j][k] = null;
                        }
                    }
                }
            }
        }
    }
    if(p[player].move === "dodge" && p[player].startUp === 0 && p[player].hitstun <= 0){
        p[player].invisible = invisibility;
    }
    if(p[player].move === "shield" && p[player].lag > 0 && p[player].hitstun <= 0){
        for(j = 1;j<7/2;j++){
            if(keyDown[controls[player][j]]){
                p[player].move = "dodge";
                p[player].lag = lag;
                p[player].startUp = startup;
                p[player].vx += 5*(j-2);
            }
        }
    }
};
var shield = function(player,startup,lag){
    if(keys[controls[player][5]] && p[player].contact === 1 && (p[player].lag <= 0 || p[player].move === "shield") && p[player].hitstun <= 0){
        if(p[player].move !== "shield"){
            for(j=0;j<p[player].hitbox.length;j++){
                if(p[player].hitbox[j][2][0] === null || p[player].hitbox[j][2][1] === null){
                    for(k = 0; k < p[player].hitbox[j].length;k++){
                        if(k !== 2){
                            p[player].hitbox[j][k] = null;
                        }
                    }
                }
            }
        }
        p[player].move = "shield";
        p[player].lag = lag;
        p[player].startUp = startup;
        p[player].vx = 0.000001;
        noStroke();
        fill(0, 255, 255, 127);
        ellipse(p[player].x,p[player].y,40,40);
    }
};
var attacks = function(player,keys,startup,lag,name,hitboxes){
    //hitboxes[each] = [hitboxFrame,hitboxActive,hitboxProjectileSpeed,hitboxTargetMax,hitboxX,hitboxY,hitboxRadius,image,imageSize,imageAngle,imageAngleSpeed,damage,knockbackX,knockbackY,hitstun]
    if(keys && (p[player].lag <=0 || p[player].move === "jump") && p[player].hitstun <=0){
        p[player].move = name;
        p[player].lag = lag;
        p[player].startUp = startup;
        for(j=0;j<p[player].hitbox.length;j++){
            if(p[player].hitbox[j][2][0] === null || p[player].hitbox[j][2][1] === null){
                for(k = 0; k < p[player].hitbox[j].length;k++){
                    if(k !== 2){
                        p[player].hitbox[j][k] = null;
                    }
                }
            }
        }
    }
    if(p[player].move === name && p[player].startUp <=0){
        for(j = 0; j < hitboxes.length;j++){
            if(hitboxes[j][0] === -p[player].startUp){
                k = 0;
                while(k < p[player].hitbox.length && p[player].hitbox[k][0] !== null){
                    k+=1;
                }
                p[player].hitbox[k] = [];
                for(l = 0; l < hitboxes[j].length; l++){
                    if(l !== 2){
                        p[player].hitbox[k][l] = hitboxes[j][l];
                    }
                    else{
                        p[player].hitbox[k][2] = [];
                        p[player].hitbox[k][2][0] = hitboxes[j][2][0];
                        p[player].hitbox[k][2][1] = hitboxes[j][2][1];
                    }
                }
                p[player].hitbox[k][4] = compute(p[player].hitbox[k][4],[],[]);
                p[player].hitbox[k][5] = compute(p[player].hitbox[k][5],[],[]);
                p[player].hitbox[k][hitboxes[j].length] = j;
            }
        }
        for(j = 0;j < p[player].hitbox.length;j++){
            if(p[player].hitbox[j][0]+p[player].hitbox[j][1] === -p[player].startUp && (p[player].hitbox[j][2][0] === null || p[player].hitbox[j][2][1] === null)){
                for(k = 0; k < p[player].hitbox[j].length; k++){
                    if(k !== 2){
                        p[player].hitbox[j][k] = null;
                    }
                }
            }
        }
    }
};
//hitboxes[each] = [hitboxFrame,hitboxActive,hitboxProjectileSpeed,hitboxTargetMax,hitboxX,hitboxY,hitboxRadius,image,imageSize,imageAngle,imageAngleSpeed,damage,knockbackX,knockbackY,hitstun]
var drawHitboxes = function(player){
    for(j = 0; j < p[player].hitbox.length; j++){
        if(nulf(p[player].hitbox[j][0])){
            if(String(p[player].hitbox[j][7]) === "[object Object]"){
                if(!nulf(p[player].hitbox[j][2][0]) || !nulf(p[player].hitbox[j][2][1])){
                    translate(p[player].x,p[player].y);
                }
                translate(p[player].hitbox[j][4],p[player].hitbox[j][5]);
                rotate(p[player].hitbox[j][9]);
                scale(p[player].hitbox[j][8]/100);
                image(p[player].hitbox[j][7],0,0);
                popMatrix();pushMatrix();
            }
        }
        else{
            
        }
    }
};
var projectileCalc = function(player){
    for(var i = 0; i < p[player].hitbox.length;i++){
        if(nulf(p[player].hitbox[i][2][0]) && nulf(p[player].hitbox[i][2][1])){
            p[player].hitbox[i][4] += compute(p[player].hitbox[i][2][0],[],[]);
            p[player].hitbox[i][5] += compute(p[player].hitbox[i][2][0],[],[]);
            if(p[player].hitbox[i][3] <= 0 || p[player].hitbox[i][1] <= 0){
                for(var k = 0;k < p[player].hitbox[i].length;k++){
                    if(k !== 2){
                        p[player].hitbox[i][k] = null;
                    }
                }
                p[player].hitbox[i][2] = [null,null];
            }
            p[player].hitbox[i][1] -= 1;
        }
        else if(p[player].hitstun > 0){
            for(var k = 0; k < p[player].hitbox[i].length;k++){
                if(k !== 2){
                    p[player].hitbox[i][k] = null;
                }
                p[player].hitbox[i][2][0] = null;
                p[player].hitbox[i][2][1] = null;
            }
        }
    }
};
//up,left,down,right,attack,shield,special
//player,keys,startup,lag,name,hitboxes
//hitboxes[each] = [hitboxFrame,hitboxActive,hitboxProjectileSpeed,hitboxTargetMax,hitboxX,hitboxY,hitboxRadius,image,imageSize,imageAngle,imageAngleSpeed,damage,knockbackX,knockbackY,hitstun]
var movesets = [];
movesets[0] = function(player){
    if(keyDown[controls[player][6]]){
        if(keys[controls[player][1]]){
            p[player].c = mod(p[player].c-0.1,alts.length/10);
            sprites[player][0] = alts[round(10*p[player].c)];
            names[player][0] = altnames[round(10*p[player].c)];
        }
        if(keys[controls[player][3]]){
            p[player].c = mod(p[player].c+0.1,alts.length/10);
            sprites[player][0] = alts[round(10*p[player].c)];
            names[player][0] = altnames[round(10*p[player].c)];
        }
    }
    attacks(player,keyDown[controls[player][6]] && keys[controls[player][0]],10,50,"upB0",[[0,10,[0,0],1,"d"+player+"h*25+x"+player,"-d"+player+"v*25+y"+player,30,upBim[round(10*p[player].c)],30,0,0,10,"10","hitdamage","-hitdamage",10],[12,10,[0,0],1,"d"+player+"h*25+x"+player,"-d"+player+"v*25+y"+player,30,upBim[round(10*p[player].c)],30,0,0,10,"10","hitdamage","-hitdamage",10],[24,10,[0,0],1,"d"+player+"h*25+x"+player,"-d"+player+"v*25+y"+player,30,upBim[round(10*p[player].c)],30,0,0,10,"10","hitdamage","-hitdamage",10],[36,10,[0,0],1,"d"+player+"h*25+x"+player,"-d"+player+"v*25+y"+player,30,upBim[round(10*p[player].c)],30,0,0,10,"10","hitdamage","-hitdamage",10]]);
    if(p[player].move === "upB0"){
        if(p[player].startUp > 0){
            p[player].vy = min(0,p[player].vy);
        }
        if(p[player].startUp === 0 || p[player].startUp === -12 || p[player].startUp === -24 || p[player].startUp === -36){
            p[player].save = [p[player].prevX+25*netPoint(1+2*player),p[player].prevY-25*netPoint(2*player)];
            p[player].vx = (p[player].save[0]-p[player].prevX)/50*5.92;
            p[player].vy = (p[player].save[1]-p[player].prevY)/50*4.68-5.92;
        }
    }
    attacks(player,keyDown[controls[player][6]] && keys[controls[player][2]],0,10,"DownB0",[[0,150,[0,0],1,"x"+player,"y"+player,20,downBim[round(10*p[player].c)],30,0,0,10,"15","10","-10","300"]]);
};
//SCREEN DATA------------------------------------------------

//HELP SCREEN------------------------------------------------
var help = function(){
    

    //SCREEN PROPERTIES--------------------------------------
        if(change){

            //leaf background
                fill(0, 127, 127);
                noStroke();
                rect(0,0,dim,dim);
                    for(i = 0; i < 121; i++){
                        translate(dim/10*mod(i,11),dim/10*floor(i/11));
                        rotate(random(0,359));
                        image(leaves[floor(random(0,leaves.length-1))],0,0,dim/4,dim/4);
                        popMatrix();pushMatrix();
                    }
                screen[0] = round(10*screen[0])/10;

            //SPECIFIC AESTHETICS------------------------

                //screen1--------------------------------
                    if(screen[0] === 0){

                        //TITLE------------------------------
                            textSize(dim*3/40);
                            logo(dim/2,dim/4,dim*3/16,true);

                            //text---------------------------
                                fill(255, 255, 255);
                                text("PSEUDO\nKHAN\nBROS",dim/2,dim*21/80);

                        //PLAYABLE CHARACTERS----------------
                            for(i = 0; i < ceil((sprites[0].length-1)/2); i++){
                                for(j = 1; j <= 30; j++){
                                    translate(dim*7/80+dim*4/5/ceil(sprites[0].length-1)*(2*i+1),dim/2);
                                    rotate(48*j);
                                    image(getImage("avatars/leaf-grey"),dim*log(j)/50,dim*log(j)/50,dim/10,dim/10);
                                    popMatrix();pushMatrix();
                                }
                                image(sprites[0][i],dim*7/80+dim*4/5/(ceil(sprites[0].length-1))*(2*i+1),dim/2,dim/10,dim/10);
                            }
                            for(i = 0; i < floor((sprites[0].length-1)/2); i++){
                                for(j = 1; j <= 30; j++){
                                    translate(dim*7/80+dim*4/5/ceil(sprites[0].length-1)*(2*i+1),dim*3/4);
                                    rotate(48*j);
                                    image(getImage("avatars/leaf-grey"),dim*log(j)/50,dim*log(j)/50,dim/10,dim/10);
                                    popMatrix();pushMatrix();
                                }
                                image(sprites[0][i+ceil(sprites[0].length/2-1)],dim*7/80+dim*4/5/(floor(sprites[0].length-1))*(2*i+1),dim*3/4,dim/10,dim/10);
                            }
                    }

                    //screens-------------------------------
                        if(screen[0] !== 0){
                            helpScreen[10*screen[0]-1]();
                        }

                    //general help aesthetics----------------
                        noFill();
                        stroke(0);
                        strokeWeight(1);
                        for(i = 0; i < dim*3/50; i+=2){
                            line(i,i,i,dim-i);
                            line(i,i,dim-i,i);
                            line(dim-i,i,dim-i,dim-i);
                            line(i,dim-i,dim-i,dim-i);
                        }

                        //exit menu
                        if(screen[0] !== 0){
                            fill(255, 0, 0);
                            centerRect(dim/2,dim*7/8,dim/2,dim*3/40);
                            textSize(dim/20);
                            fill(0);
                            text("Exit Help Menu",dim/2,dim*7/8);
                        }

                        //menu navigation text
                        if(screen[0] !== 0){
                            textSize(dim*11/400);
                            stroke(1);
                            fill(0,127,127);
                            rect(dim*3/20,dim*37/40,dim*7/10,dim*3/40-1);
                            fill(0);
                            text("*Navigate the menus with the arrow keys, wasd or by\nclicking on the arrows*",dim/2,dim*77/80);
                        //arrows
                            fill(0,127,127);
                            stroke(1);
                            if(screen[0] !== 0.1){
                                rect(0,dim*7/8-1,dim/8,dim/8);
                                fill(0, 0, 0);
                                rect(dim*9/160,dim*37/40-1,dim/20,dim/40);
                                triangle(dim*9/160,dim*9/10-1,dim*9/160,dim*39/40,dim/160,dim*149/160);
                            }
                            fill(0,127,127);
                            if(screen[0] !== (screenCount-1)/10){
                                rect(dim*7/8-1,dim*7/8-1,dim/8,dim/8);
                                fill(0,0,0);
                                rect(dim*71/80,dim*37/40-1,dim/20,dim/40);
                                triangle(dim*15/16,dim*9/10-1,dim*15/16,dim*39/40,dim*79/80,dim*15/16);
                            }
                        }

                //play and help
                    if(screen[0] === 0){
                        fill(255, 0, 0);
                        centerRect(dim/2,dim*19/20-1,dim/2,dim/10);
                        fill(0);
                        textSize(dim/10);
                        text("PLAY",dim/2,dim*19/20);
                        fill(0,127,127);
                        rect(dim*13/16,dim*7/8,dim*3/16-1,dim/8-1);
                        fill(0);
                        textSize(dim/16);
                        text("Help",dim*29/32,dim*15/16);
                    }
            }

    //FUNCTIONS----------------------------------------------
        change = false;
        if(screen[0] !== 0){
            if((keyDown[68] || keyDown[39] ||(mouseDown && abs(mouseX-cornerX-dim*15/16) <= dim/16) && abs(mouseY-cornerY-dim*15/16) <= dim/16) && rnd(screen[0],8) !== rnd((screenCount-1)/10,8) && screen[0] !== 0){
                screen[0] += 0.1;
                change = true;
            }
            if((keyDown[65] || keyDown[37] || (mouseDown && abs(mouseX-cornerX-dim/16) <= dim/16 && abs(mouseY-cornerY-dim*15/16) <= dim/16)) && screen[0] !== 0 && screen[0] !== 0.1){
                screen[0] -= 0.1;
                change = true;
            }
            if(keyDown[16] || keyDown[8] || keyDown[10] || keyDown[32] || (mouseDown && abs(mouseX-cornerX-dim/2) <= dim/4 && abs(mouseY-cornerY-dim*7/8) <= dim*3/80)){
                screen[0] = screen[1];
                change = true;
            }
            if(keyDown[72]){
                screen[0] = 0.1;
                change = true;
            }
        }
        else if(screen[0] === 0){
            if(keyDown[72]){
                screen[1] = 0;
                screen[0] = 0.1;
                change = true;
            }
            else if(keyDown[10] || keyDown[32] || keyDown[16]){
                screen[0] = 2;
                screen[1] = 2;
            }
        }
    //Home Screen clicks
        if(screen[0] === 0 && mouseDown){
            if(abs(mouseX-cornerX-dim*29/32) <= dim*3/32 && abs(mouseY-cornerY-dim*15/16) <= dim/8){
                screen[0] = 0.1;
                change = true;
            }
            if(abs(mouseX-cornerX-dim/2) <= dim/4 && abs(mouseY-cornerY-dim*19/20) <= dim/20){
                screen[0] = 2;
                screen[1] = 2;
            }
        }
};

//ITEM DATA-----------------------------
    var itemSelect = function(){
        //BACKGROUND
            fill(127, 0, 127);
            noStroke();
            strokeWeight(1);
            rect(0,0,dim,dim);

            //shade
            translate(-1,-1);
            for(i = 1; i <= dim+2; i+=2){
                stroke(0,0,0,510/dim*abs(dim/2-i+1));
                line(0,i,dim,i);
                line(i,0,i,dim);
            }
            popMatrix();pushMatrix();

        //TITLES
            textSize(dim*3/40);
            fill(255,255,0);
            text("AI",dim/2,dim/16);
            text("TITLE",dim/2,dim/4);
        //drawing the AI or Player
            stroke(0,0,255);
            strokeWeight(dim*3/400);
            if(itemHighlight !== 0){
                strokeWeight(1);
                stroke(255*flip[0]);
            }
            fill(abs(255-17/12*flip[0]));
            rect(dim/16,dim/16,dim/4,dim/8);
            if(itemHighlight !==0){
                stroke(17/12*flip[1]);
            }
            fill(abs(255-17/12*flip[1]));
            rect(dim*11/16,dim/16,dim/4,dim/8);
            noStroke();
            if(abs(flip[0]-180) < 90){
                fill(255);
            }
            else{
                fill(0);
            }
            translate(dim*3/16,dim/8);
            scale(abs(cos(flip[0])),1);
            centerRect(0,0,dim/5,dim*3/40);
            if(abs(flip[0]-180) < 90){
                fill(0);
                text("AI 2",0,0);
            }
            else{
                fill(255);
                text("P 1",0,0);
            }
            popMatrix();pushMatrix();
            translate(dim*13/16,dim/8);
            scale(abs(cos(flip[1])),1);
            if(abs(flip[1]-180) < 90){
                fill(255);
            }
            else{
                fill(0);
            }
            centerRect(0,0,dim/5,dim*3/40);
            for(i = 0;i < 1; i++){
                
            }
            if(abs(flip[1]-180) < 90){
                fill(0);
                text("AI 2",0,0);
            }
            else{
                fill(255);
                text("P 2",0,0);
            }
            popMatrix();pushMatrix();
        //drawing items
            k = 0;
            stroke(255);
            strokeWeight(dim/400);
            for(i = 0; i < ceil((3+sqrt(9+96*itemList.length))/16) && k < itemList.length; i++){
                for(j = 0; j < floor((itemList.length+i)/ceil((3+sqrt(9+96*itemList.length))/16)) && k < itemList.length; j++){
                    if(String(itemList[k]) === "[object Object]"){
                        image(itemList[k],dim/2+dim*3/16/ceil((3+sqrt(9+96*itemList.length))/16)*(2*j+1-floor((itemList.length+i)/ceil((3+sqrt(9+96*itemList.length))/16))),dim*5/16+dim*3/16/ceil((3+sqrt(9+96*itemList.length))/16)*(2*i+1)-dim*3/8/ceil((3+sqrt(9+96*itemList.length))/16)/4,dim*3/8/ceil((3+sqrt(9+96*itemList.length))/16)/2,dim*3/8/ceil((3+sqrt(9+96*itemList.length))/16)/2);
                    }
                    else{
                        itemList[k](dim/2+dim*3/16/ceil((3+sqrt(9+96*itemList.length))/16)*(2*j+1-floor((itemList.length+i)/ceil((3+sqrt(9+96*itemList.length))/16))),dim*5/16+dim*3/16/ceil((3+sqrt(9+96*itemList.length))/16)*(2*i+1)-dim*3/8/ceil((3+sqrt(9+96*itemList.length))/16)/4,dim*3/8/ceil((3+sqrt(9+96*itemList.length))/16)/2);
                        stroke(255);
                        strokeWeight(dim/400);
                    }
                    if(itemsOn[k] === 0){
                        fill(255, 0, 0);
                    }
                    else{
                        fill(0,340*itemsOn[k],0);
                    }
                    centerRect(dim/2+dim*3/16/ceil((3+sqrt(9+96*itemList.length))/16)*(2*j+1-floor((itemList.length+i)/ceil((3+sqrt(9+96*itemList.length))/16))),dim*5/16+dim*3/16/ceil((3+sqrt(9+96*itemList.length))/16)*(2*i+1)+dim*3/8/ceil((3+sqrt(9+96*itemList.length))/16)/4,dim*3/8/ceil((3+sqrt(9+96*itemList.length))/16),dim*3/8/ceil((3+sqrt(9+96*itemList.length))/16)/2);
                    noFill();
                    centerRect(dim/2+dim*3/16/ceil((3+sqrt(9+96*itemList.length))/16)*(2*j+1-floor((itemList.length+i)/ceil((3+sqrt(9+96*itemList.length))/16))),dim*5/16+dim*3/16/ceil((3+sqrt(9+96*itemList.length))/16)*(2*i+1),dim*3/8/ceil((3+sqrt(9+96*itemList.length))/16),dim*3/8/ceil((3+sqrt(9+96*itemList.length))/16));
                    fill(0);
                    textSize(dim/20);
                    text(itemLevel[4*itemsOn[k]],dim/2+dim*3/16/ceil((3+sqrt(9+96*itemList.length))/16)*(2*j+1-floor((itemList.length+i)/ceil((3+sqrt(9+96*itemList.length))/16))),dim*5/16+dim*3/16/ceil((3+sqrt(9+96*itemList.length))/16)*(2*i+1)+dim*3/8/ceil((3+sqrt(9+96*itemList.length))/16)/4);
                    if(itemHighlight === k+1){
                        outline[0] = j;
                        outline[1] = i;
                    }
                    if(mouseDown && abs(mouseX-cornerX-(dim/2+dim*3/16/ceil((3+sqrt(9+96*itemList.length))/16)*(2*j+1-floor((itemList.length+i)/ceil((3+sqrt(9+96*itemList.length))/16))))) < dim*3/8/ceil((3+sqrt(9+96*itemList.length))/16)/2 && abs(mouseY-cornerY-(dim*5/16+dim*3/16/ceil((3+sqrt(9+96*itemList.length))/16)*(2*i+1))) < dim*3/8/ceil((3+sqrt(9+96*itemList.length))/16)/2){
                        itemsOn[k] = rnd(mod(itemsOn[k]+0.25,1),12);
                    }
                    k+=1;
                }
            }
            if(itemHighlight !== 0 && itemHighlight !== itemList.length+1){
                noFill();
                stroke(0,0,255);
                strokeWeight(dim*3/400);
                centerRect(dim/2+dim*3/16/ceil((3+sqrt(9+96*itemList.length))/16)*(2*outline[0]+1-floor((itemList.length+outline[1])/ceil((3+sqrt(9+96*itemList.length))/16))),dim*5/16+dim*3/16/ceil((3+sqrt(9+96*itemList.length))/16)*(2*outline[1]+1),dim*3/8/ceil((3+sqrt(9+96*itemList.length))/16),dim*3/8/ceil((3+sqrt(9+96*itemList.length))/16));
                strokeWeight(dim/400);
            }
        //TURN LIVES/TIME ON/OFF
            
            //lives and time aesthetics
                fill(255);
                stroke(0);
                strokeWeight(1);
                image(getImage("space/healthheart"),mod(dim/3*livesTime+dim*23/40,dim),dim*31/40,dim/20,dim/20);
                clock(mod(dim*17/40+dim/3*livesTime,dim),dim*31/40,dim/20,floor(time/60/fr),floor(mod(time,60*fr)/fr));
                image(getImage("space/healthheart"),mod(dim/3*livesTime+dim/6,dim),dim*31/40,dim/20,dim/20);
                clock(mod(dim*5/6+dim/3*livesTime,dim),dim*31/40,dim/20,floor(time/60/fr),floor(mod(time,60*fr)/fr));
                translate(-1,0);
                stroke(127,0,127);
                fill(127,0,127);
                strokeWeight(2);
                rect(0,dim*29/40,dim/3,dim/10);
                rect(dim*2/3,dim*29/40,dim/3,dim/10);
                strokeWeight(1);
                for(i = 0; i <= dim/3+1; i+=2){
                    stroke(0,0,0,51/40*abs(i-201));
                    line(i,dim*29/40,i,dim*33/40);
                    line(dim-i+2,dim*29/40,dim-i+2,dim*33/40);
                }
                for(i = dim*29/40; i <= dim*33/40+1; i+=2){
                    stroke(0,0,0,51/40*abs(i-dim/2-1));
                    line(0,i,dim/3,i);
                    line(dim*2/3,i,dim,i);
                }
                popMatrix();pushMatrix();
                noFill();
            stroke(255);
            strokeWeight(1);
            if(itemHighlight === itemList.length+1){
                stroke(0,0,255);
                strokeWeight(dim*3/400);
            }
            rect(dim/3,dim*29/40,dim/3,dim/10);

        //DRAWING HELP
            noFill();
            stroke(0);
            strokeWeight(1);
            centerRect(dim/2,dim*15/16,dim*3/10,dim/10);
            fill(0,255,0);
            textSize(dim/10);
            text("HELP",dim/2,dim*15/16);

        //CONTINUING AND GOING BACK
            fill(255,255,0);
            noStroke();
            rect(0,dim*3/4,dim/4,dim/4);
            rect(dim*3/4,dim*3/4,dim/4,dim/4);
            translate(-1,0);
            strokeWeight(dim/350);
            for(i = 1; i <= dim/4+1; i+=2){
                stroke(0,0,0,abs(dim/8-i)*1020/dim);
                line(i,dim*3/4,i,dim);
                line(0,i+dim*3/4,dim/4,i+dim*3/4);
                stroke(0,0,0,127-abs(dim/8-i)*1020/dim);
                line(i+dim*3/4,dim*3/4,i+dim*3/4,dim);
                line(dim*3/4,i+dim*3/4,dim,i+dim*3/4);
                
            }
            popMatrix();pushMatrix();
            fill(0);
            textSize(dim/16);
            text("TITLE",dim/8,dim*7/8);
            text("STAGES",dim*7/8,dim*7/8);

        //KEYS
        if((keyDown[10] || (mouseDown && abs(mouseX-cornerX-dim*7/8) <= dim/8 && abs(mouseY - cornerY - dim*7/8) < dim/8)) && d[0] === 0 && d[1] === 0 && d[2] === 0){
            screen[0] = 2;
            screen[1] = 2;
        }
        if(keyDown[32] || keyDown[16]){
            if(itemHighlight !== 0 && itemHighlight !== itemList.length+1){
                itemsOn[itemHighlight-1] = rnd(mod(itemsOn[itemHighlight-1]+1/4,1),12);
            }
        }
        if(keyDown[8] || (mouseDown && abs(mouseX-cornerX-dim/8) <= dim/8 && abs(mouseY - cornerY - dim*7/8) < dim/8)){
            screen[0] = 0;
            screen[1] = 0;
            change = true;
        }
        if(keyDown[72] || (itemHighlight === itemList.length+1 && (keyDown[32] || keyDown[16])) || (mouseDown && abs(mouseX-cornerX-dim/2) <= dim*3/20 && abs(mouseY-cornerY-dim*15/16) < dim/16)){
            screen[0] = 0.2;
            screen[1] = 1;
        }
        if(keyDown[87] || keyDown[38]){
            if(itemHighlight !== 0 && itemHighlight !== itemList.length+1){
                if(itemHighlight > 0.5+floor((itemList.length)/ceil((3+sqrt(9+96*itemList.length))/16))){
                    itemHighlight -= floor((itemList.length+outline[1]-1+floor(2*(outline[0]+3/4)/floor((itemList.length+outline[1])/ceil((3+sqrt(9+96*itemList.length))/16))))/ceil((3+sqrt(9+96*itemList.length))/16));
                }
                else{
                    itemHighlight = 0;
                }
            }
            else{
                itemHighlight -= 1;
            }
            itemHighlight = mod(itemHighlight,2+itemList.length);
        }
        if(keyDown[83] || keyDown[40]){
            if(itemHighlight !== 0 && itemHighlight !== itemList.length+1){
                if(itemHighlight < 0.5+itemList.length-floor((itemList.length)/ceil((3+sqrt(9+96*itemList.length))/16)+1)){
                    itemHighlight += floor((itemList.length+outline[1]+floor(2*(outline[0]+3/4)/floor((itemList.length+outline[1])/ceil((3+sqrt(9+96*itemList.length))/16))))/ceil((3+sqrt(9+96*itemList.length))/16));
                }
                else{
                    itemHighlight = 1+itemList.length;
                }
            }
            else{
                itemHighlight += 1;
            }
            itemHighlight = mod(itemHighlight,2+itemList.length);
        }
        if(keys[65]){
            if(keyDown[65]){
                transition = false;
            }
            if(itemHighlight === 0 && d[0] === 0 && !transition){
                d[0] = -270/fr;
                ai[0] = 180-ai[0];
            }
            else if(itemHighlight !== 1+itemList.length && keyDown[65]){
                itemHighlight = mod(itemHighlight-1,itemList.length+2);
                transition = true;
            }
            else if(itemHighlight === 1+itemList.length && d[2] === 0 && 
            !transition){
                d[2] = -3/fr;
            }
        }
        if(keys[68]){
            if(keyDown[68]){
                transition = false;
            }
            if(itemHighlight === 0 && d[0] === 0 && !transition){
                d[0] = 270/fr;
                ai[0] = 180-ai[0];
            }
            else if(itemHighlight !== 1+itemList.length && keyDown[68]){
                itemHighlight = mod(itemHighlight+1,itemList.length+2);
                transition = true;
            }
            else if(itemHighlight === 1+itemList.length && d[2] === 0 && !transition){
                d[2] = 3/fr;
            }
        }
        if(keys[37]){
            if(keyDown[37]){
                transition = false;
            }
            if(itemHighlight === 0 && d[1] === 0 && !transition){
                d[1] = -270/fr;
                ai[1] = 180-ai[1];
            }
            else if(itemHighlight !== 1+itemList.length && keyDown[37]){
                itemHighlight = mod(itemHighlight-1,itemList.length+2);
                transition = true;
            }
            else if(itemHighlight === 1+itemList.length && d[2] === 0 && !transition){
                d[2] = -3/fr;
            }
        }
        if(keys[39]){
            if(keyDown[39]){
                transition = false;
            }
            if(itemHighlight === 0 && d[1] === 0 && !transition){
                d[1] = 270/fr;
                ai[1] = 180-ai[1];
            }
            else if(itemHighlight !== 1+itemList.length && keyDown[39]){
                itemHighlight = mod(itemHighlight+1,itemList.length+2);
                transition = true;
            }
            else if(itemHighlight === 1+itemList.length && d[2] === 0 && !transition){
                d[2] = 3/fr;
            }
        }
        if(mouse && abs(mouseX-cornerX-dim*3/16) < dim/8 && abs(mouseY-cornerY-dim/8) < dim/16 && d[0] === 0){
            d[0] = 270/fr;
            ai[0] = 180-ai[0];
        }
        if(mouse && abs(mouseX-cornerX-dim*13/16) < dim/8 && abs(mouseY-cornerY-dim/8) < dim/16 && d[1] === 0){
            d[1] = 270/fr;
            ai[1] = 180-ai[1];
        }
        if(mouse && abs(mouseX-cornerX-dim/2) < dim/6 && abs(mouseY-cornerY-dim*31/40) < dim/20 && d[2] === 0){
            if(mouseX-cornerX-dim/2 > 0){
                d[2] = -3/fr;
            }
            else{
                d[2] = 3/fr;
            }
        }
        flip[0] = mod(flip[0] + d[0],360);
        flip[1] = mod(flip[1] + d[1],360);
        livesTime = mod(livesTime+d[2],3);
        if(rnd(flip[1],12) === ai[1]){
            d[1] = 0;
        }
        if(rnd(flip[0],12) === ai[0]){
            d[0] = 0;
        }
        if(rnd(livesTime,12) === floor(rnd(livesTime,12))){
            d[2] = 0;
            livesTime = rnd(livesTime,12);
            if(livesTime !== 1){
                timeOn = true;
            }
            else{
                timeOn = false;
            }
            if(livesTime !== 2){
                livesOn = true;
            }
            else{
                livesOn = false;
            }
        }
    };

//STAGE SELECT DATA------------------------------------------
    var stageSelect = function(){
        fill(0, 0, 63);
        noStroke();
        rect(0,0,dim,dim);

        //DRAWING LIVES--------------------------------------
            if(select === 0){
                strokeWeight(1);
                stroke(0,255,0);
                fill(0, 31, 0);
                rect(dim*37/80,dim*3/80,dim*3/40,dim*3/20);
            }
            image(getImage("space/healthheart"),dim/2,dim*3/40,dim/20,dim/20);
            for(i = 0; i < maxLives; i++){
                fill(255-3/4*abs(dim/2-centerLives[i]),127-3/4*abs(dim/2-centerLives[i]),0);
                textSize(dim/20);
                text(1+mod(i-1,maxLives),centerLives[i],dim*3/20);
            }
            if(!livesOn){
                stroke(0);
                strokeWeight(1);
                translate(1,0);
                for(i = dim*3/80; i <= dim*3/16; i+=2){
                    line(-1,i,dim-1,i);
                }
                popMatrix();pushMatrix();
                fill(255, 0, 0);
                textSize(dim*5/24);
                text("X",dim/2,dim*9/80);
            }

        //DRAWING TIME------------------------------------
            hands = mod(hands+d[1]-1,3600*fr)+1;
            fill(255);
            strokeWeight(1);
            stroke(0);
            clock(dim/2,dim/4,dim*3/40,floor(hands/60/fr),floor(mod(hands,60*fr)/fr));
            noFill();
            if(select === 1){
                strokeWeight(dim*3/400);
                stroke(0, 255, 0);
            }
            ellipse(dim/2,dim/4,dim*3/40,dim*3/40);
            fill(255, 255, 255);
            rect(dim*17/40,dim*5/16,dim*3/20,dim*3/40);
            fill(0, 0, 0);
            textSize(dim/20);
            text(floor(time/600/fr)+""+floor(mod(time,600*fr)/60/fr)+":"+floor(mod(time/fr,60)/10)+""+floor(mod(time/fr,10)),dim/2,dim*7/20);
            if(!timeOn){
                stroke(0);
                strokeWeight(1);
                translate(0,-1);
                for(i = dim*337/800; i <= dim*463/800; i+=2){
                    line(i,dim*5/24+1,i,dim*313/800+1);
                }
                popMatrix();pushMatrix();
                fill(255, 0, 0);
                textSize(dim/4);
                text("X",dim/2,dim*3/10);
            }

        //DRAWING STAGES----------------------------------
            strokeWeight(1);
            k = 0;
            for(i = 0; i < ceil(sqrt(stages.length/3)); i++){
                for(j = 0; j < floor((stages.length+i)/ceil(sqrt(stages.length/3)));j++){
                    if(stages[k] === true){
                        fill(0);
                        strokeWeight(1);
                        stroke(0);
                        centerRect(dim/2-dim*13/80/ceil(sqrt(stages.length/3))*floor((stages.length+i)/ceil(sqrt(stages.length/3))-1)+dim*13/40/ceil(sqrt(stages.length/3))*j,dim/2+dim*13/80/ceil(sqrt(stages.length/3))*(2*i+1),dim*13/40/ceil(sqrt(stages.length/3)),dim*13/40/ceil(sqrt(stages.length/3)));
                        fill(63);
                        noStroke();
                        centerRect(dim/2-dim*13/80/ceil(sqrt(stages.length/3))*floor((stages.length+i)/ceil(sqrt(stages.length/3))-1)+dim*13/40/ceil(sqrt(stages.length/3))*j,dim/2+dim*13/80/ceil(sqrt(stages.length/3))*(2*i+1),dim*13/240/ceil(sqrt(stages.length/3)),dim*13/60/ceil(sqrt(stages.length/3)));
                        centerRect(dim/2-dim*13/80/ceil(sqrt(stages.length/3))*floor((stages.length+i)/ceil(sqrt(stages.length/3))-1)+dim*13/40/ceil(sqrt(stages.length/3))*j,dim/2+dim*13/80/ceil(sqrt(stages.length/3))*(2*i+1),dim*13/60/ceil(sqrt(stages.length/3)),dim*13/240/ceil(sqrt(stages.length/3)));
                        if(stage === k && select === 2){
                            textSize(dim*3/80);
                                if(!editOn){
                                    fill(0,255,0);
                                }
                                else{
                                    fill(127,0,127);
                                }
                            text("Add Stage",dim/2,dim*19/40);
                        }
                    }
                    else if(stages[k] === false){
                        fill(0);
                        strokeWeight(1);
                        stroke(0);
                        centerRect(dim/2-dim*13/80/ceil(sqrt(stages.length/3))*floor((stages.length+i)/ceil(sqrt(stages.length/3))-1)+dim*13/40/ceil(sqrt(stages.length/3))*j,dim/2+dim*13/80/ceil(sqrt(stages.length/3))*(2*i+1),dim*13/40/ceil(sqrt(stages.length/3)),dim*13/40/ceil(sqrt(stages.length/3)));
                        fill(63);
                        noStroke();
                        translate(dim/2-dim*13/80/ceil(sqrt(stages.length/3))*floor((stages.length+i)/ceil(sqrt(stages.length/3))-1)+dim*13/40/ceil(sqrt(stages.length/3))*j,dim/2+dim*13/80/ceil(sqrt(stages.length/3))*(2*i+1));
                        rotate(-45);
                        centerRect(0,0,dim*13/60/ceil(sqrt(stages.length/3)),dim*13/240/ceil(sqrt(stages.length/3)));
                        centerRect(dim*11/80/ceil(sqrt(stages.length/3)),0,dim*13/240/ceil(sqrt(stages.length/3)),dim*13/240/ceil(sqrt(stages.length/3)));
                        triangle(-dim*13/80/ceil(sqrt(stages.length/3)),0,-dim*9/80/ceil(sqrt(stages.length/3)),floor(dim*13/480/ceil(sqrt(stages.length/3))),-dim*9/80/ceil(sqrt(stages.length/3)),floor(-dim*13/480/ceil(sqrt(stages.length/3))));
                        popMatrix();pushMatrix();
                        if(stage === k && select === 2){
                            textSize(dim*3/80);
                                if(!editOn){
                                    fill(0,255,0);
                                    text("Edit Stage (SHIFT hotkey)",dim/2,dim*19/40);
                                }
                                else{
                                    fill(127,0,127);
                                    text("Select Stage (SHIFT hotkey)",dim/2,dim*19/40);
                                }
                        }
                    }
                    else if(stages[k] === "rand"){
                        fill(0);
                        strokeWeight(1);
                        stroke(0);
                        centerRect(dim/2-dim*13/80/ceil(sqrt(stages.length/3))*floor((stages.length+i)/ceil(sqrt(stages.length/3))-1)+dim*13/40/ceil(sqrt(stages.length/3))*j,dim/2+dim*13/80/ceil(sqrt(stages.length/3))*(2*i+1),dim*13/40/ceil(sqrt(stages.length/3)),dim*13/40/ceil(sqrt(stages.length/3)));
                        if(stage === k && select === 2){
                            o = floor(random(0,stageList.length-1));
                            stageDisplay(dim/2-dim*13/80/ceil(sqrt(stages.length/3))*floor((stages.length+i)/ceil(sqrt(stages.length/3))-1)+dim*13/40/ceil(sqrt(stages.length/3))*j,dim/2+dim*13/80/ceil(sqrt(stages.length/3))*(2*i+1),dim*13/40/ceil(sqrt(stages.length/3)),stageList[o],true);
                            if(stage === k && select === 2){
                                textSize(dim*3/80);
                                if(!editOn){
                                    fill(0,255,0);
                                }
                                else{
                                    fill(127,0,127);
                                }
                                text("Random",dim/2,dim*19/40);
                            }
                        }
                        else{
                            fill(63);
                            textSize(13/40*dim/ceil(sqrt(stages.length/3)));
                            text("?",dim/2-dim*13/80/ceil(sqrt(stages.length/3))*floor((stages.length+i)/ceil(sqrt(stages.length/3))-1)+dim*13/40/ceil(sqrt(stages.length/3))*j,dim/2+dim*13/80/ceil(sqrt(stages.length/3))*(2*i+1));
                        }
                    }
                    else{
                        fill(0);
                        strokeWeight(1);
                        stroke(0);
                        centerRect(dim/2-dim*13/80/ceil(sqrt(stages.length/3))*floor((stages.length+i)/ceil(sqrt(stages.length/3))-1)+dim*13/40/ceil(sqrt(stages.length/3))*j,dim/2+dim*13/80/ceil(sqrt(stages.length/3))*(2*i+1),dim*13/40/ceil(sqrt(stages.length/3)),dim*13/40/ceil(sqrt(stages.length/3)));
                        stageDisplay(dim/2-dim*13/80/ceil(sqrt(stages.length/3))*floor((stages.length+i)/ceil(sqrt(stages.length/3))-1)+dim*13/40/ceil(sqrt(stages.length/3))*j,dim/2+dim*13/80/ceil(sqrt(stages.length/3))*(2*i+1),dim*13/40/ceil(sqrt(stages.length/3)),stages[k],true);
                        if(stage === k && select === 2){
                            textSize(dim*3/80);
                            if(!editOn){
                                fill(0,255,0);
                            }
                            else{
                                fill(127,0,127);
                            }
                            text(stages[k][50],dim/2,dim*19/40);
                        }
                    }
                    if(mouseDown && abs(mouseX-cornerX-dim/2+dim*13/80/ceil(sqrt(stages.length/3))*floor((stages.length+i)/ceil(sqrt(stages.length/3))-1)-dim*13/40/ceil(sqrt(stages.length/3))*j) < dim*13/80/ceil(sqrt(stages.length/3)) && abs(mouseY-cornerY-dim/2-dim*13/80/ceil(sqrt(stages.length/3))*(2*i+1)) < dim*13/80/ceil(sqrt(stages.length/3))){
                        stage = k;
                        select = 2;
                        if(stages[stage] === true){
                            l = true;
                        }
                        else if(stages[stage] === false){
                            l = false;
                        }
                    }
                    if(stage === k){
                        outline[0] = i;
                        outline[1] = j;
                    }
                    k+=1;
                }
            }
            if(l === true){
                screen[0] = -1;
                screen[1] = 4;
                stages[stages.length-3] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,"Stage"+(stages.length-2),"1"];
                stages[stages.length-2] = "rand";
                stages[stages.length-1] = true;
                stages[stages.length] = false;
                stage = stages.length-4;
                stageList[stageList.length] = stages[stageList.length-4];
            }
            else if(l === false){
                editOn = !editOn;
            }
            if(select === 2){
                noFill();
                noStroke();
                if(!editOn){
                    stroke(0,255,0);
                }
                else{
                    if(mod(frameCount,2) === 1){
                        stroke(127,0,127);
                    }
                }
                strokeWeight(1);
                centerRect(dim/2-dim*13/80/ceil(sqrt(stages.length/3))*floor((stages.length+outline[0])/ceil(sqrt(stages.length/3))-1)+dim*13/40/ceil(sqrt(stages.length/3))*outline[1],dim/2+dim*13/80/ceil(sqrt(stages.length/3))*(2*outline[0]+1),dim*13/40/ceil(sqrt(stages.length/3)),dim*13/40/ceil(sqrt(stages.length/3)));
            }

        //DRAWING HELP
            fill(0, 255, 0);
            strokeWeight(1);
            textSize(dim/20);
            text("H   Help",dim/2,dim*15/16);
            noFill();
            stroke(0, 255, 0);
            rect(dim*311/800,dim*9/10,dim*3/40,dim*3/40);

        //GO BACK AND CONTINUE Visuals
            fill(127, 127, 31);
            noStroke();
            rect(0,dim*9/10,dim/4,dim/10);
            if(select === 2){
                fill(0, 63, 0);
                rect(dim*3/4,dim*9/10,dim/4,dim/10);
            }
            fill(0);
            text("ITEMS",dim/8,dim*19/20);
            if (select === 2){
                if(editOn){
                    text("EDIT",dim*7/8,dim*19/20);
                }
                else{
                text("NEXT",dim*7/8,dim*19/20);
                }
            }

        //KEYS-------------------------------------------
            if((keys[39] || keys[68]) && !(keys[37] || keys[65])){
                if(select === 0 && d[0] === 0){
                    d[0] = 30/fr;
                    lives = mod(lives, maxLives)+1;
                }
                if(select === 1 && hands === time){
                    d[1] = 30;
                    time = mod(time+15*fr-1,3600*fr)+1;
                    spinCount += 1;
                    if(spinCount > 4){
                        d[1] = 360;
                        time = mod(time+45*fr-1,3600*fr)+1;
                    }
                }
                if((keyDown[39] || keyDown[68]) && select === 2){
                    stage = mod(stage+1,stages.length);
                }
            }
            if((keys[37] || keys[65]) && !(keys[39] || keys[68])){
                if(select === 0 && d[0] === 0){
                    d[0] = -30/fr;
                    lives = mod(lives - 2, maxLives)+1;
                }
                if(select === 1 && hands === time){
                    d[1] = -30;
                    time = mod(time-15*fr-1,3600*fr)+1;
                    spinCount += 1;
                    if(spinCount > 4){
                        d[1] = -360;
                        time = mod(time-45*fr-1,3600*fr)+1;
                    }
                }
                if((keyDown[37] || keyDown[65]) && select === 2){
                    stage = mod(stage-1,stages.length);
                }
            }
            if(keyDown[87] || keyDown[38]){
                if(select !== 2 || stage < floor(stages.length/ceil(sqrt(stages.length/3)))){
                    select = mod(select-1,3);
                }
                else if((1+outline[1])/floor((stages.length+outline[0])/ceil(sqrt(stages.length/3))) > 1/2){
                    stage -= floor((stages.length+outline[0])/ceil(sqrt(stages.length/3)));
                }
                else{
                    stage -= floor((stages.length+outline[0]-1)/ceil(sqrt(stages.length/3)));
                }
            }
            if(keyDown[83] || keyDown[40]){
                if(select !== 2 || stage >= stages.length - floor((stages.length-1+ceil(sqrt(stages.length/3)))/ceil(sqrt(stages.length/3)))){
                    select = mod(select+1,3);
                }
                else if((1+outline[1])/floor((stages.length+outline[0])/ceil(sqrt(stages.length/3))) < 1/2){
                    stage += floor((stages.length+outline[0])/ceil(sqrt(stages.length/3)));
                }
                else{
                    stage += floor((stages.length+outline[0]+1)/ceil(sqrt(stages.length/3)));
                }
            }
        //MOUSE
            if(mouseDown){
                //clicking on help
                if(mouseY > cornerX+dim*9/10 &&  abs(mouseX-cornerX-dim*39/80) <= dim/10){
                    screen[0] = 0.3;
                    screen[1] = 2;
                    change = true;
                }
                //clicking on a life
                if(abs(mouseY-cornerY-dim*3/20) < dim*3/80 && d[0] === 0 && abs(mouseX-cornerX-dim/2) < dim/2-mod(dim/2,dim*11/80)+dim*11/160){
                    if(mouseX < cornerX+dim/2){
                        d[0] = -1;
                    }
                    else{
                        d[0] = 1;
                    }
                    lives = mod(lives+floor((mouseX-cornerX-mod(dim/2,dim*11/80)+dim*11/160)/dim/11*80)-4,maxLives)+1;
                    if(mod(floor((mouseX-cornerX-mod(dim/2,dim*11/80)+dim*11/160)/dim/11*80)-3,maxLives) === 0){
                        select = 0;
                    }
                }
                //clicking on title
                if(abs(mouseX-cornerX-dim/8) < dim/8 && abs(mouseY-cornerY-dim*19/20) < dim/20){
                    screen[0] = 0;
                    screen[1] = 1;
                    change = true;
                }
                //clicking to continue
                if(abs(mouseX-cornerX-dim*7/8) < dim/8 && abs(mouseY-cornerY-dim*19/20) < dim/20 && select === 2 && d[0] === 0 && d[1] === 0){
                    if(stages[stage] !== true && stages[stage] !== false){
                        if(editOn){
                            screen[0] = -1;
                            screen[1] = 4;
                        }
                        else{
                        screen[0] = 3;
                        screen[1] = 3;
                        d[0] = -1;
                        d[1] = -1;
                        }
                    }
                    else if(stages[stage] === true){
                        screen[0] = -1;
                        screen[1] = 4;
                        stages[stages.length-3] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,"Stage"+(stages.length-2),"1"];
                        stages[stages.length-2] = "rand";
                        stages[stages.length-1] = true;
                        stages[stages.length] = false;
                        stage = stages.length-4;
                        stageList[stageList.length] = stages[stageList.length-4];
                    }
                    else if(stages[stage] === false){
                        editOn = !editOn;
                    }
                }
            }
            //clicking on the timer
            if(mouse){
                if(abs(mouseX-cornerX-dim/2) <= dim*3/40 && abs(mouseY-cornerY-dim*7/20) <= dim*3/80){
                    select = 1;
                }
                if(dist(mouseX,mouseY,cornerX+dim/2,cornerY+dim/4) <= dim*3/80 && abs(time/10/fr - mod(90-atan2(cornerY+dim/4-mouseY,mouseX-cornerX-dim/2),360)) >= 6){
                    if(xor(abs(time/10/fr - mod(90-atan2(cornerY+dim/4-mouseY,mouseX-cornerX-dim/2),360)) <= 180,mod(90-atan2(cornerY+dim/4-mouseY,mouseX-cornerX-dim/2),360) < time/10/fr)){
                        time = mod(time+15*fr-1,3600*fr)+1;
                        d[1] = 15*fr;
                    }
                    else{
                        time = mod(time-15*fr-1,3600*fr)+1;
                        d[1] = -15*fr; 
                    }
                }
            }
            if(keyDown[72]){
                screen[0] = 0.5;
                screen[1] = 3;
                change = true;
            }
            if(keyDown[8]){
                screen[0] = 0;
                screen[1] = 1;
                change = true;
            }

            //STOPPING MOVEMENT------------------------------
                if(rnd(centerLives[mod(lives,maxLives)],12) === rnd(dim/2,12) && screen[0] === 2){
                    d[0] = 0;
                    centerLives[mod(lives,maxLives)] = dim/2;
                }
                if(hands === time && screen[0] === 2){
                    d[1] = 0;
                    spinCount = 0;
                }
                for(i = 0; i < maxLives; i++){
                    centerLives[i] = mod(centerLives[i] - dim*11/640*d[0]+maxLives*dim*11/160,maxLives*dim*11/80 )-maxLives*dim*11/160;
                }

        //OUTLINE--------------------------------------------
        noFill();
        stroke(255,255,0);
        strokeWeight(dim*3/200);
        rect(dim*3/400,dim*3/400,dim*197/200,dim*197/200);

        //TRANSITIONING TO THE NEXT SCREEN-------------------
        if(keyDown[10] || keyDown[32] && select === 2 && d[0] === 0 && d[1] === 0){
            if(stages[stage] !== true && stages[stage] !== false){
                if(editOn){
                    screen[0] = -1;
                    screen[1] = 4;
                }
                else{
                    screen[0] = 3;
                    d = [-1,-1,0];
                }
            }
            else if(stages[stage] === true){
                screen[0] = -1;
                screen[1] = 4;
                stages[stages.length-3] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,"Stage"+(stages.length-2),"1"];
                stages[stages.length-2] = "rand";
                stages[stages.length-1] = true;
                stages[stages.length] = false;
                stage = stages.length-4;
                stageList[stageList.length] = stages[stageList.length-4];
            }
            else if(stages[stage] === false){
                editOn = !editOn;
            }
        }
        if(keyDown[16]){
            editOn = !editOn;
        }
    };

//STAGE BUILDER DATA-----------------------------------------
    var stageBuilder = function(){
        fill(0);
        strokeWeight(0);
        rect(0,0,dim,dim);
        stageDisplay(dim/2,dim/2,dim,stages[stage],false);
        fill(255, 0, 0);
        noStroke();
        rect(0,dim*3/4+1,dim/4,dim/4);
        fill(255);
        textSize(dim/16);
        text("DELETE\nSTAGE",dim/8,dim*7/8);
        fill(0,127,0);
        rect(dim*3/4+1,dim*3/4+1,dim/4,dim/4);
        fill(255);
        text("SAVE\nAND\nEXIT",dim*7/8,dim*7/8);
        fill(0, 63, 255);
        rect(dim/20,dim/20,dim*3/20,dim*3/20);
        fill(255);
        text("H\nHelp",dim/8,dim/8);
        fill(63,0,127);
        centerRect(dim*7/8,dim/8,dim/5,dim/5);
        fill(255);
        text("Get\nStage\nCode",dim*7/8,dim/8);
        fill(255,255,0);
        centerRect(dim/2,dim*3/16,dim/2,dim/12);
        fill(0);
        text("Gravity: ",dim*3/8,dim*3/16);
        fill(255);
        stroke(0);
        strokeWeight(1);
        centerRect(dim*49/80,dim*3/16,dim/4,dim/16);
        textSize(4);
        textSize(min(dim*3/40,floor(dim*19/20/textWidth(stages[stage][51]))));
        fill(0);
        text(stages[stage][51],dim*49/80,dim*3/16);

            //save and exit highlight
        n = 0;
        for(i = 0; i < 50; i++){
            if(stages[stage][i] === 5){
                n+=1;
            }
        }
        if(n !== 2){
            fill(0,0,0,191);
            rect(dim*3/4+1,dim*3/4+1,dim/4,dim/4);
        }
        noFill();
            //drawing green and purple squares
        if(mouseX > cornerX && mouseX < cornerX+dim && mouseY > cornerY+dim/4 && mouseY < cornerY+dim*3/4 && mouseIn && deleteRectSize === 0){
            strokeWeight(1);
            stroke(127,0,127);
            rect(floor(dim/10*floor(mouseX*10/dim)),dim/4+dim/10*floor((mouseY-dim/4)*10/dim),dim/10,dim/10);
        }
        if(blockSelect >= 0 && editSelectedArea === 1 && deleteRectSize === 0){
            stroke(0,255,0);
            strokeWeight(1);
            rect(dim/10*mod(blockSelect,10),dim/4+dim/10*floor(blockSelect/10),dim/10,dim/10);
        }
            //drawing block list
        if(editSelectedArea === 1){
            for(l = 48; l <= 57; l++){
                if(keyDown[l] && !keys[16]){
                    blockTypeSelect = constrain(l-49,0,blocks.length-1);
                }
                else if(keyDown[l] && keys[16]){
                    stringInput = stringInput+String(l-48);
                }
            }
            if(keyDown[8] && keys[16]){
                stringInput = stringInput.substring(0,stringInput.length-1);
            }
            if(keyUp[16]){
                blockTypeSelect = constrain(Number(stringInput-1),0,blocks.length-1);
                stringInput = "";
            }
            if(keys[16]){
                textSize(30);
                fill(0);
                text(stringInput,dim/2,dim*7/10);
            }
        }
        k = 0;
        strokeWeight(1);
        iMax = ceil(sqrt(blocks.length/4));
        for(i = 0; i < iMax; i++){
            jMax = floor((blocks.length+i)/ceil(sqrt(blocks.length/4)));
            for(j = 0; j < jMax; j++){
                fill(191,127,31);
                noStroke();
                centerRect(dim/2-dim/16/iMax*(jMax-1-2*j)+1,dim*3/4+dim/16/iMax*(4*i+3),dim/12/iMax,dim/12/iMax);
                fill(127);
                blocks[k](dim/2-dim/16/iMax*(jMax-1-2*j)+1,dim*3/4+dim/16/iMax*(4*i+3),dim/12/iMax);
                stroke(255);
                noFill();
                rect(dim/2+dim/16/iMax*(2*j-jMax),dim*3/4+dim/4/iMax*i,dim/8/iMax,dim/4/iMax);
                fill(255);
                textSize(dim/16/iMax/String(k+1).length);
                text(k+1,dim/2-dim/16/iMax*(jMax-1)+dim/8/iMax*j,dim*3/4+dim/4/iMax*i+dim/16/iMax);
                if(mouseDown && abs(mouseX-cornerX-dim/2+dim/16/iMax*(jMax-1)-dim/8/iMax*j) < dim/16/iMax && abs(mouseY-cornerY-dim*3/4-dim/8/iMax*(2*i+1)) < dim/8/iMax){
                    blockTypeSelect = k;
                    editSelectedArea = 1;
                }
                if(blockTypeSelect === k){
                    selectedX = j;
                    selectedY = i;
                }
                k+=1;
            }
        }
        iMax = ceil(sqrt(blocks.length/4));
        jMax = floor((blocks.length+selectedY)/ceil(sqrt(blocks.length/4)));
        if(blockTypeSelect >= 0){
            stroke(0,255,0);
            strokeWeight(2);
            noFill();
            rect(dim/2-dim/16/iMax*jMax+dim/8/iMax*selectedX,dim*3/4+dim/4/iMax*selectedY,dim/8/iMax,dim/4/iMax);
        }

            //drawing name
        fill(255);
        noStroke();
        rect(dim/4,dim/40,dim/2,dim*3/40);
        fill(0);
        textSize(2);
        textSize(min(dim*3/40,floor(dim*19/20/textWidth(stages[stage][50]))));
        text(stages[stage][50],dim/2,dim/16);
        if(editSelectedArea === 2 && (mod(frameCount,30) < 15 || stringCountChange > 0)){
            stroke(0);
            strokeWeight(1);
            line(dim/2-textWidth(stages[stage][50])/2+textWidth(stages[stage][50].substring(0,stringCount)),dim/32,dim/2-textWidth(stages[stage][50])/2+textWidth(stages[stage][50].substring(0,stringCount)),dim*3/32);
        }

            //modifying gravity
        if(editSelectedArea === 3 && (mod(frameCount,30) < 15 || stringCountChange > 0)){
            stroke(0);
            strokeWeight(1);
            textSize(4);
            textSize(min(dim*3/40,floor(dim*19/20/textWidth(stages[stage][51]))));
            line(dim*49/80-textWidth(stages[stage][51])/2+textWidth(stages[stage][51].substring(0,stringCount)),dim*5/32,dim*49/80-textWidth(stages[stage][51])/2+textWidth(stages[stage][51].substring(0,stringCount)),dim*7/32);
        }

        //CLICKING AND KEYS
        if((mouseDown && abs(mouseX-dim*7/8-cornerX) <= dim/8 && abs(mouseY-cornerY-dim*7/8) <= dim/8) && n === 2 && deleteRectSize === 0){
            screen[0] = 2;
            screen[1] = 2;
            stringCountChange = 0;
            if(stages[stage][51].length === 0){
                stages[stage][51] = "1";
            }
            editSelectedArea = 1;
        }
        if((keyDown[10] || keyDown[32])){
            if(editSelectedArea === 1){
                if(blockSelect >= 0){
                    stages[stage][blockSelect] = blockTypeSelect;
                }
            }
            if(editSelectedArea === 2 && keyDown[10]){
                editSelectedArea = 1;
            }
            if(editSelectedArea === 2 && keyDown[32]){
                stages[stage][50] = stages[stage][50].substring(0,stringCount)+" "+stages[stage][50].substring(stringCount,stages[stage][50].length);
                stringCount++;
            }
            if(editSelectedArea === 3){
                editSelectedArea = 1;
                if(stages[stage][51].length === 0){
                    stages[stage][51] = "1";
                }
            }
        }
        if(mouseDown && abs(mouseX-cornerX-dim/2) < dim/2 && abs(mouseY-cornerY-dim/2) < dim/4 && deleteRectSize === 0){
            blockSelect = floor((mouseY-cornerY-dim/4)*10/dim)*10+floor((mouseX-cornerX)*10/dim);
            if(editSelectedArea === 1){
                stages[stage][blockSelect] = blockTypeSelect;
            }
            editSelectedArea = 1;
            if(stages[stage][51].length === 0){
                stages[stage][51] = "1";
            }
        }
        //text clicking
        if(mouseDown && abs(mouseX-cornerX-dim/2) < dim/4 && abs(mouseY-cornerY-dim/16) < dim*3/80){
            editSelectedArea = 2;
            stringCount = 0;
            for(i = 0; i <= stages[stage][50].length; i++){
                if(abs(mouseX-cornerX-dim/2+textWidth(stages[stage][50])/2-textWidth(stages[stage][50].substring(0,stringCount))) > abs(mouseX-cornerX-dim/2+textWidth(stages[stage][50])/2-textWidth(stages[stage][50].substring(0,i)))){
                    stringCount = i;
                }
            }
            if(stages[stage][51].length === 0){
                stages[stage][51] = "1";
            }
        }
        //stage builder help
        if((mouseDown && abs(mouseX-cornerX-dim/8) < dim*3/40 && abs(mouseY-cornerY-dim/8) < dim*3/40) || (keyDown[72] && editSelectedArea !== 2 && !keys[16])){
            screen[0] = 0.4;
            screen[1] = -1;
        }
        //stage code
        if(mouseDown && abs(mouseX-cornerX-dim*7/8) < dim/10 && abs(mouseY-cornerY-dim/8) < dim/10){
            println("["+stages[stage]+"]");
        }
        //gravity box
        if(mouseDown && abs(mouseX-cornerX-dim*49/80) < dim/8 && abs(mouseY-cornerY-dim*3/16) < dim/32){
            editSelectedArea = 3;
            stringCount = 0;
            stringCountChange = fr/2;
            for(i = 0; i <= String(stages[stage][51]).length; i++){
                if(abs(mouseX-cornerX-dim*49/80+textWidth(String(stages[stage][51]))/2-textWidth(String(stages[stage][51]).substring(0,stringCount))) > abs(mouseX-cornerX-dim*49/80+textWidth(String(stages[stage][51]))/2-textWidth(String(stages[stage][51]).substring(0,i)))){
                    stringCount = i;
                }
            }
        }
        //deleting stage
        if(mouseDown && abs(mouseX-cornerX-dim/8) < dim/8 && abs(mouseY-cornerY-dim*7/8) < dim/8 && deleteRectSize === 0){
            deleteRectSize = 1;
        }
        if(deleteRectSize > 0){
            deleteRect(deleteRectSize);
        }
        if(deleteRectSize > 0){
            deleteRectSize = min(deleteRectSize+dim/20,dim/2);
            editSelectedArea = 1;
        }
        if(deleteRectSize === dim/2 && mouseDown){
            if(abs(mouseX-cornerX-dim/4) < dim/8 && abs(mouseY-cornerY-dim*13/20) < dim/8){
                deleteRectSize = 0;
            }
            if(abs(mouseX-cornerX-dim*3/4) < dim/8 && abs(mouseY-cornerY-dim*13/20) < dim/8){
                stages.splice(stage,1);
                deleteRectSize = 0;
                stageList = [];
                for(i = 0; i < stages.length; i++){
                    if(stages[i] !== true && stages[i] !== false && stages[i] !== "rand"){
                        stageList[stageList.length] = stages[i];
                    }
                }
                if(stageList.length > 0){
                    screen[0] = 2;
                    screen[1] = 2;
                }
                else{
                    stages[stages.length-3] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,"Stage"+(stages.length-2),"1"];
                    stages[stages.length-2] = "rand";
                    stages[stages.length-1] = true;
                    stages[stages.length] = false;
                    stage = stages.length-4;
                    stageList[stageList.length] = stages[stageList.length-4];
                }
            }
        }
        //editing words
        if(editSelectedArea === 2 && deleteRectSize === 0){
            for(i = 48; i <= 57 ; i++){
                if(keyDown[i]){
                    stages[stage][50] = stages[stage][50].substring(0,stringCount)+keyList[i].toString()+stages[stage][50].substring(stringCount,stages[stage][50].length);
                    stringCount+=1;
                }
            }
            for(i = 65; i <= 90 ; i++){
                if(keyDown[i]){
                    stages[stage][50] = stages[stage][50].substring(0,stringCount)+keyList[i].toString()+stages[stage][50].substring(stringCount,stages[stage][50].length);
                    stringCount+=1;
                }
            }
            for(i = 187; i <= 192; i++){
                if(keyDown[i]){
                    stages[stage][50] = stages[stage][50].substring(0,stringCount)+keyList[i].toString()+stages[stage][50].substring(stringCount,stages[stage][50].length);
                    stringCount+=1;
                }
            }
            for(i = 219; i <= 222; i++){
                if(keyDown[i]){
                    stages[stage][50] = stages[stage][50].substring(0,stringCount)+keyList[i].toString()+stages[stage][50].substring(stringCount,stages[stage][50].length);
                    stringCount+=1;
                }
            }
            if(keyDown[8]){
                stages[stage][50] = stages[stage][50].substring(0,stringCount-1)+stages[stage][50].substring(stringCount,stages[stage][50].length);
                stringCount-=1;
            }
            stages[stage][50] = stages[stage][50].substring(0,20);
            stringCount = constrain(stringCount,0,20);
        }
        //editing gravity
        if(editSelectedArea === 3 && deleteRectSize === 0){
            for(i = 48; i <= 57 ; i++){
                if(keyDown[i]){
                    stages[stage][51] = stages[stage][51].substring(0,stringCount)+keyList[i].toString()+stages[stage][51].substring(stringCount,stages[stage][51].length);
                    stringCount+=1;
                    stringCountChange = fr/2;
                }
            }
            if(keyDown[8]){
                stages[stage][51] = stages[stage][51].substring(0,stringCount-1)+stages[stage][51].substring(stringCount,stages[stage][51].length);
                stringCount-=1;
                stringCountChange = fr/2;
            }
            if(keyDown[190]){
                j = true;
                for(i = 0; i <= stages[stage][51].length; i++){
                    if(String(stages[stage][51]).substring(i,i+1) === "."){
                        j = false;
                    }
                }
                if(j){
                    stages[stage][51] = stages[stage][51].substring(0,stringCount)+"."+stages[stage][51].substring(stringCount,stages[stage][51].length);
                    stringCount+=1;
                    if(stringCount === 1){
                        stages[stage][51] = "0"+stages[stage][51];
                        stringCount+=1;
                    }
                }
            }
            stages[stage][51] = stages[stage][51].substring(0,15);
            stringCount = constrain(stringCount,0,15);
        }
        //key functions
        if(keyDown[65] || keyDown[37] && deleteRectSize === 0){
            if(editSelectedArea === 1){
                if(!keys[16]){
                    blockSelect = mod(blockSelect - 1,50);
                }
            }
            if(editSelectedArea === 2 && keyDown[37]){
                stringCount = constrain(stringCount - 1,0,stages[stage][50].length);
                stringCountChange = fr/2;
            }
            if(editSelectedArea === 3 && keyDown[37]){
                stringCount = constrain(stringCount - 1,0,stages[stage][51].length);
                stringCountChange = fr/2;
            }
        }
        if(keyDown[68] || keyDown[39] && deleteRectSize === 0){
            if(editSelectedArea === 1){
                if(!keys[16]){
                    blockSelect = mod(blockSelect + 1,50);
                }
            }
            if(editSelectedArea === 2 && keyDown[39]){
                stringCount = constrain(stringCount + 1,0,stages[stage][50].length);
                stringCountChange = fr/2;
            }
            if(editSelectedArea === 3 && keyDown[39]){
                stringCount = constrain(stringCount + 1,0,stages[stage][51].length);
                stringCountChange = fr/2;
            }
        }
        if(keyDown[38] || keyDown[87] && deleteRectSize === 0){
            if(editSelectedArea === 1){
                if(!keys[16]){
                    blockSelect = mod(blockSelect - 10,50);
                }
            }
            if(editSelectedArea === 2 && keyDown[38]){
                stringCount = 0;
                stringCountChange = fr/2;
            }
            if(editSelectedArea === 3 && keyDown[38]){
                stringCount = 0;
                stringCountChange = fr/2;
            }
        }
        if(keyDown[40] || keyDown[83] && deleteRectSize === 0){
            if(editSelectedArea === 1){
                if(!keys[16]){
                    blockSelect = mod(blockSelect + 10,50);
                }
            }
            if(editSelectedArea === 2 && keyDown[40]){
                stringCount = stages[stage][50].length;
                stringCountChange = fr/2;
            }
            if(editSelectedArea === 3 && keyDown[40]){
                stringCount = stages[stage][51].length;
                stringCountChange = fr/2;
            }
        }
        stringCountChange-=1;
    };

//CHACACTER SELECT DATA--------------------------------------
    var characterSelect = function(){
        //changing to battle screen
        if((ready[0] === 1 && ready[1] === 1) || load === 1){
            screen[0] = 4;
            screen[1] = 4;
            while(stages[stage] === "rand" || stages[stage] === true || stages[stage] === false){
                stage = floor(random(0,stages.length));
            }
            for(i = 0; i < 2; i++){
                while(p[i].c === sprites[i].length-1){
                    p[i].c = floor(random(0,sprites[i].length));
                    if(p[i].c === 0){
                        p[i].c = floor(10*random(0,(alts.length)/10))/10;
                        sprites[i][0] = alts[round(10*p[i].c)];
                    }
                    p[i].rand = true;
                }
                p[i].lives = lives;
                p[i].damage = 0;
            }
            spawn = floor(2*random());
            for(i = 0; i < stages[stage].length-2; i++){
                if(stages[stage][i] === 5){
                    p[spawn].x = mod(i,10)*40-180;
                    p[spawn].y = floor(i/10)*40-80;
                    spawn = mod(spawn+1,2);
                }
            }
            barrierLines();
            translate(dim/2,dim/2);
            pushMatrix();
            translate(-dim/2,-dim/2);
        }
        fill(0, 63, 0);
        noStroke();
        rect(0,0,dim,dim);

            //KEY INPUTS-------------------------------------

                p[0].c = round(10*p[0].c)/10;
                p[1].c = round(10*p[1].c)/10;
                //P1 CHARACTER SELECT INPUTS----------------------------------
                    if (keys[87] && ready[0] !== 1 && d[0] === 0){
                        d[0] = -1;
                        p[0].c = mod(p[0].c+1,sprites[0].length);
                    }
                    if (keys[83] && ready[0] !== 1 && d[0] === 0){
                        d[0] = 1;
                        p[0].c = mod(p[0].c-1,sprites[1].length);
                    }
                    if((keyDown[65]) && floor(p[0].c) === 0 && d[0] === 0 && ready[0] !== 1){
                        p[0].c = mod(p[0].c-0.1,alts.length/10);
                        sprites[0][0] = alts[round(10*p[0].c)];
                        names[0][0] = altnames[round(10*p[0].c)];
                    }
                    if(keyDown[68] && floor(p[0].c) === 0 && d[0] === 0 && ready[0] !== 1){
                        p[0].c = mod(round(10*p[0].c)/10+0.1,alts.length/10);
                        sprites[0][0] = alts[round(10*p[0].c)];
                        names[0][0] = altnames[round(10*p[0].c)];
                    }
                    if(keyDown[90]){
                        ready[0] = 1-ready[0];
                    }
    
                //P2 CHARACTER SELECT INPUTS----------------------------------
                    if (keys[38] && ready[1] !== 1 && d[1] === 0){
                        d[1] = -1;
                        p[1].c = mod(p[1].c+1,sprites[1].length);
                    }
                    if (keys[40] && ready[1] !== 1 && d[1] === 0){
                        d[1] = 1;
                        p[1].c = mod(p[1].c-1,sprites[1].length);
                    }
                    if (keyDown[37] && floor(p[1].c) === 0 && d[1] === 0 && ready[1] !== 1){
                        p[1].c = mod(p[1].c-0.1,alts.length/10);
                        sprites[1][0] = alts[round(10*p[1].c)];
                        names[1][0] = altnames[round(10*p[1].c)];
                    }
                    if (keyDown[39] && floor(p[1].c) === 0 && d[1] === 0 && ready[1] !== 1){
                        p[1].c = mod(p[1].c+0.1,alts.length/10);
                        sprites[1][0] = alts[round(10*p[1].c)];
                        names[1][0] = altnames[round(10*p[1].c)];
                    }
                    if(keyDown[77]){
                        ready[1] = 1-ready[1];
                    }
                    p[0].c = round(10*p[0].c)/10;
                    p[1].c = round(10*p[1].c)/10;
    
                //GLOBAL KEYS--------------------------------
                    if(keyDown[72] && d[0] === 0 && d[1] === 0){
                        screen[0] = 0.5;
                        screen[1] = 3;
                        change = true;
                    }
                    if(keyDown[8] && d[0] === 0 && d[1] === 0){
                        screen[0] = 2;
                        screen[1] = 2;
                    }
                    //clicking on stuff
                    if(mouseDown){
                        //help
                        if(abs(mouseX-cornerX-dim/2) < dim*21/160 && abs(mouseY-cornerY-dim*15/16) < dim*3/80){
                            screen[0] = 0.5;
                            screen[1] = 3;
                            change = true;
                        }
                        //stages
                        if(abs(mouseX-cornerX-dim/2) <= dim/5 && abs(mouseY-cornerY-dim*3/80) <= dim*3/80){
                            screen[0] = 2;
                            screen[1] = 2;
                        }
                        //characters
                        if(abs(mouseX - cornerX - dim*3/20) < dim*3/40 && abs(mouseY-cornerY-dim/2) < dim/2 && d[0] === 0 && ready[0] === 0){
                            p[0].c = mod(round(p[0].c+(mouseY-cornerY-dim/2)*sprites[0].length/dim),sprites[0].length);
                            if(mouseY-cornerY-dim/2 < 0){
                                d[0] = 1;
                            }
                            else{
                                d[0] = -1;
                            }
                        }
                        if(abs(mouseX - cornerX - dim*17/20) < dim*3/40 && abs(mouseY-cornerY-dim/2) < dim/2 && d[1] === 0 && ready[1] === 0){
                            p[1].c = mod(round(p[1].c+(mouseY-cornerY-dim/2)*sprites[1].length/dim),sprites[1].length);
                            if(mouseY-cornerY-dim/2 < 0){
                                d[1] = 1;
                            }
                            else{
                                d[1] = -1;
                            }
                        }
                        //clicking on alts arrows
                        for(i = 0; i < 2; i ++){
                            if(floor(p[i].c) === 0 && mouseDown && abs(mouseX - cornerX-dim/20-dim*7/10*i) < dim/40 && abs(mouseY-cornerY-dim/2) < dim/20){
                                p[i].c = mod(p[i].c-0.1,alts.length/10);
                                sprites[i][0] = alts[round(10*p[i].c)];
                                names[i][0] = altnames[round(10*p[i].c)];
                            }
                            if(floor(p[i].c) === 0 && mouseDown && abs(mouseX - cornerX-dim/4-dim*7/10*i) < dim/40 && abs(mouseY-cornerY-dim/2) < dim/20){
                                p[i].c = mod(p[i].c+0.1,alts.length/10);
                                sprites[i][0] = alts[round(10*p[i].c)];
                                names[i][0] = altnames[round(10*p[i].c)];
                            }
                        }
                    }
                    //clicking begin to continue
                    fill(0);
                    if(mouse && abs(mouseX-cornerX-dim/2) < dim/5 && abs(mouseY-cornerY-dim*53/80) < dim/20){
                        load += 0.01;
                        load = min(load,1);
                    }
                    else{
                        load = 0;
                    }
    
            //MOVING CHARACTERS UP OR DOWN-------------------
                for(j = 0; j<2;j++){
                    if(rnd(options[j][floor(p[j].c)].y,12) !== rnd(dim/2,12)){
                        for(i=0; i<options[j].length;i++){
                            options[j][i].y += dim/50*d[j];
                            options[j][i].y = mod(options[j][i].y,dim+dim/2/sprites[1].length);
                        }
                    }
                    else{
                        d[j] = 0;
                        options[j][floor(p[j].c).y] = dim/2;
                    }
                }
                
    
            //CHARACTER SELECT AESTHETICS--------------------
    
                //DISPLAYING RECTANGLES----------------------
                    fill(0, 63, 127);
                    rect(0,0,dim*3/10,dim);
                    fill(127,0,127);
                    rect(dim*7/10,0,dim*3/10,dim);
                    fill(0,0,255);
                    rect(0,dim*3/8,dim/2,dim/5);
                    fill(255,0,0);
                    rect(dim/2,dim*3/8,dim/2,dim/5);
                    fill(191,95,0);
                    rect(dim*3/10,0,dim*2/5,dim*3/8);
                    fill(255,255,0);
                    noStroke();
                    rect(dim*3/10,0,dim*2/5,dim*3/40);
                    fill(255, 255, 0);
                    rect(dim*3/10,0,dim*2/5,dim*3/40);
                
                //DISPLAYING NAME----------------------------
                    fill(0,0,0);
                    textSize(dim/10);
                    text("Pseudo",dim/2,dim/8);
                    text("Khan",dim/2,dim*17/80);
                    textSize(dim/8);
                    text("BROS",dim/2,dim*5/16);

                //DISPLAYING VS------------------------------
                    textSize(dim*9/40);
                    fill(255, 0, 0);
                    text("V",dim*3/8,dim*19/40);
                    fill(0, 0, 255);
                    text("S",dim*5/8,dim*19/40);
        
                //DISPLAYING SPRITES-------------------------
                    for(i = 0; i<2; i++){
                        for(j = 0; j<sprites[i].length; j++){
                            visuals[i][j] = image(sprites[i][j],options[i][j].x,options[i][j].y,(dim*5/4-abs(options[i][j].y-dim/2))/(2*sprites[i].length),(dim*5/4-abs(options[i][j].y-dim/2))/(2*sprites[i].length));
                        }
                    }

                //CHARACTER NAME AND SWAP ARROWS-------------
                    fill(0);
                    textSize(dim*3/80);
                    for(i=0;i<2;i++){
                        if(d[i] === 0){
                            fill(255-255*i, 127+128*i, 0);
                            text(names[i][floor(p[i].c)],dim*3/20+dim*7/10*i,dim*13/32);
                            if(floor(p[i].c) === 0){
                                fill(0);
                                triangle(dim*3/40+dim*7/10*i,dim*9/20,dim*3/40+dim*7/10*i,dim*11/20,dim/40+dim*7/10*i,dim/2);
                                triangle(dim*9/40+dim*7/10*i,dim*9/20,dim*9/40+dim*7/10*i,dim*11/20,dim*11/40+dim*7/10*i,dim/2);
                            }
                        }
                    }
    
                //CONTINUE TEXT------------------------------
                    fill(255, 255, 255);
                    textSize(dim/8);
                    noStroke();
                    text("BEGIN",dim/2,dim*53/80);
                    for(i = 0; i < 2; i++){
                        if(ready[i] === 1){
                            fill(255,255,0);
                        }
                        rect(dim*5/16+dim/4*i,dim*3/4,dim/8,dim/8);
                        fill(255,255,255);
                    }
                    fill(0,0,0);
                    text("Z",dim*3/8,dim*13/16);
                    text("M",dim*5/8,dim*13/16);
                    textSize(dim*3/50);
                    text("H  HELP",dim/2,dim*15/16);
                    noFill();
                    stroke(0);
                    strokeWeight(1);
                    rect(dim*59/160,dim*9/10,dim*3/40,dim*3/40);
                    //Displaying Loading Bar
                    if(load > 0){
                        fill(255);
                        noStroke();
                        rect(dim*3/10,dim*5/8,dim*2/5,dim*3/40);
                        fill(0);
                        rect(dim*3/10,dim*5/8,dim*2/5*load,dim*3/40);
                        fill(255);
                        textSize(dim*3/80);
                        text("Beginning the Match",dim/2,dim*53/80);
                    }

                //GO BACK TEXT----------------------------
                    fill(0);
                    textSize(dim*3/80);
                    text("STAGES",dim/2,dim*3/80);
                };

//BATTLE SCREEN
    var battleScreen = function(){
        popMatrix();pushMatrix();
        background(255);
        stageDisplay(0,0,dim,stages[stage],true);
        charStatDisplay();
        strokeWeight(1);
        for(i = 0; i < barriers.length; i++){
            stroke(255-255*barriers[i][4], 0, 255*pointBarriers[i][4]);
            //line(barriers[i][0]*dim/400,barriers[i][1]*dim/400,barriers[i][2]*dim/400,barriers[i][3]*dim/400);
        }
        stroke(0,0,255);
        for(i = 0; i < softBarriers.length; i++){
            //line(softBarriers[i][0]*dim/400,softBarriers[i][1]*dim/400,softBarriers[i][2]*dim/400,softBarriers[i][3]*dim/400);
        }
        noFill();
        for(i = 0; i < pointBarriers.length; i++){
            stroke(0,255-255*pointBarriers[i][3],255*pointBarriers[i][3]);
            //ellipse(pointBarriers[i][0]*dim/400,pointBarriers[i][1]*dim/400,pointBarriers[i][2]*dim/400,pointBarriers[i][2]*dim/400);
        }
        stroke(255, 0, 0);
        //player,startup,lag,jumpheight,jumpkey,squatkey,leftkey,rightkey
        for(i = 0; i < 2; i++){
            popMatrix();pushMatrix();
            jump(i,2,3,10);
            movement(i,1/sqrt(2));
            shield(i,0,5);
            dodge(i,2,10,6);
            if(p[i].c < 1){
                movesets[0](i);
            }
            drawHitboxes(i);
            p[i].contact = 0;
        }
        //collision checking
        t = [0,0];
        for(i = 0; i < 2; i++){
            contact = 0;
            while(contact !== Infinity){
                contact = Infinity;
                l = -1;
                m = -1;
                //hard barrier
                for(j = 0; j < barriers.length; j++){
                    k = [(p[i].x*p[i].vy*(barriers[j][0]-barriers[j][2])+(barriers[j][1]-p[i].y)*(barriers[j][0]-barriers[j][2])*p[i].vx+barriers[j][0]*p[i].vx*(barriers[j][3]-barriers[j][1]))/(p[i].vy*(barriers[j][0]-barriers[j][2])+p[i].vx*(barriers[j][3]-barriers[j][1])),((barriers[j][0]-p[i].x)*(barriers[j][3]-barriers[j][1])*p[i].vy+p[i].y*p[i].vx*(barriers[j][3]-barriers[j][1])+p[i].vy*barriers[j][1]*(barriers[j][0]-barriers[j][2]))/(p[i].vy*(barriers[j][0]-barriers[j][2])+p[i].vx*(barriers[j][3]-barriers[j][1]))];
                    if(dist((2*p[i].x+p[i].vx)/2,(2*p[i].y+p[i].vy)/2,k[0],k[1]) <= dist(0,0,p[i].vx/2,p[i].vy/2) && dist((barriers[j][0]+barriers[j][2])/2,(barriers[j][1]+barriers[j][3])/2,barriers[j][0],barriers[j][1]) > dist((barriers[j][0]+barriers[j][2])/2,(barriers[j][1]+barriers[j][3])/2,k[0],k[1]) && dist(p[i].x,p[i].y,k[0],k[1]) < contact){
                        contact = dist(p[i].x,p[i].y,k[0],k[1]);
                        l = j;
                        m = 0;
                    }
                }
                //soft barrier
                if(p[i].hitstun > 0 || !keys[controls[i][2]]){
                    for(j = 0; j < softBarriers.length; j++){
                        k = [(p[i].x*p[i].vy*(softBarriers[j][0]-softBarriers[j][2])+(softBarriers[j][1]-p[i].y)*(softBarriers[j][0]-softBarriers[j][2])*p[i].vx+softBarriers[j][0]*p[i].vx*(softBarriers[j][3]-softBarriers[j][1]))/(p[i].vy*(softBarriers[j][0]-softBarriers[j][2])+p[i].vx*(softBarriers[j][3]-softBarriers[j][1])),((softBarriers[j][0]-p[i].x)*(softBarriers[j][3]-softBarriers[j][1])*p[i].vy+p[i].y*p[i].vx*(softBarriers[j][3]-softBarriers[j][1])+p[i].vy*softBarriers[j][1]*(softBarriers[j][0]-softBarriers[j][2]))/(p[i].vy*(softBarriers[j][0]-softBarriers[j][2])+p[i].vx*(softBarriers[j][3]-softBarriers[j][1]))];
                        if(dist((2*p[i].x+p[i].vx)/2,(2*p[i].y+p[i].vy)/2,k[0],k[1]) <= dist(0,0,p[i].vx/2,p[i].vy/2) && dist((softBarriers[j][0]+softBarriers[j][2])/2,(softBarriers[j][1]+softBarriers[j][3])/2,softBarriers[j][0],softBarriers[j][1]) > dist((softBarriers[j][0]+softBarriers[j][2])/2,(softBarriers[j][1]+softBarriers[j][3])/2,k[0],k[1]) && dist(p[i].x,p[i].y,k[0],k[1]) < contact && p[i].vy >= 0){
                            contact = dist(p[i].x,p[i].y,k[0],k[1]);
                            l = j;
                            m = 1;
                        }
                    }
                }
                //point barrier
                for(j = 0; j < pointBarriers.length;j++){
                    k = [((p[i].vy*(p[i].x-pointBarriers[j][0])-p[i].vx*(p[i].y-pointBarriers[j][1]))*p[i].vy+sqrt(sq((p[i].vx*(p[i].y-pointBarriers[j][1])-p[i].vy*(p[i].x-pointBarriers[j][0]))*p[i].vy)+(sq(p[i].vx)+sq(p[i].vy))*(sq(pointBarriers[j][2]*p[i].vx/2)-sq((p[i].vx*(p[i].y-pointBarriers[j][1])-p[i].vy*(p[i].x-pointBarriers[j][0]))))))/(sq(p[i].vx)+sq(p[i].vy))+pointBarriers[j][0],((p[i].vx*(p[i].y-pointBarriers[j][1])-p[i].vy*(p[i].x-pointBarriers[j][0]))*p[i].vx+sign(p[i].vy/p[i].vx)*sqrt(sq((p[i].vy*(p[i].x-pointBarriers[j][0])-p[i].vx*(p[i].y-pointBarriers[j][1]))*p[i].vx)+(sq(p[i].vy)+sq(p[i].vx))*(sq(pointBarriers[j][2]*p[i].vy/2)-sq((p[i].vy*(p[i].x-pointBarriers[j][0])-p[i].vx*(p[i].y-pointBarriers[j][1]))))))/(sq(p[i].vy)+sq(p[i].vx))+pointBarriers[j][1],((p[i].vy*(p[i].x-pointBarriers[j][0])-p[i].vx*(p[i].y-pointBarriers[j][1]))*p[i].vy-sqrt(sq((p[i].vx*(p[i].y-pointBarriers[j][1])-p[i].vy*(p[i].x-pointBarriers[j][0]))*p[i].vy)+(sq(p[i].vx)+sq(p[i].vy))*(sq(pointBarriers[j][2]*p[i].vx/2)-sq((p[i].vx*(p[i].y-pointBarriers[j][1])-p[i].vy*(p[i].x-pointBarriers[j][0]))))))/(sq(p[i].vx)+sq(p[i].vy))+pointBarriers[j][0],((p[i].vx*(p[i].y-pointBarriers[j][1])-p[i].vy*(p[i].x-pointBarriers[j][0]))*p[i].vx-sign(p[i].vy/p[i].vx)*sqrt(sq((p[i].vy*(p[i].x-pointBarriers[j][0])-p[i].vx*(p[i].y-pointBarriers[j][1]))*p[i].vx)+(sq(p[i].vy)+sq(p[i].vx))*(sq(pointBarriers[j][2]*p[i].vy/2)-sq((p[i].vy*(p[i].x-pointBarriers[j][0])-p[i].vx*(p[i].y-pointBarriers[j][1]))))))/(sq(p[i].vy)+sq(p[i].vx))+pointBarriers[j][1]];
                    if(dist((2*p[i].x+p[i].vx)/2,(2*p[i].y+p[i].vy)/2,k[0],k[1]) <= dist(0,0,p[i].vx/2,p[i].vy/2) && abs(k[0]) > -1 && abs(k[1]) > -1 && dist(p[i].x,p[i].y,k[0],k[1]) < contact){
                        contact = dist(p[i].x,p[i].y,k[0],k[1]);
                        l = j;
                        m = 2;
                    }
                    else if(dist((2*p[i].x+p[i].vx)/2,(2*p[i].y+p[i].vy)/2,k[2],k[3]) <= dist(0,0,p[i].vx/2,p[i].vy/2) && abs(k[2]) > -1 && abs(k[3]) > -1 && dist(p[i].x,p[i].y,k[2],k[3]) < contact){
                        contact = dist(p[i].x,p[i].y,k[0],k[1]);
                        l = j;
                        m = 3;
                    }
                }
                //opposing hitboxes
                for(j = 0;j < p[1-i].hitbox.length;j++){
                    if(p[1-i].hitbox[j][3] > 0){
                        u = [p[1-i].hitbox[j][4],p[1-i].hitbox[j][5]];
                        if(!nulf(p[1-i].hitbox[j][2][0]) || !nulf(p[1-i].hitbox[j][2][1])){
                            u[0] += p[1-i].prevX;
                            u[1] += p[1-i].prevY;
                        }
                        k = [((p[i].vy*(p[i].x-u[0])-p[i].vx*(p[i].y-u[1]))*p[i].vy+sqrt(sq((p[i].vx*(p[i].y-u[1])-p[i].vy*(p[i].x-u[0]))*p[i].vy)+(sq(p[i].vx)+sq(p[i].vy))*(sq((p[1-i].hitbox[j][6]+p[i].size)*p[i].vx/2)-sq((p[i].vx*(p[i].y-u[1])-p[i].vy*(p[i].x-u[0]))))))/(sq(p[i].vx)+sq(p[i].vy))+u[0],((p[i].vx*(p[i].y-u[1])-p[i].vy*(p[i].x-u[0]))*p[i].vx+sign(p[i].vy/p[i].vx)*sqrt(sq((p[i].vy*(p[i].x-u[0])-p[i].vx*(p[i].y-u[1]))*p[i].vx)+(sq(p[i].vy)+sq(p[i].vx))*(sq((p[1-i].hitbox[j][6]+p[i].size)*p[i].vy/2)-sq((p[i].vy*(p[i].x-u[0])-p[i].vx*(p[i].y-u[1]))))))/(sq(p[i].vy)+sq(p[i].vx))+u[1],((p[i].vy*(p[i].x-u[0])-p[i].vx*(p[i].y-u[1]))*p[i].vy-sqrt(sq((p[i].vx*(p[i].y-u[1])-p[i].vy*(p[i].x-u[0]))*p[i].vy)+(sq(p[i].vx)+sq(p[i].vy))*(sq((p[1-i].hitbox[j][6]+p[i].size)*p[i].vx/2)-sq((p[i].vx*(p[i].y-u[1])-p[i].vy*(p[i].x-u[0]))))))/(sq(p[i].vx)+sq(p[i].vy))+u[0],((p[i].vx*(p[i].y-u[1])-p[i].vy*(p[i].x-u[0]))*p[i].vx-sign(p[i].vy/p[i].vx)*sqrt(sq((p[i].vy*(p[i].x-u[0])-p[i].vx*(p[i].y-u[1]))*p[i].vx)+(sq(p[i].vy)+sq(p[i].vx))*(sq((p[1-i].hitbox[j][6]+p[i].size)*p[i].vy/2)-sq((p[i].vy*(p[i].x-u[0])-p[i].vx*(p[i].y-u[1]))))))/(sq(p[i].vy)+sq(p[i].vx))+u[1]];
                        if((dist((2*p[i].x+p[i].vx)/2,(2*p[i].y+p[i].vy)/2,k[0],k[1]) <= dist(0,0,p[i].vx/2,p[i].vy/2) || dist(p[i].x,p[i].y,u[0],u[1]) <= (p[1-i].hitbox[j][6]+p[i].size)) && abs(k[0]) > -1 && abs(k[1]) > -1 && dist(p[i].x,p[i].y,k[0],k[1]) < contact){
                            contact = dist(p[i].x,p[i].y,k[0],k[1]);
                            l = j;
                            m = 4;
                        }
                        else if(dist((2*p[i].x+p[i].vx)/2,(2*p[i].y+p[i].vy)/2,k[2],k[3]) <= dist(0,0,p[i].vx/2,p[i].vy/2) && abs(k[2]) > -1 && abs(k[3]) > -1 && dist(p[i].x,p[i].y,k[2],k[3]) < contact){
                            contact = dist(p[i].x,p[i].y,k[2],k[3]);
                            l = j;
                            m = 5;
                        }
                    }
                }
                //resulting barrier
                if(l !== -1){
                    if(m === 0){
                        j = l;
                        k = [(p[i].x*p[i].vy*(barriers[j][0]-barriers[j][2])+(barriers[j][1]-p[i].y)*(barriers[j][0]-barriers[j][2])*p[i].vx+barriers[j][0]*p[i].vx*(barriers[j][3]-barriers[j][1]))/(p[i].vy*(barriers[j][0]-barriers[j][2])+p[i].vx*(barriers[j][3]-barriers[j][1])),((barriers[j][0]-p[i].x)*(barriers[j][3]-barriers[j][1])*p[i].vy+p[i].y*p[i].vx*(barriers[j][3]-barriers[j][1])+p[i].vy*barriers[j][1]*(barriers[j][0]-barriers[j][2]))/(p[i].vy*(barriers[j][0]-barriers[j][2])+p[i].vx*(barriers[j][3]-barriers[j][1]))];
                        n = [barriers[j][0]+(barriers[j][2]-barriers[j][0])*((p[i].x+p[i].vx-barriers[j][0])*(barriers[j][2]-barriers[j][0])+(p[i].y+p[i].vy-barriers[j][1])*(barriers[j][3]-barriers[j][1]))/(sq(barriers[j][2]-barriers[j][0])+sq(barriers[j][3]-barriers[j][1])),barriers[j][1]+(barriers[j][3]-barriers[j][1])*((p[i].x+p[i].vx-barriers[j][0])*(barriers[j][2]-barriers[j][0])+(p[i].y+p[i].vy-barriers[j][1])*(barriers[j][3]-barriers[j][1]))/(sq(barriers[j][2]-barriers[j][0])+sq(barriers[j][3]-barriers[j][1]))];
                        t[i] += dist(p[i].x,p[i].y,k[0],k[1])/dist(0,0,p[i].prevVx,p[i].prevVy);
                        k[2] = p[i].x;
                        k[3] = p[i].y;
                        p[i].x = k[0]-0.000000001*p[i].vx/dist(0,0,p[i].vx,p[i].vy);
                        p[i].y = k[1]-0.000000001*p[i].vy/dist(0,0,p[i].vx,p[i].vy);
                        if(p[i].hitstun <= 0){
                            p[i].vx = n[0]-k[0];
                            p[i].vy = n[1]-k[1];
                            if(barriers[j][4] === 1){
                                restore(i);
                            }
                        }
                        else{
                            p[i].vx = 2*n[0]-k[2]-p[i].vx-k[0];
                            p[i].vy = 2*n[1]-k[3]-p[i].vy-k[1];
                        }
                    }
                    else if(m === 1){
                        j = l;
                        k = [(p[i].x*p[i].vy*(softBarriers[j][0]-softBarriers[j][2])+(softBarriers[j][1]-p[i].y)*(softBarriers[j][0]-softBarriers[j][2])*p[i].vx+softBarriers[j][0]*p[i].vx*(softBarriers[j][3]-softBarriers[j][1]))/(p[i].vy*(softBarriers[j][0]-softBarriers[j][2])+p[i].vx*(softBarriers[j][3]-softBarriers[j][1])),((softBarriers[j][0]-p[i].x)*(softBarriers[j][3]-softBarriers[j][1])*p[i].vy+p[i].y*p[i].vx*(softBarriers[j][3]-softBarriers[j][1])+p[i].vy*softBarriers[j][1]*(softBarriers[j][0]-softBarriers[j][2]))/(p[i].vy*(softBarriers[j][0]-softBarriers[j][2])+p[i].vx*(softBarriers[j][3]-softBarriers[j][1]))];
                        n = [softBarriers[j][0]+(softBarriers[j][2]-softBarriers[j][0])*((p[i].x+p[i].vx-softBarriers[j][0])*(softBarriers[j][2]-softBarriers[j][0])+(p[i].y+p[i].vy-softBarriers[j][1])*(softBarriers[j][3]-softBarriers[j][1]))/(sq(softBarriers[j][2]-softBarriers[j][0])+sq(softBarriers[j][3]-softBarriers[j][1])),softBarriers[j][1]+(softBarriers[j][3]-softBarriers[j][1])*((p[i].x+p[i].vx-softBarriers[j][0])*(softBarriers[j][2]-softBarriers[j][0])+(p[i].y+p[i].vy-softBarriers[j][1])*(softBarriers[j][3]-softBarriers[j][1]))/(sq(softBarriers[j][2]-softBarriers[j][0])+sq(softBarriers[j][3]-softBarriers[j][1]))];
                        t[i] += dist(p[i].x,p[i].y,k[0],k[1])/dist(0,0,p[i].prevVx,p[i].prevVy);
                        k[2] = p[i].x;
                        k[3] = p[i].y;
                        p[i].x = k[0]-0.000000001*p[i].vx/dist(0,0,p[i].vx,p[i].vy);
                        p[i].y = k[1]-0.000000001*p[i].vy/dist(0,0,p[i].vx,p[i].vy);
                        if(p[i].hitstun <= 0){
                            p[i].vx = n[0]-k[0];
                            p[i].vy = n[1]-k[1];
                            if(softBarriers[j][4] === 1){
                                restore(i);
                            }
                        }
                        else{
                            p[i].vx = 2*n[0]-p[i].vx-k[2]-k[0];
                            p[i].vy = 2*n[1]-p[i].vy-k[3]-k[1];
                        }
                    }
                    else if(m === 2){
                        j = l;
                        k = [((p[i].vy*(p[i].x-pointBarriers[j][0])-p[i].vx*(p[i].y-pointBarriers[j][1]))*p[i].vy+sqrt(sq((p[i].vx*(p[i].y-pointBarriers[j][1])-p[i].vy*(p[i].x-pointBarriers[j][0]))*p[i].vy)+(sq(p[i].vx)+sq(p[i].vy))*(sq(pointBarriers[j][2]/2*p[i].vx)-sq((p[i].vx*(p[i].y-pointBarriers[j][1])-p[i].vy*(p[i].x-pointBarriers[j][0]))))))/(sq(p[i].vx)+sq(p[i].vy))+pointBarriers[j][0],((p[i].vx*(p[i].y-pointBarriers[j][1])-p[i].vy*(p[i].x-pointBarriers[j][0]))*p[i].vx+sign(p[i].vy/p[i].vx)*sqrt(sq((p[i].vy*(p[i].x-pointBarriers[j][0])-p[i].vx*(p[i].y-pointBarriers[j][1]))*p[i].vx)+(sq(p[i].vy)+sq(p[i].vx))*(sq(pointBarriers[j][2]/2*p[i].vy)-sq((p[i].vy*(p[i].x-pointBarriers[j][0])-p[i].vx*(p[i].y-pointBarriers[j][1]))))))/(sq(p[i].vy)+sq(p[i].vx))+pointBarriers[j][1]];
                        n = [atan2(pointBarriers[j][1]-k[1],k[0]-pointBarriers[j][0])-90];
                        u = [k[0]+((p[i].x+p[i].vx-k[0])*sq(cos(n[0]))+(k[1]-p[i].y-p[i].vy)*(cos(n[0])*sin(n[0]))),k[1]-((p[i].x+p[i].vx-k[0])*(cos(n[0])*sin(n[0]))+(k[1]-p[i].y-p[i].vy)*sq(sin(n[0])))];
                        t[i] += dist(p[i].x,p[i].y,k[0],k[1])/dist(0,0,p[i].prevVx,p[i].prevVy);
                        p[i].x = k[0]+0.000000001*cos(n[0]+90);
                        p[i].y = k[1]-0.000000001*sin(n[0]+90);
                        if(p[i].hitstun <= 0){
                            p[i].vx = u[0]-k[0];
                            p[i].vy = u[1]-k[1];
                            if(pointBarriers[j][3] === 1){
                                restore(i);
                            }
                        }
                        else{
                            p[i].vx = 2*u[0]-p[i].prevX-p[i].vx-k[0];
                            p[i].vy = 2*u[1]-p[i].prevY-p[i].vy-k[1];
                        }
                    }
                    else if(m === 3){
                        j = l;
                        k = [((p[i].vy*(p[i].x-pointBarriers[j][0])-p[i].vx*(p[i].y-pointBarriers[j][1]))*p[i].vy-sqrt(sq((p[i].vx*(p[i].y-pointBarriers[j][1])-p[i].vy*(p[i].x-pointBarriers[j][0]))*p[i].vy)+(sq(p[i].vx)+sq(p[i].vy))*(sq(pointBarriers[j][2]/2*p[i].vx)-sq((p[i].vx*(p[i].y-pointBarriers[j][1])-p[i].vy*(p[i].x-pointBarriers[j][0]))))))/(sq(p[i].vx)+sq(p[i].vy))+pointBarriers[j][0],((p[i].vx*(p[i].y-pointBarriers[j][1])-p[i].vy*(p[i].x-pointBarriers[j][0]))*p[i].vx-sign(p[i].vy/p[i].vx)*sqrt(sq((p[i].vy*(p[i].x-pointBarriers[j][0])-p[i].vx*(p[i].y-pointBarriers[j][1]))*p[i].vx)+(sq(p[i].vy)+sq(p[i].vx))*(sq(pointBarriers[j][2]/2*p[i].vy)-sq((p[i].vy*(p[i].x-pointBarriers[j][0])-p[i].vx*(p[i].y-pointBarriers[j][1]))))))/(sq(p[i].vy)+sq(p[i].vx))+pointBarriers[j][1]];
                        n = [atan2(pointBarriers[j][1]-k[1],k[0]-pointBarriers[j][0])-90];
                        u = [k[0]+((p[i].x+p[i].vx-k[0])*sq(cos(n[0]))+(k[1]-p[i].y-p[i].vy)*(cos(n[0])*sin(n[0]))),k[1]-((p[i].x+p[i].vx-k[0])*(cos(n[0])*sin(n[0]))+(k[1]-p[i].y-p[i].vy)*sq(sin(n[0])))];
                        t[i] += dist(p[i].x,p[i].y,k[0],k[1])/dist(0,0,p[i].prevVx,p[i].prevVy);
                        p[i].x = k[0]+0.000000001*cos(n[0]+90);
                        p[i].y = k[1]-0.000000001*sin(n[0]+90);
                        if(p[i].hitstun <= 0){
                            p[i].vx = u[0]-k[0];
                            p[i].vy = u[1]-k[1];
                            if(pointBarriers[j][3] === 1){
                                restore(i);
                            }
                        }
                        else{
                            p[i].vx = 2*u[0]-p[i].x-p[i].vx-k[0];
                            p[i].vy = 2*u[1]-p[i].y-p[i].vy-k[1];
                        }
                    }
                    else if(m === 4){
                        j = l;
                        u = [p[1-i].hitbox[j][4],p[1-i].hitbox[j][5],compute(p[1-i].hitbox[j][2][0],[],[]),compute(p[1-i].hitbox[j][2][1],[],[])];
                        if(!nulf(p[1-i].hitbox[j][2][0]) || !nulf(p[1-i].hitbox[j][2][1])){
                            u[0] += p[1-i].prevX;
                            u[1] += p[1-i].prevY;
                            u[2] = p[1-i].prevVx;
                            u[3] = p[1-i].prevVy;
                        }
                        k = [((p[i].vy*(p[i].x-u[0])-p[i].vx*(p[i].y-u[1]))*p[i].vy+sqrt(sq((p[i].vx*(p[i].y-u[1])-p[i].vy*(p[i].x-u[0]))*p[i].vy)+(sq(p[i].vx)+sq(p[i].vy))*(sq((p[1-i].hitbox[j][6]+p[i].size)*p[i].vx/2)-sq((p[i].vx*(p[i].y-u[1])-p[i].vy*(p[i].x-u[0]))))))/(sq(p[i].vx)+sq(p[i].vy))+u[0],((p[i].vx*(p[i].y-u[1])-p[i].vy*(p[i].x-u[0]))*p[i].vx+sign(p[i].vy/p[i].vx)*sqrt(sq((p[i].vy*(p[i].x-u[0])-p[i].vx*(p[i].y-u[1]))*p[i].vx)+(sq(p[i].vy)+sq(p[i].vx))*(sq((p[1-i].hitbox[j][6]+p[i].size)*p[i].vy/2)-sq((p[i].vy*(p[i].x-u[0])-p[i].vx*(p[i].y-u[1]))))))/(sq(p[i].vy)+sq(p[i].vx))+u[1]];
                        if(dist(p[i].x,p[i].y,u[0],u[1])>(p[1-i].hitbox[j][6]+p[i].size)){
                            p[i].x = k[0];
                            p[i].y = k[1];
                        }
                        p[i].vx = compute(p[1-i].hitbox[j][13],["projx","projy","hitvx","hitvy","hitdamage","hitstun"],[u[0],u[1],u[2],u[3],p[1-i].hitbox[j][11],p[1-i].hitbox[j][14]]);
                        p[i].vy = compute(p[1-i].hitbox[j][14],["projx","projy","hitvx","hitvy","hitdamage","hitstun"],[u[0],u[1],u[2],u[3],p[1-i].hitbox[j][11],p[1-i].hitbox[j][14]]);
                        p[i].damage += compute(p[1-i].hitbox[j][12],["projx","projy","hitvx","hitvy","hitdamage","hitstun"],[u[0],u[1],u[2],u[3],p[1-i].hitbox[j][11],p[1-i].hitbox[j][14]]);
                        p[i].hitstun = compute(p[1-i].hitbox[j][15],["projx","projy","hitvx","hitvy","hitdamage","hitstun"],[u[0],u[1],u[2],u[3],p[1-i].hitbox[j][11],p[1-i].hitbox[j][14]]);
                        p[i].lag = 0;
                        p[1-i].hitbox[j][3] -= 1;
                        t[i] = 0;
                    }
                    else if(m === 5){
                        j = l;
                        u = [p[1-i].hitbox[j][4],p[1-i].hitbox[j][5],compute(p[1-i].hitbox[j][2][0],[],[]),compute(p[1-i].hitbox[j][2][1],[],[])];
                        if(!nulf(p[1-i].hitbox[j][2][0]) || !nulf(p[1-i].hitbox[j][2][1])){
                            u[0] += p[1-i].prevX;
                            u[1] += p[1-i].prevY;
                            u[2] = p[1-i].prevVx;
                            u[3] = p[1-i].prevVy;
                        }
                        k = [((p[i].vy*(p[i].x-u[0])-p[i].vx*(p[i].y-u[1]))*p[i].vy-sqrt(sq((p[i].vx*(p[i].y-u[1])-p[i].vy*(p[i].x-u[0]))*p[i].vy)+(sq(p[i].vx)+sq(p[i].vy))*(sq((p[1-i].hitbox[j][6]+p[i].size)*p[i].vx/2)-sq((p[i].vx*(p[i].y-u[1])-p[i].vy*(p[i].x-u[0]))))))/(sq(p[i].vx)+sq(p[i].vy))+u[0],((p[i].vx*(p[i].y-u[1])-p[i].vy*(p[i].x-u[0]))*p[i].vx-sign(p[i].vy/p[i].vx)*sqrt(sq((p[i].vy*(p[i].x-u[0])-p[i].vx*(p[i].y-u[1]))*p[i].vx)+(sq(p[i].vy)+sq(p[i].vx))*(sq((p[1-i].hitbox[j][6]+p[i].size)*p[i].vy/2)-sq((p[i].vy*(p[i].x-u[0])-p[i].vx*(p[i].y-u[1]))))))/(sq(p[i].vy)+sq(p[i].vx))+u[1]];
                        if(dist(p[i].x,p[i].y,u[0],u[1])>(p[1-i].hitbox[j][6]+p[i].size)){
                        p[i].x = k[0];
                        p[i].y = k[1];
                        }
                        p[i].vx = compute(p[1-i].hitbox[j][13],["projx","projy","hitvx","hitvy","hitdamage","hitstun"],[u[0],u[1],u[2],u[3],p[1-i].hitbox[11],p[1-i].hitbox[j][14]]);
                        p[i].vy = compute(p[1-i].hitbox[j][14],["projx","projy","hitvx","hitvy","hitdamage","hitstun"],[u[0],u[1],u[2],u[3],p[1-i].hitbox[11],p[1-i].hitbox[j][14]]);
                        p[i].damage += compute(p[1-i].hitbox[j][12],["projx","projy","hitvx","hitvy","hitdamage","hitstun"],[u[0],u[1],u[2],u[3],p[1-i].hitbox[11],p[1-i].hitbox[j][14]]);
                        p[i].hitstun = compute(p[1-i].hitbox[j][15],["projx","projy","hitvx","hitvy","hitdamage","hitstun"],[u[0],u[1],u[2],u[3],p[1-i].hitbox[11],p[1-i].hitbox[j][14]]);
                        p[i].lag = 0;
                        p[1-i].hitstun[j][3] -= 1;
                        t[i] = 0;
                    }
                }
            }
            p[i].friction = p[i].afriction;
            if(p[i].invisible <= 0){
                scale(sign(p[i].direction)*directions[floor(p[i].c)],1);
                image(sprites[i][floor(p[i].c)],p[i].x*dim/400*sign(p[i].direction)*directions[floor(p[i].c)],p[i].y*dim/400,p[i].size*dim/400,p[i].size*dim/400);
                popMatrix();pushMatrix();
            }
        }
        for(i = 0; i < 2; i++){
            projectileCalc(i);
        }
        for(i = 0; i < 2; i++){
            p[i].prevX = p[i].x;
            p[i].x += p[i].vx;
            p[i].vx /= (1-t[i]);
            p[i].vx *= p[i].friction;
            p[i].prevVx = p[i].vx;
            p[i].prevY = p[i].y;
            p[i].y += p[i].vy;
            p[i].vy /= (1-t[i]);
            p[i].vy +=1;
            p[i].vy *= p[i].friction;
            p[i].prevVy = p[i].vy;
            p[i].startUp -= 1;
            p[i].lag -= 1;
            p[i].invisible -= 1;
            p[i].hitlag -= 1;
            p[i].prevMove = p[i].move;
            p[i].hitstun -=1;
            t[i] = 0;
            blastZone(i,-300,-200,300,200);
        }
        if(kill){
            kill = false;
            p[0].kill = true;
            p[1].kill = true;
        }
        if(min(p[0].lives,p[1].lives) <=0 && p[0].lives !== p[1].lives){
            screen[0] = 5;
            screen[1] = 7;
        }
    };
    var winScreen = function(){
        textSize(50);
        textAlign(CENTER,CENTER);
        if(p[0].lives > p[1].lives){
            background(0, 0, 255);
            noStroke();
            fill(255, 0, 0);
            centerRect(0,0,380,380);
            fill(0);
            text("P1 wins",0,0);
        }
        else{
            background(255, 0, 0);
            noStroke();
            fill(0, 0, 255);
            centerRect(0,0,380,380);
            fill(0);
            text("P1 wins",0,0);
        }
        fill(0, 255, 0);
        rect(-50,125,100,50);
        fill(0);
        textSize(20);
        text("Play\nAgain",0,150);
        if(keyDown[10] || keyDown[16] || keyDown[32] || (abs(mouseX-200) <= 50 && abs(mouseY-350) <= 25 && mouseDown)){
            translate(-200,-200);pushMatrix();
            textAlign(CENTER,CENTER);
            screen[0] = 2;
            screen[1] = 3;
            d[0] = 1;
            ready = [false,false];
            load = 0;
        }
    };

//RUNNING THE GAME-------------------------------------------
    draw = function() {

        //KEY FUNCTIONS----------------------------------
            for(i = 0; i < keys.length+1; i++){
                if(keys[i] && !prevkeys[i]){
                    keyDown[i] = true;
                }
                else{
                    keyDown[i] = false;
                }
                if(!keys[i] && prevkeys[i]){
                    keyUp[i] = true;
                }
                else{
                    keyUp[i] = false;
                }
            }

        //SCREENS--------------------------------------------
            if(screen[0] === -1){
                stageBuilder();
            }
            else if(floor(screen[0]) === 0){
                help();
            }
            else if(screen[0] === 1){
                itemSelect();
            }
            else if(screen[0] === 2){
                stageSelect();
            }
            else if(screen[0] === 3){
                characterSelect();
            }
            else if(screen[0] === 4){
                battleScreen();
            }
            else if(screen[0] === 5){
                winScreen();
            }
        //UPDATING PREVIOUS KEYS-----------------------------
            for(i = 0; i < keys.length; i++){
                prevkeys[i] = keys[i];
            }
            mouseDown = false;
            mouseUp = false;
        //BLACKOUT
            resetMatrix();
            fill(0);
            noStroke();
            rect(0,0,cornerX,height);
            rect(0,0,width,cornerY);
            rect(width,height,cornerX+dim-width,-height);
            rect(width,height,-width,cornerY-height+dim);
            popMatrix();pushMatrix();
    };
