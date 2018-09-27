function get(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]);
	return null;
}
$(function(){
	var logistNameCheck = true;
	var logistUrlCheck = true;
	var logistId = get("logist");
	//获取焦点后清除错误提示信息
	$("input").focus(function() {
		$(this).next().hide();
	});
	
	Web.Method.ajax("logistics/getLogistics", {
		data : {
			logistId :logistId,
		},
		success : function(data) {
			$(".system-form-box").each(function(){
				for(var item in data.info){
					if(item==$(this).attr("name")){
						$(this).val(data.info[item]);
					}
				}
			})
			if(data.info.status == "0"){
				$("#logistStatus").append("<a href='#' name='0'>停用</a>");
			}else{
				$("#logistStatus").append("<a href='#' name='1'>启用</a>");
			}
			$("#logistName_history").val($("#logisticsName").val());
		},
		fail : function(data) {
			$.confAlert({
				size:"sm",
				context:"服务器异常,请稍后再试!",
				noButton:false
			})
		}
	});
	
	$("#logisticsName").bind("blur",function(){
		var regexp =  /^[a-zA-Z0-9\u4e00-\u9fa5-_]+$/;
		var nowName = $(this).val();
		var hisName = $("#logistName_history").val();
		var fl = regexp.test(nowName);
		if(!fl){
			$("#logisticsName").next().html("只能包含中文、英文、数字、下划线等字符").show();
			logistNameCheck = false;
		}else{
			if(hisName != nowName){
				Web.Method.ajax("logistics/checkLogist",{
					data:{
						logisticsName : $("#logisticsName").val()
					},
					success : function(data){
						if(data.errcode == 1){
							$("#logisticsName").next().html(data.msg).attr("style","display:block;");//show();
							logistNameCheck = false;
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
			}
			logistNameCheck = true;
		}
	});
	
	$("#logisticsUrl").bind("blur",function(){
		var regexp = /((http|ftp|https|file):\/\/([\w\-]+\.)+[\w\-]+(\/[\w\u4e00-\u9fa5\-\.\/?\@\%\!\&=\+\~\:\#\;\,]*)?)/;
		var str = $(this).val();
		var fl = regexp.test(str);
		if(fl == false){
			$("#logisticsUrl").next().html("网址以http://、https://、ftp://开头").show();
			logistUrlCheck = false;
		}else{
			logistUrlCheck = true;
		}
	});
		
	$(document).on("click","#update_logist",function(){
		if(logistNameCheck && logistUrlCheck){
			Web.Method.ajax("logistics/updataLogist",{
				data:{
					logisticsId:logistId,
					logisticsName:$("#logisticsName").val(),
					logisticsUrl:$("#logisticsUrl").val(),
					status:$("#logistStatus").children().attr("name")
				},
				success: function(data){
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
		return;
	});
});

$(document).on("click",".return_logist_list",function(){
	window.location.href="../system/logistics_list.html";
});
