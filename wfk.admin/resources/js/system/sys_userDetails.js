function get(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]);
	return null;
}

$(function(){
	var custno=get("custno");
	Web.Method.ajax("sysUserPerson/getUserPersonInfo",{
		data:{
			custno:custno
		},
		success:function(data){
			$(".user_details").each(function(){
					for(var item in data.info){
						if(item==$(this).attr("name")){
							$(this).html(data.info[item]);
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
	
	$("#userCred").click(function(){
		var userName=$("[name=loginName]").html();
		window.location.href="../system/sys_userCapital.html?custno="+custno+"&userName="+userName;
	})
})