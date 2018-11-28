$(function(){

	$(document).on("click","dd[class='selectOption'] ul li",function(){
		$(this).parent().parent().hide();
		$(this).parent().parent().prev().removeClass("cur");
		$(this).parent().parent().prev().html($(this).children("a").html())
		$(this).parent().parent().prev().attr("value",$(this).attr("value"));
	})
	
	// 保存商品
	$("#ok_btn").click(function(){
		formSubmit();
	});

	// 取消
	$("#cancel_btn").click(function(){
		window.location.href="product_list.html";
	});
});

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

	if(isNullOrEmpty($("#product_name").val())){
		alert("请输入产品名称");
		$("#product_name").focus();
		return false;
	}

	if(isNullOrEmpty($("#panel_brand").val())){
		alert("请输入面板品牌");
		$("#panel_brand").focus();
		return false;
	}

	var model = $("#panel_model").val();
	if(isNullOrEmpty(model)){
		alert("请输入面板型号");
		$("#panel_model").focus();
		return false;
	}

	var app_type = $("#app_type").attr("value");
	showLayer();
	$("#addProductForm").ajaxSubmit({
		iframe:true,
		dataType:"json",
		data:{},
		url:Web.Recource.serverURL +"/product/addProduct?app_type=" + app_type + "&" + $("#addProductForm").serializeJson(true),
		success: function(data){
			hideLayer();
			if(data.errcode =="0"){
				$.confAlert({
					size:"sm",
					context:"添加成功,点击确定编辑产品文档",
					onNo:function(){window.location.href="product_list.html";},
					onOk:function(){window.location.href="product_add_file.html?t=add&m=" + model;}
				})
			}else{
				alert("添加失败！");
			}
		},
		error: function(data){
			alert("添加失败！");
		}
	});
}
