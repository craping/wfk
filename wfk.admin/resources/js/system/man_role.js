$(function(){
	$("#listview_manRole").listview({
		style:"table-hover",
		headerStyle:"noborder",
		module:[
	        {name:"角色名称",width:"15%"},
			{name:"角色描述",width:"15%"},
			{name:"是否有效",width:"15%"},
			{name:"操作",width:"25%"}
		],
		eachItem:function(ui, item){
			for(var i in item){
				if(item[i]==null){
					item[i]="";
				}
			}
			var defRole;
			var operationRole;
			if(item.defRole == 0){
				defRole = "无效";
				operationRole = " class='def_manRole operate-icon29' title='置为有效' ";
			}else{
				defRole = "有效";
				operationRole = " class='def_manRole operate-icon14' title='置为无效' ";
			}
			
			var capacitys =
				'<div class="system-table-list">'
                +'<ul>'
                +'<li><a href="javascript:;" class="update_manRole operate-icon1" title="编辑" name="'+item.roleId+'"></a></li>'
                +'<li><a href="javascript:;" class="authority_manRole operate-icon20" title="权限" name="'+item.roleId+'"></a></li>'
                +'<li><a href="javascript:; "' + operationRole + 'value="' + item.defRole + '" name="'+item.roleId+'"></a></li>'
                +'</ul>'
                +'</div>';
			
			var page = $("#pageset_manRole").data("lishe.pageSet").options.pageSet.page-1;
			var tr = 
				$("<tr>" +
					"<td width='15%'>"+ item.roleName +"</td>" +
					"<td width='15%'>"+ item.roleDesc +"</td>" +
					"<td width='15%'>"+ defRole +"</td>" +
					"<td width='25%'>"+ capacitys +"</td>" +
				"</tr>");
			
			return tr;
		}
		
	});
	$("#pageset_manRole").pageset({
		itemClick:function(page){
			queryManRoleList(page);
		}
	});
	queryManRoleList(1);
	
});

$(document).on("click",".def_manRole",function(){
	var roleId = $(this).attr("name");
	if(!checkUserRole(roleId)){
		return false;
	}
	var roleDef = $(this).attr("value");
	Web.Method.ajax("manRole/updateRole",{
		data:{
			roleId:roleId,
			defRole:1 - roleDef
		},
		success : function(data){
			queryManRoleList(1);
		},
		fail:function(data){
			$.confAlert({
				size:"sm",
				context:data.msg,
				noButton:false
			})
		}
	})
});

$(document).on("click",".addRole",function(){
	window.location.href="../system/man_role_add.html";
});

$(document).on("click",".update_manRole",function(){
	rid = $(this).attr("name");
	if(checkUserRole($(this).attr("name"))){
		window.location.href="../system/man_role_update.html?rId="+rid;
	}
});

$(document).on("click",".authority_manRole",function(){
	rid = $(this).attr("name");
	if(checkUserRole($(this).attr("name"))){
		window.location.href="../system/sys_authority.html?rId="+rid;
	}
})

function queryManRoleList(page, listview, pageset){
	listview = listview?listview:$("#listview_manRole");
	listview.listview("loading");
	Web.Method.ajax("manRole/getRoleList",{
		data:{
			page_flag:page,
			page_num:rs.pageNum
		},
		success:function(data){
			pageset = pageset?pageset:$("#pageset_manRole");
			pageset.pageset("setData", {
				totalpage:data.totalpage,
				totalnum:data.totalnum,
				page:data.page
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

//检查角色是否可编辑
function checkUserRole(rid){
	var fl = true;
	if(rid == "admin"){
		$.confAlert({
			size:"sm",
			context:"此角色无法编辑",
			noButton:false
		})
		fl =  false;
	}else{
		Web.Method.ajax("manRole/checkUserRole",{
			async: false,
			data:{
				roleId : rid
			},
			success : function(data){
				if(data.errcode == 1){
					$.confAlert({
						size:"sm",
						context:data.msg,
						noButton:false
					})
					fl = false;
				}
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
	return fl;
}