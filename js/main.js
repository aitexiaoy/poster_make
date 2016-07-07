/**
 * Created by gecat on 2016/7/7.
 */

//定义图片src，以及图片实际大小与显示大小的比值
var Img_src, Img_ratio;

var close_width, close_height, close_left, close_top, close_offsetLeft, close_offsetTop;

var rightDiv = document.getElementById('right');
var upDiv = document.getElementById('up');
var leftDiv = document.getElementById('left');
var downDiv = document.getElementById('down');
var left_upDiv = document.getElementById('leftUp');
var left_downDiv = document.getElementById('leftDown');
var right_upDiv = document.getElementById('rightUp');
var right_downDiv = document.getElementById('rightDown');
var mainDiv = document.getElementById('clipMain');
var boxDiv = document.getElementById('img_watch');
var ifKeyDown = false;
//表示被按下的触点
var contact = "";

//取消图片被选中
document.onselectstart = new Function('event.returnValue=false');
//实现拖动
$('#clipMain').draggable({containment: 'parent', drag: setChoice()});
//鼠标按下事件
rightDiv.onmousedown = function (e) {
    //阻止事件冒泡
    e.stopPropagation();
    ifKeyDown = true;
    contact = "right";
};

upDiv.onmousedown = function (e) {
    e.stopPropagation();
    ifKeyDown = true;
    contact = "up";
};

leftDiv.onmousedown = function (e) {
    e.stopPropagation();
    ifKeyDown = true;
    contact = "left";
};

downDiv.onmousedown = function (e) {
    e.stopPropagation();
    ifKeyDown = true;
    contact = "down";
};
left_upDiv.onmousedown = function (e) {
    e.stopPropagation();
    ifKeyDown = true;
    contact = "left_up";
};
left_downDiv.onmousedown = function (e) {
    e.stopPropagation();
    ifKeyDown = true;
    contact = "left_down";
};
right_upDiv.onmousedown = function (e) {
    e.stopPropagation();
    ifKeyDown = true;
    contact = "right_up";
}
right_downDiv.onmousedown = function (e) {
    e.stopPropagation();
    ifKeyDown = true;
    contact = "right_down";
};
//鼠标松
window.onmouseup = function () {
    ifKeyDown = false;
    contact = "";
};

//鼠标移动事件
window.onmousemove = function (e) {
    if (ifKeyDown) {
        switch (contact) {
            case "right" :
                rightMove(e);
                break;
//                case "left" :
//                    leftMove(e);
//                    break;
//                case "up" :
//                    upMove(e);
//                    break;
            case "down":
                downMove(e);
                break;
//                case "left_up":
//                    leftMove(e);
//                    upMove(e);
//                    break;
//                case  "left_down":
//                    leftMove(e);
//                    downMove(e);
//                    break;
//                case "right_up":
//                    rightMove(e);
//                    upMove(e);
//                    break;
            case  "right_down":
                rightMove(e);
                downMove(e);
                break;
        }
    }
    setChoice();
//        setPreview();
};

function rightMove(e) {
    var x = e.clientX;
    var $main = $('#clipMain');
    var $img_watch = $('#img_watch');
    if (x >= $img_watch.offset().left + $img_watch.width()) {
        x = $img_watch.offset().left + $img_watch.width();
    }
    //获得框的宽度
    var widthBefore = $main.innerWidth();
    var addWidth = x - $main.offset().left - widthBefore;
    var new_width = addWidth + widthBefore;
    var new_height = new_width * 1.666666667;

    if (new_height > $img_watch.innerHeight() - $main.position().top) {
        new_height = $img_watch.innerHeight() - $main.position().top;
        new_width = new_height / 1.66666667;
    }
    $main.css({
        "width": new_width + 'px',
        "height": new_height + 'px'
    });

//        console.log('left:' + $('#img_watch').offset().left);
//        console.log('width:' + $('#img_watch').width());
//        console.log('x:' + x);
}

function leftMove(e) {
    var x = e.clientX;
    var $main = $('#clipMain');
    var $img_watch = $('#img_watch');
    if (x <= $img_watch.offset().left) {
        x = $img_watch.offset().left;
    }
    var widthBefore = $main.innerWidth();
    var mainOffsetLeft = $main.offset().left;
    var addWidth = mainOffsetLeft - x;
    var new_width = addWidth + widthBefore;
    var new_height = new_width * 1.666666667;
    var new_left = mainOffsetLeft - addWidth;

    if (new_height > $img_watch.innerHeight() - $main.position().top) {
        new_height = $img_watch.innerHeight() - $main.position().top;
        new_width = new_height / 1.66666667;
    }
    $main.css({
        "width": new_width + 'px',
        "height": new_height + 'px',
        "left": new_left + 'px'
    });
    console.log('x:' + x);
    console.log('addWidth:' + addWidth);
    console.log("left:" + ($main.innerWidth() - x - $('#img_watch').offset().left));
}

function downMove(e) {
    var y = e.clientY;
    var $main = $('#clipMain');
    var $img_watch = $('#img_watch');
    if (y > $img_watch.offset().top + $img_watch.innerHeight()) {
        y = $img_watch.offset().top + $img_watch.innerHeight();
    }
    var heightBefore = $main.innerHeight();
    var addHeight = y - $main.offset().top - heightBefore;
    var new_height = heightBefore + addHeight;
    var new_width = new_height / 1.66666667;
    $main.css({
        "width": new_width + 'px',
        "height": new_height + 'px'
    });
//        console.log(y);
//        console.log($main.offset().top);
//        console.log($('#img_watch').innerHeight());
//        console.log($('#img_watch').offset().top);
}


function upMove(e) {
    var y = e.clientY;
    var $main = $('#clipMain');
    var $img_watch = $('#img_watch');
    if (y < $img_watch.offset().top) {
        y = $img_watch.offset().top;
    }

    var heightBefore = $main.innerHeight();
    var mainOffsetTop = $main.offset().top;
    var addHeight = mainOffsetTop - y;
    var new_height = heightBefore + addHeight;
    var new_width = new_height / 1.66666667;
    var new_top = mainOffsetTop - addHeight;
    $main.css({
        "width": new_width + 'px',
        "height": new_height + 'px',
        "top": new_top + 'px'
    });
}


//设置选取区域高亮可见
function setChoice() {
    var top = mainDiv.offsetTop;
    var right = mainDiv.offsetLeft + mainDiv.offsetWidth;
    var bottom = mainDiv.offsetTop + mainDiv.offsetHeight;
    var left = mainDiv.offsetLeft;
    var img2 = document.getElementById('img2');
    img2.style.clip = "rect(" + top + "px," + right + "px," + bottom + "px," + left + "px" + ")";
}


//新建一个canvas，将图片复制到canvas中
function copyImg(width, height, left, top, offsetLeft, offsetTop) {

    //ratio为图像实际尺寸与缩放之后的比值，ratio=图片实际宽度/显示宽度
    var ratio = Img_ratio;


    //图片缩放倍数
    var big_image = 1;


    //获取输入的文字内容
    var want1 = $('#want1').val();
    var want2 = $('#want2').val();
    var want3 = $('#want3').val();
    var want4 = $('#want4').val();
    var want5 = $('#want5').val();


    var canvas = document.getElementById('canvas');
    canvas.width = offsetLeft * big_image;
    canvas.height = offsetTop * big_image;
    var context = canvas.getContext("2d");
    //清空画布
    context.clearRect(0, 0, offsetLeft, offsetTop);
    //设置图层混合模式
    context.globalCompositeOperation = "normal";
    var img = new Image();
    img.src = Img_src;
    var text = [want1, want2, want3, want4, want5];
    var text_left = 20;
    var text_height = 450;
    var img2 = new Image();
    img2.src = "img/header.png";
    img2.onload = function () {
        context.drawImage(img2, 30, 50);
    };

    draw_Img(context, img, width, height, left, top, offsetLeft, offsetTop, ratio, big_image, text, text_left, text_height);
//        draw_text(context, text, img, width, height, left, top, offsetLeft, offsetTop, ratio, big_image);
}


function copyImg_btn() {
    var width;
    var height;
    var left = close_left;
    var top = close_top;
    var offsetLeft = close_offsetLeft;
    var offsetTop = close_offsetTop;
    //实际显示的宽度
    var width_right_css = $('#content_right').innerWidth();
    var height_right_css = $('#content_right').innerHeight();
    var css_ratio = width_right_css / offsetLeft;
    width = offsetLeft;
    height = offsetTop;
    offsetTop = height_right_css;
    offsetLeft = width_right_css;
    console.log(width, height, width_right_css, offsetLeft, offsetTop);

    copyImg(width, height, left, top, offsetLeft, offsetTop);
//        console.log(close_width, close_height, close_left, close_top, close_offsetLeft, close_offsetTop);
//        close_width = close_height = close_left = close_top = close_offsetLeft = close_offsetTop = null;
}

function close_Img() {
    var $Img_watch = $('#img_watch');
    var $Main = $('#clipMain');
    close_width = $Img_watch.innerWidth();
    close_height = $Img_watch.innerHeight();
    close_left = $Main.position().left;
    close_top = $Main.position().top;
    close_offsetLeft = $Main.innerWidth();
    close_offsetTop = $Main.innerHeight();
    $('#img_edit').hide();
}

//画图
function draw_Img(context, img, width, height, left, top, offsetLeft, offsetTop, ratio, big_image, text, text_left, text_height) {
    img.onload = function () {
        context.drawImage(img, left * ratio, top * ratio, width * ratio, height * ratio, 0, 0, offsetLeft * big_image, offsetTop * big_image);
        //像素处理
        var imageData = context.getImageData(0, 0, offsetLeft * big_image, offsetTop * big_image);
        var data = imageData.data;
        //灰度处理
        for (var i = 0, length = data.length; i < length; i += 4) {
            var average = (data[i] + data[i + 1] + data[i + 2]) / 3;
            data[i] = average;
            data[i + 1] = average;
            data[i + 2] = average;
        }
        context.putImageData(imageData, 0, 0);

        draw_text(context, text, text_left, text_height);
        save_Img();
    }
}

//画文字
function draw_text(context, text, text_left, text_height) {
    context.font = " 30px 微软雅黑";
    //垂直对齐方式
    context.fillStyle = "red";
    context.textBaseline = "top";
    //水平对齐方式
    context.textAlign = "start";
    text_left == undefined ? text_left = 0 : text_left;
    text_height == undefined ? text_height = 0 : text_height;
    for (var i = 0, length = text.length; i < length; i++) {
        context.fillText(text[i], text_left, text_height);
        text_height += 40;
    }
}
//保存图片
function save_Img() {
    var download = document.getElementById('download_btn');
    var result = document.getElementById('result');
    result.innerHTML = '<a download href="' + canvas.toDataURL("image/jpeg") + '"target_blank" class="download" id="download">保存到本地</a>';
    $("#download").css({
        "display": "block",
        "width": "100px",
        "height": "30px",
        "text-align": "center",
        "background-color": "#e6e6e6",
        "color": "#f28000",
        "text-decoration": "none",
        "line-height": "30px"
    });

}

//绘制矩形裁剪区域
function createClip(context, x, y, offsetX, offsetY) {
    context.beginPath();
    context.rect(x, y, offsetX, offsetY);
    context.closePath();
    context.clip();
    console.log(x, y, offsetX, offsetY);
}

//读取图像处理
function readImg() {
    var imgFile = document.getElementById('imgFile').files[0];
    console.log(imgFile.type);
    if (!/image\/w*/i.test(imgFile.type)) {
        alert("请选择文件类型为图像");
        return false;
    }
    var reader = new FileReader();
    var img = new Image();
    var img_width, img_height, css_width = 900;
    //将文件转成Data URL形式
    reader.readAsDataURL(imgFile);
    reader.onload = function (e) {
        Img_src = this.result;
        img.src = Img_src;
        img_width = img.width;
        img_height = img.height;
        Img_ratio = img_width / css_width;

        $('#img_edit').css({
            "height": img_height / Img_ratio,
            "display": "block"
        });
        $('#img_watch').css({
            "width": css_width,
            "height": img_height / Img_ratio
        });
        $('#clipMain').css({
            "height": img_height / Img_ratio - 2,
            "width": ( img_height / Img_ratio - 2) / 1.66666667,
            "top": 0,
            "left": css_width - (img_height / Img_ratio - 2) / 0.8333333335
        });
        console.log(img.width, img.height);
        $("#img1").attr("src", Img_src);
        $("#img2").attr("src", Img_src);
        console.log(Img_src);
    };
}