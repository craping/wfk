//加载RSA公钥
Web.Method.ajax("getPublicKey", {
	url:Web.Recource.serverSysURL,
	success:function(data){
		Crypto.setRSAPublicKey(data.info.n);
		Crypto.encryptFlag = data.info.id;
	},
	fail:function(data){}
});

$(function(){
	$(document).keyup(function(event){
		if(event.keyCode == 13){
			$("#sys_login").trigger("click");
		}
	});
	
	Web.Method.ajax("user/adminLogin", {
		success:function(data){
			var user = data.info;
			Web.token.user = user;
			window.location.href = '../system/index.html';
		},
		fail:function(data){
			console.log(data);
		}
	});
	
	//获取焦点后清除错误提示信息
	$("input").focus(function(){
		  $(this).parent().next().html("");
		});
	
	
	$("#sys_login").click(function(){
		var loginName = $("#login_name").val();
		var password = $("#login_password").val();
		if(!validate("login_name,login_password")){
			return false; 
		};
		Web.Method.ajax("user/adminLogin",{
			safe:true,
			data:{
				login_name:loginName,
				login_pwd:password
			},
			success:function(data){
				$.confAlert({
					size:"sm",
					context:"登录成功",
					noButton:false
				})
			   window.location.href = '../system/index.html';
			},
			fail:function(data){
				$("#login_name").parent().next().html(data.msg);
				
			}
		});
	});
	$(document).keyup(function(event){
		if(event.keyCode == 13){
			$("#login").trigger("click");
		}
	});
	
});
var regRule = {
	//第一个参数代表是否必输true为必输，第二个参数代表必输项未输入的异常提示，
	//第三个参数代表匹配正则表达式，第四个参数代表匹配错误
	login_name:[true,"请输入账号","/^[a-zA-Z0-9_]{4,20}$/","账号输入有误"],
	login_password:[true,"请输入密码","/^[a-zA-Z0-9_]{6,20}$/","密码输入有误"],
	login_code:[true,"请输入验证码","/^[a-zA-Z0-9]{4,7}$/","请输入合法的验证码"]
};

function validate(idStr) {
	var ids = idStr.split(",");
	for ( var key in ids) {
		var index = ids[key];
		var id = "#" + index;
		if (regRule[index][0] == true && isNullOrEmpty($(id).val())) {
			$(id).parent().next().html(regRule[index][1]);
			return false;
		}
	}
	for ( var key in ids) {
		var index = ids[key];
		var id = "#" + index;
		if (!isNullOrEmpty(regRule[index][2])) {
			var pass = eval(regRule[index][2]).test($(id).val());
			if (!pass) {
				$(id).parent().next().html(regRule[index][3]);
				return false;
			}
		}
	}
	return true;
}
