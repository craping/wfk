//获取url 的参数
function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]);
	return null;
}

$(function(){
	var validator=$("#form").validate(); //表单校验
	var attId = GetQueryString("attId");
	$("#attid").attr("value",attId);
 
	$(document).on("click","#AddAttTypeOK",function(){
		if(!validator.form()){
			return false;
		}
		var attName=$("#attributeName").val();
		var attId=$("#attid").attr("value");
		showLayer();
		Web.Method.ajax("/attribute/addAttribute",{
			async:false,
			data:{attType:attId,attName:attName},
			success:function(data){
				hideLayer();
				if(data.errcode == "0"){
					$.confAlert({
						size:"sm",
						context:"添加成功",
						noButton:false,
						onOk:function(){
							window.location.href="../system/product_overAttributeList.html?attId="+attId;
						}
					})
				}
			},fail : function(data) {
				hideLayer();
				$.confAlert({
					size:"sm",
					context:data.msg,
					noButton:false 
				}) 
			}
		})
	})
	$(document).on("click","#returnAtt",function(){
		window.location.href="../system/product_attribute_manage.html";
	})
	
})

//修改属性类别
function addAttributeType(attribute){
	var i;
	Web.Method.ajax("/attribute/addAttribute",{
		
		async:false,
		data:attribute,
		success:function(data){
			 i=data
		}
	})
	return i;
}