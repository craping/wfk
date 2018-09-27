//获取url 的参数
function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]);
	return null;
}
$(function(){
	$("#system-table").listview({
		style:"table-hover",
		headerStyle:"noborder",
		module:[
	        {name:"<input type='checkbox' class='allmiddle'>全选 ",width:"11%"},
			{name:"属性名称",width:"22%"},
			{name:"状态",width:"11%"},
			{name:"操作"},
		],
		eachItem:function(ui, item){
			for(var i in item){
				if(item[i]==null){
					item[i]="";
				}
			}
			var html="<tr>";
			html+="<td width='11%'><input type='checkbox' value='"+item.attId+"' class='middle'></label></td>" ;
			html+="<td width='22%'>"+ item.attName +"</td>";
			html+="<td width='11%'>";
			
			if(item.status == "1"){
				html+="<span value='"+item.attId+"'>有效</span>";
			}else{
				html+="<span value='"+item.attId+"'>无效</span>";
			}
			
			html+="</td>";
			html+="<td><div class='system-table-list'>";
			html+="<ul>";
			html+="<li><a href='product_updateAttribute.html?attId="+ item.attId +"&typeid="+$("attid").attr("value")+"' value="+ item.attType +" target='iframe' class='operate-icon1' title='修改'></a></li>";
			
			if(item.status == 1){
				html+="<li><a href='javascript:;' value="+ item.attId +"  target='iframe' class='invalidAttrType operate-icon14' title='设置为无效'></a></li>";
			}else{
				html+="<li><a href='javascript:;' value="+ item.attId +"  target='iframe' class='validAttrType operate-icon29' title='设置为有效'></a></li>";
			}
			
			html+="</ul>";
			html+="</div> </td>";
			html+="</tr>";
			
			var tr = $(html);
			return tr;
		}
	});
	
	// 无效设置
	$(document).on("click",".invalidAttrType",function(){
		var val = $(this).attr("value");
		setStatus({attributeId:val,status:0},this,"invalid");
	});
	
	// 有效设置
	$(document).on("click",".validAttrType",function(){
		var val = $(this).attr("value");
		setStatus({attributeId:val,status:1},this,"valid");
	})
	
	var attId=GetQueryString("attId");
	$("attId").attr("value",attId);
	querySupList(1);
	
	$(document).on("click","#OK",function(){
		querySupList(1);
	})
	
	$(document).on("click","#addattributebution",function(){
		var attid=$("attId").attr("value");
		window.location.href="../system/product_addAttribute.html?attId="+attId;
	})
	
	$(document).on("click","#returnAtt",function(){
		window.location.href="../system/product_attribute_manage.html";
	})
	
	$(document).on("click","#caozuo",function(){
		var action = $("#action").attr("value");
		var middle ='';
		if($(".middle:checked").length <= 0 ){
			$.confAlert({
				size:"sm",
				context:"请选择属性",
				noButton:false 
			})
			return;
		}
		$(".middle:checked").each(function(){
			middle+=$(this).val()+",";
		})
		middle = middle.substring(0,middle.length-1);
		switch (action) {
		case "0":
			//无效
			Web.Method.ajax("attribute/allRemoveAtt",{
				data:{id:middle,status:0},
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
		case "1":
			//有效
			Web.Method.ajax("attribute/allRemoveAtt",{
				data:{id:middle,status:1},
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

// 分类状态设置 
function setStatus(data,target,type){
	var $this = $(target);
	var val = $this.attr("value");
	Web.Method.ajax("attribute/updateAttribute",{
		async:false,
		data:data,
		success:function(data){
			$.confAlert({
				size:"sm",
				context:"操作成功",
				noButton:false,
				onOk:function(){
					if(type=="invalid"){
						$this.attr("class", "validAttrType operate-icon29");
						$("span[value='"+ val +"']").html("无效");
					}else if(type=="valid"){
						$this.attr("class", "invalidAttrType operate-icon14");
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

function querySupList(page, listview, pageset){
	var attType=GetQueryString("attId");
	var status=$("#status").attr("value")==""?undefined:$("#status").attr("value");
	var attName=$("#attName").val()==""?undefined:$("#attName").val();
	listview = listview?listview:$("#system-table")
	listview.listview("loading");
	Web.Method.ajax("/attribute/selectFeaAttribute",{
		data:{
			attType:attType,
			status:status,
			attName:attName
			},
		success:function(data){
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