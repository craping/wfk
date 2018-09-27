$(function(){
	$("#batchExport").val("");
	$("#listview_comUser").listview({
		style:"table-hover",
		headerStyle:"noborder",
		module:[
			{name:"企业名称"},
			{name:"行业类型"},
			{name:"企业负责人",width:"7%"},
			{name:"联系方式",width:"8%"},
			{name:"可用积分",width:"6%"},
			{name:"冻结积分",width:"6%"},
			{name:"注册日期",width:"12%"},
			{name:"登陆次数",width:"6%"},
			{name:"最后登陆时间",width:"12%"},
			{name:"审核状态",width:"6%"},
			{name:"操作"}
		],
		eachItem:function(ui, item){
			for(var i in item){
				if(item[i]==null){
					item[i]="";
				}
			}
			var regTime=item.regTime==undefined||item.regTime==''?"--":new Date(item.regTime).format("yyyy/MM/dd HH:mm:ss");
			var loginTime=item.loginTime==undefined||item.loginTime==''?"--":new Date(item.loginTime).format("yyyy/MM/dd HH:mm:ss");
			var page = $(".system-page").data("lishe.pageSet").options.pageSet.page-1;
			var audStatus = "";
			if(item.audStatus == 0){
				audStatus = "未审核";
			}else if(item.audStatus == 1){
				audStatus = "审核不通过";
			}else{
				audStatus = "审核通过";
			}
			var tr = $("<tr>" +
						"<td>" + item.coName + "</td>" +
						"<td>" + item.industry + "</td>" +
						"<td>" + item.contName + "</td>" +
						"<td>" + item.mobile + "</td>" +
						"<td>" + item.avaIntegral + "</td>" +
						"<td>" + item.congealIntegral + "</td>" +
						"<td>" + regTime + "</td>" +
						"<td>" + item.loginNum + "</td>" +
						"<td>" + loginTime+ "</td>" +
						"<td>" + audStatus + "</td>" +
						"<td><div class='system-table-list'>" +
						"<ul>" + 
		                    "<li><a href='javascript:;' class='operate-icon9' title='审核' value='" + item.comId + "' name='"+item.audStatus+"'></a></li>" +
		                    "<li><a href='javascript:;' class='operate-icon40' title='员工列表' value='" + item.comId + "' name='"+item.coName+"'></a></li>" +
		                    "<li><a href='javascript:;' class='operate-icon41' title='企业详情' value='" + item.comId + "'></a></li>" +
		                    "<li><a href='javascript:;' class='operate-icon42 capitalDetails' title='资金明细' name='"+item.comId+"' value='"+item.coName+"'></a></li>" +
		                    "<li><a href='javascript:;' class='operate-icon43 recomDetails' title='推荐统计'name='"+item.comId+"' value='"+item.coName+"'></a></li>" +
		                "</ul>" +
		                "</div></td>" +
						"</tr>");
			return tr;
		}
	});
	queryComUserList(1);
	queryDict();
	$(".system-page").pageset({
		itemClick:function(page){
			queryComUserList(page);
		}
	});
	
	$("#query_submit").click(function(){
		queryComUserList(1)
	});

	$(".batchConfirm").bind("click", function(){
		var setVal = $(this).find("dt").find("a").attr("value");
		if(setVal.length > 0){
			$("#handler_submit").css("background","#aa3231").prop("disabled",false);
		}else{
			$("#handler_submit").css("background","#898989").prop("disabled",true);
		}
	})
	//导出
	$(".system-btn").click(function(){
		batchExport();
	});
	
	//企业详情
	$(".system-table").delegate(".operate-icon41", "click", function(){
		window.location.href="../system/com_user_details.html?comId=" + $(this).attr("value");
	});
	
	//审核
	$(".system-table").delegate(".operate-icon9", "click", function(){
		var audStatus = $(this).attr("name");
		if(audStatus == 1 || audStatus ==2){
			$.confAlert({
				size:"sm",
				context:"此企业已经审核过了" ,
				noButton:false
			})
			return;
		}
		window.location.href="../system/com_user_audit.html?comId=" + $(this).attr("value");
	});
	
	//员工列表
	$(".system-table").delegate(".operate-icon40", "click", function(){
		var comId = $(this).attr("value");
		var coName=$(this).attr("name");
		window.location.href="../system/sys_userList.html?comId="+comId+"&coName="+escape(coName);
	});
	
	//回车搜索
	$(document).keyup(function(event){
		if(event.keyCode == 13){
			$("#query_submit").trigger("click");
		}
	});
})	

	function queryComUserList(page, listview, pageset){
		var options = {
				page_flag:page,
				page_num:rs.pageNum
			};
		$("#industry").val($(".industry").find("dt").find("a").attr("value"));
		$("#audStatus").val($(".audStatus").find("dt").find("a").attr("value"));
		var datas = $.extend(true,{},options,$("form").serializeJson());
		listview = listview?listview:$("#listview_comUser");
		listview.listview("loading");
		Web.Method.ajax("comUserBack/findComUserList",{
			data:datas,
			success:function(data){
				pageset = pageset?pageset:$(".system-page");
				pageset.pageset("setData", {
					totalpage:data.totalpage,
					totalnum:data.totalnum,
					page:data.page
				});
				listview.listview("setData", data.info);
			},
			fail:function(data){
				$.confAlert({
					size:"sm",
					context:data.msg ,
					noButton:false
				})
			}
		})
	};
	
	function queryDict(){
		Web.Method.ajax("comUserBack/findDictForComUserType",{
			success : function(data){
				var comUserTypeDict = "<li><a href='javascript:;' value=''>全部</a></li>";
				$.each(data.info,function(i , v){
					comUserTypeDict += "<li><a href='javascript:;' value='" + v.codeId + "'>" + v.codeName + "</a></li>";
				})
				$(".industry").find("dd").find("ul").html(comUserTypeDict);
			}
		})
	}
	
	function batchExport(){
		var industry = $(".industry").find("dt").find("a").attr("value");
		var coName = $("#coName").val();
		var mobile = $("#mobile").val();
		var startRegTime = $("#startRegTime").val();
		var endRegTime = $("#endRegTime").val();
		var audStatus = $(".audStatus").find("dt").find("a").attr("value");
		var contName = $("#contName").val();
//		var startChkTime = $("#startChkTime").val();
//		var endChkTime = $("#endChkTime").val();
//		var startLoginTime = $("#startLoginTime").val();
//		var endLoginTime = $("#endLoginTime").val();
		var batchExport = $(".batchConfirm").find("dt").find("a").attr("value");
		var params = "";
		if(industry.length > 0)	{alert(123);params += "&industry=" + industry;}
		if(coName.length > 0)	params += "&coName=" + coName;
		if(mobile.length > 0)	params += "&mobile=" + mobile;
		if(startRegTime.length > 0)	params += "&startRegTime=" + startRegTime;
		if(endRegTime.length > 0)	params += "&endRegTime=" + endRegTime;
		if(audStatus.length > 0)	params += "&audStatus=" + audStatus;
		if(contName.length > 0)	params += "&contName=" + contName;
//		if(startChkTime.length > 0)	params += "&startChkTime=" + startChkTime;
//		if(endChkTime.length > 0)	params += "&endChkTime=" + endChkTime;
//		if(startLoginTime.length > 0)	params += "&startLoginTime=" + startLoginTime;
//		if(endLoginTime.length > 0)	params += "&endLoginTime=" + endLoginTime;
		if(batchExport.length > 0)	params += "&batchExport=" + batchExport;
		location.href = Web.Recource.serverURL+"comUserBack/findComUserList?" + params;
	}
	$(document).on("click",".capitalDetails",function(){
		var comId=$(this).attr("name");
		var coName=$(this).attr("value");
		window.location.href="../system/sys_comCapital.html?comId="+comId+"&coName="+escape(coName);
	});
	
	$(document).on("click",".recomDetails",function(){
		var comId=$(this).attr("name");
		var coName=$(this).attr("value");
		window.location.href="../system/sys_comRecom.html?comId="+comId+"&coName="+escape(coName);
	});
	