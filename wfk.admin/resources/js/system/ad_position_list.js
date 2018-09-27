$(function(){
	
	var positions = {};
	var ad_params = {};
	$("#listview_ad_positions").listview({
		style:"table-hover",
		headerStyle:"noborder",
		module:[
	        {name:"位置",width:"10%"},
			{name:"略缩图",width:"20%"},
			{name:"广告链接",width:"15%"},
			{name:"操作人",width:"10%"},
			{name:"最后修改日期",width:"15%"},
			{name:"有效状态",width:"10%"},
			{name:"操作",width:"10%"},
			{name:"广告位操作",width:"10%"}
		],
		eachItem:function(ui, item){
//			alert(JSON.stringify($.extend(true,{},$("form").serializeJson(),item.id)));
			var id = { adPosition:item.id }
			var ads = queryAdsList($.extend(true,{},$("form").serializeJson(),id));
			positions[item.id.toString()] = item.name.toString();
			var href = "ad_add.html?pid=" + item.id + "&name=" + item.name;
			var add = "<a href='" + href + "' target='iframe'>添加</a>";
			var ads_size = ads.length;
			var page = $("#pageset_ad_positions").data("lishe.pageSet").options.pageSet.page-1;
			var trs = "";
			if(isNullOrEmpty(ads) || ads_size == 0){
				trs += "<tr>";
				trs += "<td>" + item.name + "</td><td></td><td></td><td></td><td></td><td></td><td></td><td>" + add + "</td>";
			}else{
				$.each(ads,function(i,j){
					var tr = "<tr>";
					var handle_head = "<div class='system-table-list'><ul>";
					var edit = "<li><a href='ad_edit.html?id="+ j.id +"' class='operate-icon1' title='编辑' target='iframe'></a></li>";
					var del = "<li><a href='javascript:void(0);' class='operate-icon4' onclick='delAd(" + j.id + ")' title='删除' target='iframe'></a></li>";
					var handle_foot = "</ul></div>";
					trs += tr;
					var operate = isNullOrEmpty(j.operatePeople)?"--":j.operatePeople;
					var common = "<td><img src='"+ j.path +"' width='30px' height='30px' /></td>" +
								"<td>"+ j.url +"</td>" +
								"<td>"+ operate +"</td>" +
								"<td>"+ new Date(j.modifyDate).format('yyyy/MM/dd') +"</td>" +
								"<td>"+ rs.adStatus[j.adStatus] +"</td>" +
								"<td>"+ handle_head + edit + del + handle_foot +"</td>";
					if(i == 0){
						trs += "<td rowspan='" + ads_size + "'>" + item.name + "</td>";
						trs += common;
						trs += "<td rowspan='" + ads_size + "'>" + add + "</td>";
					}else{
						trs += common;
					}
					trs += "</tr>";
				});
			}
			
			return trs;
		}
		
	});
	$("#pageset_ads").pageset({
		itemClick:function(page){
			queryAdPositonsList(page);
		}
	});
	
	queryAdPositonsList(1);
	rs.adPosition = positions;
	
	$("#searchSubmit").click(function(){
		ad_params = $("#form").serializeJson();
		queryAdPositonsList(1);
	});
	
});


function queryAdPositonsList(page, listview, pageset){
	var options = {
		page_flag:page,
		page_num:rs.pageNum
	};
	var datas = $.extend(true,{},options,$("form").serializeJson());
	listview = listview?listview:$("#listview_ad_positions");
	listview.listview("loading");
	Web.Method.ajax("adPosition/getAdPositionList",{
		async: false,
		data:datas,
		success:function(data){
			pageset = pageset?pageset:$("#pageset_ad_positions");
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

function queryAdsList(params){
	var datas = null;
	Web.Method.ajax("sysShpAd/getShpAdList",{
		async:false,
		data:params,
		success:function(data){
			datas = data.info;
		},
		fail:function(data){
		}
	});
	return datas;
}


function delAd(id){
	if(confirm("确认删除？")){
		Web.Method.ajax("sysShpAd/delShpAd",{
			async:false,
			data:{
				id:id
			},
			success:function(data){
				$.confAlert({
					size:"sm",
					context:data.msg,
					noButton:false
				});
				location.reload();
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
}

