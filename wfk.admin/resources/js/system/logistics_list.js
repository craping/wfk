$(function(){
	$("#listview_logist").listview({
		style:"table-hover",
		headerStyle:"noborder",
		module:[
	        {name:"序号",width:"10%"},
			{name:"物流名称",width:"20%"},
			{name:"官网"},
			{name:"状态",width:"10%"},
			{name:"操作",width:"10%"}
		],
		eachItem:function(ui, item){
			for(var i in item){
				if(item[i]==null){
					item[i]="";
				}
			}
			var st_but="";
			var status="";
			var statusNum="";
			if(item.status=="1"){
				st_but="启用"
				status="停用";
				statusNum="0";
			}
			if(item.status=="0"){
				st_but="停用"
				status="启用"
			    statusNum="1";
			}
			var capacitys =
				'<div class="system-table-list">'
                +'<ul>'
                +'<li><a href="javascript:;" class="operate-icon1 updateSup" id="updateLogist" title="编辑" name="'+ item.logisticsId +'"></a></li>'
                +'</ul>'
                +'</div>';
			var page = $("#pageset_logist").data("lishe.pageSet").options.pageSet.page-1;
			var tr = $("<tr>" +
				    "<td width='10%'>"+ item.logisticsId + "</td>" +
					"<td width='10%'>"+ item.logisticsName + "</td>" +
					"<td width='20%'>"+ item.logisticsUrl +"</td>" +
					"<td width='10%'>"+ st_but +"</td>" + 
					"<td>" + capacitys + "</td>" +
				"</tr>");
			return tr;
		}
	});
	$("#pageset_logist").pageset({
		itemClick:function(page){
			findLogisticsList(page);
		}
	});
	findLogisticsList(1);
});

function findLogisticsList(page, listview, pageset){
	listview = listview?listview:$("#listview_logist");
	listview.listview("loading");
	Web.Method.ajax("logistics/getLogisticsList",{
		data:{
			page_flag:page,
			page_num:rs.pageNum
		},
		success:function(data){
			pageset = pageset?pageset:$("#pageset_logist");
			pageset.pageset("setData", {
				totalpage:data.totalpage,
				page:data.page,
				totalnum:data.totalnum
			});
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

$(document).on("click","#updateLogist",function(){
	var id=$(this).attr("name");
	window.location.href="../system/logistics_update.html?logist="+id;
});
