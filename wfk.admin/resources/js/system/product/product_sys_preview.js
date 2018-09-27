$(function(){
	getListByProId();
	getCls();
	getBrand();
	
	$(document).on("click","#att li",function(){
		if($(this).hasClass("tb-out-of-stock")){
			return false;
		}
		if($(this).hasClass("cur")){
			$(this).removeClass("cur");
		}else{
			$("[data='"+$(this).attr("data")+"']").each(function(){
				$(this).removeClass("cur");
			})
			$(this).addClass("cur");
		}
		var iso = false;
		if($(this).attr("data") == "3"){
			
		}
		var listDef = "";
		$.each($("#att li.cur"),function(){
			if($(this).attr("data")=="3"){
				iso=true;
				listDef = $(this);
			}
		})
		if( iso ){
			 var spc = listDef.children().first().val();
			 if(spc!="" && spc!=null && spc!="null"){
				 	var html='';
					$.each(spc.split(","),function(i,j){
						if(i == 0){
							$("#mainImg").attr("jqimg",j);
							$("#mainImg").attr("src",j);
						}
						html+='<li><img bimg="'+j+'" src="'+j+"?"+new Date().getTime()+'" onmousemove="preview(this);"></li>'
					})
					$("#imgList").empty();
					$("#imgList").append(html);
			 }
		}else{
			var spc = $("input[name='imgList']").val();
			 if(spc!=""){
				 	var html='';
					$.each(spc.split(","),function(i,j){
						if(i == 0){
							$("#mainImg").attr("jqimg",j);
							$("#mainImg").attr("src",j);
						}
						html+='<li><img bimg="'+j+'" src="'+j+"?"+new Date().getTime()+'" onmousemove="preview(this);"></li>';
					})
					$("#imgList").empty();
					$("#imgList").append(html);
			 }
		}
		selectAttribute($(this))
	})
	function selectAttribute(th) {
		var proId = getquerystring("proId");
		var value = '';
		var attributeLength = $("#attributeLength").val();
		$("#att li.cur").each(function(i) {
			if (i == 0) {
				value += $(this).val();
			} else {
				value += "-" + $(this).val();
			}
		})
		var ve =value.split("-");
		
		if(parseInt(attributeLength)-2 == ve.length){
			$("#att li").removeClass("tb-out-of-stock");
		}
		if(parseInt(attributeLength)-1 == ve.length ){
			$.each($("#att li"),function(){
				$(this).removeClass("tb-out-of-stock");
			})
			
			Web.Method.ajax("supProduct/getListAttributeAll", {
				data : {
					proId : proId,
					attrlist:value
				},
				success : function(data) {
					$("#att li").removeClass("tb-out-of-stock");
					$.each(data.info,function(i,j){
						var attr = j.attributeIds.split("-");
						if(parseInt(j.repertory) == "0" || j.repertory == null ){
							if(attr != null && attr.length>0){
								$.each(attr,function(l,k){
									if(ve.indexOf(k) < 0){
										$("#att li[value='"+k+"']").addClass("tb-out-of-stock");
									} 
								})
							}
						} 
					})
				},
				fail : function(data) {
					$.confAlert({
						size : "sm",
						context : data.msg,
						noButton : false
					});
				}
			});
		}else if(parseInt(attributeLength) == ve.length){
			var vals = "";
			$.each(ve,function(i,j){
				if(th.val() == j){
					
				}else{
					vals+=j+"-";
				}
			})
			vals= vals.substring(0,vals.length-1);
			Web.Method.ajax("supProduct/getListAttributeAll", {
				data : {
					proId : proId,
					attrlist:vals
				},
				success : function(data) {
					$("#att li").removeClass("tb-out-of-stock");
					$.each(data.info,function(i,j){
						var attr = j.attributeIds.split("-");
						if(parseInt(j.repertory) == "0" || j.repertory == null ){
							if(attr != null && attr.length>0){
								$.each(attr,function(l,k){
									if(ve.indexOf(k) < 0){
										$("#att li[value='"+k+"']").removeClass("cur");
										$("#att li[value='"+k+"']").addClass("tb-out-of-stock");
									} 
								})
							}
						} 
					})
				} 
			});
			
			Web.Method.ajax("supProduct/getListAttributeAll", {
				data : {
					proId : proId,
					attrlist:value
				},
				success : function(data) {
					var li =  data.info[0];
					
					if(li.repertory == "0"){
						var arr = "";
						$.each(ve,function(o,p){
							if(th.attr("value") != p ){
								arr+= p+"-"; 
							}
						}) 
						if(arr != ""){
							var iop = arr.split("-");
							 $("#att li[value='"+iop[0]+"']").addClass("tb-out-of-stock");
							 $("#att li[value='"+iop[0]+"']").removeClass("cur");
						}
					}
					$("#marketPrice").html(li.marketPrice);
					$("#priceLishe").html(parseInt(li.price_lishe)*100);
				} 
			});
		}
	}
});

function getListByProId(){
	var proId=getquerystring("proId")
	Web.Method.ajax("supProduct/getListByProId",{
		data : {
			proId:proId
		},
		success : function(data) {
			var list = data.info;
			getListAttribute(proId);
			$("#proNumber").html(list.proNumber);
			$("#marketPrice").html(list.marketPrice);
			$("#priceLishe").html(list.priceLishe*100);
			$("#proDetailsh").val(list.proDetails);
			$("#packBillh").val(list.packBill);
			$("#afterServiceh").val(list.afterService);
			$("#areaTemp").val(list.areaTemp);
			$("#proName").html(list.proName);
			$("#mainInfo").html(list.proDetails);
			$("#addInstName").html(list.addInstName);
			if(list.faPiao == "0"){
				$("#faPiao").html("不")
			}
			if(list.supportCash == "1"){
				$("#supportCash").html("不")
			}
			$("input[name='imgList']").val(list.proPics);
			var html='';
			$.each(list.proPics.split(","),function(i,j){
				if(i == 0){
					$("#mainImg").attr("jqimg",j);
					$("#mainImg").attr("src",j);
				}
				var dop = new Date().getTime();
				html+='<li><img bimg="'+j+"?"+dop+'" src="'+j+"?"+dop+'" onmousemove="preview(this);"></li>'
			})
			$("#imgList").empty();
			$("#imgList").append(html);
			getPei(list.areaTemp);
			
		},
		fail : function(data) {
			$.confAlert({
				size : "sm",
				context : data.msg,
				noButton : false
			});
		}
	});
	
	$(document).on("click","#one li a",function(){
		$("#sheng").html($(this).html());
		$("#shi,#qu").html("请选择");
		$("#two,#three").empty()
		getPeiTwo($(this).data("value"));
		$("#one li a").each(function(){
			$(this).removeClass("data-area-cur");
		})
		$(this).addClass("data-area-cur");
		selectArea();
	})
	$(document).on("click","#two li a",function(){
		$("#shi").html($(this).html());
		$("#qu").html("请选择");
		$("#three").empty()
		getPeiThree($(this).data("value"));
		$("#two li a").each(function(){
			$(this).removeClass("data-area-cur");
		})
		$(this).addClass("data-area-cur");
		selectArea();
	})
	$(document).on("click","#three li a",function(){
		$("#qu").html($(this).html());
		getPeiThree($(this).data("value"));
		$("#three li a").each(function(){
			$(this).removeClass("data-area-cur");
		})
		$(this).addClass("data-area-cur");
		selectArea();
	})
	
	$(document).on("click","#sheng,#shi,#qu",function(){
		var ac = $(this).attr("id");
		if(ac =="sheng"){
			$("#oneDiv").show();
			$("#twoDiv,#threeDiv").hide();
		}else if(ac =="shi"){
			$("#oneDiv,#threeDiv").hide();
			$("#twoDiv").show();
		}else if(ac =="qu"){
			$("#threeDiv").show();
			$("#oneDiv,#twoDiv").hide();
		}
	})
	function selectArea(){
		var html ='';
		$(".data-area-cur").each(function(i){
			if(i==0){
				html+= $(this).html();
			}else{
				html+= "-"+ $(this).html();
			}
		})
		$("#areaMain").html("")
		$("#areaMain").html(html+"<span></span>");
	}
}


function getquerystring(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null)
		return unescape(r[2]);
	return null;
}

function todiv(name){
	var val=document.getElementById(name).value;
	$("#mainInfo").html(val);
}

function getPei(areaTemp){
	Web.Method.ajax("products/areaList",{
		async:false,
		data:{tid:areaTemp},
		success:function(data){
			var sheng='';
			$.each(data.info,function(i,j){
				$.each(j.parentArea.split("&"),function(i,j){
					var val =  j.split("|");
					sheng+='<li><a href="javascript:;" data-value="'+val[0]+'">'+val[1]+'</a></li>'
				})
			})
			$("#one").empty()
			$("#one").append(sheng);
		}
	});
}

function getPeiTwo(parendId){
	var area_temp=$("#areaTemp").val()
	Web.Method.ajax("products/areaList",{
		async:false,
		data:{tid:area_temp},
		success:function(data){
			var ds = {};
			$.each(data.info,function(i,j){
				$.each(j.areaName.split("&"),function(l,k){
					var d;
					var dats='';
					$.each(k.split(","),function(o,p){
						if(o == 0){
							d=p.split("|")[1];
						}else{
							dats+=p+",";
						}
					})
					dats=dats.substring(0,dats.length-1);
					ds[d] = dats;
				})
			})
			if(ds[parendId]!=null && ds[parendId]!=""){
				var twos =ds[parendId].split(",");
				var html = '';
				$.each(twos,function(i,j){
					var t = j.split("|");
					html+='<li><a href="javascript:;" data-value="'+t[0]+'">'+t[1]+'</a></li>';
				})
				
				$("#oneDiv,#threeDiv").hide();
				$("#twoDiv").show();
				$("#sheng,#shi,#qu").removeClass("on");
				$("#shi").addClass("on");
				$("#two").empty()
				$("#two").append(html);
			} 
		}
	});
}

function getPeiThree(parendId){
	Web.Method.ajax("pubArea/getPubAreaByPid",{
		async:false,
		data:{pId:parendId},
		success:function(data){
			var das = data.info;
			if(das!=null && das!="" && das.length > 0){
				var html = '';
				
				$.each(das,function(i,j){
					html+='<li><a href="javascript:;" data-value="'+j.areaNo+'">'+j.areaName+'</a></li>';
				})
				 
				$("#oneDiv,#twoDiv").hide();
				$("#threeDiv").show();
				$("#sheng,#shi,#qu").removeClass("on");
				$("#qu").addClass("on");
				$("#three").empty()
				$("#three").append(html);
			} 
		}
	});
}



function getCls(){
	var proId=getquerystring("proId")
	Web.Method.ajax("supProduct/getCls",{
		data : {
			proId:proId
		},
		success : function(data) {
			var list = data.info;
			$("#clsIdZr").html(list[0].classifyName);
			$("#clsIdSt").html(list[1].classifyName);
			$("#clsIdNd").html(list[2].classifyName);
			
			/*document.getElementById("clsIdZr").innerText=list[0].classifyName;
			document.getElementById("clsIdSt").innerText=list[1].classifyName;
			document.getElementById("clsIdNd").innerText=list[2].classifyName;*/
			
			
		},
		fail : function(data) {
			$.confAlert({
				size : "sm",
				context : data.msg,
				noButton : false
			});
		}
	});
}

function getBrand(){
	var proId=getquerystring("proId");
	Web.Method.ajax("supProduct/getBrand",{
		data : {
			proId:proId
		},
		success : function(data) {
			var list = data.info;
			$("#brand").html(list.brandName=null?"":list.brandName);
			//document.getElementById("brand").innerText=list.brandName=null?"":list.brandName;
		},
		fail : function(data) {
			$.confAlert({
				size : "sm",
				context : data.msg,
				noButton : false
			});
		}
	});
}

function getListAttribute(proId){
	Web.Method.ajax("supProduct/getListAttribute",{
		data : {
			proId:proId
		},
		success : function(data) {
			$("#attributeLength").val(data.info.length);
			var htmlclose ='';
			var html='';
			$.each(data.info,function(i,j){
				if(j.ATT_TYPE == "3"){
					htmlclose+='<div class="product-choice clearfix" data="attdata">';
					htmlclose+='<dl>';
					htmlclose+='<dt class="product-choice-li1 left" value='+j.ATT_TYPE+'>'+j.TYPE_NAME+'：</dt>';
					htmlclose+='<dd class="left"><ul class="clearfix">';
					var imgSrc = (j.PIC+"").split("|$");
					var attId=(j.ATT_ID+"").split("|$");
					$.each(j.ATT_NAME.split("|$"),function(l,k){
						htmlclose+='<li class="product-choice-li2" value='+attId[l]+'  data="'+j.ATT_TYPE+'">';
						htmlclose+='<input type="hidden" value="'+(imgSrc[l])+'">';
						htmlclose+= '<a href="javascript:;">'+k+'</a></li>';
					})
					htmlclose+='</ul></dd></dl></div>';
				}else{
					html+='<div class="product-choice clearfix" data="attdata">';
					html+='<dl>';
					html+='<dt class="product-choice-li1 left" value='+j.ATT_TYPE+'>'+j.TYPE_NAME+'：</dt>';
					html+='<dd class="left"><ul class="clearfix">';
					var imgSrc = (j.PIC+"").split("|$");
					var attId=(j.ATT_ID+"").split("|$");
					$.each(j.ATT_NAME.split("|$"),function(l,k){
						html+='<li class="product-choice-li2" value='+attId[l]+'  data="'+j.ATT_TYPE+'">';
						html+='<input type="hidden" value="'+(imgSrc[l])+'">';
						html+= '<a href="javascript:;">'+k+'</a></li>';
					})
					html+='</ul></dd></dl></div>';
				}
			})
			if(htmlclose!=''){
				html = htmlclose + html;
			}
			$("#att").append(html);
		},
		fail : function(data) {
			$.confAlert({
				size : "sm",
				context : data.msg,
				noButton : false
			});
		}
	});
}