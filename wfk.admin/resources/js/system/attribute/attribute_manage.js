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
	        {name:"<input type='checkbox' class='allmiddle'>全选 ",width:"11%"},
			{name:"属性组名称",width:"22%"},
			{name:"状态",width:"11%"},
			{name:"操作"},
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
			html+="<td width='11%'><input type='checkbox' class='middle' value='"+item.attType+"'></label></td>" ;
			html+="<td width='22%'>"+ item.typeName +"</td>";
			html+="<td width='11%'>";
			
			if(item.status == "0"){
				html+="<span value='"+item.attType+"'>有效</span>";
			}else if(item.status == "1"){
				html+="<span value='"+item.attType+"'>无效</span>";
			}
			html+="</td>";
			html+="<td><div class='system-table-list'>";
			html+="<ul>";
			html+="<li><a href='product_updateAttributeType.html?attId="+ item.attType +"' value="+ item.attType +" target='iframe' class='operate-icon1' title='编辑'></a></li>";
			
			if(item.status == "0"){
				html+="<li><a href='javascript:;' value="+ item.attType +" attr='"+ item.typeName +"'  class='removeAttributeTypeWindos operate-icon14' title='设置无效'></a></li>";
			}else if(item.status == "1"){
				html+="<li><a href='javascript:;' value="+ item.attType +" attr='"+ item.typeName +"'  class='statusAttributeTypeWindos operate-icon29' title='设置有效'></a></li>";
			}
			html+="<li><a href='product_overAttributeList.html?attId="+ item.attType +"' value="+ item.attType +"  target='iframe' class='operate-icon32' title='查看属性组'></a></li>";
			html+="<li><a href='product_addAttribute.html?attId="+ item.attType +"' target='iframe' class='operate-icon35 ' title='添加属性'></a></li>";
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
	querySupList(1);
	
	//设属性类别状态为无效
	$(document).on("click",".removeAttributeTypeWindos",function(){
		var attId=$(this).attr("value");
		updateAttType({attTypeId:attId,status:1},this,"invalid");
	});
	
	//设属性类别状态为有效
	$(document).on("click",".statusAttributeTypeWindos",function(){
		var attId=$(this).attr("value");
		updateAttType({attTypeId:attId,status:0},this,"valid");
	});
	
	//  添加属性
	$(document).on("click","#addAttributeType",function(){
		window.location.href = "../system/product_addAttributeType.html";
	});
	
	// 查询属性列表
	$(document).on("click","#attributeOk",function(){
		querySupList(1); 
	})
	
	// 批量修改
	$(document).on("click","#caozuo",function(){
		var action = $("#action").attr("value");
		var middle ='';
		if($(".middle:checked").length <= 0 ){
			alert("请选择属性类型");
			return;
		}
		$(".middle:checked").each(function(){
			middle+=$(this).val()+",";
		})
		middle = middle.substring(0,middle.length-1);
		switch (action) {
			case "0": //无效
				Web.Method.ajax("attribute/allRemoveType",{
					data:{id:middle,status:1},
					success:function(data){
						if(data.errcode == "0"){
							$.confAlert({
								size:"sm",
								context:"已设无效",
								noButton:false,
								onOk:function(){
									querySupList(1);
									$(".allmiddle").prop("checked","")
								}
							})
						}
					}
				});
				break;
			case "1": //有效
				Web.Method.ajax("attribute/allRemoveType",{
					data:{id:middle,status:0},
					success:function(data){
						 if(data.errcode == "0"){
							 $.confAlert({
								size:"sm",
								context:"已设有效",
								noButton:false,
								onOk:function(){
									querySupList(1);
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
	listview = listview?listview:$("#system-table");
	listview.listview("loading");
	var options = {
		page_flag:page,
		page_num:rs.pageNum
	};
	var datas = $.extend(true,{},options,$("form").serializeJson());
	Web.Method.ajax("/attribute/selectFeaAttributeType",{
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

//修改属性类别
function updateAttType(data,target,type){
	var $this = $(target);
	var val = $this.attr("value");
	Web.Method.ajax("/attribute/updateAttributeType",{
		async:false,
		data:data,
		success:function(data){
			$.confAlert({
				size:"sm",
				context:"操作成功",
				noButton:false,
				onOk:function(){
					if(type=="invalid"){
						$this.attr("class", "statusAttributeTypeWindos operate-icon29");
						$("span[value='"+ val +"']").html("无效");
					}else if(type=="valid"){
						$this.attr("class", "removeAttributeTypeWindos operate-icon14");
						$("span[value='"+ val +"']").html("有效");
					}
				}
			})
		},
		fail:function(data){
			$.confAlert({
				size:"sm",
				context:data.msg,
				noButton:false
			});
		}
	});
}