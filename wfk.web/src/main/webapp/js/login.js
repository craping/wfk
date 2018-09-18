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
	$("form").proAlert();
	Web.Method.ajax("user/getUserInfo", {
		success:function(data){
			var user = data.info;
			Web.token.user = user;
			window.location.href = 'index.html';
		},
		fail:function(data){
			console.log(data);
		}
	});
	
	$("#login").click(function(){
		var userId = $("#login_userId").val();
		var password = $("#login_password").val();
		if(!validate("login_userId,login_password")){
			return false;
		};
		/*if(!$(".verifyCode").hasClass("hidden")){
			if(!validate("login_code")){
				return false;
			};
			data.code = $("#login_code").val();
		}*/
		
		$("form").proAlert("show");
		Web.Method.ajax("user/login",{
			safe:true,
			data:{
				loginName:userId,
				loginPwd:password
			},
			success:function(data){
				$("form").proAlert("hide");
				$("form").msgAlert({
					alert:"info",
					msg:"登录成功", 
					delay:2000,
					style:"position: absolute;z-index:9999999"
				});
				window.location.href = 'index.html';
			},
			fail:function(data){
				$("form").proAlert("hide");
				if(data.result == 3 && data.errcode == 398){
					$(".verifyCode").removeClass("hidden");
					$(".verifyCode").find("img").attr("src",Web.Recource.server+"/api/sys/getCode?format=image");
					$(".verifyCode").find("img").click(function(){
						$(this).attr("src",Web.Recource.server+"/api/sys/getCode?format=image");
					});
				}else if(data.result == 201){
					$(".verifyCode").find("img").attr("src",Web.Recource.server+"/api/sys/getCode?format=image");
				}
				$("form").msgAlert({
					alert:"warning",
					msg:data.msg, 
					delay:2000
				});
			}
		});
	});
	$(document).keyup(function(event){
		if(event.keyCode == 13){
			$("#login").trigger("click");
		}
	});
	
//	$("#login_userId,#login_password,#login_code").bind("blur keyup keypress",function(){
//		validate(this.id);
//	});
	
	isBrowser();
});
var regRule = {
	//第一个参数代表是否必输true为必输，第二个参数代表必输项未输入的异常提示，
	//第三个参数代表匹配正则表达式，第四个参数代表匹配错误
	login_userId:[true,"请输入账号","/^[a-zA-Z0-9_]{6,20}$/","账号输入有误"],
	//mobilenum:["/^0?(13[0-9]|15[012356789]|18[012356789]|14[57])[0-9]{8}$/","mobilenumerror"],
	login_password:[true,"请输入密码","/^[a-zA-Z0-9_]{6,20}$/","密码输入有误"],
	login_code:[true,"请输入验证码","/^[a-zA-Z0-9]{4,7}$/","请输入合法的验证码"]
};

function validate(idStr){
	var ids = idStr.split(",");
	for(var key in ids){
		var index = ids[key];
		var id = "#"+index;
		if(regRule[index][0] == true && isNullOrEmpty($(id).val())){
			$("form").msgAlert({
				alert:"warning",
				msg:regRule[index][1], 
				delay:2000
			});
			return false;
		}
	}
	for(var key in ids){
		var index = ids[key];
		var id = "#"+index;
		if(!isNullOrEmpty(regRule[index][2])){
			var pass =eval(regRule[index][2]).test($(id).val());
			if(!pass){
				$("form").msgAlert({
					alert:"warning",
					msg:regRule[index][3], 
					delay:2000
				});
				return false;
			}
		}
	}
	return true;
}

function isBrowser(){
	    var Sys = {};
	    var ua = navigator.userAgent.toLowerCase();
	    var s;
	    (s = ua.match(/msie ([\d.]+)/))?Sys.ie = s[1]:
	    (s = ua.match(/firefox\/([\d.]+)/))?Sys.firefox = s[1]:
	    (s = ua.match(/chrome\/([\d.]+)/))?Sys.chrome = s[1]:
	    (s = ua.match(/opera.([\d.]+)/))?Sys.opera = s[1]:
	    (s = ua.match(/version\/([\d.]+).*safari/))?Sys.safari = s[1]:0;
	    if(Sys.ie){
	        if(Sys.ie == '6.0'||Sys.ie =='7.0'){
	        	alert("您所用的版本不兼容，推荐您使用Chrome,Firefox,Opera,Safari,IE8及以上");
	        	window.close();
	        }
	    }
	}
