// 全局通用的一些函数或一开始要执行的全局代码
// 封装一个选择器功能，函数名为$
function $(selector){
    return document.querySelector(selector);
}
function $$(selector){
    return document.querySelectorAll(selector);
}
// 获取视口高宽
function width(){
    return document.documentElement.clientWidth;
}
function heigth(){
    return document.documentElement.clientHeight;
}

//创建整个轮播图
function createCarousel(carouselId,datas){
//获取整个轮播图容器
var container=document.getElementById(carouselId);
//根据容器去获取里面的.g_carousel_list
//为什么不用$方法，应该会获取到多个,第三页也有这个样式
var carouselList=container.querySelector(".g_carousel_list");
var indicator=container.querySelector(".g_carousel-indictor");
var prev=container.querySelector(".g_carousel-prev");
var next=container.querySelector(".g_carousel-next");

var curIndex=0;
/**
 * 创建轮播图里子元素
 */
function creatCarouselElements(){
    var listHtml=""; // 轮播图列表内部的html
    var indHtml=""; //指示器内部html
    for(var i=0;i<datas.length;i++){
        var data=datas[i];
        if(data.link){
            listHtml+=`
        <li>
            <a href="${data.link}" target="_blank">
                <img src="${data.image}">
            </a>
        </li>`;
        }else{
            listHtml+=`
        <li>
            <img src="${data.image}">
        </li>`;
        } 
        indHtml+=`<li></li>`;
    }
    //根据数组长度设置总width
    carouselList.style.width=`${datas.length}00%`;
    carouselList.innerHTML=listHtml;
    indicator.innerHTML=indHtml;
};
creatCarouselElements();

//根据轮播图目前索引，设置正确位置

function setStatus(){
    carouselList.style.marginLeft=-curIndex*width()+"px";
    // 设置指示器状态
    // 取消之前的selected
    var beforeSelected = indicator.querySelector(".selected");
    if (beforeSelected) {
    beforeSelected.classList.remove("selected");
    }
    indicator.children[curIndex].classList.add("selected");
    // 处理之前和之后
    if (prev) {
        if (curIndex === 0) {
        // 目前是第一张图
        prev.classList.add("disabled"); // 不可用样式
        } else {
        prev.classList.remove("disabled"); // 不可用样式
        }
    }

    if (next) {
        if (curIndex === datas.length - 1) {
        // 目前是最后一张张图
        next.classList.add("disabled"); // 不可用样式
        } else {
        next.classList.remove("disabled"); // 不可用样式
        }
    }
}

setStatus();

function toPrev(){
    if(curIndex===0){
        return;
    }
    curIndex--;
    setStatus();
}
function toNext(){
    if(curIndex===datas.length-1){
        return;
    }
    curIndex++;
    setStatus();
}


var timer=null;//自动切换的计时器id
//开始自动切换
function start(){
    if(timer){
        //已经在切换了
        return;
    }
    timer=setInterval(function(){
        curIndex++;
        if(curIndex===datas.length){
            curIndex=0;
        }
        setStatus();
    },2000)
}
//停止自动切换
function stop(){
    clearInterval(timer);
    timer=null;
}
start();

//往前往后事件
if(prev){
    prev.onclick=toPrev;
}
if(next){
    next.onclick=toNext;
}

container.ontouchstart=function(e){
    e.stopPropagation(); // 阻止事件冒泡
    var x = e.touches[0].clientX; // 记录按下横坐标
    // 停止自动播放
    stop();
    // 去掉过渡效果
    carouselList.style.transition = "none";
    var pressTime = Date.now(); // 手指按下的时间
    // 监听移动事件
    container.ontouchmove = function (e) {
    var dis = e.touches[0].clientX - x; // 计算拖动的距离
    carouselList.style.marginLeft = -curIndex * width() + dis + "px";
    };

    //放手
    container.ontouchend=function(e){
        var dis = e.changedTouches[0].clientX - x;//这里注意！！！！！！！
        start();
        //还原过渡效果
        carouselList.style.transition="";
        //不在监听手指移动
        container.ontouchmove=null;
        var duration = Date.now() - pressTime; // 滑动的时间
        if (duration < 300) {
            if (dis > 20 && curIndex > 0) {
            // 300毫秒内快速的向右滑动了至少20像素
            toPrev();
            } else if (dis < -20 && curIndex < datas.length - 1) {
            // 300毫秒内快速的向左滑动了至少20像素
            toNext();
            } else {
            setStatus();
            }   
        } else {
            // 改动curIndex
            if (dis < -width() / 2 && curIndex < datas.length - 1) {
            toNext();
            } else if (dis > width() / 2 && curIndex > 0) {
            toPrev();
            } else {
            setStatus();
            }
        }
    };
}
}

//ajax请求
async function ajax(url) {
    var reg = /http[s]?:\/\/[^/]+/;
    var matches = url.match(reg);
    if (matches.length === 0) {
      throw new Error("invalid url");
    }
    var target = matches[0];
    var path = url.replace(reg, "");
    return await fetch(`https://proxy.yuanjin.tech${path}`, {
      headers: {
        target,
      },
    }).then((r) => r.json());
  }