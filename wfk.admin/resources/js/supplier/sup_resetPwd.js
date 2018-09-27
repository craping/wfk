$(function(){
	var id=get("id");
	$("#manUserId").val(id)
	$("input").focus(function() {
			$(this).next().html("");
		});

	$("#newp_pwd").bind("blur",function(){
		var new_pwd=$("#new_pwd").val();
		var newp_pwd=this.value;
		if(!(new_pwd==newp_pwd && newp_pwd!='')){
			$(this).next().html("两次输入的密码不一致请重新输入");
			$("#check_pwd").val("false");
		}
	});
	$("#new_pwd").bind("blur",function(){
		validate(this.id,0,false);
	});
	
});

     $(document).on("click","#reset_pwd_submit",function(){
		if($("#check_pwd").val()=="false"){
			return false;
		}
		if(!validate("new_pwd",0,false)){
			return false;
		}
		Web.Method.ajax("manUser/updateManUser",{
			safe:true,
			data:{
				id:$("#manUserId").val(),
				loginPwd:$("[name=loginPwd]").val(),
			},
			success:function(data){
				window.location.href="../supplier/index.html";
			},
			fail:function(data){
				alert(data.msg);
			}
		});
		
	});
	
	$(document).on("click","#return_man_list",function(){
		window.location.href="../supplier/index.html";
	});
	
	var regRule = {
			//PC端验证配置
			//第一个参数代表匹配正则表达式，第二个参数代表匹配错误提示元素的id
			new_pwd:["/^[a-zA-Z0-9_]{6,20}$/","密码为6-20位的数字下划线和字母的组合"]
		};

	/**
	 * 参数校验
	 * idStr:需要校验的参数id字符串，多个id以,间隔
	 * deviceType：设备类型(0:PC端，1为移动设备)
	 * isFocus：异常时是否将光标移到异常信息框true：是，false：否
	 * */
	function validate(idStr,deviceType,isFocus){
		var ids = idStr.split(",");
		
		for(var key in ids){
			var index = ids[key];
			var id = "#"+index;
			if(!isNullOrEmpty(regRule[index][0])){
				var pass =eval(regRule[index][0]).test($(id).val());
				if(deviceType == 0){
					if(!pass){
						$(id).next().html(regRule[index][1]);
						if(isFocus){
							$(id).focus();
						}
						return false;
					}	
				}	
			}
		}
		return true;
	}
	
	function get(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) return unescape(r[2]);
		return null;
	}	