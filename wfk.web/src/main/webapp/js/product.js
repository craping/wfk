/**
 * 
 */
var createUUID = (function(uuidRegEx, uuidReplacer){  
    return function(){  
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(uuidRegEx, uuidReplacer).toUpperCase();  
    };  
})(/[xy]/g, function (c) {  
    var r = Math.random() * 16 | 0,  
        v = c == "x" ? r : (r & 3 | 8);  
    return v.toString(16);  
});  

var joinTypeStr = "";
var analyticalWayStr = "";
var joinTypeList = new Array();
$(function(){
	$("#listview_products").listview({
		style:"table-hover",
		headerStyle:"noborder",
		module:[
	        {name:"序号",width:"4%"},
	        {name:"产品编码",width:"13%"},
			{name:"产品名称",width:"13%"},
			{name:"产品型号",width:"10%"},
			{name:"产品类型",width:"10%"},
			{name:"主控芯片",width:"10%"},
			{name:"添加时间",width:"10%"},
			{name:"操作",width:"30%"}
		],
		eachItem:function(ui, item){
			var capacitys = "<a name='capacitys' href='javascript:;'>功能("+ item.capacitysNum +")</a>";
			var app = "<a href='javascript:;' name='app' >应用("+ item.appNum +")</a>";
			var deleteStr = "<a style='opacity:0.5;' disabled>删除</a>";
			var update = "<a style='opacity:0.5;' disabled>修改</a>";
			
			if(item.capacitysNum == 0)
				capacitys = "<a name='capacitys' href='javascript:;'>功能</a>";
			
			if(item.appNum == 0)
				app = "<a name='app' href='javascript:;'>应用</a>";
			
			if(item.appNum == 0)
				deleteStr = "<a name='delete' href='javascript:;'>删除</a>";
			
			if(item.appNum == 0)
				update = "<a name='updateProduct' href='javascript:;'>修改</a>";
			
			var page = $("#pageset_products").data("crap.pageSet").options.pageSet.page-1;
			var date = new Date();
			date.setTime(item.createtime);
			var tr = $("<tr>" +
						"<td width='4%'>"+(parseInt(item.indexKey) + page * rs.pageNum + 1)+"</td>" +
						"<td width='13%'>"+ item.code +"</td>" +
						"<td width='13%'><a name='detail' class='link' href='#productDetail' data-toggle='tab'>"+ item.name +"</a></td>" +
						"<td width='10%'>"+ item.model +"</td>" +
						"<td width='10%'>"+ item.typeName +"</td>" +
						"<td width='10%'>"+ item.chip +"</td>" +
						"<td width='10%'>"+ date.format("yyyy/MM/dd") +"</td>" +
						"<td width='30%'>"+ capacitys + app + deleteStr + update +"</td>" +
					"</tr>");
			tr.find("a[name=delete]").click(function(){
				$.confAlert({
					context:"确定删除此产品[序号"+(parseInt(item.indexKey) + page * rs.pageNum +1)+"]?",
					size:"sm",
					onOk:function(){
						Web.Method.ajax("product/deleteProduct", {
							data:{
								productId:item.id
							},
							success:function(data){
								$.confAlert({
									size:"sm",
									context:"操作成功",
									noButton:false
								})
								queryProductsList(1);
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
				});
			});
			
			tr.find("a[name=detail]").click(function(){
				var productId = item.id;
				$("a[name=addProduct]").click();
				$("#productFunction").text("产品详情");
				toggleDiv();
				getProduct(productId,1); //参数为1,产品详情时加载的样式
				$("#uploadImage_div").css({"display":"none"});
				$("#excelTemplet").css({"display":"none"});
				$("#listview_deviceAuthorization").css("min-height","");
				$("input").attr({"readonly":"readonly"});
				$("textarea").attr({"readonly":"readonly"});

				
				$("#listview_deviceAuthorization").listview({
					style:"table-hover",
					headerStyle:"noborder",
					module:[
				        {name:"序号",width:"auto"},
				        {name:"产品鉴权编码",width:"auto"}
					],
					eachItem:function(ui, item){
						var page = $("#pageset_deviceAuthorization").data("crap.pageSet").options.pageSet.page-1;
						var tr = $("<tr>" +
										"<td>"+(parseInt(item.indexKey) + page * rs.pageNum +1)+"</td>" +
										"<td>"+ item.code +"</td>" +
								   "</tr>");
						return tr;
					}
				});

				$("#pageset_deviceAuthorization").pageset({
					itemClick:function(page){
						getDeviceAuthorizationList(page,productId);
					}
				});
				
				getDeviceAuthorizationList(1,productId);
			});
			tr.find("a[name=capacitys]").click(function(){
				capacitys_productId = item.id;
				Web.Method.ajax("product/getProduct",{
					data:{
						productId:item.id
					},
					success:function(data){
						for(var key in data.info){
							var val = data.info[key];
							switch (key) {
							case "iconurl":
								$("img[name=capacitys_product_iconurl]").attr("src", val);
								break;
							case "analyticalWayId":
								$("span[name=capacitys_product_analyticalWay]").text(rs.productanalyticalWay[val]);
								break;
							case "joinTypeId":
								$("span[name=capacitys_product_joinType]").text(rs.productJoinType[val]);
								break;
							default:
								$("span[name=capacitys_product_"+key+"]").text(val);
								break;
							}
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
		
				$("<a href='#capacitysList'/>").tab("show");
				queryCapacitysList(1);
			});
			tr.find("a[name=app]").click(function(){
				$("<a href='#app'/>").tab("show");
				$("#app_iframe")[0].src = Web.Recource.appServerURL+"app-list.html?productId="+item.id;
			});
			
			tr.find("a[name=updateProduct]").click(function(){
				var productId = item.id;
				$("a[name=addProduct]").click();
				getProduct(productId,2);//参数为2,产品修改时加载的样式
				$("#deviceAuthorization").removeAttr("name");
				$("#productFunction").text("修改产品");
				$("#copyProduct_div").toggle();
			});
			return tr;
		}
		
	});
	$("#pageset_products").pageset({
		itemClick:function(page){
			queryProductsList(page);
		}
	});
	
	queryProductsList(1);
	
	$("#deviceAuthorizationList input[name=cancel]").click(function(){
		$("a[name=productList]").click();
		queryProductsList(1);
	});
	
/*
 * addProduct
 ------------------------------------------------- 
 */
	$("#addProductButton").click(function(){
		$("a[name='addProduct']").click();
	});
	
	$("a[name='addProduct']").click(function(){
		clearAlert(); //清除警告框
		$("#productFunction").text("添加产品");
		$("#copyProduct_div").css({"display":"block"});
		$("#uploadImage_div").css({"display":"block"});
		$("#deviceAuthorization").css({"display":"block"});
		$("#saveAndCancel").css({"display":"block"});
		$("#excelTemplet").css({"display":"block"});
		$("#updateProduct_div").css({"display":"none"});
		$("#deviceAuthorizationList").css({"display":"none"});
		
		$("#deviceAuthorization").attr({"name":"validate_excelName"});
		$("s[name=xl_productType]").show();
		$("input").removeAttr("readonly");
		$("#code").attr({"readonly":"readonly"});
		$("#productTypeList").attr({"readonly":"readonly"});
		$("#excelName").attr({"readonly":"readonly"});
		$("textarea").removeAttr("readonly");
		$("radio").removeAttr("readonly");
		clearForm();
	});
	
    Web.Method.ajax("product/getProductTypeList",{
		success: function(data){
			var htmlStr = "";
			$.each(data.info, function(i, item){
				htmlStr += "<span name='selectType' tabindex="+ item.id +">"+ item.name +"</span>";
			});
			$("#productType").html(htmlStr);
		},
		fail:function(data){
			$.confAlert({
				size:"sm",
				context:data.msg,
				noButton:false
			})
		},
		error:function(){
			$.confAlert({
				size:"sm",
				context:"服务器异常,请稍后再试!",
				noButton:false
			})
		}
	});
    
    $(document).on("click","span[name='selectType']",function(){
		var s=$(this).text();
		$(this).parents().prev().prev().val(s);
		$(this).parents().prev().prev().prev().val($(this).attr("tabindex"));
		$("div.cate_drop").slideToggle(200);
		$("input[name='producttypeId']").val($(this).attr("tabindex"));
    });
	
    $("#uploadImage").click(function(){
    	$("#iconFile").click();
    });
	

	var index = 0;
	Web.Method.ajax("product/getJoinTypeList",{
		success: function(data){
			$.each(data.info, function(i, item){
				joinTypeStr += "<input type='radio'  id=radio-3-"+ (i+1) +" name='joinType' class='joinType' value="+ item.id +"><label for=radio-3-"+ (i+1) +"></label><span class='pp'>"+ item.name +"</span>";
				$.each(item.lAnalyticalWays, function(i2, item2){
					joinTypeList[index] = new Array();
					joinTypeList[index][0] = item2.id;
					joinTypeList[index][1] = item2.jointypeId;
					joinTypeList[index][2] = item2.name;
					index++;
					if(i == 0)
					analyticalWayStr += "<input type='radio' name='analyticalWay' class='analyticalWay' id=radio-3-"+ (i+1) +"-"+ (i2+1) +"  value="+ item2.id +" /><label for=radio-3-"+ (i+1) +"-"+ (i2+1) +"></label><span class='pp'>"+ item2.name +"</span>";
				});
			});
			
			$("#joinType").html(joinTypeStr);
			$("#analyticalWay").html(analyticalWayStr);
			$("input[name='joinType']:first").attr('checked', 'checked');
			$("input[name='analyticalWay']:first").attr('checked', 'checked');
		},
		fail:function(data){
			$.confAlert({
				size:"sm",
				context:data.msg,
				noButton:false
			})
		},
		error:function(){
			$.confAlert({
				size:"sm",
				context:"服务器异常,请稍后再试!",
				noButton:false
			})
		}
	});
	
	var div = $("#product_infoForm").find("div[name=validate_image]").valAlert({alert:"danger", style:"width:550px"});
	$("#icon").load(function(){
		var imgWidth, imgHeight
    	if ($("#icon")[0].naturalWidth) { //获取图片实际高宽 
    		imgWidth = $("#icon")[0].naturalWidth;
    		imgHeight = $("#icon")[0].naturalHeight;
    		if(imgWidth != 100 || imgHeight != 100){
    			div.valAlert("show", "图片尺寸必须为100*100!");
    			$("#iconFile").val("");
    			$("#icon").attr({"src":""});
    			return;
    		}else{
    			div.valAlert("hide");
    		}
    	}
	});
	
	$('#iconFile').checkFileTypeAndSize({
		allowedExtensions: ['jpg','png'],
		maxSize: 20,
		extensionerror: function(){
			$("#iconFile").val("");
			$("#icon").attr({"src":""});
			div.valAlert("show", "图片的格式只能为：jpg,png");
			return;
		},
		sizeerror: function(){
			$("#iconFile").val("");
			$("#icon").attr({"src":""});
			div.valAlert("show", "图片大小不能超过20kb");
			return;
		},
		success: function(){
			$("#icon").attr({"src":Web.Method.getObjectURL($("#iconFile")[0])});
			div.valAlert("hide");
	    }
	});
	
	$(document).on("change",".joinType",function(){
		var joinType = $("input[name='joinType']:checked").val();
		$("#analyticalWay").empty(); //清空解析方式
		var analyticalWayStr = "";
		$.each(joinTypeList, function(i,item){
			if(joinTypeList[i][1] == joinType){
				analyticalWayStr += "<input type='radio' name='analyticalWay' class='analyticalWay' id=radio-3-"+ (i+1) +"-"+ (i+1) + " value="+ joinTypeList[i][0] +" /><label for=radio-3-"+ (i+1) +"-"+ (i+1) + "></label><span class='pp'>"+ joinTypeList[i][2] +"</span>";
			}
		});
		
		$("#analyticalWay").html(analyticalWayStr);
		$("input[name='analyticalWay']:first").attr('checked', 'checked');
	});
	
	$("#uploadExcel").click(function(){
		$("#authFile").click();
	});
	
	$("#authFile").change(function(){
		$("#excelName").val($("#authFile").val());
		var excelName = $("#excelName").val();
		var fileType = excelName.substring(excelName.lastIndexOf("."));
		var div = $("#product_infoForm").find("#deviceAuthorization").valAlert({alert:"danger", style:"width:550px"});
		if(fileType != ".xls" && fileType != ".xlsx"){
			$("#excelName").val("");
			$("#authFile").val("");
			div.valAlert("show","只能是excel表!");
		}else{
			div.valAlert("hide");
		}
	});
	
	$("#product_infoForm input[name=save]").click(function(){
		if($("#icon").attr("src") == ""){
			$("#icon").attr({"src":"/firewire.page/images/tubiao.png"});
		}
		
		var productId = $("#productId").val();
		if(productId == "")
			productId = 0;
		
		var data = $("#product_infoForm").serializeJson(true);
		for(var key in data){
			var val = data[key];
			var div = $("#product_infoForm").find("div[name=validate_"+key+"]").valAlert({alert:"danger", style:"width:550px"});
			var label = div.find("label[class=fl]").text();
			
			if(!val && label){
				div.valAlert("show", label+"不能为空");
				return;
			}else{
				div.valAlert("hide");
			}
		}
		
		
		$("input[name='analyticalwayId']").val($("input[name='analyticalWay']:checked").val());
		$("input[name='createtime']").val(getDateTime());
		
		if(productId){
			$("#product_infoForm").ajaxSubmit({
				iframe:true,
				dataType:"json",
				url:Web.Recource.serverURL +"product/updateProduct?"+$("#product_infoForm").serializeJson(true),
				success: function(data){
					if(data.result){
						$.confAlert({
							size:"sm",
							context:data.msg,
							noButton:false
						})
					}else{
						$.confAlert({
							size:"sm",
							context:"产品修改成功",
							noButton:false
						})
						$("a[name=productList]").click();
						queryProductsList(1);
					}
				},
				error: function(xhr, statis, error){
					$(this).button('reset');
					$.confAlert({
						size:"sm",
						context:"服务器异常,请稍后再试!",
						noButton:false
					})
				}
			});
		}else{
			$("#product_infoForm").ajaxSubmit({
				iframe:true,
				dataType:"json",
				url:Web.Recource.serverURL +"product/insertProduct?"+$("#product_infoForm").serializeJson(true),
				success: function(data){
					if(data.result){
						alert(data.msg);
					}else{
						$.confAlert({
							size:"sm",
							context:"操作成功",
							noButton:false
						})
						$("a[name=productList]").click();
						queryProductsList(1);
					}
				},
				error: function(xhr, statis, error){
					$(this).button('reset');
					$.confAlert({
						size:"sm",
						context:"服务器异常,请稍后再试!",
						noButton:false
					})
				}
			});
		}
	});
	
	
	$("#product_infoForm input[name=productName]").blur(function(){
		var productId = $("#productId").val();
		if(productId == "")
			productId = 0;
		
		var regExp = new RegExp("[!@#$%\^&*()-]+");
		var div = $("#product_infoForm").find("div[name=validate_productName]").valAlert({alert:"danger", style:"width:550px"});
		if($("#productName").val() != "" && $("#productName").val().length > 32){
			div.valAlert("show", "产品名称长度不能超过32位.");
			return;
		}else if($("#productName").val() != "" && regExp.test($("#productName").val())){
			div.valAlert("show", "产品名称不能包含!@#$%\^&*()-");
			return;
		}else if($("#productName").val() != ""){
			validateProductName($("#productName").val(),productId);
		}else{
			div.valAlert("hide");
		}
		
	});
	
	$("#product_infoForm input[name=serviceCode]").blur(function(){
		var div = $("#product_infoForm").find("div[name=validate_serviceCode]").valAlert({alert:"danger", style:"width:550px"});
		if($("#serviceCode").val() != "" && $("#serviceCode").val().length > 32){
			div.valAlert("show", "服务编码长度不能超过32位.");
			return;
		}else{
			div.valAlert("hide");
		}
	});
	
	$("#product_infoForm input[name=model]").blur(function(){
		var div = $("#product_infoForm").find("div[name=validate_model]").valAlert({alert:"danger", style:"width:550px"});
		if($("#model").val() != "" && $("#model").val().length > 32){
			div.valAlert("show", "产品型号长度不能超过32位.");
			return;
		}else{
			div.valAlert("hide");
		}
	});
	
	$("#product_infoForm input[name=chip]").blur(function(){
		var div = $("#product_infoForm").find("div[name=validate_chip]").valAlert({alert:"danger", style:"width:550px"});
		if($("#chip").val() != "" && $("#chip").val().length > 32){
			div.valAlert("show", "主控芯片长度不能超过32位.");
			return;
		}else{
			div.valAlert("hide");
		}
	});
	
	$("#product_infoForm input[name=cancel]").click(function(){
		$("a[name=productList]").click();
		queryProductsList(1);
	});
	
	
/*
 * copyProduct
 ------------------------------------------------- 
 */	
	$("#copyProduct").click(function(){
		var prompt = $("<div class='modal fade bs-example-modal-lg'>" +
							"<div class='modal-dialog modal-lg'>" +
								"<div class='modal-content'>" +
									"<div class='h1'>产品管理  <span class='jt_blue2'>>></span>  复制产品<img align='right' class='close' name='closeCopy' src='images/gb2.png'></div>" +
									"<div class='prompt_bao_div'  style='background:#f3f3f3;'>" +
										"<div class='bg_w' style='min-height:245px;' name='listview_products_copy'></div>" +
										"<div class='page' name='pageset_products'></div>" +
											"<div class='center' style='padding-bottom:20px;'>" +
												"<input type='button' class='tbutton' value='确认' name='ok'>" +
												"<input type='button' class='tbutton_z' value='取消' name='cancelCopy'>" +
											"</div>" +
										"</div>" +
									"</div>" +
								"</div>" +
							"</div>");
		$("body").append(prompt);
		prompt.modal({
			keyboard: false
		}).on("hidden.bs.modal", function (e) {
			$(this).remove();
		});
		
		prompt.find("input[name=cancelCopy],img[name=closeCopy]").click(function(){
			prompt.modal('hide');
		});
		
		prompt.find("input[name=ok]").click(function(){
			var productId = $("input[name='selectCopyProduct']:checked").val();
			getProduct(productId, -1);//参数为-1,产品复制时加载的样式
			prompt.modal('hide');
		});
		
		var listview = prompt.find("div[name=listview_products_copy]").listview({
			style:"table-hover",
			headerStyle:"noborder",
			module:[
			    {name:"",width:"5%"},
		        {name:"序号",width:"5%"},
		        {name:"产品编码",width:"15%"},
				{name:"产品名称",width:"10%"},
				{name:"产品型号",width:"10%"},
				{name:"芯片型号",width:"10%"},
				{name:"产品类型",width:"10%"},
				{name:"添加时间",width:"10%"},
				{name:"产品描述",width:"25%"}
			],
			eachItem:function(ui, item){
				
				var page = prompt.find("div[name=pageset_products]").data("crap.pageSet").options.pageSet.page-1;
				var date = new Date();
				date.setTime(item.createtime);
				var tr = $("<tr>" +
							"<td width='5%'><input type='radio' name='selectCopyProduct' value="+item.id+" id=radio-3-3-"+ (parseInt(item.indexKey) + page * rs.pageNum +1) +" /><label for=radio-3-3-"+ (parseInt(item.indexKey) + page * rs.pageNum +1) +"></label></td>" +
							"<td width='5%'>"+(parseInt(item.indexKey) + page * rs.pageNum + 1)+"</td>" +
							"<td width='15%'>"+ item.code +"</td>" +
							"<td width='10%'>"+ item.name +"</td>" +
							"<td width='10%'>"+ item.model +"</td>" +
							"<td width='10%'>"+ item.chip +"</td>" +
							"<td width='10%'>"+ item.typeName +"</td>" +
							"<td width='10%'>"+ date.format("yyyy/MM/dd") +"</td>" +
							"<td width='25%'>"+ item.description +"</td>" +
						"</tr>");
				return tr;
			}
			
		});
		var pageset = prompt.find("div[name=pageset_products]").pageset({
			itemClick:function(page){
				queryProductsList(page, listview, pageset);
			}
		});
		queryProductsList(1, listview, pageset);
	});

});

function queryProductsList(page, listview, pageset){
	listview = listview?listview:$("#listview_products");
	listview.listview("loading");
	Web.Method.ajax("product/getProductList",{
		data:{
			page_flag:page,
			page_num:rs.pageNum
		},
		success:function(data){
			pageset = pageset?pageset:$("#pageset_products");
			pageset.pageset("setData", {
				totalpage:data.totalpage,
				page:data.page
			});
			listview.listview("setData", data.info);
			$("#listview_products_copy").listview("setData", data.info);
			$("input[name='selectProduct']:first").attr('checked', 'checked');
			$("input[name='selectCopyProduct']:first").attr('checked', 'checked');
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



function clearForm(){ //清空表单
	$("#product_infoForm")[0].reset();
    $("#code").val(createUUID);
    $("#productId").val("");
    $("#producttypeId").val("");
    $("#iconName").val("");
	$("#icon").attr({"src":"images/tubiao.png"});
	$("#copyFlag").val("0");
	$("#joinType").html(joinTypeStr);
	$("#analyticalWay").html(analyticalWayStr);
	$("input[name='joinType']:first").attr('checked', 'checked');
	$("input[name='analyticalWay']:first").attr('checked', 'checked');
}

function validateProductName(name,productId){
	Web.Method.ajax("product/validateProductName",{
		data:{
			productName:encodeURI(name),
			productId:productId
		},
		success:function(data){
			var div = $("#product_infoForm").find("div[name=validate_productName]").valAlert({alert:"danger", style:"width:550px"});
			if(data.info != null){
				div.valAlert("show", "该产品名称已被注册!");
			}else{
				div.valAlert("hide");
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

function getDateTime(){
	var date = new Date();
	var str = date.getFullYear() + "-";
	str += (date.getMonth() + 1) + "-";
	str += date.getDate() + " ";
	str += date.getHours() + ":";
	str += date.getMinutes() + ":";
	str += date.getSeconds();
	return str;
}

function getProduct(productId,bool){
	Web.Method.ajax("product/getProduct",{
		data:{
			productId:productId
		},
		success:function(data){
			$("#analyticalWay").empty(); //清空解析方式
			var analyticalWayStr = "";
			$.each(joinTypeList, function(i,item){
				if(joinTypeList[i][1] == data.info.joinTypeId){
					analyticalWayStr += "<input type='radio' name='analyticalWay' class='analyticalWay' id=radio-3-"+ (i+1) +"-"+ (i+1) + " value="+ joinTypeList[i][0] +" /><label for=radio-3-"+ (i+1) +"-"+ (i+1) + "></label><span class='pp'>"+ joinTypeList[i][2] +"</span>";
				}
			});
			$("#analyticalWay").html(analyticalWayStr);
			$("input[name='analyticalWay'][value="+data.info.analyticalWayId+"]").attr("checked","checked");
			$("input[name='joinType'][value="+data.info.joinTypeId+"]").attr("checked","checked");
			
			if(bool > 0){//产品修改
				Web.Method.setValue("productId",data.info.id);
				Web.Method.setValue("code",data.info.code);
				Web.Method.setValue("productName",data.info.name);
				if(bool == 1){//产品详情
					$("input[name=joinType]").attr({"disabled":"disabled"});
					$("input[name=analyticalWay]").attr({"disabled":"disabled"});
					$("s[name=xl_productType]").hide();
				}
			}else{//产品复制
				Web.Method.setValue("copyFlag",data.info.iconurl);
				Web.Method.setValue("iconFile",data.info.iconurl);
			}
			Web.Method.setValue("serviceCode",data.info.serviceCode);
			Web.Method.setValue("model",data.info.model);
			Web.Method.setValue("chip",data.info.chip);
			Web.Method.setValue("productTypeDrop",data.info.producttypeId)
			$("#icon").attr({"src":data.info.iconurl});
			Web.Method.setValue("description",data.info.description);
			
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

function getDeviceAuthorizationList(page,productId){
	Web.Method.ajax("product/getDeviceAuthorizationList",{
		data:{
			page_flag:page,
			page_num:rs.pageNum,
			productId:productId
		},
		success:function(data){
			$("#pageset_deviceAuthorization").pageset("setData", {
				totalpage:data.totalpage,
				page:data.page
			});
			$("#listview_deviceAuthorization").listview("setData", data.info);
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

function toggleDiv(){ 
	$("#copyProduct_div").toggle();
	$("#deviceAuthorization").toggle();
	$("#saveAndCancel").toggle();
	$("#deviceAuthorizationList").toggle();
}

function clearAlert(){ //清除警告框
	var data = $("#product_infoForm").serializeJson(true);
	for(var key in data){
		var val = data[key];
		var div = $("#product_infoForm").find("div[name=validate_"+key+"]").valAlert({alert:"danger", style:"width:550px"});
		var label = div.find("label[class=fl]").text();
		div.valAlert("hide");
	}
};
