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
	queryTemplate();
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
	document.getElementById("id").value = id;
	Web.Method.ajax("template/getTempById",{
		data : {
			tid:id
		},
		success : function(data) {
			var template = data.info;
			document.getElementById("describes").value = template.describes;
			ueditor.ready(function() {
				ueditor.setContent(template.htmlFilePath);
			});
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
	Web.Method.ajax("template/getProdAdpositionid",{
		data : {
			id:id
		},
		success : function(data) {
			var list = data.info;
			var html = "<table><thead><th width='7%'><label><input id='controlAll' name='controlAll' type='checkbox' onclick='pselectAll()' class='middle'>全选</label></th>";
			html = html
					+ "<th width='7%'>序号</th><th width='7%'>广告位</th>";
			html = html
					+ "<th width='7%'>状态</th><th>操作</th></thead>";
			for (var i = 0; i < list.length; i++) {
				html = html
						+ "<tr><td><input  name='boxs' type='checkbox' value='"
						+ list[i].id + "'></td><td>"
						+ list[i].id + "</td>";
				html = html + "<td>" + list[i].name+"</td>"
				if (list[i].status == "1") {
					html = html + "<td>有效</td>";
				} else if (list[i].status == "2") {
					html = html + "<td>无效</td>";
				}else{
					html=html+"<td></td>"
				}
				html = html
						+ "<td><div class='system-table-list'><ul>";
				if (list[i].status == "1") {
					html = html+"<a href='javascript:void(0)' onclick='tostu(\"2\",\""+list[i].id+"\")'>设置为无效";
				}
				else if (list[i].status == "2") {
					html = html + "<a href='javascript:void(0)'  onclick='tostu(\"1\",\""+list[i].id+"\")' >设置为有效";
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
	Web.Method.ajax("template/getAdpositionidss",{
		data : {
			id:id
		},
		success : function(data) {
			var list = data.info;
			var html = "<table><thead><th width='7%'><label><input id='control' name='control' type='checkbox' onclick='selectAll()' class='middle'>全选</label></th>";
			html = html
					+ "<th width='7%'>序号</th><th width='7%'>广告位名称</th>";
			html = html
					+ "<th width='7%'>状态</th><th>操作</th></thead>";
			for (var i = 0; i < list.length; i++) {
				html = html
						+ "<tr><td><input  name='cboxs' type='checkbox' value='"
						+ list[i].id + "'></td><td>"
						+ list[i].id + "</td>";
				html = html + "<td>" + list[i].name
						+ "</td>";
				if (list[i].status == "1") {
					html = html + "<td>有效</td>";
				} else if (list[i].status == "2") {
					html = html + "<td>无效</td>";
				}else{
					html=html+"<td></td>"
				}
				html = html
						+ "<td><div class='system-table-list'><ul>";
				if (list[i].status == "1") {
					html = html+"<a href='javascript:void(0)' onclick='toadstu(\"2\",\""+list[i].id+"\")'>设置为无效";
				}
				else if (list[i].status == "2") {
					html = html + "<a href='javascript:void(0)' onclick='toadstu(\"1\",\""+list[i].id+"\")'>设置为有效";
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
		url = "template/sysupdateStatus";
		status = "1";
	} else if (leis == "2") {
		url = "template/sysupdateStatus";
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

function cancel(){
	window.location.href = "site_template_List.html";
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
		url = "template/sysupdateAdStatus";
		status = "1";
	} else if (leis == "2") {
		url = "template/sysupdateAdStatus";
		status = "2";
	} else if (leis == "3") {
		url = "template/deladpositionid";
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
	Web.Method.ajax("template/sysupdateStatus", {
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
	Web.Method.ajax("template/sysupdateAdStatus", {
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


function sub() {
	var id = getquerystring("id");
	if (id == "") {
		alert("id不能为空")
		return;
	}
	var describes = document.getElementById("describes").value;
	if (describes == "") {
		alert("模板描述不能为空")
		return;
	}
	document.getElementById("tempCode").value = ueditor.getContent();
	var htmlFilePath = document.getElementById("tempCode").value;
	if (htmlFilePath == "") {
		alert("添加代码不能为空")
		return;
	}
	var status = document.getElementById("status").value;
	if (status == "") {
		alert("模板状态不能为空")
		return;
	}
	var templateNavigation=document.getElementById("templateNavigation").value
	if (templateNavigation == "") {
		alert("请添加模板导航");
		return;
	}
	var templateThumbnail=document.getElementById("templateThumbnail").value
	if (templateThumbnail == "") {
		alert("请添加模板缩略图");
		return;
	}
	
}

$(function(){
	$("#cancel").click(function(){
		window.location.href = "site_template_List.html";
	});
	
	//检查文件内容格式 大小
	$('.sel_pic').checkFileTypeAndSize({
		allowedExtensions: ['jpg','png'],
		maxSize: 200000,
		widthAndHeight: 1920*1080,
		extensionerror: function(){
			alert("图片的格式只能为：jpg,png");
			return false;
		},
		sizeerror: function(){
			alert("图片大小5MB");
			return false;
		},
		success: function(target,path){
			$(target).next().text($(target).val());
	    }
	},$("#up_temp_form"));
	
	//确认
	$(document).on("click","#up_submit",function(){
		sub();
		var editor = UE.getEditor('tempCode');
		$("[name='content']").val(editor.getContent()); // 文本赋值
		var params = $("#up_temp_form").serializeJson(true);
		$("#up_temp_form").ajaxSubmit({
			iframe:true,
			dataType:"json",
			data:params,
			url:Web.Recource.serverURL +"template/updateTemplate",
			success: function(data){
				 
			}, error: function(data){
				 
			}
		});
		
	});
	/**
	Web.Method.ajax("template/update", {
		data : {
			id : id,
			describes : describes,
			htmlFilePath : htmlFilePath,
			status : status,
			templateNavigation:templateNavigation,
			templateThumbnail:templateThumbnail
		},
		success : function(data) {
			alert("修改成功");
			window.location.href = "site_template_List.html";
		},
		fail : function(data) {
			$.confAlert({
				size : "sm",
				context : data.msg,
				noButton : false
			});
		}
	});**/
	
})


