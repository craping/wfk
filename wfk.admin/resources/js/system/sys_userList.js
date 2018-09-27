$(function(){
	var comId=get("comId");
	var coName=get("coName");
	if(comId!=null&&coName!=null){
		$("#comId").val(comId);
		$("#userComName").val(coName);
	}
	//全选/全不选
	$(document).on("click","#selectAll",function(){
    		$('input[name="subBox"]').prop("checked",this.checked); 
    		if($("input[name='subBox']:checked").size()>0){
    			$("#submit_button").css("background","#aa3231").prop("disabled",false);
    		}else{
    		    $("#submit_button").css("background","#898989").prop("disabled",true);
	        }
     });
     $(document).on("click","input[name='subBox']",function(){
         $("#selectAll").prop("checked",$("input[name='subBox']").length == $("input[name='subBox']:checked").length ? true : false);
         if($("input[name='subBox']:checked").size()>0){
 			$("#submit_button").css("background","#aa3231").prop("disabled",false);
 		 }else{
 		    $("#submit_button").css("background","#898989").prop("disabled",true);
	     }
     });
	
	
	$("#listview").listview({
		style:"table-hover",
		headerStyle:"noborder",
		module:[
            {name:"<input type='checkbox' id='selectAll' />全选",width:"5%"},
	        {name:"序号",width:"3%"},
	        {name:"用户名",width:"6%"},
			{name:"联系方式",width:"9%"},
			{name:"公司名称",width:"10%"},
			{name:"注册日期",width:"8%"},
			{name:"可用积分",width:"8%"},
			{name:"操作"}
		],
		eachItem:function(ui, item){
			for(var i in item){
				if(item[i]==null){
					item[i]="";
				}
			}
			var capacitys='<div class="system-table-list">'
	                +'<ul>'
	                +'<li><a href="javascript:;" class="operate-icon44 userDetails" title="会员详情" name="'+item.custno+'"></a></li>'
	                +'<li><a href="javascript:;" class="operate-icon42 capitalDetails" title="资金明细" name="'+item.custno+'" value="'+item.loginName+'"></a></li>'
	                +'<li><a href="javascript:;" class="operate-icon43 recomDetails" title="推荐统计" name="'+item.custno+'" value="'+item.loginName+'"></a></li>'
	            +'</ul>'
            +'</div>';
			var page = $("#pageset").data("lishe.pageSet").options.pageSet.page-1;
			var regDate=item.regDate==undefined||item.regDate==''?"--":new Date(item.regDate).format("yyyy/MM/dd");
			var tr = $("<tr>" +
					    "<td width='5%'><input type='checkbox' name='subBox' value='"+item.custno+"'></td>"+
						"<td width='3%'>"+(parseInt(item.indexKey) + page * rs.pageNum + 1)+"</td>" +
						"<td width='6%'>"+ item.loginName +"</td>"+
						"<td width='8%'>"+ item.mobileno +"</td>"+
						"<td width='9%'>"+ item.userComName +"</td>"+
						"<td width='10%'>"+regDate +"</td>" +
						"<td width='12%'>"+ item.accountCred +"</td>" +
						"<td width='8%'>"+ capacitys +"</td>"+
					"</tr>");
			return tr;
		}
		
	});
	$("#pageset").pageset({
		itemClick:function(page){
			querySupList(page);
		}
	});
	
	querySupList(1);
	$(document).on("click","#search_button",function(){
		querySupList(1);
	});
	$(document).keyup(function(event){
		if(event.keyCode == 13){
			$("#search_button").trigger("click");
		}
	});
});


function querySupList(page, listview, pageset){
	var loginName=$("#loginName").val()==""?undefined:$("#loginName").val();
	var mobileno=$("#mobileno").val()==""?undefined:$("#mobileno").val();
	var userComName=$("#userComName").val()==""?undefined:$("#userComName").val();
	var firstTime=$("#firstTime").val()==""?undefined:$("#firstTime").val();
	var finallyTime=$("#finallyTime").val()==""?undefined:$("#finallyTime").val();
	var comId=$("#comId").val()==""?undefined:$("#comId").val();
	listview = listview?listview:$("#listview");
	listview.listview("loading");
	Web.Method.ajax("sysUserPerson/getUserPersonList",{
		data:{
			comId: comId,
			page_flag:page,
			page_num:rs.pageNum,
			loginName:loginName,
			mobileno:mobileno,
			userComName:userComName,
			firstTime:firstTime,
			finallyTime:finallyTime
		},
		success:function(data){
			pageset = pageset?pageset:$("#pageset");
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
    

	
	$(document).on("click",".setParams",function(){
		var supId=$(this).attr("name");
		Web.Method.ajax("sysUserPerson/getUserPersonList", {
			data : {
				supId : supId,
			},
			success : function(data) {
				var status=data.info.status;
				if(status=="1"){
					window.location.href="../system/sys_setSupParams.html?supId="+supId;
				}else{
					$.confAlert({
						size:"sm",
						context:"该供应商未通过审核",
						noButton:false
					})
				}
			},
			fail : function(data) {
				$.confAlert({
					size:"sm",
					context:data.msg,
					noButton:false
				})
			}
		});
	});
	$(document).on("click",".userDetails",function(){
		var custno=$(this).attr("name");
		window.location.href="../system/sys_userDetails.html?custno="+custno;
	});
	$(document).on("click",".capitalDetails",function(){
		var custno=$(this).attr("name");
		var userName=$(this).attr("value");
		window.location.href="../system/sys_userCapital.html?custno="+custno+"&userName="+userName;
	});
	$(document).on("click",".recomDetails",function(){
		var custno=$(this).attr("name");
		var userName=$(this).attr("value");
		window.location.href="../system/sys_userRecom.html?custno="+custno+"&userName="+userName;
	});
	
	function operate(){
		if($("#select_button").children().html()==undefined){
			$.confAlert({
				size : "sm",
				context : "请选择要进行的操作",
				noButton : false
			});
			return false;
		}
		location.href = Web.Recource.serverURL+"sysUserPerson/userExport?ids="+getCheckVal();
	}

	function getCheckVal(){ //jquery获取复选框值
		var chk_value ="";
		$('input[name="subBox"]:checked').each(function(){
			chk_value += $(this).val()+",";
		});
		return chk_value;
	} 
	

	$(document).on("change","#userComName",function(){
		$("#comId").val('');
	});
	
	//获取url参数
	function get(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) return unescape(r[2]);
		return null;
	}