$(function(){
	$(document).keydown(function(event){
		if(event.keyCode == 13){
			queryList(1);	
			return false;
		}
	});
	
	$("#system-table").listview({
		style:"system-table",
		headerStyle:"noborder",
		module:[
	        {name:"<input type='checkbox' class='allmiddle'  >全选 ",width:"4%"},
	        {name:"现货编号",width:"5%"},
	        {name:"产品名称",width:"28%"},
	        {name:"面板品牌",width:"4%"},
	        {name:"面板型号",width:"10%"},
			{name:"面板尺寸",width:"3%"},
			{name:"面板组成",width:"5%"},
			{name:"分  辨  率",width:"4%"},
			{name:"对  比  度",width:"5%"},
			{name:"显示颜色",width:"5%"},
			{name:"应用产品",width:"4%"},
			{name:"操作"},
		],
		eachItem:function(ui, item){
			for(var i in item){
				if(item[i]==null){
					item[i]="";
				}
			}
			
			var page = $("#system-page").data("lishe.pageSet").options.pageSet.page-1;
			var html="<tr>";
			html+="<td width='3%'><input type='checkbox' accept='" + item.checkStatus + "' class='middle' value='"+item.id+"'></label></td>" ;
			html+="<td >"+ item.stockId +"</td>";
			html+="<td width='10%'>"+ item.productName +"</td>";
			html+="<td width='10%'>"+ item.brand +"</td>";
			html+="<td width='6%'>"+ item.model +"</td>";
			html+="<td width='6%' >"+ item.panelSize +"</td>";
			html+="<td width='6%' >"+ item.panelType +"</td>";
			html+="<td width='6%'>"+ item.resolution +"</td>";
			html+="<td width='6%'>"+ item.contrastRatio +"</td>";
			html+="<td width='6%'>"+ item.displayColor +"</td>";
			html+="<td width='6%'>"+ item.application +"</td>";
			
			html+="<td><div class='system-table-list'>";
			html+="<ul>";
			html+="<li value='"+item.id+"'><a target='iframe' href='javascript:;'  class='operate-icon23' target='iframe' title='详情'></a></li>";
			html+="<li><a target='iframe' href='product_audiProduct.html?proId="+ item.id +"' target='iframe' class='operate-icon4' title='删除'></a></li>";
			html+="<li><a target='iframe' href='product_edit.html?id="+ item.id +"' target='iframe' class='operate-icon17' title='修改'></a></li>";
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
	$(document).on("click","#clear",function(){
		$("#productform input[type='text']").each(function(){
			$(this).val("");
		});
	})
	
	queryList(1);
	
})

function queryList(page, listview, pageset, params){
	var options = {
		page_flag:page,
		page_num:10
	};
	var datas = $.extend(true,{},options,$("#productform").serializeJson());
	
	listview = listview?listview:$("#system-table");
	listview.listview("loading");
	Web.Method.ajax("product/getList",{
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