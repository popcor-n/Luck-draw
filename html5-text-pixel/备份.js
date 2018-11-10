var Names;
var input;
var Num = 0;
(function(){
    var t 
    var stage, textStage, form;
    var circles, textPixels, textFormed;
    var offsetX, offsetY, text;
    // var colors = ['#B2949D', '#FF5F8D', '#37A9CC', '#188EB2'];
    // var colors = ['#4cb4e7', '#ffc09f', '#ffee93', '#e2dbbe', '#a3a380'];
    // var colors = ['#6cc', '#cf6', '#F9c'];
    // var colors = ['#093','#06c','#f66']
    var colors = ['#eff','#fff','#eee']
    
    function init() {
        initStages();
        initForm();
        initText();
        initCircles();
        animate();
        addListeners();
    }

    // Init Canvas
    function initStages() {
        offsetX = (window.innerWidth-600)/2;
        offsetY = (window.innerHeight-400)/2;
        textStage = new createjs.Stage("text");
        textStage.canvas.width = 700;
        textStage.canvas.height = 300;

        stage = new createjs.Stage("stage");
        stage.canvas.width = window.innerWidth;3
        stage.canvas.height = window.innerHeight;
    }
    function initForm() {
        form = document.getElementById('form');
        form.style.top = offsetY+300+'px';
        form.style.left = offsetX+'px';
        input = '3G';
    }

    function initText() {
        text = new createjs.Text("t", "80px 'Source Sans Pro'", "#eee");
        text.textAlign = 'center';
        text.x = 300;
    }

    function initCircles() {
        circles = [];
        for(var i=0; i<600; i++) {
            var circle = new createjs.Shape();
            var r = 7;
            var x = window.innerWidth*Math.random();
            var y = window.innerHeight*Math.random();
            var color = colors[Math.floor(i%colors.length)];
            var alpha = 0.2 + Math.random()*0.5;
            circle.alpha = alpha;
            circle.radius = r;
            circle.graphics.beginFill(color).drawCircle(0, 0, r);
            circle.x = x;
            circle.y = y;
            circles.push(circle);
            stage.addChild(circle);
            circle.movement = 'float';
            tweenCircle(circle);
        }
    }


    // animating circles
    function animate() {
        stage.update();
        requestAnimationFrame(animate);
    }

    function tweenCircle(c, dir) {
        if(c.tween) c.tween.kill();
        if(dir == 'in') {


            c.tween = TweenLite.to(c, 0.4, {x: c.originX, y: c.originY, ease:Quad.easeInOut, alpha: 1, radius: 5, scaleX: 0.4, scaleY: 0.4, onComplete: function() {
                c.movement = 'jiggle';
                tweenCircle(c);
            }});
        } else if(dir == 'out') {
            c.tween = TweenLite.to(c, 0.8, {x: window.innerWidth*Math.random(), y: window.innerHeight*Math.random(), ease:Quad.easeInOut, alpha: 0.2 + Math.random()*0.5, scaleX: 1, scaleY: 1, onComplete: function() {
                c.movement = 'float';
                tweenCircle(c);
            }});
        } else {
            if(c.movement == 'float') {
                c.tween = TweenLite.to(c, 5 + Math.random()*3.5, {x: c.x + -100+Math.random()*200, y: c.y + -100+Math.random()*200, ease:Quad.easeInOut, alpha: 0.2 + Math.random()*0.5,
                    onComplete: function() {
                        tweenCircle(c);
                    }});
            } else {
                c.tween = TweenLite.to(c, 0.05, {x: c.originX + Math.random()*3, y: c.originY + Math.random()*3, ease:Quad.easeInOut,
                    onComplete: function() {
                        tweenCircle(c);
                    }});
            }
        }
    }

    function formText() {
        for(var i= 0, l=textPixels.length; i<l; i++) {
            circles[i].originX = offsetX + textPixels[i].x;
            circles[i].originY = offsetY + textPixels[i].y;
            tweenCircle(circles[i], 'in');
        }
        textFormed = true;
        if(textPixels.length < circles.length) {
            for(var j = textPixels.length; j<circles.length; j++) {
                circles[j].tween = TweenLite.to(circles[j], 0.4, {alpha: 0.1});
            }
        }
    }

    function explode() {
        for(var i= 0, l=textPixels.length; i<l; i++) {
            // tweenCircle(circles[i], 'out');            
            tweenCircle(circles[i], 'out');
            // tweenCircle(circles[i], 'out');
            
        }
        if(textPixels.length < circles.length) {
            for(var j = textPixels.length; j<circles.length; j++) {
                circles[j].tween = TweenLite.to(circles[j], 0.4, {alpha: 1});
            }
        }
    }

    // event handlers
    function addListeners() {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            if(textFormed) {
                explode();
                if(input != '') {
                    setTimeout(function() {
                        createText(input);
                    }, 1300);
                } else {
                    textFormed = false;
                }
            } else {
                createText(input);
            }

        });
    }

    function createText(input) {
        
        var fontSize = 400/(input.length);
     
        text.text = input;
        text.font = "1000 "+fontSize+"px 'Source Sans Pro'";
        text.textAlign = 'center';
        text.x = 300;
        text.y = (180-fontSize);
        textStage.addChild(text);
        textStage.update();

        var ctx = document.getElementById('text').getContext('2d');
        var pix = ctx.getImageData(0,0,600,200).data;
        textPixels = [];
        for (var i = pix.length; i >= 0; i -= 4) {
            if (pix[i] != 0) {
                var x = (i / 4) % 600;
                var y = Math.floor(Math.floor(i/600)/4);

                if((x && x%8 == 0) && (y && y%8 == 0)) textPixels.push({x: x, y: y});
            }
        }

        formText();

    }


    window.onload = function() { init() };
})();


String.addSpace=function(str){
                return str.split("").join(" ");
         }
function Choose(Names){
    var answer = Math.floor(Math.random()*Names.length);
    if(Names[answer].name.length == 2){
        Names[answer].name = String.addSpace(Names[answer].name)
    }else if((answer).length == 0){
        input = 'erro';
    } 
    var lucky = Names[answer].name;
    return(lucky);
    
}
//删除一个元素
function remove(arr, value) {
    var i = arr.length;
    while (i--) {
        if (arr[i].name === value) {
            return i;
        }
    }
    return false;
}

document.getElementById('ok').addEventListener('click',function(){
    if(Num != 0){
         input = Choose(Names);
         Names.splice(remove(Names,input),1);
    }Num =1;

});

var xhr  = new XMLHttpRequest();
xhr.onload = function(){
    var output = JSON.parse(xhr.responseText);
    Names = output.data;
}
 
xhr.open("GET","http://47.95.207.40:8088/signup/user/?key=Authorization&value=Basic eGl5b3UzZzp4aXlvdTNnZnoxNTUqKi8v");
xhr.send(null);

