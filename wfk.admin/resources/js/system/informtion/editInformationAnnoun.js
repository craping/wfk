 $(function(){
	 var announId = Web.Method.GetQueryString("announId");
	 $("input[name='id']").val(announId);
	 info(announId);
	 $(document).on("click","#OK",function(){
		 $("input[name='status']").val($("#status").attr("value"));
		 
		 if(!$("input[name='title']").valibtValue()){return false;}; // 标题
		 if(!$("#context").valibtValue()){return false;}; // 状态
		 if(!$("#status").valibtValue()){return false;}; // 状态
		 showLayer();
		 Web.Method.ajax("information/updateTPubAnnouncement?"+$("form").serialize(true),{
				async:false,
				success:function(datas){
					hideLayer();
					if(datas.errcode=="0"){
						$.confAlert({
							size:"sm",
							context:"修改成功",
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
function info(id){
	 Web.Method.ajax("information/byTPubAnnouncement",{
			data:{id:id },
			async:false,
			success:function(data){
				 $.each(eval(data.info),function(i,j){
					if(i=="status"){
						 if(j=="0"){
							 $("#status").html("有效");
						 }else{
							 $("#status").html("无效");
						 }
					}
					$("#"+i+","+"input[name='"+i+"']").attr("value",j)
				})
				//审核状态 0待审核 1审核通过 2审核不通过
				 Web.Method.ajax("information/detail",{
					async:false,
					data:{path:data.info.context},
					success:function(datas){
						$("#context").html(datas.info);
					}
				});
			},
			fail:function(data){
				$.confAlert({
					size:"sm",
					context:data.msg,
					noButton:false
				})
			}
	});
 }