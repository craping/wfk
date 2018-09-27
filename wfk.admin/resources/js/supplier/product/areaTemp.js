$(function(){
	var supId=Web.Method.GetQueryString('supId');
	$("input[name='supId']").val(supId);
	var control='';//控制器选择
	if($("#supId",parent.document).val()!=undefined){
		supId=$("#supId",parent.document).val();
		control="supProduct";
	}else{
		control="products";
	}
	var tid = Web.Method.GetQueryString('tid');
	if(tid!= "" && tid > 0){
		$("input[name='tid']").val(tid)
		tempInfo({tid:tid,supId:supId},control);
		$("h1").html("修改运费模板");
	}
	var validator=$("#tempAction").validate(); //表单校验
	$(document).on("click","#close",function(){
		history.go(-1);
		//window.location.href="freight_setting.html";
	})
	$(document).on("click","#OK",function(){
		if(!validator.form()){return false;};
		if($("#check_name_msg").val()=="false"){
			$("#show_msg").attr("style","display:block");
			return false;
		}
		if($("input[name='areaList']").length==0){
			$.confAlert({
				size:"sm",
				context:"配送区域不能为空",
				noButton:false 
			})
			return false;
		}
		var params = $("#tempAction").serialize();
		var tid = $("input[name='tid']").val();
		if(tid != null && tid > 0 ){
			update(params,control);
		}else{
			add(params);
		}
	})
	function add(params){
		Web.Method.ajax("supProduct/areaTemp",{
			async:false,
			data:params,
			success:function(data){
				 if(data.errcode == "0"){
					 $.confAlert({
							size:"sm",
							context:"添加成功",
							noButton:false,
							onOk:function(){
								window.location.href="freight_setting.html";
							}
					 })
				 }else{
					 $.confAlert({
							size:"sm",
							context:data.msg,
							noButton:false 
					 })
				 }
			}
		});
	}
	 function update(params,control){
		Web.Method.ajax(control+"/areaTemp",{
			async:false,
			data:params,
			success:function(data){
				 if(data.errcode == "0"){
					 $.confAlert({
							size:"sm",
							context:"修改成功",
							noButton:false,
							onOk:function(){
								history.go(-1);
							//	window.location.href="freight_setting.html";
							}
					 })
				 }else{
					 $.confAlert({
							size:"sm",
							context:data.msg,
							noButton:false 
					 })
				 }
			}
		});
	}

	$(document).on("click","#deleteAreaLsit",function(){
		$(this).parent().parent().parent().parent().parent().remove();
	})
	
	//检查模板名是否已存在
$(document).on("blur","#check_name",function(){
	if($("#check_name").val().length==0){
		return;
	}
	if($("#check_name").val()==$("#oldtName").val()){
		return;
	}
	Web.Method.ajax(control+"/checkAreaTemp",{
		async:false,
		data:{
			tName:$("#check_name").val(),
			supId:supId
			},
		success:function(data){
			if(data.info.length!=0){
				$("#show_msg").html("模板名已存在");
				$("#show_msg").attr("style","display:block");
				$("#check_name_msg").val("false");
			}else{
				$("#show_msg").html("");
				$("#show_msg").attr("style","display:none");
				$("#check_name_msg").val("true");
			}
		},
		fail : function(data) {
			$.confAlert({
				size : "sm",
				context : data.msg,
				noButton : false
			})
		}
	});
})
	
})


function tempInfo(params,control){	
	Web.Method.ajax(control+"/areaTempList",{
		async:false,
		data:params,
		success:function(data){
			datas = data.info;
			$("#oldtName").val(datas[0].tName)
			$("input[name='tName']").val(datas[0].tName);
			listinfo(params);
		}
	})
}

//freight:tmep,areaLevel:level,parentArea:parent
function areaList(params){
	var datas ;
	Web.Method.ajax("supProduct/areaList",{
		async:false,
		data:params,
		success:function(data){
			datas = data.info;
		}
	});
	return datas;
}
function splitshi(val,num){
	var v = val.split(",");
	var html ='';
	$.each(v,function(i,j){
		if(j.split("|")[0]!="parentId"){
		  html+=j.split("|")[num]+",";
		}
	})
	html=html.substring(0,html.length-1);
	return html;
}
function splitshiVla(val,num){
	var v = val.split(",");
	var html ='';
	$.each(v,function(i,j){
		html+=j.split("|")[num]+",";
	})
	html=html.substring(0,html.length-1);
	return html;
}
function listinfo(data){
	if(data!=""){
		var htmls = ' ';
		var datas=areaList({freight:data.tid});
		$.each(datas,function(ii,jj){
			htmls += '<tr datatr="'+io+'">';
			htmls += '<td>';
			htmls += '<div class="textalign"><ul>';
			var sheng = jj.parentArea.split("&");
			var shi = jj.areaName.split("&");
			var ht='';
			$.each(sheng,function(i,j){
				ht+=sheng[i]+":"+shi[i]+"&";
			})
			for(var i=0;i<sheng.length;++i){
				var sArray=sheng[i].split("|");
				if(sArray[2]=="1"){
					htmls+='<li>';
					htmls+=sArray[1]
					htmls+='</li>';
				}else if(sArray[2]=="2"){
					htmls+='<li>';
					htmls+=sheng[i].split("|")[1]+":　" + splitshi(shi[i],1)
					htmls+='</li>';
				}
			}
			ht=ht.substring(0,ht.length-1);
			htmls += '<input type="hidden" d="dval'+io+'" name="areaList" value="'+ht+'" >';
			
			htmls += '</ul></div>';
				htmls += '<a href="javascript:;" val ="'+io+'" class="system-freight-edit" data="'+jj.freight+':'+jj.price+'">编辑</a>';
					io+=1;
				htmls += '</td>';
				htmls += '<td>';
					htmls += '<input type="text"  number="true" required="true" aria-required="true" placeholder="运费" value="'+jj.price+'"  class="system-freight-input" name="price"/>';
					htmls += '<i  class="system-form-hint error" for="price" style="display: none;">输入有错</i>';
				htmls += '</td>';
				htmls += '<td>';
					htmls += '<div class="system-table-list">';
						htmls += '<ul>';
							htmls += '<li><a href="javascript:;" class="operate-icon4" id="deleteAreaLsit" title="删除"></a></li>';
						htmls += '</ul>';
					htmls += '</div>';
				htmls += '</td>';
			htmls += '</tr>';
		}) 
		$("#Temptd").after(htmls);
	}
}

function areaListCount(params){
	var datas ;
	Web.Method.ajax("supProduct/areaListCount",{
		async:false,
		data:params,
		success:function(data){
			datas = data.info;
		}
	});
	return datas;
	
}

function getAreaNum(proId){
	var length='';
	Web.Method.ajax("pubArea/getPubAreaByPid", {
		async:false,
		data : {
			pId : proId
		},
		success : function(data) {
			length=data.info.length;
		},
		fail : function(data) {
			$.confAlert({
				size : "sm",
				context : data.msg,
				noButton : false
			})
		}
	});
	return length;
}