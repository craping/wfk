$(function(){
	
	var pid = Web.Method.GetQueryString("pid");
	var name = Web.Method.GetQueryString("name");
	$("#positionName").text(name);
	$("input[name='positionName']").val(name);
	
	$("#backButton").click(function() {
		location.href = "../system/ad_position_list.html";
	});
	$("#adPics").click(function(){
		var $this = $(this);
		$this.parent().find("input[type='file']").click();
	});
	$("#replace").add("#replace").click(function(){
		var $this = $(this);
		$this.parent().parent().prev().click();
	});
	$("input[name='adPic']").checkFileTypeAndSize({
		allowedExtensions: ['jpg','png'],
		maxSize: 2048,
		widthAndHeight: 1920*1080,
		extensionerror: function(){
			//图片的格式只能为：jpg,png
			alert("图片的格式只能为：jpg,png");
		},
		sizeerror: function(){
			//图片大小不能超过20kb
			alert("图片大小不能超过20kb");
		},
		success: function(target,path){
			$("#adImg").show();
			var div = "<img src='" + path + "'>"
			$("#adImg").find("img").remove();
			$("#adImg").prepend(div);
			$("#adPic").valid();
	    }
	},$("#pics"));
	
	$("#del").click(function(){
		$("#adPic").removeClass("ignore").val("");
		$("#adPics").next().next().find("img").remove();
		$("#adImg").hide();
	});
	$("form").validate();
});
function saveAd(){
	if(!$("form").valid()) return false;
	$("form").ajaxSubmit({
		iframe:true,
		dataType:"json",
		data: {},
		url:Web.Recource.serverURL +"/sysShpAd/addShpAd?pid="+ Web.Method.GetQueryString("pid") + "&" + $("form").serializeJson(),
		success: function(data){
			if(data.errcode =="0"){
				$("#backButton").click();
			}
		}, error: function(data){
			$.confAlert({
				size:"sm",
				context:"更新失败",
				noButton:false
			})
		}
	});
}






