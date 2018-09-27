$(function(){
	var tid = Web.Method.GetQueryString('tid');
	if(tid!= "" && tid > 0){
		$("input[name='tid']").val(tid)
		tempInfo({tid:tid});
		$("h1").html("修改运费模板");
	}
	var validator=$("#tempAction").validate(); //表单校验
	$(document).on("click","#close",function(){
		window.location.href="freight-setting.html";
	})
	$(document).on("click","#OK",function(){
		if(!validator.form()){return false;};
		var params = $("#tempAction").serialize();
		if($("input[name='areaList']").length==0){
			$.confAlert({
				size:"sm",
				context:"配送区域不能为空",
				noButton:false 
			})
			return false;
		}
		var tid = $("input[name='tid']").val();
		if(tid != null && tid > 0 ){
			update(params);
		}else{
			
			add(params);
		}
	})
	
	
	$(document).on("click","#close",function(){
		$(".system-substance",window.parent.document).show();
		$("#freight",window.parent.document).remove();
	});
	
	
	function add(params){
		Web.Method.ajax("supProduct/addAreaTemp",{
			async:false,
			data:params,
			success:function(data){
				 if(data.errcode == "0"){
					 $.confAlert({
							size:"sm",
							context:"添加成功",
							noButton:false,
							onOk:function(){
								$(".system-substance",window.parent.document).show();
								$("#freight",window.parent.document).remove();
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
	 function update(params){
		Web.Method.ajax("supProduct/updataAreaTemp",{
			async:false,
			data:params,
			success:function(data){
				 if(data.errcode == "0"){
					 $.confAlert({
							size:"sm",
							context:"修改成功",
							noButton:false,
							onOk:function(){
								window.location.href="freight-setting.html";
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
})


function tempInfo(params){	
	Web.Method.ajax("supProduct/areaTempList",{
		async:false,
		data:params,
		success:function(data){
			datas = data.info;
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
		html+=j.split("|")[num]+",";
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
		$.each(areaList({freight:data.tid}),function(ii,jj){
			htmls += '<tr datatr="'+io+'">';
			htmls += '<td>';
			htmls += '<div class="textalign"><ul>';
			var sheng = jj.parentArea.split("&");
			var shi = jj.areaName.split("&");
			var ht='';
			$.each(sheng,function(i,j){
				htmls+='<li>';
				htmls+=sheng[i].split("|")[1]+":　" + splitshi(shi[i],1)
				htmls+='</li>';
				 
				ht+=sheng[i]+":"+shi[i]+"&";
			})
			ht=ht.substring(0,ht.length-1);
			htmls += '<input type="hidden" d="dval'+io+'" name="areaList" value="'+ht+'" >';
			
			htmls += '</ul></div>';
				htmls += '<a href="javascript:;" val ="'+io+'" class="system-freight-edit" data="'+jj.freight+':'+jj.price+'">编辑</a>';
					io+=1;
				htmls += '</td>';
				htmls += '<td>';
					htmls += '<input type="text"  number="true" maxlength="9" required="true" aria-required="true" placeholder="运费" value="'+jj.price+'"  class="system-freight-input" name="price"/>';
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