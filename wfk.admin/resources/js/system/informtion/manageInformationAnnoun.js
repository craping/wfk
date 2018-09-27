var rs = {
	params:[],
	pageNum:10
	
};
$(function(){
	$(document).keydown(function(event){
		if(event.keyCode == 13){
			querySupList(1);	
			return false;
		}
	});
	$("#system-table").listview({
		style:"table-hover",
		headerStyle:"noborder",
		module:[
	        {name:"序号 ",width:"5%"},
			{name:"资讯标题",width:"10%"},
			{name:"发布人",width:"10%"},
			{name:"添加日期",width:"15%"},
			{name:"点赞量",width:"10%"},
			{name:"浏览量",width:"10%"},
			{name:"有效状态",width:"10%"},
			{name:"操作"}
		],
		eachItem:function(ui, item){
			for(var i in item){
				if(item[i]==null){
					item[i]="";
				}
			}
			var date = new Date();
			date.setTime(item.addTime);
			date=date.format("yyyy/MM/dd HH:mm:ss");
			var page = $("#system-page").data("lishe.pageSet").options.pageSet.page-1;
			var html="<tr>";
				html+="<td width='5%'>"+(parseInt(item.indexKey)+1)+"</td>" ;
				html+="<td width='10%'>"+StringN(item.title,30)+"</td>";
				html+="<td width='10%'>"+item.issue+"</td>";
				html+="<td width='15%'>"+date +"</td>";
				html+="<td width='10%'>"+item.clickNumber+"</td>";
				html+="<td width='10%'>"+item.pageView+"</td>";
				if(item.status == "1"){
					html+="<td width='10%'>无效</td>";
				}else if(item.status == "0"){
					html+="<td width='10%'>有效</td>";
				}else{
					html+="<td width='10%'>--</td>";
				}
				html+="<td><div class='system-table-list'>";
				html+="<ul>";
					html+="<li><a href='info_EditInformationAnnoun.html?announId="+item.id+"' class='operate-icon1' title='编辑'></a></li>";
					html+="<li><a href='info_DetailedInformationAuuoun.html?announId="+item.id+"' class='operate-icon2' title='详情'></a></li>";
				html+="</ul>";
				html+="</div> </td>";
			html+="</tr>";
			var tr = $(html);
			return tr;
		}
	});
	
	querySupList(1);
	//分页处理
	$("#system-page").pageset({
		itemClick:function(page){
			querySupList(page);
		}
	});
	$(document).on("click","#OK",function(){
		querySupList(1);
	})
})



function querySupList(page, listview, pageset){
	listview = listview?listview:$("#system-table");
	listview.listview("loading");
	var status = $("#status").attr("value")==""?undefined:$("#status").attr("value");
	var options = {
			page_flag:page,
			page_num:rs.pageNum,
			status:status
		};
	var datas = $.extend(true,{},options,$("form").serializeJson());
	Web.Method.ajax("information/resultTPubAnnouncement",{
		data:datas,
		success:function(data){
			pageset = pageset?pageset:$("#system-page");
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