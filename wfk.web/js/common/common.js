//common
var windW = document.documentElement.clientWidth || document.body.clientWidth || window.innerWidth;
/*if(windW <= 767 ){
    document.getElementsByTagName('meta')[1].setAttribute('content', 'width=1300px, user-scalable=yes, minimum-scale=0');  
    setInterval(function(){
        $(".path").css("display","block");
        $(".share").css("display","none");
        $("#downWUFKgw").css("display","none");
    },10);
    
};*/

$(function () {

    //手机端设置概览左右滑动
    function previewFn(parentBoxObj) {

        var preview = $(parentBoxObj);
        var childUl = preview.find("ul");
        var childLi = childUl.find("li");
        var ulW = 0;
        for (var i = 0, len = childLi.length; i < len; i++) {
            ulW = ulW + childLi.eq(i).width() + 35;
        }
        childUl.eq(0).css("width", ulW + "px");
    }
    if (windW < 767) {
        previewFn(".preview");
    }

    //提示动画
    var scrollType = true;
    $(window).scroll(function () {
        var pageObj = $(".preview");
        if (windW < 767 && pageObj.length > 0) {
            var scrollTop = $(window).scrollTop();
            var objOffsetTop = $(".preview").offset().top;

            var previewW = $(".preview").eq(0).width();
            var childUlW = $(".preview").find("ul").eq(0).width();
            var ifW = childUlW - previewW;

            console.log(previewW + "   " + childUlW)

            // console.log(objOffsetTop +""+ scrollTop);
            //滚动到接近便捷导航时
            if (scrollTop >= objOffsetTop - 280 && scrollType) {
                scrollType = false;
                $(".preview").find("ul").eq(0).animate({ "margin-left": - ifW + "px" }, 600);
                setTimeout(function () {
                    $(".preview").find("ul").eq(0).animate({ "margin-left": "0" }, 300);
                }, 700)
            }
        }
    });

    //    延迟加载
    setTimeout(function () {
        //二维码的left common

        $(".wx-code").css("left", $(".weixin-box").find("span").offset().left - 10 + "px");

        //底部微信二维码 common
        $(".xin-icon").mouseover(function () {
            $(".wx").css("display", "block");
        }).mouseout(function () {
            $(".wx").css("display", "none");
        });
        //领英
        $(".yl-icon").mouseover(function () {
            $(".yl").css("display", "block");
        }).mouseout(function () {
            $(".yl").css("display", "none");
        });



        // 二级菜单上下滑动开关 common
        // var slidType = true;

        $(window).resize(function () {
            navHover();

            imgH();

            windW = document.documentElement.clientWidth || document.body.clientWidth || window.innerWidth;

            //二维码的left common
            $(".wx").css("left", $(".weixin-box").find("a").eq(0).offset().left - 8 + "px");

            //common
            $("#clear-nav").css({ "height": $(".parent-fixed").height() + "px", "background": "rgba(0,0,0,0)" });
        });
        $(window).resize()
        //头部导航common
        $(".nav-list1-hover").mouseenter(function () {
            // if(slidType){
            // slidType = false;
            var eleLeft = $(this).offset().left;//获取元素距离浏览器左侧的距离
            $(this).css({ "z-index": "100" });
            $(this).find(".container-fluid").css({ "left": -eleLeft + "px" });
            $(this).find(".container-fluid").filter(':not(:animated)').slideDown(350);
            // setTimeout(function(){
            // slidType = true;
            // },600);
            // }
        })
            .mouseleave(function () {
                $(this).find(".container-fluid").slideUp(350);
                $(this).css({ "z-index": "98" });

            });

        //三级菜单上下滑动 common
        $(".nav-menu-list").mouseenter(function () {

            $(this).css("z-index", "99");

            $(".nav-menu-list").find($(".nav-menu-menu")).css("display", "none");

            $(this).find($(".nav-menu-menu")).css({
                "display": "block",
                "top": -($(this).parents(".two-menu-list").position().top - 60) + "px"
            });

            $(".nav-menu-list>ul").children(".after").css("top", $(this).parents(".two-menu-list").position().top - 50 + "px");



            var htmlVal = $(this).parent().find(".nav-menu-menu").children("li").html();


            if (htmlVal == "") {
                $(".nav-menu-menu").css("border-left", "0px solid #C1C1C1");
                $(".nav-menu-menu").find(".after").css("display", "none");
            } else {
                if (windW >= 768) {
                    $(".nav-menu-menu").css("border-left", "1px solid #C1C1C1");
                }
                $(".nav-menu-menu").find(".after").css("display", "block");

            }

        }).mouseleave(function () {
            $(this).css("z-index", "88");
        });
        //头部导航父元素的移走事件 common
        $(".in-nav-menu").mouseleave(function () {
            $(".nav-menu-list").find($(".nav-menu-menu")).css("display", "none");
            $(".sm-menu-hover").find(".sm-a-weight").css("font-weight", "normal");
        });

        //二级菜单宽度函数 common
        function navHover() {
            var bodyW = document.documentElement.clientWidth || document.body.clientWidth || window.innerWidth;

            $(".nav-list1-hover>.container-fluid").css({ "width": bodyW + "px", "display": "none" });
        }
        navHover();

        //************************************************************************
        ////    手机端 xs 二级菜单开关 common
        //        $("#xs-menu").click(function(){
        //            $(".xs-list").slideDown();
        //        });

        //关闭二级菜单 common
        $(".xs-list").find(".h3").click(function () {
            $(".xs-list").slideUp();

            closeBg($(".xs-list>li>.clickObj"));
            closeBg($(".xs-tier-2>li>.clickObj"));
            closeBg($(".xs-tier-3>li>.clickObj"));
            closeBg($(".xs-tier-4>li>.clickObj"));

        });
        //common
        function closeBg(_this) {
            $(_this).css({ "background": "rgba(0,0,0,0)", "color": "#7C7C7C" });
            $(_this).find(".xs-tier-down").css({ "transform": "rotate(0deg)", "transition": "all .5s linear" });
            $(".xs-tier-2").slideUp();
            $(".xs-tier-3").slideUp();
            $(".xs-tier-4").slideUp();
        }
        //common
        $(function () {
            //展开菜单容器(ul 第二层) common
            var listBox = $(".xs-list");

            //第一级点击对象以及事件 common
            var oneClick = $(".xs-list>li>.clickObj");
            oneClick.click(function () {
                tierBg($(this).parent().find(".xs-tier-2"), this, "#323232");//修改当前点击元素的背景颜色以及slideUp()
                listA(oneClick, this);//收起其他点开的元素
            });

            //二级 common
            var twoClick = $(".xs-tier-2>li>.clickObj");
            twoClick.click(function () {
                tierBg($(this).parent().find(".xs-tier-3"), this, "#666");//修改当前点击元素的背景颜色以及slideUp()
                listA(twoClick, this);//收起其他点开的元素
            });

            //三级 common
            var threeClick = $(".xs-tier-3>li>.clickObj");
            threeClick.click(function () {
                tierBg($(this).parent().find(".xs-tier-4"), this, "#E5E5E5");//修改当前点击元素的背景颜色以及slideUp()
                listA(twoClick, this);//收起其他点开的元素
            });

            //语言点击 common
            var languageClick = $(".language-box>.xs-tier-2>li");
            languageClick.click(function () {
                $(".language-box>a").click();
            });

            //-----------------所点击的对象（第几层），当前对象this  (一级点击) common
            function listA(lick, _this) {
                //获取所点击元素的父元素li common
                var _clicObj = $(_this).parent("li").parent("ul").children("li");

                var Len = _clicObj.length;
                var thisIndex = $(_this).parent("li").index();//获取当前点击对象的父元素li下标
                for (var i = 0; i < Len; i++) {
                    if (i != thisIndex) {

                        var listObj = _clicObj.eq(i).children("ul");// none  block

                        switch (listObj.css("display")) {
                            case "block":
                                _clicObj.eq(i).find(".clickObj").css({ "background": "rgba(0,0,0,0)" }).find("a").css("color", "#7c7c7c");
                                _clicObj.eq(i).find(".clickObj").children(".xs-tier-down").css({ "transform": "rotate(0deg)", "transition": "all .5s linear" });
                                listObj.slideUp();
                                listObj.find("ul").slideUp();
                                break;
                        }
                    }

                }
            }

            //改变背景颜色以及上下滑动动画 common
            function tierBg(obj, _this, colors) {
                var str = obj.css("display");//菜单是否展开的状态
                switch (str) {
                    case "none":
                        $(_this).css({ "background": colors, "transition": "all .3s linear" }).children("a").css("color", "white");
                        $(_this).find(".xs-tier-down").css({ "transform": "rotate(180deg)", "transition": "all .5s linear" });

                        $(".xs-tier-3>li>.clickObj").find("a").css("color", "#7C7C7C");//最后以及颜色淡的不变字体颜色
                        obj.slideDown();
                        break;
                    case "block":
                        $(_this).parent("li").find("ul").slideUp();
                        $(_this).parent("li").find(".clickObj").css("background", "rgba(0,0,0,0)").find("a").css("color", "#7c7c7c");


                        $(_this).parent("li").find(".xs-tier-down").css({ "transform": "rotate(0deg)", "transition": "all .5s linear" });

                        $(".xs-tier-3>li>.clickObj").find("a").css("color", "#7C7C7C");//最后一级颜色淡的不变字体颜色

                        obj.slideUp();
                        break;
                }

            }

            // list 点击动画rotate common
            var list1 = $(".xs-list-box").find(".i-1");
            var list2 = $(".xs-list-box").find(".i-2");

            //展开点击 common
            list1.click(function () {
                animateRotate(list2, list1, 180);//旋转函数

                listBox.slideDown();
            });

            // 收起点击 common
            list2.click(function () {
                animateRotate(list1, list2, 0);//旋转函数
                listBox.slideUp();
                $(".vue-navBar-right>li").find("ul").slideUp();
                $(".vue-navBar-right>li").find(".clickObj").css("background", "rgba(0,0,0,0)").find("a").css("color", "#7c7c7c");
                $(".vue-navBar-right>li").find(".xs-tier-down").css({ "transform": "rotate(0deg)", "transition": "all .5s linear" });
            });

            //展开收起动画函数 common
            function animateRotate(obj1, obj2, deg) {
                obj1.css({ "transform": "rotateZ(" + deg + "deg)", "opacity": "1", "z-index": "5" });
                obj2.css({ "transform": "rotateZ(" + deg + "deg)", "opacity": "0", "z-index": "4" });
            }

        });
        //让页面回到 顶部 common
        $('.goTop').click(function () {
            $('html,body').animate({ scrollTop: '0px' }, 600);
        });
    }, 500)
    /*设置左右箭头居中*/
    setTimeout(function () {
        $(".carousel-control").css("line-height", $(".carousel-inner").height() + "px");

    }, 10);

    //common
    function imgH() {
        /*解决只有一个有高度的问题*/
        var $height = $(".carousel-inner img").eq(0).height();
        $(".carousel-control").css("line-height", $height + "px");
    }
    imgH();



    //贴边样式与事件
    var path = "";
    if (!window.PUBLIC) {
        path = "";
    }
    $("#fixed").load("_template/fixed.html", function () {
        new Vue({
            el:"#index"
        });

        //"+IP.STORE+"/walfare/index.html
        $(".mall").find("a").attr('href', "javascript:trackFn('index-mall','/store/mall.html')");


        var img = document.getElementById("verifyCode");
        $(".verifyCode").click(function () {
            img.src = IP.PORTAL + "/portal/imagecode.action?rnd=" + Math.random();
        });
        //    联系我们 点击
        $(".content").find(".contact").click(function () {
            bg($(this));
            $(".fixed-display").css("display", "block").find(".contact").animate({ "opacity": 1 }, 300);//subscription
            $(".fixed-display").find(".subscription").animate({ "opacity": "0" }, 300);

            fixedLayer();//根据屏幕宽度判断是手机还是pc，显示弹出层
            // alert(bodyW)
        });
        $(".content").find(".contact").mouseover(function () {
            $(".fixed-display").find(".subscription").animate({ "opacity": "0" }, 100);
        }).mouseout(function () {
            if (windW > 767) {
                $(".fixed-display").css("display", "none").find(".contact").animate({ "opacity": 0 }, 300);//subscription
            }
        });
        //    订阅公告 点击
        $(".content").find(".subscription").click(function () {

            bg($(this));

            img.src = IP.PORTAL + "/portal/imagecode.action?rnd=" + Math.random();
            $(".fixed-display").css("display", "block").find(".subscription").animate({ "opacity": "1" }, 300);


            $(".fixed-display").find(".contact").animate({ "opacity": "0" }, 300);
            fixedLayer(function () {
                $("#subscription").find(".input-group-addon").click(function () {
                    PcAndMobile();
                });
                $(".verifyCode").click(function () {
                    img = document.getElementById("verifyCode");
                    img.src = IP.PORTAL + "/portal/imagecode.action?rnd=" + Math.random();

                });
            });
        });



        //pc端点击订阅公告
        $(".subscription").find(".input-group-addon").click(function () {
            PcAndMobile();
        });
        function PcAndMobile() {

            var email = $("#inputGroupSuccess3").val();
            var inputCode = $("#varicode").val();
            var sharetag = 1;
            //	    	if($("input[type='checkbox']").is(':checked')){
            //	    		sharetag=1;
            //	    	}else{
            //	    		sharetag=0;
            //	    	}
            var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
            //	    	alert("myreg.test(email)===="+myreg.test(email));
            //	    	alert("inputCode!=verifyCode===="+inputCode!=verifyCode);
            if (!myreg.test(email) || inputCode == '' || inputCode == undefined || inputCode.length != 4) {
                alert('\nE_mail或验证码无效！');
            } else {
                var url = IP.PORTAL + "/portal/portal/userRegister.action?userEmail=" + email + "&sharetag=" + sharetag + "&veriCode=" + inputCode;
                $.ajax({
                    type: "POST",   //请求方式
                    url: url,    //请求的url地址
                    dataType: "json",   //返回格式为json
                    async: true,//请求是否异步，默认为异步，这也是ajax重要特性
                    success: function (result) {
                        //请求成功时处理
                        if (result.success == "success") {
                            alert("注册成功，请前往邮箱进行账户激活。感谢您的使用！");
                            location.reload(true);
                        } else if (result.success == "registed") {
                            alert("请勿重复注册，如有问题请联系客服。感谢您的使用！");
                        } else if (result.success == "error") {
                            alert("验证码输入有误，请重新输入！");
                            img.src = IP.PORTAL + "/portal/imagecode.action?rnd=" + Math.random();
                        }


                    },

                    error: function () {
                        //请求出错处理
                    }
                });
            }

        };

        //点击别的地方的时候隐藏弹出框
        $("body").click(function (e) {
            var e = e || window.event;
            var target = e.target || e.srcElement;

            var parent = $(target).parents(".fixed");

            if (parent.length !== 1) {

                hidden()
            }

        });

        // alert(windW)
        //滚动条事件（隐藏向上goTop按钮）
        if (windW >= 767) {
            $(window).scroll(function () {
                hidden();
                var scrTop = $(window).scrollTop();

                if (scrTop >= 500) {
                    $(".goTop").fadeIn(300);
                }
                if (scrTop < 500) {
                    $(".goTop").fadeOut(300);
                }
            });
            $(window).scroll();
        }


        //鼠标滚轮事件（隐藏点出来的弹层）
        //var scrollFn=function(){
        //    hidden();
        //};
        ///*注册事件*/
        //if(document.addEventListener){
        //    document.addEventListener('DOMMouseScroll',scrollFn,false);
        //}
        //window.onmousewheel=document.onmousewheel=scrollFn;

        //隐藏右侧贴边点出来的弹层
        function hidden() {

            var obj = $(".fixed-display");
            obj.css("display", "none");
            obj.find(".subscription").css("opacity", "0");
            obj.find(".contact").css("opacity", "0");

            $(".content").find("div").removeClass("fixed-active");
        }

        //修改背景
        function bg(obj) {
            $(".content").find("div").removeClass("fixed-active");
            obj.addClass("fixed-active");
            obj.focus();
        }

        //索顶便捷导航

        var fixed_navH = $("#fixed-nav").height();
        var fixed_lipadT = $("#fixed-nav").find("li").css("margin-top");
        var fixed_padT = $("#fixed-nav").css("padding-top");
        var fixed_padB = $("#fixed-nav").css("padding-bottom");
        // $("#fixed-nav").find(".child-box").css({"width":""})

        if (navigator.userAgent.indexOf('Chrome') != -1) {
            $("#page-nav-box").find(".child-box").css("margin-top", fixed_navH - parseInt(fixed_lipadT) * 2 + "px")
        } else {

            $("#page-nav-box").find(".child-box").css("margin-top", fixed_navH - 13 + "px");
            $(".child-box").find(".firstDiv").css("height", "13px");
        }

        var fixed_H = fixed_navH + parseInt(fixed_padT) + parseInt(fixed_padB) + 10;


        $("#fixed-nav").css("top", - fixed_H + "px");
        // setTimeout(function(){
        $(window).scroll(function () {
            fixedFn();
        })
        // },500)


        //便捷导航


        function fixedFn() {

            if ($("#page-nav").length !== 0) {
                var scrTop = $(window).scrollTop();//浏览器滚动条距离顶部的距离
                var pageTop = $("#page-nav").position().top;
                // alert(scrTop +" "+pageTop)

                if (scrTop > pageTop) {
                    $("#fixed-nav").css("top", "0");
                }
                if (scrTop < pageTop) {
                    $("#fixed-nav").css("top", - fixed_H + "px");
                }
            }
        }

        $("#fixed-nav").css("top", - fixed_H + "px");
        // setTimeout(function(){
        fixedFn();
        // },500)


    });






});


//延迟显示
setTimeout(function () {
    $("#fixed").animate({ "opacity": "1" }, 300);
}, 500);

//隐藏不需要的贴边
$(".fixed").css("display", "none");
function pageFixedBlock(obj) {

    $(".fixed").css("display", "block");

    $(".fixed").find(obj).css("display", "block");
}

//隐藏贴边弹出框
function fixedModel() {
    var len = arguments.length;
    for (var i = 0; i < len; i++) {
        $(arguments[i]).css("display", "none");
    }
}

// 轮播图只有一张时白色小点不显示
function rotation() {
    var objLen = arguments.length;
    for (var i = 0; i < objLen; i++) {
        var len = $(arguments[i]).find(".item").length;//获取当前有几屏在轮播
        if (len == 1) {
            $(arguments[i]).find(".carousel-indicators").css("display", "none");
            $(arguments[i]).children("a").css("display", "none");
        }
    }

}
//广告位轮播
function advertRotation() {
    $("#myCarousel").find(".carousel-indicators").find("li").eq(0).addClass("active");
    $("#myCarousel").find(".carousel-inner").find(".item").eq(0).addClass("active");

    var advertNum = $("#myCarousel").find(".carousel-indicators").find("li").length;
    //	alert("===common.js==advertNum=="+advertNum);
    if (advertNum > 1) {
        //响应touch手势
        $("#myCarousel").swipeleft(function () {
            $(this).carousel('next');
        });
        $("#myCarousel").swiperight(function () {
            $(this).carousel('prev');
        });
    }
    rotation("#myCarousel");
}
// 贴边手机端点击后显示弹出框
function fixedLayer() {
    if (windW <= 767) {

        //订阅公告
        $(".fixed").find(".pc-subscription").css({ "display": "none" });

        $(".fixed").find(".subscription").attr({ "data-toggle": "modal", "data-target": "#subscription" });

        $("#subscription").find(".modal-body").css("position", "relative").html($(".pc-subscription").html());

        //联系我们
        $(".fixed").find(".contact").attr({ "data-toggle": "modal", "data-target": "#xs-contact" });

        $("#xs-contact").find(".modal-body").css("position", "relative").append($(".fixed-display"));

        var len = arguments.length;
        if (len != 0) {
            var fn = arguments[0];

            fn();

        }
    }
}


//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^    7.5 增加
$(window).load(function () {
    function choose(urlIos, schemeIos, urlAndroid, schemeAndroid) {
        if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
            var clickedAt = +new Date;
            window.setTimeout(function () {
                var newDate = +new Date;
                if (newDate - clickedAt < 50) {
                    window.location = urlIos;
                } else {
                    window.close();
                }
            }, 25);
            window.location = schemeIos;
        } else if (navigator.userAgent.match(/android/i)) {
            var clickedAt = +new Date();
            var ifr = document.createElement("iframe");
            ifr.src = schemeAndroid;
            ifr.style.display = "none";
            document.body.appendChild(ifr);
            setTimeout(function () {
                document.body.removeChild(ifr);
                if ((+new Date()) - clickedAt < 50) {
                    window.location = urlAndroid;
                };
            }, 25);
        }
    };


    //12月21日修改页尾PC显示内容
    setTimeout(function () {
        if (windW > 767) {
            var newsDataLen = $(".newsDataBoe").find("li");
            for (var i = 0; i < newsDataLen.length; i++) {
                if (newsDataLen.eq(i).find("a").text() == "") {
                    newsDataLen.eq(i).parents(".newsDataBoe").remove();
                }
            }
        };
    }, 50);




    setTimeout(function () {
        if (windW <= 767) {
            for (var n = 0, len = $(".footer1129-ul").length; n < len; n++) {
                if ($(".footer1129-ul").eq(n).find("a").text() == "") {
                    $(".footer1129-ul").eq(n).siblings(".footer1129-click").find("span").remove();
                }
            }
            $(".footer1129-ul").slideUp(0);



            $(".footer1129-click").click(function () {
                var eleContent = $(this).siblings(".footer1129-ul").find('a').text();

                if (eleContent != "") {
                    $(this).siblings(".footer1129-ul").slideToggle(300);
                    //之前“+”“-”号的方法
                    /*var span = $(this).children("span");

                    for(var i = 0,len = span.length;i<len;i++){
                        if(span.eq(i).hasClass("active")){
                            span.eq(i).removeClass("active");
                        }else{
                            span.eq(i).addClass("active");
                        }
                    }*/
                    //箭头旋转的方法
                    var span = $(this).find("span");
                    if (span.hasClass("yewei1")) {
                        span.removeClass("yewei1");
                        span.addClass("yewei2");
                    } else {
                        span.removeClass("yewei2");
                        span.addClass("yewei1");
                    }
                }

            });

            //手机端微信二维码点击消失
            var weixin = document.getElementsByClassName("weixin-bg")[0];


            weixin.onclick = function (e) {
                var e = e || window.event;
                var target = e.target || e.srcELement;


                if (target.nodeName.toLowerCase() != "img") {
                    document.getElementsByClassName("wx-code")[0].style.display = "none";
                }
            }
        };
    }, 500);




    var browser = {
        versions: function () {
            var u = navigator.userAgent, app = navigator.appVersion;
            return {         //移动终端浏览器版本信息
                trident: u.indexOf('Trident') > -1, //IE内核
                presto: u.indexOf('Presto') > -1, //opera内核
                webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
                mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
                iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
                iPad: u.indexOf('iPad') > -1, //是否iPad
                webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
            };
        }(),
        language: (navigator.browserLanguage || navigator.language).toLowerCase()
    };

    var num = 0;
    if (browser.versions.mobile) {//判断是否是移动设备打开。browser代码在下面
        var ua = navigator.userAgent.toLowerCase();//获取判断用的对象

        //true 为微信打开，否则 num + 1;
        ua.match(/MicroMessenger/i) == "micromessenger" ? '' : num++;

        //新浪博客
        ua.match(/WeiBo/i) == "weibo" ? '' : num++;

        //QQ空间
        ua.match(/QQ/i) == "qq" ? '' : num++;

        //支付宝
        /alipay/ig.test(ua) ? '' : num++;

        //IOS浏览器
        browser.versions.ios ? '' : num++;

        //安卓浏览器
        browser.versions.android ? '' : num++;

        //app
        if (num == 6) {

            $(".nav-box").css({
                "height": "75px",
                "padding-top": "15px"
            });
        }
    }


    //设置ul的高度
    function layout(obj, index) {
        var objLen = $(obj).length;

        for (var i = 0; i < objLen; i++) {

            if (windW < 767) {
                if (obj == ".textImgBox") {
                    $(obj).eq(i).find("ul").append($(obj).eq(i).find("ul").find("li").eq(0));
                }
                // 1206增加
                if (obj == ".imgTextBox" && $(obj).eq(i).hasClass("layout1206")) {

                    $(obj).eq(i).find("ul").append($(obj).eq(i).find("ul").find("li").eq(0));
                }
            } else {

                var imgH = $(obj).eq(i).find("li").eq(0).innerHeight();
                var textH = $(obj).eq(i).find("li").eq(1).innerHeight();
                var h;
                if (imgH > textH) {
                    h = imgH;
                } else {
                    h = textH;
                }

                $(obj).eq(i).find("li").eq(index).css('height', $(obj).eq(i).find("ul").innerHeight());
                $(obj).eq(i).find("li").eq(index).find("div").css({
                    "height": $(obj).eq(i).find("li").eq(index).find("div").innerHeight(),
                    "position": "absolute",
                    "top": "0",
                    "left": "0",
                    "right": "0",
                    "bottom": "0",
                    "margin": "auto"
                });
                $(obj).eq(i).find("li").css({
                    "height": h + "px"
                });
                $(obj).eq(i).find("li").find("img").css({
                    "position": "absolute",
                    "top": "0",
                    "left": "0",
                    "right": "0",
                    "bottom": "0",
                    "margin": "auto"
                });
            }
        }
    }

    layout(".imgTextBox", 1);//左图右文字布局
    layout(".textImgBox", 0);//左文字右图布局


    // 头部下拉菜单没有下一级的时候不显示向下的箭头
    function listDown() {
        //1级
        var listDown1 = $(".listDown").children("li");
        for (var i = 0, len = listDown1.length; i < len; i++) {

            //从一级里找二级
            var xs_tier_2 = listDown1.eq(i).children(".xs-tier-2").children("li");
            if (xs_tier_2.length <= 0) {
                //  listDown1.eq(i).find(".xs-tier-down").css("display","none")
                listDown1.eq(i)
                    .children(".clickObj")
                    .find(".xs-tier-down")
                    .css("transform", "rotate(-90deg)")
                    .removeClass("xs-tier-down")
                    .siblings("a")
                    .css("width", "92%");
            }

            for (var n = 0; n < xs_tier_2.length; n++) {
                var xs_tier_3 = xs_tier_2.eq(n).children(".xs-tier-3").children("li");

                if (xs_tier_3.length <= 0) {
                    xs_tier_2.eq(n)
                        .children(".clickObj")
                        .find(".xs-tier-down")
                        .css("transform", "rotate(-90deg)")
                        .removeClass("xs-tier-down")
                        .siblings("a")
                        .css("width", "92%");
                }


                for (var j = 0; j < xs_tier_3.length; j++) {
                    var xs_tier_4 = xs_tier_3.eq(j).children(".xs-tier-4").children("li");

                    if (xs_tier_4.length <= 0) {
                        xs_tier_3.eq(j)
                            .children(".clickObj")
                            .find(".xs-tier-down")
                            .css("transform", "rotate(-90deg)")
                            .removeClass("xs-tier-down")
                            .siblings("a")
                            .css("width", "92%");
                    }
                }
            }

        }
    }
    if (windW < 767) {
        listDown();
    }

});

//动态指定一组列表的高度
function heightFn(parentBox, childBox, type) {
    if (windW > 767) {

        var parentBox = $(parentBox);

        for (var n = 0, nlen = parentBox.length; n < nlen; n++) {

            var ele = $(parentBox).eq(n).find(childBox);//获取页面盒子
            var eleH = ele.eq(0).height();//页面盒子集合的第一个盒子的高度
            for (var i = 0, ilen = ele.length; i < ilen; i++) {
                var this_eleH = parseInt(ele.eq(i).height());
                if (this_eleH > eleH) {
                    eleH = this_eleH;//取出一组中最高盒子的高度
                }
            }


            if (!type) {
                ele.css({ "height": eleH + 30 + "px", "position": "relative" });
            }
            if (type) {

                ele.css({ "height": eleH + "px", "position": "relative" });

                ele.find("img").css({
                    "position": "absolute",
                    "bottom": "0"
                });
            }

        }
    }
}

// 控制页面字数显示多少行 =========  装字的盒子 ，显示多少行,元素的背景颜色
function limit(obj, row, bgColor) {

    // 设置元素的行高
    $(obj).css("line-height", "22px");

    //获取元素的背景颜色
    var objBg = bgColor;

    //获取元素的高度
    // setTimeout(function(){
    var objH = $(obj).height();
    if (objH <= row * 22) {
        return;
    } else {
        $(obj).css({
            "height": row * 22 + "px",
            "overflow": "hidden",
            "position": "relative"
        });

        var span1 = $("<span class='ddd'>...</span>");
        var span2 = $("<span class='op1'></span>");
        var span3 = $("<span class='op2'></span>");
        var span4 = $("<span class='op3'></span>");

        $(obj).append(span1);
        $(obj).append(span2);
        $(obj).append(span3);
        $(obj).append(span4);

        $(obj).find("span").css({
            "background": objBg
        })
    }

}

// 手机端隐藏面包屑
if (windW <= 767) {
    $(".path").css("display", "none");
    /*document.getElementsByTagName('meta')[1].setAttribute('content', 'width=1300px, user-scalable=yes, minimum-scale=0');*/

}
function dynamicsFn() {
    if (windW > 767) {
        $(".Theight-box").css({
            "height": "auto"
        })
        $(".Theight-row").css({
            "height": "auto"
        });
        $(".dynamics_link").css({
            "position": "inherit",
            "bottom": "0"
        });
        heightFn(".Theight-box", ".Theight-row", false);

        $(".dynamics_link").css({
            "position": "absolute",
            "bottom": "10px"
        });
    }
}

/*-------------------新页码js-----------------------*/
!
    function (t, a, e, i) {
        var n = function (a, e) {
            this.ele = a,
                this.defaults = {
                    currentPage: 1,
                    totalPage: 10,
                    isShow: !0,
                    count: 5,
                    homePageText: "首页",
                    endPageText: "尾页",
                    prevPageText: "上一页",
                    nextPageText: "下一页",
                    callback: function () { }
                },
                this.opts = t.extend({},
                    this.defaults, e),
                this.current = this.opts.currentPage,
                this.total = this.opts.totalPage,
                this.init()
        };
        n.prototype = {
            init: function () {
                this.render(),
                    this.eventBind()
            },
            render: function () {
                var t = this.opts,
                    a = this.current,
                    e = this.total,
                    i = this.getPagesTpl(),
                    n = this.ele.empty();
                this.isRender = !0,
                    this.homePage = '<a href="javascript:void(0);" class="ui-pagination-page-item" data-current="1">' + t.homePageText + "</a>",
                    this.prevPage = '<a href="javascript:void(0);" class="ui-pagination-page-item" data-current="' + (a - 1) + '">' + t.prevPageText + "</a>",
                    this.nextPage = '<a href="javascript:void(0);" class="ui-pagination-page-item" data-current="' + (a + 1) + '">' + t.nextPageText + "</a>",
                    this.endPage = '<a href="javascript:void(0);" class="ui-pagination-page-item" data-current="' + e + '">' + t.endPageText + "</a>",
                    this.checkPage(),
                    this.isRender && n.html("<div class='ui-pagination-container'>" + this.homePage + this.prevPage + i + this.nextPage + this.endPage + "</div>")
            },
            checkPage: function () {
                var t = this.opts,
                    a = this.total,
                    e = this.current;
                t.isShow || (this.homePage = this.endPage = ""),
                    1 === e && (this.homePage = this.prevPage = ""),
                    e === a && (this.endPage = this.nextPage = ""),
                    1 === a && (this.homePage = this.prevPage = this.endPage = this.nextPage = ""),
                    a <= 1 && (this.isRender = !1)
            },
            getPagesTpl: function () {
                var t = this.opts,
                    a = this.total,
                    e = this.current,
                    i = "",
                    n = t.count;
                if (a <= n) for (g = 1; g <= a; g++) i += g === e ? '<a href="javascript:void(0);" class="ui-pagination-page-item active" data-current="' + g + '">' + g + "</a>" : '<a href="javascript:void(0);" class="ui-pagination-page-item" data-current="' + g + '">' + g + "</a>";
                else {
                    var s = n / 2;
                    if (e <= s) for (g = 1; g <= n; g++) i += g === e ? '<a href="javascript:void(0);" class="ui-pagination-page-item active" data-current="' + g + '">' + g + "</a>" : '<a href="javascript:void(0);" class="ui-pagination-page-item" data-current="' + g + '">' + g + "</a>";
                    else {
                        var r = Math.floor(s),
                            h = e + r,
                            o = e - r,
                            c = n % 2 == 0;
                        h > a && (c ? (o -= h - a - 1, h = a + 1) : (o -= h - a, h = a)),
                            c || h++;
                        for (var g = o; g < h; g++) i += g === e ? '<a href="javascript:void(0);" class="ui-pagination-page-item active" data-current="' + g + '">' + g + "</a>" : '<a href="javascript:void(0);" class="ui-pagination-page-item" data-current="' + g + '">' + g + "</a>"
                    }
                }
                return i
            },
            setPage: function (t, a) {
                return t === this.current && a === this.total ? this.ele : (this.current = t, this.total = a, this.render(), this.ele)
            },
            getPage: function () {
                return {
                    current: this.current,
                    total: this.total
                }
            },
            eventBind: function () {
                var a = this,
                    e = this.opts.callback;
                this.ele.off("click").on("click", ".ui-pagination-page-item",
                    function () {
                        var i = t(this).data("current");
                        a.current != i && (a.current = i, a.render(), e && "function" == typeof e && e(i))
                    })
            }
        },
            t.fn.pagination = function (t, a, e) {
                if ("object" == typeof t) {
                    var i = new n(this, t);
                    this.data("pagination", i)
                }
                return "string" == typeof t ? this.data("pagination")[t](a, e) : this
            }
    }(jQuery, window, document);

/*  2018/02/26  第一屏大图，不跳转到新页面的超链接： 鼠标变为指针样式 */

window.onload = function () {

    setTimeout(function () {
        $("video").contextmenu(function () {
            return false;
        });
        var item = document.getElementsByClassName("item");
        //console.log("item.length = " + item.length);
        for (var i = 0; i < item.length; i++) {
            (function (num) {
                item[i].firstChild.addEventListener('mousemove', function () {
                    //console.log("item.length = " + item.length);
                    var ahref = item[num].firstChild.getAttribute("href");
                    if (ahref == "") {  //空链接不跳转
                        this.href = "javascript:void(0);";
                    }
                    if (ahref.indexOf("http") == -1) {
                        this.style.cursor = "default";
                    }
                }, false);
            })(i);
        }
    }, 1000);

}
window.trackFn = function(_url, _open) {
    var urlData = UTIL.getUrlData();
    var hrefData = UTIL.getUrlData(_url);
    $.extend(hrefData, {lang:urlData.lang});
    var dataString = "?"+$.param(hrefData);
	if(_open == "openNewWindow") {
		if(_url) {
			window.open(_url.split("?")[0]+dataString);
		}
	} else {
        if(_url != '') {
            window.location.href = _url.split("?")[0]+dataString;
        }
	};
};
var Web = {
	Resource:{
        serverURL:"http://localhost:8080/wfk.protocol.http/api/",
        // serverURL:"/web/api/",
		pageSize:10,//分页记录
		maxPageSize:10//最大分页数
	},
	Method:{
		ajax:function(method, param) {
			if(!param)
				param= {};
			var defaultParam = {
				param:{},
				type:"get",
				timeout:20000,
				safe:false,
				data:{},
				url:Web.Resource.serverURL,
				success:function(){},
				fail:function(){},
				error:function(){}
			};
			$.extend(true, defaultParam, param);
			
			$.ajax({
				type:defaultParam.type,
				data:defaultParam.type=="get"?defaultParam.data:JSON.stringify(defaultParam.data),
				async:defaultParam.async,
				timeout:defaultParam.timeout,
				url: defaultParam.url + method+"?format=json",
				contentType : "application/json",
				// processData:false,
				dataType: "jsonp",
				success: function(data){
					if(!data.result){
						if(defaultParam.success)
							defaultParam.success(data.data?data.data:data, defaultParam.param);
					}else{
						if(defaultParam.fail)
							defaultParam.fail(data, defaultParam.param);
					}
				},
				error: function(XMLHttpRequest, textStatus, errorThrown){
					if(defaultParam.error)
						defaultParam.error(XMLHttpRequest, textStatus, errorThrown, defaultParam.param);
				}
			});
		}
	}
};

Date.prototype.format = function(format) {
    var date = {
           "M+": this.getMonth() + 1,
           "d+": this.getDate(),
           "h+": this.getHours()%12 == 0 ? 12 : this.getHours()%12,
           "H+": this.getHours(),
           "m+": this.getMinutes(),
           "s+": this.getSeconds(),
           "q+": Math.floor((this.getMonth() + 3) / 3),
           "S+": this.getMilliseconds()
    };
    if (/(y+)/i.test(format)) {
           format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in date) {
           if (new RegExp("(" + k + ")").test(format)) {
                  format = format.replace(RegExp.$1, RegExp.$1.length == 1
                         ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
           }
    }
    return format;
};