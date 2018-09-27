function onValue(val) {
	document.getElementById("status").value = val;
}

function toSub(val) {
	document.getElementById("leis").value = val;
}
function toSubad(val) {
	document.getElementById("pleis").value = val;
}

$(function() {
	querytyList();
	queryAdpositionidList();
	
	$(document).on("click","#cancel",function(){	// 取消
		window.location.href = "site_my_template_list.html";
	});
	
});

function getquerystring(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null)
		return unescape(r[2]);
	return null;
}

function queryTemplate() {
	var id = getquerystring("id");
	Web.Method.ajax("template/getTempById", {
		data : {
			id : id
		},
		success : function(data) {
			var template = data.info;
			document.getElementById("describes").value = template.describes;
			$("#fwbk").find("#content").text(template.htmlFilePath);
			document.getElementById("introduction").value = template.htmlFilePath;
			document.getElementById("status").value=template.status;
			document.getElementById("templateNavigation").value=template.templateNavigation;
			document.getElementById("templateThumbnail").value=template.templateThumbnail;
			if (template.status == '1') {
				document.getElementById("zt").innerText = "编辑中";
			} else if (template.status == '2') {
				document.getElementById("zt").innerText = "使用中";
			} else if (template.status == '3') {
				document.getElementById("zt").innerText = "已下架";
			}
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

function querytyList() {
	var id = getquerystring("id");
	Web.Method.ajax("template/getProdAdpositionids", {
		data : {
			id:id
		},
		success : function(data) {
			var list = data.info;
			var html = "<table class='system-table'><thead><th width='7%'><label><input id='controlAll' name='controlAll' type='checkbox' onclick='pselectAll()' class='middle'>全选</label></th>";
			html = html + "<th width='7%'>序号</th><th width='7%'>广告位</th><th width='7%'>商品名称</th>";
			html = html + "<th width='7%'>市场价</th><th width='15%'>商品广告位尺寸</th><th width='10%'>商品缩略图</th>";
			html = html + "<th width='7%'>状态</th><th>操作</th></thead>";
			for (var i = 0; i < list.length; i++) {
				html = html + "<tr><td><input  name='boxs' type='checkbox' value='" + list[i].id + "'></td><td>" + list[i].id + "</td>";
				html = html + "<td>" + (list[i].name=undefined || list[i].name == null?'--':list[i].name) + "</td><td>" + (list[i].productName=undefined || list[i].productName == null?'--':list[i].productName) + "</td><td>" + (list[i].marketPrice=undefined || list[i].marketPrice == null?'--':list[i].marketPrice) + "</td><td>" +( list[i].size=undefined || list[i].size == null?'--':list[i].size) + "</td>";
				html = html + "<td><img widht='50px' height='50px' src='" + list[i].productThumbnails + "' /></td>";
				if (list[i].status == "1") {
					html = html + "<td>有效</td>";
				} else if (list[i].status == "2") {
					html = html + "<td>无效</td>";
				}else{
					html = html + "<td></td>";
				}
				html = html + "<td><div class='system-table-list'><ul>";
				html = html + "<li><a href='javascript:void(0)' title='修改' class='operate-icon1' onclick=\"toupdate('"+list[i].id+"') \" ></a></li><li>" ;
				if (list[i].status == "1") {
					html = html+"<a href='javascript:void(0)' title='设为无效' class='operate-icon14' onclick='tostu(\"2\",\""+list[i].id+"\")'>";
				}
				else if (list[i].status == "2") {
					html = html + "<a href='javascript:void(0)' class='operate-icon29' title='设置为有效' onclick='tostu(\"1\",\""+list[i].id+"\")' >";
				}
				html = html + "</a></li></ul></div></td></tr>";
			} 
			html = html +"</table>"
			$("#productAdpositionidList").html(html);
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
function queryAdpositionidList() {
	var id = getquerystring("id");
	Web.Method.ajax("template/getAdpositionids", {
		data : {
			id:id
		},
		success : function(data) {
			var list = data.info;
			var html = "<table><thead><th width='7%'><label><input id='control' name='control' type='checkbox' onclick='selectAll()' class='middle'>全选</label></th>";
			html = html + "<th width='7%'>序号</th><th width='7%'>广告位名称</th>";
			html = html + "<th width='7%'>广告位尺寸</th><th width='15%'>广告位缩略图</th>";
			html = html + "<th width='7%'>状态</th><th>操作</th></thead>";
			for (var i = 0; i < list.length; i++) {
				html = html + "<tr><td><input  name='cboxs' type='checkbox' value='" + list[i].id + "'></td><td>" + list[i].id + "</td>";
				html = html + "<td>" + (list[i].name=undefined || list[i].name == null?'--':list[i].name) + "</td><td>" + (list[i].size=undefined || list[i].size == null?'--':list[i].size) + "</td>";
				html = html + "<td><img widht='50px' height='50px' src='" + list[i].adThumbnail + "' /></td>";
				if (list[i].status == "1") {
					html = html + "<td>有效</td>";
				} else if (list[i].status == "2") {
					html = html + "<td>无效</td>";
				}else{
					html = html + "<td></td>";
				}
				html = html + "<td><div class='system-table-list'><ul>";
				html = html + "<li><a href='javascript:void(0)'  title='修改' class='operate-icon1' onclick=\"toadupdate('"+list[i].id+"')\" ></a></li><li>";
				if (list[i].status == "1") {
					html = html+"<a href='javascript:void(0)' title='设为无效' class='operate-icon14' onclick='toadstu(\"2\",\""+list[i].id+"\")'>";
				} else if (list[i].status == "2") {
					html = html + "<a href='javascript:void(0)' class='operate-icon29' title='设置为有效' onclick='toadstu(\"1\",\""+list[i].id+"\")'>";
				}			
				html = html + "</a></li></ul></div></td></tr>";
			}
			html = html +"</table>"
			$("#adpositionidList").html(html);
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

function padpostitionidSub() {
	var boxs = document.getElementsByName('boxs');
	var ids = "";

	for (var i = 0; i < boxs.length; i++) {
		if (boxs[i].checked) {
			ids = ids + boxs[i].value + ',';
		}
	}
	var url = "";
	var leis = document.getElementById("leis").value;
	var status = "";
	if (leis == "1") {
		url = "template/updateStatus";
		status = "1";
	} else if (leis == "2") {
		url = "template/updateStatus";
		status = "2";
	} else if (leis == "3") {
		url = "template/delProdAdpositionid";
	}
	if (ids == "") {
		alert("请选择要操作的广告");
		return;
	}
	Web.Method.ajax(url, {
		data : {
			ids : ids,
			status : status
		},
		success : function(data) {
			location.reload();
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

function toUpdateStatus() {
	var id = getquerystring("id");
	if (id == "") {
		alert("id不能为空")
		return;
	}
	var status = "2";
	Web.Method.ajax("template/updatesTtatus", {
		data : {
			id : id,
			status : status
		},
		success : function(data) {
			alert("发布成功");
			window.location.href = "site_template_List.html";
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

function pselectAll() {
	var checklist = document.getElementsByName("boxs");
	if (document.getElementById("controlAll").checked) {
		for (var i = 0; i < checklist.length; i++) {
			checklist[i].checked = 1;
		}
	} else {
		for (var j = 0; j < checklist.length; j++) {
			checklist[j].checked = 0;
		}
	}
}
function selectAll() {
	var checklist = document.getElementsByName("cboxs");
	if (document.getElementById("control").checked) {
		for (var i = 0; i < checklist.length; i++) {
			checklist[i].checked = 1;
		}
	} else {
		for (var j = 0; j < checklist.length; j++) {
			checklist[j].checked = 0;
		}
	}
}

function adpostitionidSub() {
	var boxs = document.getElementsByName('cboxs');
	var ids = "";

	for (var i = 0; i < boxs.length; i++) {
		if (boxs[i].checked) {
			ids = ids + boxs[i].value + ',';
		}
	}
	var url = "";
	var leis = document.getElementById("pleis").value;
	var status = "";
	if (leis == "1") {
		url = "template/updateAdStatus";
		status = "1";
	} else if (leis == "2") {
		url = "template/updateAdStatus";
		status = "2";
	}
	if (ids == "") {
		alert("请选择要操作的广告");
		return;
	}
	Web.Method.ajax(url, {
		data : {
			ids : ids,
			status : status
		},
		success : function(data) {
			location.reload();
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

function tostu(status,id){
	id=id+","
	Web.Method.ajax("template/updateStatus", {
		data : {
			ids : id,
			status : status
		},
		success : function(data) {
			location.reload();
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

function toadstu(status,id){
	id=id+","
	Web.Method.ajax("template/updateAdStatus", {
		data : {
			ids : id,
			status : status
		},
		success : function(data) {
			location.reload();
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

function toadupdate(id){
	window.location.href = "site_update_adpositionid.html?id="+id;
}

function toupdate(id){
	window.location.href = "site_update_product_adpositionid.html?id="+id;
}

function UpladFile(){
	$("#supplier_form").ajaxSubmit({
		iframe:true,
		dataType:"json",
		url:Web.Recource.serverURL +"template/addimg?"+$("#supplier_form").serializeJson(true),
		success: function(data){
			document.getElementById("templateNavigation").value=data.data.info
		},
		error: function(xhr, statis, error){
			$.confAlert({
				size:"sm",
				context:"服务器异常,请稍后再试!",
				noButton:false
			})
		}
	});
}  

function UpFile(){
	$("#supplier_forms").ajaxSubmit({
		iframe:true,
		dataType:"json",
		url:Web.Recource.serverURL +"template/addimage?"+$("#supplier_forms").serializeJson(true),
		success: function(data){
			document.getElementById("templateThumbnail").value=data.data.info
		},
		error: function(xhr, statis, error){
			$.confAlert({
				size:"sm",
				context:"服务器异常,请稍后再试!",
				noButton:false
			})
		}
	});
} 
