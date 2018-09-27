$(function(){
	$("#listview_sysSmsTemp").listview({
		style:"table-hover",
		headerStyle:"noborder",
		module:[
	        {name:"序号",width:"10%"},
	        {name:"短信模板内容",width:"40%"},
			{name:"应用场景",width:"15%"},
			{name:"状态",width:"15%"},
			{name:"操作",width:"20%"}
		],
		eachItem:function(ui, item){
			for(var i in item){
				if(item[i]==null){
					item[i]="";
				}
			}
			var st_but="";
			var status="";
			var statusNum="";
			if(item.status=="0"){
				st_but = "class='operate-icon36 set_status' title='启用'";
				status="无效";
				statusNum="1";
			}
			if(item.status=="1"){
				st_but = "class='operate-icon14 set_status' title='锁定'";
				status="有效"
			    statusNum="0";
			}
			var capacitys='<div class="system-table-list">'
                +'<ul>'
                +'<li><a href="javascript:;" class="operate-icon1 updateTemp" title="编辑" name="'+item.id +'"></a></li>'
                +'<li><a href="javascript:;"' +st_but+ 'name="'+item.id +'" value="'+statusNum+'"></a></li>'
                +'</ul>'
                +'</div>';
			
			var page = $("#pageset_sysSmsTemp").data("lishe.pageSet").options.pageSet.page-1;
			var tr = $("<tr>" +
					    "<td width='10%'>"+(parseInt(item.indexKey) + page * rs.pageNum + 1)+"</td>" +
						"<td width='40%'>"+ item.content +"</td>" +
						"<td width='15%'>"+ item.appScen +"</td>" +
						"<td width='15%'>"+ status +"</td>" +
						"<td width='20%'>"+ capacitys+"</td>" +
					"</tr>");
			return tr;
		}
		
	});
	$("#pageset_sysSmsTemp").pageset({
		itemClick:function(page){
			queryManUserList(page);
		}
	});
	
	queryManUserList(1);
	$(document).on("click","#search_button",function(){
		queryManUserList(1);
	});
	$(document).keyup(function(event){
		if(event.keyCode == 13){
			$("#search_button").trigger("click");
		}
	});
});


function queryManUserList(page, listview, pageset){
	var content=$("#content").val()==""?undefined:$("#content").val();
	var status=$("#status").children().attr("value")==""?undefined:$("#status").children().attr("value");
	listview = listview?listview:$("#listview_sysSmsTemp");
	listview.listview("loading");
	Web.Method.ajax("sms/smsTemlist",{
		data:{
			page_flag:page,
			page_num:rs.pageNum,
			content:content,
			status:status
		},
		success:function(data){
			pageset = pageset?pageset:$("#pageset_sysSmsTemp");
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

	$(document).on("click",".updateTemp",function(){
		window.location.href="../system/sys_update_smsTemp.html?id="+$(this).attr("name");
	});
	$(document).on("click",".set_status",function(){
		var $this=$(this);
		var athis=$(this).parents("td").prev();
		var id=$(this).attr("name");
		var status=$(this).attr("value");
		Web.Method.ajax("sms/updateSmsTem", {
			data : {
				 id :id,
				 status:status
			},
			success : function(data) {
				if(status==0){
					$this.attr('value','1');
					athis.html('');
					athis.html("无效");
					$this.attr("class","operate-icon36 set_status");
					$this.attr("title","启用")
				}else if(status==1){
					$this.attr('value','0');
					athis.html('');
					athis.html("有效");
					$this.attr("class","operate-icon14 set_status");
					$this.attr("title","暂停")
				}
			},
			fail : function(data) {
				$.confAlert({
					size:"sm",
					context:"服务器异常,请稍后再试!",
					noButton:false
				})
			}
		});	
	});
	
