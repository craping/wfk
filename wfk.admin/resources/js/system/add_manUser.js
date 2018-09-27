$(function(){
	//获取焦点后清除错误提示信息
	$("input").focus(function() {
		$(this).next().hide();
	});
	
	
	$("#userName,#email,#loginPwd").bind("blur",function(){
		validate(this.id,0,false);
	});
	$("#loginName").bind("blur",function() {
		if(!validate(this.id,0,false)){
			$("#name_check_msg").val("false");
			return false;
		}
		Web.Method.ajax("manUser/checkmanUser", {
			data : {
				loginName : $("#loginName").val(),
			},
			success : function(data) {
				if (data.errcode == 1) {
					$("#name_msg").html("用户名已存在");
					$("#name_msg").show();
					$("#name_check_msg").val("false");
				}else{
					$("#name_check_msg").val("true");
				}
			},
			fail : function(data) {
			}
		});
	});
	$("#phone").bind("blur",function() {
		if(!validate(this.id,0,false)){
			$("#phone_check_msg").val("false");
			return false;
		}
		Web.Method.ajax("manUser/checkmanUser", {
			data : {
				phone : $("#phone").val(),
			},
			success : function(data) {
				if (data.errcode == 1) {
					$("#phone_msg").html("手机号码已被使用");
					$("#phone_msg").show();
					$("#mobile_check_msg").val("false");
				}else{
					$("#mobile_check_msg").val("true");
				}
			},
			fail : function(data) {
			}
		});
	});
	
	$(document).on("click","#add_manUser",function(){
		if($("#name_check_msg").val()=="false"){
			return false;
		}
		if($("#phone_check_msg").val()=="false"){
			return false;
		}
		if(!validate("userName,email,loginPwd",0,false)){
			return false;
		}
		var loginName=$("#loginName").val();
		var loginPwd=$("#loginPwd").val();
		var userName=$("#userName").val();
		var phone=$("#phone").val();
		var email=$("#email").val();
		
		Web.Method.ajax("manUser/addManUser", {
			data : {
				loginName:loginName,
				loginPwd:loginPwd,
				userName:userName,
				phone:phone,
				email:email
			},
			success : function(data) {
				$.confAlert({
					size:"sm",
					context:"添加成功",
					noButton:false
				})
				window.location.href="../system/man_user_list.html";
			},
			fail : function(data) {
				$.confAlert({
					size:"sm",
					context:"服务器异常,请稍后再试!",
					noButton:false
				})
			}
		});	
	});
	
});
		


$(document).on("click",".return_man_list",function(){
	window.location.href="../system/man_user_list.html";
});

var regRule = {
		//PC端验证配置
		//第一个参数代表匹配正则表达式，第二个参数代表匹配错误提示元素的id
		loginName:["/^[a-zA-Z0-9_]{4,20}$/","用户名为4-20位的数字下划线和字母的组合"],
		userName:["/[\u4E00-\u9FA5]{2,5}(?:·[\u4E00-\u9FA5]{2,5})*/","请输入合法的真实姓名"],
		loginPwd:["/^[a-zA-Z0-9_]{6,20}$/","密码为6-20位的数字下划线和字母的组合"],
		phone:["/^0?(13[0-9]|15[012356789]|18[012356789]|14[57])[0-9]{8}$/","请输入正确的11位手机号码"],
		email:["/^[a-zA-Z0-9_+.-]+\@([a-zA-Z0-9-]+\.)+[a-zA-Z0-9]{2,4}$/","请输入常用的Email地址"],
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
					$(id).next().show();
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
