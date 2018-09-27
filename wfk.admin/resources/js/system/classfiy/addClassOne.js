//获取url 的参数
function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]);
	return null;
}

$(function(){
	var validator=$("#addOne").validate(); //表单校验
	
	if(GetQueryString("classId")!=null){
		$("h1").html("添加二级分类属性");
		$("classid").attr("value",GetQueryString("classId"));
	}
	$(document).on("click","#ClassOk",function(){
		if(!validator.form()){
			return false;
		}
		if(!$("#status").valibtValue()){return false;};
		var className = $("#classsName").val();
		var seql = $("#seql").val();
		var status = $("#status").attr("value");
		var params;
		if($("classid").attr("value")!=null && $("classid").attr("value") > 0 ){
			var paraent=$("classid").attr("value")
			params={classifyName:className,seql:seql,classifyLevel:2,status:status,parent:paraent}
		}else{
			params={classifyName:className,seql:seql,classifyLevel:1,status:status}
		}
		if(isSeq(params)){
			showLayer();
			Web.Method.ajax("/classify/addClassify",{
				data:params,
				success:function(data){
					 if(data.errcode == "0"){
						 hideLayer();
						 $.confAlert({
							size:"sm",
							context:"添加成功",
							noButton:false,
							onOk:function(){
								if($("classid").attr("value")!=null && $("classid").attr("value") > 0 ){
									window.location.href="../system/product_classify_manageTwo.html";
								}else{
									window.location.href="../system/product_classify_manageOne.html";
								}
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
	$(document).on("click","#closewindos",function(){
		window.location.href="../system/product_classify_manageOne.html";
	})
})
 