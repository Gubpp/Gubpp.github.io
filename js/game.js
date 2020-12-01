(function(){
    var carouselData=[
        {
          image: "https://game.gtimg.cn/images/lolm/m/f_1.jpg",
        },
        {
          image: "https://game.gtimg.cn/images/lolm/m/f_2.jpg",
        },
        {
          image: "https://game.gtimg.cn/images/lolm/m/f_3.jpg",
        },
          {
          image: "https://game.gtimg.cn/images/lolm/m/f_4.jpg",
        },
          {
          image: "https://game.gtimg.cn/images/lolm/m/f_5.jpg",
        },
          {
          image: "https://game.gtimg.cn/images/lolm/m/f_6.jpg",
        },
      ];
      createCarousel("gameCarousel",carouselData);


      var container=$(".game_container");
      container.ontouchstart=function(e){
        // container.scrollTop为滚动条距窗口顶部的距离
          if(container.scrollTop>=10){
              console.log(container.scrollTop);
            e.stopPropagation();//阻止事件冒泡,防止页面滑动
          }
         
      };
})();
