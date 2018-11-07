
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