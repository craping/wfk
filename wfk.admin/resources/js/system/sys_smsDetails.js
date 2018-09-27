$(function(){
	var id=get("id");
	Web.Method.ajax("sysSms/getSms",{
		data:{
			id:id
		},
		success:function(data){
			$(".sms_details").each(function(){
				for(var item in data.info){
					if(item==$(this).attr("name"))
						$(this).html(data.info[item]);
				}
			});
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

$(document).on("click","#return_sysSms",function(){
	window.location.href="../system/sys_sms.html";
});

function get(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]);
	return null;
}