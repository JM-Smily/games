/**
 * Created by seraphimwx on 2017/9/12.
 */
function $(id) {
    return document.getElementById(id);
}
//全局变量
var divGame = $("game");
var zz = $("zz");
var over =$("over");
var jf =$("score");
var restart =$("restart");
var exit = $("exit");
var arrMonster1=[];//存放Monster
var arrMonster2=[];
var arrMonster3=[];
var arrMonster4=[];
var bleedPlane=[6,5,4,3,1];//存放血量
var bleedBird =[10,8,6,4,2];
var bleedGhost =[12,10,8,6,4];
var bleedBoss =[30,28,26,24,20];
var boss;
var DBleed;//血量条
var arrBox=[];//存放宝箱
var arrSpot1 =[];//存放monster子弹
var arrSpot=[];//存放玩家子弹
var arrPlaneS =["img/enemy/plane/move.gif","img/enemy/plane/hit.gif","img/enemy/plane/die.gif"];//状态存放
var arrBirdS=["img/enemy/bird/move.gif","img/enemy/bird/hit.gif","img/enemy/bird/die.gif"];
var arrGhostS=["img/enemy/ghost/move.gif","img/enemy/ghost/hit.gif","img/enemy/ghost/die.gif"];
var arrBossS=["img/enemy/boss/move.gif","img/enemy/boss/hit.gif","img/enemy/boss/die.gif","img/enemy/boss/attack.gif"];
//玩家spot击中后
var arrDragonSpot=["img/dragon/small/hit.gif","img/dragon/middle/hit.gif","img/dragon/big/hit.gif","img/dragon/large/hit.gif","img/dragon/big/hit.gif","img/dragon/final/hit.gif"];
//玩家攻击的子弹
var arrHitSpot =["img/dragon/small/att.gif","img/dragon/middle/att.gif","img/dragon/big/att.gif","img/dragon/large/att.gif","img/dragon/final/att.gif"];
//玩家活着的状态
var dragonStand=["img/dragon/small/stand.gif","img/dragon/middle/stand.gif","img/dragon/big/stand.gif","img/dragon/large/stand.gif","img/dragon/final/stand.gif"];
var dragonMove=["img/dragon/small/move.gif","img/dragon/middle/move.gif","img/dragon/big/move.gif","img/dragon/large/move.gif","img/dragon/final/move.gif"];
var dragonMagic=["img/dragon/small/magicmissile.gif","img/dragon/middle/magicmissile.gif","img/dragon/big/magicmissile.gif","img/dragon/large/magicmissile.gif","img/dragon/final/magicmissile.gif"];
var spottimer;
var planeself ;//玩家
var count = 0;//积分统计
var a = 10;
var toLeft = false;//定义几个boolean型变量,四个方向
var toRight = false;
var toTop = false;
var toBottom = false;
var toSpace = false;
var toEnter = false;
var createPlaneTimer;//不断创建Monster
var createBirdTimer;
var createGhostTimer;
var createBossTimer;
var movePlaneTimer;//移动Monster
var moveBirdTimer;//移动Monster
var moveGhostTimer;//移动Monster
var moveBossTimer;//移动Monster
var moveSpotTimer ;
var moveDragonTimer ;//移动玩家
var moveDragonSpotTimer;
var pengZhuang1Timer;//碰撞处理
var pengZhuang2Timer;
var pengZhuang3Timer;
var pengZhuang4Timer;
var huiShou1Timer;//回收处理
var huiShou2Timer;
var huiShou3Timer;
var huiShou4Timer;
var pengZhuangSelfTimer;//碰撞处理
var pengZhuangSelf1Timer;
var pengZhuangSelf2Timer;
var pengZhuangSelf3Timer;
var pengZhuangSelf4Timer;
var pengZhuangSpotTimer;
var boxCountTimer;
var expChangeTimer;
var index=0;
var span1 = $("span1");
var t1;
var boom = $("boom");
var plane;
var bird;
var ghost;
var counta = 0;//宝箱个数统计
//获取精力值
var exp0 = $("exp0");
var expfull = $("expFull");
var back = $("back");
back.onmouseover=function () {
    back.src="img/ui/backover.gif";
};
back.onclick=function () {
    back.src="img/ui/backClick.gif";
    location.href="maoxiandao.html";//回到游戏开始的界面
};
restart.onclick=function () {
    location.href="maoxiandao.html";//回到游戏开始的界面
};
exit.onclick=function () {
    window.close();
};
// -------------------------------------------开始执行--------
play();
function play() {
    createDragon();//创建玩家
    addClassTimer =setInterval(addclass,1000);
    createPlaneTimer = setInterval(createPlane,2000);//不断创建Monster
    createBirdTimer = setInterval(createBird,8000);
    createGhostTimer = setInterval(createGhost,12000);
    createBossTimer = setInterval(createBoss,18000);
    movePlaneTimer = setInterval(movePlane,100);//移动Monster
    moveBirdTimer = setInterval(moveBird,200);//移动Monster
    moveGhostTimer = setInterval(moveGhost,200);//移动Monster
    moveBossTimer = setInterval(moveBoss,200);//移动Monster
    moveSpotTimer = setInterval(moveSpotMonster,100);
    moveDragonTimer = setInterval(moveDragon,100);//移动玩家
    moveDragonSpotTimer = setInterval(moveSpot,100);
    pengZhuang1Timer =setInterval((function(){pengZhuangAll(arrMonster1,arrPlaneS)}),100);//碰撞处理
    pengZhuang2Timer =setInterval((function(){pengZhuangAll(arrMonster2,arrBirdS)}),100);
    pengZhuang3Timer =setInterval((function(){pengZhuangAll(arrMonster3,arrGhostS)}),100);
    pengZhuang4Timer =setInterval((function(){pengZhuangAll(arrMonster4,arrBossS)}),100);
    huiShou1Timer = setInterval((function(){huishou(arrMonster1)}),500);//回收处理
    huiShou2Timer = setInterval((function(){huishou(arrMonster2)}),500);
    huiShou3Timer = setInterval((function(){huishou(arrMonster3)}),500);
    huiShou4Timer = setInterval((function(){huishou(arrMonster4)}),500);
    pengZhuangSelfTimer = setInterval(pengZhuangSelf,100);
    pengZhuangSelf1Timer = setInterval((function(){pengZhuangSelf2(arrMonster1)}),100);
    pengZhuangSelf2Timer = setInterval((function(){pengZhuangSelf2(arrMonster2)}),100);
    pengZhuangSelf3Timer = setInterval((function(){pengZhuangSelf2(arrMonster3)}),100);
    pengZhuangSelf4Timer = setInterval((function(){pengZhuangSelf2(arrMonster4)}),100);
    pengZhuangSpotTimer =setInterval(boxBoom,500);
    expChangeTimer=setInterval(expChange,1000);
    boxCountTimer = setInterval(boxCount,1000);
}
//计时
var times = 90;
var minute = $("minute");
var second1 = $("second1");
var second2 = $("second2");
t1 = setInterval(time, 1000);
function time() {
    times--;
    if (times > 0) {
        var s1, s2;
        var m = String(parseInt(times / 60));
        var s = parseInt(times % 60);
        if (s > 9) {
            s1 = String(s).substr(0, 1);
            s2 = String(s).substr(1, 1);
        } else {
            s1 = String(0);
            s2 = String(s).substr(0, 1);
        }
        minute.src = "img/num/" + m + ".gif";
        second1.src = "img/num/" + s1 + ".gif";
        second2.src = "img/num/" + s2 + ".gif";
    }else if (times == 0) {
        planeself.isDead = true;
        if (planeself.isDead == true) {
            zz.style.display = "block";
            over.style.display = "block";
            var span = document.createElement("span");
            var txt = document.createTextNode(count);
            span.appendChild(txt);
            jf.appendChild(span);
            pause();
        }
        pause();
    }
    else {
        clearInterval(t1);
    }
}
function pause() {
    clearInterval(createPlaneTimer);
    clearInterval(createBirdTimer);
    clearInterval(createGhostTimer);
    clearInterval(createBossTimer);
    clearInterval(movePlaneTimer);
    clearInterval(moveBirdTimer);
    clearInterval(moveGhostTimer);
    clearInterval(moveBossTimer);
    clearInterval(moveSpotTimer);
    clearInterval(moveDragonTimer);
    clearInterval(moveDragonSpotTimer);
    clearInterval(pengZhuang1Timer);
    clearInterval(pengZhuang2Timer);
    clearInterval(pengZhuang3Timer);
    clearInterval(pengZhuang4Timer);
    clearInterval(huiShou1Timer);
    clearInterval(huiShou2Timer);
    clearInterval(huiShou3Timer);
    clearInterval(huiShou4Timer);
    clearInterval(pengZhuangSelfTimer);
    clearInterval(pengZhuangSelf1Timer);
    clearInterval(pengZhuangSelf2Timer);
    clearInterval(pengZhuangSelf3Timer);
    clearInterval(pengZhuangSelf4Timer);
    clearInterval(pengZhuangSpotTimer);
    // clearInterval(addClassTimer);
    // clearInterval(addChangeTimer);
    clearInterval(expChangeTimer);
    clearInterval(boxCountTimer);
}
//能量条的改变
function expChange(){
    if(span1.innerText>0 && span1.innerText<10) {
        var value=100-span1.innerText*10;
        expfull.setAttribute("style","clip: rect("+value+"px"+",31px,161px,0px)");
        expfull.style.opacity="1";
    }
    if(span1.innerText>10 &&span1.innerText<=20){
        var value1=100-(span1.innerText%10)*10;
        expfull.setAttribute("style","clip: rect("+value1+"px"+",31px,161px,0px)");
        expfull.style.opacity="1";
    }
    if(span1.innerText>20 &&span1.innerText<=30){
        var value2=100-(span1.innerText%10)*10;
        expfull.setAttribute("style","clip: rect("+value2+"px"+",31px,161px,0px)");
        expfull.style.opacity="1";
    }
    if(span1.innerText>30 &&span1.innerText<=40){
        var value3=100-(span1.innerText%10)*10;
        expfull.setAttribute("style","clip: rect("+value3+"px"+",31px,161px,0px)");
        expfull.style.opacity="1";
    }
    if(span1.innerText>40){
        var value4=100-(span1.innerText%10)*10;
        expfull.setAttribute("style","clip: rect("+value4+"px"+",31px,161px,0px)");
        expfull.style.opacity="1";
    }
}
//移动Plane
function movePlane(){
    for(var i=0;i<arrMonster1.length;i++){
        //获取到对象的节点属性，然后判断超过页面的删掉
       var left =parseInt(arrMonster1[i].imgNode.style.left);
        if(left<=1250){
            arrMonster1[i].move();
        }else{
            //删除Monster
            divGame.removeChild(arrMonster1[i].imgNode);
            arrMonster1.splice(i,1);
            i--;
        }
    }
}
//移动Bird
function moveBird(){
    for(var i=0;i<arrMonster2.length;i++){
        //获取到对象的节点属性，然后判断超过页面的删掉
        var left =parseInt(arrMonster2[i].imgNode.style.left);
        if(left<=1250){
            arrMonster2[i].move();
        }else{
            //删除Monster
            divGame.removeChild(arrMonster2[i].imgNode);
            arrMonster2.splice(i,1);
            i--;
        }
    }
}
//移动Ghost
function moveGhost(){
    for(var i=0;i<arrMonster3.length;i++){
        //获取到对象的节点属性，然后判断超过页面的删掉
        var left =parseInt(arrMonster3[i].imgNode.style.left);
        if(left<=1250){
            arrMonster3[i].move();
        }else{
            //删除Monster
            divGame.removeChild(arrMonster3[i].imgNode);
            arrMonster3.splice(i,1);
            i--;
        }
    }
}
//移动Boss
function moveBoss(){
    for(var i=0;i<arrMonster4.length;i++){
        //获取到对象的节点属性，然后判断超过页面的删掉
        var left =parseInt(arrMonster4[i].imgNode.style.left);
        if(left<=1250){
            arrMonster4[i].move();
        }else{
            //删除Monster
            divGame.removeChild(arrMonster4[i].imgNode);
            arrMonster4.splice(i,1);
            i--;
        }
    }
}
//创建Monster
function createPlane() {
    var x=0;
    var y=parseInt(Math.random()*550);
    plane = new monsterPrototype(x,y,arrPlaneS[0],3,bleedPlane[index]);
    arrMonster1.push(plane);//将创建的飞机保存到数组中
}
function createBird() {
    var x=0;
    var y=parseInt(Math.random()*540);
    bird = new monsterPrototype(x,y,arrBirdS[0],3,bleedBird[index]);
    arrMonster2.push(bird);//将创建的飞机保存到数组中
}
function createGhost() {
    var x=0;
    var y=parseInt(Math.random()*500);
    ghost = new monsterPrototype(x,y,arrGhostS[0],3,bleedGhost[index]);
    arrMonster3.push(ghost);//将创建的monster保存到数组中
}
function createBoss() {
    var x=0;
    var y=parseInt(Math.random()*500);
    boss = new BossPrototype(x,y,arrBossS[0],3,bleedBoss[index]);
    arrMonster4.push(boss);//将创建的monster保存到数组中
    spottimer=setInterval(function () {
        boss.spot();
    },5000);
}
//移动Monster子弹
function moveSpotMonster() {
    for(var i=0;i<arrSpot1.length;i++){
        var left =parseInt(arrSpot1[i].imgNode.style.left);
        if(left==0){
            //删除Monster
            divGame.removeChild(arrSpot1[i].imgNode);
            arrSpot1.splice(i,1);
            i--;
        }else{
            arrSpot1[i].move();
        }
    }
}
 // 小怪兽的原型  prototype
function monsterPrototype(x,y,src,speed,bleed) {
    this.x =x;
    this.y = y;
    this.src = src;
    this.speed = speed;
    this.bleed = bleed;
    this.imgNode = document.createElement("img");//方便后面操作，后面的移动就可以操作节点就可以了
    //方法
    this.move = function () {
        var left =(parseInt(this.imgNode.style.left)-this.speed);
        this.imgNode.style.left=left+"px";
    };
    //初始化
    this.init=function () {
        this.imgNode.src = this.src;
        this.imgNode.style.left=x+1200+"px";
        this.imgNode.style.top=y+"px";
        divGame.appendChild(this.imgNode);//将节点追加到divGame中
    };
    this.init();
}
//创建宝箱原型
function BoxPrototype(x,y,src){
    this.x =x;
    this.y = y;
    this.src = src;
    this.imgNode = document.createElement("img");//方便后面操作，后面的移动就可以操作节点就可以了
    //初始化
    this.init=function () {
        this.imgNode.src = this.src;
        this.imgNode.style.left=x+"px";
        this.imgNode.style.top=y+"px";
        divGame.appendChild(this.imgNode);//将节点追加到divGame中
    };
    this.init();
}
//BOSS 原型 PROTOTYPE
function BossPrototype(x,y,src,speed,bleed) {
    this.x =x;
    this.y = y;
    this.src = src;
    this.speed = speed;
    this.bleed = bleed;
    this.imgNode = document.createElement("img");//方便后面操作，后面的移动就可以操作节点就可以了
    //子弹
    this.spot=function () {
        setInterval((function(){boss.imgNode.src="img/enemy/boss/attack.gif";}),1000);
        var width =this.imgNode.style.width;
        var top = parseInt(this.imgNode.style.top);
        var left = parseInt(this.imgNode.style.left);
        var x=left-width-145;
        var y= top+72.5;//top+飞机高度+子弹高度的一半
        var spot= new spotPrototype1(x,y,"img/enemy/boss/attackBall.gif",30);
        arrSpot1.push(spot);//将创建的子弹保存到数组中
    };
    this.move = function () {
        var left =(parseInt(this.imgNode.style.left)-this.speed);
        // var top =(parseInt(Math.random()*520)-100-this.speed);
            this.imgNode.style.left=left+"px";
            // this.imgNode.style.top=top+"px";
    };
    //初始化
    this.init=function () {
        this.imgNode.src = this.src;
        this.imgNode.style.left=x+1200+"px";
        this.imgNode.style.top=y+"px";
        divGame.appendChild(this.imgNode);//将节点追加到divGame中
    };
    this.init();
}
// 怪兽子弹原型
function spotPrototype1(x,y,src,speed) {
    this.x =x;
    this.y = y;
    this.src = src;
    this.speed = speed;
    this.imgNode = document.createElement("img");//方便后面操作，后面的移动就可以操作节点就可以了
    this.move = function () {
        var left =(parseInt(this.imgNode.style.left)-this.speed);
        if(left<=1200){
            this.imgNode.style.left=left+"px";
        }else{
            this.imgNode.style.left="1200px";
        }
    };
    //初始化（组装）
    this.init=function () {
        this.imgNode.src = this.src;
        this.imgNode.style.left=x+"px";
        this.imgNode.style.top=y+"px";
        divGame.appendChild(this.imgNode);//将节点追加到divGame中
    };
    this.init();//直接在这里初始化
}
//碰撞（打怪兽）【升级】
function pengZhuangAll(arrMonster,arr){
    for (var i = 0;i<arrSpot.length;i++) {//取子弹
        var spotLeft = parseInt(arrSpot[i].imgNode.style.left);
        var spotTop = parseInt(arrSpot[i].imgNode.style.top);
        var spotWidth = arrSpot[i].imgNode.width;
        var spotHeight = arrSpot[i].imgNode.height;
        for (var j = 0; j<arrMonster.length; j++) {//取敌机
            var planeLeft = parseInt(arrMonster[j].imgNode.style.left);
            var planeTop = parseInt(arrMonster[j].imgNode.style.top);
            var planeWidth = arrMonster[j].imgNode.width;
            var planeHeight = arrMonster[j].imgNode.height;
            //判断：子弹比对飞机的范围
            if((spotLeft>(planeLeft-spotWidth)&&spotLeft<(planeLeft+planeWidth))
                && (spotTop>(planeTop-spotHeight)&&spotTop<(planeTop+planeHeight))
            ){
                //子弹与当前怪兽发生了碰撞
                arrMonster[j].bleed--;//血量-1

                //怪兽被击中
                if(arrMonster[j].bleed>1){
                    arrMonster[j].imgNode.src = arr[1];
                    arrMonster[j].isDead = false;//标记状态
                }else if(arrMonster[j].bleed == 1){
                    //1、怪兽
                    arrMonster[j].imgNode.src = arr[2];
                    arrMonster[j].isDead = false;//标记状态
                }else if(arrMonster[j].bleed == 0){
                    arrMonster[j].imgNode.src = arrDragonSpot[index];
                    arrMonster[j].isDead = true; //标记状态
                }
                //2、子弹消失
                divGame.removeChild(arrSpot[i].imgNode);
                arrSpot.splice(i, 1);
                i--;
                count = planeself.score++;//玩家飞机的积分
                //分数追加
                span1.innerHTML=count;
                break;//一颗子弹打一架飞机
            }
        }
    }
}
//怪兽与玩家的碰撞
function pengZhuangSelf2(arrMonster) {
    for (var j = 0;j<arrMonster.length;j++) {//取敌机
        var planeLeft = parseInt(arrMonster[j].imgNode.style.left);
        var planeTop = parseInt(arrMonster[j].imgNode.style.top);
        var planeWidth = arrMonster[j].imgNode.width;
        var planeHeight = arrMonster[j].imgNode.height;
        var selfLeft = parseInt(planeself.imgNode.style.left);
        var selfTop = parseInt(planeself.imgNode.style.top);
        var selfWidth = planeself.imgNode.width;
        var selfHeight = planeself.imgNode.height;
            //判断：子弹比对飞机的范围
            if((selfLeft>(planeLeft-selfWidth)&&selfLeft<(planeLeft+planeWidth))
                && (selfTop>(planeTop-selfHeight)&&selfTop<(planeTop+planeHeight))
            ){
                //子弹与当前怪兽发生了碰撞
                planeself.bleed--;//血量-1
                if(planeself.bleed==0) {
                    //1、飞机被击中
                    DBleed.imgNode.src ="img/ui/HP0.png";
                    planeself.imgNode.src ="img/enemy/boss/attackHit.gif";
                    planeself.isDead = true;//标记死亡状态
                    var img=planeself.imgNode.src ="img/dragon/dead/dead.gif";
                    setTimeout(img,2000);
                    zz.style.display="block";
                    over.style.display="block";
                    var span = document.createElement("span");
                    var txt = document.createTextNode(count);
                    span.appendChild(txt);
                    jf.appendChild(span);
                    pause();
                    // document.onkeydown=null;//不能操作玩家飞机
                }
                //2、怪兽消失
                divGame.removeChild(arrMonster[j].imgNode);
                arrMonster.splice(j,1);
                j--;
                break;//一颗子弹打一架飞机
            }
        }
    }
//玩家与宝箱
function boxBoom() {
    for (var j = 0;j<arrBox.length;j++) {//取敌机
        var planeLeft = parseInt(arrBox[j].imgNode.style.left);
        var planeTop = parseInt(arrBox[j].imgNode.style.top);
        var planeWidth = arrBox[j].imgNode.width;
        var planeHeight = arrBox[j].imgNode.height;
        var selfLeft = parseInt(planeself.imgNode.style.left);
        var selfTop = parseInt(planeself.imgNode.style.top);
        var selfWidth = planeself.imgNode.width;
        var selfHeight = planeself.imgNode.height;
        //判断：子弹比对飞机的范围
        if((selfLeft>(planeLeft-selfWidth)&&selfLeft<(planeLeft+planeWidth))
            && (selfTop>(planeTop-selfHeight)&&selfTop<(planeTop+planeHeight))
        ){
            //宝箱消失
            divGame.removeChild(arrBox[j].imgNode);
            arrBox.splice(j,1);
            j--;
            counta++;
            break;//一颗子弹打一架飞机
        }

    }
}
//宝箱条增加
function boxCount() {
    if(counta<=7){
        for(var i =0;i<=counta;i++){
            boom.src = "img/ui/boom/boom"+i+".png";
        }
    }else if(counta>7){
        boom.src="img/ui/boom/boom0.png";
        for(var j =counta;j>=0;j--){
            boom.src = "img/ui/boom/boom"+j+".png";
        }
    }
}
//回收（怪兽）
function huishou(arrMonster) {
    for(var i=0;i<arrMonster.length;i++){
        if(arrMonster[i].isDead){
            var m = parseInt(Math.random()*5);
            var lucky = 3;
            if(m==lucky){
                var x = parseInt(arrMonster[i].imgNode.style.left);
                var y = parseInt(arrMonster[i].imgNode.style.top);
                var box = new BoxPrototype(x,y,"img/enemy/thing.gif");
                arrBox.push(box);
            }
            divGame.removeChild(arrMonster[i].imgNode);
            arrMonster.splice(i,1);
        }
    }
}
//判断升级
function addclass() {
    if (span1.innerText >= 0 && span1.innerText <= 50) {
        index = 0;
    } else if (span1.innerText > 50 && span1.innerText <= 100) {
        index = 1;
    } else if (span1.innerText > 100 && span1.innerText <= 150) {
        index = 2;
    } else if (span1.innerText > 150 && span1.innerText <= 200) {
        index = 3;
    } else if (span1.innerText > 200) {
        index = 4;
    }
}
//创建玩家
function createDragon() {
    //0-1280[页面宽度]
    var x=195;
    var y=327;
    planeself = new dragonPrototype(x,y,dragonStand[index],30,2);
    DBleed = new dragonBleed(x+10,y-20,"img/ui/HPMAX.png",30);
}
//玩家的移动
function moveDragon() {
    if(planeself==undefined && DBleed==undefined){
        return;
    }
    if(toTop){
        planeself.moveUp();
        DBleed.moveUp();
    }
    if(toLeft){
        planeself.moveLeft();
        DBleed.moveLeft();
    }
    if(toRight){
        planeself.moveRight();
        DBleed.moveRight();
    }
    if(toBottom){
        planeself.moveDown();
        DBleed.moveDown();
    }
    //子弹发射
    if(toSpace){
        planeself.spot();
    }
    if(toEnter){
        daZhao(arrMonster1);
        daZhao(arrMonster2);
        daZhao(arrMonster3);
        daZhao(arrMonster4);
    }else{
        divGame.style.backgroundImage="url('img/bg.jpg')";
    }
}
//大招
function daZhao(arrMonster){
    if(counta>=5){//为实验方便，没设置7
        divGame.style.backgroundImage= "url('img/skill.gif')";
    }
    for(var i=0;i<arrMonster.length;i++){
            divGame.removeChild(arrMonster[i].imgNode);
            arrMonster.splice(i,1);
        }
}
//移动玩家子弹
function moveSpot() {
    for(var i=0;i<arrSpot.length;i++){
        var right=parseInt(arrSpot[i].imgNode.style.right);
        if(right==0){
            //删除子弹
            divGame.removeChild(arrSpot[i].imgNode);
            arrSpot.splice(i,1);
            i--;
        }else{
            arrSpot[i].move();
        }
    }
}
//定义事件，键盘
document.onkeydown=function(){
    var event=window.event||arguments[0];
    switch(event.keyCode){ //获取键盘操作
        case 37:toLeft=true;break;//改变变量，继续执行最初的循环，不让飞机停
        case 38:toTop=true;break;
        case 39:toRight=true;break;
        case 40:toBottom=true;break;
        case 32:toSpace=true;break;
        case 13:toEnter=true;break;
    }
};
document.onkeyup=function(){
    var event=window.event||arguments[0];
    switch(event.keyCode){
        case 37:toLeft=false;break;//让子弹停
        case 38:toTop=false;break;
        case 39:toRight=false;break;
        case 40:toBottom=false;break;
        case 32:toSpace=false;break;
        case 13:toEnter=false;break;
    }
};
//玩家的原型  prototype
function dragonPrototype(x,y,src,speed,bleed) {
    this.x =x;
    this.y = y;
    this.src = src;
    this.speed = speed;
    this.bleed =bleed;
    this.score =0;//积分从0开始
    this.imgNode = document.createElement("img");//方便后面操作，后面的移动就可以操作节点就可以了
    //子弹的方法
    this.spot=function () {
        planeself.imgNode.src=dragonMagic[index];
        var height =this.imgNode.style.height;
        var top = parseInt(this.imgNode.style.top);
        var left = parseInt(this.imgNode.style.left);
        var spotx=left+118;//飞机的X坐标+飞机宽度的一半-子弹宽度的一半
        var spoty=top+(height/2);//飞机的Y坐标-子弹高度-你要预留的空隙
        var spot= new spotPrototype(spotx,spoty,arrHitSpot[index],40);
        arrSpot.push(spot);//将创建的子弹保存到数组中
    };
    this.moveUp = function () {
        var top =(parseInt(this.imgNode.style.top)-this.speed);
        planeself.imgNode.src=dragonMove[index];
        if(top>0){
            this.imgNode.style.top=top+"px";
        }
    };
    this.moveDown = function () {
        var top =(parseInt(this.imgNode.style.top)+this.speed);
        planeself.imgNode.src=dragonMove[index];
        if(top<560){
            this.imgNode.style.top=top+"px";
        }
    };
    this.moveLeft = function () {
        var left =(parseInt(this.imgNode.style.left)-this.speed);
        planeself.imgNode.src=dragonMove[index];
        if(left>0){
            this.imgNode.style.left=left+"px";
        }
    };
    this.moveRight = function () {
        var left = (parseInt(this.imgNode.style.left) + this.speed);
        planeself.imgNode.src=dragonMove[index];
        if (left<1228) {
            this.imgNode.style.left = left + "px";
        }
    };
    //初始化
    this.init=function () {
        this.imgNode.src = this.src;
        this.imgNode.style.left=x+"px";
        this.imgNode.style.top=y+"px";
        divGame.appendChild(this.imgNode);//将节点追加到divGame中
    };
    this.init();
}
//玩家的子弹原型
function spotPrototype(x,y,src,speed) {
    this.x =x;
    this.y = y;
    this.src = src;
    this.speed = speed;
    this.imgNode = document.createElement("img");//方便后面操作，后面的移动就可以操作节点就可以了
    this.move = function () {
        var left =(parseInt(this.imgNode.style.left)+this.speed);
        if(left>=0){
            this.imgNode.style.left=left+"px";
        }else{
            this.imgNode.style.left="0px";
        }
    };
    //初始化（组装）
    this.init=function () {
        this.imgNode.src = this.src;
        this.imgNode.style.left=x+"px";
        this.imgNode.style.top=y+"px";
        divGame.appendChild(this.imgNode);//将节点追加到divGame中
    };
    this.init();//直接在这里初始化
}
//碰撞（玩家）
function pengZhuangSelf() {
    //Boss子弹相对于玩家去比较【小的来比大的】
    for(var i=0;i<arrSpot1.length;i++){//取子弹
        var spotLeft = parseInt(arrSpot1[i].imgNode.style.left);
        var spotTop = parseInt(arrSpot1[i].imgNode.style.top);
        var spotWidth = arrSpot1[i].imgNode.width;
        var spotHeight = arrSpot1[i].imgNode.height;
        //获取玩家飞机
        var planeLeft = parseInt(planeself.imgNode.style.left);
        var planeTop = parseInt(planeself.imgNode.style.top);
        var planeWidth = planeself.imgNode.width;
        var planeHeight = planeself.imgNode.height;
        //判断：子弹比对飞机的范围
        if((spotLeft>(planeLeft-spotWidth)&&spotLeft<(planeLeft+planeWidth))
            && (spotTop>(planeTop-spotHeight)&&spotTop<(planeTop+planeHeight))
        ){
            //子弹与玩家发生了碰撞
            planeself.bleed--;//血量-1
            if(planeself.bleed==0) {
                //1、飞机被击中
                planeself.imgNode.src ="img/enemy/boss/attackHit.gif";
                planeself.isDead = true;//标记死亡状态
                var img=planeself.imgNode.src ="img/dragon/dead/dead.gif";
                DBleed.imgNode.src ="img/ui/HP0.png";
                setTimeout(img,2000);
                zz.style.display="block";
                over.style.display="block";
                var span = document.createElement("span");
                var txt = document.createTextNode(count);
                span.appendChild(txt);
                jf.appendChild(span);
                pause();
                // document.onkeydown=null;//不能操作玩家飞机
            }
            //2、子弹消失
            divGame.removeChild(arrSpot1[i].imgNode);
            arrSpot1.splice(i,1);
            i--;
            break;//一颗子弹打一架飞机
        }
    }
    clearInterval(pengZhuangSelfTimer);
}
//玩家血量 prototype
function dragonBleed(x,y,src,speed) {
    this.x =x;
    this.y = y;
    this.src = src;
    this.speed = speed;
    this.imgNode = document.createElement("img");//方便后面操作，后面的移动就可以操作节点就可以了
    this.moveUp = function () {
        var top =(parseInt(this.imgNode.style.top)-this.speed);
        if(top>0){
            this.imgNode.style.top=top+"px";
        }
    };
    this.moveDown = function () {
        var top =(parseInt(this.imgNode.style.top)+this.speed);
        if(top<560){
            this.imgNode.style.top=top+"px";
        }
    };
    this.moveLeft = function () {
        var left =(parseInt(this.imgNode.style.left)-this.speed);
        if(left>0){
            this.imgNode.style.left=left+"px";
        }
    };
    this.moveRight = function () {
        var left = (parseInt(this.imgNode.style.left) + this.speed);
        if (left<1228) {
            this.imgNode.style.left = left + "px";
        }
    };
    //初始化（组装）
    this.init=function () {
        this.imgNode.src = this.src;
        this.imgNode.style.left=x+"px";
        this.imgNode.style.top=y+"px";
        divGame.appendChild(this.imgNode);//将节点追加到divGame中
    };
    this.init();//直接在这里初始化
}

