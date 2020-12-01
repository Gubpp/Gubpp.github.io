// 有点不能避免勿让全局变量就用这种方法
var showPop=(function(){
/**弹出窗口
 * @param {*} id
 */
function showPop(id){
    var container=$('#'+id);
    container.style.display="";
    if(id==="popVideo"){
        var vdo=container.querySelector("video");
        vdo.play();
    }
}

// 获取所有按钮赋予关闭按钮事件
var closes=$$(".pop_close");
for(var i=0;i<closes.length;i++){
    closes[i].onclick=function(){
        var container=this.parentElement.parentElement;
        container.style.display="none";
    };
}

 var popWx=$(".pop_wx");
 var popQq=$(".pop_qq");
 popWx.onclick=function(){
    // classList.add添加类样式
    popWx.classList.add("selected");
    popQq.classList.remove("selected");
 }
 popQq.onclick=function(){
     popWx.classList.remove("selected");
     popQq.classList.add("selected");
    
 }
//处理视频弹窗关闭，视频暂停
var closeBtn=$("#popVideo .pop_close");
//为close增加事件，视频暂停，再次点开就继续播放
closeBtn.addEventListener("click",function(){
    $("#popVideo video").pause();
})
return showPop;
})();
