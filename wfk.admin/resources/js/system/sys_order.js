$(function(){
	$(document).keyup(function(event){
		if(event.keyCode == 13){
			$("#query_submit").trigger("click");
		}
	});
	$("#listview_orders").listview({
		style:"table-hover",
		headerStyle:"noborder",
		module:[
	        {name:"<input type='checkbox' id='selectAll' />全选",width:"5%"},
	        {name:"序号",width:"5%"},
			{name:"订单号",width:"8%"},
			{name:"下单客户公司",width:"8%"},
			{name:"订单供应商",width:"8%"},
			{name:"手机号",width:"8%"},
			{name:"收货人",width:"7%"},
			{name:"订单总额（元）",width:"7%"},
			{name:"商品数量",width:"7%"},
			{name:"下单时间",width:"7%"},
			{name:"受理时间",width:"7%"},
			{name:"订单类型",width:"8%"},
			{name:"订单状态",width:"8%"},
			{name:"操作",width:"7%"}
		],
		eachItem:function(ui, item){
			
            var handle_head = "<div class='system-table-list'><ul>";
			var details = "<li><a href='order_details.html?orderId="+ item.orderId +"' target='iframe'>详情</a></li>";
			var handle_foot = "</ul></div>";
			
			var page = $("#pageset_orders").data("lishe.pageSet").options.pageSet.page-1;
			var tr = $("<tr>" +
						"<td><input type='checkbox' name='ids' value="+ item.orderId +" onClick='selectIds(this);' /></td>" +
						"<td>"+(parseInt(item.indexKey) + page * rs.pageNum + 1)+"</td>" +
						"<td>"+ item.orderId +"</td>" +
						"<td>"+ item.companyName +"</td>" +
						"<td>"+ item.supName +"</td>" +
						"<td>"+ item.userMobile +"</td>" +
						"<td>"+ item.consigneeName +"</td>" +
						"<td>"+ item.realAmount +"</td>" +
						"<td>"+ item.num +"</td>" +
						"<td>"+ new Date(item.orderTime).format("yyyy/MM/dd") +"</td>" +
						"<td>"+ new Date(item.acceptTime).format("yyyy/MM/dd") +"</td>" +
						"<td>"+ rs.orderType[item.orderType] +"</td>" +
						"<td>"+ rs.orderStatus[item.orderStatus] +"</td>" +
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
	$("#pageset_orders").pageset({
		itemClick:function(page){
			queryOrdersList(page);
		}
	});
	
	queryOrdersList(1);
	
	$("#query_submit").click(function(){
		queryOrdersList(1)
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


function queryOrdersList(page, listview, pageset){
	var options = {
		page_flag:page,
		page_num:rs.pageNum
	};
	var datas = $.extend(true,{},options,$("form").serializeJson());
	listview = listview?listview:$("#listview_orders");
	listview.listview("loading");
	Web.Method.ajax("sysOrder/getOrderList",{
		data:datas,
		success:function(data){
			pageset = pageset?pageset:$("#pageset_orders");
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

function batchConfirmOrder() {
	if($("input[name='orderHandler']").val()==undefined) return false;
	if($("input[name='orderHandler']").val() == 1){
		Web.Method.ajax("supOrder/batchHandler", {
			data : {
				orderHandler: $("input[name='orderHandler']").val(),
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
	}else if($("input[name='orderHandler']").val() == 0){
		location.href = Web.Recource.serverURL+"sysOrder/batchHandler?orderHandler="+$("input[name='orderHandler']").val()+"&ids="+getCheckVal();
	}
}


function getCheckVal(){ //jquery获取复选框值
	var chk_value ="";
	$('input[name="ids"]:checked').each(function(){
		chk_value += $(this).val()+",";
	});
	return chk_value;
} 



