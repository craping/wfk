//一级导航列表
var fixedList = [];
var productList = [];
var urlData = UTIL.getUrlData();

$("#header").load("_template/header.html", function () {
    $("#clear-nav").css("height", $(".parent-fixed").height() + "px");

    var listArr = [{
        text: NAVI["公司简介"],
        href: "javascript:void(0)",
        menu: [{
            text: NAVI["关于我们"],
            href: "javascript:trackFn('about.html')"
        },
        {
            text: NAVI["发展"],
            href: "javascript:trackFn('development.html')"
        },
        /* {
            text: NAVI["技术优势"],
            href: "javascript:trackFn('header-innovate_creative','/cxkj/cxkj/')"
        }, */
        {
            text: NAVI["品牌"],
            href: "javascript:trackFn('brand.html')"
        }]
    }, {
        text: NAVI["产品中心"],
        href: "javascript:trackFn('products.html');",
        //二级
        menu: [{
            text: NAVI["显示和传感器件"],
            href: "javascript:void(0);",

            //三级
            menu: [{
                text: NAVI["笔记本液晶屏"],
                href: "javascript:void(0);"
            },
            {
                text: NAVI["工控液晶屏"],
                href: "javascript:void(0);"
            },
            {
                text: NAVI["安防液晶屏"],
                href: "javascript:void(0);"
            },
            {
                text: NAVI["监控液晶屏"],
                href: "javascript:void(0);"
            },
            {
                text: NAVI["医疗设备屏"],
                href: "javascript:void(0);"
            },
            {
                text: NAVI["广告机液晶屏"],
                href: "javascript:void(0);"
            }]
        }]
    }, {
        text: NAVI["新闻中心"],
        href: "javascript:trackFn('news.html')",
        menu: [{
            text: NAVI["公司新闻"],
            href: "javascript:trackFn('information.html?type=1')"
        },
        {
            text: NAVI["行业新闻"],
            href: "javascript:trackFn('information.html?type=2')"
        },
        {
            text: NAVI["社会热点"],
            href: "javascript:trackFn('information.html?type=3')"
        }]
    }];

    var obj2 = [
        //PC端地址
        {
            text: NAVI["WUFK商城"],
            href: "javascript:trackFn('')"
        },

        //手机端地址
        {
            text: NAVI["WUFK商城"],
            href: "javascript:trackFn('')"
        }
    ];

    //导航右上脚列表
    var navBar = [
        {
            text: NAVI["文档支持"],
            href: "javascript:trackFn('#')"
        },
        {
            text: NAVI["联系我们"],
            href: "javascript:trackFn('contact.html')"
        },
        {
            text: NAVI["加入我们"],
            href: "javascript:trackFn('join.html')"
        },
        {
            text: NAVI["多媒体"],
            href: "javascript:trackFn('#')"
        }
    ];

    //var obj2vm = new Vue({
    //    el:".nav-list1",
    //    data:{
    //        list:obj2
    //    }
    //})

    //768以上导航
    var vm = new Vue({
        el: ".list-navbar",
        data: {
            lang: urlData.lang,
            todos: listArr,
            list: obj2
        }
    });

    //手机端
    var xsVm = new Vue({
        el: ".list-navbar2",
        data: {
            lang: urlData.lang,
            todos: listArr,
            todoss: obj2,
            list: navBar,
            href: "index.html?lang="+(urlData.lang=="EN"?"CN":"EN"),
            text: NAVI["English"]
        }
    })
    /* Web.Method.ajax("product/getList", {
        success: function (data) {
            var product = {
                text: NAVI["产品中心"],
                href: "javascript:void(0);",
                //二级
                menu: [{
                    text: NAVI["显示和传感器件"],
                    href: "#",
                    //三级
                    menu: []
                }]
            };
            productList = data.info;
            for (let index = 0; index < productList.length; index++) {
                const item = productList[index];
                product.menu[0].menu.push({
                    text: urlData.lang == "EN"?item.productNameEn:item.productName,
                    href: "javascript:trackFn('product.html?lang="+urlData.lang+"&id="+item.id+"')"
                });
            }
            Vue.set(listArr, 1, product);
        },
        fail: function(){
            console.log("产品列表数据的读取fail");
        },
        error: function(){
            console.log("产品列表数据的读取error");
        }
    }); */

    //导航右上角
    var lgVm = new Vue({
        el: ".vue-navBar-right",
        data: {
            lang: urlData.lang,
            todos: navBar
        }
    });

    new Vue({
        el: "#lang",
        data: {
            href: "index.html?lang="+(urlData.lang=="EN"?"CN":"EN"),
            text: NAVI["English"]
        }
    });

    //    关于WUFK商城两套地址 PC
    var urlObj = $(".header-nav-last");
    urlObj.eq(2).addClass("hidden-lg hidden-md hidden-sm");

    //   mobile
    var xsUrlObj = $(".xs-mall");
    xsUrlObj.eq(1).addClass("hidden-sm hidden-xs");


    // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^    索顶导航    ^^^^^^^^^^

    fixedList.push(listArr[0].menu);//三个一级页

});


