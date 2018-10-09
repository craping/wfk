/*$(function(){
	Web.Method.ajax("user/userInfo", {
		success:function(data){
			var html='<li class="system-nav-01"><a href="#" class="system-nav-a1">礼舍商城首页</a> </li>'
				+'<li class="system-nav-02"><a href="#" class="system-nav-a2">欢迎<br>'+data.info[0]["loginName"]+'</a></li>'
				+'<li><a href="#" class="system-nav-a3">我的站点</a></li>'
				+'<li><a href="#" class="system-nav-a4 editlogin">退出</a></li>';
			$("#index_head").append(html);
			$("#manUserId").val(data.info[0].id);
			var menuUL = '<ul>';
			var ml = data.info[1];
			for(var i in ml){
				if(ml[i].menuLevel == 1){
					menuUL += '<li class="system-subNav-lv1">' +
								'<span class="'+ ml[i].menuPic +'">'+ ml[i].menuName +'</span>' +
								'<ul>';
					for(var j in ml){
						if(ml[j].menuLevel == 2 && ml[j].parentId == ml[i].menuId){
							menuUL +='<li class="system-subNav-lv2">' +
											'<a href='+ ml[j].functionUrl +' target="iframe"><i>&gt;</i>'+ml[j].menuName+'</a>'+
										'</li>';
						}
					}
					menuUL += 	'</ul>'+
							'</li>';
				}
			}
			menuUL +='</ul>';
//			menuUL+=
//				'<li class="system-subNav-lv1">'
//           +' <span class="system-subNav-sp5">短信管理</span>'
//           +' <ul>'
//           +'	<li class="system-subNav-lv2"><a href="../sys/sys_sms.html" target="iframe"><i>&gt;</i>短信管理</a></li>'
//           +' </ul>'
//           +' </li>';
			$("#menuDIV").html(menuUL);
		},
		fail:function(data){
			window.location.href="../system/login.html";
		}
	});
});*/



$(document).on("click",".editlogin",function(){
	Web.Method.ajax("manUser/loginOut", {
		success:function(data){
			window.location.href="../system/login.html";
		},
		fail:function(data){
			alert(data.msg)
		}
	});
});