$(function(){
	$("#listview_manUsers").listview({
		style:"table-hover",
		headerStyle:"noborder",
		module:[
	        {name:"序号",width:"5%"},
	        {name:"管理员账号",width:"6%"},
			{name:"真实姓名",width:"8%"},
			{name:"手机号码",width:"10%"},
			{name:"邮箱",width:"10%"},
			{name:"创建日期",width:"12%"},
			{name:"状态",width:"8%"},
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
				status="停用";
				statusNum="1";
			}
			if(item.status=="1"){
				st_but = "class='operate-icon24 set_status' title='锁定'";
				status="启用"
			    statusNum="0";
			}
			var capacitys='<div class="system-table-list">'
                +'<ul>'
                +'<li><a href="javascript:;" class="operate-icon1 update_manUser" title="编辑" name="'+item.id +'"></a></li>'
                +'<li><a href="javascript:;" class="operate-icon20 manUser_role" title="权限" value="'+item.loginName+'" name="'+item.id +'"></a></li>'
                +'<li><a href="javascript:;"' +st_but+ 'name="'+item.id +'" value="'+statusNum+'"></a></li>'
                +'<li><a href="javascript:;" class="operate-icon27 resetPwd" title="重置密码" name="'+item.id +'"></a></li>'
                +'</ul>'
                +'</div>';
			
			var page = $("#pageset_manUsers").data("lishe.pageSet").options.pageSet.page-1;
			var date ='';
			var dateP='--';
			if(item.regTime!=""){
				date=new Date();
				date.setTime(item.regTime);
				dateP=date.format("yyyy/MM/dd");
			}
			var tr = $("<tr>" +
					    "<td width='4%'>"+(parseInt(item.indexKey) + page * rs.pageNum + 1)+"</td>" +
						"<td width='8%'>"+ item.loginName +"</td>" +
						"<td width='6%'>"+ item.userName +"</td>" +
						"<td width='10%'>"+ item.phone +"</td>" +
						"<td width='10%'>"+ item.email +"</td>" +
						"<td width='9%'>"+ dateP +"</td>" +
						"<td width='7%'>"+ status+"</td>" +
						"<td width='5%'>"+ capacitys+"</td>" +
					"</tr>");
			return tr;
		}
		
	});
	$("#pageset_manUsers").pageset({
		itemClick:function(page){
			queryManUserList(page);
		}
	});
	
	queryManUserList(1);
	$(document).on("click","#search_button",function(){
		queryManUserList(1);
	});
	
});


function queryManUserList(page, listview, pageset){
	var contName=$("#contName").val()==""?undefined:$("#contName").val();
	var status=$("#status").children().attr("value")==""?undefined:$("#status").children().attr("value");
	var firstTime=$("#firstTime").val()==""?undefined:$("#firstTime").val();
	var finallyTime=$("#finallyTime").val()==""?undefined:$("#finallyTime").val();
	listview = listview?listview:$("#listview_manUsers");
	listview.listview("loading");
	Web.Method.ajax("manUser/getUserList",{
		data:{
			page_flag:page,
			page_num:rs.pageNum,
			contName:contName,
			status:status,
			firstTime:firstTime,
			finallyTime:finallyTime
		},
		success:function(data){
			pageset = pageset?pageset:$("#pageset_manUsers");
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

	$(document).on("click",".resetPwd",function(){
		var id=$(this).attr("name");
		window.location.href="../system/man_reset_pwd.html?id="+id;
	});
	$(document).on("click",".update_manUser",function(){
		var id=$(this).attr("name");
		$("#manuser_id",parent.document).val(id);
		window.location.href="../system/update_manUser.html?id="+id;
	});
	$(document).on("click",".manUser_role",function(){
		var id=$(this).attr("name");
		var ln = $(this).attr("value");
		$("#manuser_id",parent.document).val(id);
		window.location.href="../system/update_manUser_role.html?id="+id+"&ln="+ln;
	});
	
	$(document).on("click",".set_status",function(){
		var $this=$(this);
		var athis=$(this).parents("td").prev();
		var id=$(this).attr("name");
		var status=$(this).attr("value");
		Web.Method.ajax("manUser/updateManUser", {
			data : {
				 id :id,
				 status:status
			},
			success : function(data) {
				if(status==0){
					$this.attr('value','1');
					athis.html('');
					athis.html("停用");
					$this.attr("class","operate-icon36 set_status");
					$this.attr("title","启用")
				}else if(status==1){
					$this.attr('value','0');
					athis.html('');
					athis.html("启用");
					$this.attr("class","operate-icon24 set_status");
					$this.attr("title","锁定")
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
	
