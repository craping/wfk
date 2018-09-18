var cmds = [];
var reqCount = 1;
var capacitys_productId;

$(function(){

	$("#listview_capacitys").listview({
		style:"table-hover",
		headerStyle:"noborder",
		module:[
	        {name:"序号",width:"8%"},
			{name:"功能名称",width:"auto"},
			{name:"功能类型",width:"auto"},
			{name:"数据类型",width:"auto"},
			{name:"添加时间",width:"auto"},
			{name:"功能描述",width:"auto"},
			{name:"操作",width:"130px"}
		],
		eachItem:function(ui, item){
			var page = $("#pageset_capacitys").data("crap.pageSet").options.pageSet.page-1;

			var time = new Date(item.createTime).format("yyyy/MM/dd");
			var tr = $("<tr>" +
						"<td width='8%'>"+(parseInt(item.indexKey) + page * rs.pageNum +1)+"</td>" +
						"<td><a name='detail' class='link' href='#capacitysDetail' data-toggle='tab'>"+item.name+"</a></td>" +
						"<td>"+rs.capacitysType[item.type]+"</td>" +
						"<td>"+rs.capacitysDataType[item.datatype]+"</td>" +
						"<td>"+time+"</td>" +
						"<td>"+item.description+"</td>" +
						(item.state=="ST001"?
						"<td><a name='modify' href='#capacitysDetail' data-toggle='tab'>修改</a><a name='delete' href='javascript:;'>删除</a></td>"
						:"<td><a name='detail' href='#capacitysDetail' data-toggle='tab'>查看</a></td>")+
					"</tr>");
			tr.find("a[name=delete]").click(function(){
				$.confAlert({
					context:"确定删除功能[序号"+item.id+"]?",
					size:"sm",
					onOk:function(){
						Web.Method.ajax("capacitys/deleteCapacitys", {
							data:{
								id:item.id
							},
							success:function(data){
								$.confAlert({
									size:"sm",
									context:"操作成功",
									noButton:false
								})
								queryCapacitysList(1);
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
				});
			});
			tr.find("a[name=modify],a[name=detail]").click(function(){
				if(this.nam == "modify")
					$("#capacitysMap").text("修改功能");
				else
					$("#capacitysMap").text("功能详情");
				var $this = $(this);
				queryParams(function(){
					Web.Method.ajax("capacitys/getCapacitysDetail", {
						data:{
							capacitysId:item.id
						},
						success:function(data){
							$("#capacitysInfoForm :hidden[name=id]").val(item.id);
							setCmdValue(data.info);
							capacitysFormLock($this.attr("name")=="detail");
							console.log(data.info);
						},
						fail:function(data){
							$.confAlert({
								size:"sm",
								context:data.msg,
								noButton:false
							})
						}
					});
				});
				queryAppList(capacitys_productId);
			});
			return tr;
		}
	});
	$("#pageset_capacitys").pageset({
		itemClick:function(page){
			queryCapacitysList(page);
		}
	});
	
	$("#capacitysAdd").click(function(){
		$("#capacitysMap").text("添加功能");
		capacitysFormLock(false);
		$("#capacitysInfoForm")[0].reset();
		$("#capacitysInfoForm :hidden[name=id]").val("");
		cmds = [];
		reqCount = 1;
		$("#reqs").empty();
		
		$("<a href='#capacitysDetail'/>").tab("show");
		queryParams(function(){
			var req = createReqElement(reqCount);
			cmds.push(req);
			$("#reqs").append(req);
		});
		queryAppList(capacitys_productId);
	});
	
	$("#capacitysCopy").click(function(){
		var prompt =  $("<div class='modal fade bs-example-modal-lg'>" +
							"<div class='modal-dialog modal-lg'>" +
								"<div class='modal-content'>" +
									"<div class='h1'>产品管理  <span class='jt_blue2'>>></span>  添加产品<img align='right' name='close' class='close' src='images/gb2.png'></div>" +
									"<div class='prompt_bao_div' style='background:#f3f3f3;'>" +
										"<div class='bg_w' name='listview' style='min-height:245px;'></div>" +
										"<div class='page' name='pageset'></div>" +
										"<div class='center' style='padding-bottom:20px;'>" +
											"<input type='button' name='ok' class='tbutton' value='确认'>" +
											"<input type='button' name='cancel' class='tbutton_z' value='取消'>" +
										"</div>" +
									"</div>" +
								"</div>" +
							"</div>" +
						"</div>");
		$("body").append(prompt);
		prompt.modal({
			keyboard: false
		}).on("hidden.bs.modal", function (e) {
			$(this).remove();
		});
		prompt.find("input[name=cancel],img[name=close]").click(function(){
			prompt.modal('hide');
		});
		prompt.find("input[name=ok]").click(function(){
			var pId = prompt.find(":radio[name=produtcId]:checked").val();
			Web.Method.ajax("capacitys/copyCapacitys", {
				data:{
					sourceProductId:capacitys_productId,
					targetProductId:pId,
				},
				success:function(data){
					$.confAlert({
						size:"sm",
						context:"复制成功",
						noButton:false
					})
					prompt.remove();
					back.remove();
				},
				fail:function(data){
					$.confAlert({
						size:"sm",
						context:data.msg,
						noButton:false
					})
				}
			});
		});
		
		var listview = prompt.find("div[name=listview]").listview({
			headerStyle:"noborder",
			module:[
	        	{name:"",width:"8%"},
		        {name:"序号",width:"auto"},
				{name:"产品ID",width:"auto"},
				{name:"产品名称",width:"auto"},
				{name:"产品型号",width:"auto"},
				{name:"芯片型号",width:"auto"},
				{name:"产品类型",width:"auto"},
				{name:"添加时间",width:"auto"},
				{name:"产品描述",width:"auto"}
			],
			eachItem:function(ui, item){
				var page = $("#pageset_capacitys").data("crap.pageSet").options.pageSet.page-1;

				var time = new Date(item.createtime).format("yyyy/MM/dd");
				var tr = $("<tr>" +
							"<td width='8%'><input id='radio-copy-"+item.indexKey+"' type='radio' name='produtcId' value='"+item.id+"'/><label for='radio-copy-"+item.indexKey+"' ></label></td>" +
							"<td>"+(parseInt(item.indexKey) + page * rs.pageNum +1)+"</td>" +
							"<td>"+item.code+"</td>" +
							"<td>"+item.name+"</td>" +
							"<td>"+item.model+"</td>" +
							"<td>"+item.chip+"</td>" +
							"<td>"+item.typeName+"</td>" +
							"<td>"+time+"</td>" +
							"<td>"+item.description+"</td>" +
						"</tr>");
				return tr;
			}
		});
		var pageset = prompt.find("div[name=pageset]").pageset({
			itemClick:function(page){
				queryCopyProductsList(page, listview, pageset);
			}
		});
		queryCopyProductsList(1, listview, pageset);
	});
	
	$("#reqAdd").click(function(){
		var req = createReqElement(++reqCount);
		cmds.push(req);
		$("#reqs").append(req);
	});
	
	
	$("#capacitys_submit").click(function(){
		var state = true;
		
		var data = $("#capacitysInfoForm").serializeJson(true);
		for(var key in data){
			var val = data[key];
			var div = $("#capacitysInfoForm").find("div[name=validate_"+key+"]").valAlert({alert:"danger", style:"width:550px"});
			var label = div.find("label[class=fl]").text();

			if(!val && label){
				div.valAlert("show", label+"不能为空");
				state = false;
			}else{
				div.valAlert("hide");
			}
		}
		
		data.cmds = [];
		var orderno = 1;
		for (var key in cmds) {
			var reqEl = cmds[key];
			if(!reqEl.validate()){
				state = false;
			}
			for(var key1 in reqEl.resps){
				var respEl = reqEl.resps[key1];
				if(!respEl.validate())
					state = false;
			}
			
			var reqCmd = reqEl.getData();
			if(reqCmd.params[0].cmdparamval){
				reqCmd.orderno = orderno++;
				data.cmds.push(reqCmd);
			}
		}
		/*var funCheck = true;
		$("textarea[name^=fun_]").each(function(){
			funCheck = validateFun($(this).val());
			return funCheck;
		})
		if(!funCheck)
			return;*/
		if(!state)
			return;
		
		data.productId=capacitys_productId;
		data.cmds = JSON.stringify(data.cmds);
		data.format="json";
		
		if(data.id){
			$.ajax({
				type: "post",
				data:data,
				url: Web.Recource.serverURL + "capacitys/modifyCapacitys",
				dataType: "json",
				success: function(data){
					if(data.result){
						alert(data.msg);
					}else{
						$.confAlert({
							size:"sm",
							context:"修改成功",
							noButton:false
						})
						$("<a href='#capacitysList'/>").tab("show");
						queryCapacitysList(1);
					}
					console.log(data);
				},
				error: function(XMLHttpRequest, textStatus, errorThrown){
				}
			});
			/*Web.Method.ajax("capacitys/modifyCapacitys", {
				data:data,
				success:function(data){
					queryCapacitysList(1);
					$("<a href='#capacitysList'/>").tab("show");
					alert('修改成功');
				},
				fail:function(data){
					alert(data.msg);
					console.log(data);
				}
			});*/
		}else{
			$.ajax({
				type: "post",
				data:data,
				url: Web.Recource.serverURL + "capacitys/addCapacitys",
				dataType: "json",
				success: function(data){
					if(data.result){
						alert(data.msg);
					}else{
						$.confAlert({
							size:"sm",
							context:"添加成功",
							noButton:false
						})
						$("<a href='#capacitysList'/>").tab("show");
						queryCapacitysList(1);
					}
				},
				error: function(XMLHttpRequest, textStatus, errorThrown){
				}
			});
			/*Web.Method.ajax("capacitys/addCapacitys", {
				data:data,
				success:function(data){
					queryCapacitysList(1);
					$("<a href='#capacitysList'/>").tab("show");
					alert('添加成功');
				},
				fail:function(data){
					alert(data.msg);
					console.log(data);
				}
			});*/
		}
		
	});
	
	$("#capacitys_cancel").click(function(){
		$("<a href='#capacitysList'/>").tab("show");
		queryCapacitysList(1);
	});
	$("#appCreate").click(function(){
		$("#app_iframe")[0].src = Web.Recource.appServerURL+"app-create.html?productId="+capacitys_productId;
	});
	
	$("#app_href").click(function(){
		$("#app_iframe")[0].src = Web.Recource.appServerURL+"app-list.html?productId="+capacitys_productId;
	});
});



function capacitysFormLock(lock){
	$("#capacitysDetail").find(":input[name!=dropDisplay],textarea,div[name=respAdd],div[name=deleteReq], button[name=deleteResp], button[name=reqAdd], i[name=dropBtn]").each(function(){
		var name = $(this).attr("name");
		if(name =="save" || name =="respAdd" || name =="deleteReq" || name == "deleteResp" || name=="reqAdd" || name=="dropBtn"){
			if(lock)
				$(this).hide();
			else
				$(this).show();
		}
		if(this.name !="cancel"){
			if(lock)
				$(this).attr("disabled","disabled");
			else
				$(this).removeAttr("disabled");
		}
			
	});
}



function queryCopyProductsList(page, listview, pageset){
	listview = listview?listview:$("#listview_products");
	listview.listview("loading");
	Web.Method.ajax("product/getProductList",{
		data:{
			page_flag:page,
			page_num:rs.pageNum,
			exceptProductId:capacitys_productId
		},
		success:function(data){
			pageset = pageset?pageset:$("#pageset_products");
			pageset.pageset("setData", {
				totalpage:data.totalpage,
				page:data.page
			});

			listview.listview("setData", data.info);
			$("#listview_products_copy").listview("setData", data.info);
			$("input[name='selectProduct']:first").attr('checked', 'checked');
			$("input[name='selectCopyProduct']:first").attr('checked', 'checked');
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

function queryCapacitysList(page){
	$("#listview_capacitys").listview("loading");
	Web.Method.ajax("capacitys/getCapacitysList", {
		data:{
			page_flag:page,
			page_num:rs.pageNum,
			productId:capacitys_productId
		},
		success:function(data){
			$("#pageset_capacitys").pageset("setData", {
				totalpage:data.totalpage,
				page:data.page
			});
			$("#listview_capacitys").listview("setData", data.info);
			
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

function queryParams(callback){
	Web.Method.ajax("capacitys/getParams", {
		data:{
			msgType:1
		},
		success:function(data){
			rs.params = data.info;
			if(callback)
				callback(data);
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

function createReqElement(count, clearResp, reqData){
	var reqCode = reqData && reqData.code?reqData.code:Web.Method.uuid();
	var param = null;
	if(reqData && reqData.params.length){
		param = {};
		for ( var key in reqData.params) {
			var p = reqData.params[key];
			param[p.cmdparamName] = {
				id:p.id,
				val:p.cmdparamval,
				funContext:p.valanalyticalContext
			};
		}
	}
	var funContext = param?param[rs.params[3].paramname].funContext:"";
	funContext = funContext==null?"":funContext;
	var req = $("<div name='req'><div class='bg_w' style='min-height:210px;margin:20px 0;'>" +
					"<div class='paddingt20'>" +
						"<div class='information'>" +
							"<span class='blue_y'>&nbsp;&nbsp;</span>请求－Q" +count+
							
							(count==1?"":"<div name='deleteReq' class='delete'>删除</div>") +
							"<div class='input_che fr' style='position:relative;'>" +
								"<input id='radio-directivity-"+count+"-1' name='directivity_"+count+"' value='0' type='radio' "+(reqData && reqData.directivity?"":"checked='checked'")+"/><label for='radio-directivity-"+count+"-1'></label><span class='pp'>正向（到设备）</span>" +
								"<input id='radio-directivity-"+count+"-2' name='directivity_"+count+"' value='1' type='radio'"+(reqData && reqData.directivity?"checked='checked'":"")+"/><label for='radio-directivity-"+count+"-2'></label><span class='pp'>反向（来自设备）</span>" +
							"</div>" +
						"</div>" +
					"</div>" +
					"<div class='margin30'>" +
						"<div>Code:"+reqCode+"<input name='code_"+count+"' type='hidden' value='"+reqCode+"'/></div>"+
						"<div style='width:279px;' class='input_div fl' >" +
							"<label class='fl'>UUID</label>" +
							"<span></span>" +
							"<div style='position:relative;' class='fl'>" +
								"<input name='"+rs.params[0].id+"_"+count+"_"+rs.params[0].id+"' "+(param?"value='"+param[rs.params[0].paramname].id+"'":"")+" type='hidden'/>" +
								"<input name='"+rs.params[0].paramname+"_"+count+"_"+rs.params[0].id+"' "+(param?"value='"+param[rs.params[0].paramname].val+"'":"")+" type='text' style='width:150px;' placeholder=''>" +
							"</div>" +
							"<div class='clear'></div>" +
						"</div>" +
						"<div style='width:279px;margin-left:20px;' class='input_div fl'>" +
							"<label class='fl'>Handle</label>" +
							"<span></span>" +
							"<div style='position:relative;' class='fl'>" +
								"<input name='"+rs.params[1].id+"_"+count+"_"+rs.params[1].id+"' "+(param?"value='"+param[rs.params[1].paramname].id+"'":"")+" type='hidden'/>" +
								"<input name='"+rs.params[1].paramname+"_"+count+"_"+rs.params[1].id+"' "+(param?"value='"+param[rs.params[1].paramname].val+"'":"")+" type='text' style='width:150px;' placeholder=''>" +
							"</div>" +
							"<div class='clear'></div>" +
						"</div>" +
						"<div class='clear' name='valdate_uuid_"+count+"'></div>" +
						"<div style='width:229px;' class='input_div fl'>" +
							"<label class='fl'>值</label>" +
							"<span></span>" +
							"<div style='position:relative;' class='fl'>" +
								"<input name='"+rs.params[3].id+"_"+count+"_"+rs.params[3].id+"' "+(param?"value='"+param[rs.params[3].paramname].id+"'":"")+" type='hidden'/>" +
								"<input name='"+rs.params[3].paramname+"_"+count+"_"+rs.params[3].id+"' "+(param?" value='"+param[rs.params[3].paramname].val+"'":"")+" type='text' style='width:123px;' placeholder=''>" +
							"</div>" +
							"<div class='clear'></div>" +
						"</div>" +
						"<div class='custom'><a data-toggle='pop' href='#pop_"+count+"'>自定义</a></div>" +
						"<div style='width:279px;margin-left:20px;' class='input_div fl'>" +
							"<label class='fl'>Descriptor</label>" +
							"<span></span>" +
							"<div style='position:relative;' class='fl'>" +
								"<input name='"+rs.params[2].id+"_"+count+"_"+rs.params[2].id+"' "+(param?"value='"+param[rs.params[2].paramname].id+"'":"")+" type='hidden'/>" +
								"<input name='"+rs.params[2].paramname+"_"+count+"_"+rs.params[2].id+"' "+(param?"value='"+param[rs.params[2].paramname].val+"'":"")+" type='text' style='width:150px;' placeholder=''>" +
							"</div>" +
							"<div class='clear'></div>" +
						"</div>" +
						"<div class='clear'></div>" +
						"<div id='pop_"+count+"' class='popover bottom' style='width:580px;max-width:none; position: relative;'>" +
							"<div class='arrow' style='left:45%;'></div>" +
							"<div class='popover-content'>" +
								"<p>自定义处理函数</p>" +
								"<textarea name='fun_"+count+"_"+rs.params[3].id+"' class='form-control' rows='' cols=''  style='width:525px;'>"+funContext+"</textarea>" +
								"获取次数:<input name='count_"+count+"' type='number' min='1' value='"+(reqData && reqData.reqcount?reqData.reqcount:1)+"'/>" +
								"&nbsp;<button type='button' name='funValidate_"+count+"' class='btn btn-info btn-xs'>校验函数</button>" +
							"</div>" +
						"</div>" +
					"</div>" +
						
					"<div class='paddingt20'>" +
						"<div class='information'>" +
							"<div name='respAdd' class='delete'>添加</div>" +
							"<span class='blue_y'>&nbsp;&nbsp;</span>响应" +
						"</div>" +
					"</div>" +
					
					"<div name='resps'>" +
						
					"</div>" +
					
				"</div></div>");
	req.respCount = clearResp?0:1;
	req.resps = [];
	req.reqData = reqData;
	
	req.find("div[name=deleteReq]").click(function(){
		if(reqCount == 1){
			$.confAlert({
				size:"sm",
				context:"至少得有一个请求",
				noButton:false
			})
			return;
		}
		reqCount--;
		req.remove();
		
		var index = cmds.indexOf(req);
		cmds.splice(index, 1);
	});
	
	req.find("button[name=funValidate_"+count+"]").click(function(){
		var fun = req.find("textarea[name=fun_"+count+"_"+rs.params[3].id+"]").val();
		var result = validateFun(fun);
		$("#pop_"+count).valAlert({alert:"danger", style:"width:550px"});
		if(!result.result){
			$("#pop_"+count).valAlert("show", result.msg);
		}else{
			$("#pop_"+count).valAlert("hide");
		}
	});
	
	req.find("a[data-toggle=pop]").click(function(){
		$($(this).attr("href")).toggle();
		return false;
	});
	
	
	
	req.find("div[name=respAdd]").click(function(){
		var respNew = createRespElement(count, ++req.respCount);
		
		respNew.find("button[name=deleteResp]").click(function(){
			respNew.remove();
			req.respCount--;
			
			var index = req.resps.indexOf(respNew);
			req.resps.splice(index, 1);
		});
		
		req.find("div[name=resps]").append(respNew);
		
		req.resps.push(respNew);
	});
	
	if(!clearResp){
		var resp = createRespElement(count, req.respCount);
		req.resps.push(resp);
		resp.find("button[name=deleteResp]").click(function(){
			resp.remove();
			req.respCount--;
			
			var index = req.resps.indexOf(resp);
			req.resps.splice(index, 1);
		});
		
		req.find("div[name=resps]").append(resp);
	}
	
	req.getData = function(){
		var data = {
			id:this.reqData?this.reqData.id:null,
			code:reqCode,
			directivity:req.find("input[name=directivity_"+count+"]:checked").val(),
			orderno:count,
			reqcount:req.find(":input[name=count_"+count+"]").val(),
			params:[],
			resps:[]
		};
		var orderno = 1;
		for(var key in req.resps){
			var respCmd = req.resps[key].getData();
			if(respCmd.params[0].cmdparamval){
				respCmd.orderno = orderno++;
				data.resps.push(respCmd);
			}
		}
		for(var key in rs.params){
			var p = rs.params[key];
			data.params.push({
				id:req.find(":hidden[name="+p.id+"_"+count+"_"+p.id+"]").val(),
				cmdparamId:p.id,
				cmdparamval:req.find(":input[name="+p.paramname+"_"+count+"_"+p.id+"]").val(),
				valanalyticalContext:req.find("textarea[name=fun_"+count+"_"+p.id+"]").val()
			});
		}
		return data;
	};
	
	req.validate = function(){
		var state = true;
		
		var fun = req.find("textarea[name=fun_"+count+"_"+rs.params[3].id+"]").val();
		var result = validateFun(fun);
		var funDiv = $("#pop_"+count).valAlert({alert:"danger", style:"width:550px"});
		if(!result.result){
			funDiv.valAlert("show", result.msg);
			state = false;
		}else{
			funDiv.valAlert("hide");
		}
		
		var uuid = req.find(":input[name=uuid_"+count+"_"+rs.params[0].id+"]").val();
		var uuidDiv = $("div[name=valdate_uuid_"+count+"]").valAlert({alert:"danger", style:"width:250px"});
		if(!uuid){
			uuidDiv.valAlert("show", "UUID不能为空");
			state = false;
		}else{
			uuidDiv.valAlert("hide");
		}
		
		return state;
	};
	
	return req;
}

function createRespElement(count, index, respData){
	var respCode = respData && respData.code?respData.code:Web.Method.uuid();
	var param = null;
	
	if(respData && respData.params.length){
		param = {};
		for ( var key in respData.params) {
			var p = respData.params[key];
			param[p.cmdparamName] = {
				id:p.id,
				val:p.cmdparamval,
				funContext:p.valanalyticalContext
			};
		}
	}
	var funContext = param?param[rs.params[3].paramname].funContext:"";
	funContext = funContext==null?"":funContext;
	
	var resp = $("<div class='margin30' style='padding-bottom:30px;' name='validate_fun_"+count+"_"+index+"'>" +
						"<div>响应-A"+index+" Code:"+respCode+"<input name='code_"+count+"_"+index+"' type='hidden' value='"+respCode+"'/></div>"+
						"<div style='width:279px;' class='input_div fl' >" +
							"<label class='fl'>UUID</label>" +
							"<span></span>" +
							"<div style='position:relative;' class='fl'>" +
								"<input name='"+rs.params[0].id+"_"+count+"_"+index+"_"+rs.params[0].id+"' "+(param?"value='"+param[rs.params[0].paramname].id+"'":"")+" type='hidden'/>" +
								"<input name='"+rs.params[0].paramname+"_"+count+"_"+index+"_"+rs.params[0].id+"' "+(param?"value='"+param[rs.params[0].paramname].val+"'":"")+" type='text' style='width:150px;' placeholder=''>" +
							"</div>" +
							"<div class='clear'></div>" +
						"</div>" +
						"<div style='width:279px;margin-left:20px;' class='input_div fl'>" +
							"<label class='fl'>Handle</label>" +
							"<span></span>" +
							"<div style='position:relative;' class='fl'>" +
								"<input name='"+rs.params[1].id+"_"+count+"_"+index+"_"+rs.params[1].id+"' "+(param?"value='"+param[rs.params[1].paramname].id+"'":"")+" type='hidden'/>" +
								"<input name='"+rs.params[1].paramname+"_"+count+"_"+index+"_"+rs.params[1].id+"' "+(param?"value='"+param[rs.params[1].paramname].val+"'":"")+" type='text' style='width:150px;' placeholder=''>" +
							"</div>" +
							"<div class='clear'></div>" +
						"</div>" +
						"<div class='clear' name='valdate_uuid_"+count+"_"+index+"'></div>" +
						
						"<div style='width:229px;' class='input_div fl'>" +
							"<label class='fl'>值</label>" +
							"<span></span>" +
							"<div style='position:relative;' class='fl'>" +
								"<input name='"+rs.params[3].id+"_"+count+"_"+index+"_"+rs.params[3].id+"' "+(param?"value='"+param[rs.params[3].paramname].id+"'":"")+" type='hidden' />" +
								"<input name='"+rs.params[3].paramname+"_"+count+"_"+index+"_"+rs.params[3].id+"' "+(param?"value='"+param[rs.params[3].paramname].val+"'":"")+" type='text' style='width:123px;' placeholder=''>" +
							"</div>" +
							"<div class='clear'></div>" +
						"</div>" +
						"<div class='custom'><a data-toggle='pop' href='#pop_"+count+"_"+index+"'>自定义</a></div>" +
						"<div style='width:279px;margin-left:20px;' class='input_div fl'>" +
							"<label class='fl'>Descriptor</label>" +
							"<span></span>" +
							"<div style='position:relative;' class='fl'>" +
								"<input name='"+rs.params[2].id+"_"+count+"_"+index+"_"+rs.params[2].id+"' "+(param?"value='"+param[rs.params[2].paramname].id+"'":"")+" type='hidden' />" +
								"<input name='"+rs.params[2].paramname+"_"+count+"_"+index+"_"+rs.params[2].id+"' "+(param?"value='"+param[rs.params[2].paramname].val+"'":"")+" type='text' style='width:150px;' placeholder=''>" +
							"</div>" +
							"<div class='clear'></div>" +
						"</div>" +
						"<div class='clear'></div>" +
						"<div id='pop_"+count+"_"+index+"' class='popover bottom' style='width:580px;max-width:none; position: relative;'>" +
							"<div class='arrow' style='left:45%;'></div>" +
							"<div class='popover-content'>" +
								"<p>自定义处理函数</p>" +
								"<textarea name='fun_"+count+"_"+index+"_"+rs.params[3].id+"' class='form-control' rows='' cols='' style='width:525px;'>"+funContext+"</textarea>" +
								"获取次数:<input name='count_"+count+"_"+index+"' type='number' min='1' value='"+(respData && respData.respcount?respData.respcount:1)+"'/>" +
								"&nbsp;<button type='button' name='funValidate_"+count+"_"+index+"' class='btn btn-info btn-xs'>校验函数</button>" +
							"</div>" +
						"</div>" +
						"<br/>" +
						"<button name='deleteResp' style='width:580px;' class='btn btn-danger btn-block btn-sm' type='button'>删除响应</button>" +
					"</div>");
	resp.find("a[data-toggle=pop]").click(function(){
		$($(this).attr("href")).toggle();
		return false;
	});
	resp.find("button[name=funValidate_"+count+"_"+index+"]").click(function(){
		var fun = resp.find("textarea[name=fun_"+count+"_"+index+"_"+rs.params[3].id+"]").val();
		validateFun(fun, true);
	});
	
	resp.respData = respData;
	
	resp.getData = function(){
		var data = {
			id:this.respData?this.respData.id:null,
			code:respCode,
			orderno:index,
			respcount:resp.find(":input[name=count_"+count+"_"+index+"]").val(),
			params:[]
		};
		for(var key in rs.params){
			var p = rs.params[key];
			data.params.push({
				id:resp.find(":hidden[name="+p.id+"_"+count+"_"+index+"_"+p.id+"]").val(),
				cmdparamId:p.id,
				cmdparamval:resp.find(":input[name="+p.paramname+"_"+count+"_"+index+"_"+p.id+"]").val(),
				valanalyticalContext:resp.find("textarea[name=fun_"+count+"_"+index+"_"+p.id+"]").val()
			});
		}
		return data;
	};
	
	resp.validate = function(){
		var state = true;
		
		var fun = resp.find("textarea[name=fun_"+count+"_"+index+"_"+rs.params[3].id+"]").val();
		var result = validateFun(fun);
		var funDiv = $("#pop_"+count+"_"+index).valAlert({alert:"danger", style:"width:550px"});
		if(!result.result){
			funDiv.valAlert("show", result.msg);
			state = false;
		}else{
			funDiv.valAlert("hide");
		}
		
		var uuid = resp.find(":input[name=uuid_"+count+"_"+index+"_"+rs.params[0].id+"]").val();
		var uuidDiv = $("div[name=valdate_uuid_"+count+"_"+index+"]").valAlert({alert:"danger", style:"width:250px"});
		if(!uuid){
			uuidDiv.valAlert("show", "UUID不能为空");
			state = false;
		}else{
			uuidDiv.valAlert("hide");
		}
		
		return state;
	};
	
	return resp;
}

function setCmdValue(data){
	cmds = [];
	$("#reqs").empty();
	for (reqCount = 1; reqCount <= data.messages.length; reqCount++) {
		var msg = data.messages[reqCount-1];
		var req = createReqElement(reqCount, true, msg);
		cmds.push(req);
		if(msg.resps){
			for (var i = 0; i < msg.resps.length; i++) {
				var resp = createRespElement(reqCount, ++req.respCount, msg.resps[i]);
				
				resp.find("button[name=deleteResp]").click({resp:resp, req:req}, function(event){
					event.data.resp.remove();
					event.data.resp.respCount--;
					var index = event.data.resp.resps.indexOf(event.data.resp);
					event.data.resp.resps.splice(index, 1);
				});
				
				req.find("div[name=resps]").append(resp);
				
				req.resps.push(resp);
			}
		}
		$("#reqs").append(req);
	}
	for(var key in data){
		var val = data[key];
		if(key == "datatype")
			key = "dataTypeDrop";
		Web.Method.setValue(key, val);
	}
}

function validateFun(fun){
	try{
		if(!fun || fun == "")
			return {result:true};
		eval("var testFun ="+fun);
		if(testFun.length != 1){
			return {result:false, msg:"函数参数个数不正确"};
		}
		var result = testFun();
		if(typeof(result) == "undefined"){
			return {result:false, msg:"函数缺少返回结果"};
		}
		if(typeof(result) != "object"){
			return {result:false, msg:"返回结果格式错误"};
		}
		if(!result.hasOwnProperty("type")){
			return {result:false, msg:"返回结果缺少 type 属性"};
		}
		if(!result.hasOwnProperty("val")){
			return {result:false, msg:"返回结果缺少 val 属性"};
		}
		if(!result.hasOwnProperty("needCallback")){
			return {result:false, msg:"返回结果缺少 needCallback 属性"};
		}
		if(!result.hasOwnProperty("next")){
			return {result:false, msg:"返回结果缺少 next 属性"};
		}
		
		if(result.next == 1 && !result.hasOwnProperty("nextReqCode")){
			return {result:false, msg:"返回结果缺少 nextReqCode 属性"};
		}
	}catch(e){
		return {result:false, msg:"函数错误"};
	}
	return {result:true};
}