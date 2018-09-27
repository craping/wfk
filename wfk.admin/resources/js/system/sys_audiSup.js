$(function(){
	var supId=get("supId");
	var flag=true;//二次审核标识
		Web.Method.ajax("sysSupplier/getSup", {
			data : {
				supId : supId,
			},
			success : function(data) {
				if(data.info.appStatus==2){
					flag=false;
					$("[name=second_audi]").each(function(){
						$(this).remove();
					})
				}
				$("#supId").val(supId);
				$("#oldStatus").val(data.info['status']);
				$("#appStatus").val(data.info.appStatus);
				$(".see_pic").each(function(){
					for(var item in data.info){
						if(item==$(this).attr("name")){
							$(this).attr("value",data.info[item]);
						}
					}
				})
				if(data.info["paperType"]=="1"){
					$("[name=coInstNum]").parent().remove();
					$("[name=coTaxNum]").parent().remove();
				}
				$(".sup_details").each(function(){
						for(var item in data.info){
							if(item==$(this).attr("name")){
								if(item=="chkCommet"){
									$(this).val(data.info[item]);
								}
								$(this).html(data.info[item]);
							}
						}
				})
				
				if(flag){
					Web.Method.ajax("sysSupplier/getSupAccount", {
						data : {
							supId : supId,
						},
						success : function(data) {
							$(".supacc_details").each(function(){
								for(var i=0;i<=data.info.length;i++){
									for(var item in data.info[i]){
										if(item+data.info[i]["accType"]==$(this).attr("name")){
											$(this).html(data.info[i][item]);
										}
									}
								}
						    })
					    },
						fail : function(data) {
						}
					});
				}
			},
			fail : function(data) {
			}
		});
		
	$(document).on("click","#aud_pass,#aud_noPass",function(){
		var chkCommet=$("#chkCommet").val();
		Web.Method.ajax("sysSupplier/auditingSup", {
			data : {
				supId : $("#supId").val(),
				appStatus : $("#appStatus").val(),
				oldStatus: $("#oldStatus").val(),
				status: $(this).val(),
				chkCommet:chkCommet,
				chkUserId:$("#manUserId",parent.document).val()
			},
			success : function(data) {
				window.location.href="../system/sup_list.html";
			},
			fail : function(data) {
				$.confAlert({
					size : "sm",
					context : data.msg,
					noButton : false
				})
			}
		});
	});
});
$(document).on("click",".see_pic",function(){
    //官网欢迎页
	var picUrl=$(this).attr("value");
    layer.open({
        type: 2,
        title: '',
        fix: false,
        shadeClose: true,
        area: ['955px', '545px'],
        content: '../common/layer_box.html?picUrl='+picUrl,
        shade: [0.1,'#fff']
    });
})

function get(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]);
	return null;
}