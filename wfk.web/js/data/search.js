var vlist, tList;
var num = 9;//规定一页显示几个
var arr, textArr;
var articleCount;
var videoCount;
$(function () {
	new Vue({
		el: ".result-content .title"
	});
	var urlData = UTIL.getUrlData();
	var keyword = urlData["_q"];
	console.log(keyword);
	var textArr = [];
	Web.Method.ajax("news/getList", {
		data:{
			title:keyword
		},
		success: function (data) {
			var list = data.info;
			var count = data.totalnum;//结果总数
			articleCount = count;
			$("#totalcount").html(articleCount);
			
			if (articleCount == "0") {
				$(".textBookList").find(".bookMark-box").css("visibility", "hidden");
			}
			for (i = 0; i < list.length; i++) {

				var element = {
					"title": list[i].title,
					"content": list[i].content,
					"time": new Date(list[i].pulishTime).format("yyyy-MM-dd"),
					"url": "javascript:trackFn('newsDetail.html?type="+list[i].type+"&id="+list[i].id+"')"
				};
				textArr.push(element);
			}
			tList = new Vue({
				el: ".textBookList",
				data: {
					todos: textArr,
					bookMark: []
				}
			});

			var textLen = data.totalnum;
			for (var i = 0; i < Math.ceil(textLen / num); i++) {
				tList.bookMark.push(i + 1);
			}

			setTimeout(function () {
				var textLiLen = $(".textBookList").find(".bookMark-box").find("li");
				for (var i = 0; i < textLiLen.length; i++) {
					if (i > 4) {
						textLiLen.eq(i).css("display", "none");
					}
				}
				$(".textBookList").find(".bookMark-box").find(".unfolded").css({ "display": "block", "display": "inline-block" });
				$(".textBookList").find(".bookMark-box").find("li").eq(0).children("a").addClass("active");
				// 页签点击
				$(".unfolded").click(function () {
					$(".bookMark-box").find("li").css("display", "inline-block");
					$(this).css("display", "none");
				})
			}, 1000)
		},
		fail: function (error) {
			console.log("公司文章的读取fail");
		},
		error: function (error) {
			console.log("公司文章的读取error");
		}
	})


	$(".unfolded").click(function () {
		$(".bookMark-box").find("li").css("display", "inline-block");
		$(this).css("display", "none");
	})

	function listBg(_this, obj) {
		_this.parent(obj).find("a").removeClass("active");
		_this.addClass("active");
	}

	$("#article").click();
	displayList("block", "none");
	//文章点击    
	$("#article").click(function () {
		$("#totalcount").html(articleCount);
		displayList("block", "none");
	});

	// 手机端select事件
	$("#xs-videoBook").change(function () {

		var type = $(this).val();

		switch (type) {
			case "0"://视频
				displayList("none", "block");
				break;
			case "1"://文章
				displayList("block", "none");
				break;
		}

	})

	function displayList(dis1, dis2) {
		$(".textBookList").css("display", dis1);
		$(".videoBookList").css("display", dis2);
	}
});

$(window).load(function () {

	setTimeout(function () {
		var urlData = UTIL.getUrlData();
		var keyword = urlData["_q"];


		$(".textBookList").find(".bookMark-box").find("li").click(function () {
			if ($(this).attr("class") != "unfolded") {
				$(".textBookList").find(".bookMark-box").find("li").children("a").removeClass("active");
				$(this).children("a").addClass("active");
				var index = $(this).index();

				var newArr = [];

				Web.Method.ajax("news/getList", {
					data:{
						title:keyword
					},
					success: function (data) {
						var list = data.info;
						for (i = 0; i < list.length; i++) {

							var element = {
								"title": list[i].title,
								"content": list[i].content,
								"time": new Date(list[i].pulishTime).format("yyyy-MM-dd"),
								"url": "javascript:trackFn('newsDetail.html?type="+list[i].type+"&id="+list[i].id+"')"
							};
							newArr.push(element);
						}

						tList.todos = newArr;
					},
					fail: function (error) {
						console.log("公司文章的读取fail");
					},
					error: function (error) {
						console.log("公司文章的读取error");
					}
				})
			}
		})
	}, 100)
})