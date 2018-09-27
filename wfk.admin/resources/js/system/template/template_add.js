
$(function(){
	
	$("#cancel").click(function(){
		window.location.href = "site_temp_list.html";
	});
	
	//检查文件内容格式 大小
	$('.sel_pic').checkFileTypeAndSize({
		allowedExtensions: ['jpg','png'],
		maxSize: 5120,
		widthAndHeight: 1920*1080,
		extensionerror: function(){
			alert("图片的格式只能为：jpg,png");
			return false;
		},
		sizeerror: function(){
			alert("图片大小不能超过5MB");
			return false;
		},
		success: function(){
	    }
	},$("#add_temp_form"));
	
	//确认
	$(document).on("click","#add_submit",function(){
		var editor = UE.getEditor('tempCode');
		$("[name='tempCode']").val(editor.getContent()); // 文本赋值
		var params = $("#add_temp_form").serializeJson(true);
		$("#add_temp_form").ajaxSubmit({
			iframe:true,
			dataType:"json",
			data:params,
			url:Web.Recource.serverURL +"template/addTemplate",
			success: function(data){
				if(data.result){
					alert(data.msg);
				}else{
					alert("添加成功");
					window.location.href = "site_temp_list.html";
				}
			}, 
			error: function(data){
				alert("添加失败");
				window.location.href = "site_temp_list.html";
			}
		});
	});
});

function onValue(val){
	$("#status").val(val); //赋值状态
}
