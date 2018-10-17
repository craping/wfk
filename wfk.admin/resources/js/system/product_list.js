$(function(){
	$(document).keydown(function(event){
		if(event.keyCode == 13){
			queryList(1);	
			return false;
		}
	});
	
	if(Web.Method.GetQueryString("supIds")!=null){
		$("[name='supId']").val(Web.Method.GetQueryString("supIds"))
		$("[name='supName']").val(Web.Method.GetQueryString("supNames"));
	}
	
	$("#system-table").listview({
		style:"system-table",
		headerStyle:"noborder",
		module:[
	        {name:"<input type='checkbox' class='allmiddle'  >全选 ",width:"5%"},
	        {name:"序号",width:"3%"},
	        {name:"现货编号",width:"8%"},
			{name:"面板品牌",width:"14%"},
			{name:"通用等级",width:"6%"},
			{name:"现货数量",width:"5%"},
			{name:"面板尺寸",width:"5%"},
			{name:"分  辨  率",width:"5%"},
			{name:"显示模式",width:"7.5%"},
			{name:"表面处理",width:"7.5%"},
			{name:"面板亮度",width:"5%"},
			{name:"应用产品",width:"6%"},
			{name:"操作"},
		],
		eachItem:function(ui, item){
			for(var i in item){
				if(item[i]==null){
					item[i]="";
				}
			}
			var addTime=item.addTime==undefined||item.addTime==""?"--":new Date(item.addTime).format("yyyy/MM/dd");
			var checkTime=item.checkTime==undefined||item.checkTime==""?"--":new Date(item.checkTime).format("yyyy/MM/dd");
			var capacitys ='';
			var page = $("#system-page").data("lishe.pageSet").options.pageSet.page-1;
			var html="<tr>";

			html+="<td width='3%'><input type='checkbox' accept='" + item.checkStatus + "' class='middle' value='"+item.proId+"'></label></td>" ;
			html+="<td width='5%'>"+ (parseInt(item.indexKey)+1) +"</td>";
			
			html+="<td >"+ item.addInstName +"</td>";
			
			html+="<td width='10%'>"+ item.proName +"</td>";
			html+="<td width='6%'>"+ item.proNumber +"</td>";
			html+="<td width='6%' >"+ item.clsIdNd +"</td>";
			if(item.brand!=null && item.brand!=""){
				html+="<td width='6%'>"+ item.brand +"</td>";
			}else{
				html+="<td width='6%'>--</td>";
			}
			/*
			html+="<td width='6%' >"+ getclass(item.clsIdNd) +"</td>";
			html+="<td width='6%'>"+ getbrand(item.brand) +"</td>";*/
			
			if(item.rebateType == "1"){
				html+="<td >底价折算</td>";
			}else if(item.rebateType == "0"){
				html+="<td >总价返利</td>";
			}else{
				html+="<td >--</td>";
			} 
			html+="<td >"+ addTime+"</td>";
			html+="<td >"+ checkTime +"</td>";
			if(item.checkStatus == "0"){
				html +='<td>无效</td>';
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
			if(item.checkStatus == "2"){
				if(item.shelveStatus == 1){
					html+="<li value="+ item.proId +" class='dnshelve' ><a href='javascript:;' target='iframe' title='下架' class='operate-icon26'></a></li>";
				}else if(item.shelveStatus == 0){
					html+="<li value="+ item.proId +" class='topshelve' ><a href='javascript:;' target='iframe' title='上架' class='operate-icon25' ></a></li>";
				}
			}
			html+="<li value='"+item.proId+"'><a target='iframe' href='javascript:;'  class='operate-icon23' target='iframe' title='预览'></a></li>";
			/*html+="<li><a target='iframe' href='product_productDetails.html?proId="+ item.proId +"' value="+ item.attType +"  target='iframe' class='operate-icon2' title='详情' ></a></li>";*/
			html+="<li><a target='iframe' href='product_audiProduct.html?proId="+ item.proId +"' target='iframe' class='operate-icon9' title='审核'></a></li>";
			html+="</ul>";
			html+="</div> </td>";
			html+="</tr>";
			var tr = $(html);
			return tr;
		}
	});
	
	$(document).on("click",".operate-icon23",function(){
		var proId =  $(this).parent().attr("value");
		window.open("product_preview.html?proId="+ proId+"")
	})
	$(document).on("change","#supName",function(){
		 $("[name='supId']").val("");
	})
	//分页处理
	$("#system-page").pageset({
		itemClick:function(page){
			queryList(page);
		}
	});
	$(document).on("click","#ok",function(){
		queryList(1);
	})
	
	//上架 topshelve
	$(document).on("click",".topshelve",function(){
		var proId = $(this).attr("value");
		Web.Method.ajax("products/groundingByProduct",{
			data:{proId:proId,shelveStatus:1},
			success:function(data){
				 if(data.errcode == "0"){
					 $.confAlert({
							size:"sm",
							context:"上架成功",
							noButton:false ,
							onOk:function(){
								 queryList(1);
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
		Web.Method.ajax("products/groundingByProduct",{
			data:{proId:proId,shelveStatus:0},
			success:function(data){
				 if(data.errcode == "0"){
					 $.confAlert({
							size:"sm",
							context:"下架成功",
							noButton:false ,
							onOk:function(){
								 queryList(1);
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
			Web.Method.ajax("products/examineAllProduct",{
				data:{proId:middle,checkStatus:2},
				success:function(data){
					 if(data.errcode == "0"){
						 $.confAlert({
								size:"sm",
								context:"批量审核设置成功",
								noButton:false ,
								onOk:function(){
									$(".allmiddle").prop("checked","")
									 queryList(1);
								}
						})
					 }
				}
			});
			break;
		case "1":
			Web.Method.ajax("products/examineAllProduct",{
				data:{proId:middle,checkStatus:3},
				success:function(data){
					 if(data.errcode == "0"){
						 $.confAlert({
								size:"sm",
								context:"批量审核设置成功",
								noButton:false ,
								onOk:function(){
									$(".allmiddle").prop("checked","")
									 queryList(1);
								}
						})
					 } 
				} 
			});
			break;
		case "2":
			if(!flag) {
				alert("未通过审核的商品不能上架");
				return false;
			}
			Web.Method.ajax("products/groundingByAllProduct",{
				data:{proId:middle,shelveStatus:1},
				success:function(data){
					 if(data.errcode == "0"){
						 $.confAlert({
								size:"sm",
								context:"批量上架成功",
								noButton:false ,
								onOk:function(){
									 $(".allmiddle").prop("checked","")
									 queryList(1);
								}
						})
					 }
				}
			});
			break;
		case "3":
			Web.Method.ajax("products/groundingByAllProduct",{
				data:{proId:middle,shelveStatus:0},
				success:function(data){
					 if(data.errcode == "0"){
						 $.confAlert({
								size:"sm",
								context:"批量下架成功",
								noButton:false ,
								onOk:function(){
									 $(".allmiddle").prop("checked","")
									 queryList(1);
								}
						})
					 }
				}
			});
			break;
		case "4":
			location.href = Web.Recource.serverURL+"supProduct/productExport?Id="+middle;
			break;
		case "5":
			 alert(middle);
			break;
		default:
			alert("请选择一个操作");
			break;
		}
		 
	})
	
	queryList(1);
	
})



function queryList(page, listview, pageset, params){
	var options = {
		page_flag:page,
		page_num:rs.pageNum
	};
	var datas = $.extend(true,{},options,$("form").serializeJson());
	
	listview = listview?listview:$("#system-table");
	listview.listview("loading");
	Web.Method.ajax("products/getProductList",{
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
