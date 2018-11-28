var pid = Web.Method.GetQueryString("id");

$(function(){

	$(document).on("click","dd[class='selectOption'] ul li",function(){
		$(this).parent().parent().hide();
		$(this).parent().parent().prev().removeClass("cur");
		$(this).parent().parent().prev().html($(this).children("a").html())
		$(this).parent().parent().prev().attr("value",$(this).attr("value"));
	})
	
	//保存商品
	$("#ok_btn").click(function(){
		formSubmit();
	});

	//提交审核商品
	$("#cancel_btn").click(function(){
		
	});
	ProductDetails();
});

//加载商品信息
function ProductDetails(){
	Web.Method.ajax("/product/getSimpleInfo",{
		async:false,
		data:{
			id: pid
		},
		success:function(data){
			if(data != null && data != undefined && data.info != null && data.info != undefined){
				$.each(data.info, function(key, value){
					Web.Method.setValue(key, value);
					if (key == "content" && key != "" && key != null) {
						$("#context").html(value);
					}
					if (key == "appType") {
						$("#app_type").attr("value", value);
						var msg = "未知异常";
						if (value == "1") {
							msg = "笔记本液晶屏";
						} else if (value == "2") {
							msg = "工控液晶屏";
						} else if (value == "3") {
							msg = "安防液晶屏";
						} else if (value == "4") {
							msg = "监控液晶屏";
						} else if (value == "5") {
							msg = "医疗设备屏";
						} else if (value == "6") {
							msg = "广告机液晶屏";
						} 
						$("#app_type").html(msg);
					}
				});
			}
		}
	});
}

function showLayer(){
	layer.msg('提交中....',{icon:16,time:false});
	$("#hiddensd").show();
}
function hideLayer(){
	$("#layui-layer1").hide();
	layer.closeAll('loading');
	$("#hiddensd").hide();
	setTimeout(function(){
	    layer.closeAll('loading');
	}, 1000);
}


//表单提交
function formSubmit(){
	if(isNullOrEmpty($("#productName").val())){
		alert("请输入产品名称");
		$("#productName").focus();
		return false;
	}

	if(isNullOrEmpty($("#panelBrand").val())){
		alert("请输入面板品牌");
		$("#panelBrand").focus();
		return false;
	}

	var model = $("#panelModel").val();
	if(isNullOrEmpty(model)){
		alert("请输入面板型号");
		$("#panelModel").focus();
		return false;
	}
	
	var app_type = $("#app_type").attr("value");
	showLayer();
	$("#editForm").ajaxSubmit({
		iframe:true,
		dataType:"json",
		data:{},
		url:Web.Recource.serverURL +"/product/updateProduct?id="+ pid +"&app_type=" + app_type + "&" + $("#editForm").serializeJson(true),
		success: function(data){
			hideLayer();	
			if(data.errcode =="0"){
				alert("修改成功！");
				window.location.href="product_list.html";
			}else{
				alert("修改失败！");
				window.location.href="product_list.html";
			}
		},
		error: function(data){
			alert("修改失败！")
			window.location.href="product_list.html";
		}
	});
}