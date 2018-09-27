/**
 * 企业详情页面和企业审核页面公用js
 */
$(function(){
	Web.Method.ajax("comUserBack/findComUserList", {
		data:{comId:get("comId")},
		success: function(data){
			var arr = new Array("regTime","loginTime","chkTime");
			$("td").not(".bold").each(function(){
				$this = $(this).attr("name");
				for(var item in data.info[0]){
					if(item == $this){
						if($.inArray($this , arr) != -1){
							var date = new Date(data.info[0][item]).format("yyyy-MM-dd");
							$(this).html(date);
							return ;
						}
						if($(this).attr("name") == "audStatus"){
							var audStatus = "";
							if(data.info[0][item] == 0){
								audStatus = "未审核";
							}else if(data.info[0][item] == 1){
								audStatus = "审核不通过";
							}else{
								audStatus = "审核通过";
							}
							$(this).html(audStatus);
							return ;
						}
						$(this).html(data.info[0][item]);
					}
				}
			})
		},
		fail:function(data){
			$.confAlert({
				size:"sm",
				context:"查询企业详情失败" ,
				noButton:false
			})
		}
	});
	
	$(".goBack").click(function(){
		window.location.href="../system/com_user_list.html";
	});
	
	$(".site-template-btn1, .site-template-btn3").click(function(){
		Web.Method.ajax("comUserBack/comUserAudit",{
			data: {
				comId:get("comId"),
				audStatus:$(this).attr("value")
			},
			success: function(data){
				$.confAlert({
					size:"sm",
					context:"审核完成",
					noButton:false
				})
				setTimeout("window.location.href='../system/com_user_list.html'", 700);
			},
			fail: function(data){
				$.confAlert({
					size:"sm",
					context:"网络异常,请联系管理员",
					noButton:false
				})
			}
		})
	});
});

function get(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]);
	return null;
}