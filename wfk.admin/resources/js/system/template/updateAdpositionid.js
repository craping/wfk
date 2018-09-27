$(function() {
	queryad();
	$("#adPic").click(function(){
		var $this = $(this);
		$this.parent().find("input[type='file']").click();
	});
	$("input[name='uploadFileInput']").checkFileTypeAndSize({
		allowedExtensions: ['jpg','png'],
		maxSize: 5120,
		widthAndHeight: 1920*1080,
		extensionerror: function(){
			alert("图片的格式只能为：jpg,png");
			return false;
		},
		sizeerror: function(){
			alert("图片大小5mb");
			return false;
		},
		success: function(target,path){
			var div = "<img src='" + path + "'>";
			$("#adPic").next().next().show();
			$("#adPic").next().next().find("img").remove();
			$("#adPic").next().next().prepend(div);
	    }
	},$("#supplier_form"));
	
});

function onValue(val){
	document.getElementById("status").value=val;
}

function toUpdate(){	
	$("#supplier_form").ajaxSubmit({
		iframe:true,
		dataType:"json",
		url:Web.Recource.serverURL +"adpositionid/update?id="+ Web.Method.GetQueryString("id") + "&" +$("#supplier_form").serializeJson(true),
		success: function(data){
			history.go(-1);
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

function queryad(){
	var id = Web.Method.GetQueryString("id");
	Web.Method.ajax("adpositionid/queryad",{
		data:{
			id:id
		},
		success:function(data){
			var adpositionid=data.info;
			document.getElementById("name").innerHTML=adpositionid.name;
			$("input[name='name']").val(adpositionid.name);
			document.getElementById("status").value=adpositionid.status;
			document.getElementById("url").value=adpositionid.url;
			
			if(adpositionid.status=='1'){
				$("#dtstatus").text("有效");
				onValue('1');
			}else{
				$("#dtstatus").text("无效");
				onValue('2');
			}
			if(adpositionid.pic != undefined){
				$("#adImg").show();
				$("#adImg").prepend("<img src='"+ Web.Recource.server+adpositionid.pic +"' />");
			}
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

function toBack(){
	history.go(-1);
}