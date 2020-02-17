/**
 * BGM DELA/雨狸《驭风少年》
 * 本页面中有部分文字灵感来源于同作者相关歌词
 * 背景图P站Id：79337387
 * 以上资源（以及字体）均来自网络，作者不拥有所有权
 * 基于MIT协议开源，转载、使用，修改请保留此license
 * @licence MIT License
 * @author LainNetWork 2020-02-14
 * @description https://github.com/LainNetWork/stardust
 */

let width = 1200,height = 400,starNum = 999,stars = [];
let canvas,stage;
let msg = ("群星的光辉\n" +
    "少女的闪耀\n" +
    "Lain\n" +
    "这片宇宙中\n" +
    "最璀璨的\n" +
    "那片星河\n" +
    "跨越数亿光年\n" +
    "鼓动的心跳\n" +
    "终于...").split("\n");
let printMsg =
    "星光\n" +
    "跨越过被茜色晚霞灼热的天空\n" +
    "在无尽的夜幕上投下明媚永昼\n" +
    "细细星砂汇聚成明亮的满月\n" +
    "心中的潮水也被她吸引，化作漫天雨霖\n" +
    "月光融入划过天际温柔的细雨\n" +
    "在乐谱上敲下美妙诗音\n" +
    "我抬头望向被星光铺满的天空\n" +
    "星尘的碎屑中，看见了你的身影\n" +
    "点滴回忆汇聚成长久交织的梦\n" +
    "与现实交融，逐渐清晰\n" +
    "我终于伸手，指向辽阔苍穹\n" +
    "星光流转指尖，感受着你的温度\n" +
    "挣脱重力束缚的自由灵魂\n" +
    "飞翔，\n" +
    "——向着那炽热的星海\n" +
    "飞翔，\n" +
    "——旋律不再记录忧伤\n" +
    "飞翔，\n" +
    "——沐浴在这温柔的光\n" +
    "飞翔\n" +
    "向着你飞翔";
let btn;
let bgm;

/**
 * 播放最后的标题
 */
function printLastTitle(){
    let text = new createjs.Text("Lain，愿你星光永存。爱你","75px fz1","#fff");//Made By Rein 2020/02/14
    let text2 = new createjs.Text("Made By Rein  2020年2月14日","30px fz1","#fff");//
    text.shadow = new createjs.Shadow("#eee",0,0,5);
    text2.shadow = new createjs.Shadow("#eee",0,0,5);
    text.x = 200;
    text.y = 600;
    text2.x = 400;
    text2.y = 750;
    text.alpha = 0;
    text2.alpha = 0;
    createjs.Tween.get(text).wait(1000).to({alpha:1},1000);
    createjs.Tween.get(text2).wait(3000).to({alpha:1},1000);
    stage.addChild(text);
    stage.addChild(text2);
}



/**
 * 爱心落下动画
 */
function printLove() {
    let timeline = new createjs.Timeline({"onComplete":printLastTitle});
    let pos = getPoints("💕",0,300);
    for(let i in stars){
        let tween = createjs.Tween.get(stars[i]);
        if(i<pos.length){
            let position = pos[i];
            position.alpha = 1;
            tween.to(position,2000,createjs.Ease.backInOut);
        }else{
            tween.to(getRandomPos(),2000,createjs.Ease.backInOut);
        }
        timeline.addTween(tween);
    }
}


/**
 * 月亮上方轮播文本
 */
function writeText(){
    let pm = printMsg.split("\n");
    let count = 1;//同时渲染的文本条数
    let tweens = [];
    let timeline = new createjs.Timeline({"onComplete": printLove});
    for(let i = 0;i<count;i++){
        let text = new createjs.Text("","35px fz1","#fff");
        text.shadow = new createjs.Shadow("#eee",0,0,5);
        text.x = 0;
        text.y = 0;
        stage.addChild(text);
        let tween = createjs.Tween.get(text).wait(1000);

        tweens.push({text:text,tween:tween});
    }
    for(let i in pm){//要打印的文字
        //均分到各个tween上
        buildPrintMsgTween(tweens[i%count],pm[i],i);
    }
    tweens.forEach(t=>{
        timeline.addTween(t.tween);
    })

}

function buildPrintMsgTween(tween,msg,i){
    tween.tween.wait(i*100);//同时渲染多条文本时，确保文本出现顺序
    let prePos = getRandomPosByWH(0,width-500,height,height+400);
    tween.text.x = prePos.x;
    tween.text.y = prePos.y;
    let nowStr = "";
    for(let i = 0;i<msg.length;i++){
        nowStr += msg.charAt(i);
        tween.tween.wait(Math.random()*100+100).to({text:nowStr});
    }
    let pos = getRandomPosByWH(0,width-500,height,height+300);
    pos.text = "";
    tween.tween.wait(1000+i*100).to({alpha:0},500).to(pos).to({alpha:1});
}

function handleComplete() {
    for(let i2 in msg){
        let pos = getPoints(msg[i2],0,0);
        mass.push(pos);
    }
    document.getElementById("stageBox").style.display = "block";
    document.getElementById("preloadProgress").remove();
    canvas = document.getElementById("stage");
    stage = new createjs.Stage(canvas);//获取舞台
    //构建背景
    let image = resources.getResult("background");
    let background = new createjs.Bitmap(image);
    background.height = 200;
    stage.addChild(background);
    //构建按钮
    btn  = new createjs.Shape();
    btn.graphics.beginFill("#eedc1b").drawCircle(0,0,60);
    btn.x = 600;
    btn.y = 400;
    btn.shadow = new createjs.Shadow("#eedc1b",0,0,30);
    createjs.Tween.get(btn.shadow,{loop:true}).to({blur:60},2000).to({blur: 30},2000);
    stage.addChild(btn);
    //监听鼠标
    btn.addEventListener("click",function () {
        if(bgm == null){
            bgm = createjs.Sound.play("sound",{loop:true});
            createjs.Tween.get(btn,{loop:true}).to({scaleX:1.15,scaleY:1.15,override:false},1000,createjs.Ease.elasticIn)
                .to({scaleX:1,scaleY:1,override:false},1000,createjs.Ease.elasticIn);
            drawMsg();
        }else{
            if(bgm.paused == true){
                bgm.paused = false;
                createjs.Ticker.paused = false;
                // drawMsg()
            }else{
                bgm.paused = true;
                createjs.Ticker.paused = true;
            }
        }
    });
    for(let i = 0;i<starNum;i++){
        let star  = new createjs.Shape();
        star.compositeOperation = "lighter";
        star.graphics.beginFill("#eee").drawCircle(0,0,2);

        star.x = Math.floor(Math.random()*width);
        star.y = Math.floor(Math.random()*height);

        star.shadow = new createjs.Shadow("#eee",0,0,4);
        let num = Math.floor(Math.random()*999);
        if(num>0&&num<=99){//随机一部分星星加入闪烁特效
            createjs.Tween.get(star,{loop:true,override:false})
                .to({scaleX:1.5,scaleY:1.5,alpha:0.3},1000+Math.floor(Math.random()*500))
                .to({scaleX:1,scaleY:1,alpha:1},1000+Math.floor(Math.random()*500))
        }
        stage.addChild(star);
        stars.push(star)
    }
    createjs.Ticker.setFPS(60);//设置舞台帧数
    createjs.Ticker.addEventListener("tick",stage);
}
//获取随机坐标
function getRandomPos(){
    let pos =  getRandomPosByWH(0,width,0,height);
    pos.alpha = Math.random();
    return pos
}

function getRandomPosByWH(w0,w1,h0,h1) {
    let x = Math.random()*(w1-w0)+w0;
    let y = Math.random()*(h1-h0)+h0;
    let rePos = {x: Math.floor(x),y: Math.floor(y)};
    return rePos;
}
//打印消息
function drawMsg(){
    let timeline = new createjs.Timeline({"onComplete":()=>{

            //播放月亮下落的动画，然后变大
            createjs.Tween.get(btn,{loop:false,override:true}).to({y:1600,scaleX:12,scaleY:13},1500,createjs.Ease.backInOut)
            //星星打乱成星云
            for(let i in stars){
                createjs.Tween.get(stars[i],{loop:false}).to(getRandomPos(),3000,createjs.Ease.backInOut);
            }
            window.scrollTo(0,350);//感谢来自口袋君的建议
            writeText()//播放文字
        }});
    for(let i in stars){
        let tween = createjs.Tween.get(stars[i],{loop:false,override:false});
        for(let i3 in mass){
            let pos = mass[i3];
            if(i<pos.length){
                pos.alpha = 1;
                tween.to(pos[i],3000,createjs.Ease.circInOut).wait(1000);
            }else{
                tween.to(getRandomPos(),3000,createjs.Ease.circInOut).wait(1000);
            }
        }
        tween.wait(3000)
        timeline.addTween(tween)
    }
}
//打乱星星顺序
function random(poss){
    for(let i = 0;i<poss.length;i++){
        let pos = Math.floor((Math.random()*(poss.length - i))) + i;
        let temp = poss[pos];
        poss[pos] = poss[i];
        poss[i] = temp
    }
    return poss;
}


/**
 * 获取文字坐标，改自张鑫旭大佬的博文
 ** @author: zhangxinxu(.com) 2017-12-09
 ** @description: http://www.zhangxinxu.com/wordpress/?p=6594
 ** @licence: MIT licence
 *
 * @param msg
 * @param xp x方向偏移量
 * @param yp y方向偏移量
 * @returns {*}
 */
function getPoints(msg,xp,yp) {
    let canvas = document.createElement('canvas');
    let context = canvas.getContext('2d');

    canvas.width = width;
    canvas.height = height;

    context.fillStyle = 'white';
    context.textBaseline = 'middle';
    context.textAlign = 'center';
    context.font = 'bold 240px 微软雅黑';
    context.clearRect(0, 0, width, height);
    context.fillText(msg, width/2, height/2,width);
    let gap = 10;
    let imgData = context.getImageData(0,0,width,height).data;

    let pos = [];
    let x = 0, y = 0, index = 0;
    for (let i=0; i<imgData.length; i+=(4*gap)) {
        if (imgData[i+3] == 255) {
            pos.push({
                x: x + xp,
                y: y + yp
            });
        }
        index = Math.floor(i / 4);
        x = index % width;
        y = Math.floor(index / width);
        if (x >= width - gap) {
            i += gap * 4 * width;
        }
    }
    return random(pos);
};