$(function(){
	 var informationId = Web.Method.GetQueryString("informationId");
	 info(informationId);
})

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