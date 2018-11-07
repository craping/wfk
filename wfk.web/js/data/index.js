var videoFocusBox;
$(function(){

    //头部轮播图数据
    var focusImgData = new Vue({
        el:"#myCarousel",
        data:{
            todos:[]
        }
    });
    
    //进行后台首页广告位数据的读取adverId:AD0001

	
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
			"show": "displayimages/c144e544-0e10-4820-9ab0-eef39fcdd015.jpeg",
			"showonphone": "displayimages/adfa167c-d192-43a2-9663-98f42f48c605.jpeg",
			"state": "1",
			"stime": "",
			"wordone": "",
			"wordthree": "",
			"wordtwo": ""
		}, {
			"activity": "",
			"alt": "",
			"astate": "2",
			"color": "黑",
			"id": 6,
			"link": "index.html",
			"margin": "左",
			"name": "首页1",
			"opentype": "当前页",
			"otime": "",
			"position": 3,
			"priority": 3,
			"remark": "",
			"show": "displayimages/13b59a99-d443-4a94-a099-5216d9c3446f.jpeg",
			"showonphone": "displayimages/09061a3d-4b4c-4686-b27b-728ef5673a40.jpeg",
			"state": "1",
			"stime": "",
			"wordone": "",
			"wordthree": "",
			"wordtwo": ""
		}, {
			"activity": "",
			"alt": "",
			"astate": "2",
			"color": "",
			"id": 3,
			"link": "index.html",
			"margin": "左",
			"name": "首页 2",
			"opentype": "标签页",
			"otime": "",
			"position": 3,
			"priority": 1,
			"remark": "",
			"show": "displayimages/c4e90660-bc95-402e-9c2e-6457123db5a7.jpeg",
			"showonphone": "displayimages/7ba5b333-e99d-488f-9f78-216f5ff0eab2.jpeg",
			"state": "1",
			"stime": "",
			"wordone": "",
			"wordthree": "",
			"wordtwo": ""
		}],
		"code": "BN0001",
		"count": 3,
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
//				focusImgData.todos.shift();
	setTimeout(function(){
		advertRotation();
	}, 100);
	
	$("#myCarousel").find(".carousel-indicators").find("li").eq(0).addClass("active");
    $("#myCarousel").find(".carousel-inner").find(".item").eq(0).addClass("active");

    
//视频轮播图以及视频路径
    videoFocusBox = new Vue({
        el:"#video-img-modal",
        data:{
            todos:[
            ]
        }
    });
    
    
	result = {
		"advertInfo": [{
			"activity": "",
			"alt": "",
			"astate": "2",
			"color": "",
			"id": 69,
			"link": "javascript:trackFn('index.html')",
			"margin": "",
			"name": "1",
			"opentype": "标签页",
			"otime": "",
			"position": 4,
			"priority": 1,
			"remark": "",
			"show": "displayimages/a24ca558-bf21-4c2f-8b87-9592d0c92416.jpeg",
			"showonphone": "displayimages/f23d7743-ac3a-4d51-b679-34324e425871.jpeg",
			"state": "1",
			"stime": "",
			"wordone": "",
			"wordthree": "",
			"wordtwo": ""
		}],
		"code": "BN0002",
		"count": 1,
		"position": "官网首页—创新科技",
		"success": "1"
	};
	
	var number = result.count;
	for(i=0;i<number;i++){
		var lgImgSrc=result.advertInfo[i].show;
		var xsImgSrc=result.advertInfo[i].showonphone;
		videoFocusBox.todos.push({
			dataSlideTo:i,//每条数据都要加此项，值依次累加
			href:result.advertInfo[i].link,
			imgSrc:lgImgSrc,
			videoPoster:xsImgSrc,
			videoSrc:result.advertInfo[i].link,
			startSrc:"",//设置刚进来的时候视频的
			title:result.advertInfo[i].wordone,
			text:result.advertInfo[i].wordtwo
		});
	}

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

	
	 $("#myCarouse2").find(".carousel-indicators").find("li").eq(0).addClass("active");
	 $("#myCarouse2").find(".carousel-inner").find(".item").eq(0).addClass("active");


	 Web.Method.ajax("news/getList", {
        data:{
            page_flag:1,
            page_num:3
        },
        success: function (data) {
            console.log(data);
            var todos = [];
            for (let i = 0; i < data.info.length; i++) {
                const item = data.info[i];
                todos.push({
                    href: "javascript:trackFn('newsDetail.html?type="+item.type+"&id="+item.id+"')",
                    text: item.title,
                    imgSrc: item.titleFile,
                    time: new Date(item.pulishTime).format("yyyy-MM-dd")
                });
            }
            new Vue({
				el:"#hotNews",
				data:{
					todos:todos
				}
			});
        },
        fail: function(){
            console.log("热点新闻据的读取fail");
        },
        error: function(){
            console.log("热点新闻数据的读取error");
        }
	});
	
	new Vue({
		el:".lang"
	});
	new Vue({
		el:".lang1"
	});
	new Vue({
		el:".lang2"
	});
	new Vue({
		el:".lang3"
	});
});