$(function(){
	var comId=get("comId");
	var coName=get("coName");
	if(comId!=null&&coName!=null){
		$("#comId").val(comId);
		$("#coName").val(coName);
	}
	var tranType=new Array('系统积分充值','系统积分返利','企业发放充值积分','企业发放返利积分','企业积分撤销')
	//选择
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
			{name:"操作账户",width:"9%"},
			{name:"交易日期",width:"10%"},
			{name:"交易类型",width:"8%"},
			{name:"交易积分",width:"8%"},
			{name:"可用积分",width:"8%"},
			{name:"状态",width:"8%"},
			{name:"备注"}
		],
		eachItem:function(ui, item){
			for(var i in item){
				if(item[i]==null){
					item[i]="";
				}
			}
			var status=''; //交易状态
			if(item.status=='1'){
				status='成功';
			}else if(item.status=='0'){
				status="失败";
			}
			var page = $("#pageset").data("lishe.pageSet").options.pageSet.page-1;
			var tranDate=item.tranDate==undefined||item.tranDate==''?"--":new Date(item.tranDate).format("yyyy/MM/dd");
			var tr = $("<tr>" +
					    "<td width='5%'><input type='checkbox' name='subBox' value='"+item.id+"'></td>"+
						"<td width='3%'>"+(parseInt(item.indexKey) + page * rs.pageNum + 1)+"</td>" +
						"<td width='6%'>"+ item.comId +"</td>"+
						"<td width='8%'>"+ item.operAcc +"</td>"+
						"<td width='10%'>"+tranDate +"</td>" +
						"<td width='12%'>"+ tranType[item.tranType] +"</td>" +
						"<td width='9%'>"+ item.tranNum +"</td>"+
						"<td width='8%'>"+ item.availCred +"</td>" +
						"<td width='8%'>"+ status +"</td>"+
						"<td>"+ item.remark +"</td>"+
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
	var comId=$("#comId").val()==""?undefined:$("#comId").val(); //企业ID
	var coName=$("#coName").val()==""?undefined:$("#coName").val();//企业名称
	var status=$("#status").children().attr("value")==""?undefined:$("#status").children().attr("value");//状态
	var tranType=$("#tranType").children().attr("value")==""?undefined:$("#tranType").children().attr("value");//交易类型
	var operAcc=$("#operAcc").val()==""?undefined:$("#operAcc").val();//操作人
	var firstTime=$("#firstTime").val()==""?undefined:$("#firstTime").val();
	var finallyTime=$("#finallyTime").val()==""?undefined:$("#finallyTime").val();
	listview = listview?listview:$("#listview");
	listview.listview("loading");
	Web.Method.ajax("sysComCapital/getComCapitalList",{
		data:{
			page_flag:page,
			page_num:rs.pageNum,
			comId:comId,
			coName:coName,
			status:status,
			tranType:tranType,
			operAcc:operAcc,
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

$(document).on("change","#coName",function(){
	$("#comId").val('');
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
	location.href = Web.Recource.serverURL+"sysUserCapital/userCapitalExport?ids="+getCheckVal();
}

function getCheckVal(){ //jquery获取复选框值
	var chk_value ="";
	$('input[name="subBox"]:checked').each(function(){
		chk_value += $(this).val()+",";
	});
	return chk_value;
}


//获取url参数
function get(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]);
	return null;
}