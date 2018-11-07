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


    Web.Method.ajax("news/getList", {
        data:{
            type:urlData.type,
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
        map:["", "公司新闻", "行业新闻", "社会热点"]
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
            Web.Method.ajax("news/getList", {
                data:{
                    type:urlData.type,
                    page_flag:inde,
                    page_num:this.showNum
                },
                success: function (data) {
                    console.log(data);
                    //        	    	  
                    this.allNum = data.totalnum;//新闻总数
                    var list = data.info;//查询页新闻内容
                    for (var n = 0; n < list.length; n++) {

                        var title = list[n].title.length > 45 ? list[n].title.substring(0, 45) + '...' : list[n].title;
                        var ele = {
                            newsTitle: title,
                            newsTime: new Date(list[n].pulishTime).format("yyyy-MM-dd"),
                            newsMore: "javascript:trackFn('newsDetail.html?type="+urlData.type+"&id="+list[n].id+"')"

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