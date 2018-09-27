$(function(){
	//清空短信内容
	$("#clear_msg").on("click",function(){
		$("#msg_content").val('');
	});
	getNum($("#sendType").children().attr("value"));
	//全选/全不选
    $("#checkAll").click(function() {
    		$('input[name="subBox"]').prop("checked",this.checked); 
     });
     var $subBox = $("input[name='subBox']");
     $subBox.click(function(){
         $("#checkAll").prop("checked",$subBox.length == $("input[name='subBox']:checked").length ? true : false);
     });
     
     $(document).on("click","#send_msg",function(){
    	 var sendType=$("#sendType").children().attr("value");
    	 var content=$("#msg_content").val();
    	 Web.Method.ajax("sysSms/sendSms", {
 			data : {
 				sendType:sendType,
 				content:content
 			},
 			success : function(data) {
 				$.confAlert({
 					size:"sm",
 					context:"发送成功",
 					noButton:false,
 					onOk:function(){
						window.location.href="../system/sys_sms.html";
					}
 				})
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
     
     $(document).on("click","#sendNum li",function(){
   		 getNum($(this).children().attr("value"));
     });
     
     //获取发送会员数
     function getNum(sendType){
    	 Web.Method.ajax("sysSms/sendUserNum", {
  			data : {
  				sendType:sendType
  			},
  			success : function(data) {
  				$("#num").html(data.info);
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
});