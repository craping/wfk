$(function(){
	 var buttonId = Web.Method.GetQueryString("buttonId");
	 $("input[name='buttonId']").val(Web.Method.GetQueryString("buttonId"))
	 info(buttonId);
	 
	 $(document).on("click","#OK",function(){
		$("input[name='status']").val($("#status").attr("value"));
		var proDetailsEd = UE.getEditor("context");//编辑内容
		//$("[name='context']").val(proDetailsEd.getAllHtml()); // 文本赋值
		
		 Web.Method.ajax("information/updateTPubBottom?"+$("form").serialize(true),{
				async:false,
				success:function(datas){
					if(datas.errcode=="0"){
						$.confAlert({
							size:"sm",
							context:"修改成功",
							noButton:false,
							onOk:function(){
								window.location.href="info_ManageInformationBottom.html";
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
	 Web.Method.ajax("information/byTPubBottom",{
			data:{level:2,Id:id},
			async:false,
			success:function(data){
				 $(".system-inform-p").html(infoName(data.info.parent)+">>"+data.info.title);
				 Web.Method.ajax("information/details",{
					 	async:false,
						data:{path:data.info.context},
						success:function(datas){
							$("textarea[name='context']").val(datas.info);
							
						} 
				});
				$("input[name='status'],#status").attr("value",data.info.status);
				if(data.info.status =="0"){
					$("#status").html("有效")
				}else{
					$("#status").html("无效")
				}
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
function infoName(id){
	var name='';
	 Web.Method.ajax("information/byTPubBottom",{
		 	async:false,
			data:{level:1,Id:id},
			success:function(data){
				 name=data.info.title;
			} 
	});
	return name;
}