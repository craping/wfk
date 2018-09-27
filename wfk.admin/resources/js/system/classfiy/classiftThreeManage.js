var rs = {
	params:[],
	pageNum:10
};
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
			var capacitys ='';
			 
			var page = $("#system-page").data("lishe.pageSet").options.pageSet.page-1;
			var html="<tr>";
			html+="<td width='8%'><input type='checkbox' value='"+item.classifyId+"' class='middle'></label></td>" ;
			html+="<td width='10%'>"+ item.classifyName +"</td>";
			html+="<td width='10%'>"+ item.classifyLevel +"</td>";
			html+="<td width='10%'>"+ item.seq +"</td>";
			html+="<td>";
			
			if(item.status == "1"){
				html+="有效";
			}else{
				html+="无效";
			}
			html+="</td>";
			html+="<td><div class='system-table-list'>";
			html+="<ul>";
			html+="<li><a href='product_updateClassThree.html?classId="+ item.classifyId +"' target='iframe' class='operate-icon1' title='修改' ></a></li>";
			if(item.status == "1"){
				html+="<li><a href='javascript:;' value="+ item.classifyId +"  target='iframe' class='removeClass operate-icon14' title='设置为无效'></a></li>";
			}else{
				html+="<li><a href='javascript:;' value="+ item.classifyId +"  target='iframe' class='updateStatusClass operate-icon29' title='设置为有效'></a></li>";
			}
			html+="<li><a href='product_relateAttributeMamage.html?classId="+ item.classifyId +"'  target='iframe' class='operate-icon33' title='关联属性类别' ></a></li>";
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
	//无效分类
	$(document).on("click",".removeClass",function(){
		var classId=$(this).attr("value");
		if(confirm("确定要删除吗?")){
			Web.Method.ajax("/classify/removeClassify",{
				
				data:{
					classifyId:classId,
					status:0
				},
				success:function(data){
					 if(data.errcode =="0"){
						 $.confAlert({
								size:"sm",
								context:"已设无效",
								noButton:false,
								onOk:function(){
									querySupList(1);
								}
						})
					 }
				},
			});
		}
	})
	//有效分类
	$(document).on("click",".updateStatusClass",function(){
		var classId=$(this).attr("value");
		if(confirm("确定要撤销删除吗?")){
			Web.Method.ajax("/classify/removeClassify",{
				data:{
					classifyId:classId,
					status:1
				},
				success:function(data){
					 if(data.errcode =="0"){
						 $.confAlert({
								size:"sm",
								context:"已设有效",
								noButton:false,
								onOk:function(){
									querySupList(1);
								}
						})
					 }
				},
			});
		}
	})
	$(document).on("click","#addClass",function(){
		window.location.href="../system/product_addClassThree.html";
	})
	querySupList(1);
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


function querySupList(page, listview, pageset){
	listview = listview?listview:$("#system-table");
	listview.listview("loading");
	var status=$("#status").attr("value")==""?undefined:$("#status").attr("value");
	var parentId =$("#parentId").val()==""?undefined:$("#parentId").val();
	var options = {
			page_flag:page,
			page_num:rs.pageNum,
			classifyLevel:3,
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