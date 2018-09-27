//获取url 的参数
function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]);
	return null;
}
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
	
	if(GetQueryString("brandId") == null){
		alert("无效数据");
	}else{
		$("brand").attr("value",GetQueryString("brandId"));
		brandInfo({brandId:GetQueryString("brandId")});//加载修改数据
		
	}
	
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
		},
		sizeerror: function(){
			alert("图片大小不能超过2MB");
			return false;
		},
		success: function(){
			$("#icon").attr("src",(Web.Method.getObjectURL($("#iconFile")[0])));
	    }
	},$("#fielInput"));

	
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
		if(!$("#clsIdZr").valibtValue()){return false;};
		if(!$("#status").valibtValue()){return false;};
		
		var brandName = $("#brandName").val();
		var clsIdZr = $("#clsIdZr").attr("value"); 
		var clsIdSt =$("#clsIdSt").attr("value"); 
		var clsIdNd =$("#clsIdNd").attr("value"); 
		var status = $("#status").attr("value"); 
		var brand =$("brand").attr("value");
		
		var params={brandId:brand,brandName:brandName,clsIdZr:clsIdZr,clsIdSt:clsIdSt,clsIdNd:clsIdNd,status:status}
		showLayer();
		$("#product_infoForm").ajaxSubmit({
			iframe:true,
			dataType:"json",
			data:params,
			url:Web.Recource.serverURL +"brand/updateTProdBrand?"+$("#product_infoForm").serializeJson(true),
			success: function(data){
				hideLayer();
				if(data.errcode == "0"){
					 $.confAlert({
							size:"sm",
							context:"修改成功",
							noButton:false,
							onOk:function(){
								window.location.href="../system/product_brandManage.html";
							}
						})
				 }else{
					 $.confAlert({
							size:"sm",
							context:data.msg,
							noButton:false 
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
		if(one == cls[i].classifyId){
			$("#clsIdZr").attr("value",cls[i].classifyId)
			$("#clsIdZr").html(cls[i].classifyName)
		} 
		html+='<li value="'+cls[i].classifyId+'" class="clsIdZrOption" ><a href="javascript:;">'+cls[i].classifyName+'</a></li>';
	}
	$(".clsIdZr").appendHtml(html);
}

function loadClassfiyTwo(){
	var cls =  classLise({classifyLevel:2,parentId:one}).info;
	var html='';
	for (var i = 0; i < cls.length; i++) {
		if(two == cls[i].classifyId){
			$("#clsIdSt").attr("value",cls[i].classifyId)
			$("#clsIdSt").html(cls[i].classifyName)
		} 
		html+='<li value="'+cls[i].classifyId+'" class="clsIdStOption" ><a href="javascript:;">'+cls[i].classifyName+'</a></li>';
	}
	$(".clsIdSt").appendHtml(html); 
}

function loadClassfiyThree(){
	var cls =  classLise({classifyLevel:3,parentId:two}).info;
 	var html='';
	for (var i = 0; i < cls.length; i++) {
		if(three == cls[i].classifyId){
			$("#clsIdNd").attr("value",cls[i].classifyId)
			$("#clsIdNd").html(cls[i].classifyName)
		} 
		html+='<li value="'+cls[i].classifyId+'" class="clsIdNdOption" ><a href="javascript:;">'+cls[i].classifyName+'</a></li>';
	}
	$(".clsIdNd").appendHtml(html); 
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
var one="";
var two="";
var three="";
function Zzo(bran){
	var cls =  classLise({classifyId:bran.clsId}).info;
	if(cls[0].classifyLevel == "1"){
		one = cls[0].classifyId;
	}
	if(cls[0].classifyLevel == "2"){
		two = cls[0].classifyId;
		one = cls[0].parentId;
	}
	if(cls[0].classifyLevel == "3"){
		three = cls[0].classifyId;
		var clss =  classLise({classifyId:three}).info;
		two = clss[0].parentId;
		var clsss =  classLise({classifyId:two}).info;
		one = clsss[0].parentId;
	}
}
function brandInfo(bran){
	Web.Method.ajax("/brand/selectTProdBrand",{
		async:false,
		data:bran,
		success:function(data){
			var bran=data.info[0];
			$("#brandName").val(bran.brandName);
			$("#status").attr("value",bran.status);
			if(bran.status == "1"){
				$("#status").html("有效");
			}else{
				$("#status").html("无效");
			}
			var sel="li[class='clsIdZrOption'][value='"+bran.clsIdZr+"']";
			var sd = $(sel).html();
			$("#icon").attr("src",bran.brandPic);
			Zzo(bran);
			loadClassfiy();//加载一级
			loadClassfiyTwo();//加载二级
			loadClassfiyThree();//加载三级
		}
	})
}
 