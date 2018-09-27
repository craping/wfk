$(function(){
	var logistIdCheck = false;
	var logistNameCheck = false;
	var logistUrlCheck = false;
	//获取焦点后清除错误提示信息
	$("input").focus(function() {
		$(this).next().hide();
	});
	$("#logisticsId").bind("blur",function(){
		var regexp = /^[A-Za-z]+$/;
		var str = $(this).val();
		var fl = regexp.test(str);
		if(fl == true){
			Web.Method.ajax("logistics/checkLogist",{
				data:{
					logisticsId : $("#logisticsId").val()
				},
				success : function(data){
					if(data.errcode == 1){
						$("#logisticsId").next().html(data.msg).attr("style","display:block;");//show();
					}else{
						$("#logisticsId").next().hide();//attr("style","display:none;");
						logistIdCheck = true;
					}
				},
				fail : function(data) {
					$.confAlert({
						size:"sm",
						context:"服务器异常,请稍后再试!",
						noButton:false
					})
				}
			});
		}else{
			$("#logisticsId").next().html("只能包含英文字符。").show();
		}
	});
	
	$("#logisticsName").bind("blur",function(){
		var regexp =  /^[a-zA-Z0-9\u4e00-\u9fa5-_]+$/;
		var str = $(this).val();
		var fl = regexp.test(str);
		if(fl == true){
			Web.Method.ajax("logistics/checkLogist",{
				data:{
					logisticsName : $("#logisticsName").val()
				},
				success : function(data){
					if(data.errcode == 1){
						$("#logisticsName").next().html(data.msg).attr("style","display:block;");//show();
					}else{
						$("#logisticsName").next().hide();//attr("style","display:none;");
						logistNameCheck = true;
					}
				},
				fail : function(data) {
					$.confAlert({
						size:"sm",
						context:"服务器异常,请稍后再试!",
						noButton:false
					})
				}
			});
		}else{
			$("#logisticsName").next().html("只能包含中文、英文、数字、下划线等字符").show();
		}
	});
	
	$("#logisticsUrl").bind("blur",function(){
		var regexp = /((http|ftp|https|file):\/\/([\w\-]+\.)+[\w\-]+(\/[\w\u4e00-\u9fa5\-\.\/?\@\%\!\&=\+\~\:\#\;\,]*)?)/;
		var str = $(this).val();
		var fl = regexp.test(str);
		if(fl == false){
			$("#logisticsUrl").next().html("网址以http://、https://、ftp://开头").show();
		}else{
			logistUrlCheck = true;
		}
	});
	
	$(document).on("click","#addLogist",function(){
		if(logistIdCheck && logistNameCheck && logistUrlCheck){
			var logisticsId = $("#logisticsId").val();
			var logisticsName = $("#logisticsName").val();
			var logisticsUrl = $("#logisticsUrl").val();	
			var status = $("#status").children().attr("name");
			Web.Method.ajax("logistics/addLogist",{
				data:{
					logisticsId : logisticsId,
					logisticsName : logisticsName,
					logisticsUrl : logisticsUrl,
					status : status
				},
				success : function(data){
					window.location.href="../system/logistics_list.html";
				},
				fail : function(data) {
					$.confAlert({
						size:"sm",
						context:"服务器异常,请稍后再试!",
						noButton:false
					})
				}
			});
		}
		return ;
	});
});


$(document).on("click",".return_logist_list",function(){
	window.location.href="../system/logistics_list.html";
});