$(function(){

	$("#addProForm").validate();

	$("#next_one").click(function(){
		if($("#clsIdZr").valid() && $("#clsIdSt").valid() && $("#clsIdNd").valid())
		$(this).closest(".product-publish").next().show().siblings().hide();
	});

	$("#next_two").click(function(){
		if($("#addProForm").valid())
		$(this).closest(".product-publish").next().show().siblings().hide();
	});
	
	$("#prev_one").click(function(){
		$(this).closest(".product-publish").prev().show().siblings().hide();
	});
	
	$("#prev_two").click(function(){
		$(this).closest(".product-publish").prev().show().siblings().hide();
	});
//	getHistoryCategory();
	$(document).on("click","#historyCategory li",function(){
		var attrGroup = $(this).attr("attr").split(",");
		$("#oneClassfiy").categorySelect("setSelect",attrGroup[0]);
		$("#twoClassfiy").categorySelect("setSelect",attrGroup[1]);
		$("#threeClassfiy").categorySelect("setSelect",attrGroup[2]);
	});
	
	//直辖市id
	var verticalCity = ["110000","120000","310000","500000"];//[北京，天津，上海，重庆]
	
	var oneClassfiy = getClassfiys({classifyLevel:1,status:1});
	var twoClassfiy = oneClassfiy != undefined && oneClassfiy.length > 0?getClassfiys({classifyLevel:2,status:1,parentId:oneClassfiy[0].value}):{};
	var threeClassfiy = twoClassfiy != undefined && twoClassfiy.length > 0?getClassfiys({classifyLevel:3,status:1,parentId:twoClassfiy[0].value}):{};
	
	//加载一级分类
	$("#oneClassfiy").categorySelect({
		name:"clsIdZr",
		required:true,
		display:"请选择一级分类",
		data:oneClassfiy,
		click: function(oneData,oneItem){
			twoClassfiy = getClassfiys({classifyLevel:2,status:1,parentId:oneItem.value});
			if(!isNullOrEmpty(twoClassfiy)){
				$("#twoClassfiy").categorySelect("setData",twoClassfiy);
			}else{
				$("#twoClassfiy").categorySelect("setData",{});
				$("#twoClassfiy").find("input[type='text']").attr("placeholder","");
			}
			$("#threeClassfiy").categorySelect("setData",{});
			$("#threeClassfiy").find("input[type='text']").attr("placeholder","");
			showClassfiyChecked();
			$("#clsIdZr").valid();
		},
		keyup: function(target,value){
			target.categorySelect("setData",getClassfiys({classifyLevel:1,status:1,classifyName:value}));
//			$("#oneClassfiy").find("li:first").click();
		}
	});
	
	//加载二级分类
	$("#twoClassfiy").categorySelect({
		name:"clsIdSt",
		required:true,
		display:"请选择二级分类",
		data:twoClassfiy!=undefined?twoClassfiy:{},
		click: function(twoData,twoItem){
			threeClassfiy = getClassfiys({classifyLevel:3,status:1,parentId:twoItem.value})
			if(threeClassfiy != ""){
				$("#threeClassfiy").categorySelect("setData",threeClassfiy);
//				$("#threeClassfiy").find("li:first").click();
			}else{
				$("#threeClassfiy").categorySelect("setData",threeClassfiy);
				$("#threeClassfiy").find("input[type='text']").attr("placeholder","");
			}
			showClassfiyChecked();
			$("#clsIdSt").valid();
		},
		keyup: function(target,value){
			var clsIdZr = $("#clsIdZr").val();
			if(isNullOrEmpty(clsIdZr)) {
				alert("请选择一级分类");
				return false;
			}
			target.categorySelect("setData",getClassfiys({classifyLevel:2,status:1,parentId:clsIdZr,classifyName:value}));
//			$("#twoClassfiy").find("li:first").click();
		}
	});
	
	//加载三级分类
	$("#threeClassfiy").categorySelect({
		name:"clsIdNd",
		required:true,
		display:"请选择三级分类",
		data:threeClassfiy!=undefined?threeClassfiy:{},
		click: function(threeData,threeItem){
			showClassfiyChecked();
			var classids = $("#clsIdZr").val()+","+$("#clsIdSt").val()+","+$("#clsIdNd").val();
			var classids_vals = $("#clsIdZr").parent().find("input[type='text']").attr("placeholder")+"  ---  "+$("#clsIdSt").parent().find("input[type='text']").attr("placeholder")+"  ---  "+$("#clsIdNd").parent().find("input[type='text']").attr("placeholder");
//			if(!isNullOrEmpty($("#clsIdZr").val()) && !isNullOrEmpty($("#clsIdSt").val()) && !isNullOrEmpty($("#clsIdNd").val())){
//				getUseCategory(classids+";"+classids_vals);
//			}
//			getHistoryCategory();
			$("#brands").select("setData",getBrands({status:1,classify:classids}));
			//加载属性
			$("#attrGroup").html("");
			$("#mainPics").find("ul").not("[attr='main']").remove();
			$("#attr").find("tr[targets='fro_attr']").remove();
			$("#attr").prepend(getAttrs(threeItem.value));
			$("#clsIdNd").valid();
		},
		keyup: function(target,value){
			var clsIdSt = $("#clsIdSt").val();
			if(isNullOrEmpty(clsIdSt)) {
				alert("请选择二级分类");
				return false;
			}
			target.categorySelect("setData",getClassfiys({classifyLevel:3,status:1,parentId:clsIdSt,classifyName:value}));
		}
	});
	
	//加载品牌
	$("#brands").select({
		name:"brand",
		display:"请选择...",
		data:{},
		click: function(target,value){
			$("#brands").next("input").val(value.key);
		}
	});
	
	$(document).on("mouseover","#brands dd",function(){
		var $this = $(this);
		$this.attr("flag",false);
	})
	
	$(document).on("mouseout","#brands dd",function(){
		var $this = $(this);
		$this.attr("flag",true);
	})
	
	//搜索品牌
	$(document).on("keyup","#search_brand",function(){
		var $this = $(this);
		var classids = $("#clsIdZr").val()+","+$("#clsIdSt").val()+","+$("#clsIdNd").val();
		if(isNullOrEmpty($this.val())){
			$("#brands").select("setData",getBrands({status:1,classify:classids}));
		} else{
			$("#brands").select("setData",getBrands({status:1,classify:classids,brandName:$this.val()}));
		}
		if(!$this.prev().find("dl").hasClass("open")) $this.prev().find("dt").click();
	});
	
	//
	
	//品牌搜索失焦
	$(document).on("blur","#search_brand",function(){
		var $this = $(this);
		var $dd = $this.prev().find("dd");
		if($dd.attr("flag") == undefined || $dd.attr("flag") == "true"){
			var classids = $("#clsIdZr").val()+","+$("#clsIdSt").val()+","+$("#clsIdNd").val();
			$("#brands").select("setData",getBrands({status:1,classify:classids}));
			$("#brands").select("setSelect","无");
		}
	});

	//商品标题
	$("#proName").keyup(function(){
		var len = $(this).val().length;
		var max = $(this).attr("maxLength");
		$("#fontNum").text(max-len);
	});
	
	//返利规则
	$(document).on("click","input[name='rebateType']",function(){
		var $this = $(this);
		if($this.val() == "0"){
			$("#proRebate").attr("max","100").next().text("%");
		}else if($this.val() == "1"){
			$("#proRebate").removeAttr("max").next().text("元");
		}
		$("#proRebate").valid();
	});
	
	//修改属性值名称
	$(document).on("keyup","#attr .product-publish-input4",function(){
		if($(this).prev().prop("checked")) {
			$("td[attr_value_id='attr_value_" + $(this).prev().attr("attr_value_id") + "']").text($(this).val());
			$("li.addPic-li1[attr_value_id='attr_value_" + $(this).prev().attr("attr_value_id") + "']").text($(this).prev().attr("attrname")+"[" + $(this).val() + "]");
		}
	});
	
	//勾选属性值
	$(document).on("click","input[type='checkbox']",function(){
		refreshAttrValGroupCache(cacheAttrGroupIds);
		var map = getCheckedAttrValue(attrs);
		attrValGroupMatch(map);
		var $checkeds = $("input[type='checkbox']:checked:first");
		if($checkeds != undefined) {
			loadMainPicTmpl($(this));
		}else{
			$("#mainPics").find("ul").not(":first").remove();
		}
	});
	
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
	
	//加载商品发货地==省
	$("#province").select({
		name:"locusPro",
		required:true,
		display:"请选择...",
		data:getAreas(0),
		click: function(data,item){
			$("#city").select("setData",getAreas(item.value));
			$("#city").find("li:first").click();
			//判断是否是直辖市，是则隐藏#area
			if($.inArray(item.value.toString(),verticalCity)>=0){
				$("#locusArea").addClass("ignore");
				$("#area").hide();
			}else{
				$("#area").show();
			}
			$("#locusPro").valid();
		}
	});
	
	//加载商品发货地==市
	$("#city").select({
		name:"locusCity",
		required:true,
		display:"请选择...",
		data:{},
		click: function(data,item){
			if($.inArray($("#locusPro").val(),verticalCity)<0){
				$("#locusArea").removeClass("ignore");
				$("#locusCity").valid();
				$("#area").select("setData",getAreas(item.value));
				$("#area").find("li:first").click();
			}else{
				$("#locusArea").addClass("ignore");
			}
		}
	});
	
	//加载商品发货地==区
	$("#area").select({
		name:"locusArea",
		required:true,
		display:"请选择...",
		data:{},
		click: function(data,item){
			$("#locusArea").valid();
		}
	});
	
	//加载运费模板
	$("#freightTmpl").select({
		name:"areaTemp",
		required:true,
		display:"请选择...",
		data:loadFreightTmpl(),
		click: function(data,item){
			$("#areaTemp").valid();
		}
	});

	//保存商品
	$("#save").click(function(){
		formSubmit();
	});

	//提交审核商品
	$("#submit").click(function(){
		formSubmit();
	});
	
	
});

var attrs = [];
var cacheAttrGroup = [];
var cacheAttrGroupIds = [];

//获取常用分类
function getHistoryCategory(){
	var html = '';
	var historyCategory = $.cookie("historyCategory");
	if(!isNullOrEmpty(historyCategory)){
		var historyCategorys = historyCategory.split("&");
		if(!isNullOrEmpty(historyCategorys) && historyCategorys.length > 0){
			$.each(historyCategorys,function(i,j){
				html += "<li attr='" + j.split(";")[0] + "'><a href='javascript:void(0)'>" + j.split(";")[1] + "</a></li>";
			});
		}
	}
	$("#historyCategory").html('').append(html);
}

//保存常用分类
function getUseCategory(value){
	if(isNullOrEmpty(value)) return false;
	var historyCategory = $.cookie("historyCategory");
	var historyCategorys = !isNullOrEmpty(historyCategory) ? historyCategory.split("&") : new Array();
	for (var i = 0; i < historyCategorys.length; i ++) {
		if (historyCategorys[i] == value) {
			historyCategorys.splice(i, 1);
			break;
		}
	}
	historyCategorys.unshift(value);
	if (historyCategorys.length > 6) {
		historyCategorys.pop();
	}
	$.cookie('historyCategory', historyCategorys.join("&"), { expires: 7 }); 
}

//获取商品分类（{classifyLevel：等级；status:状态；parentId：上一级}）
function getClassfiys(params){
	var obj = [];
	Web.Method.ajax("classifySupplier/selectBaseClassify",{
		async:false,
		data:params,
		success:function(data){
			$.each(data.info,function(key,value){
				obj[key]={"key":value.classifyName,"value":value.classifyId};
			});
		},
		fail:function(data){
		}
	})
	return obj;
}

//展示所选分类
function showClassfiyChecked(){
	var classfiyName = $("#oneClassfiy").find("input[type='text']").attr("placeholder") + " / " + $("#twoClassfiy").find("input[type='text']").attr("placeholder") + " / " + $("#threeClassfiy").find("input[type='text']").attr("placeholder");
	$("#classfiy,#showClassfy").text(classfiyName);
}

//获取品牌（{status:状态,clsidzr:一级分类ID,clsidst:二级分类,clsidnd:三级分类}）
function getBrands(brand){
	var obj = [];
	Web.Method.ajax("brandSupplier/selectTProdBrand",{
		async:false,
		data:brand,
		success:function(data){
			obj[0]={"key":"无","value":''};
			$.each(data.info,function(key,value){
				obj[key+1]={"key":value.brandName,"value":value.brandId};
			});
		}
	});
	return obj;
}

//获取应用场景
$(document).on("click","#appScen",function(){
    layer.open({
        type: 2,
        title: '选择应用场景',
        fix: false,
        shadeClose: true,
        area: ['600px', '350px'],
        content: 'app_scen_box.html',
        btn: ['确定','取消'],
		yes: function(index, layero){
			var body = layer.getChildFrame('body', index);
            var iframeWin = window[layero.find('iframe')[0]['name']]; //得到iframe页的窗口对象，执行iframe页的方法：iframeWin.method();
            var vals =  iframeWin.setLabel();
			$("#proLabel").val(vals);
			var html = '';
			var apps = vals.split(",");
			if(!isNullOrEmpty(vals) && apps.length > 0)
			$.each(apps,function(i,j){
				html += "<li>" + j + "</li>"
			});
			$("#appScen").parent().find("li").not(":last").remove();
			$("#appScen").parent().prepend(html);
			layer.close(index);
        },
        cancel: function(index){
        	layer.close(index);
        },
    });
	
})


//获取属性
function getAttrs(cla){
	var html = '';
	Web.Method.ajax("classifySupplier/attributeData",{
		async:false,
		data:{classifyId:cla},
		success:function(data){
			var da = data.info;
			attrs = [];
			if(da.length != 0) html += "<tr targets='fro_attr'><td class='tl'><font color='red'>提示：可对以下属性值进行修改</font></td></tr>";
			for (var i = 0; i < da.length; i++) {
				attrs[i] = da[i].attTypeId+"-"+da[i].TYPE_NAME;
				var att = getAttrValues({classifyId:cla,atttype:da[i].attTypeId });
				if(att.length==0) continue;
				html += "<tr targets='fro_attr'>" +
							"<td class='product-publish-title tl'>"+da[i].TYPE_NAME+"</td>" +
						"</tr>" +
						"<tr targets='fro_attr'>" +
				      		"<td>" +
				      			"<div class='product-publish-listEdit'>" +
				      			"<ul class='clearfix'>";
	                for (var j = 0; j < att.length; j++) {
	                	var ids = da[i].attTypeId + "-" + att[j].ATT_ID;
	                	html += "<li class='fieldSet'>" +
	                				"<input type='checkbox' name='attrValues' value='" + ids + "' attr_value_id='" + att[j].ATT_ID + "' attrname='"+da[i].TYPE_NAME+"' attrid='" + da[i].attTypeId + "' attr='for_attr_key_" + da[i].attTypeId + "' class='product-publish-check' value='" + att[j].ATT_ID + "' /><input type='text' required='true' attr='attr_val_name_" + da[i].attTypeId + "' name='attr_val_name_" + att[j].ATT_ID + "' value='" + att[j].ATT_NAME + "' class='product-publish-input4' />" +
	                			"</li>";
	                }
                html += 			"</ul>" +
                				"</div>" +
                			"</td>" +
                		"</tr>";
			}
		}
	});
	
	return html;
}

//获取属性值
function getAttrValues(object){
	var obj;
	Web.Method.ajax("classifySupplier/attClassTypeData",{
		async:false,
		data:object,
		success:function(data){
			obj = data.info;
		}
	});
	return obj;
}


//获取选中属性值
function getCheckedAttrValue(attrs){
	var map = {};
	$.each(attrs,function(key,value){
		var $current = $("input[type='checkbox'][attr='for_attr_key_" + value.split("-")[0] + "']:checked");
		var attr_size = $current.size();
		if(attr_size > 0) {
			var vals = [];
			$current.each(function(i,j){
				vals.push($(this).attr("attr_value_id")+"-"+$(this).next().val().toString());
			});
			map[value.toString()] = vals;
		}
	});
	
	return map;
}


//通过属性值组根据ids获取属性值
function getValByGroup(key){
	var valGroup = null;
	var AttrGroup = cacheAttrGroup;
	if(AttrGroup != null && AttrGroup.length > 0){
		$.each(AttrGroup,function(i,j){
			if(j.attributeids.split("-").sort().toString().indexOf(key.split("-").sort().toString()) >= 0 || key.split("-").sort().toString().indexOf(j.attributeids.split("-").sort().toString()) >= 0){
				valGroup = j;
			}
		});
	}
	return valGroup;
}

//属性值分组搭配
function attrValGroupMatch(map){
//	var map = {"338":["1500-E款","1499-D款","1498-C款"],"354":["1495-XXL","1494-XL","1433-L"]};
	var data_str = [];
	$("#attrGroup").html("");
	if(JSON.stringify(map).indexOf(":")<=0) return false;
	var total_row = 1;
	var title = "<tr>";
	$.each(map,function(key,value){
		var kv = {"key":key.split("-")[0].toString(),"name":key.split("-")[1].toString()}
		data_str.push(kv);
		var th = "<th width='10%'>" + key.split("-")[1].toString() + "</th>";
		title += th;
		total_row *= value.length;
	});
	title += "<th>库存</th><th>礼舍价</th><th>市场价</th><th>采购价</th><th>SKU编码</th><tr>";
	$("#attrGroup").prepend(title);
	cacheAttrGroupIds = [];
	for(var j=0;j<total_row;j++){
		var trs = "<tr>";
		var tt = 1;
		var index = 0;
		$.each(map,function(key,value){
			var length = value.length;
			tt *= length;
			var d = total_row/tt;
			if(j%d==0){
				var keys = (j/d)%length;
				if(data_str[index]["key"].toString() == key.split("-")[0].toString()){
					var kv = {"key":value[keys].split("-")[0].toString(),"value":value[keys].split("-")[1].toString()};
					data_str[index]["value"] = kv;
				}
				trs += "<td rowspan='" + d + "' attr_value_id='attr_value_" + value[keys].split("-")[0] + "'>" + value[keys].split("-")[1] + "</td>";
			}
			index += 1;
		});

		var onlyIds = getUniqueIdtf(data_str);
		var valGroup = getValByGroup(onlyIds);
		var attributeids = isNullOrEmpty(valGroup)?"":valGroup["attributeids"];
		var repertory = isNullOrEmpty(valGroup)?"":valGroup["repertory"];
		var priceLishe = isNullOrEmpty(valGroup)?"":valGroup["priceLishe"];
		var marketprice = isNullOrEmpty(valGroup)?"":valGroup["marketprice"];
		var priceSupply = isNullOrEmpty(valGroup)?"":valGroup["priceSupply"];
		var code = isNullOrEmpty(valGroup)?"":valGroup["proCode"];
		
		trs += "<td>" +
			"<div class='fieldSet'>" +
				"<input type='text' required='true' number='true' positive='true' min='0' maxlength='9' decimal='true' name='onekey_repertory_" + onlyIds + "' value='" + repertory + "' class='publish-product-gBox'/>" +
			"</div>" +
			"</td>" +
			"<td>" +
				"<div class='fieldSet'>" +
					"<input type='text' required='true' number='true' positive='true' min='1' maxlength='9' noZore='true' decimal='true' name='onekey_lishe_" + onlyIds + "' value='" + priceLishe + "' class='publish-product-gBox'/>" +
				"</div>" +
			"</td>" +
			"<td>" +
				"<div class='fieldSet'>" +
					"<input type='text' required='true' number='true' positive='true' min='1' maxlength='9' noZore='true' decimal='true' name='onekey_market_" + onlyIds + "' value='" + marketprice + "' class='publish-product-gBox'/>" +
				"</div>" +
			"</td>" +
			"<td>" +
				"<div class='fieldSet'>" +
					"<input type='text' required='true' number='true' positive='true' min='1' maxlength='9' noZore='true' decimal='true' name='onekey_supply_" + onlyIds + "' value='" + priceSupply + "' class='publish-product-gBox'/>" +
				"</div>" +
			"</td>" +
			"<td>" +
				"<div class='fieldSet'>" +
					"<input type='text' maxlength='9' name='onekey_code_" + onlyIds + "' value='" + code + "' class='publish-product-gBox'/>" +
				"</div>" +
			"</td>";
		trs += "</tr>";
		$("#attrGroup").append(trs);
		$("#attrGroup").append("<input type='hidden' name='attr_vals' value='" + onlyIds + "' />");
		cacheAttrGroupIds.push(onlyIds);
	}

}

//更新缓存属性值组
function refreshAttrValGroupCache(cacheAttrGroupIds){
	cacheAttrGroup = [];
	if(cacheAttrGroupIds != null && cacheAttrGroupIds.length > 0){
		$.each(cacheAttrGroupIds,function(i,j){
			var key = j;
			var item = {};
			item["attributeids"] = key;
			item["repertory"] = !isNullOrEmpty($("input[name='onekey_repertory_" + key + "']").val())?$("input[name='onekey_repertory_" + key + "']").val():"";
			item["priceLishe"] = !isNullOrEmpty($("input[name='onekey_lishe_" + key + "']").val())?$("input[name='onekey_lishe_" + key + "']").val():"";
			item["marketprice"] = !isNullOrEmpty($("input[name='onekey_market_" + key + "']").val())?$("input[name='onekey_market_" + key + "']").val():"";
			item["priceSupply"] = !isNullOrEmpty($("input[name='onekey_supply_" + key + "']").val())?$("input[name='onekey_supply_" + key + "']").val():"";
			item["proCode"] = !isNullOrEmpty($("input[name='onekey_code_" + key + "']").val())?$("input[name='onekey_code_" + key + "']").val():"";
			cacheAttrGroup.push(item);
		});
		cacheAttrGroupIds = [];
	}
}

//获取唯一属性组唯一标示
function getUniqueIdtf(str){
	var map = "";
	$.each(str,function(key,value){
		if(key > 0) map += "-"
		map += value.value.key;
	});
	return map;
}


//加载主图模板
function loadMainPicTmpl(current){
	var html = '';
	if(current.attr("attrid") != "3"){
		return false;
	}
	if(!current.prop("checked")){
		var ul = "ul[attr_value_id='" + current.attr('attrid')+ "_" + current.attr('attr_value_id') + "']";
		$(ul).remove();
		return false;
	}
	$.each(current,function(key,value){
		var li = ''
		html += "<ul class='clearfix' attr_value_id='" + $(this).attr("attrid")+ "_" + $(this).attr("attr_value_id") + "'>" +
					"<li class='addPic-li1' style='overflow:hidden;' attr_value_id='attr_value_" + $(this).attr("attr_value_id") + "'>" + $(this).attr("attrname") + "[" + $(this).next().val().toString() + "]" + "</li>" +
					"<li class='main-ico addPic-li3'><i class='addPic-i'>商品主图</i></li>" +
					"<input type='file' required='true' name='attr_val_pic_0_" + $(this).attr('attr_value_id') + "' style='display:none;' />";
					for(var i=1;i<5;i++){
						var str = "attr_val_pic_" + i + "_" + $(this).attr("attr_value_id");
						li += "<li class='addPic-li3'></li>" +
								"<input type='file' name='" + str + "' style='display:none;' />";
					}
		html += li + "</ul>";
			
	});
	$("#mainPics").append(html);
}

//获取发货区域
function getAreas(pid){
	var obj = [];
	Web.Method.ajax("pubArea/getListArea",{
		async:false,
		data:{parentId:pid},
		success:function(data){
			$.each(data.info,function(key,value){
				obj[key]={"key":value.areaName,"value":value.areaNo};
			});
		}
	});
	return obj;
}

//获取运费模板
function loadFreightTmpl(){
	var obj = [];
	Web.Method.ajax("supProduct/areaTempList",{
		async:false,
		data:{
			status:0,
			supId:$("#supId",parent.document).val()
		},
		success:function(data){
			$.each(data.info,function(key,value){
				obj[key]={"key":value.tName.toString(),"value":value.tid.toString()};
			});
			
		}
	});
	return obj;
}

//刷新运费模板数据
function reLoadFeightTmpl(){
	$("#freightTmpl").select("setData",loadFreightTmpl());
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
	if(!$("#addProForm").valid()) return false
	$("[name='proDetails']").val(proDetails.getContent());
	$("[name='packBill']").val(packBill.getContent());
	$("[name='afterService']").val(afterService.getContent());
	showLayer();
	$("#addProForm").ajaxSubmit({
		iframe:true,
		dataType:"json",
		data:{},
		url:Web.Recource.serverURL +"/supProduct/savePro?"+$("#addProForm").serializeJson(true),
		success: function(data){
			hideLayer();
			if(data.errcode =="0"){
				alert("添加成功！");
				window.location.href="product_manage.html";
			}else{
				alert("添加失败！");
			}
		},
		error: function(data){
			alert("添加失败！");
		}
	});
}
