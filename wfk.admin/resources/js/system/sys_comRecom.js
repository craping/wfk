$(function(){
	var comId=get("comId");
	var referee=get("coName");
	if(comId!=null&&referee!=null){
		$("#comId").val(comId);
		$("#referee").val(referee);
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
	        {name:"序号",width:"5%"},
	        {name:"企业名称",width:"6%"},
			{name:"注册日期",width:"8%"},
			{name:"审核状态",width:"9%"},
			{name:"推荐企业名称",width:"8%"}
		],
		eachItem:function(ui, item){
			for(var i in item){
				if(item[i]==null){
					item[i]="";
				}
			}
			var page = $("#pageset").data("lishe.pageSet").options.pageSet.page-1;
			var regTime=item.regTime==undefined||item.regTime==''?"--":new Date(item.regTime).format("yyyy/MM/dd");
			var status="";
			if(item.status=='1'){
				status='审核通过'
			}else if(item.status=='0'){
				status="审核不通过"
			}else {
				status="待审核";
			}
			var comId=item.comName.split('|')[0];
			var comName=item.comName.split('|')[1];
			var tr = $("<tr>" +
					    "<td width='5%'><input type='checkbox' name='subBox'></td>"+
						"<td width='3%'>"+(parseInt(item.indexKey) + page * rs.pageNum + 1)+"</td>" +
						"<td width='6%'> <i style='cursor:pointer;' class='comDetails' value='"+comId+"'>"+ comName +"</i></td>"+
						"<td width='10%'>"+regTime +"</td>" +
						"<td width='8%'>"+ status +"</td>"+
						"<td width='12%'>"+ item.referee +"</td>" +
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
	var referee=$("#referee").val()==""?undefined:$("#referee").val();
	var comId=$("#comId").val()==""?undefined:$("#comId").val();
	var comName=$("#comName").val()==""?undefined:$("#comName").val();
	var status=$("#status").children().attr("value")==""?undefined:$("#status").children().attr("value");
	var firstRegTime=$("#firstRegTime").val()==""?undefined:$("#firstRegTime").val();
	var finallyRegTime=$("#finallyRegTime").val()==""?undefined:$("#finallyRegTime").val();
	var firstTime=$("#firstTime").val()==""?undefined:$("#firstTime").val();
	var finallyTime=$("#finallyTime").val()==""?undefined:$("#finallyTime").val();
	listview = listview?listview:$("#listview");
	listview.listview("loading");
	Web.Method.ajax("sysComRecom/getComRecomList",{
		data:{
			page_flag:page,
			page_num:rs.pageNum,
			referee:referee,
			comId:comId,
			status:status,
			comName:comName,
			firstRegTime:firstRegTime,
			finallyRegTime:finallyRegTime,
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

$(document).on("change","#referee",function(){
	$("#comId").val('');
});

$(document).on("click",".comDetails",function(){
	window.location.href="../system/com_user_details.html?comId=" + $(this).attr("value");
});

//获取url参数
function get(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]);
	return null;
}