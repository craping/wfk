$(function(){
	
	$("#listview_refunds").listview({
		style:"table-hover",
		headerStyle:"noborder",
		module:[
	        {name:"<input type='checkbox' id='selectAll' />全选",width:"5%"},
	        {name:"序号",width:"3%"},
			{name:"退款编号",width:"7%"},
			{name:"订单号",width:"7%"},
			{name:"下单客户公司",width:"8%"},
			{name:"订单供应商",width:"7%"},
			{name:"手机号",width:"8%"},
			{name:"收货人",width:"5%"},
			{name:"订单金额",width:"7%"},
			{name:"申请时间",width:"7%"},
			{name:"受理时间",width:"7%"},
			{name:"订单状态",width:"7%"},
			{name:"应退现金",width:"6%"},
			{name:"应退积分",width:"6%"},
			{name:"操作",width:"10%"}
		],
		eachItem:function(ui, item){
			
            var handle_head = "<div class='system-table-list'><ul>";
			var details = "<li><a href='refund_details.html?ordProId="+ item.ordProId +"&orderId="+ item.orderId +"&refundId="+ item.refundId +"' target='iframe'>详情</a></li>";
			var handle_foot = "</ul></div>";
			
			var page = $("#pageset_refunds").data("lishe.pageSet").options.pageSet.page-1;
			var tr = $("<tr>" +
						"<td><input type='checkbox' name='ids' value="+ item.refundId +" onClick='selectIds(this);' /></td>" +
						"<td>"+(parseInt(item.indexKey) + page * rs.pageNum + 1)+"</td>" +
						"<td>"+ item.refundId +"</td>" +
						"<td><a href='order_details.html?orderId=" + item.orderId +"' target='iframe'>"+ item.orderId +"</a></td>" +
						"<td>"+ item.companyName +"</td>" +
						"<td>"+ item.supName +"</td>" +
						"<td>"+ item.phone +"</td>" +
						"<td>"+ item.addUser +"</td>" +
						"<td>"+ item.refundAmount +"</td>" +
						"<td>"+ new Date(item.addTime).format("yyyy/MM/dd") +"</td>" +
						"<td>"+ new Date(item.checkTime).format("yyyy/MM/dd") +"</td>" +
						"<td>"+ rs.refundStatus[item.refundStatus] +"</td>" +
						"<td>"+ item.ableCash +"</td>" +
						"<td>"+ item.ableIntegral +"</td>" +
						"<td>"+ handle_head + details + handle_foot +"</td>" +
					"</tr>");
			
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
	$("#pageset_refunds").pageset({
		itemClick:function(page){
			queryRufundsList(page);
		}
	});
	
	queryRufundsList(1);

	$("#query_submit").click(function(){
		queryRufundsList(1);
	});
});

//ѡ��
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

function queryRufundsList(page, listview, pageset){
	var options = {
		page_flag:page,
		page_num:rs.pageNum
	};
	var datas = $.extend(true,{},options,$("form").serializeJson());
	listview = listview?listview:$("#listview_refunds");
	listview.listview("loading");
	Web.Method.ajax("sysOrdRefund/getUserRefund",{
		data:datas,
		success:function(data){
			pageset = pageset?pageset:$("#pageset_refunds");
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

function batchConfirmRefund() {
	if($("input[name='refundHandler']").val()==undefined) return false;
	if($("input[name='refundHandler']").val() == 1){
		Web.Method.ajax("sysOrdRefund/batchHandler", {
			data : {
				refundHandler: $("input[name='refundHandler']").val(),
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
	}else if($("input[name='refundHandler']").val() == 0){
		location.href = Web.Recource.serverURL+"sysOrdRefund/batchHandler?refundHandler="+$("input[name='refundHandler']").val()+"&ids="+getCheckVal();
	}
}

function getCheckVal(){ //jquery获取复选框值
	var chk_value ="";
	$('input[name="ids"]:checked').each(function(){
		chk_value += $(this).val()+",";
	});
	return chk_value;
} 



