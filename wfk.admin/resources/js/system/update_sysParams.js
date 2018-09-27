function get(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]);
	return null;
}

$(function(){
	var validator=$("#param_form").validate(); //表单校验
	var paramName=get("paramName");
	Web.Method.ajax("sysParam/getParamsByName",{
		data:{
			paramName:paramName
		},
		success:function(data){
			$(".param_details").each(function(){
					for(var item in data.info){
						if(item==$(this).attr("name")){
							$(this).val(data.info[item]);
						}
					}
		    })
		},
		fail:function(data){
			$.confAlert({
				size:"sm",
				context:data.msg,
				noButton:false
			})
		}
	});
	
	$(document).on("click","#update_sysParam",function(){
		if(!validator.form()){
			return false;
		}
		var data=$("#param_form").serializeJson(true);
		Web.Method.ajax("sysParam/updateParam",{
			data:data,
			success:function(data){
				window.location.href='../sys/sys_params.html'
			},
			fail:function(data){
				$.confAlert({
					size:"sm",
					context:data.msg,
					noButton:false
				})
			}
		});
	});
})
