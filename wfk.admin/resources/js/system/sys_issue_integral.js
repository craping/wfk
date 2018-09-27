$(function(){
	var validator=$("#integral_form").validate(); //表单校验
	var lastTime;
	$("#seelctDiv").keyup(function(event){
	    //用jQuery的event.timeStamp来标记时间，这样每次的keyup事件都会修改lastTime的值，lastTime必需是全局变量
	    lastTime = event.timeStamp;
	    setTimeout(function(){
	        //如果时间差为0，也就是你停止输入0.5s之内都没有其它的keyup事件产生，这个时候就可以去请求服务器了
	        if(lastTime - event.timeStamp == 0){
	        	var html='';
	    		$(".seelctDiv").html('');
	    		var coName=$("#seelctDiv").val();
	    		if(coName.length==0){
	    			return false;
	    		}
	    		Web.Method.ajax("comUserBack/findComUserList",{
	    			data:{
	    				coName:coName
	    				},
	    			success:function(data){
	    				 html='<ul>';
	    				for(var i=0;i<data.info.length;i++){
	    					html+='<li class="coName" value="'+data.info[i]["comId"]+'">';
	    					html+=data.info[i]["coName"];
	    					html+='</li>';
	    				}
	    				html+='</ul>';
	    				$(".seelctDiv").append(html);
	    				$(".seelctDiv").show();
	    			},
	    			fail:function(data){
	    				$.confAlert({
	    					size:"sm",
	    					context:data.msg ,
	    					noButton:false
	    				})
	    			}
	    		})
	        }
	    },500);
	});
	
	$("#seelctDiv").blur(function(){	
		var coName=$("#seelctDiv").val();
		var flag=false;
		$(".coName").each(function(){
			if($(this).html()==coName){
				flag=true;
				$("#comId").val($(this).attr("value"));
				return;
			}
		})
		if(!flag)
		$("#seelctDiv").val('');
	})
	$(document).on("click",".coName",function(){
		var coName=$(this).html();
		var comId=$(this).attr("value");
		$("#comId").val(comId);
		$("#seelctDiv").val(coName);
	});
	
	$(document).on("click","#send_button",function(){
		if(!validator.form()){
			return false;
		}
		var comId=$("#comId").val()==""?undefined:$("#comId").val();
		var tranNum=$("#tranNum").val()==""?undefined:$("#tranNum").val();
		var remark=$("#remark").val()==""?undefined:$("#remark").val();
		var tranType=$("#tranType").children().attr("value")==""?undefined:$("#tranType").children().attr("value");
		Web.Method.ajax("sysComCapital/operComCapital",{
			data:{
				comId:comId,
				tranNum:tranNum,
				remark:remark,
				tranType:tranType,
				},
			success:function(data){
				$.confAlert({
 					size:"sm",
 					context:"发送成功",
 					noButton:false,
 					onOk:function(){
						window.location.href="../system/sys_comCapital.html";
					}
 				})
			},
			fail:function(data){
				$.confAlert({
					size:"sm",
					context:data.msg ,
					noButton:false
				})
			}
		})
	});
});

(function ($) {
	$.fn.serializeJson=function(includeEmpty){  
	    var json={};
	    $(this.serializeArray()).each(function(){
	    	if(includeEmpty || (this.value && this.value != ""))
	    		json[this.name]=this.value;
	    });
	    return json;  
	};
})(jQuery);