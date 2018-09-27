$(function(){
	queryOrder(rs.orderId);
	
	$("#listview_order_products").listview({
		style:"table-hover",
		headerStyle:"noborder",
		module:[
	        {name:"商品名称",width:"10%"},
			{name:"商品编号",width:"10%"},
			{name:"商品属性",width:"15%"},
			{name:"单价",width:"7%"},	
			{name:"商品数量",width:"7%"},
			{name:"快递费用",width:"7%"},
			{name:"订单总额",width:"7%"},
			{name:"支付现金",width:"7%"},
			{name:"支付积分",width:"7%"},
			{name:"退货标识",width:"7%"},
			{name:"退换货订单号",width:"16%"},
		],
		eachItem:function(ui, item){
			var tr = $("<tr>" +
						"<td>"+ item.proName +"</td>" +
						"<td>"+ item.proCode +"</td>" +
						"<td>"+ item.proAtt +"</td>" +
						"<td>"+ item.price +"</td>" +
						"<td>"+ item.num +"</td>" +
						"<td>"+ item.logisticsAmount +"</td>" +
						"<td>"+ item.realPrice +"</td>" +
						"<td>"+ item.realPrice +"</td>" +
						"<td>"+ item.realPrice +"</td>" +
						"<td>"+ rs.refundFlag[item.refundFlag] +"</td>" +
						"<td>"+ item.ordProId +"</td>" +
					"</tr>");
			
			return tr;
		}
		
	});
	
	queryOrderProsList(rs.orderId);
	
	
	$("#listview_refund_products").listview({
		style:"table-hover",
		headerStyle:"noborder",
		module:[
	        {name:"商品名称",width:"10%"},
			{name:"商品编号",width:"12%"},
			{name:"商品属性",width:"15%"},
			{name:"退货数量",width:"7%"},	
			{name:"单价",width:"7%"},
			{name:"数量",width:"7%"},
			{name:"邮费",width:"7%"},
			{name:"小计",width:"7%"},
			{name:"支付现金",width:"7%"},
			{name:"支付积分",width:"7%"},
			{name:"应退现金",width:"7%"},
			{name:"应退积分",width:"7%"},
		],
		eachItem:function(ui, item){
			var tr = $("<tr>" +
						"<td>"+ item.proName +"</td>" +
						"<td>"+ item.proCode +"</td>" +
						"<td>"+ item.proCode +"</td>" +
						"<td>"+ item.num +"</td>" +
						"<td>"+ item.realPrice +"</td>" +
						"<td>"+ item.logisticsAmount +"</td>" +
						"<td>"+ item.refundAmount +"</td>" +
						"<td>"+ item.refundAmount +"</td>" +
						"<td>"+ item.refundAmount +"</td>" +
						"<td>"+ item.refundAmount +"</td>" +
						"<td>"+ item.refundAmount +"</td>" +
					"</tr>");
			
			return tr;
		}
		
	});
	
});

function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]);
	return null;
}

function queryOrder(id){
	Web.Method.ajax("supOrder/getOrderById",{
		data:{
			orderId:id
		},
		success:function(data){
			$.each(data.info,function(i,j){
				Web.Method.setValue(i,j);
			});
			
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

function queryOrderProsList(id){
	var listview = $("#listview_order_products");
	listview.listview("loading");
	Web.Method.ajax("supOrdProduct/getOrdProListByOrdId",{
		data:{
			orderId:id
		},
		success:function(data){
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

function queryRefundPros(id){
	var listview = $("#listview_refund_products");
	listview.listview("loading");
	Web.Method.ajax("supOrdProduct/getOrdProListByOrdId",{
		data:{
			orderId:id
		},
		success:function(data){
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

