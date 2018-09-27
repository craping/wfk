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
    jQuery(".inBox").slide({ titCell:".inHd li",mainCell:".inBd",trigger:"click" });
    jQuery(".outBox").slide({ effect:"fold",trigger:"click" });
//div切换
   $('.system-patent-li1').click(function () {
	   $(this).attr("flag","on");
	   $('.system-patent-li2').attr("flag","");
	   $("[name=paperType]").val($(this).attr("value"));
	   $("#msg_new input").each(function(){
	   		var fileName=$(this).attr("fileName");
	   		if(fileName!=undefined){
	   			$(this).attr("name","");
	   			$(this).attr("ignore","ignore");
	   		}
	   	})
	   $("#msg_old input").each(function(){
		   var fileName=$(this).attr("fileName");
		   if(fileName!=undefined){
			  $(this).attr("name",fileName);
			  $(this).attr("ignore","");
		   }
	   })
	  
	   
       $(this).css({'background':'#aa3231','color':'#fff'});
       $('.system-patent-li2').css({'background':'#fff','color':'#505050'})
       $('.system-patent-odd').show();
       $('.system-patent-new').hide();
   })
    $('.system-patent-li2').click(function () {
    	$(this).attr("flag","on");
 	    $('.system-patent-li1').attr("flag","");
    	$("[name=paperType]").val($(this).attr("value"));
    	$("#msg_old input").each(function(){
    		if($(this).attr("fileName")!=undefined){
    			$(this).attr("name","");
    			$(this).attr("ignore","ignore");
    		}
    	})
    	$("#msg_new input").each(function(){
    		var fileName=$(this).attr("fileName");
    		if(fileName!=undefined){
    			$(this).attr("name",fileName);
    			$(this).attr("ignore","");
    		}
    	})
 	   
        $(this).css({'background':'#aa3231','color':'#fff'});
        $('.system-patent-li1').css({'background':'#fff','color':'#505050'})
        $('.system-patent-odd').hide();
        $('.system-patent-new').show();
    })
    //数据回选
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
			//div选择与有效期回选处理
			var coTaxerLab=data.info["coTaxerLab"];
			if(data.info["paperType"]=="0"){
				var html='<a href="javascript:void(0);" value="'+coTaxerLab+'">'+coTaxerLab+'</a>';
				$("#coTaxerLab_old").html();
				$("#coTaxerLab_old").html(html);
				$('.system-patent-li1').click();
				if(data.info["coTimeLimit"]=="永久有效"){
					$("#radio1").prop("checked",true);
					$(".time_Li").attr("style","display:none;");
				}else{
					$("#radio2").prop("checked",true);
					$("#radio2").parent().next().val(data.info["coTimeLimit"]);
				}
			}else if(data.info["paperType"]=="1"){
				var html='<a href="javascript:void(0);" value="'+coTaxerLab+'">'+coTaxerLab+'</a>';
				$("#coTaxerLab_new").html("");
				$("#coTaxerLab_new").html(html);
				$('.system-patent-li2').click();
				if(data.info["coTimeLimit"]=="永久有效"){
					$("#radio3").prop("checked",true);
					$(".time_Li").attr("style","display:none;");
				}else{
					$("#radio4").prop("checked",true);
					$("#radio4").parent().next().val(data.info["coTimeLimit"]);
				}
			}
			//处理性别
			if(data.info["contUrgSex"]=="0"){
				$("#contUrgSex").html("");
				$("#contUrgSex").append('<li><a href="javascript:void(0);" value="0">女士</a></li>');
			}else if(data.info["contUrgSex"]=="1"){
				$("#contUrgSex").html("");
				$("#contUrgSex").append('<li><a href="javascript:void(0);" value="1">先生</a></li>');
			}
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
			
			//图片回显"
			$(".show_coIdPic").attr("src",data.info["coIdPic"]);
			if(data.info["paperType"]=="0"){
				$("#msg_old .show_coLicensePic").attr("src",data.info["coLicensePic"]);
				$("#msg_old .show_coInstPic").attr("src",data.info["coInstPic"]);
				$("#msg_old .show_coTaxPic").attr("src",data.info["coTaxPic"]);
				$("#msg_old .show_coTaxerPic").attr("src",data.info["coTaxerPic"]);
			}else if(data.info["paperType"]=="1"){
				$("#msg_new .show_coLicensePic").attr("src",data.info["coLicensePic"]);
				$("#msg_new .show_coInstPic").attr("src",data.info["coInstPic"]);
				$("#msg_new .show_coTaxPic").attr("src",data.info["coTaxPic"]);
				$("#msg_new .show_coTaxerPic").attr("src",data.info["coTaxerPic"]);
			}
		},
		fail : function(data) {
		}
	});
	
	Web.Method.ajax(control+"/getSupAccount", {
		data : {
			supId : supId,
		},
		success : function(data) {
			$(".supacc_details").each(function(){
				for(var i=0;i<=data.info.length;i++){
					for(var item in data.info[i]){
						if(item+data.info[i]["accType"]==$(this).attr("name")){
							$(this).val(data.info[i][item]);
						}
					}
				}
		    })
	    },
		fail : function(data) {
		}
	});
	
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
    
	 $(document).on("click",".show_coIdPic,.show_coLicensePic,.show_coInstPic,.show_coTaxPic,.show_coTaxerPic",function(){
	    	window.open($(this).attr("src"),'_blank');
	    })
	 
	$(document).on("click","#supplier_update",function(){
		checkradio();
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
        if(!checkSupAcc()){
        	$.confAlert({
				size:"sm",
				context:'对公账户与对私账户至少完整填写一个',
				noButton:false
			})
			return false;
        }
		$("#supId").val(supId);
		setSelVal();
		showLayer();
		var data=$("#supplier_form").seriJson(true);
		 $("#supplier_form").ajaxSubmit({
				iframe:true,
				dataType:"json",
				url:Web.Recource.serverURL +control+"/setSup?"+$("#supplier_form").seriJson(true),
				success: function(data){
					hideLayer();
					if(data.result!=0){
						$.confAlert({
							size:"sm",
							context:"服务器异常,请稍后再试!",
							noButton:false
						})
					}else{
					    hideLayer();
						$.confAlert({
							size:"sm",
							context:data.msg,
							noButton:false
						})
						window.location.href="../system/sup_list.html";
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
		window.location.href="../system/sup_list.html";
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
	
	$("[name=contUrgSex]").val($("#contUrgSex").children().attr("value"));
	if($("#new_div").attr("flag").indexOf("on")!=-1){
		$("[name=coTaxerLab]").val($("#coTaxerLab_new").children().attr("value"));
   }
	if($("#old_div").attr("flag").indexOf("on")!=-1){
		$("[name=coTaxerLab]").val($("#coTaxerLab_old").children().attr("value"));
  }
}

function removehidden(){
	if($("#new_div").attr("flag").indexOf("on")!=-1){
	     $("#msg_old").remove();
    }
	if($("#old_div").attr("flag").indexOf("on")!=-1){
        $("#msg_new").remove();
   }
}

//有效期选择
function hide_time(){
	$(".time_Li").attr("style","display:none;");
}
function show_time(){
	$(".time_Li").attr("style","display:block;");
}

function checkradio(){ 
	var item = $(":radio:checked"); 
	var len=item.length; 
	var html='<input type="hidden" id="time_hidden" name="coTimeLimit">';
	if(len>0){ 
		$(".sel_time").append(html);
	 if($(":radio:checked").val()=='1'){
		 $("#time_hidden").val("永久有效");
	 }
	 if($(":radio:checked").val()=='2'){
		 $("#time_hidden").val($("[name=time_Li]").val());
	 }
	} 
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
//验证公司办公地址是否选择
function checkAddress(){
	if($("#wrkProvince").attr("value")!=""&&$("#wrkCity").attr("value")!=""){
		if($("#wrkArea").attr("value")!=""||$("#wrkArea").parents("div").attr("style")=="display: none;"){
			return true;
		}
	}
	return false;
}
//检查账户信息是否填写
function checkSupAcc(){
	var flag1=false;
	var flag2=false;
	var accName1=$("[name=accName1]").val();
	var accNo1=$("[name=accNo1]").val();
	var accBankId1=$("[name=accBankId1]").val();
	var accName2=$("[name=accName2]").val();
	var accNo2=$("[name=accNo2]").val();
	var accBankId2=$("[name=accBankId2]").val();
	if(accName1!=''&&accNo1!=''&&accBankId1!=''){
		flag1=true;
	}
	if(accName2!=''&&accNo2!=''&&accBankId2!=''){
		flag2=true;
	}
	if(flag1||flag2){
		return true;
	}else{
		return false;
	}
}


$.fn.seriJson = function(includeEmpty) {
	var json = {};
	$(this.serializeArray()).each(function() {
		if (includeEmpty || (this.value && this.value != ""))
			json[this.name] = this.value;
	});
	return json;
};