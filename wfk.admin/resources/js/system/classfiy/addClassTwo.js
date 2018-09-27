//获取url 的参数
function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]);
	return null;
}

$(function(){
	var validator=$("#addTwo").validate(); //表单校验
	classList();
	
	$(document).on("click","#ClassOk",function(){
		if(!validator.form()){
			return false;
		}
		
		if(!$("#parend").valibtValue()){return false;};
		if(!$("#status").valibtValue()){return false;};
		
		var className = $("#classsName").val()==""?undefined:$("#classsName").val();
		var seql = $("#seql").val()==""?undefined:$("#seql").val();
		var status = $("#status").attr("value")==""?undefined:$("#status").attr("value");
		var level=2;
		var parend = $("#parend").attr("value")==""?undefined:$("#parend").attr("value");
		var params;
		if(GetQueryString("classId")!=null){
			var paraent=GetQueryString("classId")
			params={classifyName:className,seql:seql,classifyLevel:level,status:status,parent:parend}
		}else{
			params={classifyName:className,seql:seql,classifyLevel:level,status:status,parent:parend}
		}
		if(isSeq(params)){
			showLayer();
			Web.Method.ajax("/classify/addClassify",{
				data:params,
				success:function(data){
					hideLayer();
					 if(data.errcode == "0"){
						 $.confAlert({
								size:"sm",
								context:"添加成功",
								noButton:false,
								onOk:function(){
									window.location.href="../system/product_classify_manageTwo.html";
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
		window.location.href="../system/product_classify_manageTwo.html";
	})
})
function classList(params){

	Web.Method.ajax("classify/selectBaseClassify",{
		data:{classifyLevel:1,status:1},
		success:function(data){
			var html='';
			var cls=data.info;
			for (var i = 0; i <  cls.length; i++) {
				html+='<li value="'+cls[i].classifyId+'"><a href="#">'+cls[i].classifyName+'</a></li>';
			}
			$(".parend").empty();
			$(".parend").append(html);
		}
	});  
}
