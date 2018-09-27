$(function(){
	$(document).keyup(function(event){
		if(event.keyCode == 13){
			$("#search_button").trigger("click");
		}
	});
	
	$("#listview_supUsers").listview({
		style:"table-hover",
		headerStyle:"noborder",
		module:[
	        {name:"序号",width:"5%"},
	        {name:"用户名",width:"8%"},
			{name:"申请人姓名",width:"8%"},
			{name:"联系方式",width:"6%"},
			{name:"公司名称",width:"15%"},
			{name:"所在地",width:"12%"},
			{name:"经营范围",width:"8%"},
			{name:"申请日期",width:"6%"},
			{name:"审核日期",width:"6%"},
			{name:"状态",width:"8%"},
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
	                +'<li><a href="javascript:;" class="operate-icon5 setParams" title="参数设置" name="'+item.supId+'"></a></li>'
	                +'<li><a href="javascript:;" class="operate-icon9 supAuditing" title="审核" name="'+item.supId+'"></a></li>'
	                +'<li><a href="javascript:;" class="operate-icon1 updateSup" title="编辑" name="'+item.supId+'"></a></li>'
	                +'<li><a href="javascript:;" class="operate-icon8 setFreight" title="运费模板" name="'+item.supId+'"></a></li>'
	                +'<li><a href="javascript:;" class="operate-icon10 punishCo" title="惩罚系数" name="'+item.supId+'"></a></li>'
	                +'<li><a href="javascript:;" class="operate-icon2 supDetails" title="查看详情" name="'+item.supId+'"></a></li>'
	                +'<li><a href="product_productManage.html?supIds='+item.supId+'&supNames='+item.loginName+'" class="operate-icon2 supDetails" title="查看商品列表" name="'+item.supId+'"></a></li>'
	            +'</ul>'
            +'</div>';
			var page = $("#pageset_supUsers").data("lishe.pageSet").options.pageSet.page-1;
			var date = new Date();
			date.setTime(item.regTime);
			var chkdate='';
			var chkdateP='--';
			if(item.chkTime!=""){
				chkdate= new Date();
				chkdate.setTime(item.chkTime);
				chkdateP=chkdate.format("yyyy/MM/dd");
			}
			var status='';
			if(item.status=='1'){
				status='审核通过'
			}else if(item.status=='0'){
				status="审核不通过"
			}else {
				status="待审核";
			}
			var tr = $("<tr>" +
						"<td width='5%'>"+(parseInt(item.indexKey) + page * rs.pageNum + 1)+"</td>" +
						"<td width='6%'>"+ item.loginName +"</td>" +
						"<td width='8%'>"+ item.contName +"</td>" +
						"<td width='9%'>"+ item.mobile +"</td>" +
						"<td width='10%'>"+ item.coName +"</td>" +
						"<td width='12%'>"+ item.wrkAddress +"</td>" +
						"<td width='8%'>"+ item.busiScope+"</td>" +
						"<td width='8%'>"+ date.format("yyyy/MM/dd") +"</td>" +
						"<td width='8%'>"+ chkdateP +"</td>" +
						"<td width='8%'>"+ status+"</td>" +
						"<td width='18%'>"+ capacitys+"</td>" +
					"</tr>");
			return tr;
		}
		
	});
	$("#pageset_supUsers").pageset({
		itemClick:function(page){
			querySupList(page);
		}
	});
	
	querySupList(1);
	$(document).on("click","#search_button",function(){
		querySupList(1);
	});
	
});


function querySupList(page, listview, pageset){
	var contName=$("#contName").val()==""?undefined:$("#contName").val();
	var mobile=$("#mobile").val()==""?undefined:$("#mobile").val();
	var coName=$("#coName").val()==""?undefined:$("#coName").val();
	var status=$("#status").children().attr("value")==""?undefined:$("#status").children().attr("value");
	var firstTime=$("#firstTime").val()==""?undefined:$("#firstTime").val();
	var finallyTime=$("#finallyTime").val()==""?undefined:$("#finallyTime").val();
	listview = listview?listview:$("#listview_supUsers");
	listview.listview("loading");
	Web.Method.ajax("sysSupplier/getSupList",{
		data:{
			page_flag:page,
			page_num:rs.pageNum,
			contName:contName,
			mobile:mobile,
			coName:coName,
			status:status,
			firstTime:firstTime,
			finallyTime:finallyTime
		},
		success:function(data){
			pageset = pageset?pageset:$("#pageset_supUsers");
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
		
		Web.Method.ajax("sysSupplier/getSup", {
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
	$(document).on("click",".supAuditing",function(){
		var supId=$(this).attr("name");
		window.location.href="../system/sys_audiSup.html?supId="+supId;
	});
	$(document).on("click",".setFreight",function(){
		var supId=$(this).attr("name");
		window.location.href="../system/sys_supFreight.html?supId="+supId;
	});
	$(document).on("click",".updateSup",function(){
		var supId=$(this).attr("name");
		window.location.href="../system/sys_updateSup.html?supId="+supId;
	});
	$(document).on("click",".punishCo",function(){
		var supId=$(this).attr("name");
		window.location.href="../system/sys_supPunishCo.html?supId="+supId;
	});
	$(document).on("click",".supDetails",function(){
		var supId=$(this).attr("name");
		window.location.href="../system/sys_supDetails.html?supId="+supId;
	});
