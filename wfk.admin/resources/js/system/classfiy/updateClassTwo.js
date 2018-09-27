//获取url 的参数
function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]);
	return null;
}

$(function(){
	var validator=$("#updateTwo").validate(); //表单校验
	//排序号验证
	$(document).on("blur","#seql",function(){
		var $this = $(this);
		Web.Method.ajax("/classify/checkSeq",{
			data:{
				seql:$this.val(),
		        classifyLevel:2
			},
			success:function(data){
				if(data.info >1){
					$("label[for='seql']").show()
					$("label[for='seql']").html("序号不可用");
				}
			}
		}); 
	})
	
	if(GetQueryString("classId")!=null){
		$("classid").attr("value",GetQueryString("classId"))
		classLise({classifyId:GetQueryString("classId")});
	}
	
	$(document).on("click","#ClassOk",function(){
		if(!validator.form()){
			return false;
		}
		if($("#seql_check_msg").val()=="false"){
			$("#seql_msg").show()
			return false;
		}
		if(!$("#parend").valibtValue()){return false;};
		
		var className = $("#classsName").val()==""?undefined:$("#classsName").val();
		var parend = $("#parend").attr("value")==""?undefined:$("#parend").attr("value");
		var seql = $("#seql").val()==""?undefined:$("#seql").val();
		var status = $("#status").attr("value")==""?undefined:$("#status").attr("value");
 		var classId = $("classId").attr("value")==""?undefined:$("classId").attr("value");
 		if(isSeq({seql:seql,classifyId:classId,classifyLevel:2})){
 			showLayer();
			Web.Method.ajax("classify/updateClassify",{
				data:{
					classifyName:className,  
					parentId:parend,
					seql:seql, 
					status:status, 
					classifyLevel:2,
					classifyId:classId, 
				},
				success:function(data){
					hideLayer();
					 if(data.errcode == "0"){
						 $.confAlert({
							size:"sm",
							context:"修改成功",
							noButton:false,
							onOk:function(){
								window.location.href="../system/product_classify_manageTwo.html";
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
	})
	$(document).on("click","#closeWindeos",function(){
		window.location.href="../system/product_classify_manageTwo.html"
	})
	
})


//class
function classLise(params){
	Web.Method.ajax("/classify/selectBaseClassify",{
		
		async:false,
		data:params,
		success:function(data){
			var paraent = data.info[0].parentId;
			$("#classsName").val(data.info[0].classifyName);
			$("#seql").val(data.info[0].seq);
			$("#status").attr("value",data.info[0].status);
			if(data.info[0].status == "1"){
				$("#status").html("有效");
			}else if(data.info[0].status == "0"){
				$("#status").html("无效");
			}
			Web.Method.ajax("/classify/selectBaseClassify",{
				async:false,
				data:{classifyLevel:1,status:1},
				success:function(dat){
					var html='';
					var de= dat.info;
					for (var i = 0; i < de.length; i++) {
						if(de[i].classifyId == paraent ){
							$("#parend").attr("value",paraent);
							$("#parend").html(de[i].classifyName);
						}
						html+='<li value="'+de[i].classifyId+'"><a href="#">'+de[i].classifyName+'</a></li>';
					}
					$(".parend").empty();
					$(".parend").append(html);
				}
			})
			
		}
	})
}
