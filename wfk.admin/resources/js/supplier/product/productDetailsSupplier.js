function get(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]);
	return null;
}


$(function(){
	Web.Method.ajax("supProduct/getProductById", {
		data : {
			proId :get("proId"),
		},
		success : function(data) {
			if(data.info["rebateType"]=="0"){
				$("#rebateType").html("总价返利");	
			}
			if(data.info["rebateType"]=="1"){
				$("#rebateType").html("底价折算");	
			}
			if(data.info["faPiao"]=="0"){
				$("#faPiao").html("否");	
			}
			if(data.info["faPiao"]=="1"){
				$("#faPiao").html("是");	
			}
			$("[name='proNumber']").html(data.info.proNumber);
			$(".see_pic").each(function(){
				for(var item in data.info){
					if(item==$(this).attr("name")){
						$(this).attr("value",data.info[item]);
					}
				}
			})
			locusPro(data.info);
			locusCity(data.info);
			locusArea(data.info);
			//配送区域
			areaTemp(data.info);
			
			$(".pro_details").each(function(){
					for(var item in data.info){
						if(item==$(this).attr("name")){
							$(this).html(data.info[item]);
						}
					}
			})
			$("[name='brand']").html(getbrand(data.info.brand));
			$("[name='proUnit']").html(data.info.proUnit);
			$("[name='priceLishe']").html(data.info.priceLishe)
			$("[name='ProArea']").html(data.info.proArea);
			//一级分类
			$("[name='clsIdZr']").html(classfiy(data.info.clsIdZr)[0].classifyName)
			$("[name='clsIdSt']").html(classfiy(data.info.clsIdSt)[0].classifyName)
			$("[name='clsIdNd']").html(classfiy(data.info.clsIdNd)[0].classifyName)
			
			//attribute(data.info.proId);
		},
		fail : function(data) {
		}
	});
	
	$("#return_productlist").click(function(){
		window.location.href="sup_list.html";
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
});
//配送区域
function areaTemp(pro){
	//alert(JSON.stringify(pro))
	var html ='';
	Web.Method.ajax("supProduct/areaTempList",{
		async:false,
		data:{status:0,tid:pro.areaTemp},
		success:function(data){
			if(data.info.length>0){
				var html='';
				$.each(data.info,function(i,j){
					$.each(areaList({freight:j.tid}),function(ii,jj){
						var sheng = jj.parentArea.split("&");
						var shi = jj.areaName.split("&");
						html +='<tr>';
						html +='<td>';
						html+='<div class="textalign"<ul>';
						if(sheng[i].split("|")[2]=="1"){
							html+='<li>';
							html+=sheng[i].split("|")[1];
							html+='</li>';
						}else{
							   
							$.each(sheng,function(i,j){
								html+='<li>';
								html+=sheng[i].split("|")[1]+":　" + splitshi(shi[i],1)
								html+='</li>';
							})
						}
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
//freight:tmep,areaLevel:level,parentArea:parent
function areaList(params){
	var datas ;
	Web.Method.ajax("supProduct/areaList",{
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
//分类
function classfiy(classId){
	var obj;
	Web.Method.ajax("classifySupplier/selectBaseClassify",{
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
	Web.Method.ajax("/brandSupplier/selectTProdBrand",{
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
	Web.Method.ajax("supProduct/selectProdAtt",{
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
				 
				 html+='<tr>';
				 html+='<td width="50%">'+j.TYPE_NAME+'</td>';
				 html+='<td>查看图片</td>';
				 html+='</tr>';
				 
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