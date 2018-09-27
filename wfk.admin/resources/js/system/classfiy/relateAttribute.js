//获取url 的参数
function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]);
	return null;
}

$(function(){
	$("attId").attr("value",GetQueryString("attId"));
	$("classid").attr("value",GetQueryString("classId"));
	var attL = selectDeb();
	$("#system-table").listview({
		style:"table-hover",
		headerStyle:"noborder",
		module:[
			{name:"属性名称"},
		],
		eachItem:function(ui, item){
			for(var i in item){
				if(item[i]==null){
					item[i]="";
				}
			}
			var capacitys ='';
			var html="<tr><td >"+ item.attName +"</td></tr>";
			var tr = $(html);
			return tr;
		}
	});
	
	querySupList(1);
	//返回
	$(document).on("click","#retrunClass",function(){
		var attId = $("attid").attr("value")
		var classid = $("classid").attr("value");
		window.location.href="../system/product_relateAttributeMamage.html?classId="+classid+"&attid"+attId;
	})
	$(document).on("click","#save",function(){
		var attid  = ""
		$('input[name="att"]:checked').each(function(){
			attid+=$(this).val()+","
		})
		attid=attid.substring(0, attid.length-1)
		
		var classifyid = $("classid").attr("value");
		var atttype = $("attid").attr("value");
		
		var params={atttype:atttype,classifyId:classifyid,attid:attid}
		Web.Method.ajax("classify/addClassAtt",{
			
			async:false,
			data:params,
			success:function(data){
				if(data.errcode == "0" ){
					$.confAlert({
						size:"sm",
						context:"保存成功",
						noButton:false 
				})
				}
			},fail:function(data){
				
			}
		});
	})
	$("#attOk").click(function(){
		querySupList(1);
	})
	
})
function selectDeb(){
	var obj;
	var classifyid = $("classid").attr("value");
	var atttype = $("attid").attr("value");
	Web.Method.ajax("classify/resultClassAtt",{
		data:{atttype:atttype,classifyId:classifyid},
		async: false,
		success:function(data){
			var vals = "";
			 $.each(data.info,function(i,j){
				 vals += j.attId+","
			 })
			obj = vals;
		} 
	});
	return obj;
}
function querySupList(page, listview, pageset){
	listview = listview?listview:$("#system-table");
	listview.listview("loading");
	var options = {
			//page_flag:page,
			//page_num:rs.pageNum,
			attType:$("attid").attr("value")
	};
	var datas = $.extend(true,{},options,$("form").serializeJson());
	Web.Method.ajax("/attribute/selectFeaAttribute",{
		data:datas,
		success:function(data){
			listview.listview("setData", data.info);
		},
		fail:function(data){
			$.confAlert({
				size:"sm",
				context:data.msg,
				noButton:false
			})
		}
	});
}