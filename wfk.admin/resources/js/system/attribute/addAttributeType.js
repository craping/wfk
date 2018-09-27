$(function(){
	var validator=$("#form").validate(); //表单校验
	$(document).on("click","#attOk",function(){
		if(!validator.form()){
			return false;
		}
		
		if(!$("#status").valibtValue()){return false;};
		var attName=$("#attName").val();
		var status=$("#status").attr("value");
		showLayer();
		Web.Method.ajax("/attribute/addAttributeType",{
			async:false,
			data:{status:status,atttypeTypeName:attName},
			success:function(data){
				hideLayer();
				if(data.errcode == "0"){
					$.confAlert({
						size:"sm",
						context:"添加成功",
						noButton:false,
						onOk:function(){
							window.location.href="../system/product_attribute_manage.html";
						}
					})
				}
			},fail : function(data) {
				hideLayer();
				$.confAlert({
					size:"sm",
					context:data.msg,
					noButton:false,
					onOk:function(){
						hideLayer();
					}
				}) 
			}
		})
	})
	$(document).on("click","#returnAtt",function(){
		window.location.href="../system/product_attribute_manage.html";
	})
})