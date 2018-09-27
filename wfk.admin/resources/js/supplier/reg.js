$(function(){
	//加载验证码
	var url = Web.Recource.serverSysURL + "getCode?format=image&date=" + new Date().getTime();
	$("#image_code").attr("src",url);
	$("#agree_agreement").prop("checked",true);
	
	//获取焦点后清除错误提示信息
	$("input").focus(function() {
		if ($(this).attr("name") == "code") {
			$(this).parent().next().next().html("");
			return ;
		}
		$(this).parent().next().html("");
	});
	
	$("#skip_first").click(function() {
		$("#skip_second").parent().show();
		$("#reg_second").attr("style", "display:none");
	});
	
	$("#skip_second").click(function() {
		if(!validate("reg_userName,reg_password,reg_name,reg_email",0,false)){
			return false;
		}
		if($("#name_check_msg").val()=="false"){
			 return false;
		 }
		
		if($("#check_pwd").val()=="false"){
			return false;
		}
		if(!$("#agree_agreement").is(':checked')){
			$("#show_msg").html("请同意会员服务协议");
			return false;
		}
		
		$(this).parent().hide();
		$("#reg_second").attr("style", "display:block");
	});
	
	$("#reg_userName").blur(function() {
		if(!validate("reg_userName",0,false)){
			return false;
		}
		Web.Method.ajax("supUser/checksupUser", {
			data : {
				loginName : $("#reg_userName").val(),
			},
			success : function(data) {
				if (data.errcode == 1) {
					$("#name_msg").html("用户名已存在");
					$("#name_check_msg").val("false");
				}else{
					$("#name_check_msg").val("true");
				}
			},
			fail : function(data) {
			}
		});
	});
	
	$("#reg_mobile").blur(function() {
		if(!validate("reg_mobile",0,false)){
			return false; 
		};
		Web.Method.ajax("supUser/checksupUser", {
			data : {
				mobile : $("#reg_mobile").val(),
			},
			success : function(data) {
				if (data.errcode == 1) {
					$("#reg_mobile").parent().next().html("手机号码已被使用");
					$("#mobile_check_msg").val("false");
				}else{
					$("#mobile_check_msg").val("true");
				}
			},
			fail : function(data) {
			}
		});
	});
		
		
	$("#reg_button").click(function(){
		if(!validate("reg_userName,reg_password,reg_name,reg_mobile,reg_email",0,false)){
			return false;
		}
		if($("#code_check_msg").val()=="false"){
			return false;
		}
		if($("#mobile_check_msg").val()=="false"){
			return false;
		}
		Web.Method.ajax("supUser/supRegister",{
			data:{
				loginName:$("#reg_userName").val(),
				loginPwd:$("#reg_password").val(),
				contName:$("#reg_name").val(),
				email:$("#reg_email").val(),
				mobile:$("#reg_mobile").val(),
				code:$("#reg_code").val(),
				mobileCode:$("#reg_mobile").val()+$("#mobile_code").val()
			},
			success:function(data){
				window.location.href = '../supplier/supplier_register3.html';
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
	
	$("#reg_userName,#reg_email,#reg_password,#reg_name,#reg_mobile").bind("blur",function(){
		validate(this.id,0,false);
	});
	
	$("#regp_password").bind("blur",function(){
		var reg_password=$("#reg_password").val();
		var rep_password=this.value;
		if(!(reg_password==rep_password && rep_password!='')){
			$(this).parent().next().html("两次输入的密码不一致请重新输入");
			$("#check_pwd").val("false");
		}else{
			$("#check_pwd").val("true");
		}
	});
	
	$("#send_mobCode1").click(function(){
		Web.Method.ajax("supUser/sendMobileCode",{
			data:{
				mobile:$("#reg_mobile").val(),
			},
			success:function(data){
			//	$("#register_code").parent().next().html(data.msg);
			},
			fail:function(data){
			//	$("#register_code").parent().next().html(data.msg);
			}
		});
	});
	
	$("#change_code").click(function(){
		url=Web.Recource.serverSysURL+"getCode?format=image&date="+new Date().getTime();
		$("#image_code").attr("src",url);
	});
	$("#reg_code").bind("blur",function(){
		Web.Method.ajax("supUser/checkCode",{
			data:{
				code:$("#reg_code").val(),
			},
			success:function(data){
				$("#code_check_msg").val("true");
			},
			fail:function(data){
				$("#code_check_msg").val("false");
				if(data.result==201)
				$("#reg_code").parent().next().next().html(data.msg);
			}
		});
	});
	
});

var InterValObj; //timer变量，控制时间
var count = 60; //间隔函数，1秒执行
var curCount;//当前剩余秒数	
//timer处理函数
function SetRemainTime() {
    if (curCount == 0) {   
        window.clearInterval(InterValObj);//停止计时器
        $("#send_mobCode").attr("onclick","sendMsg()");
        $("#send_mobCode").html("重新发送");
    }
    else {
        curCount--;
        $("#send_mobCode").attr("onclick",null);
        $("#send_mobCode").attr("style","font-size:10px");
        $("#send_mobCode").html( "发送验证码"+"("+curCount+")");
    }
}

function sendMsg (){
	if($("#mobile_check_msg").val()=="false"){
		return false;
	}
	if($("#code_check_msg").val()=="false"){
		return false;
	}
	curCount = count;
	$("#send_mobCode").attr("onclick",null);
    InterValObj = window.setInterval(SetRemainTime, 1000); //启动计时器，1秒执行一次
	Web.Method.ajax("supUser/sendMobileCode",{
		
		data:{
			mobile:$("#reg_mobile").val(),
		},
		success:function(data){
			//$("#send_mobCode").next().html(data.msg);
		},
		fail:function(data){
			//$("#send_mobCode").next().html(data.msg);
		}
	});
}

var regRule = {
		//PC端验证配置
		//第一个参数代表匹配正则表达式，第二个参数代表匹配错误提示元素的id
		reg_userName:["/^[a-zA-Z0-9_]{4,20}$/","用户名为4-20位的数字下划线和字母的组合"],
		reg_password:["/^[a-zA-Z0-9_]{6,20}$/","密码为6-20位的数字下划线和字母的组合"],
		regp_password:["/^[a-zA-Z0-9_]{6,20}$/","两次输入的密码不一致请重新输入"],
		reg_name:["/[A-Za-z\u4E00-\u9FA5]$/","请输入合法的真实姓名"],
		reg_mobile:["/^0?(13[0-9]|15[012356789]|18[012356789]|14[57])[0-9]{8}$/","请输入正确的11位手机号码"],
		reg_email:["/^[a-zA-Z0-9_+.-]+\@([a-zA-Z0-9-]+\.)+[a-zA-Z0-9]{2,4}$/","请输入常用的Email地址"],
		reg_qq:["/^[1-9]{1}[0-9]{4,11}$/","请输入正确的QQ号码"],
		reg_code:["/^[0-9]{6}$/","请输入有效的短信验证码"],
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
					$(id).parent().next().html(regRule[index][1]);
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
