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
	},$("#pics"));
});

function onValue(val){
	document.getElementById("status").value=val;
}

function queryad(){
	var id = getquerystring("id");
	Web.Method.ajax("supProdAd/queryproductad",{
		data:{
			id:id
		},
		success:function(data){
			var productad=data.info;
			document.getElementById("name").innerHTML=productad.name=undefined?"":productad.name;
			$("input[name='name']").val(productad.name=undefined?"":productad.name);
			document.getElementById("productName").value=productad.productname=undefined?"":productad.productname;
			document.getElementById("marketPrice").value=productad.marketprice=undefined?"":productad.marketprice;
			document.getElementById("url").value=productad.url=undefined?"":productad.url;
			document.getElementById("status").value=productad.status=undefined?"":productad.status;
			if(productad.status=='1'){
				$("#dtstatus").text("有效");
				onValue('1');
			}else{
				$("#dtstatus").text("无效");
				onValue('2');
			}
			if(productad.pic != undefined){
				$("#adImg").show();
				$("#adImg").prepend("<img src='"+ productad.pic +"' />");
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


function getquerystring(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null)
		return unescape(r[2]);
	return null;
}


function toUpdate(){	
	$("#supplier_form").ajaxSubmit({
		iframe:true,
		dataType:"json",
		url:Web.Recource.serverURL +"supProdAd/update?id="+ Web.Method.GetQueryString("id") + "&" +$("#supplier_form").serializeJson(true),
		success: function(data){
			toBack();
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

function toBack(){
	history.go(-1);
}





