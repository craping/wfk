$(function(){
	$("#listview_sysParams").listview({
		style:"table-hover",
		headerStyle:"noborder",
		module:[
	        {name:"序号",width:"6%"},
	        {name:"参数名称",width:"16%"},
			{name:"参数值",width:"18%"},
			{name:"备注",width:"25%"},
			{name:"操作",width:"20%"}
		],
		eachItem:function(ui, item){
			for(var i in item){
				if(item[i]==null){
					item[i]="";
				}
			}
			var capacitys='<div class="system-table-list">'
                +'<ul>'
                +'<li><a href="javascript:;" class="operate-icon17 update_params" title="修改" name="'+item.paramName+'"></a></li>'
                +'<li><a href="javascript:;" class="operate-icon4 delete_params" title="删除" name="'+item.paramName+'"></a></li>'
                +'</ul>'
                +'</div>';
			var page = $("#pageset_sysParams").data("lishe.pageSet").options.pageSet.page-1;
			var date = new Date();
			date.setTime(item.regTime);
			var tr = $("<tr>" +
					    "<td width='4%'>"+(parseInt(item.indexKey) + page * rs.pageNum + 1)+"</td>" +
						"<td width='8%'>"+ item.paramName +"</td>" +
						"<td width='6%'>"+ item.paramValue +"</td>" +
						"<td width='10%'>"+ item.remark +"</td>" +
						"<td width='10%'>"+ capacitys+"</td>" +
					"</tr>");
			return tr;
		}
		
	});
	$("#pageset_sysParams").pageset({
		itemClick:function(page){
			querySysParamsList(page);
		}
	});
	querySysParamsList(1);
});


function querySysParamsList(page, listview, pageset){
	listview = listview?listview:$("#listview_sysParams");
	listview.listview("loading");
	Web.Method.ajax("sysParam/getParamList",{
		data:{
			page_flag:page,
			page_num:rs.pageNum,
		},
		success:function(data){
			pageset = pageset?pageset:$("#pageset_sysParams");
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

	$(document).on("click",".delete_params",function(){
		var param_del=$(this)
		var paramName=$(this).attr("name");
		Web.Method.ajax("sysParam/delParam",{
			data:{
				paramName:paramName
			},
			success:function(data){
				param_del.parents("tr").remove();
			},
			fail:function(data){
				$.confAlert({
					size:"sm",
					context:data.msg,
					noButton:false
				})
			}
		});
	});
	$(document).on("click",".update_params",function(){
		var paramName=$(this).attr("name");
		url='../system/update_sysParams.html?paramName='+paramName;
		url=encodeURI(url);
		window.location.href=url;
	});
