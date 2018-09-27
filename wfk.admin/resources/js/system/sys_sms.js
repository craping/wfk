$(function(){
	$("#listview_sysSms").listview({
		style:"table-hover",
		headerStyle:"noborder",
		module:[
	        {name:"序号",width:"10%"},
	        {name:"发信内容",width:"20%"},
	        {name:"发送日期",width:"20%"},
	        {name:"发送人数",width:"15%"},
	        {name:"发送者",width:"20%"},
			{name:"发送对象"}
		],
		eachItem:function(ui, item){
			for(var i in item){
				if(item[i]==null){
					item[i]="";
				}
			}
			var date='';
			var dateP='--';
			if(item.sendTime!=""){
				date= new Date();
				date.setTime(item.sendTime);
				dateP=date.format("yyyy/MM/dd");
			}
			var sendType='';
			if(item.sendType=='1'){
				sendType='全网';
			}else if(item.sendType=='2'){
				sendType='企业会员';
			}else if(item.sendType=='3'){
				sendType='非企业会员';
			}
			var page = $("#pageset_sysSms").data("lishe.pageSet").options.pageSet.page-1;
			var tr = $("<tr>" +
					    "<td width='10%'>"+(parseInt(item.indexKey) + page * rs.pageNum + 1)+"</td>" +
						"<td width='20%'>"+ item.content +"</td>" +
						"<td width='20%'>"+ dateP +"</td>" +
						"<td width='15%'>"+ item.sendNum +"</td>" +
						"<td width='20%'>"+ item.sender +"</td>" +
						"<td>"+ sendType+"</td>" +
					"</tr>");
			return tr;
		}
		
	});
	$("#pageset_sysSms").pageset({
		itemClick:function(page){
			queryManUserList(page);
		}
	});
	
	queryManUserList(1);
	$(document).on("click","#search_button",function(){
		queryManUserList(1);
	});
	$(document).keyup(function(event){
		if(event.keyCode == 13){
			$("#search_button").trigger("click");
		}
	});
});


function queryManUserList(page, listview, pageset){
	var content=$("#content").val()==""?undefined:$("#content").val();
	var sendType=$("#sendType").children().attr("value")==""?undefined:$("#sendType").children().attr("value");
	var firstTime=$("#firstTime").val()==""?undefined:$("#firstTime").val();
	var finallyTime=$("#finallyTime").val()==""?undefined:$("#finallyTime").val();
	listview = listview?listview:$("#listview_sysSms");
	listview.listview("loading");
	Web.Method.ajax("sysSms/getSmsList",{
		data:{
			page_flag:page,
			page_num:rs.pageNum,
			content:content,
			sendType:sendType,
			firstTime:firstTime,
			finallyTime:finallyTime
		},
		success:function(data){
			pageset = pageset?pageset:$("#pageset_sysSms");
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

	$(document).on("click",".sys_smsDetals",function(){
		window.location.href="../system/sys_smsDetails.html?id="+$(this).attr("name");
	});
	$(document).on("click",".sys_smsDel",function(){
		var $this=$(this);
		var athis=$(this).parents("tr");
		var id=$(this).attr("name");
		Web.Method.ajax("sysSms/updateSms", {
			data : {
				 id :id,
				 status:0
			},
			success : function(data) {
				athis.remove();
			},
			fail : function(data) {
				$.confAlert({
					size:"sm",
					context:"服务器异常,请稍后再试!",
					noButton:false
				})
			}
		});	
	});
	
