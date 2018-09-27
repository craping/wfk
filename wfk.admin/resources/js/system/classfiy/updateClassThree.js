//获取url 的参数
function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]);
	return null;
}

$(function(){
	var validator=$("#updateThree").validate(); //表单校验
	$.fn.appendHtml=function(html){
		$(this).empty();
		$(this).append(html);
	}
	if(GetQueryString("classId")!=null){
		$("classId").attr("value",GetQueryString("classId"))
		classLise({classifyId:GetQueryString("classId")});
	}
	$(document).on("click","#ClassOk",function(){
		if(!validator.form()){
			return false;
		}
		if(!$("#clsIdZr").valibtValue()){return false;};
		if(!$("#clsIdSt").valibtValue()){return false;};
		
		var className=$("#className").val();
		var clsIdSt = $("#clsIdSt").attr("value");
		var seql = $("#seql").val();
		var status = $("#status").attr("value");
		var level=3;
		var classid=$("classid").attr("value");
		var params={classifyName:className,status:status,parentId:clsIdSt,classifyLevel:level,seql:seql,classifyId:classid}
		if(isSeq(params)){
			showLayer();
			Web.Method.ajax("/classify/updateClassify",{
				data:params ,
				success:function(data){
					hideLayer();
					 if(data.errcode == "0"){
						 $.confAlert({
								size:"sm",
								context:"修改成功",
								noButton:false,
								onOk:function(){
									window.location.href="../system/product_classify_manageThree.html";
								}
						})
					 } 
				},fail:function(data) {
					hideLayer();
					$.confAlert({
						size:"sm",
						context:data.msg,
						noButton:false 
					})
				}
			});
		}
	})
	
	$(document).on("click",".clsIdZrOption",function(){
		var parendId=$(this).attr("value");//二级分类
		var cls =  classLises({classifyLevel:2,status:1,parentId:parendId}).info;
		var html='';
		for (var i = 0; i < cls.length; i++) {
			html+='<li value="'+cls[i].classifyId+'" class="clsIdStOption" ><a href="javascript:;">'+cls[i].classifyName+'</a></li>';
		}
		$(".clsIdSt").empty();
		$(".clsIdSt").appendHtml(html);
		$("#clsIdSt").html("请选择");
		$("#clsIdSt").attr("value","");
	})
	$(document).on("click","#closeWindeos",function(){
		window.location.href="../system/product_classify_manageThree.html"
	})
})
//class
function classLise(params){
	Web.Method.ajax("/classify/selectBaseClassify",{
		
		async:false,
		data:params,
		success:function(data){
			var paraent = data.info[0].parentId;
			var two=classLises({classifyLevel:2,classifyId:paraent});//通过一级分类找二级
			var one=classLises({classifyLevel:1,classifyId:two.info[0].parentId});//通过一级分类找二级
			$("#className").val(data.info[0].classifyName);
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
						if(de[i].classifyId == one.info[0].classifyId ){
							$("#clsIdZr").attr("value",paraent);
							$("#clsIdZr").html(de[i].classifyName);
						}
						html+='<li value="'+de[i].classifyId+'" class="clsIdZrOption"><a href="#">'+de[i].classifyName+'</a></li>';
					}
					$(".clsIdZr").empty();
					$(".clsIdZr").append(html);
				}
			})
			Web.Method.ajax("/classify/selectBaseClassify",{
				
				async:false,
				data:{classifyLevel:2,status:1,parent:one.info[0].classifyId},
				success:function(dat){
					var html='';
					var de= dat.info;
					for (var i = 0; i < de.length; i++) {
						if(de[i].classifyId == paraent ){
							$("#clsIdSt").attr("value",paraent);
							$("#clsIdSt").html(de[i].classifyName);
						}
						html+='<li value="'+de[i].classifyId+'" class="clsIdZrOption"><a href="#">'+de[i].classifyName+'</a></li>';
					}
					$(".clsIdSt").empty();
					$(".clsIdSt").append(html);
				}
			})
		}
	})
}

function classLises(params){
	var obj;
	Web.Method.ajax("/classify/selectBaseClassify",{
		
		async:false,
		data:params,
		success:function(data){
			obj=data;
		}
	})
	return obj;
}

