$(function(){
	var flag=false;
	flag=get("flag");
	if(flag=="true"){
		Web.Method.ajax("supUser/getUserInfoP", {
			success:function(data){
				var html='<li class="system-nav-01"><a href="#" class="system-nav-a1">礼舍商城首页</a> </li>'
					+'<li class="system-nav-02"><a href="#" class="system-nav-a2">欢迎<br>'+data.info["loginName"]+'</a></li>'
					+'<li><a href="javascript:void(0);" class="system-nav-a3 mytemplate">我的站点</a></li>'
					+'<li><a href="javascript:void(0);" class="system-nav-a4 loginOut">退出</a></li>';
				$("#index_head").append(html);
				$("#supId").val(data.info["supId"]);
				$("a").attr("href","javascript:;")
				$(".go_supDetails").attr("src","../supplier/sup_updateP.html?supId="+$("#supId").val());
			},
			fail:function(data){
				window.location.href="../supplier/login.html";
			}
		});
		return;
	}else{
		Web.Method.ajax("supUser/getUserInfo", {
			success:function(data){
				var html='<li class="system-nav-01"><a href="#" class="system-nav-a1">礼舍商城首页</a> </li>'
					+'<li class="system-nav-02"><a href="#" class="system-nav-a2">欢迎<br>'+data.info["loginName"]+'</a></li>'
					+'<li><a id="mytemplate" href="#" class="system-nav-a3">我的站点</a></li>'
					+'<li><a href="#" class="system-nav-a4 loginOut">退出</a></li>';
				$("#index_head").append(html);
				$("#supId").val(data.info["supId"]);
				$("#go_supDetails").attr("href","../supplier/sup_details.html?supId="+$("#supId").val());
				$("#go_updateSup").attr("href","../supplier/sup_update.html?supId="+$("#supId").val());
				$(".go_supDetails").attr("src","../supplier/sup_details.html?supId="+$("#supId").val());
				//	$("#go_resetPwd").attr("href","../supplier/sup_resetPwd.html?supId="+$("#supId").val())
				//getMyTemplate(); // 加载模版
			},
			fail:function(data){
				window.location.href="../supplier/login.html";
			}
		});
	}
//	Web.Method.ajax("supUser/getUserInfo", {
//		success:function(data){
//			var html='<li class="system-nav-01"><a href="#" class="system-nav-a1">礼舍商城首页</a> </li>'
//				+'<li class="system-nav-02"><a href="#" class="system-nav-a2">欢迎<br>'+data.info["loginName"]+'</a></li>'
//				+'<li><a href="javascript:void(0);" class="system-nav-a3 mytemplate">我的站点</a></li>'
//				+'<li><a href="javascript:void(0);" class="system-nav-a4 loginOut">退出</a></li>';
//			$("#index_head").append(html);
//			$("#supId").val(data.info["supId"]);
//			$("#go_supDetails").attr("href","../supplier/sup_details.html?supId="+$("#supId").val());
//			$("#go_updateSup").attr("href","../supplier/sup_update.html?supId="+$("#supId").val());
//			$(".go_supDetails").attr("src","../supplier/sup_details.html?supId="+$("#supId").val());
//			tomytemplate();
//		//	$("#go_resetPwd").attr("href","../supplier/sup_resetPwd.html?supId="+$("#supId").val())
//		},
//		fail:function(data){
//			window.location.href="../supplier/login.html";
//		}
//	});
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

//function getMyTemplate(){
//	Web.Method.ajax("template/getMyTemps",{
//		data:{},
//		success:function(data){
//			$("#mytemplate").attr("href", data.info[0].htmlFilePath);
//		}
//	});
//}

function get(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]);
	return null;
}
