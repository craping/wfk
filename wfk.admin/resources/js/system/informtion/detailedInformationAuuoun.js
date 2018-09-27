 $(function(){
	 var announId = Web.Method.GetQueryString("announId");
	 $("input[name='id']").val(announId);
	 info(announId);
})
function info(id){
	 Web.Method.ajax("information/byTPubAnnouncement",{
			data:{id:id },
			async:false,
			success:function(data){
				 $.each(eval(data.info),function(i,j){
					$("#"+i).html(j)
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