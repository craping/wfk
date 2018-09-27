$(function(){
	
	queryRootAreaList();
	 $("#area_submit").bind("click",function(){
		 var i=0;
		 var areas="";
		 $("input").each(function() {
			 if($(this).prop("checked")){
				 areas+=$(this).val();
			 }
		 });
	 })

});

function queryRootAreaList() {
	Web.Method.ajax("pubArea/getRootPubArea", {
		data : {
//			pId : pid,
		},
		success : function(data) {
			var html = "";
			$.each(data.info,function(i,j){
				html += "<div class='system-area-province'>" +
							"<div class='system-province-top'>" +
								"<label class='inblock system-checkbox' onclick='queryAreaList(this)'><input name='provinceArea' value='"+ j.areaNo +"' type='checkbox' class='middle'>" + j.areaName + "</label>" +
							"</div>" +
						"</div>"
			});
			$("#system_area").append(html);
			
		},
		fail : function(data) {
			$.confAlert({
				size : "sm",
				context : data.msg,
				noButton : false
			})
		}
	});
	
	$("#all_select").click(function(){
		$("input[name='provinceArea']").click();
	});
}

function queryAreaList(target) {
	var $province = $(target).parent().parent();
	var id = $(target).find("input").val();
	if(!$(target).find("input").prop("checked")) {
		$(target).parent().next().slideUp();
		return false;
	}
	if($province.children().size() > 1) {
		$(target).parent().next().slideDown();
		return false;
	}
	Web.Method.ajax("pubArea/getPubAreaByPid", {
		data : {
			pId : id
		},
		success : function(data) {
			var html = "<div class='system-area-city clearfix'><ul>";
			$.each(data.info,function(i,j){
				html += "<li>" +
							"<label><input name='cityArea' value='" + j.areaNo + "' type='checkbox' class='middle'>" + j.areaName + "</label>" +
						"</li>"
							
			});
			html += "</ul></div>"
			$province.append(html);
			$(target).parent().next().slideDown();
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