 $(function(){
	var proId = Web.Method.GetQueryString("proId");
	if(proId !=null && proId!=""){
		$("input[name='proId']").val(proId);
		info();
	}
	var validator=$("form").validate(); //表单校验
	$(document).on("click","#OK",function(){
		 $("input[name='status']").val($("#status").attr("value"));
		 $("input[name='reade']").val($("#reade").attr("value"));
		 
		 if(!$("#reade").valibtValue()){return false;}; // 状态
		 if(!$("#informationTitle").valibtValue()){return false;}; // 状态
		 if(!$("#context").valibtValue()){return false;}; // 状态
		 if(!$("#status").valibtValue()){return false;}; // 状态
		 showLayer();
		 Web.Method.ajax("information/addTPubInformationPro?"+$("form").serialize(true),{
				async:false,
				success:function(datas){
					hideLayer();
					if(datas.errcode=="0"){
						var mg="添加成功";
						if($("input[name='proId']").val()!=""){
							mg="修改成功";
						}
						$.confAlert({
							size:"sm",
							context:mg,
							noButton:false,
							onOk:function(){
								window.location.href="info_ManageInformationPro.html";
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

function info(){
	Web.Method.ajax("information/byTPubInformationPro",{
		async:false,
		data:{proId:$("input[name='proId']").val()},
		success:function(data){
			 $.each(eval(data.info),function(i,j){
					if(i=="status"){
						 if(j=="0"){
							 $("#status").html("有效");
						 }else{
							 $("#status").html("无效");
						 }
					}else if(i=="reade"){
						$("#reade").html($("#readeUl li[value="+j+"] a").html());
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
		}
	});
 }
