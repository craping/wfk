//获取url 的参数
function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]);
	return null;
}
$(function(){
	var validator=$("#updateOne").validate(); //表单校验
	if(GetQueryString("classId")!=null){
		$("classId").attr("value",GetQueryString("classId"))
		classLise({classifyId:GetQueryString("classId")});
	}
	$(document).on("click","#ClassOk",function(){
		if(!validator.form()){
			return false;
		}
		var className = $("#classsName").val()==""?undefined:$("#classsName").val();
		var seql = $("#seql").val()==""?undefined:$("#seql").val();
		var level= 1 ;
		var status = $("#status").attr("value")==""?undefined:$("#status").attr("value");
 		var classId = $("classId").attr("value")==""?undefined:$("classId").attr("value");
 		if(isSeq({seql:seql,classifyId:classId,classifyLevel:1})){
 			showLayer();
			Web.Method.ajax("/classify/updateClassify",{
				data:{
					classifyName:className,  
					seql:seql, 
					status:status, 
					classifyId:classId, 
					classifyLevel:level,
					parentId:0
				},
				success:function(data){
					hideLayer();
					if(data.errcode == "0"){
						 $.confAlert({
								size:"sm",
								context:"修改成功",
								noButton:false,
								onOk:function(){
									window.location.href="../system/product_classify_manageOne.html";
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
			}); 
 		}
	})
	$(document).on("click","#closeWindeos",function(){
		window.location.href="../system/product_classify_manageOne.html"
	})
	
})


//class
function classLise(params){
	Web.Method.ajax("classify/selectBaseClassify",{
		async:false,
		data:params,
		success:function(data){
			$("#classsName").val(data.info[0].classifyName);
			$("#seql").val(data.info[0].seq);
			$("#status").attr("value",data.info[0].status);
			
			if(data.info[0].status == "1"){
				$("#status").html("有效");
			}else if(data.info[0].status == "0"){
				$("#status").html("无效");
			}
		}
	})
}
