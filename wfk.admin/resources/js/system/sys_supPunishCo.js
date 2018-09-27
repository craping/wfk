$(function() {
	var supId=get("supId");
	Web.Method.ajax("sysSupplier/getSupConf", {
		data : {
			supId : supId,
		},
		success : function(data) {
			$(".sup_details").each(function() {
				for ( var item in data.info) {
					if (item == $(this).attr("name")) {
						$(this).val(data.info[item]);
					}
				}
			})
		},
		fail : function(data) {
			$.confAlert({
				size : "sm",
				context : data.msg,
				noButton : false
			})
		}
	});
	
	$("#return_suplist").click(function(){
		window.location.href="../system/sup_list.html";
	});
});

function get(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]);
	return null;
}