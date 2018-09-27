$(function (){
	var validator=$("#addThree").validate(); //表单校验
	
	$.fn.appendHtml=function(html){
		$(this).empty();
		$(this).append(html);
	} 
	loadClassfiy();//加载一级
	//展示第二级分类
	$(document).on("click",".clsIdZrOption",function(){
		var parendId=$(this).attr("value");
		var cls =  classLise({classifyLevel:2,status:1,parentId:parendId}).info;
		var html='';
		for (var i = 0; i < cls.length; i++) {
			html+='<li value="'+cls[i].classifyId+'" class="clsIdStOption" ><a href="javascript:;">'+cls[i].classifyName+'</a></li>';
		}
		$(".clsIdSt").appendHtml(html);
		$(".clsIdNd").appendHtml("");
		$("#clsIdSt").html("请选择");
		$("#clsIdSt").attr("value","");
		
	})
	//展示第三级分类
	$(document).on("click",".clsIdStOption",function(){
		var parendId=$(this).attr("value");
		var cls =  classLise({classifyLevel:3,status:1,parentId:parendId}).info;
		var html='';
		for (var i = 0; i < cls.length; i++) {
			html+='<li value="'+cls[i].classifyId+'" class="clsIdNdOption" ><a href="javascript:;">'+cls[i].classifyName+'</a></li>';
		}
		$(".clsIdNd").appendHtml(html);
	})
	$(document).on("click","#addClass",function(){
		if(!validator.form()){
			return false;
		}
		if(!$("#clsIdZr").valibtValue()){return false;};
		if(!$("#clsIdSt").valibtValue()){return false;};
		if(!$("#status").valibtValue()){return false;};
		var className=$("#className").val();
		var clsIdZr = $("#clsIdZr").attr("value");
		var clsIdSt = $("#clsIdSt").attr("value");
		var seql = $("#seql").val();
		var status = $("#status").attr("value");
		var level=3;
		var params={classifyName:className,status:status,parent:clsIdSt,classifyLevel:level,seql:seql}
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
									window.location.href="../system/product_classify_manageThree.html";
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
	})
	$("#closewindos").click(function(){
		location.href="../system/product_classify_manageThree.html";
	})
})

function loadClassfiy(){
	var cls =  classLise({classifyLevel:1,status:1}).info;
	var html='';
	for (var i = 0; i < cls.length; i++) {
		html+='<li value="'+cls[i].classifyId+'" class="clsIdZrOption" ><a href="javascript:;">'+cls[i].classifyName+'</a></li>';
	}
	$(".clsIdZr").appendHtml(html);
}
//classifyLevel：等级
//status:状态
//parentId：上一级
function classLise(params){
	var obj;
	Web.Method.ajax("classify/selectBaseClassify",{
		async:false,
		data:params,
		success:function(data){
			obj=data;
		}
	})
	return obj;
}
function addClass(params){
	Web.Method.ajax("/classify/addClassify",{
		data:params,
		success:function(data){
			 if(data.errcode == "0"){
				$.confAlert({
						size:"sm",
						context:"添加成功",
						noButton:false,
						onOk:function(){
							window.location.href="../system/product_classify_manageThree.html";
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
}