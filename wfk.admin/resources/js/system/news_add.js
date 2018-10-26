$(function(){
	$(document).on("click","#OK",function(){
		formSubmit();
	});
})

//表单提交
function formSubmit(){
	
	var validator=$("#addNews").validate(); //表单校验
	if(!$("#type").valibtValue()){return false;}; 
	if(!$("#title").valibtValue()){return false;};
	if(!$("#context").valibtValue()){return false;}; 
	
	var type = $("#type").attr("value");
	var title_pic = $("#title_pic");
	
	showLayer();
	$("#addNews").ajaxSubmit({
		iframe:true,
		dataType:"json",
		data:{type:type},
		url:Web.Recource.serverURL +"/news/addNews?type=" + type + "&title_pic=" + title_pic + "&" + $("#addNews").serialize(true),
		success: function(data){	
			hideLayer();
			if(data.errcode=="0"){
				$.confAlert({
					size:"sm",
					context:"添加成功",
					noButton:false,
					onOk:function(){
						window.location.href="news_list.html";
					}
				})
			} else {
				$.confAlert({
					size:"sm",
					context:"添加失败" + data.msg,
					noButton:false,
				})
			}
		},
		error: function(data){
			$.confAlert({
				size:"sm",
				context:data.msg,
				noButton:false 
			}) 
		}
	});
}