$(function(){
	
	$("#listview_ads").listview({
		style:"table-hover",
		headerStyle:"noborder",
		module:[
	        {name:"序号",width:"5%"},
			{name:"所在位置/名称",width:"20%"},
			{name:"广告链接",width:"20%"},
			{name:"排序",width:"5%"},
			{name:"最后修改日期",width:"15%"},
			{name:"浏览量",width:"10%"},
			{name:"状态",width:"10%"},
			{name:"操作",width:"15%"}
		],
		eachItem:function(ui, item){
			
            var handle_head = "<div class='system-table-list'><ul>";
			var edit = "<li><a href='ad_edit.html?id="+ item.id +"' target='iframe'>编辑</a></li>";
			var handle_foot = "</ul></div>";
			
			var page = $("#pageset_ads").data("lishe.pageSet").options.pageSet.page-1;
			var tr = $("<tr>" +
						"<td>"+(parseInt(item.indexKey) + page * rs.pageNum + 1)+"</td>" +
						"<td>"+ item.positionName +"</td>" +
						"<td>"+ item.url +"</td>" +
						"<td>"+ item.orders +"</td>" +
						"<td>"+ new Date(item.modifyDate).format('yyyy/MM/dd') +"</td>" +
						"<td>"+ item.hits +"</td>" +
						"<td>"+ rs.adStatus[item.adStatus] +"</td>" +
						"<td>"+ edit +"</td>" +
					"</tr>");
			
			return tr;
		}
		
	});
	$("#pageset_ads").pageset({
		itemClick:function(page){
			queryAdsList(page);
		}
	});
	
	queryAdsList(1);
	
});


function queryAdsList(page, listview, pageset){
	var options = {
		page_flag:page,
		page_num:rs.pageNum
	};
	var datas = $.extend(true,{},options,$("form").serializeJson());
	listview = listview?listview:$("#listview_ads");
	listview.listview("loading");
	Web.Method.ajax("sysShpAd/getShpAdList",{
		data:datas,
		success:function(data){
			pageset = pageset?pageset:$("#pageset_ads");
			pageset.pageset("setData", {
				totalpage:data.totalpage,
				totalnum:data.totalnum,
				page:data.page
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

