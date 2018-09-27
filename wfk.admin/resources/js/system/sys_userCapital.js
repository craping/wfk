$(function(){
	var custno=get("custno");
	var userName=get("userName");
	var tranType=new Array('个人积分充值','企业充值积分','企业返利积分','获取现金卷','消费支付','系统退款积分');
	if(custno!=null&&userName!=null){
		$("#custno").val(custno);
		$("#userName").val(userName);
	}
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
	        {name:"会员名",width:"6%"},
			{name:"注册手机",width:"9%"},
			{name:"交易时间",width:"15%"},
			{name:"交易类型",width:"8%"},
			{name:"交易积分",width:"8%"},
			{name:"可用积分",width:"8%"},
			{name:"状态"}
		],
		eachItem:function(ui, item){
			for(var i in item){
				if(item[i]==null){
					item[i]="";
				}
			}
			var status='';
			if(item.status=='1'){
				status='成功'
			}else if(item.status=='0'){
				status="失败"
			}
			var page = $("#pageset").data("lishe.pageSet").options.pageSet.page-1;
			var tranDate=item.tranDate==undefined||item.tranDate==''?"--":new Date(item.tranDate).format("yyyy/MM/dd HH:mm:ss");
			var tr = $("<tr>" +
					    "<td width='5%'><input type='checkbox' name='subBox' value='"+item.id+"'></td>"+
						"<td width='3%'>"+(parseInt(item.indexKey) + page * rs.pageNum + 1)+"</td>" +
						"<td width='6%'>"+ item.userName +"</td>"+
						"<td width='8%'>"+ item.phone +"</td>"+
						"<td width='15%'>"+tranDate +"</td>" +
						"<td width='12%'>"+ tranType[item.tranType] +"</td>" +
						"<td width='9%'>"+ item.tranNum +"</td>"+
						"<td width='8%'>"+ item.availCred +"</td>" +
						"<td>"+ status +"</td>"+
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
	var custno=$("#custno").val()==""?undefined:$("#custno").val(); //用户ID
	var userName=$("#userName").val()==""?undefined:$("#userName").val();//会员名
	var status=$("#status").children().attr("value")==""?undefined:$("#status").children().attr("value");//状态
	var tranType=$("#tranType").children().attr("value")==""?undefined:$("#tranType").children().attr("value");//交易类型
	var phone=$("#phone").val()==""?undefined:$("#phone").val();//注册手机号
	var firstTime=$("#firstTime").val()==""?undefined:$("#firstTime").val();
	var finallyTime=$("#finallyTime").val()==""?undefined:$("#finallyTime").val();
	listview = listview?listview:$("#listview");
	listview.listview("loading");
	Web.Method.ajax("sysUserCapital/getUserCapitalList",{
		data:{
			page_flag:page,
			page_num:rs.pageNum,
			custno:custno,
			userName:userName,
			status:status,
			tranType:tranType,
			phone:phone,
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

$(document).on("change","#userName",function(){
	$("#custno").val('');
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