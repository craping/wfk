 var rs = {
	params:[],
	pageNum:10
	
};
 
Web.Method.ajax("information/resultTPubBottom",{
		data:{level:1},
		success:function(data){
			var html = '';
			if(data.info.length>0){
				$.each(data.info,function(i,j){
					if(i==0){
						html+='<li class="on" value="'+j.id+'">'+j.title+'</li>';
					}else{
						html+='<li value="'+j.id+'">'+j.title+'</li>';
					}
					
				})
			}
			$("#clearfix").empty();
			$("#clearfix").append(html);
		},
		fail:function(data){
			$.confAlert({
				size:"sm",
				context:data.msg,
				noButton:false
			})
		}
	});
 
$(function(){
	$("#system-table").listview({
		style:"table-hover",
		headerStyle:"noborder",
		module:[
	        {name:"序号 ",width:"5%"},
			{name:"资讯标题",width:"25%"},
			{name:"广告链接",width:"25%"},
			{name:"最后修改日期",width:"15%"}, 
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
			date.setTime(item.updateTime);
			date=date.format("yyyy/MM/dd HH:mm:ss");
			var page = $("#system-page").data("lishe.pageSet").options.pageSet.page-1;
			var html="<tr>";
				html+="<td width='5%'>"+(parseInt(item.indexKey)+1)+"</td>";
				html+="<td width='25%'>"+StringN(item.title,20)+"</td>";
				html+="<td width='25%'>"+item.links+"</td>";
				html+="<td width='15%'>"+date+"</td>";
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
					html+="<li><a href='info_EditInformationBottom.html?buttonId="+item.id+"' class='operate-icon1' title='编辑'></a></li>";
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
	
	$(document).on("click","#clearfix li",function(){
		$("#clearfix li").each(function(){
			$(this).removeClass("on");
		})
		$(this).addClass("on");
		querySupList(1);
	})
})

function querySupList(page,listview, pageset){
	listview = listview?listview:$("#system-table");
	listview.listview("loading");
	var options = {
			page_flag:page,
			page_num:rs.pageNum,
			level:2,
			parent:$("#clearfix li[class='on']").attr("value")
		};
	var datas = $.extend(true,{},options,$("form").serializeJson());
	Web.Method.ajax("information/resultTPubBottom",{
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