//获取url 的参数
function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]);
	return null;
}

$(function(){
	var attId = GetQueryString("attId");
	var typeid = GetQueryString("typeid");
	$("attId").attr("value",attId);
	$("typeid").attr("value",typeid);
	getAttributeType({attrTstatus:0},typeid);//下拉
	getAttribute({attId:attId});
});

function getAttributeType(attribute,attId){
	Web.Method.ajax("/attribute/selectFeaAttributeType",{
		async:false,
		data:attribute,
		success:function(data){
			var html ='';
			var d=data.info;
			for (var i = 0; i < d.length; i++) {
				if(attId == d[i].attType ){
					$("#parend").html(d[i].typeName);
					$("#parend").attr("value",d[i].attType);
				}
				html+='<li value="'+d[i].attType+'"><a href="#">'+d[i].typeName+'</a></li>';
			}
			$("#selectList").empty();
			$("#selectList").append(html);
		}
	})
}

//查询
function getAttribute(attribute){
	Web.Method.ajax("/attribute/selectFeaAttribute",{
		async:false,
		data:attribute ,
		success:function(data){
			$("#attName").val(data.info[0].attName);
		}
	})
}
$(document).on("click","#updateAttributeok", function(){
	var validator=$("#att_form").validate(); //表单校验
	if(!validator.form()){
		return false;
	}
	if(!$("#parend").valibtValue()){return false;};
	var attType = $("#parend").attr("value");
	var attName = $("#attName").val();
	var attId = $("attId").attr("value");
	showLayer();
	Web.Method.ajax("/attribute/updateAttribute",{
		async:false,
		data:{attributeId:attId,attType:attType,attributeName:attName} ,
		success:function(data){
			hideLayer();
			if(data.errcode == "0"){
				$.confAlert({
					size:"sm",
					context:"修改成功",
					noButton:false,
					onOk:function(){
						window.location.href="../system/product_overAttributeList.html?attId="+attType;
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
