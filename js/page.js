var showPage=(function(){
    var pageIndex=0;
    var pages=$$(".page_container .page");
    var nextIndex=null;  //下一个页面的索引
    /**
     * 设置静止状态的样式
     */

    function setStatic(){
        // 静止状态下没有下一个页面
        nextIndex=null;
        for(var i=0;i<pages.length;i++){
            // 每个页面都去设置
            var page=pages[i];
            // 判断是不是当前显示页面
            if(i===pageIndex){
                // 判断是则设置zIndex为1，其他为10
                page.style.zIndex=1;
            }else{
                page.style.zIndex=10;
            }
            // 设置每页位置
        page.style.top=(i-pageIndex)*heigth()+"px";
        }
    }
    setStatic();

    /**
     * 移动中
     * @param {*} dis移动的偏移量（相对正确位置） 
     */
    function moving(dis){
        for(var i=0;i<pages.length;i++){
            // 每个页面都去设置
            var page=pages[i];
            // 判断是不是当前显示页面
            if(i!==pageIndex){
                // 如果不是当前显示页面（因为当前页面是不能动的）
                page.style.top=(i-pageIndex)*heigth()+dis+"px";
            }
        }
        if(dis>0 && pageIndex>0){
            // 往下移动中，且目前页面不为第一页
            nextIndex=pageIndex-1;
        }else if(dis<0 && pageIndex<pages.length-1){
            // 往上移动中，且目前页面不为最后一页
            nextIndex=pageIndex+1;
        }
        else{
            nextIndex=null;
        }
    }

    /**
     * 移动完成
     * 
     */
    function finishMove(){
        // 如果nextIndex=null,则说明都不做
        if(nextIndex===null){
            setStatic(); //复位
            return;
        }
        // 如果nextIndex有值，则设置下一个页面的top为0
        var nextPage=pages[nextIndex];
        nextPage.style.transition=".5s";
        nextPage.style.top="0";
            // 当页面变化完成，重置
            setTimeout(function(){
            // 当前页面索引值变为刚刚变化完成索引值
            pageIndex=nextIndex;
            // 执行页面静态函数，重新赋值zIndex等
            setStatic();
            nextPage.style.transition="";
        },500)
    }


    //事件
    var pageContainer=$(".page_container");
    //事件监听，手指触屏
    pageContainer.ontouchstart=function(e){
        // 获取手指触碰地方的垂直坐标
        var y=e.touches[0].clientY
        //事件监听，手指移动

        function handler(e) {
            var dis = e.touches[0].clientY - y;
            if (Math.abs(dis) < 20) {
                // 防止误触
                dis = 0; // 相当于手指没动
            }
            moving(dis);
            // 阻止事件的默认行为
            if (e.cancelable) {
                // 如果事件可以取消
                e.preventDefault(); // 取消事件 - 阻止默认行为
            }
        }

        //阻止浏览器默认行为
        pageContainer.addEventListener("touchmove", handler, {
            passive: false,
          });


        //事件监听，手指移开
        pageContainer.ontouchend=function(){
            finishMove();
            //重置
            pageContainer.removeEventListener("touchmove", handler);
        }
    };



    //自动切换到某个页面
    function showPage(index){
        var nextPage=pages[index];
        if(nextIndex<pageIndex){
            nextPage.style.top=-heigth()+"px";
        }else if(nextIndex>pageIndex){
            nextPage.style.top=heigth()+"px";
        }else{  //如果当前页是第一页
            if(pageIndex===0){
                pageIndex++;   //先设置为第二个页面 
            }else{
                pageIndex--;
            }
            setStatic(); 
        }
        //强行让浏览器渲染
        nextPage.clientHeight; //读取dom的尺寸和位置，会导致浏览器强行渲染
        nextIndex=index; //设置下个页面索引
        finishMove();
    }
    return showPage;
})();

