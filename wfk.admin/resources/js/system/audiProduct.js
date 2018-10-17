function get(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]);
	return null;
}

$(function(){
	var validator=$("#product_form").validate(); //表单校验
	var proId=get("proId");
	$("#proId").val(proId);
	
	Web.Method.ajax("products/getProductById", {
		data : {
			proId :proId,
		},
		success : function(data) {
			$("#productId").val(proId);
			if(data.info["supportCash"] == "0"){
				$("#supportCash").html("是");
				$("#supportCash").attr("value",0);
			}
			if(data.info["supportCash"] == "1"){
				$("#supportCash").html("否");
				$("#supportCash").attr("value",1);
			}
			locusPro(data.info);
			locusCity(data.info);
			locusArea(data.info);
			areaTemp(data.info);
			$(".see_pic").each(function(){
				for(var item in data.info){
					if(item==$(this).attr("name")){
						$(this).attr("value",data.info[item]);
					}
				}
			})
			$("[name='proNumber']").html(data.info.proNumber);
			$(".ProArea").html(data.info.proArea);
			$("[name='priceLishe']").html(data.info.priceLishe)
			
			$(".pro_details").each(function(){
					for(var item in data.info){
						if(item==$(this).attr("name")){
							$(this).html(data.info[item]);
						}
					}
			})
			if(data.info["checkStatus"]!=null){
				var html=selectJson["checkStatus"+data.info["checkStatus"]];
				$("#checkStatus").attr("value",data.info["checkStatus"]);
				$("#checkStatus").html("");
				$("#checkStatus").append(html);
			}
			$("[name='brand']").html(getbrand(data.info.brand));
			//一级分类
			var cls=data.info.clsIdNd.split("-");
			$("[name='clsIdZr']").html(classfiy(cls[0])[0].classifyName);
			$("[name='clsIdSt']").html(classfiy(cls[1])[0].classifyName);
			$("[name='clsIdNd']").html(classfiy(cls[2])[0].classifyName);
			
			$("[name='proUnit']").html(data.info.proUnit);
			//attribute(data.info.proId);
			
			$("input[name='priceSupply']").val(data.info.priceSupply);
			$("input[name='priceLishe']").val(data.info.priceLishe);
			$("input[name='supportCash']").val(data.info.supportCash);
			$("input[name='seoTitle']").val(data.info.seoTitle);
			$("textarea[name='seoKeyword']").val(data.info.seoKeyword);
			$("textarea[name='checkMemo']").val(data.info.checkMemo);
		},
		fail : function(data) {
		}
	});
	
     $(document).on("click","a[class='see_pic']",function(){
		var picUrl=$(this).attr("value");
        //官网欢迎页
        layer.open({
            type: 2,
            title: '',
            fix: false,
            shadeClose: true,
            area: ['900px', '545px'],
            content:'../common/layer_box.html?picUrl='+picUrl
        });
	})

	//取消
	$(document).on("click", "#cancel_submit", function() {
		window.location.href="../system/product_productManage.html";
	});
	
	$(document).on("click", ".suc_submit", function() {
		$("input[name='checkStatus']").val($(this).attr("value"));
		//处理审核状态的值
		$("[name='supportCash']").attr("value",$("#supportCash").attr("value"));
		if(!$("#supportCash").valibtValue()){return false;};
		if(!validator.form()){
			return false;
		}
		var data = $("#product_form").serializeJson(true);
		Web.Method.ajax("products/examineProduct", {
			data : data,
			success : function(data) {
				window.location.href="../system/product_productManage.html"
			},
			fail : function(data) {
				$.confAlert({
					size:"sm",
					context:msg,
					noButton:false
				})
			}
		});
	});
});

//配送区域
function areaTemp(pro){
	var html ='';
	Web.Method.ajax("products/areaTempList",{
		async:false,
		data:{status:0,tid:pro.areaTemp},
		success:function(data){
			if(data.info.length>0){
				var html='';
				$.each(data.info,function(i,j){
					$.each(areaList({tid:j.tid}),function(ii,jj){
						var sheng = jj.parentArea.split("&");
						var shi = jj.areaName.split("&");
					    html +='<tr>';
						html +='<td>';
						html+='<div class="textalign"<ul>';
						$.each(sheng,function(i,j){
							if(j.split("|")[2]=="1"){
								html+='<li>';
								html+=sheng[i].split("|")[1];
								html+='</li>';
							}else if(j.split("|")[2]=="2"){
								html+='<li>';
								html+=sheng[i].split("|")[1]+":　" + splitshi(shi[i],1)
								html+='</li>';
							}
						})
							
						html+='</ul></div>';
						html +='</td>';
						html +='<td colspan="3">'+jj.price+'</td>';
					    html +='</tr>';
					})
				})
				$("#areaTemp").after(html);
			}
		}
	});
}
function areaList(params){
	var datas ;
	Web.Method.ajax("products/areaList",{
		async:false,
		data:params,
		success:function(data){
			datas = data.info;
		}
	});
	return datas;
}
function splitshi(val,num){
	var v = val.split(",");
	var html ='';
	$.each(v,function(i,j){
		if(j.split("|")[0]!="parentId"){
		  html+=j.split("|")[num]+",";
		}
	})
	html=html.substring(0,html.length-1);
	return html;
}
//省
function locusPro(prod){
	var prov =updategetarea({parentId:0});
	var html='';
	for (var i = 0; i < prov.length; i++) {
		if(prod.locusPro == prov[i].areaNo)
			$("[name=locusPro]").html(prov[i].areaName);
	}
}
//市
function locusCity(prod){
	var prov =updategetarea({parentId:prod.locusPro});
	var html='';
	for (var i = 0; i < prov.length; i++) {
		if(prod.locusCity == prov[i].areaNo)
			$("[name=locusCity]").html(prov[i].areaName);
	}
}
//区
function locusArea(prod){
	var prov =updategetarea({parentId:prod.locusCity});
	var html='';
	for (var i = 0; i < prov.length; i++) {
		if(prod.locusArea == prov[i].areaNo)
			$("[name=locusArea]").html(prov[i].areaName);
	}
}
//分类
function classfiy(classId){
	var obj;
	Web.Method.ajax("classify/selectBaseClassify",{
		data:{classifyId:classId},
		async: false,
		success:function(data){
			obj =  data.info; 
		}
	});  
	return obj;
}
//品牌
function getbrand(brand){
	var name="";
	Web.Method.ajax("/brand/selectTProdBrand",{
		data:{brandId:brand},
		async: false,
		success:function(data){
			if(data.info.length > 0){
				name = data.info[0].brandName;
			}
			
		} 
	});
	return name;
}
//属性
function attribute(proId){
	var obj;
	Web.Method.ajax("products/selectProdAtt",{
		data:{proId:proId},
		async: false,
		success:function(data){
			  var html ='<h2>商品属性规格</h2>';
			 $.each(data.info,function(i,j){
				 html+='<h3>'+j.TYPE_NAME+'：</h3>';
				 html+='<div class="system-order-c">';
				 html+='<div class="system-order-list">';
				 html+='<div class="system-table">';
				 html+='<table>';
				 
				 html+='<thead>';
				 html+='<tr>';
				 html+='<th width="50%">'+j.TYPE_NAME+'</th>';
				 html+='<th>查看图片</th>';
				 html+='</tr>';
				 html+='</thead>';
				 
				 var att_name = j.att_name.split(",");
				 
				 var pics = new Array();
				 if(j.pic!=null && j.pic!=""){
					 pics = j.pic.split(",");
				 }
				 
				 $.each(att_name,function(k,l){
					 html+='<tr>';
					 html+='<td>'+l+' </td>';
					 
					 html+='<td><a href="javascript:;" value ='+pics[k]+' class="see_pic">查看</a></td>';
					 html+='</tr>';
					 
				 })
				 html+='</table>';
				 html+='</div>';
				 html+='</div>';
				 html+=' </div>';
			 })
			 
			 $("#systemAtt").append(html);
		}
	});  
	return obj;
}

var selectJson={
		checkStatus0:'<a  href="javascript:void(0);">待提交</a>',
		checkStatus1:'<a  href="javascript:void(0);">待审核</a>',
		checkStatus2:'<a  href="javascript:void(0);">审核通过</a>',
		checkStatus3:'<a  href="javascript:void(0);">审核不通过</a>'
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
