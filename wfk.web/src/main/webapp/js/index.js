var rs = {
	capacitysType:["显示", "控制", "控制显示"],
	capacitysDataType:["其他", "整形", "浮点型", "字符串", "布尔型"],
	productJoinType:["其他", "蓝牙", "wifi"],
	productanalyticalWay:["其他", "大端", "小端", "公用", "私用"],
	params:[],
	pageNum:10
};
$(function(){
	var frame = $.getUrlData("iframe");
	if(frame){
		var productId = $.getUrlData("productId");
		switch (frame) {
		case "applicationList":
			$("<a href='#app'/>").tab("show");
			$("#app_iframe")[0].src = Web.Recource.appServerURL+"app-list.html?productId="+productId;
			break;
		case "productList":
			$("<a href='#product'/>").tab("show");
			$("<a href='#productList'/>").tab("show");
			break;
		case "addProduct":
			$("<a href='#product'/>").tab("show");
			$("<a href='#productDetail'/>").tab("show");
			break;
		case "addCapacity":
			$("<a href='#product'/>").tab("show");
			$("#capacitysAdd").click();
			//$("<a href='#app'/>").tab("show");
			//$("#app_iframe")[0].src = Web.Recource.appServerURL+"app-create.html?productId="+productId;
			break;
		}
	}
	
	
	//左侧导航菜单
	$("#left_menu li").click(function(){
		$("#left_menu li").removeClass("lefton");
		$(this).addClass("lefton");
		var name = $(this).attr("name");
		$("<a href='"+name+"'/>").tab("show");
		if(name == "#app")
			$("#app_iframe")[0].src = Web.Recource.appServerURL+"app-list.html";
		if(name == "#product"){
			$("<a href='#productList'/>").tab("show");
			queryProductsList(1);
		}
	});
	
	Web.Method.ajax("user/getUserInfo", {
		success:function(data){
			var user = data.info;
			Web.token.user = user;
		},
		fail:function(data){
			console.log(data);
		}
	});
	
	$("a[href=#productList]").click(function(){
		queryProductsList(1);
	});
	$("a[href=#capacitysList]").click(function(){
		queryCapacitysList(1);
	});
	
	$("#app_iframe").load(function(){
		$(this).height($(this)[0].contentWindow.document.body.scrollHeight);
	});
	
});

function queryAppList(productId){
	Web.Method.ajax("app/getAppList", {
		data:{
			productId:productId,
			page_flag:1,
			page_num:5
		},
		success:function(data){
			var ul = $("ul[name=appList]");
			ul.empty();
			if(data.info.length){
				for ( var key in data.info) {
					var item = data.info[key];
					ul.append("<li>"+(parseInt(key)+1)+"   "+item.name+"</li>");
				}
			}else{
				ul.append("<li style='text-align: center'><img src='images/add_yy.png'/></li>");
			}
		},
		fail:function(data){
			console.log(data);
		}
	});
}
