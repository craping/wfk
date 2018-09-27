$(function(){
	var custno=get("custno");
	var referee=get("userName");
	if(custno!=null&&referee!=null){
		$("#custno").val(custno);
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
	        {name:"用户名",width:"6%"},
			{name:"手机号",width:"9%"},
			{name:"注册日期",width:"8%"},
			{name:"推荐人用户名",width:"8%"},
			{name:"推荐人手机",width:"8%"}
		],
		eachItem:function(ui, item){
			for(var i in item){
				if(item[i]==null){
					item[i]="";
				}
			}
			var page = $("#pageset").data("lishe.pageSet").options.pageSet.page-1;
			var regTime=item.regTime==undefined||item.regTime==''?"--":new Date(item.regTime).format("yyyy/MM/dd");
			var tr = $("<tr>" +
					    "<td width='5%'><input type='checkbox' name='subBox' value='"+item.id+"'></td>"+
						"<td width='3%'>"+(parseInt(item.indexKey) + page * rs.pageNum + 1)+"</td>" +
						"<td width='6%'>"+ item.userName +"</td>"+
						"<td width='8%'>"+ item.phone +"</td>"+
						"<td width='10%'>"+regTime +"</td>" +
						"<td width='12%'>"+ item.referee +"</td>" +
						"<td width='8%'>"+ item.refereePhone +"</td>"+
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
	var referee=$("#referee").val()==""?undefined:$("#referee").val();
	var refereePhone=$("#refereePhone").val()==""?undefined:$("#refereePhone").val();
	var phone=$("#phone").val()==""?undefined:$("#phone").val();
	var userName=$("#userName").val()==""?undefined:$("#userName").val();
	var firstRegTime=$("#firstRegTime").val()==""?undefined:$("#firstRegTime").val();
	var finallyRegTime=$("#finallyRegTime").val()==""?undefined:$("#finallyRegTime").val();
	var firstTime=$("#firstTime").val()==""?undefined:$("#firstTime").val();
	var finallyTime=$("#finallyTime").val()==""?undefined:$("#finallyTime").val();
	listview = listview?listview:$("#listview");
	listview.listview("loading");
	Web.Method.ajax("sysUserRecom/getUserRecomList",{
		data:{
			page_flag:page,
			page_num:rs.pageNum,
			custno:custno,
			referee:referee,
			refereePhone:refereePhone,
			phone:phone,
			userName:userName,
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
	location.href = Web.Recource.serverURL+"sysUserRecom/userRecomExport?ids="+getCheckVal();
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