 $(function(){
	var proId = Web.Method.GetQueryString("proId");
	info(proId);
	
})
var datas={
	 reade:["计算机硬件","互联网","计算机软件"],
	 status:["有效","无效"]
 }
 
function info(proId){
	Web.Method.ajax("information/byTPubInformationPro",{
		async:false,
		data:{proId:proId},
		success:function(data){
			$.each(eval(data.info),function(i,j){
				if(i=="status"){
					$("#status").html(datas.status[j]);
				}else if(i=="reade"){
					//行业(0计算机硬件,1互联网,2计算机软件)  
					$("#reade").html(datas.reade[j]);
				}else{
					$("#"+i ).html(j)
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
		}
	});
 }
