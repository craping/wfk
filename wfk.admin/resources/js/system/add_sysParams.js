function get(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]);
	return null;
}

$(function(){
	var validator=$("#param_form").validate(); //表单校验
	$(document).on("click","#add_sysParam",function(){
		if(!validator.form()){
			return false;
		}
		if($("#name_check_msg").val()=="false"){
			$("#name_msg").show();
			$("#name_msg").html("系统参数已存在")
			return false;
		}
		var data=$("#param_form").serializeJson(true);
		Web.Method.ajax("sysParam/addParam",{
			data:data,
			success:function(data){
				window.location.href='../system/sys_params.html'
			},
			fail:function(data){
				$.confAlert({
					size:"sm",
					context:data.msg,
					noButton:false
				})
			}
		});
	})
	
	$(document).on("blur","#paramName",function(){
		Web.Method.ajax("sysParam/getParamList",{
			data:{
				paramName:$(this).val()
			},
			success:function(data){
				if(data.info.length>0){
					$("#name_msg").show();
					$("#name_msg").html("系统参数已存在")
					$("#name_check_msg").val(false);
				}else{
					$("#name_check_msg").val(true);
				}
			},
			fail:function(data){
				
			}
		});
	});
});
