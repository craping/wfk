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
			li.html(li.hasClass("main-ico")?"<i class='addPic-i'>商品主图</i>":"").append(html);
	    }
	},$("#mainPics"));
	
	//删除商品主属性图片
	$(document).on("click",".addPic-li3 span",function(){
		alert(1);
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
	$("#save").click(function(){
		formSubmit();
	});

	//提交审核商品
	$("#submit").click(function(){
		formSubmit();
	});
	ProductDetails();
	if($.inArray($("#locusPro").val().toString(),verticalCity)>=0){
		$("#locusArea").addClass("ignore");
	}
	var map = getCheckedAttrValue(attrs);
	attrValGroupMatch(map);
});

var proAttrGroup = [];
var cacheAttrGroup = [];
var cacheAttrGroupIds = [];
var attrs = [];
var current_attr_group;
var pid = Web.Method.GetQueryString("proId");


//加载商品信息
function ProductDetails(){
	Web.Method.ajax("/supProduct/getProductById",{
		async:false,
		data:{
			proId: pid
		},
		success:function(data){
			if(data != null && data != undefined && data.info != null && data.info != undefined){
				getProAttrVal(pid);
				getProAttr(pid);
				var clsId='' , brand='' , province='' , city ='' , area='' , areaTemp='';
				$.each(data.info, function(i,j){
					if(i == "clsIdNd") {
						clsId = isNullOrEmpty(j)?"":j.toString();
					}else if(i == "brand"){
						brand = isNullOrEmpty(j)?"无":j.toString();
						$("#search_brand").attr("val",brand);
					}else if(i == "locusPro"){
						province = isNullOrEmpty(j)?"":j.toString();
					}else if(i == "locusCity"){
						city = isNullOrEmpty(j)?"":j.toString();
					}else if(i == "locusArea"){
						area = isNullOrEmpty(j)?"":j.toString();
					}else if(i == "areaTemp"){
						areaTemp = isNullOrEmpty(j)?"":j.toString();
					}else if(i == "proPics"){
						loadDefPics(isNullOrEmpty(j)?"":j.toString());
					}else if(i == "rebateType"){
						if(j == "0"){
							$("#proRebate").attr("max","100").next().text("%");
						}else if(j == "1"){
							$("#proRebate").removeAttr("max").next().text("元");
						}
					}else if(i=="proDetails"){
						Web.Method.ajax("sys/getHtmlFileContent",{
							async:false,
							data:{filePath:j},
							success:function(data){
								$("textarea[name='proDetails']").val(data.info);
								proDetails.addListener("ready", function () {
									proDetails.setContent(data.info);
								});
							}
						});
					}
					Web.Method.setValue(i,j);
				});
				$("#oneClassfiy").categorySelect("setSelect",clsId.split("-")[0]);
				$("#twoClassfiy").categorySelect("setSelect",clsId.split("-")[1]);
				$("#threeClassfiy").categorySelect("setSelect",clsId.split("-")[2]);
				$("#brands").select("setSelect",brand);
				$("#province").select("setSelect",province);
				$("#city").select("setSelect",city);
				$("#area").select("setSelect",area);
				$("#freightTmpl").select("setSelect",areaTemp);
				getCurrentTmpl();
				loadProAppScen($("#proLabel").val());
				loadMainAttrValPic();
			}
		}
	});
}


//加载主图模板
function loadMainPicTmpl(current){
	var html = '';
	var show_img = [];
	var show_img_html = '';
	if(current.attr("attrid") != "3"){
		return false;
	}
	if(!current.prop("checked")){
		var ul = "ul[attr_value_id='" + current.attr('attrid')+ "_" + current.attr('attr_value_id') + "']";
		$(ul).remove();
		return false;
	}
	var pics = current.attr("pics");
	if(!isNullOrEmpty(pics)){
		show_img = pics.split(",");
	}
	$.each(current,function(key,value){
		var li = '';
		var flag_str_main = setPicPosition(show_img,"attr_val_pic_0_"+$(this).attr("attr_value_id"));
		var ignore_main = !isNullOrEmpty(show_img) && !isNullOrEmpty(flag_str_main)?"ignore":"";
		var str1 = !isNullOrEmpty(show_img) && !isNullOrEmpty(flag_str_main)?"<input type='hidden' name='attr_val_pic_del_" + $(this).attr("attr_value_id") + "' value='" + flag_str_main + "' /><img width='98px' height='98px' src='" + flag_str_main+ "?"+ new Date().getTime().toString() + "' />":"";
		html += "<ul class='clearfix' attr_value_id='" + $(this).attr("attrid")+ "_" + $(this).attr("attr_value_id") + "'>" +
					"<li class='addPic-li1' style='overflow:hidden;' attr_value_id='attr_value_" + $(this).attr("attr_value_id") + "'>" + $(this).attr("attrname") + "[" + $(this).next().val().toString() + "]" + "</li>" +
					"<li class='main-ico addPic-li3'><i class='addPic-i'>商品主图</i>" + str1 + "</li>" + 
					"<input type='file' required='true' class='" + ignore_main + "' name='attr_val_pic_0_" + $(this).attr("attr_value_id") + "' style='display:none;' />";
					for(var i=1;i<5;i++){
						
						var img = "attr_val_pic_" + i + "_" + $(this).attr("attr_value_id");
						var flag_str = setPicPosition(show_img,img);
						var str = !isNullOrEmpty(show_img) && !isNullOrEmpty(flag_str)?"<input type='hidden' name='attr_val_pic_del_" + $(this).attr("attr_value_id") + "' value='" + flag_str + "' /><span class='addPic-delete-btn'></span><img width='98px' height='98px' src='" + flag_str + "' />":"";
						li += "<li class='addPic-li3'>" + str + "</li>" +
								"<input type='file' name='" + img + "' style='display:none;'  />";
						
					}
		html += li + "</ul>";
	});
	$("#mainPics").append(html);
}

//点位图片位置
function setPicPosition(array,pic){
	var path = '';
	$.each(array,function(m,n){
		if(array[m].indexOf(pic) >= 0){
			path = array[m];
		}
	});
	return path;
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
	if(!$("#editProForm").valid()) return false
	$("[name='proDetails']").val(proDetails.getContent());
	$("[name='packBill']").val(packBill.getContent());
	$("[name='afterService']").val(afterService.getContent());
	showLayer();
	$("#editProForm").ajaxSubmit({
		iframe:true,
		dataType:"json",
		data:{},
		url:Web.Recource.serverURL +"/supProduct/updatePro?proId="+ pid+"&" + $("#editProForm").serializeJson(true),
		success: function(data){
			hideLayer();	
			if(data.errcode =="0"){
				alert("修改成功！");
				window.location.href="product_manage.html";
			}else{
				alert("修改失败！");
				window.location.href="product_manage.html";
			}
		},
		error: function(data){
			alert("修改失败！")
			window.location.href="product_manage.html";
		}
	});
}


//加载主属性图片
function loadMainAttrValPic(){
	$("input[is_main='true']").each(function(){
		loadMainPicTmpl($(this));
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
					var img = "<img width='98' height='98' src='"+pic_array[m]+ "?"+ new Date().getTime().toString()+"' />";
					var html = del_ico + img;
					li.html(li.hasClass("main-ico")?"<i class='addPic-i'>商品主图</i>":"").append(html);
				}
			});
		}
		
	}
}

//解析属性字符串
function parseStrAttr(attrStr){
	var array = new Array();
	array = attrStr.split(",");
	return array;
}