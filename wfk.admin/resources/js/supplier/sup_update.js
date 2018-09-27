$(function(){
	var supId='';
	var control='';//控制器选择
	if($("#supId",parent.document).val()!=undefined){
		supId=$("#supId",parent.document).val();
		control="supUser";
	}else{
		
		supId=get("supId");
		control="sysSupplier";
	}
	
	var validator=$("#supplier_form").validate(); //表单校验
	Web.Method.ajax(control+"/getSupBasic", {
		data : {
			supId : supId,
		},
		success : function(data) {
					regProvince(data.info);//省
					regCity(data.info);//市
					regArea(data.info);//区
			
			$("[name=regProvince]").val($("#regProvince").attr("value"));
			$("[name=regCity]").val($("#regCity").attr("value"));
			$("[name=regArea]").val($("#regArea").attr("value"));
			$(".time_Li").val(data.info["coTimeLimit"]);//有效期
			$(".sup_details").each(function(){
					for(var item in data.info){
						if(item==$(this).attr("name")){
							$(this).val(data.info[item]);
						}
					}
			})
			$(".sup_showdetails").each(function(){
					for(var item in data.info){
						if(item==$(this).attr("name")){
							$(this).html(data.info[item]);
						}
					}
			})
			$(".show_coIdPic").attr("src",data.info["coIdPic"]);
		},
		fail : function(data) {
		}
	});
	
	$(document).on("click",".show_coIdPic",function(){
    	window.open($(this).attr("src"),'_blank');
    })
	 //图片校验
	 $("#coIdPic,#coLicensePic,#coInstPic,#coTaxPic,#coTaxrPic").checkFileTypeAndSize({
    	allowedExtensions: ['jpg','png'],
    	maxSize: 1024,
    	widthAndHeight: 1000*1000,
    	extensionerror: function(th,$this){
    		$this.parent().next().attr("src","");
     		var sel=$this.next();
     		sel.next().html("");
			sel.next().html('上传');
			sel.val('');
    		alert("图片的格式只能为：jpg,png");
    	},
    	sizeerror: function(th,$this){
    		$this.parent().next().attr("src","");
     		var sel=$this.next();
     		sel.next().html("");
			sel.next().html('上传');
			sel.val('');
    		alert("图片大小不能超过2000kb");
    	},
    	success: function(th, path,$this){
    	 $this.parent().next().attr("src",path);
    	 var sel=$this.next();
   		 var arrays=$this.val().split('\\');
   		 var picName=arrays[arrays.length-1];
   		 sel.val(picName)
   		 sel.next().html(picName);
        }
    },$("#supplier_form"));
    
	$(document).on("click","#supplier_update",function(){
		if(!validator.form()){
			$.confAlert({
				size:"sm",
				context:'输入内容有误,请返回检查',
				noButton:false
			})
			return false;
		}
		if(!checkRegAddress()){
			$.confAlert({
				size:"sm",
				context:'请选择营业执照所在地',
				noButton:false
			})
			return false;
		}
		if(!confirm("修改后需重新审核,确认修改吗")){
			   return false ;
		}
		$("#supId").val(supId);
		setSelVal();
		 $("#supplier_form").ajaxSubmit({
				iframe:true,
				dataType:"json",
				url:Web.Recource.serverURL +"supUser/setSup?"+$("#supplier_form").serializeJson(true),
				success: function(data){
					if(data.result!=0){
						$.confAlert({
							size:"sm",
							context:"服务器异常,请稍后再试!",
							noButton:false
						})
					}else{
						$.confAlert({
							size:"sm",
							context:data.msg,
							noButton:false
						})
					   window.location.href="../supplier/index.html";
					}
				},
				error: function(xhr, statis, error){
					$.confAlert({
						size:"sm",
						context:"服务器异常,请稍后再试!",
						noButton:false
					})
				}
			});
	});
	$("#return_suplist").click(function(){
			window.location.href="../supplier/index.html";
	});
});

//select数据装入隐藏input框和账户数据处理
function setSelVal(){
	var coIdPic=$(".coIdPic").val();
	var coLicensePic=$(".coLicensePic").val();
	var coInstPic=$(".coInstPic").val();
	$(".coIdPic").next().val(coIdPic);
	$(".coLicensePic").next().val(coLicensePic);
	$(".coInstPic").next().val(coInstPic);
	//区域处理
	$("[name=regProvince]").val($("#regProvince").attr("value"));
	$("[name=regCity]").val($("#regCity").attr("value"));
	$("[name=regArea]").val($("#regArea").attr("value"));
	
	$("[name=contUrgSex]").val($("#contUrgSex").children().attr("value"))
}

function get(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]);
	return null;
}

//省
function regProvince(prod){
	var prov =updategetarea({parentId:0});
	var html='';
	for (var i = 0; i < prov.length; i++) {
		if(prod["regProvince"] == prov[i].areaNo){
			$("#regCity").html("");
			$("#regProvince").html(prov[i].areaName);
			$("#regProvince").attr("value",prov[i].areaNo);
		}
		html+='<li value="'+prov[i].areaNo+'" class="oneAreaop"><a href="javascript:;">'+prov[i].areaName+'</a></li>';
	}
	$(".onearea").empty();
	$(".onearea").append(html);
}
//市
function regCity(prod){
	var prov =updategetarea({parentId:prod["regProvince"]});
	var html='';
	for (var i = 0; i < prov.length; i++) {
		if(prod["regCity"] == prov[i].areaNo){
			$("#regCity").html("");
			$("#regCity").html(prov[i].areaName);
			$("#regCity").attr("value",prov[i].areaNo);
		}
		html+='<li value="'+prov[i].areaNo+'" class="twoAreaop"><a href="javascript:;">'+prov[i].areaName+'</a></li>';
	}
	$(".twoarea").empty();
	$(".twoarea").append(html);
}
//区
function regArea(prod){
	var prov =updategetarea({parentId:prod["regCity"]});
	var html='';
	for (var i = 0; i < prov.length; i++) {
		if(prod["regArea"] == prov[i].areaNo){
			$("#regArea").html(prov[i].areaName);
			$("#regArea").attr("value",prov[i].areaNo);
		}
		html+='<li value="'+prov[i].areaNo+'" class="threeAreaop"><a href="javascript:;">'+prov[i].areaName+'</a></li>';
	}
	$(".threearea").empty();
	$(".threearea").append(html);
	if(html.length==''){
		$("#ququ").hide();
	}
}
function updategetarea(area){
	var obj;
	Web.Method.ajax("/pubArea/getListArea",{
		async:false,
		
		data:area,
		success:function(data){
			obj = data.info;
		}
	});
	return obj
}

//验证注册地址是否选择
function checkRegAddress(){
	if($("#regProvince").attr("value")!=""&&$("#regCity").attr("value")!=""){
		if($("#regArea").attr("value")!=""||$("#regArea").parents("div").attr("style")=="display: none;"){
			return true;
		}
	}
	return false;
}

(function ($) {
	$.fn.serializeJson=function(includeEmpty){  
	    var json={};
	    $(this.serializeArray()).each(function(){
	    	if(includeEmpty || (this.value && this.value != ""))
	    		json[this.name]=this.value;
	    });
	    return json;  
	};
})(jQuery);