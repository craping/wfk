$(function(){
	Web.Method.ajax("supUser/getUserInfoP", {
		success:function(data){
			var user=data.info;
			var gologin='<a href="javascript:void(0);" class="loginOut">[退出]</a>';
			var	html='当前用户：'+data.info["loginName"]+'<a href="javascript:;" class="loginOut">[退出]</a><a href="#">礼舍商城首页</a>';
			$("#header").append(html);
			$("#supId").val(data.info["supId"]);
		},
		fail:function(data){
			window.location.href="../supplier/login.html"
		}
	});
	
	$(document).on("click",".loginOut",function(){
		Web.Method.ajax("supUser/loginOut", {
			success:function(data){
				window.location.href="../supplier/login.html";
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