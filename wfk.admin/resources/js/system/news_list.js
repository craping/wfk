var rs = {
	params:[],
	pageNum:10
};
$(function(){
	$(document).keydown(function(event){
		if(event.keyCode == 13){
			queryList(1);	
			return false;
		}
	});
	$("#system-table").listview({
		style:"table-hover",
		headerStyle:"noborder",
		module:[
	        {name:"序号 ",width:"5%"},
			{name:"新闻标题",width:"40%"},
			{name:"新闻分类",width:"10%"},
			{name:"发布日期",width:"10%"},
			{name:"状态",width:"5%"},
			{name:"操作"}
		],
		eachItem:function(ui, item){
			for(var i in item){
				if(item[i]==null){
					item[i]="";
				}
			}
			var date = new Date();
			date.setTime(item.pulishTime);
			date=date.format("yyyy/MM/dd HH:mm");
			var page = $("#system-page").data("lishe.pageSet").options.pageSet.page-1;
			var html="<tr>";
				html+="<td width='5%'>"+(parseInt(item.indexKey)+1)+"</td>" ;
				html+="<td width='15%'>"+ StringN(item.title ,40) +"</td>";
				
				if(item.type == "1"){
					html+="<td width='15%'>公司新闻</td>";
				}else if(item.type == "2"){
					html+="<td width='15%'>行业新闻</td>";
				}else if(item.type == "3"){
					html+="<td width='15%'>社会热点</td>";
				}
				
				html+="<td width='15%'>"+date+"</td>";
				
				if(item.status=="1"){
					html+="<td width='15%'>有效</td>";
				}else if(item.status=="0"){
					html+="<td width='15%'>无效</td>";
				}
				html+="<td><div class='system-table-list'>";
				html+="<ul>";
				if(item.status == 1){
					html+="<li><a  href='javascript:;' onclick='oprStatus(" + item.id + ", 0)' target='iframe' class='operate-icon26' title='置为无效'></a></li>";
				} else {
					html+="<li><a  href='javascript:;' onclick='oprStatus(" + item.id + ", 1)' target='iframe' class='operate-icon25' title='置为有效'></a></li>";
				}
				html+="<li><a href='news_edit.html?id="+item.id+"' class='operate-icon1' title='编辑'></a></li>";
				html+="<li><a href='news_edit.html?id="+item.id+"' class='operate-icon2' title='查看'></a></li>";
				html+="</ul>";
				html+="</div> </td>";
			html+="</tr>";
			var tr = $(html);
			return tr;
		}
	});
	
	queryList(1);
	//分页处理
	$("#system-page").pageset({
		itemClick:function(page){
			queryList(page);
		}
	});
	
	$(document).on("click","#ok",function(){
		queryList(1);
	})
	$(document).on("click","#clear",function(){
		$("form input[type='text']").each(function(){
			$(this).val("");
		});
		$(".selectValve").attr("value", "");
		$(".selectValve").html("请选择");
	})
})

function oprStatus(id, status) {
	Web.Method.ajax("/news/oprNews",{
		data:{id:id,status:status},
		success:function(data){
			 if(data.errcode == "0"){
				 $.confAlert({
					size:"sm",
					context:"操作成功",
					noButton:false ,
					onOk:function(){
						 queryList(1);
					}
				})
			 }
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

function queryList(page, listview, pageset){
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
	Web.Method.ajax("news/getList",{
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