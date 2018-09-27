$(function(){
	$.fn.appendHtml=function(html){
		$(this).empty();
		$(this).append(html);
	}
	$.fn.serializeJson=function(includeEmpty){  
	    var json={};
	    $(this.serializeArray()).each(function(){
	    	if(includeEmpty || (this.value && this.value != ""))
	    		json[this.name]=this.value;
	    });
	    return json;  
	};
	loadClassfiy();//加载一级
	$(document).on("change","#brandLoge",function(){
			
	})
	//展示第二级分类
	$(document).on("click",".clsIdZrOption",function(){
		var parendId=$(this).attr("value");
		var cls =  classLise({classifyLevel:2,status:1,parentId:parendId}).info;
		var html='';
		for (var i = 0; i < cls.length; i++) {
			html+='<li value="'+cls[i].classifyId+'" class="clsIdStOption" ><a href="javascript:;">'+cls[i].classifyName+'</a></li>';
		}
		$(".clsIdSt").appendHtml(html);
		$(".clsIdNd").appendHtml("");
		$("#clsIdSt,#clsIdNd").attr("value","")
		$("#clsIdSt,#clsIdNd").html("请选择")
	})
	//展示第三级分类
	$(document).on("click",".clsIdStOption",function(){
		var parendId=$(this).attr("value");
		var cls =  classLise({classifyLevel:3,status:1,parentId:parendId}).info;
		var html='';
		for (var i = 0; i < cls.length; i++) {
			html+='<li value="'+cls[i].classifyId+'" class="clsIdNdOption" ><a href="javascript:;">'+cls[i].classifyName+'</a></li>';
		}
		$(".clsIdNd").appendHtml(html);
	})

	//检查文件内容格式 大小
	$('#iconFile').checkFileTypeAndSize({
		allowedExtensions: ['jpg','png'],
		maxSize: 2048,
		widthAndHeight: 1920*1080,
		extensionerror: function(){
			alert("图片的格式只能为：jpg,png");
			return false;
			//图片的格式只能为：jpg,png
		},
		sizeerror: function(){
			alert("图片大小不能超过2MB");
			return false;
			//图片大小不能超过20kb
		},
		success: function(){
			$("#icon").attr("src",(Web.Method.getObjectURL($("#iconFile")[0])));
	    }
	},$("#product_infoForm"));
	
		//获取焦点后清除错误提示信息
		$("#brandName").focus(function(){
			$("#brandName_msg").hide();
			});
		$("#clsIdZr").mouseup(function(){
			$("#clsIdZr_msg").hide();
		});
	$("#brandOk").click(function(){
		//表单验证
		if($("#brandName").val()==""){
			$("#brandName_msg").show()
			$("#brandName_msg").html("品牌名不能为空")
			return ;
		}
		if($("#clsIdZr").attr("value")==""){
			$("#clsIdZr_msg").show()
			$("#clsIdZr_msg").html("请选择一级分类")
			return ;
		}
		if(!$("#status").valibtValue()){return false;};
		
		var brandName = $("#brandName").val();
		var clsIdZr = $("#clsIdZr").attr("value"); 
		var clsIdSt =$("#clsIdSt").attr("value"); 
		var clsIdNd =$("#clsIdNd").attr("value"); 
		var status = $("#status").attr("value");
		
		
		var params={brandName:brandName,clsIdZr:clsIdZr,clsIdSt:clsIdSt,clsIdNd:clsIdNd,status:status}
		showLayer();
		$("#product_infoForm").ajaxSubmit({
			iframe:true,
			dataType:"json",
			data:params,
			url:Web.Recource.serverURL +"brand/addTProdBrand?"+$("#product_infoForm").serializeJson(true),
			success: function(data){
				hideLayer();
				if(data.errcode == "0"){
					$.confAlert({
						size:"sm",
						context:"添加成功",
						noButton:false,
						onOk:function(){
							window.location.href="../system/product_brandManage.html";
						}
					})
				}else{
					 $.confAlert({
							size:"sm",
							context:data.msg,
							noButton:false ,
							onOk:function(){
							}
						}) 
				 } 
			} 
		});
	});
	$(document).on("click","#closeWindos",function(){
		window.location.href="../system/product_brandManage.html";
	})
})

function loadClassfiy(){
	var cls =  classLise({classifyLevel:1,status:1}).info;
	var html='';
	for (var i = 0; i < cls.length; i++) {
		html+='<li value="'+cls[i].classifyId+'" class="clsIdZrOption" ><a href="javascript:;">'+cls[i].classifyName+'</a></li>';
	}
	$(".clsIdZr").appendHtml(html);
}
//classifyLevel：等级
//status:状态
//parentId：上一级
function classLise(params){
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