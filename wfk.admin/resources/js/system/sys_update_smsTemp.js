$(function(){
	var validator=$("#temp_form").validate(); //表单校验
	var id=get("id");
	Web.Method.ajax("sms/getsmsTem",{
		data:{
			id:id
		},
		success:function(data){
			if(data.info.status==0){
				$("#status").html('');
				$("#status").html('<a value="0" href="javascript:;">无效</a>');
			}
			if(data.info.status==1){
				$("#status").html('');
				$("#status").html('<a value="1" href="javascript:;">有效</a>');
			}
			$(".temp_details").each(function(){
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
	
	$(document).on("click","#return_list",function(){
	  location.href="../system/sys_sms_temp.html";
	});
	$(document).on("click","#update_button",function(){
		if(!validator.form()){
			return false;
		}
		var appScen=$("[name=appScen]").val()==""?undefined:$("[name=appScen]").val();
		var content=$("[name=content]").val()==""?undefined:$("[name=content]").val();
		var status=$("#status").children().attr("value")==""?undefined:$("#status").children().attr("value");
		Web.Method.ajax("sms/updateSmsTem",{
			data:{
				id:id,
				appScen:appScen,
				content:content,
				status:status
			},
			success:function(data){
				location.href="../system/sys_sms_temp.html";
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
	
	
});




function get(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]);
	return null;
}