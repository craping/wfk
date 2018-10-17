$(function(){
	
	//添加产品规格说明书
	$("#specification_div").checkFileTypeAndSize({
		allowedExtensions: ['pdf','doc'],
		maxSize: 51200,
		widthAndHeight: 1920*1080,
		extensionerror: function(val,target){
			alert("说明书格式为：pdf,doc");
			return false;
		},
		sizeerror: function(val,target){
			alert("图片大小不能超过50MB");
			return false;
		},
		success: function(parent,path,target){
	    }
	},$("#specification_div"));

	//添加商品主图
	$("#mainPics").checkFileTypeAndSize({
		allowedExtensions: ['jpg','png'],
		maxSize: 2048,
		widthAndHeight: 1920*1080,
		extensionerror: function(val,target){
			var li = target.prev();
			li.html("").html(li.hasClass("main-ico")?"<i class='addPic-i'>产品主图</i>":"");
			target.after(target.clone().removeClass("ignore").val(""));
			target.remove(); 
			alert("图片的格式只能为：jpg,png");
			return false;
		},
		sizeerror: function(val,target){
			var li = target.prev();
			li.html("").html(li.hasClass("main-ico")?"<i class='addPic-i'>产品主图</i>":"");
			target.after(target.clone().removeClass("ignore").val(""));
			target.remove(); 
			alert("图片大小不能超过5MB");
			return false;
		},
		success: function(parent,path,target){
			target.valid();
			var li = target.prev();
			var del_ico = li.hasClass("main-ico")?"":"<span class='addPic-delete-btn'></span>";
			var img = "<img width='98' height='98' src="+path+" />";
			var html = del_ico + img;
			li.html(li.hasClass("main-ico")?"<i class='addPic-i'>产品主图</i>":"").append(html);
	    }
	},$("#mainPics"));
	
	//删除商品主属性图片
	$(document).on("click",".addPic-li3 span",function(){
		var $this = $(this);
		var $file = $this.parent().next("input[type='file']")
		$this.parent().html("");
		$file.after($file.clone().val(""));
		$file.remove(); 
		return false;
	});
	
	$(document).on("click","li.addPic-li3",function(){
		$(this).next("input[type='file']").click();
	});
	
	//保存商品
	$("#ok_btn").click(function(){
		formSubmit();
	});

	//提交审核商品
	$("#cancel_btn").click(function(){
		
	});
});

function showLayer(){
	layer.msg('提交中....',{icon:16,time:false});
	$("#hiddensd").show();
}
function hideLayer(){
	$("#layui-layer1").hide();
	layer.closeAll('loading');
	$("#hiddensd").hide();
	setTimeout(function(){
	    layer.closeAll('loading');
	}, 1000);
}

//表单提交
function formSubmit(){
	
	showLayer();
	$("#addProductForm").ajaxSubmit({
		iframe:true,
		dataType:"json",
		data:{},
		url:Web.Recource.serverURL +"/product/addProduct?"+$("#addProductForm").serializeJson(true),
		success: function(data){
			hideLayer();
			if(data.errcode =="0"){
				alert("添加成功！");
				
			}else{
				alert("添加失败！");
			}
		},
		error: function(data){
			alert("添加失败！");
		}
	});
}
