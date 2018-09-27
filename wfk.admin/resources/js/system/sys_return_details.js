$(function(){
	queryOrder();
	queryOrderPro();
	queryRuturnByReturnsId();
	
	$("#backButton").click(function() {
		// var listQuery = getCookie("listQuery");
		// location.href = "list.jhtml" + (listQuery != null ? listQuery : "");
		location.href = "../system/return_list.html";
	});
	
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
	
});

function queryOrderLogsList() {
	var listview = $("#listview_order_logs");
	listview.listview("loading");
	Web.Method.ajax("sysOrdLog/getOrdLogList", {
		data : {
			operation_id : rs.returnsId,
			type: "02"
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

function queryOrder(){
	Web.Method.ajax("sysOrder/getOrderById",{
		data:{
			orderId:rs.orderId
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

function queryOrderPro(){
	Web.Method.ajax("sysOrdProduct/getOrderProductById",{
		data:{
			orderProductId:rs.ordProId
		},
		success:function(data){
			$.each(data.info,function(i,j){
				if(i.indexOf("status")>=0 || i.indexOf("Label")>=0) {
					j=eval("rs."+i+"["+j+"]");
				}else if(i.indexOf("Time")>=0) {
					j=new Date(j).format("yyyy/MM/dd");
				}
				if(i == "orderId") {
					$("<a href='order_details.html?orderId="+ j +"'>" + j + "</a>").appendTo($("#"+i+"Product"));
				}else{
					 $("<span>" + j + "</span>").appendTo($("#"+i+"Product"));
				}
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

function queryNewOrder(id){
	Web.Method.ajax("sysOrder/getOrderById",{
		data:{
			orderId:id
		},
		success:function(data){
			$.each(data.info,function(i,j){
				if(i.indexOf("status")>=0 || i.indexOf("logisticsType")>=0) {
					j=eval("rs."+i+"["+j+"]");
				}else if(i.indexOf("Time")>=0) {
					j=new Date(j).format("yyyy/MM/dd");
				}
				$("<span>" + j + "</span>").appendTo($("#"+i+"NewOrd"));
				
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

function queryRuturnByReturnsId(){
	Web.Method.ajax("sysOrdReturn/getReturnById",{
		data:{
			returnsId: rs.returnsId
		},
		success:function(data){
			$.each(data.info,function(i,j){
				if(i=='newOrderId' && j!="") queryNewOrder(j);
				if(i.indexOf("status")>=0) {
					j=eval("rs."+i+"["+j+"]");
				}else if(i.indexOf("Time")>=0) {
					j=new Date(j).format("yyyy/MM/dd");
				}
				if(i == "newOrderId") {
					$("<a href='order_details.html?orderId="+ j +"'>" + j + "</a>").appendTo($("#"+i+"Return"));
				}else{
					 $("<span>" + j + "</span>").appendTo($("#"+i+"Return"));
				}
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

