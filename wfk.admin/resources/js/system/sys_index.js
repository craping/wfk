$(function(){
	Web.Method.ajax("user/userInfo", {
		success:function(data){
			var html='<li class="system-nav-01"><a href="#" class="system-nav-a1">微方凯管理后台</a> </li>'
				+'<li class="system-nav-02"><a href="#" class="system-nav-a2">欢迎<br>'+data.info.userName+'</a></li>'
				+'<li><a href="http://www.baidu.com" target="_blank" class="system-nav-a3">微方凯官网</a></li>'
				+'<li><a href="#" class="system-nav-a4 editlogin">退出</a></li>';
			$("#index_head").append(html);
		},
		fail:function(data){
			window.location.href="login.html";
		}
	});
});

$(document).on("click",".editlogin",function(){
	Web.Method.ajax("user/loginOut", {
		success:function(data){
			window.location.href="login.html";
		},
		fail:function(data){
			alert(data.msg)
		}
	});
});