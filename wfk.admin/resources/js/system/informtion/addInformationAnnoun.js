$(function(){
	 $(document).on("click","#OK",function(){
		 $("input[name='status']").val($("#status").attr("value"));
		 
		 if(!$("#title").valibtValue()){return false;}; // 标题
		 if(!$("#context").valibtValue()){return false;}; // 状态
		 if(!$("#status").valibtValue()){return false;}; // 状态
		 showLayer();
		 Web.Method.ajax("information/addTPubAnnouncement?"+$("form").serialize(true),{
				async:false,
				success:function(datas){
					hideLayer();
					if(datas.errcode=="0"){
						$.confAlert({
							size:"sm",
							context:"添加成功",
							noButton:false,
							onOk:function(){
								window.location.href="info_ManageInformationAnnoun.html";
							}
						})
					}
				},fail : function(data) {
					$.confAlert({
						size:"sm",
						context:data.msg,
						noButton:false 
					}) 
				}
			});
	 })
})
