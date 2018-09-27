$(function() {
	queryOrder(rs.orderId);

	$("#listview_order_products").listview(
			{
				style : "table-hover",
				headerStyle : "noborder",
				module : [ {
					name : "商品名称",
					width : "10%"
				}, {
					name : "商品编号",
					width : "10%"
				}, {
					name : "商品属性",
					width : "15%"
				}, {
					name : "单价",
					width : "7%"
				}, {
					name : "商品数量",
					width : "7%"
				}, {
					name : "快递费用",
					width : "7%"
				}, {
					name : "订单总额",
					width : "7%"
				}, {
					name : "支付现金",
					width : "7%"
				}, {
					name : "支付积分",
					width : "7%"
				}, {
					name : "退货标识",
					width : "7%"
				}, {
					name : "退换货订单号",
					width : "16%"
				}, ],
				eachItem : function(ui, item) {
					var tr = $("<tr>" + "<td>" + item.proName + "</td>"
							+ "<td>" + item.proCode + "</td>" + "<td>"
							+ item.proAtt + "</td>" + "<td>" + item.price
							+ "</td>" + "<td>" + item.num + "</td>" + "<td>"
							+ item.logisticsAmount + "</td>" + "<td>"
							+ item.realPrice + "</td>" + "<td>"
							+ item.realPrice + "</td>" + "<td>"
							+ item.realPrice + "</td>" + "<td>"
							+ rs.refundFlag[item.refundFlag] + "</td>" + "<td>"
							+ item.ordProId + "</td>" + "</tr>");

					return tr;
				}

			});
	
	queryOrderProsList(rs.orderId);
	
	$("#listview_order_logs").listview(
			{
				style : "table-hover",
				headerStyle : "noborder",
				module : [ {
					name : "管理员账号",
					width : ""
				}, {
					name : "操作日期",
					width : ""
				}, {
					name : "操作内容",
					width : ""
				}, {
					name : "登录IP",
					width : ""
				}, {
					name : "备注",
					width : ""
				} ],
				eachItem : function(ui, item) {
					var tr = $("<tr>" + "<td>" + item.userName + "</td>"
							+ "<td>" + new Date(item.time).format("yyyy/MM/dd") + "</td>" + "<td>"
							+ item.action + "</td>" + "<td>" + item.ip
							+ "</td>" + "<td>" + item.remark + "</td>"
							+ "</tr>");

					return tr;
				}

			});

	queryOrderLogsList();

	$("#backButton").click(function() {
		// var listQuery = getCookie("listQuery");
		// location.href = "list.jhtml" + (listQuery != null ? listQuery : "");
		location.href = "../supplier/order_list.html";
	});

});


function queryOrder(id) {
	Web.Method.ajax("supOrder/getOrderById", {
		data : {
			orderId : id
		},
		success : function(data) {
			$.each(data.info, function(i, j) {
				Web.Method.setValue(i, j);
			});

		},
		fail : function(data) {
			$.confAlert({
				size : "sm",
				context : data.msg,
				noButton : false
			})
		}
	});
}

function queryOrderProsList(id) {
	var listview = $("#listview_order_products");
	listview.listview("loading");
	Web.Method.ajax("supOrdProduct/getOrdProListByOrdId", {
		data : {
			orderId : id
		},
		success : function(data) {
			listview.listview("setData", data.info);
		},
		fail : function(data) {
			$.confAlert({
				size : "sm",
				context : data.msg,
				noButton : false
			})
		}
	});
}

function queryOrderLogsList() {
	var listview = $("#listview_order_logs");
	listview.listview("loading");
	Web.Method.ajax("supOrdLog/getOrdLogList", {
		data : {
			operation_id : rs.orderId,
			type: "01"
		},
		success : function(data) {
			listview.listview("setData", data.info);
		},
		fail : function(data) {
			$.confAlert({
				size : "sm",
				context : data.msg,
				noButton : false
			})
		}
	});
}

function updateOrder() {
	var options = {
		orderId : rs.orderId
	};
	var datas = $.extend(true, {}, options, $("form").serializeJson());
	Web.Method.ajax("supOrder/updateOrderById", {
		data : datas,
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
}

function confirmOrder() {
	Web.Method.ajax("supOrder/confirmOrder", {
		data : {
			orderId : rs.orderId
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
}


function orderDeliver() {
	var options = {
		orderId : rs.orderId
	};
	var datas = $.extend(true, {}, options, $("form").serializeJson());
	Web.Method.ajax("supOrder/orderDeliver", {
		data : datas,
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
}
