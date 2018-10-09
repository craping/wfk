function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]);
	return null;
}

$(function(){
	$(document).keydown(function(event){
		if(event.keyCode == 13){
			querySupList(1);	
			return false;
		}
	});
	$("#system-table").listview({
		style:"system-table",
		headerStyle:"noborder",
		module:[
	        {name:"<input type='checkbox' class='allmiddle'>全选",width:"6%"},
	        {name:"序号",width:"6%"},
			{name:"商品名称",width:"12%"},
			{name:"三级分类",width:"6%"},
			{name:"品牌",width:"6%"},
			{name:"返利方式",width:"6%"},
			{name:"返利比率",width:"6%"},
			{name:"库存",width:"6%"},
			{name:"总销量",width:"6%"},
			{name:"提交日期",width:"6%"},
			{name:"审核日期",width:"7.5%"},
			{name:"审核状态",width:"8%"},
			{name:"上下架",width:"8%"},
			{name:"操作"},
		],
		eachItem:function(ui, item){
			for(var i in item){
				if(item[i]==null){
					item[i]="";
				}
			}
			var date = new Date();
			date.setTime(item.addTime);
			date=date.format("yyyy/MM/dd");
			
			
			var chkdate;
			var chkdateP='--';
			if(item.checkTime!="" && item.checkTime!="null"){
				chkdate= new Date();
				chkdate.setTime(item.checkTime);
				chkdateP=chkdate.format("yyyy/MM/dd");
			}
			var capacitys ='';
			var page = $("#system-page").data("lishe.pageSet").options.pageSet.page-1;
			var html="<tr>";
			html+="<td><input type='checkbox' class='middle' accept='" 
				+ item.checkStatus + "' value='"+item.proId+"'></td>" ;
			html+="<td>"+(parseInt(item.indexKey)+1)+"</td>" ;
			html+="<td>"+ item.proName +"</td>";
			html+="<td>"+ item.clsIdNd +"</td>";
			if(item.brand!=null && item.brand!=""){
				html+="<td>"+ item.brand +"</td>";
			}else{
				html+="<td>--</td>";
			}
			if(item.rebateType == "1"){
				html+="<td>底价折算</td>";
			}else if(item.rebateType == "0"){
				html+="<td>总结返利</td>";
			}else{
				html+="<td>--</td>";
			}
			html+="<td>"+ item.proRebate +"</td>";
			html+="<td>"+ item.proStock +"</td>";
			html+="<td>"+ "0" +"</td>";
			html+="<td>"+ date +"</td>";
			html+="<td>"+ chkdateP +"</td>";
			if(item.checkStatus == "0"){
				html +='<td>待提交</td>';
			}else if(item.checkStatus == "1"){
				html +='<td>待审核</td>'; 
			}else if(item.checkStatus == "2"){
				html +='<td>审核通过</td>'; 
			}else if(item.checkStatus == "3"){
				html +='<td>审核不通过</td>'; 
			}else{
				html +='<td>编辑中</td>'; 
			}
			if(item.shelveStatus =="1"){
				html +='<td>上架</td>';
			}else if(item.shelveStatus =="0"){
				html +='<td>下架 </td>';
			}else{ 
				html +='<td>编辑中</td>'; 
			}
			html+="<td><div class='system-table-list'>";
			html+="<ul>";
			//1上架，0下架
			html+="<li><a  href='product_edit.html?proId="+ item.proId +"&r="+Math.random()+"' target='iframe'  title='编辑' class='operate-icon1'></a></li>";
			if(item.checkStatus == "2"){
				if(item.shelveStatus == 1){
					html+="<li value="+ item.proId +" class='dnshelve' ><a href='javascript:;' target='iframe' title='下架' class='operate-icon26'></a></li>";
				}else if(item.shelveStatus == 0){
					html+="<li value="+ item.proId +" class='topshelve' ><a href='javascript:;' target='iframe' title='上架' class='operate-icon25' ></a></li>";
				}
			}
			html+="<li value='"+item.proId+"'><a target='iframe' href='javascript:;'  class='operate-icon23' target='iframe' title='预览'></a></li>";
			html+="<li><a target='iframe' href='freight.html?tid="+item.areaTemp+"&supId="+$("#supId",parent.document).val()+"' class='operate-icon8 setFreight' target='iframe' title='编辑模板'></a></li>";
			/*html+="<li><a target='iframe' href='product_details.html?proId="+ item.proId +"' value="+ item.attType +"  target='iframe' class='operate-icon2' title='详情'></a></li>";*/
			html+="</ul>";
			html+="</div> </td>";
			html+="</tr>";
			var tr = $(html);
			return tr;
		}
	});
	classClassThree();
	//分页处理
	$("#system-page").pageset({
		itemClick:function(page){
			querySupList(page);
		}
	});
	$(document).on("click","#ok",function(){
		querySupList(1);
	})
	
	
	//上架 topshelve
	$(document).on("click",".topshelve",function(){
		var proId = $(this).attr("value");
		Web.Method.ajax("/supProduct/groundingByProduct",{
			
			data:{productId:proId,shelveStatus:1},
			success:function(data){
				 if(data.errcode == "0"){
					 $.confAlert({
							size:"sm",
							context:"上架成功",
							noButton:false ,
							onOk:function(){
								 querySupList(1);
							}
					})
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
	})
	//下架 dnshelve
	$(document).on("click",".dnshelve",function(){
		var proId = $(this).attr("value");
		Web.Method.ajax("/supProduct/groundingByProduct",{
			data:{productId:proId,shelveStatus:0},
			success:function(data){
				 if(data.errcode == "0"){
					 $.confAlert({
							size:"sm",
							context:"下架成功",
							noButton:false ,
							onOk:function(){
								 querySupList(1);
							}
					})
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
	})
	
	$(document).on("click","#actionOk",function(){
		var action = $("#action").attr("value");
		var middle ='';
		var flag = true;
		if($(".middle:checked").length <= 0 ){
			alert("请选择商品");
			return;
		}
		$(".middle:checked").each(function(){
			middle+=$(this).val()+",";
			if($(this).attr("accept") != '2') flag = false;
		})
		middle = middle.substring(0,middle.length-1);
		switch (action) {
		case "0":
			location.href = Web.Recource.serverURL+"supProduct/productExport?Id="+middle;
			break;
		case "1":
			if(!flag) {
				alert("未通过审核的商品不能上架");
				return false;
			}
			Web.Method.ajax("supProduct/groundingByAllProduct",{
				data:{productId:middle,status:1},
				success:function(data){
					 if(data.errcode == "0"){
						 $.confAlert({
								size:"sm",
								context:"批量上架成功",
								noButton:false ,
								onOk:function(){
									 $(".allmiddle").prop("checked","")
									 querySupList(1);
								}
						})
					 }
				}
			});
			break;
		case "2":
			Web.Method.ajax("supProduct/groundingByAllProduct",{
				data:{productId:middle,status:0},
				success:function(data){
					 if(data.errcode == "0"){
						 $.confAlert({
								size:"sm",
								context:"批量下架成功",
								noButton:false ,
								onOk:function(){
									 $(".allmiddle").prop("checked","")
									 querySupList(1);
								}
						})
					 }
				} 
			});
			break;
		case "3":
			window.location.href="freight.html?proId="+middle;
			break;
		default:
			alert("请选择一个操作");
			break;
		}
		 
	})
	
	querySupList(1);
	
	$("#pros").click(function(){
		$("input[name='pros']").click();
	});
	
	$("input[name='pros']").change(function(){
		$("#pros").text($(this).val());
	});
	
})

function mudelExport(){
	location.href = Web.Recource.serverURL+"supProduct/mudelExport";
}

function getbrand(brand){
	var name="";
	Web.Method.ajax("/brandSupplier/selectTProdBrand",{
		data:{brandId:brand},
		async: false,
		success:function(data){
			if(data.info.length > 0){
				name = data.info[0].brandName;
			}
			
		} 
	});
	//alert(name)
	return name;
}
function getclass(classid){
	var name="";
	Web.Method.ajax("/classifySupplier/selectBaseClassify",{
		async: false,
		data:{
			classifyLevel:3,
			classifyId:classid
		},
		success:function(data){
			if(data.info.length>0){
				name = data.info[0].classifyName;
			}
			
		} 
	});
	return name;
}
function classClassThree(){
	Web.Method.ajax("/classifySupplier/selectBaseClassify",{
		data:{
			classifyLevel:3,
			status:1
		},
		success:function(data){
			$.each(data.info,function(i,j){
				rs.clsIdNd[j.classifyId]=j.classifyName;
			});
		}
	});
}
function querySupList(page, listview, pageset,params){
	var options = {
			page_flag:page,
			page_num:rs.pageNum
		};
	var datas = $.extend(true,{},options,$("#productform").serializeJson());
	
	listview = listview?listview:$("#system-table");
	listview.listview("loading");
	Web.Method.ajax("/supProduct/getProductList",{
		data: datas,
		success:function(data){
			pageset = pageset?pageset:$("#system-page");
			pageset.pageset("setData", {
				totalpage:data.totalpage,
				page:data.page,
				totalnum:data.totalnum
			});
			
			listview.listview("setData", data.info);
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

function importPros(){
	if($("input[name='pros']").val() == ""){
		alert("请选择excel文件！")
		return false;
	}
	$("#importPros").ajaxSubmit({
		iframe:true,
		dataType:"json",
		data: {},
		url:Web.Recource.serverURL +"/supProduct/importExcel?"+$("#importPros").serializeJson(),
		success: function(data){
			if(data.errcode =="0"){
				alert("导入成功")
				$("input[name='pros']").val("");
				location.reload();
			}
		}, error: function(data){
			$.confAlert({
				size:"sm",
				context:"导入失败",
				noButton:false
			})
		}
	});
}

// 添加商品
$(document).on("click","#addProdBtn",function(){
	window.location.href = "../supplier/product_publish.html";
})
// 预览
$(document).on("click",".operate-icon23",function(){
	var proId =  $(this).parent().attr("value");
	window.open("../system/product_preview.html?proId="+ proId+"")
})