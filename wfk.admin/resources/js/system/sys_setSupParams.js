$(function(){
	var validator=$("#supplier_form").validate();	
	var supId=get("supId");
	Web.Method.ajax("sysSupplier/getSupConf", {
		data : {
			supId : supId,
		},
		success : function(data) {
			$("[name=supId]").val(supId);
			for(var item in data.info){
				var sel=item+data.info[item];
				if(selectJson[sel]!=undefined){
					$("#"+item+"").html('');
					$("#"+item+"").append(selectJson[sel]);
				}
			}
			$(".sup_details").each(function(){
					for(var item in data.info){
						if(item==$(this).attr("name")){
							$(this).val(data.info[item]);
						}
					}
			});
		},
		fail : function(data) {
		}
	});
	$("#sup_conf").click(function(){
		if(!validator.form()){
			$.confAlert({
				size:"sm",
				context:'输入内容有误,请返回检查',
				noButton:false
			})
			return false;
		}
		$(".sup_selects").each(function(){
			var selval=$(this).children().attr("value");
			var selinput=$("[name='"+$(this).attr('id')+"']");
				selinput.val(selval);
		})
		 var data=$("#supplier_form").serializeJson(true);
		 Web.Method.ajax("sysSupplier/setSupConf", {
				data : data,
				success : function(data) {
					window.location.href="../system/sup_list.html";
				},
				fail : function(data) {
					$.confAlert({
						size:"sm",
						context:data.msg,
						noButton:false
					})
				}
			});
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



//下拉框默认选中
var selectJson={ordArbitration0:'<a href="javascript:void(0);" value="0">同意</a>',
		ordArbitration1:'<a href="javascript:void(0);" value="1">拒绝</a>',
		setPeriod0:'<a href="javascript:void(0);" value="0">日结</a>',
		setPeriod1:'<a href="javascript:void(0);" value="1">月结</a>',
		supLevel0:'<a href="javascript:void(0);" value="0">品牌</a>',
		supLevel1:'<a href="javascript:void(0);" value="1">非品牌</a>',
		supType0:'<a href="javascript:void(0);" value="0">站点</a>',
		supType1:'<a href="javascript:void(0);" value="1">非站点</a>',
		supBuyRole0:'<a href="javascript:void(0);" value="0">采购</a>',
		supBuyRole1:'<a href="javascript:void(0);" value="1">非采购</a>',
		supRole0:'<a href="javascript:void(0);" value="0">推送</a>',
		supRole1:'<a href="javascript:void(0);" value="1">非推送</a>',
};
(function ($) {
	$.fn.serializeJson=function(includeEmpty){  
	    var json={};
	    $(this.serializeArray()).each(function(){
	    	if(includeEmpty || (this.value && this.value != ""))
	    		json[this.name]=this.value;
	    });
	    return json;  
	};
})(jQuery);