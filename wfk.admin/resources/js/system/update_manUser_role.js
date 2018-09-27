$(function(){
	$("#manUserId").html(get("ln"));
	Web.Method.ajax("manRole/getAllRole",{
		data:{
			defRole:"1",	//查所有有效的角色
			userId:get("id")
		},
		success : function(data){
			var roleList = data.info[0];
			var array = parseSelf(data.info[1]);
			var str = '<ul class="system-admin-check" >';
			for(var i = 0 ; i < roleList.length ; i++){
				var ischecked = $.inArray(roleList[i].roleId,array) >= 0 ? "checked" : "";
				str += '<li><label><input type="checkbox" '+ ischecked +' onclick="checkTrade(this)" name="roleIds" value="' + roleList[i].roleId+ '">' + roleList[i].roleName + '</label></li>';
			}
			$("#roleBox").html(str);
		},
		fail : function(data) {
			$.confAlert({
				size:"sm",
				context:"服务器异常,请稍后再试!",
				noButton:false
			})
		}
	});
})

function parseSelf(list){
	var arr = new Array();
	$.each(list,function(i,j){
		arr[i] = j.toString();
	});
	return arr;
}

$(document).on("click",".return_man_list",function(){
	window.location.href="../system/man_user_list.html";
});

$(document).on("click",".update_user_role",function(){
	//检查是否有选择角色
	var checkbox = $("input[name='roleIds']:checked");
	if(checkbox.length == 0 ){
		$.confAlert({
			size:"sm",
			context:"请选择一个角色",
			noButton:false
		})
		return false;
	}
	//提交
	sub();
});

/**
 * 选择此角色时判断此角色是否有权限
 * 如果没有权限则无法选中
 */
function checkTrade(target){
	var $this = $(target);
	Web.Method.ajax("manRole/checkRoleMenu",{
		data:{
			roleId:$this.val()
		},
		fail:function(data){
			$.confAlert({
				size:"sm",
				context:"此角色没有权限,无法设置",
				noButton:false
			})
			$this.prop("checked",false);
		}
	})
}

function get(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]);
	return null;
}	

function sub(){
	$("input[name='userId']").val(get("id"));
	Web.Method.ajax("userRole/addUserRole",{
		data:$("form").serialize(),
		success : function(){
			$.confAlert({
				size:"sm",
				context:"权限设置成功",
				noButton:false
			})
			 setTimeout('window.location.href="../system/man_user_list.html"',700);
		},
		fail : function(){
			$.confAlert({
				size:"sm",
				context:"服务器异常,请稍后再试!",
				noButton:false
			})
		}
	});
};