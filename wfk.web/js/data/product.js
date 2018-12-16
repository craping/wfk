$(window).load(function () {
    setTimeout(function () {
        pageFixedBlock(".contact");
        pageFixedBlock(".mall");
        pageFixedBlock(".xinhua-com");
    }, 700)
    setTimeout(function () {
        fixedModel("#product-service-page",
            "#innovate-page",
            "#investor-page",
            "#join-page",
            "#news-center-page",
            "#about-page",
            "#media-center-page"
        );
    }, 2000)
});


$(function () {
    var urlData = UTIL.getUrlData();
    if(urlData.id){
        Web.Method.ajax("product/getInfo", {
            data:{
                id:urlData.id
            },
            success: function (data) {
                var product = data.info;

                new Vue({
                    el: "#map",
                    data:{
                        product:urlData.lang=="EN"?product.productNameEn:product.productName,
                        type:urlData.type,
                        href:"javascript:trackFn('productList.html?type="+urlData.type+"')",
                        map:["", "笔记本液晶屏", "工控液晶屏", "安防液晶屏", "监控液晶屏", "医疗设备屏", "广告机液晶屏"]
                    }
                });

                new Vue({
                    el: "#param",
                    data:{
                        lang:urlData.lang,
                        product:product
                    }
                });
                let length;
                let timer = setInterval(function(){
                    length = $(".borderTable td").length;
                    if(length != 1 && length % 2 !=0){
                        clearInterval(timer); 
                        $(".borderTable tr").append("<td width='50%' class='editable' style='word-break: break-all; display: inline-block;'>&nbsp;</td>")
                    }
                }, 100);

                var imgs = [], docs = [], iiss = [];
                for (let i = 0; i < product.fileList.length; i++) {
                    const el = product.fileList[i];
                    if (el.fileType == 1) {
                        docs.push({
                            text:el.fileUrl.substr(el.fileUrl.lastIndexOf("/")+1),
                            href:el.fileUrl
                        });
                    } else if (el.fileType == 2) {
                        iiss.push({
                            text:el.fileUrl.substr(el.fileUrl.lastIndexOf("/")+1),
                            href:el.fileUrl,
                            generalGrade:el.generalGrade
                        });
                    } else {
                        imgs = imgs.concat(el.fileUrl.split(","));
                    }
                }

                var todos = [];
                for (let i = 0; i < imgs.length; i++) {
                    const el = imgs[i];
                    var img = new Image();
                    img.src = el;
                    todos.push({
                        src: el
                    });
                }

                new Vue({
                    el: "#preview",
                    data: {
                        todos: todos
                    }
                });
                $("#preview ul").css("min-width", (todos.length*155)+"px");
                
                $("#preview li").hover(function(){
                    $("#preview li").removeClass("active");
                    $(this).addClass("active");
                });

                $("#preview li").click(function(){
                    var options = {
                        index: $(this).index()
                    };
                    var items = [];
                    $("#preview li img").each(function(){
                        items.push({
                            src:this.src,
                            w:this.naturalWidth,
                            h:this.naturalHeight
                        });
                    });

                    var gallery = new PhotoSwipe($('.pswp')[0], PhotoSwipeUI_Default, items, options);
                    gallery.init();
                });

                $('[data-toggle="tooltip"]').tooltip({
                    html:true
                });

                
                new Vue({
                    el: "#context",
                    data: {
                        content: product.content
                    }
                });
                new Vue({
                    el: "#doc",
                    data: {
                        todos: docs
                    }
                });
                new Vue({
                    el: "#iis",
                    data: {
                        todos: iiss
                    }
                });
                setTimeout(function(){
                    advertRotation();
                }, 100);
            },
            fail: function (error) {
                console.log("产品参数数据的读取error");
            },
            error: function (error) {
                console.log("产品参数数据的读取error");
            }
        });
    }

    if (windW < 767) {
        var type = true;
        // 鼠标滚轮事件（隐藏点出来的弹层）

        $(window).scroll(function () {
            var tableTop = $(".maxTableBox").offset().top - $(window).scrollTop();
            if (tableTop < 400 && type) {
                $(".prompt").css({
                    "opacity": "1",
                    "top": "60px"
                });
                setTimeout(function () {
                    $(".prompt").css({
                        "opacity": "0",
                        "top": "-40px"
                    });
                    type = false;
                }, 3000);
            }
        })
    }
});