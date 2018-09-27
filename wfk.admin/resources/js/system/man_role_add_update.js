$(function(){
	$("input").focus(function(){
		$(this).next().hide();
	})
	
	if(null != get("rId")){
		$(".roleId").html(get("rId"));
		Web.Method.ajax("manRole/getRoleList",{
			data:{
				roleId:get("rId")
			},
			success:function(data){
				for(var item in data.info[0]){
					$(".system-form-box").each(function(){
						if(item == $(this).attr("name")){
							$(this).val(data.info[0][item]);
						}
					})
					if(item == "defRole"){
						$("input[type=radio][name=defRole][value="+data.info[0][item]+"]").attr("checked","checked");
					}
				}
				$("#hid").val(data.info[0].roleName);
			},
			fail:function(data){
				$.confAlert({
					size:"sm",
					context:"服务器异常,请稍后再试!",
					noButton:false
				})
			}
		})
	}
	
	$("#addRole").click(function(){
		if(checkAddRole()){
			Web.Method.ajax("manRole/addRole",{
				data:{
					roleName : $("#roleName").val(),
					roleDesc : $("#roleDesc").val(),
					defRole : $("input[name='defRole']:checked").val()
				},
				success : function(data){
					window.location.href="../system/man_role.html";
				},
				fail : function(data) {
					$.confAlert({
						size:"sm",
						context:"服务器异常,请稍后再试!",
						noButton:false
					})
				}
			})
		}
	})
	
	$("#updateRole").click(function(){
		if(checkAddRole()){
			Web.Method.ajax("manRole/updateRole",{
				data:{
					roleId : $(".roleId").html(),
					roleName : $("#roleName").val(),
					roleDesc : $("#roleDesc").val(),
					defRole : $("input[name='defRole']:checked").val()
				},
				success : function(data){
					window.location.href="../system/man_role.html";
				},
				fail : function(data) {
					$.confAlert({
						size:"sm",
						context:"服务器异常,请稍后再试!",
						noButton:false
					})
				}
			})
		}
	})
	
	
	$("#roleName").bind("blur",function(){
		var $this = $(this);
		var roleName = $(this).val();
		var roleNameOld = $("#hid").val();
		var reg = new RegExp(/^[a-zA-Z0-9\u4e00-\u9fa5-_]+$/);
		if(roleName == roleNameOld){
			$this.next().attr("value",true);
			return;
		}
		if(reg.test(roleName)){
			Web.Method.ajax("manRole/checkRoleName",{
				data:{
					roleName:$(this).val()
				},
				success:function(data){
					if(data.errcode == 0){
						$this.next().attr("value",true);
					}else if(data.errcode == 1){
						$("#roleName").next().attr("value",false);
						$("#roleName").next().html(data.msg);
						$("#roleName").next().show();
					}
				},
				fail:function(data){
					$.confAlert({
						size:"sm",
						context:"服务器异常,请稍后再试!",
						noButton:false
					})
				}
			});
		}else{
			$(this).next().attr("value",false);
			$(this).next().html("只能包含中文、英文、数字、下划线等字符");
			$(this).next().show();
		}
	});
	
	$("#roleDesc").bind("blur",function(){
		var roleName = $(this).val();
		var reg = new RegExp(/^[a-zA-Z0-9\u4e00-\u9fa5-_]+$/);
		if(reg.test(roleName)){
			$(this).next().attr("value",true);
			$(this).next().hide();
		}else{
			$(this).next().attr("value",false);
			$(this).next().html("只能包含中文、英文、数字、下划线等字符");
			$(this).next().show();
		}
	})
	
})

	function checkAddRole(){
		var fl = true;
		$(".system-form-box").each(function(){
			if($(this).next().attr("value") != "true"){
				fl = false;
			}
		})
		return fl;
	}
	
	function get(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) return unescape(r[2]);
		return null;
	}

