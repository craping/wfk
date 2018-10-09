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
	$("#parentId").val(GetQueryString("classId"));
	$("#system-table").listview({
		style:"table-hover",
		headerStyle:"noborder",
		module:[
	        {name:"<input type='checkbox' class='allmiddle'>全选 ",width:"8%"},
			{name:"分类名称",width:"20%"},
			{name:"分类等级",width:"10%"},
			{name:"排序",width:"10%"}, 
			{name:"状态",width:"10%"},
			{name:"操作"}
		],
		eachItem:function(ui, item){
			for(var i in item){
				if(item[i]==null){
					item[i]="";
				}
			}
			
			var page = $("#system-page").data("lishe.pageSet").options.pageSet.page-1;
			var html="<tr>";
			html+="<td width='8%'><input type='checkbox' value='"+item.classifyId+"' class='middle'></label></td>" ;
			html+="<td width='10%'>"+ item.classifyName +"</td>";
			html+="<td width='10%'>"+ item.classifyLevel +"</td>";
			html+="<td width='10%'>"+ item.seq +"</td>";
			html+="<td>";
			
			if(item.status == "1"){
				html+="<span value='"+item.classifyId+"'>有效</span>";
			}else{
				html+="<span value='"+item.classifyId+"'>无效</span>";
			}
			
			html+="</td>";
			html+="<td><div class='system-table-list'>";
			html+="<ul>";
			html+="<li><a href='product_updateClassifyTwo.html?classId="+ item.classifyId +"' value="+ item.classifyId +" target='iframe' class='operate-icon1' title='修改'></a></li>";
			if(item.status == "1"){
				html+="<li><a href='javascript:;' value="+ item.classifyId +"  target='iframe' class='invalidClass operate-icon14' title='设置为无效'></a></li>";
			}else{
				html+="<li><a href='javascript:;' value="+ item.classifyId +"  target='iframe' class='validClass operate-icon29' title='设置为有效'></a></li>";
			}
			
			html+="<li><a href='product_classify_manageThree.html?classId="+ item.classifyId +"' target='iframe' class='operate-icon18' title='查看三级分类' ></a></li>";
			html+="<li><a href='product_addClassifyTwoAndThree.html?classid="+ item.classifyId +"' target='iframe' class='operate-icon19' title='添加三级分类'></a></li>";
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
	
	//无效分类
	$(document).on("click",".invalidClass",function(){
		var classId=$(this).attr("value");
		if(confirm("确定要设置无效吗?")){
			setStatus({classifyId:classId, status:0},this,"invalid");
		}
	})
	
	//有效分类
	$(document).on("click",".validClass",function(){
		var classId=$(this).attr("value");
		setStatus({classifyId:classId, status:1},this,"valid");
	})
	
	//添加二级
	$(document).on("click","#addClasss",function(){
		window.location.href="../system/product_addClassifyTwo.html"
	})
	
	$(document).on("click","#classOK" , function(){
		querySupList(1);
	})
	
	$(document).on("click","#caozuo",function(){
		var action = $("#action").attr("value");
		var middle ='';
		if($(".middle:checked").length <= 0 ){
			alert("请选择分类");
			return;
		}
		$(".middle:checked").each(function(){
			middle+=$(this).val()+",";
		})
		middle = middle.substring(0,middle.length-1);
		switch (action) {
		case "0":
			//无效
			Web.Method.ajax("classify/allRemoveClass",{
				data:{id:middle,status:0},
				success:function(data){
				 if(data.errcode =="0"){
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
			Web.Method.ajax("classify/allRemoveClass",{
				data:{id:middle,status:1},
				success:function(data){
				 if(data.errcode =="0"){
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
	Web.Method.ajax("/classify/removeClassify",{
		async:false,
		data:data,
		success:function(data){
			$.confAlert({
				size:"sm",
				context:"操作成功",
				noButton:false,
				onOk:function(){
					if(type=="invalid"){
						$this.attr("class", "validClass operate-icon29");
						$("span[value='"+ val +"']").html("无效");
					}else if(type=="valid"){
						$this.attr("class", "invalidClass operate-icon14");
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
	listview = listview?listview:$("#system-table");
	listview.listview("loading");
	var status=$("#status").attr("value")==""?undefined:$("#status").attr("value");
	var parentId =$("#parentId").val()==""?undefined:$("#parentId").val();
	var options = {
			page_flag:page,
			page_num:rs.pageNum,
			classifyLevel:2,
			status:status,
			parentId:parentId
		};
	var datas = $.extend(true,{},options,$("form").serializeJson());
	Web.Method.ajax("/classify/selectBaseClassify",{
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