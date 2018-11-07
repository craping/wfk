var saleChannel = CookieUtil.getCookie("saleChannel");
$(window).load(function () {
    var baseUrl = "http://service.weibo.com/share/share.php";//微博分享
    var FacebookUrl = "http://www.facebook.com/sharer/sharer.php";//Facebook分享
    var url = location.href;
    var str = $("#data_base_id").html();
    var shareObj = JSON.parse(str.substring(str.indexOf("=") + 1, str.indexOf(";")));

    var title = shareObj.title;
    var content = shareObj.summary;
    var userAgent = navigator.userAgent.toLowerCase(); //获取userAgent
    if (!navigator.userAgent.toLowerCase().match(/(iPhone|iPod|iPad|android);?/i)) {
        $(".weixin").css({ "display": "block" });
        //微信分享
        var qrcode = new QRCode(document.getElementById("qrcode"), {
            width: 150,
            height: 150,
            correctLevel: QRCode.CorrectLevel.M
        });
        $(document).on('click', '.weixin', function (event) {
            $("canvas").css({ "display": "none" });
            event.stopPropagation();
            $("#qrcode").css({ "display": "block" });
            qrcode.makeCode(location.href);
        });
        $(document).click(function (event) {
            $("#qrcode").slideUp("slow");
        });
        //微博分享
        $(".weibo").on("click", function () {
            $(".weibo").attr("href", baseUrl + "?url=" + url + '&title=' + title + '&pic=' + url);
        });
        //Facebook分享
        $(".Facebook").on("click", function () {
            $(".Facebook").attr("href", FacebookUrl + "?u=" + url + '&title=' + title + '&pic=' + url);
        });
        //twitter分享
        $(".twitter").on("click", function () {
            $(".twitter").attr("href", 'http://twitter.com/home/?status='.concat(encodeURIComponent(title)).concat(' ').concat(encodeURIComponent(url)));
        });
    };
    pageFixedBlock(".contact");
    pageFixedBlock(".mall");

    fixedModel("#index",
        "#product-service-page",
        "#investor-page",
        "#join-page",
        "#news-center-page",
        "#about-page",
        "#media-center-page"
    );

    $(".fixed").css("bottom", "120px");

});

var urlData = UTIL.getUrlData();
new Vue({
    el: "#map",
    data: {
        type: urlData.type,
        map: ["", "公司新闻", "行业新闻", "社会热点"],
        href: "javascript:trackFn('information.html?type=" + urlData.type + "')"
    }
});


$(function () {
    var data = new Vue({
        el: "#content-data",
        data: {
            info:{
                title:"",
                content:"",
                publishTime:""
            },
            todos: [{
                weiboLink: "javascript:trackFn('news-center_content-weibo','javascript:void(0);');",
                weixinLink: "javascript:trackFn('news-center_content-weixin','javascript:void(0);');"
            }],
            down: [{
                href: "",
                text: "",
                time: ""
            }, {
                href: "",
                text: "",
                time: ""
            }, {
                href: "",
                text: "",
                time: ""
            }]
        }
    });

    Web.Method.ajax("news/getInfoById", {
        data:{
            id:urlData.id
        },
        success: function (result) {
            console.log(result);

            /* var list = result.list;
            for (var i = 0; i < 3 && i < list.length; i++) {
                var title = list[i].title.length > 60 ? list[i].title.substring(0, 60) + '...' : list[i].title;
                var contentUrl = list[i].contentUrl;
                if (contentUrl.indexOf('/portalnew') > -1) {
                    contentUrl = contentUrl.replace('/portalnew', '');
                }
                var element = {
                    href: "javascript:trackFn('news-center_content-recommend" + (i + 1) + "','" + contentUrl + "');",
                    text: title,
                    time: list[i].createTime.substr(0, 10)
                };

                Vue.set(data.down, i, element);
            } */
            data.info = {
                title:result.info.title,
                content:result.info.content,
                publishTime:new Date(result.info.pulishTime).format("yyyy-MM-dd")
            };
        },
        fail: function(){
            console.log("新闻详细数据的读取fail");
        },
        error: function(){
            console.log("新闻详细数据的读取error");
        }
    });

});
function setTime() {
    $(".data_base_createTime").attr("contenteditable", "true").keyup(function () {
        window.data_base.publishTime = $(this).html();
    }).focus();
}