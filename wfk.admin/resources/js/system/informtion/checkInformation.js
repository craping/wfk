$(function(){
	 var informationId = Web.Method.GetQueryString("informationId");
	 $("input[name='informationId']").val(informationId);
	 info(informationId);
	 $(document).on("click","#NO",function(){
		 $("input[name='checkStatus']").val(2);
		 var paras=$("form").serializeJson(true);
		 update(paras)
	 })
	 $(document).on("click","#OK",function(){
		 $("input[name='checkStatus']").val(1);
		 var paras=$("form").serializeJson(true);
		 update(paras)
	 })
})
function update(paras){
	showLayer();
	Web.Method.ajax("information/updateTPubInformation",{
		async:false,
		data:paras,
		success:function(datas){
			hideLayer();
			if(datas.errcode=="0"){
				$.confAlert({
					size:"sm",
					context:"已提交审核",
					noButton:false,
					onOk:function(){
						window.location.href="info_ManageInformation.html";
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
}


function info(id){
	 Web.Method.ajax("information/byTPubInformation",{
			data:{informationId:id },
			async:false,
			success:function(data){
				$.each(eval(data.info),function(i,j){
					if(i=="informationType"){
						if(j=="0"){
							$("#informationType").html("行业资讯");
						}else if(j=="1"){
							$("#informationType").html("企业资讯");
						}
						
					}else if(i=="checkStatus"){
						if(j=="0"){
							$("#checkStatus").html("待审核");
						}else if(j=="1"){
							$("#checkStatus").html("审核通过");
						}else if(j=="2"){
							$("#checkStatus").html("审核不通过");
						}
					}else{
						$("#"+i).html(j)
					}
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