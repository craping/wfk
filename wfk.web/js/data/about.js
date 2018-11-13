var listarray = [{
	href:"javascript:void(0)",
	text:NAVI["概览"]
},{
	href:"javascript:trackFn('about.html')",
	text:NAVI["关于我们"]
},{
	href:"javascript:trackFn('development.html')",
	text:NAVI["发展"]
},{
	href:"javascript:trackFn('brand.html')",
	text:NAVI["品牌"]
}];
new Vue({
    el: "#fixed-nav",
    data:{
        todos:listarray
    }
});
new Vue({
    el: "#page-nav",
    data:{
        todos:listarray
    }
});
new Vue({
    el: "#map"
});

$(function(){

    var focusImgData = new Vue({
        el:"#myCarousel",
        data:{
            todos:[]
        }
    });
	var result = {
		"advertInfo": [{
			"activity": "",
			"alt": "",
			"astate": "2",
			"color": "黑",
			"id": 74,
			"link": "index.html",
			"margin": "左",
			"name": "IPC 2",
			"opentype": "标签页",
			"otime": "",
			"position": 3,
			"priority": 4,
			"remark": "",
			"show": "displayimages/49c5dfe7-deb3-4fef-a381-8971fbb1f5fa.jpeg",
			"showonphone": "displayimages/5bd1a854-863c-4910-8999-a8734f1f627b.jpeg",
			"state": "1",
			"stime": "",
			"wordone": "",
			"wordthree": "",
			"wordtwo": ""
		}],
		"code": "BN0001",
		"count": 1,
		"position": "官网首页banner图",
		"success": "1"
	};
	
	var number = result.count;
	for(i=0;i<number;i++){
		var lgImgSrc=result.advertInfo[i].show;
		var xsImgSrc=result.advertInfo[i].showonphone;
		focusImgData.todos.push({
			dataSlideTo:i,//每条数据都要加此项，值依次累加
			imgSrc1:lgImgSrc,
			imgSrc2:xsImgSrc,
			href:"javascript:trackFn('"+result.advertInfo[i].link+"')",
			text:result.advertInfo[i].wordone,
			text2:result.advertInfo[i].wordtwo,
			text3:result.advertInfo[i].wordthree
		});
	}
	setTimeout(function(){
		advertRotation();
	}, 100);
	
	$("#myCarousel").find(".carousel-indicators").find("li").eq(0).addClass("active");
    $("#myCarousel").find(".carousel-inner").find(".item").eq(0).addClass("active");


	setTimeout(function(){

		$("#myCarouse2").find(".carousel-indicators").find("li").eq(0).addClass("active");
		$("#myCarouse2").find(".carousel-inner").find(".item").eq(0).addClass("active");

		var advertNum = $("#myCarouse2").find(".carousel-indicators").find("li").length;
		if(advertNum>1){
			//响应touch手势
			$("#myCarouse2").swipeleft(function() {
				$(this).carousel('next');
			});
			$("#myCarouse2").swiperight(function() {
				$(this).carousel('prev');
			});
		}
		rotation("#myCarouse2");

	}, 100);
});