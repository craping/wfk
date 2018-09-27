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
			{name:"资讯标题",width:"15%"},
			{name:"行业",width:"15%"},
			{name:"发布人",width:"15%"}, 
			{name:"添加日期",width:"15%"},
			{name:"有效状态",width:"15%"},
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
				html+="<td width='15%'>"+ StringN(item.informationTitle ,20) +"</td>";
				
				if(item.reade == "0"){
					html+="<td width='15%'>计算机硬件</td>";
				}else if(item.reade == "1"){
					html+="<td width='15%'>互联网</td>";
				}else{
					html+="<td width='15%'>计算机软件</td>";
				}
				
				html+="<td width='15%'>"+item.issuer+"</td>";
				html+="<td width='15%'>"+date+"</td>";
				
				if(item.status=="0"){
					html+="<td width='15%'>有效</td>";
				}else if(item.status=="1"){
					html+="<td width='15%'>无效</td>";
				}
				html+="<td><div class='system-table-list'>";
				html+="<ul>";
					html+="<li><a href='info_AddInformationPro.html?proId="+item.proId+"' class='operate-icon1' title='编辑'></a></li>";
					html+="<li><a href='info_DetailedInformationPro.html?proId="+item.proId+"' class='operate-icon2' title='查看'></a></li>";
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
	var reade=$("#reade").attr("value")==""?undefined:$("#reade").attr("value");
	var status = $("#status").attr("value")==""?undefined:$("#status").attr("value");
	var options = {
			page_flag:page,
			page_num:rs.pageNum,
			reade:reade,
			status:status
		};
	var datas = $.extend(true,{},options,$("form").serializeJson());
	Web.Method.ajax("information/resultTPubInformationPro",{
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