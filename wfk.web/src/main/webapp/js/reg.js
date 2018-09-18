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
	$("#regDiv").proAlert();
	
	$("#regBotton").click(function(){
		if(!validate("reg_userName,reg_password,regp_password,reg_name,reg_mobilenum,reg_email",0,true)){
			return false;
		}
		
		$("#regDiv").proAlert("show");
		Web.Method.ajax("user/register",{
			safe:true,
			data:{
				loginName:$("#reg_userName").val(),
				loginPwd:$("#reg_password").val(),
				name:$("#reg_name").val(),
				email:$("#reg_email").val(),
				phone:$("#reg_mobilenum").val()
			},
			success:function(data){
				$("#regDiv").proAlert("hide");
				window.location.href = 'login.html';
				$("body").msgAlert({
					alert:"success",
					msg:"恭喜您用户注册成功!", 
					delay:2000
				});
			},
			fail:function(data){
				$("#regDiv").proAlert("hide");
				$("#regDiv").msgAlert({
					alert:"danger",
					msg:data.msg, 
					delay:2000
				});
			}
		});
	});
	
	$("#reg_userName,#reg_password,#regp_password,#reg_mobilenum,#reg_name,#reg_email").bind("blur keyup keypress",function(){
		validate(this.id,0,false);
	});
	
	$("#regp_password").bind("blur keyup keypress",function(){
		var reg_password=$("#reg_password").val();
		var rep_password=this.value;
		if(!(reg_password==rep_password && rep_password!='')){
			$(this).parent().addClass("has-error");
			$("#regp_passworderror").show();
		}else{
			$(this).parent().removeClass("has-error");
			$("#regp_passworderror").hide();
		}
	});
	
});

var regRule = {
		//PC端验证配置
		//第一个参数代表匹配正则表达式，第二个参数代表匹配错误提示元素的id
		reg_userName:["/^[a-zA-Z0-9_]{6,20}$/","reg_errUserName"],
		reg_password:["/^[a-zA-Z0-9_]{6,20}$/","reg_passworderror"],
		regp_password:["/^[a-zA-Z0-9_]{6,20}$/","regp_passworderror"],
		reg_name:["/[\u4E00-\u9FA5]{2,5}(?:·[\u4E00-\u9FA5]{2,5})*/","reg_nameerror"],
		reg_mobilenum:["/^0?(13[0-9]|15[012356789]|18[012356789]|14[57])[0-9]{8}$/","reg_mobilenumerror"],
		reg_email:["/^[a-zA-Z0-9_+.-]+\@([a-zA-Z0-9-]+\.)+[a-zA-Z0-9]{2,4}$/","reg_emailerror"],
		reg_qq:["/^[1-9]{1}[0-9]{4,11}$/","reg_qqerror"],
		reg_code:["/^[0-9]{6}$/","reg_codeerror"],
		//移动端验证
		//第一个参数代表匹配正则表达式，第二个参数代表必输项未输入的异常提示
		reg_userName_sm:["/^[a-zA-Z0-9_]{6,20}$/","用户名为6-20位的数字下划线和字母的组合"],
		reg_password_sm:["/^[a-zA-Z0-9_]{6,20}$/","密码为6-20位的数字下划线和字母的组合"],
		regp_password_sm:["/^[a-zA-Z0-9_]{6,20}$/","两次输入的密码不一致请重新输入"],
		reg_name_sm:["/[\u4E00-\u9FA5]{2,5}(?:·[\u4E00-\u9FA5]{2,5})*/","请输入合法的真实姓名"],
		reg_mobilenum_sm:["/^0?(13[0-9]|15[012356789]|18[012356789]|14[57])[0-9]{8}$/","请输入正确的11位电话号码"],
		reg_email_sm:["/^[a-zA-Z0-9_+.-]+\@([a-zA-Z0-9-]+\.)+[a-zA-Z0-9]{2,4}$/","请输入常用的Email地址"],
		reg_qq_sm:["/^[1-9]{1}[0-9]{4,11}$/","请输入正确的QQ号码"],
		reg_code_sm:["/^[0-9]{6}$/","请输入有效的短信验证码"]
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
					$(id).parent().addClass("has-error");
					$("#"+regRule[index][1]).show();
					if(isFocus){
						$(id).focus();
					}
					return false;
				}else{
					$(id).parent().removeClass("has-error");
					$("#"+regRule[index][1]).hide();
				}
				
			}else{
				if(!pass){
					$("#regFromDiv-sm").proAlert({
						alert:"warning",
						style:"background:#000;color:#fff",
						msg:regRule[index][1], 
						delay:2000
					});
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

