$(function(){
	
	$("#listview_returns").listview({
		style:"table-hover",
		headerStyle:"noborder",
		module:[
	        {name:"<input type='checkbox' id='selectAll' />全选",width:"5%"},
	        {name:"序号",width:"5%"},
			{name:"退/换货编号",width:"8%"},
			{name:"关联订单号",width:"8%"},
			{name:"下单客户公司",width:"8%"},
			{name:"订单供应商",width:"8%"},
			{name:"手机号",width:"8%"},
			{name:"退/换货类型",width:"8%"},
			{name:"订单金额",width:"7%"},
			{name:"申请时间",width:"7%"},
			{name:"受理时间",width:"7%"},
			{name:"退/换货状态",width:"8%"},
			{name:"操作",width:"13%"}
		],
		eachItem:function(ui, item){
			var detail_link = item.type==0?"return_retreat_details.html?":"return_change_details.html?";
			var linkParams = "ordProId="+ item.ordProId +"&orderId="+ item.orderId +"&returnsId="+ item.returnsId;
            var handle_head = "<div class='system-table-list'><ul>";
			var details = "<li><a href='"+ detail_link + linkParams +"' target='iframe'>详情</a></li>";
			var handle_foot = "</ul></div>";
			
			var page = $("#pageset_returns").data("lishe.pageSet").options.pageSet.page-1;
			var tr = $("<tr>" +
						"<td><input type='checkbox' name='ids' value="+ item.returnsId +" onClick='selectIds(this);' /></td>" +
						"<td>"+(parseInt(item.indexKey) + page * rs.pageNum + 1)+"</td>" +
						"<td>"+ item.returnsId +"</td>" +
						"<td><a href='order_details.html?orderId=" + item.orderId +"' target='iframe'>"+ item.orderId +"</a></td>" +
						"<td>"+ item.companyName +"</td>" +
						"<td>"+ item.supName +"</td>" +
						"<td>"+ item.phone +"</td>" +
						"<td>"+ rs.type[item.type] +"</td>" +
						"<td>"+ item.realPrice +"</td>" +
						"<td>"+ new Date(item.addTime).format("yyyy/MM/dd") +"</td>" +
						"<td>"+ new Date(item.acceptTime).format("yyyy/MM/dd") +"</td>" +
						"<td>"+ rs.status[item.status] +"</td>" +
						"<td>"+ handle_head + details + handle_foot +"</td>" +
					"</tr>");
			
			//全选
			$("#selectAll").bind("click",function() {
				var $this = $(this);
				var $enabledIds = $("input[name='ids']:enabled");
				if ($this.prop("checked")) {
					$enabledIds.prop("checked", true);
					if ($enabledIds.filter(":checked").size() > 0) {
						$("#handler_submit").css("background","#aa3231").prop("disabled",false);
//						$contentRow.addClass("selected");
					} else {
						$("#handler_submit").css("background","#898989").prop("disabled",true);
					}
				} else {
					$enabledIds.prop("checked", false);
					$("#handler_submit").css("background","#898989").prop("disabled",true);
//					$contentRow.removeClass("selected");
				}
			});
	
			return tr;
		}
		
	});
	$("#pageset_returns").pageset({
		itemClick:function(page){
			queryRuturnsList(page);
		}
	});
	
	queryRuturnsList(1);
	
	$("#query_submit").click(function(){
		queryRuturnsList(1);
	});
});

//选择
function selectIds(target) {
	var $this = $(target);
	if ($this.prop("checked")) {
		$("#handler_submit").css("background","#aa3231").prop("disabled",false);
//		$this.closest("tr").addClass("selected");
	} else {
//		$this.closest("tr").removeClass("selected");
		$("#selectAll").prop("checked",false);
		if ($("input[name='ids']:enabled:checked").size() > 0) {
			$("#handler_submit").css("background","#aa3231").prop("disabled",false);
		} else {
			$("#handler_submit").css("background","#898989").prop("disabled",true);
		}
	}
};

function queryRuturnsList(page, listview, pageset){
	var options = {
		page_flag:page,
		page_num:rs.pageNum
	};
	var datas = $.extend(true,{},options,$("form").serializeJson());
	listview = listview?listview:$("#listview_returns");
	listview.listview("loading");
	Web.Method.ajax("sysOrdReturn/getUserReturn",{
		data:datas,
		success:function(data){
			pageset = pageset?pageset:$("#pageset_returns");
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

function batchConfirmReturn() {
	if($("input[name='returnHandler']").val()==undefined) return false;
	if($("input[name='returnHandler']").val() == 1){
		Web.Method.ajax("sysOrdReturn/batchHandler", {
			data : {
				returnHandler: $("input[name='returnHandler']").val(),
				ids: getCheckVal()
			},
			success : function(data) {
				$.confAlert({
					size : "sm",
					context : data.msg,
					noButton : false
				});
			},
			fail : function(data) {
				$.confAlert({
					size : "sm",
					context : data.msg,
					noButton : false
				});
			}
		});
	}else if($("input[name='returnHandler']").val() == 0){
		location.href = Web.Recource.serverURL+"sysOrdReturn/batchHandler?returnHandler="+$("input[name='returnHandler']").val()+"&ids="+getCheckVal();
	}
}

function getCheckVal(){ //jquery获取复选框值
	var chk_value ="";
	$('input[name="ids"]:checked').each(function(){
		chk_value += $(this).val()+",";
	});
	return chk_value;
} 



