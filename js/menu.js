(function(){
    var divSwitch=$(".menu_switch");
    var ulNav=$(".menu_nav");
    // 切换菜单显示状态
    function toggleNav(){
        // 改变switch的样式
        // divSwitch.classList 获取元素的类样式列表
        divSwitch.classList.toggle("menu_switch--expand");
        ulNav.classList.toggle("menu_nav--expand")
    }
    divSwitch.onclick=toggleNav;
    
    // 监听到点击事件关闭
    ulNav.addEventListener("click",function(){
        toggleNav();
    })
})();