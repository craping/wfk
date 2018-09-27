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
			{name:"资讯类型",width:"10%"},
			{name:"发布企业名称",width:"12%"}, 
			{name:"添加日期",width:"10%"},
			{name:"审核日期",width:"10%"},
			{name:"点赞量",width:"5%"},
			{name:"浏览量",width:"5%"},
			{name:"审核状态",width:"10%"},
			{name:"有效状态",width:"10%"},
			{name:"操作"}
		],
		eachItem:function(ui, item){
			for(var i in item){
				if(item[i]==null){
					item[i]="";
				}
			}
			var page = $("#system-page").data("lishe.pageSet").options.pageSet.page-1;
			var html="<tr>";
				html+="<td width='5%'><label>"+(parseInt(item.indexKey)+1)+"</label></td>" ;
				html+="<td width='10%'>"+StringN(item.informationTitle,20)+"</td>";
				if(item.informationType == "0"){
					html+="<td width='10%'>行业资讯</td>";
				}else{
					html+="<td width='10%'>企业资讯</td>";
				}
				html+="<td width='12%'>"+StringN(item.rEName,15)+"</td>";
				html+="<td width='10%'>"+item.addTime+"</td>";
				html+="<td width='10%'>"+item.checkDate+"</td>";
				html+="<td width='5%'>"+item.clickNum+"</td>";
				html+="<td width='5%'>"+item.pageView+"</td>";
				
				if(item.checkStatus == "0"){
					html+="<td width='10%'>待审核</td>";
				}else if(item.checkStatus == "1"){
					html+="<td width='10%'>审核通过</td>";
				}else if(item.checkStatus == "2"){
					html+="<td width='10%'>审核不通过</td>";
				}else{
					html+="<td width='10%'>--</td>";
				} 
				
				if(item.status == "1"){
					html+="<td width='10%'>无效</td>";
				}else if(item.status == "0"){
					html+="<td width='10%'>有效</td>";
				}else{
					html+="<td width='10%'>--</td>";
				}
				html+="<td><div class='system-table-list'>";
				html+="<ul>";
					html+="<li><a href='info_CheckInformation.html?informationId="+item.informationId+"' class='operate-icon9' title='审核'></a></li>";
					html+="<li><a href='info_DetailedInformation.html?informationId="+item.informationId+"' class='operate-icon2' title='详情'></a></li>";
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
	var type=$("#type").attr("value")==""?undefined:$("#type").attr("value");
	var options = {
			page_flag:page,
			page_num:rs.pageNum,
			type:type
		};
	var datas = $.extend(true,{},options,$("form").serializeJson());
	Web.Method.ajax("information/resultTPubInformation",{
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