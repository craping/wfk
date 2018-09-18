var serverIp="localhost";
var serverPort="8090";
try{
	document.domain=serverIp;
}catch(e){
}
var Web = {
	token:{},
	Recource:{
		user:{},
		server:"http://"+serverIp+":"+serverPort+"/wfk.protocol.http",
		serverURL:"http://"+serverIp+":"+serverPort+"/wfk.protocol.http/api/",
		requestSysUrl:"http://"+serverIp+":"+serverPort+"/wfk.protocol.http/api/sys/"
	},
	Method:{
		url:function(path){
			if(path.indexOf("http://") == -1 && path.indexOf("https://") == -1)
				return Web.Recource.server + path;
			return path;
		},
		defaultDate:function(){
			var d, s = "";
			d = new Date();
			s += (d.getFullYear()< 10? "0"+d.getFullYear():d.getFullYear()) + "-";
			s += ((d.getMonth()+1)< 10? "0"+(d.getMonth()+1):(d.getMonth()+1)) + "-";
			return {
		   		startDate:s + "01", 
		   		endDate:s + (d.getDate()< 10? "0"+d.getDate():d.getDate()),
		   		startTime:s + "01 00:00:00",
		   		endTime:s + (d.getDate()< 10? "0"+d.getDate():d.getDate()) + " "+(d.getHours()< 10? "0"+d.getHours():d.getHours())+":"+(d.getMinutes()< 10? "0"+d.getMinutes():d.getMinutes())+":"+(d.getSeconds()< 10? "0"+d.getSeconds():d.getSeconds()),
		   		minDate:"2012-08-01",
				maxDate:s + (d.getDate()< 10? "0"+d.getDate():d.getDate())
			};
		},
		getObjectURL:function(file) {
			var url = null ; 
			if(!file.value || file.value==""){
				return null;
			} else if (!file.files || !file.files[0]){
				file.select();
				url = document.selection.createRange().text;
			} else if (window.createObjectURL!=undefined) { // basic
				url = window.createObjectURL(file) ;
			} else if (window.URL!=undefined) { // mozilla(firefox)
				url = window.URL.createObjectURL(file.files[0]) ;
			} else if (window.webkitURL!=undefined) { // webkit or chrome
				url = window.webkitURL.createObjectURL(file.files[0]) ;
			}
			return url;
		},
		setValue:function(name, val){
		    if(val != ""){
		        var htmlType = $("[name='"+name+"']").attr("type");
		        if(!htmlType || htmlType == "text" || htmlType == "textarea" || htmlType == "select" || htmlType == "hidden" || htmlType == "button"){
		            $("[name='"+name+"']").val(val);
		        }else if(htmlType == "radio"){
		            $("input[type=radio][name='"+name+"'][value='"+val+"']").attr("checked",true);
		        }else if(htmlType == "checkbox"){
		            var vals = val.split(",");
		            for(var i=0; i < vals.length; i++){
		                $("input[type=checkbox][name='"+name+"'][value='"+vals[i]+"']").attr("checked",true);
		            }
		        }
		    }
		},
		/* Common - Ajax request */
		ajax:function(method, param) {
			
			
			var defaultParam = {
				param:{},
				safe:false,
				data:{
					format:"json"
				},
				url:Web.Recource.serverURL,
				success:function(){},
				fail:function(){},
				error:function(){}
			};
			$.extend(true, defaultParam, param);
			
			var cipher;
			if(defaultParam.safe){
				cipher = Crypto.generateCipher();
				defaultParam.data = {
					encrypt_data:cipher.encrypt($.param(param.data)),
					encrypt_source:"javascript",
					encrypt_flag:Crypto.encryptFlag,
					format:"json"
				};
			}
			
			$.ajax({
				type: "get",
				data:defaultParam.data,
				async:defaultParam.async,
				url: defaultParam.url + method,
				dataType: "jsonp",
				jsonp: "callback",
				success: function(data){
					//Web.Method.loadCheck(data);
					if(param.safe){
						data = eval("("+decodeURIComponent(cipher.decrypt(data).replace(/\+/g, '%20'))+")");
					}
					if(data.result == 0){
						defaultParam.success(data.data?data.data:data, defaultParam.param);
					}else if(data.result == 1){
						defaultParam.error(data, defaultParam.param);
					}else if(data.result ==3 && data.errcode == 400){
						alert(data.msg)
					}else{
						defaultParam.fail(data, defaultParam.param);
					}
				},
				error: function(XMLHttpRequest, textStatus, errorThrown){
					if(defaultParam.error)
						defaultParam.error(XMLHttpRequest, textStatus, errorThrown, defaultParam.param);
				}
			});
		}
	}
};


/*

Override
-----------------------------------------------

*/
Date.prototype.format = function(format) {
    var date = {
           "M+": this.getMonth() + 1,
           "d+": this.getDate(),
           "h+": this.getHours()%12 == 0 ? 12 : this.getHours()%12,
           "H+": this.getHours(),
           "m+": this.getMinutes(),
           "s+": this.getSeconds(),
           "q+": Math.floor((this.getMonth() + 3) / 3),
           "S+": this.getMilliseconds()
    };
    if (/(y+)/i.test(format)) {
           format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in date) {
           if (new RegExp("(" + k + ")").test(format)) {
                  format = format.replace(RegExp.$1, RegExp.$1.length == 1
                         ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
           }
    }
    return format;
};
String.prototype.replaceAll = function(s1,s2) {
	return this.replace(new RegExp(s1,"gm"), s2);
};

(function ($) {
	$.fn.serializeJson=function(includeEmpty){
	    var json={};
	    $(this.serializeArray()).each(function(){
	    	if(includeEmpty || (this.value && this.value != ""))
	    		json[this.name]=this.value;
	    });
	    return json;  
	};
	$.fn.validation=function(state, sign, msg){
		this.removeClass("has-success has-warning has-error");
		this.find(".form-control-feedback, .control-label").remove();
		if(state)
			this.addClass("has-"+state);
		if(msg)
			this.prepend("<label class='control-label'>"+msg+"</label>");
		if(sign){
			this.addClass("has-feedback");
			this.append("<span class='glyphicon glyphicon-"+state+"-sign form-control-feedback' aria-hidden='true'></span>");
		}
	};
	
})(jQuery);



/*

Resize - jQuery Image Resize Plugin
-----------------------------------------------

*/
(function ($) {
	function Resize(target, option) {
		this.options = option;
		this.container = $(target);
		this.timer;
		this.init();
	};
	
	Resize.prototype.init = function() {
		var $this = this;
		//防止切换图片时闪屏
		this.container.parent().css("overflow","hidden");
		this.container.load(function(){
			$this.resize($this.container);
		});
	};
	Resize.prototype.resize = function(container){
		
		var imgWidth, imgHeight
	    if (container[0].naturalWidth) { //获取图片实际高宽 
	    	imgWidth = container[0].naturalWidth
	    	imgHeight = container[0].naturalHeight
	    }

		var width = this.options.width;
		var height = this.options.height;
		var target = container.parent()[0];
		
		if(target){
			width = target.clientWidth;
			height = target.clientHeight;
		}
		container.width("auto").height("auto");
	    var imgScale = imgWidth/imgHeight;
	    var scaleHeight = width/imgScale;
	    
	    if(scaleHeight > height){
	    	container.height(imgHeight > height?height:imgHeight);
	    }else{
	    	container.width(imgWidth > width?width:imgWidth);
	    }

		container.css({
			//left:((width - container[0].clientWidth) / 2) +"px",
			"margin-top":((height - container[0].clientHeight) / 2) +"px"
		});
	};
	
	Resize.defaultOption = {
	};
	$.fn.resize = function(option, param){
		
		return this.each(function() {
			var $this   = $(this);
			var data    = $this.data('crap.resize');
			var options = typeof option == 'object' && option;
			
			options = $.extend(true, {}, Resize.defaultOption, $this.data(), options);
			
			if (!data) $this.data('crap.resize', (data = new Resize(this, options)));
			if (typeof option == 'string') data[option](param);
		});
	};
	$.fn.resize.Constructor = Resize;
})(jQuery);
/*

Page - jQuery PageSet Plugin
-----------------------------------------------

*/
(function ($) {
	function PageSet(target, option) {
		this.options = option;
		this.container = $(target);
		this.init();
	};
	
	PageSet.prototype.init = function() {
		this.ul = $("<ul class='pagination'/>");
		this.container.append(this.ul);
		this.setData(this.options.pageSet);
	};
	
	PageSet.prototype.setData = function(pageSet) {
		var $this = this;
		if(!pageSet)
			$this.container.hide();
		$this.ul.find("*").remove();
		
		var num = $this.options.num > pageSet.totalpage?pageSet.totalpage:$this.options.num;
		var leftSpace,rightSpace;
		rightSpace = parseInt((num-1)/2);
		if(num%2==0){
			leftSpace = num/2;
		}else{
			leftSpace = rightSpace;
		}
		
		if(pageSet.page > 1){
			$this.ul.append("<li class='enable' name='"+(pageSet.page-1)+"'><a href='javascript:;''>&laquo;</a></li>");
		}
		
		var leftNum = pageSet.page - leftSpace;
		if(leftNum <= 1){
			leftNum = 1;
		}else{
			$this.ul.append("<li class='enable' name='1'><a href='javascript:;'>1</a></li>");
			if(leftNum > 2)
				$this.ul.append("<li><a style='background-color:#eee'>...</a></li>");
		}
		for ( var i=leftNum; i < pageSet.page; i++) {
			$this.ul.append("<li class='enable' name='"+i+"'><a href='javascript:;'>"+i+"</a></li>");
		}
		
		$this.ul.append("<li class='active'><a href='javascript:;'>"+pageSet.page+"</a></li>");
		
		var rightNum = pageSet.page + rightSpace;
		rightNum = rightNum<=num?num:rightNum;
		for ( var i = pageSet.page + 1; i <= rightNum; i++) {
			$this.ul.append("<li class='enable' name='"+i+"'><a href='javascript:;'>"+i+"</a></li>");
		}
		if(rightNum < pageSet.totalpage){
			if((pageSet.totalpage-rightNum) >= 2)
				$this.ul.append("<li><a style='background-color:#eee'>...</a></li>");
			$this.ul.append("<li class='enable' name='"+pageSet.totalpage+"'><a href='javascript:;'>"+pageSet.totalpage+"</a></li>");
		}
		
		if(pageSet.page < pageSet.totalpage){
			$this.ul.append("<li class='enable' name='"+(pageSet.page+1)+"'><a href='javascript:;''>&raquo;</a></li>");
		}
		$this.ul.find("li.enable").click($this, function(event){
			event.data.options.itemClick($(this).attr("name"), $this);
		});
	};
	
	PageSet.defaultOption = {
		pageSet:{
			totalpage:1,	//总页数
			page:1,			//当前页
		},
		num:10,				//可选页数
		itemClick:function(page){},
		eachItem:function(ui, result){
			var item = "<tr id='"+ result.contactId+"'>";
			for ( var key in ui.options.module) {
				var m =  ui.options.module[key];
				item += "<td name ='"+m.key+"' width='"+m.width +"'>"+result[m.key]+"</td>";
			}
			item += "</tr>";
			return item;
		}
	};
	$.fn.pageset = function(option, param){
		
		return this.each(function() {
			var $this   = $(this);
			var data    = $this.data('crap.pageSet');
			var options = typeof option == 'object' && option;
			
			options = $.extend(true, {}, PageSet.defaultOption, $this.data(), options);
			
			if (!data) $this.data('crap.pageSet', (data = new PageSet(this, options)));
			if (typeof option == 'string') data[option](param);
		});
	};
	$.fn.pageset.Constructor = PageSet;
})(jQuery);

/*

ListView - jQuery List Plugin
-----------------------------------------------

*/

(function($) {
	function ListView(target, option) {
		this.options = option;
		this.container = $(target);
		this.listHeard = null;
		this.listBody = null;
		this.parent = null;
		this.init();
	};
	
	ListView.prototype.filter = function(keyword){
		this.setData(this.options.filter(keyword, this.options.dataResult), true);
		$.each(this.listHeard.find(":checkbox"),function(){
			this.checked = false;
		});
	};
	
	ListView.prototype.setData = function(dataResult) {
		var $this = this;
		$this.listBody.find("*").remove();

		if(dataResult && dataResult.length > 0){
			for (var key in dataResult) {
				var result = dataResult[key];
				if(!result)
					continue;
				result["indexKey"] = key;
				$this.listBody.append($this.options.eachItem($this, result));
				if($this.options.spacing > 0){
					$this.listBody.append("<tr><td colspan='"+$this.options.module.length+"' height='"+$this.options.spacing+"' style='padding:0px;background-color:transparent;border:none;'></td></tr>");
				}
			}
		}else{
			$this.listBody.html($this.options.defaultView($this));
		}
		$this.hideLoading();
		$this.options.dataResult = dataResult;
		$this.options.setDateAfter($this, dataResult);
	};
	
	ListView.prototype.addItems = function(results){
		this.listBody.find("table.listDefault").hide();
		this.listBody.find("table.listBody").show();
		for ( var key in results) {
			var result = results[key];
			if(!result)
				continue;
			result["indexKey"] = this.options.dataResult.push(result) - 1;
			this.listBody.find("table.listBody").append(this.options.eachItem(this, result));
			
		}
		if(this.options.scroll)
			this.checkScroll();
	};
	
	ListView.prototype.delItems = function(indexKeys){
		this.options.dataResult[indexKeys] = null;
		/*for ( var key in indexKeys){
			var index = indexKeys[key];
			this.options.dataResult.splice(index, 1);
		}*/
		if(this.options.scroll)
			this.checkScroll();
	};
	
	ListView.prototype.loading = function(){
		this.listBody.proAlert("show");
	};
	ListView.prototype.hideLoading = function(){
		this.listBody.proAlert("hide");
	};
	
	
	
	
	ListView.prototype.setHeight = function(height) {
		this.container.height(height);
		this.listBody.height(height - 38);
		this.checkScroll();
	};
	
	ListView.prototype.checkScroll = function(){
		if(this.options.scroll)
			this.listBody.mCustomScrollbar("update");
	};
	
	ListView.prototype.scrollTo = function(position){
		if(this.options.scroll)
			this.listBody.mCustomScrollbar("scrollTo", position);
	};
	
	ListView.prototype.init = function() {
		this.parent = this.options.parent;
		this.list = $("<table class='table "+ this.options.style+"'/>");
		this.listHeard = $("<thead class='"+this.options.headerStyle+"'></thead>");
		var listHeard = "<tr>";
		for (var key in this.options.module) {
			var result = this.options.module[key];
			listHeard += "<td name ='"+key+"' width='"+result.width +"' class='"+result.style+"'>"+result.name+"</td>";
		}
		listHeard += "</tr>";
		this.listHeard.html(listHeard).find("td").bind("click", this, this.options.onHeardClick);
		
		this.listBody = $("<tbody></tbody>").proAlert({icon:"fa-spinner fa-spin",modal:true});
		this.list.append(this.options.showHeader?this.listHeard:"").append(this.listBody);
		
		this.container.addClass("listview").append(this.list);
		this.setData(this.options.dataResult);
	};

	ListView.defaultOption = {
		parent:null,
		spacing:0,
		height:"auto",
		style:"",
		maxHeight:"auto",
		no_data_content:"没有相关数据",
		scroll:true,
		module:[],
		filter:function(keyword, dataResult){return dataResult;},
		showHeader:true,
		headerStyle:"",
		onHeardClick:function(ui, event){},
		setDateAfter:function(ui, dataResult){},
		eachItem:function(ui, result){
			var item = "<tr>";
			for ( var key in ui.options.module) {
				var m =  ui.options.module[key];
				item += "<td name ='"+m.key+"' width='"+m.width +"'>"+result[m.key]+"</td>";
			}
			item += "</tr>";
			return item;
		},
		defaultView:function(ui){
			return "<tr><td colspan='"+ui.options.module.length+"' class='text-center''>"+ui.options.no_data_content+"</td></tr>";
		},
		dataResult:[]
	};
	
	$.fn.listview = function(option, param) {
		
		return this.each(function() {
			var $this   = $(this);
			var data    = $this.data('crap.listview');
			var options = typeof option == 'object' && option;
			
			options = $.extend(true, {}, ListView.defaultOption, $this.data(), options);
			
			if (!data) $this.data('crap.listview', (data = new ListView(this, options)));
			if (typeof option == 'string') data[option](param);
		});
	};
	$.fn.listview.Constructor = ListView;
})(jQuery);

$.extend({
	slideshow:function(option){
		var defaultOption = {
			data:[],
			start:0
		};
		var options = $.extend(true, {}, defaultOption, option);
		var slideshow = $("<div class='modal bs-example-modal-lg slideshow' tabindex='-1'>"+
							//"<div class='img'></div>"
							//"<img/>"+
							"<div id='wrapper' class='text-center' style='width:100%;height:100%;'>"+
								"<div class='text-center' style='width:100%;height:100%;overflow:hidden'><img/></div>"+
							"</div>"+
							"<a href='javascript:;' class='left carousel-control'>"+
								"<span class='glyphicon-chevron-left glyphicon glyphicon-menu-left'></span>"+
							"</a>"+
							"<a href='javascript:;' class='right carousel-control'>"+
								"<span class='glyphicon-chevron-right glyphicon glyphicon-menu-right'></span>"+
							"</a>"+
							"<span class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></span>"+
						"</div>");
		
		var img = slideshow.find("img").resize();
		img[0].src = options.data[options.start];
		slideshow.on('shown.bs.modal', function (e) {
			var myScroll = new IScroll('#wrapper', {
				zoom: true,
				scrollX: true,
				scrollY: true,
				mouseWheel: true,
				wheelAction: 'zoom'
			});
			//slideshow.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
		}).modal().on('hidden.bs.modal', function (e) {
			$(this).remove();
		});
		
		
		slideshow.find("a.right").click(function(event){
			if(options.start > 0){
				img[0].src = options.data[--options.start];
			}
		});
		slideshow.find("a.left").click(function(event){
			if(options.start < (options.data.length-1)){
				img[0].src = options.data[++options.start];
			}
		});
		$("body").append(slideshow);
		
	},
	getUrlData:function(paramName){
		var dataString = window.location.href.split("?")[1];
		var data = new Object();
		if(dataString){
			dataString = decodeURI(dataString);
			var dataArray = new Array();
			dataArray = dataString.split("&");
			 
			for(var key in dataArray){
				var kv = dataArray[key].split("=");
				if(paramName && paramName == kv[0])
					return kv[1];
				data[kv[0]] = kv[1];
			}
		}
		if(paramName)
			return null;
		return data;
	},
	jsonArr2Str:function(jsonArray){ 
		var JsonArrayString = "["; 
		for(var i=0;i<jsonArray.length;i++){ 
			JsonArrayString=JsonArrayString+$.json2Str(jsonArray[i])+","; 
		} 
		JsonArrayString = JsonArrayString.substring(0,JsonArrayString.length-1)+"]"; 
		return JsonArrayString; 
	} ,
	json2Str:function(o){
		var arr = []; 
		var fmt = function(s) { 
			if (typeof s == 'object' && s != null) 
				return $.json2Str(s); 
			return /^(string|number)$/.test(typeof s) ? "'" + s + "'" : s; 
		};
		for (var i in o)
			arr.push("'" + i + "':" + fmt(o[i])); 
		return '{' + arr.join(',') + '}'; 
	}
});

//删除json数组中的空元素
function deleteNullElemnt(params){
	for(var key in params){
		if(params[key] == "" || params[key] == null){
			delete params[key];
		}
	}
	return params;
}
//判断字符串是否为空
function isNullOrEmpty(str){
	return (str == null || str == "" || str == undefined);
}

var master;
$(function(){
	var code = $.getUrlData("code");
	if(code){
		Web.Method.ajax("pet/authMaster", {
			data:{
				code:code
			},
			success:function(data){
				console.log(data);
				master = data.info[0];
				$("#master_name").text(master.name);
				$("#master_sex").text(Web.Recource.masterSex[master.sex]);
				$("#master_address").text(master.address);
				$("#master_img").css("background-image", "url("+master.img+")");
				
				if(master.mobile){
					$("#mobile").val(master.mobile);
					$("<a href='#card_info'/>").tab("show");
				}else{
					$("<a href='#master_info'/>").tab("show");
				}
			},
			fail:function(data){
				alert(data.msg);
			},
			error:function(){
				alert("服务器异常,请稍后再试");
			}
		});
	}
});

