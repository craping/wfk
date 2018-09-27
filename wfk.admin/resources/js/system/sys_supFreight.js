$(function(){
	var supId='';
	var control='';//控制器选择
	if($("#supId",parent.document).val()!=undefined){
		supId=$("#supId",parent.document).val();
		control="supProduct";
	}else{
		supId=get("supId");
		control="products";
	}
	tempLsit(control,supId);
	$(".deleteTmep").on("click",function(){
		if(!confirm("确认删除吗")){
			   return false ;
		}
		var $this=$(this);
		var tid=$this.attr("name");
		Web.Method.ajax(control+"/updateTemp",{
			async:false,
			data:{
				tid:tid,
				status:1
				},
			success:function(data){
				if(data.errcode == "0"){
					$.confAlert({
						size:"sm",
						context:"已删除",
						noButton:false,
						onOk:function(){
							$this.parents("tr").remove();
							window.location.href="../supplier/freight_setting.html?";
						}
					})
				}
			//	tempLsit(control,supId);
			}
		});
	})
})

function tempLsit(control,supId){
	var html ='';
	Web.Method.ajax(control+"/areaTempList",{
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
								html +='<th width="5%"><a href="../supplier/freight.html?tid='+j.tid+'&supId='+supId+'">修改</a></th>';
								html +='<th><span class="freight-template-span1"></span></th>';
							html +='</tr>';
						html +='</thead>';
					html +='<tbody style="display: none;">'; 
						html +='<tr>';
							html +='<td>可配送区域</td>';
							html +='<td colspan="3">邮费（元）</td>';
						html +='</tr>';
						
						$.each(areaList(control,{tid:j.tid}),function(ii,jj){
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
						html +='<tr><td colspan="3" style="text-align: right;"><span class="">共有'+j.proNumber+'款商品在使用此模版 </span></td></tr>';
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
//freight:tmep,areaLevel:level,parentArea:parent
function areaList(control,params){
	var datas ;
	Web.Method.ajax(control+"/areaList",{
		async:false,
		data:params,
		success:function(data){
			datas = data.info;
		}
	});
	return datas;
}

function deleteTemp(tid){
	if(!confirm("确认删除吗")){
		   return false ;
	}
	var control='';
	var supId='';
	if($("#supId",parent.document).val()!=undefined){
		supId=$("#supId",parent.document).val();
		control="supProduct";
	}else{
		
		supId=get("supId");
		control="products";
	}
	var $this=$(this);
	Web.Method.ajax(control+"/updateTemp",{
		async:false,
		data:{tid:tid,status:1},
		success:function(data){
			if(data.errcode == "0"){
				$.confAlert({
					size:"sm",
					context:"已删除",
					noButton:false,
					onOk:function(){
						$this.parents('tr').remove();
						//window.location.href="../supplier/freight_setting.html?";
					}
				})
			}
			tempLsit(control,supId);
		}
	});
}

function get(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]);
	return null;
}