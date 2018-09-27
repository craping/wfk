$(function(){
	querytyList();
	$("#returned").click(function(){
		window.location.href="../system/man_role.html";
	})
	$("#submit").click(function(){
		sub();
	})
});

function querytyList(){
	Web.Method.ajax("manRole/findAuthority",{
		data:{
			roleId:get("rId")
		},
		success:function(data){
			var mList=data.info[0];
			var authList = data.info[1];
			var oldMenu = data.info[2];
			var str="<div class='system-area-country'></div>";
			for(var i=0;i<mList.length;i++){
				str=str+"<div class='system-area-province' >" +
							"<div class='system-province-top'>" +
								"<label class='inblock system-checkbox'>" +
									"<input type='checkbox' class='middle middle_super' onclick='selectMenu(this)' >"+mList[i].menuName+
								"</label>"+
							"</div>" +
						"<div class='system-area-city clearfix' style='display: block;'><ul class='system-admin-role clearfix'>";
				$.each(authList,function(k,au){
					if(k == mList[i].menuId){
						for(var v in au){
							var isChecked1 = $.inArray(au[v].menuId+"/"+au[v].authTrade,parseSelf(oldMenu))>=0?"checked":"";
							str=str+"<li><label>" +
							"<input type='checkbox' name='boxs' class='middle middle_kid' onclick='selectMenu(this)'"+isChecked1+" value='" + au[v].menuId + "/" + au[v].authTrade + "'/>" + au[v].authDesc +
							"</label>" +
							"</li>";
						}
					}
				})
				
				str=str+"</ul></div></div>";
			}
			$("#manMenu").html(str);
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

function selectMenu(target){
	var $this = $(target);
	var isChecked = $this.prop("checked");
	if($this.hasClass("middle_super")){
		var kids = $this.parents(".system-province-top").next().find("input[type='checkbox']").prop("checked",isChecked);
	}else if($this.hasClass("middle_kid")){
		var parent = "";
		if($this.parents("ul").find("input[type='checkbox']:checked").size()>0 && isChecked){
			$this.parents(".system-area-city").prev().find("input[type='checkbox']").prop("checked",isChecked);
		}else if($this.parents("ul").find("input[type='checkbox']:checked").size() == 0){
			$this.parents(".system-area-city").prev().find("input[type='checkbox']").prop("checked",isChecked);
		}
	}
}

function parseSelf(menus){
	var array = new Array();
	$.each(menus,function(i,j){
		array[i] = j.tradeId;
	});
	return array;
}

function get(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]);
	return null;
}

function sub(){
	$("input[name='roleId']").val(get("rId"));
	var checkBox = $("form").serialize();
	if(checkBox.indexOf("boxs=") < 0){
		$.confAlert({
			size:"sm",
			context:"请至少为角色选择一个权限",
			noButton:false
		})
		return;
	}
	Web.Method.ajax("manRole/addauthority",{
		data: $("form").serialize(),
		success:function(data){
			$.confAlert({
				size:"sm",
				context:"权限修改成功",
				noButton:false
			})
			 setTimeout('window.location.href="../system/man_role.html"',700);
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












