//获取url 的参数
function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]);
	return null;
}

$(function(){
	var attId = GetQueryString("attId");
	getAttributeType({attTypeId:attId});
	
	//修改属性类别按钮
	$(document).on("click","#updateAttTypeOK",function(){
		var validator=$("#att_form").validate(); //表单校验
		if(!validator.form()){
			return false;
		}
		var attName = $("#att_name").val();
		var attId = $("#attId").attr("value");
		showLayer();
		Web.Method.ajax("/attribute/updateAttributeType",{
			async:false,
			data:{
				attTypeId:attId,
				attTypeName:attName
			},
			success:function(data){
				hideLayer();
				if(data.errcode == "0"){
					$.confAlert({
						size:"sm",
						context:"修改成功",
						noButton:false,
						onOk:function(){
							window.location.href="../system/product_attribute_manage.html";
						}
					})
				}
			},fail : function(data) {
				$.confAlert({
					size:"sm",
					context:data.msg,
					noButton:false 
				}) 
			}
		});
	});
	
	$(document).on("click","#closeWindos",function(){
		window.location.href="../system/product_attribute_manage.html";
	});
	
})

function getAttributeType(attribute){
	Web.Method.ajax("/attribute/selectFeaAttributeType",{
		async:false,
		data:attribute,
		success:function(data){
			$("#att_name").val(data.info[0].typeName);
			$("#attId").attr("value",attribute.attTypeId);
		}
	})
}
//修改属性类别
function updateAttributeType(attribute){
	var i;
	Web.Method.ajax("/attribute/updateAttributeType",{
		async:false,
		data:attribute,
		success:function(data){
			i=data;
		}
	})
	return i;
}