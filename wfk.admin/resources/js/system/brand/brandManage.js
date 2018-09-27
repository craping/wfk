var rs = {
	params:[],
	pageNum:10
	
};

$(function(){
	$(document).keydown(function(event){
		if(event.keyCode == 13){
			querySupList(1);	
			return false;
		}
	});
	$("#system-table").listview({
		style:"table-hover",
		headerStyle:"noborder",
		module:[
	        {name:"<input type='checkbox' class='allmiddle'>全选 ",width:"8%"},
			{name:"品牌名称",width:"15%"},
			{name:"品牌logo",width:"10%"},
			{name:"所属一级分类",width:"10%"}, 
			{name:"状态",width:"10%"},
			{name:"操作"}
		],
		eachItem:function(ui, item){
			for(var i in item){
				if(item[i]==null){
					item[i]="";
				}
			}
			var capacitys ='';
			 
			var page = $("#system-page").data("lishe.pageSet").options.pageSet.page-1;
			var html="<tr>";
			html+="<td width='8%'><input type='checkbox' value='"+item.brandId+"' class='middle'></label></td>" ;
			html+="<td width='15%'>"+ item.brandName +"</td>";
			html+="<td width='10%'><img src='"+item.brandPic+"' width='35' height='35'></td>";
			html+="<td width='10%'>"+ item.clsOne +"</td>";
			html+="<td>";
			if(item.status == "1"){
				html+="有效";
			}else{
				html+="无效";
			}
			html+="</td>";
			html+="<td><div class='system-table-list'>";
			html+="<ul>";
			html+="<li><a href='product_updateBrand.html?brandId="+item.brandId+"'target='iframe' class='operate-icon1' title='修改'></a></li>";
			if(item.status == "1"){
				html+="<li><a href='javascript:;' value='"+item.brandId+"'target='iframe' class='removeBrand operate-icon14' title='设置为无效'></a></li>";
			}else{
				html+="<li><a href='javascript:;' value='"+item.brandId+"'target='iframe' class='updateBrandStatus operate-icon29' title='设置为有效'></a></li>";
			}
			html+="</ul>";
			html+="</div> </td>";
			html+="</tr>";
			var tr = $(html);
			return tr;
		}
	});
	
	
	//分页处理
	$("#system-page").pageset({
		itemClick:function(page){
			querySupList(page);
		}
	});
	$(document).on("click",".removeBrand",function(){
		var brandId = $(this).attr("value");
		if(confirm("确定要删除吗?")){
			Web.Method.ajax("/brand/removeTProdBrand",{
				data:{
					brandId:brandId,
					status:0
				},
				success:function(data){
					if(data.errcode == "0"){
						$.confAlert({
							size:"sm",
							context:"已设为无效",
							noButton:false,
							onOk:function(){
								location.reload();
							}
						})
					}else{
						$.confAlert({
							size:"sm",
							context:"失败",
							noButton:false 
						})
					}
				} 
			})
		}
	})
	
	$(document).on("click",".updateBrandStatus",function(){
		var brandId = $(this).attr("value");
		Web.Method.ajax("/brand/removeTProdBrand",{
			data:{
				brandId:brandId,
				status:1
			},
			success:function(data){
				if(data.errcode == "0"){
					$.confAlert({
						size:"sm",
						context:"已设为有效",
						noButton:false,
						onOk:function(){
							location.reload();
						}
					})
				}else{
					$.confAlert({
						size:"sm",
						context:"失败",
						noButton:false 
					})
				}
			} 
		})
	})
	querySupList(1);
	$(document).on("click","#addBrand",function(){
		window.location.href="../system/product_addBrand.html";
	})
	$(document).on("click","#brandOk",function(){
		querySupList(1);
	})
	
	$(document).on("click","#caozuo",function(){
		var action = $("#action").attr("value");
		var middle ='';
		if($(".middle:checked").length <= 0 ){
			alert("请选择品牌");
			return;
		}
		$(".middle:checked").each(function(){
			middle+=$(this).val()+",";
		})
		middle = middle.substring(0,middle.length-1);
		switch (action) {
		case "0":
			//无效
			Web.Method.ajax("brand/allRemoveBrand",{
				data:{id:middle,status:0},
				success:function(data){
					 if(data.errcode =="0"){
						 $.confAlert({
								size:"sm",
								context:"已设无效",
								noButton:false,
								onOk:function(){
									location.reload();
									$(".allmiddle").prop("checked","")
								}
						})
					 }
				} 
			});
			break;
		case "1":
			//有效
			Web.Method.ajax("brand/allRemoveBrand",{
				data:{id:middle,status:1},
				success:function(data){
					 if(data.errcode =="0"){
						 $.confAlert({
								size:"sm",
								context:"已设有效",
								noButton:false,
								onOk:function(){
									location.reload();
									$(".allmiddle").prop("checked","")
									
								}
						})
					 }
				} 
			});
			break;
		default:
			alert("请选择一个操作");
			break;
		}
	})
})
function querySupList(page, listview, pageset){
	var status=$("#status").attr("value")==""?undefined:$("#status").attr("value");
	
	listview = listview?listview:$("#system-table");
	listview.listview("loading");
	
	var options = {
			page_flag:page,
			page_num:rs.pageNum,
			status:status
		};
	var datas = $.extend(true,{},options,$("form").serializeJson());
	Web.Method.ajax("/brand/selectTProdBrand",{
		data:datas,
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