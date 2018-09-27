$(function(){
	$("#msg_old input").each(function(){
		   var fileName=$(this).attr("fileName");
		   if(fileName!=undefined){
			  $(this).attr("name",fileName);
			  $(this).attr("ignore","");
		   }
	   })
	$("#msg_new input").each(function(){
	    		var fileName=$(this).attr("fileName");
	    		if(fileName!=undefined){
	    			$(this).attr("name","");
	    			$(this).attr("ignore","ignore");
	    		}
	    	})
	$("[name=paperType]").val($('#old').attr("value"));
	var validator=$("#supplier_form").validate(); //表单校验
	 /*企业信息外部切换*/
    var $li=$('.msg-nav ul li');
    var $li2=$('.msg-license ul li');
    var $cont=$('.msg-content');
    var $cont2=$('.msg-patent-odd');
    $li.click(function(){
        var $this=$(this);
        var $i=$this.index();
        $li.removeClass();
        $this.addClass('on');
        $cont.css('display','none');
        $cont.eq($i).css('display','block');
    })
    /* 旧版三证和新版切换*/
    $li2.click(function(){
        if($(this).attr("value")==0){
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
        }else if($(this).attr("value")==1){
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
        }
    	$("[name=paperType]").val($(this).attr("value"));
        var $this=$(this);
        var $i=$this.index();
        $li2.removeClass();
        $this.addClass('on');
        $cont2.css('display','none');
        $cont2.eq($i).css('display','block');
    })	
	Web.Method.ajax("supUser/getUserInfoP", {
		success:function(data){
			var user=data.info;
			var gologin='<a href="javascript:void(0);" class="loginOut">[退出]</a>';
			var	html='当前用户：'+data.info["loginName"]+'<a class="loginOut" href="javascript:;">[退出]</a><a href="#">礼舍商城首页</a>';
			$("#header").append(html);
		    var supId=data.info["supId"];
			$("#supId").val(supId);
			
			if(data.info.appStatus==1){
				layer.open({
                    skin:'layer-ext-mine',
                    type: 2,
                    move:false,
                    title:'企业信息审核未通过！<span class="tooltip-span1"></span>',
                    area: ['445px', '180px'],
                    content: 'tooltip.html',
                    btn:['我知道了'],
                    yes:function(index){
                    	layer.close(index);  
                    }
                })
				
				$(".msg-contact").attr("style","display:block");
				 //数据回选
				Web.Method.ajax("supUser/getDetails", {
					data : {
						supId : supId,
					},
					success : function(data) {
								regProvince(data.info);//省
								regCity(data.info);//市
								regArea(data.info);//区
								wrkProvince(data.info);//省
								wrkCity(data.info);//市
								wrkArea(data.info);//区
						
						$("[name=regProvince]").val($("#regProvince").attr("value"));
						$("[name=regCity]").val($("#regCity").attr("value"));
						$("[name=regArea]").val($("#regArea").attr("value"));
						//处理性别
						if(data.info["contUrgSex"]=="0"){
							$("#contUrgSex").html("");
							$("#contUrgSex").append('<li><a href="javascript:void(0);" value="0">女士</a></li>');
						}else if(data.info["contUrgSex"]=="1"){
							$("#contUrgSex").html("");
							$("#contUrgSex").append('<li><a href="javascript:void(0);" value="1">先生</a></li>');
						}
						//div选择
						var coTaxerLab=data.info["coTaxerLab"];
						if(data.info["paperType"]=="0"){
							$('#old').click();
							var html='<a href="javascript:void(0);" value="'+coTaxerLab+'">'+coTaxerLab+'</a>';
							$("#coTaxerLab_old").html();
							$("#coTaxerLab_old").html(html);
							if(data.info["coTimeLimit"]=="永久有效"){
								$("#radio1").prop("checked",true);
								$(".time_Li").parent().attr("style","display:none;");
							}else{
								$("#radio2").prop("checked",true);
								$("#radio2").parent().next().children().val(data.info["coTimeLimit"]);
							}
						}else if(data.info["paperType"]=="1"){
							$('#new').click();
							var html='<a href="javascript:void(0);" value="'+coTaxerLab+'">'+coTaxerLab+'</a>';
							$("#coTaxerLab_new").html("");
							$("#coTaxerLab_new").html(html);
							if(data.info["coTimeLimit"]=="永久有效"){
								$("#radio3").prop("checked",true);
								$(".time_Li").parent().attr("style","display:none;");
							}else{
								$("#radio4").prop("checked",true);
								$("#radio4").parent().next().children().val(data.info["coTimeLimit"]);
							}
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
				
				Web.Method.ajax("supUser/getSupAccount", {
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
			}
		},
		fail:function(data){
			window.location.href="../supplier/login.html"
		}
	});
	
    $(document).on("click",".show_coIdPic,.show_coLicensePic,.show_coInstPic,.show_coTaxPic,.show_coTaxerPic",function(){
    	window.open($(this).attr("src"),'_blank');
    })
    
    
	$(document).on("click",".loginOut",function(){
		Web.Method.ajax("supUser/loginOut", {
			success:function(data){
				window.location.href="../supplier/login.html";
			},
			fail:function(data){
				$.confAlert({
					size:"sm",
					context:data.msg,
					noButton:false
				})
			}
		});
	});
	$(document).on("click",".msg-problem-pic",function(){
		if($(this).next().attr("style")=="display:block"){
			$(this).next().attr("style","display:none");
		}else{
			$(this).next().attr("style","display:block");
		}
	});
	
	  //图片校验
	 $("#coIdPic,#coLicensePic,#coInstPic,#coTaxPic,#coTaxrPic").checkFileTypeAndSize({
     	allowedExtensions: ['jpg','png'],
     	maxSize: 2000,
     	widthAndHeight: 1000*1000,
     	extensionerror: function(th,$this){
     		$this.parent().find("img").attr("src","");
     		var sel=$this.next();
     		sel.html("");
			sel.html('上传');
			sel.next().val('');
     		alert("图片的格式只能为：jpg,png");
     	},
     	sizeerror: function(th,$this){
     		$this.parent().find("img").attr("src","");
     		var sel=$this.next();
     		sel.html("");
			sel.html('上传');
			sel.next().val('');
     		alert("图片大小不能超过2000kb");
     	},
     	success: function(th, path,$this){
     		 $this.parent().find("img").attr("src",path);
     		 var sel=$this.next();
			 var arrays=$this.val().split('\\');
			 var picName=arrays[arrays.length-1];
			 sel.html("");
			 sel.html(picName);
			 sel.next().val(picName);
         }
     },$("#supplier_form"));
	 
	$("#go_person_msg").click(function(){
		$("#company_msg").hide();
		$("#company_li").attr("class",null);
		$("#person_msg").show();
		$("#person_li").attr("class","on");
	});
	
	$("#company_button").click(function(){
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
		if(!checkAddress()){
			$.confAlert({
				size:"sm",
				context:'请选择公司办公地址',
				noButton:false
			})
			return false;
		}
		$("#company_msg").hide();
		$("#company_li").attr("class",null);
		$("#person_msg").show();
		$("#person_li").attr("class","on");
	});
	
	$("#go_finance_msg").click(function(){
		$("#person_msg").hide();
		$("#person_li").attr("class",null);
		$("#finance_msg").show();
		$("#finance_li").attr("class","on");
	});
	
	$("#person_button").click(function(){
		if($("[name=contUrgName]").val()==""){
			$("#contUrgName").attr("style","display:block");
        	$("#contUrgName").html("紧急联系人姓名不能为空");
        	return false;
        }
        if($("[name=contUrgMobile]").val()==""){
        	$("#contUrgMobile").attr("style","display:block");
        	$("#contUrgMobile").html("紧急联系人电话不能为空");
        	return false;
        }
		if(!validator.form()){
			$.confAlert({
				size:"sm",
				context:'输入内容有误,请返回检查',
				noButton:false
			})
			return false;
		}
		$("#person_msg").hide();
		$("#person_li").attr("class",null);
		$("#finance_msg").show();
		$("#finance_li").attr("class","on");
	});
	
	$("#finance_button").click(function(){
		 selectAddress();
        if(!validator.form()){
        	$.confAlert({
				size:"sm",
				context:'输入内容有误,请返回检查',
				noButton:false
			})
        	return false
        }
        if(!checkRegAddress()){
			$.confAlert({
				size:"sm",
				context:'请选择营业执照所在地',
				noButton:false
			})
			return false;
		}
		if(!checkAddress()){
			$.confAlert({
				size:"sm",
				context:'请选择公司办公地址',
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
        if($("[name=contUrgName]").val()==""){
			$("#contUrgName").attr("style","display:block");
        	$("#contUrgName").html("紧急联系人姓名不能为空");
        	return false;
        }
        if($("[name=contUrgMobile]").val()==""){
        	$("#contUrgMobile").attr("style","display:block");
        	$("#contUrgMobile").html("紧急联系人电话不能为空");
        	return false;
        }
        showLayer();
		$("#supplier_form").ajaxSubmit({
				iframe:true,
				async:false,
				dataType:"json",
				url:Web.Recource.serverURL +"supUser/supApplicaton?"+$("#supplier_form").serializeJson(true),
				success : function(data) {
					hideLayer();
					if(data.result==0){
						window.location.href = '../supplier/wait_examine.html';
					}else{
						$.confAlert({
							size:"sm",
							context:data.msg,
							noButton:false
						})
					}
					
				},
				fail : function(data) {
					hideLayer();
					$.confAlert({
						size:"sm",
						context:"服务器异常,请稍后再试!",
						noButton:false
					})
				}
			});
	});
});
function removehidden(){
	if($("#new").attr("class")=='on'){
	     $("#msg_old").remove();
    }
	if($("#old").attr("class")=='on'){
        $("#msg_new").remove();
   }
}
//处理下拉框
function selectAddress(){
	$("[name=regProvince]").val($("#regProvince").attr("value"));
	$("[name=regCity]").val($("#regCity").attr("value"));
	$("[name=regArea]").val($("#regArea").attr("value"));
	$("[name=wrkProvince]").val($("#wrkProvince").attr("value"));
	$("[name=wrkCity]").val($("#wrkCity").attr("value"));
	$("[name=wrkArea]").val($("#wrkArea").attr("value"));
	$("[name=contUrgSex]").val($("#contUrgSex").children().attr("value"));
	
	
	if($("#new").attr("class")=='on'){
		$("[name=coTaxerLab]").val($("#coTaxerLab_new").children().attr("value"));
	     $("#msg_old").remove();
   }
	if($("#old").attr("class")=='on'){
		$("[name=coTaxerLab]").val($("#coTaxerLab_old").children().attr("value"));
       $("#msg_new").remove();
  }
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
function checkradio(){ 
	var item = $(":radio:checked"); 
	var len=item.length; 
	if(len>0){ 
	 if($(":radio:checked").val()=='1'){
		 $("#time_hidden").val("永久有效");
	 }
	 if($(":radio:checked").val()=='2'){
		 $("#time_hidden").val($("[name=time_Li]").val());
	 }
	} 
} 

//注册_省
function regProvince(prod){
	var prov =updategetarea({parentId:0});
	var html='';
	for (var i = 0; i < prov.length; i++) {
		if(prod["regProvince"] == prov[i].areaNo){
			$("#regCity").html("");
			$("#regProvince").html(prov[i].areaName);
			$("#regProvince").attr("value",prov[i].areaNo);
		}
		html+='<li value="'+prov[i].areaNo+'" class="oneArea_op"><a href="javascript:;">'+prov[i].areaName+'</a></li>';
	}
	$(".one_area").empty();
	$(".one_area").append(html);
}
//注册_市
function regCity(prod){
	var prov =updategetarea({parentId:prod["regProvince"]});
	var html='';
	for (var i = 0; i < prov.length; i++) {
		if(prod["regCity"] == prov[i].areaNo){
			$("#regCity").html("");
			$("#regCity").html(prov[i].areaName);
			$("#regCity").attr("value",prov[i].areaNo);
		}
		html+='<li value="'+prov[i].areaNo+'" class="twoArea_op"><a href="javascript:;">'+prov[i].areaName+'</a></li>';
	}
	$(".two_area").empty();
	$(".two_area").append(html);
}
//注册_区
function regArea(prod){
	var prov =updategetarea({parentId:prod["regCity"]});
	var html='';
	for (var i = 0; i < prov.length; i++) {
		if(prod["regArea"] == prov[i].areaNo){
			$("#regArea").html(prov[i].areaName);
			$("#regArea").attr("value",prov[i].areaNo);
		}
		html+='<li value="'+prov[i].areaNo+'" class="threeArea_op"><a href="javascript:;">'+prov[i].areaName+'</a></li>';
	}
	$(".three_area").empty();
	$(".three_area").append(html);
	if(html.length==''){
		$("#selArea").hide();
	}
}

//公司_省
function wrkProvince(prod){
	var prov =updategetarea({parentId:0});
	var html='';
	for (var i = 0; i < prov.length; i++) {
		if(prod["wrkProvince"] == prov[i].areaNo){
			$("#wrkCity").html("");
			$("#wrkProvince").html(prov[i].areaName);
			$("#wrkProvince").attr("value",prov[i].areaNo);
		}
		html+='<li value="'+prov[i].areaNo+'" class="oneAreaop"><a href="javascript:;">'+prov[i].areaName+'</a></li>';
	}
	$(".onearea").empty();
	$(".onearea").append(html);
}
//公司_市
function wrkCity(prod){
	var prov =updategetarea({parentId:prod["wrkProvince"]});
	var html='';
	for (var i = 0; i < prov.length; i++) {
		if(prod["wrkCity"] == prov[i].areaNo){
			$("#wrkCity").html("");
			$("#wrkCity").html(prov[i].areaName);
			$("#wrkCity").attr("value",prov[i].areaNo);
		}
		html+='<li value="'+prov[i].areaNo+'" class="twoAreaop"><a href="javascript:;">'+prov[i].areaName+'</a></li>';
	}
	$(".twoarea").empty();
	$(".twoarea").append(html);
}
//公司_区
function wrkArea(prod){
	var prov =updategetarea({parentId:prod["wrkCity"]});
	var html='';
	for (var i = 0; i < prov.length; i++) {
		if(prod["wrkArea"] == prov[i].areaNo){
			$("#wrkArea").html(prov[i].areaName);
			$("#wrkArea").attr("value",prov[i].areaNo);
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


(function ($) {
	$.fn.serializeJson=function(includeEmpty){  
	    var json={};
	    $(this.serializeArray()).each(function(){
	    	if((includeEmpty&& this.value != "") || (this.value && this.value != ""))
	    		json[this.name]=this.value;
	    });
	    return json;  
	};
})(jQuery);

//有效期选择
function hide_time(){
	$(".sel_time").attr("style","display:none;");
}
function show_time(){
	$(".sel_time").attr("style","display:block;");
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
