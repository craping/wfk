$(function(){
	var streamType = $("input[name='operUserType']").val();
	if(streamType == 0){	//企业操作流水
		$("#listview_stream").listview({
			style:"table-hover",
			headerStyle:"noborder",
			module:[
			    {name:"<input type='checkbox' id='selectAll' />序号",width:"5%"},
				{name:"企业名称",width:"10%"},
				{name:"操作账户",width:"15%"},
				{name:"负责人联系方式",width:"10%"},
				{name:"操作日期",width:"10%"},
				{name:"操作IP",width:"15%"},
				{name:"操作描述",width:"10%"}
			],
			eachItem:function(ui, item){
				var page = $("#system-page").data("lishe.pageSet").options.pageSet.page-1;
				var tr = $("<tr>" +
							"<td><input type='checkbox' name='ids' value="+ item.seqId +" onClick='selectIds(this);' />" +
							(parseInt(item.indexKey) + page * rs.pageNum + 1) + "</td>" +
							"<td>" + item.operUserName + "</td>" +
							"<td>" + item.relationId + "</td>" +
							"<td>" + item.operTable + "</td>" +
							"<td>" + new Date(item.operTime).format("yyyy-MM-dd HH:mm:ss") + "</td>" +
							"<td>" + item.ip + "</td>" +
							"<td>" + item.operDesc + "</td>" +
							"</tr>");
				return tr;
			}
		});
	}else if(streamType == 3){	//个人操作流水
		$("#listview_stream").listview({
			style:"table-hover",
			headerStyle:"noborder",
			module:[
			    {name:"<input type='checkbox' id='selectAll' />序号",width:"5%"},
				{name:"用户名",width:"10%"},
				{name:"注册手机",width:"15%"},
				{name:"所属企业名称",width:"10%"},
				{name:"操作日期",width:"10%"},
				{name:"操作IP",width:"15%"},
				{name:"操作描述",width:"10%"}
			],
			eachItem:function(ui, item){
				var page = $("#system-page").data("lishe.pageSet").options.pageSet.page-1;
				var tr = $("<tr>" +
							"<td><input type='checkbox' name='ids' value="+ item.seqId +" onClick='selectIds(this);' />" +
							(parseInt(item.indexKey) + page * rs.pageNum + 1) + "</td>" +
							"<td>" + item.operUserName + "</td>" +
							"<td>" + item.operTable + "</td>" +
							"<td>" + item.relationId + "</td>" +
							"<td>" + new Date(item.operTime).format("yyyy-MM-dd HH:mm:ss") + "</td>" +
							"<td>" + item.ip + "</td>" +
							"<td>" + item.operDesc + "</td>" +
							"</tr>");
				return tr;
			}
		});
	}
	
	$("#system-page").pageset({
		itemClick:function(page){
			queryStreamList(page);
		}
	});
	$("#query_submit").click(function(){
		queryStreamList(1)
	});

	$(".system-btn").click(function(){
		batchConfirmOper();
	});
	queryStreamList(1);
	
	//点击下拉框改变确定按钮样式
	$(".select").bind("click", function(){
		var setval = $(this).find("dt").children().attr("value");
		var $enabledIds = $("input[name='ids']:enabled");
		if(setval.length > 0 && $enabledIds.filter(":checked").size() > 0){
			$("#handler_submit").css("background","#aa3231").prop("disabled",false);
		}else{
			$("#handler_submit").css("background","#898989").prop("disabled",true);
		}
	});
	
	//全选
	$("#selectAll").bind("click",function() {
		var $this = $(this);
		var $enabledIds = $("input[name='ids']:enabled");
		var setval = $(".select").find("dt").children().attr("value");
		if ($this.prop("checked")) {
			$enabledIds.prop("checked", true);
			if (setval.length > 0 && $enabledIds.filter(":checked").size() > 0) {
				$("#handler_submit").css("background","#aa3231").prop("disabled",false);
			} else {
				$("#handler_submit").css("background","#898989").prop("disabled",true);
			}
		} else {
			$enabledIds.prop("checked", false);
			$("#handler_submit").css("background","#898989").prop("disabled",true);
		}
	});
	
})
	//选择
	function selectIds(target) {
		var $this = $(target);
		var setval = $(".select").find("dt").children().attr("value");
		if ( setval.length > 0 && $this.prop("checked")) {
			$("#handler_submit").css("background","#aa3231").prop("disabled",false);
		} else {
			$("#selectAll").prop("checked",false);
			if (setval.length > 0 && $("input[name='ids']:enabled:checked").size() > 0) {
				$("#handler_submit").css("background","#aa3231").prop("disabled",false);
			} else {
				$("#handler_submit").css("background","#898989").prop("disabled",true);
			}
		}
	};
	
	function queryStreamList(page, listview, pageset){
		var options = {
				page_flag:page,
				page_num:rs.pageNum
			};
		var datas = $.extend(true,{},options,$("form").serializeJson());
		listview = listview?listview:$("#listview_stream");
		listview.listview("loading");
		Web.Method.ajax("manOperRecord/getRecords",{
			data:datas,
			success:function(data){
				pageset = pageset?pageset:$("#system-page");
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
		})
	}
	
	function batchConfirmOper() {
		//不同的批量导出的用户类型
		var type = $(".select").find("dt").children().attr("value");
		if( type.length < 1 ){
			return false;
		}
		location.href = Web.Recource.serverURL+"manOperRecord/batchHandler?type="+ type +"&ids="+getCheckVal();
	}
	
	function getCheckVal(){ //jquery获取复选框值
		var chk_value ="";
		$('input[name="ids"]:checked').each(function(){
			chk_value += $(this).val()+",";
		});
		return chk_value;
	} 