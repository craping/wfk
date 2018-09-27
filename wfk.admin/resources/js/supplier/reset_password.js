$(function(){
	//获取焦点后清除错误提示信息
	$("input").focus(function() {
		if ($(this).attr("name") == "code") {
			$(this).next().next().html("");
			return;
		}
		$(this).next().html("");
	});
	//加载验证码
	url=Web.Recource.serverSysURL+"getCode?format=image&date="+new Date().getTime();
	$("#image_code").attr("src",url);
	
	$("#reset_confirm").click(function(){
		var mobile = $("#mobileNum").val();
		var loginPwd = $("#reset_password").val();
		var mobileCode=mobile+$("#mobile_code").val();
		var supId=$("#supId").val();
		var code=$("#code").val();
		if($("#check_mobile").val()=="false"){
			return false;
		}
		if($("#check_code_msg").val()=="false"){
			return false;
		}
		if($("#check_pwd").val()=="false"){
			return false;
		}
		if(!validate("mobileNum,reset_password,resetp_password",0,false)){
			return false; 
		};
		Web.Method.ajax("supUser/resetPwd",{
			data:{
				loginPwd:loginPwd,
				mobileCode:mobileCode,
				mobile:mobile,
				supId:supId,
				code:code
			},
			success:function(data){
				window.location.href = "../supplier/login.html";
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
	$("#mobileNum").bind("blur",function(){
		if(!validate("mobileNum",0,false)){
			return false; 
		};
		Web.Method.ajax("supUser/checksupUser",{
			data:{
				mobile:$("#mobileNum").val(),
			},
			success:function(data){
				if(data.errcode==0){
					$("#mobileNum").next().html("用户不存在");
					$("#check_mobile").val("false");
				}else{
					$("#supId").val(data.msg);
					$("#check_mobile").val("true");
				}
			},
			fail:function(data){
			}
		});
	});
	$("#mobileNum,#reset_password,#resetp_password").bind("blur", function() {
		validate(this.id, 0, false);
	});
	
	$("#resetp_password").bind("blur", function() {
		var reset_password = $("#reset_password").val();
		var resetp_password = this.value;
		if (!(reset_password == resetp_password && resetp_password != '')) {
			$(this).next().html("两次输入的密码不一致请重新输入");
			$("#check_pwd").val("false");
		}else{
			$("#check_pwd").val("true");
		}
	});
	

	
	$("#change_code").click(function(){
		url=Web.Recource.serverSysURL+"getCode?format=image&date="+new Date().getTime();
		$("#image_code").attr("src",url);
	});
	
	$("#code").bind("blur",function(){
		Web.Method.ajax("supUser/checkCode",{
			data:{
				code:$("#code").val(),
			},
			success:function(data){
				$("#check_code_msg").val("true");
			},
			fail:function(data){
				$("#check_code_msg").val("false");
				if(data.result==201)
				$("#code").next().next().html(data.msg);
			}
		});
	});
	
});


var regRule = {
	//第一个参数代表是否必输true为必输，第二个参数代表必输项未输入的异常提示，
	//第三个参数代表匹配正则表达式，第四个参数代表匹配错误
	mobileNum:["/^0?(13[0-9]|15[012356789]|18[012356789]|14[57])[0-9]{8}$/","手机号码格式错误"],
	reset_password:["/^[a-zA-Z0-9_]{6,20}$/","密码为6-20位的数字下划线和字母的组合"],
	resetp_password:["/^[a-zA-Z0-9_]{6,20}$/","请再次输入密码"]
};

var InterValObj; //timer变量，控制时间
var count = 60; //间隔函数，1秒执行
var curCount;//当前剩余秒数	
//timer处理函数
function SetRemainTime() {
            if (curCount == 0) {   
                window.clearInterval(InterValObj);//停止计时器
                $("#pass_code").attr("onclick","sendMsg()");
                $("#pass_code").html("重新发送");
            }
            else {
                curCount--;
                $("#pass_code").attr("onclick",null);
                $("#pass_code").attr("style","font-size:10px");
                $("#pass_code").html( "发送验证码"+"("+curCount+")");
            }
        }
function sendMsg (){
	if($("#check_mobile").val()=="false"){
		return false;
	}
	if($("#check_code_msg").val()=="false"){
		return false;
	}
	curCount = count;
	$("#pass_code").attr("onclick",null);
    InterValObj = window.setInterval(SetRemainTime, 1000); //启动计时器，1秒执行一次
	Web.Method.ajax("supUser/sendMobileCode",{
		
		data:{
			mobile:$("#mobileNum").val(),
		},
		success:function(data){
			//$("#pass_code").next().html(data.msg);
		},
		fail:function(data){
			//$("#pass_code").next().html(data.msg);
		}
	});
}


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
