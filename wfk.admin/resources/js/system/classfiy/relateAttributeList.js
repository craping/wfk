function get(name) {
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
	
	$("classid").attr("value",get("classId"));
	var attCls = attClassAtt($("classid").attr("value"));
	$("#system-table").listview({
		style:"table-hover",
		headerStyle:"noborder",
		module:[
	       // {name:"<input type='checkbox' class='allmiddle'>全选 ",width:"11%"},
	        {name:"序号",width:"22%"},
			{name:"属性类别",width:"22%"},
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
			//html+="<td width='11%'><input type='checkbox' class='middle'></label></td>" ;
			html+="<td width='11%'>"+ item.attType +"</td>";
			html+="<td width='11%'>"+ item.typeName +"</td>";
			html+="<td><div class='system-table-list'>";
			html+="<ul>";
		 
			var j = 0 ;
			for (var i = 0; i < attCls.info.length; i++) {
				if(item.attType == attCls.info[i].attType){
					html+="<li value='"+item.attType+"'><a href='javascript:;' class='operate-icon4 removeClassAttType' title='删除添加'></a></li>";
					j = 1
					break ; 
				}
			}
			if(j == 0){
				html+="<li value='"+item.attType+"'><a href='javascript:;' class='addClassAttType operate-icon3' title='添加分类属性'></a></li>";
			}
			html+="<li><a href='product_relateAttribute.html?attId="+ item.attType +"&classId="+$("classid").attr("value")+"' target='iframe' class='operate-icon22' title='查看关联属性列表' ></a></li>";
			html+="</ul>";
			html+="</div> </td>";
			html+="</tr>";
			var tr = $(html);
			return tr;
		}
	});
	//添加属性关联
	$(document).on("click",".addClassAttType",function(){
		var classid = $("classid").attr("value");
		var attType = $(this).parent().attr("value");
		var target=$(this);
		var parame={atttype:attType,classifyId:classid}
		Web.Method.ajax("/classify/addClassAttType",{
			data:parame,
			success:function(data){
				if(data.errcode == "0"){
					$.confAlert({
						size:"sm",
						context:"添加成功",
						noButton:false,
						onOk:function(){
							location.reload();
						}
					})
				}
			},
			fail:function(data){
				alert(data.msg);
			}
		});
		 
	})
	
	//删除属性关联
	$(document).on("click",".removeClassAttType",function(){
		var classid = $("classid").attr("value");
		var attType = $(this).parent().attr("value");
		var target=$(this);
		var parame={atttype:attType,classifyId:classid}
		Web.Method.ajax("/classify/removeAttributeData",{
			data:parame,
			success:function(data){
				if(data.errcode == "0"){
					$.confAlert({
						size:"sm",
						context:"删除成功",
						noButton:false,
						onOk:function(){
							target.attr("class", "addClassAttType operate-icon3");
							target.attr("title", "添加分类属性");
						}
					})
				}
			},
			fail:function(data){
				alert(data.msg);
			}
		}); 
	})
	
	//分页处理
	$("#system-page").pageset({
		itemClick:function(page){
			querySupList(page);
		}
	});
	
	querySupList(1);
 
	//返回
	$(document).on("click","#retrunClass",function(){
		window.location.href = "../system/product_classify_manageThree.html";
	})
	
	$(document).on("click","#AttributeOk",function(){
		querySupList(1);
	})
})




function querySupList(page, listview, pageset){
	listview = listview?listview:$("#system-table");
	listview.listview("loading");
	var attTypeName = $("#attTypeName").val()==""?undefined:$("#attTypeName").val();
	var options = {
			page_flag:page,
			page_num:rs.pageNum,
			attTypeName:attTypeName
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

function attClassAtt(classId){
	var claAtt;
	Web.Method.ajax("/classify/resultClassAttType",{
		async:false,
		data:{classifyId:classId},
		success:function(data){
			claAtt = data;
		},fail:function(data){
		}
	});
	return claAtt;
}