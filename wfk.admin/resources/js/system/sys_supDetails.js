$(function(){ 
	var supId='';
	var control='';//控制器选择
	var controlp='';
		supId=get("supId");
		control="sysSupplier";
		controlp="products";
	//$("#update_supMsg").attr("href","../supplier/sup_update.html?supId="+supId);
	Web.Method.ajax(control+"/getSupDetails", {
		data : {
			supId : supId,
		},
		success : function(data) {

			$(".see_pic").each(function(){
			 for(var i=0;i<data.info.length;++i){
				for(var item in data.info[i]){
					if(item==$(this).attr("name")){
						$(this).attr("value",data.info[i][item]);
					}
				}
			 }
			})
			if(data.info[0]["paperType"]=="1"){
				$("[name=coInstNum]").parent().remove();
				$("[name=coTaxNum]").parent().remove();
			}
			$(".sup_details").each(function(){
				for(var i=0;i<data.info.length;++i){
					for(var item in data.info[i]){
						if(item==$(this).attr("name")){
							$(this).html(data.info[i][item]);
						}
					}
				}
			})
			
			
			for(var i=0;i<data.info.length;++i){
				for(var item in data.info[i]){
					var sel=item+data.info[i][item];
					if(selectJson[sel]!=undefined){
						$("#"+item+"").html(selectJson[sel]);
					}
				}
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
							$(this).html(data.info[i][item]);
						}
					}
				}
		    })
	    },
		fail : function(data) {
		}
	});
	//运费模板
		var html ='';
		Web.Method.ajax(controlp+"/areaTempList",{
			async:false,
			data:{
				supId:supId,
				status:0},
			success:function(data){
				if(data.info.length>0){
					$.each(data.info,function(i,j){
						var addTime=j["addTime"]==undefined||j["addTime"]==""?"--":new Date(j["addTime"]).format("yyyy/MM/dd");
						html +='<div class="freight-template-table">';
						html +='<table>';
							html +='<thead>';
								html +='<tr>';
									html +='<th width="69.9%" >'+j.tName+'</th>';
									html +='<th width="20%">最后编辑时间'+addTime+'</th>';
									html +='<th><span class="freight-template-span1"></span></th>';
								html +='</tr>';
							html +='</thead>';
						html +='<tbody style="display: none;">'; 
							html +='<tr>';
								html +='<td>可配送区域</td>';
								html +='<td colspan="3">邮费（元）</td>';
							html +='</tr>';
							
							$.each(areaList(controlp,{tid:j.tid}),function(ii,jj){
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
						html +='</tbody>';
						html +='</table>';
						html +='</div>';
					})
				}
				$("#tmpl").empty();
				$("#tmpl").append(html);
			}
		});
		
		
		
		
	$("#return_suplist").click(function(){
		if($("#supId",parent.document).val()!=undefined){
			window.location.href="../supplier/index.html";
			return;
		}
		window.location.href="sup_list.html";
	});
});

function areaList(controlp,params){
	var datas ;
	Web.Method.ajax(controlp+"/areaList",{
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
		html+=j.split("|")[num]+",";
	})
	html=html.substring(0,html.length-1);
	return html;
}
//页面数据
var selectJson={ordArbitration0:'同意',
		ordArbitration1:'拒绝',
		setPeriod0:'日结',
		setPeriod1:'月结',
		supLevel0:'品牌',
		supLevel1:'非品牌',
		supType0:'站点',
		supType1:'非站点',
		supBuyRole0:'采购',
		supBuyRole1:'非采购',
		supRole0:'推送',
		supRole1:'非推送',
};

$(document).on("click",".see_pic",function(){
    //官网欢迎页
	var picUrl=$(this).attr("value");
    layer.open({
        type: 2,
        title: '',
        fix: false,
        shadeClose: true,
        area: ['955px', '545px'],
        content: '../common/layer_box.html?picUrl='+picUrl,
        shade: [0.1,'#fff']
    });
});

function get(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]);
	return null;
}