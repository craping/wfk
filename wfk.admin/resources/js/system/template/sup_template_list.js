$(function(){
	getMyEditTemps();	// 编辑中的模版
	getMyTemps();		// 当前使用的模版
	getUseTempRecord();	// 历史使用模版
});


function getMyEditTemps(){
	Web.Method.ajax("template/getMyEditTemps",{
		data:{ },
		success:function(data){
			var  list=data.info;
			var html="";
			var hl="<ul>";
			for(var i=0;i<list.length;i++){
				hl=hl+"<li><div class='site-template-list left'>  <img height='190' width='160' src='"+list[i].templateThumbnail+"' /><p>模板描述："+list[i].describes+"</p>";
				if(list[i].status==2){
					hl=hl+"<div class='site-template-push'><a class='site-template-push3' href='javascript:void(0);'  onclick=\"toemploy('"+list[i].id+"');\" >立即使用</a></div>"
					hl=hl+" <div class='site-template-push'> <a href='javascript:void(0);' class='site-template-push1' onclick=\"toUpdateStatus('"+list[i].id+"');\" >发布</a> <a href='javascript:void(0);' class='site-template-push2' onclick=\"toUpdate('"+list[i].id+"');\" >修改</a> </div>"
				}else{
					hl=hl+" <div class='site-template-push'> <a href='javascript:void(0);' class='site-template-push1' onclick=\"toUpdateStatus('"+list[i].id+"');\" >发布</a> <a href='javascript:void(0);' class='site-template-push2' onclick=\"toUpdate('"+list[i].id+"');\" >修改</a> </div>"
				}
				hl=hl+"</div> </li>";
			}
			hl=hl+"</ul>"
			$("#templatelist").html(hl);
		},
		fail:function(data){
			alert(data.msg);
		}
	});
}


function getMyTemps(){
	Web.Method.ajax("template/getMyTemps",{
		data:{ },
		success:function(data){
			var list = data.info;
			if(undefined!=list){
				var html="<div class='site-template-list left'>";
				for(var i=0;i<list.length;i++){
					html=html+" <img height='190' width='160' src='" + list[i].templateThumbnail + "' /><p>" + list[i].describes + "</p>"
				}
				html=html+"</div>";
				$("#mytemplatelist").html(html);
			}
		},
		fail:function(data){
			alert(data.msg);
		}
	});
}

function toemploy(id){
	Web.Method.ajax("template/toEmploy",{
		data:{
			id:id
		},
		success:function(data){
			var  list=data.info;
			location.reload();
		}
	});
}


function toUpdateStatus(id){
	if(id==""){
		alert("id不能为空")
		return;
	}
	var status="2";
	Web.Method.ajax("template/updatesTtatus",{
		data:{
			id:id,
			status:status
		},
		success:function(data){
			alert("发布成功");
			location.reload();
		},
		fail:function(data){
			$.confAlert({
				size:"sm",
				context:data.msg,
				noButton:false
			});
		}
	});
}

function toUpdate(id){	// 跳转修改页面
	window.location.href = "../supplier/site_my_template_update.html?id="+id;
}

function getUseTempRecord(){
	Web.Method.ajax("template/getUseTempRecord",{
		data:{ },
		success:function(data){
			var  list=data.info;
			var html="";
			var hl="<ul>";
			for(var i=0;i<list.length;i++){
				var name= list[i].describes;
				if(name.length>5){
					name=name.substr(0,5)+"..."
				}
				hl=hl+"<li><div class='site-template-list left'>  <img height='190' width='160' src='"+list[i].templateThumbnail+"' /><p>模板描述："+name+"</p>";
				
				if(list[i].status==2){
					hl=hl+"<div class='site-template-push'><a class='site-template-push3' href='javascript:void(0);'  onclick=\"toemploy('"+list[i].id+"');\" >立即使用</a></div>"
				}else{
					hl=hl+" <div class='site-template-push'> <a href='javascript:void(0);' class='site-template-push1' onclick=\"toUpdateStatus('"+list[i].id+"');\" >发布</a> <a href='javascript:void(0);' class='site-template-push2' onclick=\"toUpdate('"+list[i].id+"');\" >修改</a> </div>"
				}
				hl=hl+"</div> </li>";
			}
			hl=hl+"</ul>";
			$("#history").html(hl);
		}
	});
}