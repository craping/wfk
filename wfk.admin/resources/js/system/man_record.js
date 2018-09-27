$(function(){
	$("#listview_manRecord").listview({
		style:"table-hover",
		headerStyle:"noborder",
		module:[
	        {name:"序号",width:"6%"},
	        {name:"操作账户",width:"16%"},
			{name:"操作时间",width:"18%"},
			{name:"操作记录",width:"25%"},
			{name:"IP地址",width:"25%"},
			{name:"操作",width:"20%"}
		],
		eachItem:function(ui, item){
			for(var i in item){
				if(item[i]==null){
					item[i]="";
				}
			}
			var capacitys ='<button type="button" style="color:red" class="update_manUser" name='+item.seqId +'>查看详情</button> '
            +'</td>';
			//var page = $("#pageset-manRecord").data("lishe.pageSet").options.pageSet.page-1;
			//var date = new Date();
			//date.setTime(item.regTime);
			var tr = $("<tr>" +
					    "<td width='4%'>"+(parseInt(item.indexKey) + 1 * rs.pageNum + 1)+"</td>" +
						"<td width='8%'>"+ item.operUserName +"</td>" +
						"<td width='6%'>"+ item.operTime +"</td>" +
						"<td width='10%'>"+ item.operTime +"</td>" +
						"<td width='10%'>"+ item.operDesc +"</td>" +
						"<td width='10%'>"+ capacitys +"</td>" +
					"</tr>");
			return tr;
		}
		
	});
	$("#pageset_manRecord").pageset({
		itemClick:function(page){
			queryManRecordList(page);
		}
	});
	
	queryManRecordList(1);
	$(document).on("click","#search_button",function(){
		queryManRecordList(1);
	});
	
});


function queryManRecordList(page, listview, pageset){
	listview = listview?listview:$("#listview_manRecord");
	listview.listview("loading");
	Web.Method.ajax("manoperrecord/list",{
		data:{
			page_flag:page,
			page_num:rs.pageNum,
			contName:contName,
			status:status,
			firstTime:firstTime,
			finallyTime:finallyTime
		},
		success:function(data){
			pageset = pageset?pageset:$("#pageset_manRecord");
			pageset.pageset("setData", {
				totalpage:data.totalpage,
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

	$(document).on("click",".resetPwd",function(){
		var id=$(this).attr("name");
		$("#sup_id").val(id);
		$("#system_right").load('man_reset_pwd.html');
	});
	$(document).on("click",".man_auth",function(){
		var id=$(this).attr("name");
		$("#sup_id").val(id);
		$("#system_right").load('man_auth.html');
	});
	$(document).on("click",".update_manUser",function(){
		var id=$(this).attr("name");
		$("#sup_id").val(id);
		$("#system_right").load('update_manUser.html');
	});
