$(function () {
    $(".newsData").find(".list-box").eq(0).addClass("active");

    $(".bookMark-list").find("li").eq(0).find("a").addClass("active");

    $(".bookMark-list").find("li").eq(3).nextAll().css("display", "none");
    //页签点击，显示隐藏的页签，隐藏向右的箭头
    $(".bookMark-list").find("li:last-child").css("display", "inline-block").click(function () {
        $(".bookMark-list").find("li").eq(3).nextAll().css("display", "inline-block");
        $(this).css("display", "none");
    });

    function init() {
        informationInfo.pageNumInit();
        informationInfo.numClick(1);
    }


    Web.Method.ajax("product/getList", {
        data:{
            app_type:urlData.type,
            page_flag:1,
            page_num:9
        },
        success: function (data) {
            counter = data.totalnum;
            init();
        },
        fail: function(){
            console.log("新闻数据的读取fail");
        },
        error: function(){
            console.log("新闻数据的读取error");
        }
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
});

var urlData = UTIL.getUrlData();
new Vue({
    el: "#map",
    data:{
        type:urlData.type,
        map:["", "笔记本液晶屏", "工控液晶屏", "安防液晶屏", "监控液晶屏", "医疗设备屏", "广告机液晶屏"]
    }
});

var tempArray = [];
var counter;
//图文排版显示6个块
var textShowNum = 10;//纯文字排版显示10行
var informationInfo = new Vue({
    el: "#newsInformation",
    data: {
        infomationItems: [],
        showNum: 9,
        allNum: 10,
        allPage: '',
        //数据list
        infoLists: [],
    },
    methods: {
        numClick: function (inde) {
            this.allPage = Math.ceil(this.allNum / this.showNum);
            this.infomationItems = [];
            tempArray = [];


            //添加请求数据的方法
            Web.Method.ajax("product/getList", {
                data:{
                    app_type:urlData.type,
                    page_flag:inde,
                    page_num:this.showNum
                },
                success: function (data) {
                    console.log(data);
                    //        	    	  
                    this.allNum = data.totalnum;//新闻总数
                    var list = data.info;//查询页新闻内容
                    for (var n = 0; n < list.length; n++) {
                        let item = list[n];
                        let url = item.file_url?item.file_url.split(",")[0]:"";
                        var ele = {
                            text: urlData.lang == "EN"?item.product_name_en:item.product_name,
                            resolution: urlData.lang == "EN"?item.resolution_en:item.resolution,
                            panelSize: urlData.lang == "EN"?item.panel_size_en:item.panel_size,
                            src:url,
                            href:"javascript:trackFn('product.html?type=3&id="+item.id+"')"
                        };
                        tempArray.push(ele);
                        informationInfo.infomationItems.push(ele);
                    }
                },
                fail: function(){
                    console.log("新闻数据的读取fail");
                },
                error: function(){
                    console.log("新闻数据的读取error");
                }
            });

        },
        pageNumInit: function () {
            /****mobile and pc showNum()*****/
            if ($(window).width() < 768) {
                this.showNum = 10;
            } else {
                this.showNum = textShowNum;
            }
            this.allNum = counter;
            this.allPage = Math.ceil(this.allNum / this.showNum);
            $("#pagination3").pagination({
                currentPage: 1,//当前显示选中页码
                totalPage: this.allPage,//总页数
                isShow: true,
                count: 3,//当前显示页数
                homePageText: "首页",
                endPageText: "尾页",
                prevPageText: "上一页",
                nextPageText: "下一页",
                callback: function (current) {

                    informationInfo.numClick(current);
                    //点击后去请求数据（current 是当前点击的下标）

                }
            });

        }
    }
});