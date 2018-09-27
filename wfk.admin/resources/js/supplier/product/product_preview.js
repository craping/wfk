$(function(){
	var proId = Web.Method.GetQueryString('proId');
	$("proid").attr("value",proId);
	Web.Method.ajax("/supProduct/getProductById",{
		async:false,
		data:{
			proId: proId
		},
		success:function(data){
			$.each(eval(data.info),function(i,j){
				if(i=="proDetails"){
					proDetails();
				}else if(i=="packBill"){
				}else if(i=="afterService"){
				}else if(i=="faq"){
					 
				}else if(i=="brand"){
					 $("[name='brand']").html(getbrand(j));
				}else if(i=="clsIdZr"){
					var clsIdZr=getclass(j);
					if(clsIdZr!=""){
						$("#clsIdZr").html(clsIdZr)
					}
				}else if(i=="clsIdSt"){
					var clsIdSt=getclass(j);
					if(clsIdSt!=""){
						$("#clsIdSt").html(clsIdSt)
					}
				}else if(i=="clsIdNd"){
					var clsIdNd=getclass(j);
					if(clsIdNd!=""){
						$("#clsIdNd").html(clsIdNd)
					}
				}else if(i=="priceLishe"){
					 $("#priceLishe").html(parseFloat(j)*100)
				}else if(i=="coverPics"){
					$("#mainImg").attr("jqimg",j);
					$("#mainImg").attr("src",j);
				}else {
					$("#"+i).html(j)
				};
				
			})
			var html = '';
			$.each(data.info.proPics.split(","),function(i,j){
				html+='<li><img bimg="'+j+'" src="'+j+'" onmousemove="preview(this);"></li>'
			})
			$("#imgList").empty();
			$("#imgList").append(html);
			
			//byAtt(proId)
		}
	});
	
	$(document).on("click",".product-choice-li2",function(){
		$("[data='"+$(this).attr("data")+"']").each(function(){
			$(this).removeClass("cur");
		})
		$(this).addClass("cur");
	})
	$(document).on("click","#proDetails",function(){
		proDetails();
	})
	$(document).on("click","#packBill",function(){
		packBill();
	})
	$(document).on("click","#afterService",function(){
		afterService();
	})
	$(document).on("click","#faq",function(){
		faq();
	})
})
function getclass(classid){
	var name="";
	Web.Method.ajax("classifySupplier/selectBaseClassify",{
		async: false,
		data:{
			classifyId:classid
		},
		success:function(data){
			if(data.info.length>0){
				name = data.info[0].classifyName;
			}
		} 
	});
	return name;
}
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
function getarea(no){
	var html='';
	Web.Method.ajax("pubArea/getPubAreaByPid",{
		async:false,
		data:{areaNo:no},
		success:function(data){
			if(data.info.length>0){
				html = data.info[0].areaName;
			}
		}
	});
	return html;
}
function byAtt(proId){
	Web.Method.ajax("supProduct/selectProdAtt",{
		async:false,
		data:{proId:proId},
		success:function(data){
			var html ='';
			$.each(data.info,function(i,j){
				html+='<div class="product-choice clearfix" data="attdata"> <ul>';
				html+='<li class="product-choice-li1">'+j.TYPE_NAME+'：</li>';
				var src = j.pic.split(",");
				$.each(j.att_name.split(","),function(l,k){
					if(l=="0"){
						html+='<li class="product-choice-li2 cur" data="'+j.ATT_TYPE+'"><img src="'+src[l]+'" width="20"  height="20">'+k+'</li>';
					}else{
						html+='<li class="product-choice-li2" data="'+j.ATT_TYPE+'" ><img src="'+src[l]+'" width="20"  height="20" >'+k+'</li>';
					}
				})
				html+='</ul> </div>';
			})
			$("[data='attdata']").each(function(){
				$(this).remove()
			})
			$("#att").append(html);
		}
	});
}

function proDetails(){
	var proid = $("proid").attr("value");
	Web.Method.ajax("/supProduct/getProductById",{
		async:false,
		data:{
			proId: proid
		},
		success:function(data){
			Web.Method.ajax("supProduct/proDetails",{
				async:false,
				data:{path:data.info.proDetails},
				success:function(datas){
					var html='';
					html+='<ul class="clearfix">';
					html+='<li>商品单位：<span id="proUnit">'+data.info.proUnit+'</span></li>';
					html+='<li>商品品牌：<span name="brand">'+getbrand(data.info.brand)+'</span></li>';
					html+='<li>商品产地：<span id="proArea">'+data.info.proArea+'</span></li>';
					html+='<li>商品所在地：<span id="locusPro">'+getarea(data.info.locusPro)+'</span><span id="locusCity">'+getarea(data.info.locusCity)+'</span><span id="locusArea">'+getarea(data.info.locusArea)+'</span></li>';
					if(data.info.faPiao== "0"){
						html+='<li>是否可提供发票：<span id="faPiao">否</span></li>';
					}else{
						html+='<li>是否可提供发票：<span id="faPiao">是</span></li>';
					}
					html+='</ul>';
					html+=datas.info;
					$("#mainInfo").html(html);
				}
			});
		}
	});
}

function packBill(proid){
	var proid = $("proid").attr("value");
	Web.Method.ajax("/supProduct/getProductById",{
		async:false,
		data:{
			proId: proid
		},
		success:function(data){
			$("#mainInfo").html(data.info.packBill);
		}
	});
}

function afterService(proid){
	var proid = $("proid").attr("value");
	Web.Method.ajax("/supProduct/getProductById",{
		async:false,
		data:{
			proId: proid
		},
		success:function(data){
			$("#mainInfo").html(data.info.afterService);
		}
	});
}

function faq(proid){
	var proid = $("proid").attr("value");
	Web.Method.ajax("/supProduct/getProductById",{
		async:false,
		data:{
			proId: proid
		},
		success:function(data){
			$("#mainInfo").html(data.info.faq);
		}
	});
}
