//概览
new Vue({
    el: "#map"
});
new Vue({
    el: "#fixed-nav",
    data:{
        todos:[{
            href:"javascript:trackFn('products.html')",
            text:NAVI["概览"]
        },{
            href:"javascript:trackFn('productList.html?type=1')",
            text:NAVI["笔记本液晶屏"]
        },{
            href:"javascript:trackFn('productList.html?type=2')",
            text:NAVI["工控液晶屏"]
        },{
            href:"javascript:trackFn('productList.html?type=3')",
            text:NAVI["安防液晶屏"]
        },{
            href:"javascript:trackFn('productList.html?type=4')",
            text:NAVI["监控液晶屏"]
        },{
            href:"javascript:trackFn('productList.html?type=5')",
            text:NAVI["医疗设备屏"]
        },{
            href:"javascript:trackFn('productList.html?type=6')",
            text:NAVI["广告机液晶屏"]
        }]
    }
});

$(function () {
    var urlData = UTIL.getUrlData();

    Web.Method.ajax("product/getList", {
        data:{
            app_type:1,
            page_flag:1,
            page_num:5
        },
        success: function (data) {
            console.log(data);
            var todos = [];
            for (let i = 0; i < data.info.length; i++) {
                const item = data.info[i];
                todos.push({
                    href: "javascript:trackFn('product.html?type=1&id="+item.id+"')",
                    text: urlData.lang == "EN"?item.productNameEn:item.productName
                });
            }

            var newCenter_data1 = new Vue({
                el: "#newCenter_data1",
                data: {
                    todos: todos
                }
            });
        },
        fail: function(){
            console.log("产品数据1读取fail");
        },
        error: function(){
            console.log("产品数据1读取error");
        }
    });

    Web.Method.ajax("product/getList", {
        data:{
            app_type:2,
            page_flag:1,
            page_num:5
        },
        success: function (data) {
            console.log(data);
            var todos = [];
            for (let i = 0; i < data.info.length; i++) {
                const item = data.info[i];
                todos.push({
                    href: "javascript:trackFn('product.html?type=2&id="+item.id+"')",
                    text: urlData.lang == "EN"?item.productNameEn:item.productName
                });
            }

            var newCenter_data2 = new Vue({
                el: "#newCenter_data2",
                data: {
                    todos: todos
                }
            });
        },
        fail: function(){
            console.log("产品数据2读取fail");
        },
        error: function(){
            console.log("产品数据2读取error");
        }
    });

    Web.Method.ajax("product/getList", {
        data:{
            app_type:3,
            page_flag:1,
            page_num:5
        },
        success: function (data) {
            console.log(data);
            var todos = [];
            for (let i = 0; i < data.info.length; i++) {
                const item = data.info[i];
                todos.push({
                    href: "javascript:trackFn('product.html?type=3&id="+item.id+"')",
                    text: urlData.lang == "EN"?item.productNameEn:item.productName
                });
            }

            var newCenter_data3 = new Vue({
                el: "#newCenter_data3",
                data: {
                    todos: todos
                }
            });
        },
        fail: function(){
            console.log("产品数据3读取fail");
        },
        error: function(){
            console.log("产品数据3读取error");
        }
    });

    Web.Method.ajax("product/getList", {
        data:{
            app_type:4,
            page_flag:1,
            page_num:5
        },
        success: function (data) {
            console.log(data);
            var todos = [];
            for (let i = 0; i < data.info.length; i++) {
                const item = data.info[i];
                todos.push({
                    href: "javascript:trackFn('product.html?type=4&id="+item.id+"')",
                    text: urlData.lang == "EN"?item.productNameEn:item.productName
                });
            }

            var newCenter_data3 = new Vue({
                el: "#newCenter_data4",
                data: {
                    todos: todos
                }
            });
        },
        fail: function(){
            console.log("产品数据4读取fail");
        },
        error: function(){
            console.log("产品数据4读取error");
        }
    });
    
    Web.Method.ajax("product/getList", {
        data:{
            app_type:5,
            page_flag:1,
            page_num:5
        },
        success: function (data) {
            console.log(data);
            var todos = [];
            for (let i = 0; i < data.info.length; i++) {
                const item = data.info[i];
                todos.push({
                    href: "javascript:trackFn('product.html?type=5&id="+item.id+"')",
                    text: urlData.lang == "EN"?item.productNameEn:item.productName
                });
            }

            var newCenter_data3 = new Vue({
                el: "#newCenter_data5",
                data: {
                    todos: todos
                }
            });
        },
        fail: function(){
            console.log("产品数据5读取fail");
        },
        error: function(){
            console.log("产品数据5读取error");
        }
    });

    Web.Method.ajax("product/getList", {
        data:{
            app_type:6,
            page_flag:1,
            page_num:5
        },
        success: function (data) {
            console.log(data);
            var todos = [];
            for (let i = 0; i < data.info.length; i++) {
                const item = data.info[i];
                todos.push({
                    href: "javascript:trackFn('product.html?type=6&id="+item.id+"')",
                    text: urlData.lang == "EN"?item.productNameEn:item.productName
                });
            }

            var newCenter_data3 = new Vue({
                el: "#newCenter_data6",
                data: {
                    todos: todos
                }
            });
        },
        fail: function(){
            console.log("产品数据6读取fail");
        },
        error: function(){
            console.log("产品数据6读取error");
        }
    });

    var rotationObj = $(".newCenterRotationBox");
    var t, time = 4000, rotationType = true;

    var w = function (obj) {

        for (var i = 0, len = obj.length; i < len; i++) {

            var li_w = obj.width();

            obj.eq(i).find("ul").css({
                "width": obj.eq(i).find("li").length * li_w + "px"
            });
            obj.eq(i).find("ul").find("li").css({
                "width": li_w + 'px'
            });
        }
    };

    new w(rotationObj);

    //左右按钮
    var leftObj = $(".rotationLeft");
    var rightObj = $(".rotationRight");

    //视频播放按钮
    var videoPlay = $(".videoPlay");

    //向左点击
    leftObj.click(function () {
        // if(rotationType){
        // rotationType = false;
        var box = $(this).parent(".newCenterRotationBox");
        box.find("ul").prepend(box.find("ul>li:last"));
        box.find("ul").css({
            "margin-left": -box.find("ul>li").eq(0).width() + "px"
        });
        box.find("ul").animate({
            "margin-left": "0"
        }, 500, function () {
            // rotationType = true;
        });
        // }
    });

    //向右点击
    rightObj.click(function () {

        // if(rotationType){
        // rotationType = false;

        var box = $(this).parent(".newCenterRotationBox");

        box.find("ul").animate({
            "margin-left": -box.find("li").eq(0).width() + "px"

        }, 500, function () {

            $(this).append($(this).find("li").eq(0));

            $(this).css({
                "margin-left": "0"
            });

            // rotationType = true;
        });
        // }
    });

    //自动轮播
    t = setInterval(function () {
        /*rightObj.click();*/
    }, time);

    //鼠标移上停止轮播，移走开始轮播
    rotationObj.mouseover(function () {
        clearInterval(t);
    }).mouseout(function () {
        t = setInterval(function () {
            rightObj.click();
        }, time);
    });

});

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
})