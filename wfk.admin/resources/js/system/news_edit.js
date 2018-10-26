var nid = Web.Method.GetQueryString("id");
$(function(){
	$(document).on("click","#OK",function(){
		formSubmit();
	});
	
	getNewsInfo();
})

function getNewsInfo(){
	 Web.Method.ajax("news/getInfoById",{
		data:{id:nid },
		async:false,
		success:function(data){
			if(data != null && data != undefined && data.info != null && data.info != undefined){
				$.each(data.info, function(key, value){
					Web.Method.setValue(key, value);
					if (key == "content" && key != "" && key != null) {
						$("#context").html(value);
					}
					
					if (key == "type") {
						$("#type").attr("value", value);
						var msg = "未知异常";
						if (value == "1") {
							msg = "公司新闻";
						} else if (value == "2") {
							msg = "行业新闻";
						} else if (value == "3") {
							msg = "社会热点";
						} 
						$("#type").html(msg);
					}
				});
			}
		},
		fail:function(data){
			$.confAlert({
				size:"sm",
				context:data.msg,
				noButton:false
			})
		}
	});
 }

//表单提交
function formSubmit(){
	
	var validator=$("#updateNews").validate(); //表单校验
	if(!$("#type").valibtValue()){return false;}; 
	if(!$("#title").valibtValue()){return false;};
	if(!$("#context").valibtValue()){return false;}; 
	
	var type = $("#type").attr("value");
	var title_pic = $("#title_pic");
	
	showLayer();
	$("#updateNews").ajaxSubmit({
		iframe:true,
		dataType:"json",
		data:{type:type},
		url:Web.Recource.serverURL +"/news/updateNews?id=" + nid +"&type=" + type + "&title_pic=" + title_pic + "&" + $("#addNews").serialize(true),
		success: function(data){	
			hideLayer();
			if(data.errcode=="0"){
				$.confAlert({
					size:"sm",
					context:"编辑成功",
					noButton:false,
					onOk:function(){
						window.location.href="news_list.html";
					}
				})
			} else {
				$.confAlert({
					size:"sm",
					context:"编辑失败" + data.msg,
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