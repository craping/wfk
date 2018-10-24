var pid = Web.Method.GetQueryString("id");

$(function(){
	//添加商品主图
	$("#mainPics").checkFileTypeAndSize({
		allowedExtensions: ['jpg','png'],
		maxSize: 2048,
		widthAndHeight: 1920*1080,
		extensionerror: function(val,target){
			var li = target.prev();
			li.html("").html(li.hasClass("main-ico")?"<i class='addPic-i'>商品主图</i>":"");
			target.after(target.clone().removeClass("ignore").val(""));
			target.remove(); 
			alert("图片的格式只能为：jpg,png");
			return false;
		},
		sizeerror: function(val,target){
			var li = target.prev();
			li.html("").html(li.hasClass("main-ico")?"<i class='addPic-i'>商品主图</i>":"");
			target.after(target.clone().removeClass("ignore").val(""));
			target.remove(); 
			alert("图片大小不能超过2MB");
			return false;
		},
		success: function(parent,path,target){
			target.removeClass("ignore");
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
	ProductDetails();
});

//加载商品信息
function ProductDetails(){
	Web.Method.ajax("/product/getInfoById",{
		async:false,
		data:{
			id: pid
		},
		success:function(data){
			if(data != null && data != undefined && data.info != null && data.info != undefined){
				$.each(data.info, function(key, value){
					Web.Method.setValue(key, value);
					if (key == "images") {
						loadDefPics(isNullOrEmpty(value)?"" : value.toString());
					}
				});
			}
		}
	});
}

//加载默认图片
function loadDefPics(pics){
	var pic_array = [];
	if(!isNullOrEmpty(pics)){
		pic_array = pics.split(",");
		for(var i=0;i<5;i++){
			$.each(pic_array,function(m,n){
				if(pic_array[m].indexOf("def_pic_"+i) >= 0){
					var li = $("input[name='def_pic_" + i + "']").addClass("ignore").prev();
					var del_ico = li.hasClass("main-ico")?"<input type='hidden' name='def_pic' value='" + pic_array[m] + "' />":"<input type='hidden' name='def_pic' value='" + pic_array[m] + "' /><span class='addPic-delete-btn'></span>";
					var img = "<img width='98' height='98' src='" + pic_array[m] + "?" + new Date().getTime().toString() + "' />";
					var html = del_ico + img;
					li.html(li.hasClass("main-ico")?"<i class='addPic-i'>商品主图</i>":"").append(html);
				}
			});
		}
	}
}

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
	$("#editForm").ajaxSubmit({
		iframe:true,
		dataType:"json",
		data:{},
		url:Web.Recource.serverURL +"/product/updateProduct?id="+ pid +"&" + $("#editForm").serializeJson(true),
		success: function(data){
			hideLayer();	
			if(data.errcode =="0"){
				alert("修改成功！");
				window.location.href="product_list.html";
			}else{
				alert("修改失败！");
				window.location.href="product_list.html";
			}
		},
		error: function(data){
			alert("修改失败！")
			window.location.href="product_list.html";
		}
	});
}