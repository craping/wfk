$(function(){
	queryTempList();
});

function queryTempList(){
	// 加载站点模版列表
	Web.Method.ajax("template/getTemplist",{
		data:{},
		success:function(data){
			var  list = data.info;
			var html = "<ul>";
			for(var i = 0; i < list.length; i++){
				var name= list[i].describes;
				if(name.length > 5){
					name=name.substr(0,5)+"..."
				}
				html=html+"<li><div class='site-template-list left'> " +
						" <img height='190' width='160' src='" + list[i].templateThumbnail + "' />" +
						" <p>" + name + "</p>";
				html=html+" <div class='site-template-push'> " +
						" <a href='javascript:void(0);' class='site-template-push1' onclick=\"publishTemp('"+list[i].id+"');\">发布</a>" +
						" <a href='javascript:void(0);'  onclick=\"toUpdate('"+list[i].id+"')\"  class='site-template-push2'>修改</a> "
				html=html+"</div></div> </li>";
			}
			html=html+"</ul>";
			$("#templateId").html(html);
		}
	});
}

function toUpdate(id){
	window.location.href = "site_temp_update.html?id="+id;
}

function publishTemp(id){
	if(isNullOrEmpty(id)){
		alert("模版ID未识别");
		return;
	}
	
	Web.Method.ajax("template/publishTemp",{
		data:{
			id:id,
		},
		success:function(data){
			alert("发布成功");
		},
		fail:function(data){
			alert(data.msg);
		}
	});
}