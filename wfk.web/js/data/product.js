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
        Web.Method.ajax("product/getInfoById", {
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
                    el: ".maxTableBox",
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

                var imgs = product.images.split(",");
                var todos = [];
                for (let i = 0; i < imgs.length; i++) {
                    const el = imgs[i];
                    todos.push({
                        imgSrc1: el,
                        imgSrc2: el,
                        href: "javascript:void(0);",
                        text: "",
                        text2: "",
                        text3: ""
                    });
                }
                var banner06 = new Vue({
                    el: ".mobile-banner",
                    data: {
                        todos: todos/* [{
                            imgSrc1: "http://portimg.boe.com/displayimages/f3c12438-8efc-4a18-9b5f-802d566a1d41.jpeg",
                            imgSrc2: "http://portimg.boe.com/displayimages/a85c6329-38b1-4adb-8f08-b0a9f54f0177.jpeg",
                            href: "javascript:void(0);",
                            text: "",
                            text2: "",
                            text3: ""
                        }] */
                    }
                });
                $('[data-toggle="tooltip"]').tooltip({
                    html:true
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