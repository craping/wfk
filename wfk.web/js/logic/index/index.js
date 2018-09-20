
$(function(){

    /*设置自动轮播*/
    $("#myCarousel").carousel({
        interval:3000,
        pause:'hover'
    });
    $("#myCarouse2").carousel({
        interval:3000,
        pause:'hover'
    });


        $(".video-arc").click(function(){
            var index = $(this).parents(".item").index();
            var video = $("#myModal").find("video");
            //指定视频的src
            videoFocusBox.todos[index].startSrc = videoFocusBox.todos[index].videoSrc;
            video.css("display","none");
            video.eq(index).css("display","block");
        });


//    摸态框 index
    $('#myModal').on('shown.bs.modal', function () {
        $('#myInput').focus();
    });
//    摸态框关闭后视频停止播放 index
    $("#myModal").find(".close").click(function(){
        videoPause();
    });
    $("#myModal").click(function(){
        videoPause();
    });

    //视频暂停fn index
    function videoPause(){
        var ind = $(".modal-content").find("video");
        for(var i = 0;i<ind.length;i++){
            var type = ind.eq(i).css("display");
            if(type == "block"){
                ind[i].pause();
            }
        }
    }

    // 手势滑动
    setTimeout(function(){

        /*$("#myCarousel").swipeleft(function() {
            $(this).carousel('next');
        });
        $("#myCarousel").swiperight(function() {
            $(this).carousel('prev');
        });

        
        $("#myCarouse2").swipeleft(function() {
            $(this).carousel('next');
        });
        $("#myCarouse2").swiperight(function() {
            $(this).carousel('prev');
        });*/
        // 控制轮播小点的显示
        /*rotation("#myCarousel","#myCarouse2");*/
    },1000);

 // 控制轮播小点的显示
    //rotation("#myCarousel","#myCarouse2");
//关于贴边 media subscription sales xinhua-com
    // 联系我们 contact
    // BOE商城 mall
    // 多媒体中心 media/
    // 订阅公告 subscription/
    // 销售网络 sales/
    // 新华网 xinhua-com/
    //下载 down/
    $(window).load(function(){
    	setTimeout(function(){
	        pageFixedBlock(".contact");
	        pageFixedBlock(".mall");
    	},700)    
        heightFn(".Theight-box",".Theight-row",false);
        if(windW > 767){
          $(".index_newsList").css({
            "position":"absolute",
            "bottom":"10px"
          });
        }

        //隐藏贴边
        // 首页：index  
        // 产品与服务 product-service-page
        // 创新科技 innovate-page 
        // 投资者关系 investor-page 
        // 加入我们 join-page
        // 新闻中心 news-center-page
        // 关于我们 about-page
        // 多媒体中心 media-center-page
        setTimeout(function(){
        fixedModel("#product-service-page",
            "#innovate-page",
            "#investor-page",
            "#join-page",
            "#news-center-page",
            "#about-page",
            "#media-center-page"
        );
        },2000);
    });
    /* setTimeout(function(){
    	if(!window.PUBLIC){
        	EDIT.init("pic","video");
        };
    },100); */
});