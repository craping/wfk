/*var serverIp="127.0.0.1";
var serverPort="8080";
try{
	document.domain="127.0.0.1";
}catch(e){
	console.log(e);
}*/
var Web = {
	token:{},
	Recource:{
		user:{},
		server:"/web/",
		serverURL:"/web/api/",
		serverSysURL:"/web/api/sys/"
	},
	Method:{
		toTxt:function (val) {
			if(val){
				var RexStr = /\<|\>|\"|\'|\&/g;
				val = val.replace(RexStr, function(MatchStr) {
					switch (MatchStr) {
					case "<":
						return "&lt;";
						break;
					case ">":
						return "&gt;";
						break;
					case "\"":
						return "&quot;";
						break;
					case "'":
						return "&#39;";
						break;
					case "&":
						return "&amp;";
						break;
					default:
						break;
					}
				});
			}
			return val;
		},
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
		loadCheck:function(data){
			if(data == "error"){
				$("body").proAlert({
					alert:"warning",
					msg:"连接服务器错误...", 
					delay:2000,
					style:"position: absolute;z-index:9999999"
				});
				return false;
			}else if(data == "timeout"){
				$("body").proAlert({
					alert:"warning",
					msg:"连接服务器超时", 
					delay:2000,
					style:"position: absolute;z-index:9999999"
				});
				return false;
			}else if(data && data.result == 0){
				return true;
			}else if(data.result ==3 && data.errcode == 399){
				window.location.href=Web.Recource.loginURL;
				return false;
			}else{
				return false;
			}
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
		uuid:function(){
			return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {  
		        var r = Math.random() * 16 | 0,  
	            v = c == "x" ? r : (r & 3 | 8);  
		        return v.toString(16);  
		    }).toUpperCase();
		},
		changeURLPar : function(destiny, par, par_value) {
			var pattern = par + '=([^&]*)';
			var replaceText = par + '=' + par_value;
			if (destiny.match(pattern)) {
				var tmp = '/\\' + par + '=[^&]*/';
				tmp = destiny.replace(eval(tmp), replaceText);
				return (tmp);
			} else {
				if (destiny.match('[\?]')) {
					return destiny + '&' + replaceText;
				} else {
					return destiny + '?' + replaceText;
				}
			}
			return destiny + '\n' + par + '\n' + par_value;
		},
		setValue:function(name, val){
		    if(val+"" != ""){
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
		        }else if(htmlType == "drop"){
		        	var el = $("[name='"+name+"']");
		        	el.find(":text").val(el.find("span[tabindex="+val+"]").text());
		        	el.find(":hidden").val(val);
		        }else if(htmlType == "show"){
		        	var el = $("[name='"+name+"']");
		        	$("<span>"+val+"</span>").appendTo(el);
		        }else if(htmlType == "enum"){
		        	var el = $("[name='"+name+"']");
		        	var value = eval("rs."+name+"["+val+"]");
		        	$("<span>"+value+"</span>").appendTo(el);
		        }else if(htmlType == "able_enum"){
		        	var el = $("[name='"+name+"']");
		        	var hidden_text = "<input type=hidden id='"+ name + "' name='"+ name + "' required='true' value='" + val + "' />";
		        	el.parent().parent().parent().append(hidden_text);
	            	el.text(eval("rs."+name+"["+ val +"]"));
		        }else if(htmlType == "date"){
		        	var el = $("[name='"+name+"']");
		        	$("<span>"+new Date(val).format("yyyy/MM/dd")+"</span>").appendTo(el);
		        }
		    }
		},
		GetQueryString:function(name) {
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
			var search = decodeURI(window.location.search);
			var r = search.substr(1).match(reg);
			if (r != null) return unescape(r[2]);
			return null;
		},
		getSelectValues:function(target,name,size) {
//			var length = eval("rs."+name+".length");
			var $this = $(target).find("ul");
			if($this.find("li").size()>1) return false;
			if(size != undefined) length = size;
			$.each(eval("rs."+name),function(i,j){
//				if(i<=parseInt(length)-1){
					var html = "<li attrid='" + i + "'><a href='javascript:void(0);'>" + j + "</li>";
					$(html).appendTo($this);
//				}
			});
			$this.delegate("li","click",function(){
				$(target).find("dt").html($(this).html());
				$(target).find("dd").hide();
				if($("input[type='hidden'][name='"+ name +"']").val()==undefined){
					var hidden_text = "<input type=hidden name='"+ name + "' value='" + $(this).attr("attrid") + "' />";
	            	$("form").append(hidden_text);
				}else{
					$("input[type='hidden'][name='"+ name +"']").val($(this).attr("attrid"));
					if($("input[type='hidden'][name='"+ name +"']").attr("aria-required"))
					$("input[type='hidden'][name='"+ name +"']").valid();
				}
			});
			
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
				xhrFields: {
					withCredentials: true
				},
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
				type: "post",
				data:defaultParam.data,
				async:defaultParam.async,
				url: defaultParam.url + method,
				dataType: "json",
				jsonp: "callback",
				success: function(data){
					//Web.Method.loadCheck(data);
					if(param.safe){
						data = eval("("+decodeURIComponent(cipher.decrypt(data).replace(/\+/g, '%20'))+")");
					}
					if(data.result == 0){
						defaultParam.success(data.data?data.data:data, defaultParam.param);
					}else if(data.result == 5 && data.errcode==511){
						$.confAlert({
							size:"sm",
							context:"您没有此操作的权限",
							noButton:false
						})
					}else if(data.result ==3 && (data.errcode == 501||data.errcode == 502)&& method.indexOf("getUserInfo") == -1){
						$.confAlert({
							size:"sm",
							context:data.msg,
							noButton:false
						})
						if(data.errcode==501)
							window.parent.location.href = "../supplier/login.html";
						if(data.errcode==502)
							window.parent.location.href = "../system/login.html";
					}else if(data.result==5){
						$.confAlert({
							size:"sm",
							context:data.msg,
							noButton:false
						})					
					}else if(data.result == -1){
						$.confAlert({
							size:"sm",
							context:"服务器异常,请联系管理员或稍后再试",
							noButton:false
						})
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

$(function(){
	
	//init dropdown
	$(".cate_wrp").click(function() {
		$(this).next("div.cate_drop").slideToggle(200);
		if($(this).find("i").hasClass("cate_tri")){
			$(this).find("i").attr("class","cate_tri_on");
		}else {
			$(this).find("i").attr("class","cate_tri");
		}
	});

	// 下拉菜单点击空白隐藏
	$(document).click(function(e) {
		var _con = $("[name=cateBox]");
		if( !_con.is(e.target) && _con.has(e.target).length === 0) {
			_con.find("div.cate_drop2").slideUp(200);
			_con.find("i").attr("class","cate_tri");
		}
		var drop = $("div[type=drop]");
		if( !drop.is(e.target) && drop.has(e.target).length === 0){
			drop.find("div.cate_drop").slideUp(200);
		}
	});
	/*下拉*/
	$(".xl_bg").click(function(){
		$(this).next("div.cate_drop").slideToggle(200);
		$(this).next("div.cate_drop2").slideToggle(200);
	});
	$(".cate_drop span").click(function() {
		var s=$(this).text();
		$(this).parent().prev().prev().val(s);
		$(this).parent().prev().prev().prev().val($(this).attr("tabindex"));
		
		$(this).parent().prev().find(".cate_inp").text($(this).text());
		$(this).parent().prev().find("i").attr("class","cate_tri");
		$(this).parent().slideUp(200);
	});
	$(".cate_drop2 span").click(function() {
		var s2=$(this).text();
		$(this).parent().prev().prev().val(s2);
		$(this).parent().slideUp(200);
	});
	
	$('label[for^=radio-]').click(function () {
		$("#"+$(this).attr("for"))[0].checked=true;
		$(this).prev()[0].checked=true;
	});
	
	/*$.each($(".dropdown"), function(){
		$(this).find(".dropdown-menu li a").click($(this), function(event){
			event.data.find(".dropdown-menu li").removeClass("active");
			$(this).parent().addClass("active");
			event.data.find(".dropdown-toggle span:first").text($(this).text());
			$(event.data.children(".dropdown-toggle")[0].target).val(this.target?this.target:$(this).text());
		});
	});
	$(".select .select-toggle").click(function(){
		var select = $(this).parent();
		if(select.hasClass("open")){
			select.removeClass("open");
		}else{
			select.addClass("open");
		}
	});*/
	
});

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
})(jQuery);





/*

ZeroClipboard - jQuery ZeroClipboard Plugin(零干扰【跨浏览器】复制)
-----------------------------------------------

*/
(function($) {
	function Zclip(target, option) {
		this.options = option;
		this.container = $(target);
		this.init();
	};
	
	Zclip.prototype.init = function() {
		var $this = this;
		var clip = new ZeroClipboard($this.container);
		if($this.options.text)
			clip.setText($this.options.text);
		else
			clip.setText($this.container[0].target);
		clip.on("copy", function(e){
			if($this.options.copy)
				$this.options.copy(e);
		});
	};
	
	Zclip.defaultOption = {
		text:null,
		copy:function(e){}
	};
	$.fn.zclip = function(option, param){
		
		return this.each(function() {
			var $this   = $(this);
			var data    = $this.data('lishe.zclip');
			var options = typeof option == 'object' && option;
			
			options = $.extend(true, {}, Zclip.defaultOption, $this.data(), options);
			
			if (!data) $this.data('lishe.zclip', (data = new Zclip(this, options)));
			if (typeof option == 'string') data[option](param);
		});
	};
	$.fn.zclip.Constructor = Zclip;
})(jQuery);
/*

ImgPicker - jQuery Image Picker Plugin
-----------------------------------------------

*/
(function ($) {
	function ImgPicker(target, option) {
		this.options = option;
		this.container = $(target);
		this.init();
	};
	
	ImgPicker.prototype.init = function() {
		var $this = this;
		$this.container.find("img").resize({slideshow:this.options.slideshow});
		$this.container.find("a").click(function(){
			if(!$(this).find(":file")[0].value)
				$(this).find(":file")[0].click();
		}).next("button").click(function(){
			var a = $(this).prev();
			a.find(":file").val("").change();//[0].value="";
			a.find("img").addClass("hidden")[0].src = "";
			$(this).addClass("hidden");
		});
		$this.container.find(":file").change(function(){
			var img = $(this).next();
			var src = Web.Method.getObjectURL(this);
			var del = $(this).parent().next();
			if(src){
				img.removeClass("hidden")[0].src = src;
				del.removeClass("hidden");
			}else{
				del.addClass("hidden");
				img.addClass("hidden");
			}
		});
	};
	
	ImgPicker.defaultOption = {
		slideshow:{
			enable:false,
			data:[],
			start:0
		}
	};
	$.fn.imgpicker = function(option, param){
		
		return this.each(function() {
			var $this   = $(this);
			var data    = $this.data('lishe.imgpicker');
			var options = typeof option == 'object' && option;
			
			options = $.extend(true, {}, ImgPicker.defaultOption, $this.data(), options);
			
			if (!data) $this.data('lishe.imgpicker', (data = new ImgPicker(this, options)));
			if (typeof option == 'string') data[option](param);
		});
	};
	$.fn.imgpicker.Constructor = ImgPicker;
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
		if(this.options.slideshow.enable){
			this.container.parent().addClass("image-preview").click($this, function(event){
				var src = event.data.container.attr("src");
				var start = this.target;
				var option = $.extend(true, {}, event.data.options.slideshow, {start:start});
				if((!option.data || option.data.length ==0) && src)
					option.data.push(src);
				if(typeof option.data =="object"){
					var data = [];
					for(var key in option.data)
						data.push(option.data[key]);
					option.data = data;
				}
				if(option.data.length > 0)
					$.slideshow(option);
			});
		}
	};
	Resize.prototype.resize = function(container){
		//防止延迟显示
		if(container.is(":hidden")){
			if(!this.timer){
				var $this = this;
				this.timer = setInterval(function(){
					$this.resize(container);
				}, 10);
			}
			return;
		}
		clearInterval(this.timer);
		var size = this.options.size;
		var width = this.options.width;
		var height = this.options.height;
		var target = $(this.options.target)[0];
		if(!size && !target && !width && !height){
			target = container.parent()[0];
		}
		if(target){
			if(!width)
				width = target.clientWidth;
			if(!height)
				height = target.clientHeight;
		}
		
		container.css({top:"0px",left:"5000px"}).width("auto").height("auto");
		var imgWidth = container[0].clientWidth;
		var imgHeight = container[0].clientHeight;
		
		if(!width)
			width = size?size:imgWidth;
		if(!height)
			height = size?size:imgHeight;
		
	    var imgScale = imgWidth/imgHeight;
	    var scaleHeight = width/imgScale;
	    
	    if(scaleHeight > height){
	    	container.height(imgHeight > height?height:imgHeight);
	    }else{
	    	container.width(imgWidth > width?width:imgWidth);
	    }

		container.css({
			left:((width - container[0].clientWidth) / 2) +"px",
			top:((height - container[0].clientHeight) / 2) +"px"
		});
	};
	
	Resize.defaultOption = {
		size:null,
		width:null,
		height:null,
		target:null,
		slideshow:{
			enable:false,
			data:[],
			start:0
		}
	};
	$.fn.resize = function(option, param){
		
		return this.each(function() {
			var $this   = $(this);
			var data    = $this.data('lishe.resize');
			var options = typeof option == 'object' && option;
			
			options = $.extend(true, {}, Resize.defaultOption, $this.data(), options);
			
			if (!data) $this.data('lishe.resize', (data = new Resize(this, options)));
			if (typeof option == 'string') data[option](param);
		});
	};
	$.fn.resize.Constructor = Resize;
})(jQuery);
/*

Strong - jQuery Password Strong Plugin
-----------------------------------------------

*/
(function ($) {
	function Strong(target, option) {
		this.options = option;
		this.container = $(target);
		this.init();
	};
	
	Strong.prototype.init = function() {
		this.ul = $("<ul class='strong'><li></li><li class='center'></li><li></li></ul>");
		this.container.append(this.ul);
		if(this.options.target){
			$("#"+this.options.target).bind(this.options.events, this, function(event){
				event.data.test($(this).val());
			});
		}
	};
	
	Strong.prototype.test = function(pwd) {
		var lv = 0;
	    if(pwd.match(/[a-z]/g)){lv++;}
	    if(pwd.match(/[0-9]/g)){lv++;}
	    if(pwd.match(/(.[^a-z0-9])/g)){lv++;}
	    if(pwd.length < 6){lv=0;}
	    if(lv > 3){lv=3;}
		this.ul.find("li").removeClass("first second third");
	    if(lv >=1) {
			this.ul.find("li:eq(0)").addClass("first");
	    }
		if(lv >=2){
			this.ul.find("li:eq(1)").addClass("second");
		}
		if(lv >=3){
			this.ul.find("li:eq(2)").addClass("third");
		}
	};
	
	Strong.defaultOption = {
		target:null,
		events:"change keyup"
	};
	$.fn.strong = function(option, param){
		
		return this.each(function() {
			var $this   = $(this);
			var data    = $this.data('lishe.strong');
			var options = typeof option == 'object' && option;
			
			options = $.extend(true, {}, Strong.defaultOption, $this.data(), options);
			
			if (!data) $this.data('lishe.strong', (data = new Strong(this, options)));
			if (typeof option == 'string') data[option](param);
		});
	};
	$.fn.strong.Constructor = Strong;
})(jQuery);
/*

Select - jQuery Select Plugin
-----------------------------------------------

*/
(function ($) {
	function Select(target, option) {
		this.options = option;
		this.container = $(target);
		this.selectItem = {key:"", value:""};
		this.init();
	};
	
	Select.prototype.init = function() {
		if(this.options.container){
			var isValid = this.options.required?"required=true":""
			this.select = $("<input type='hidden' name='" + this.options.name + "' id='" + this.options.name + "' " + isValid + "' /><dl class='select'>" +
				"<dt class='dropdown-toggle btn btn-default' data-toggle='dropdown'><a>" +
					this.options.icon+" <span>"+this.options.display+"</span> <span class='caret'></span>" +
				"</a></dt>" +
				"<dd><ul class='dropdown-menu'></ul></dd>" +
			"</dl>");
		}else{
			this.container.append("<input type='hidden' name='" + this.options.name + "' id='" + this.options.name + "' required='" + this.options.required + "' /><a class='dropdown-toggle btn btn-default' data-toggle='dropdown'>" +
					this.options.icon+" <span>"+this.options.display+"</span> <span class='caret'></span>" +
					"</a>").append("<ul class='dropdown-menu'></ul>");
			this.select = this.container;
		}
		this.menu = this.select.find(".dropdown-menu");
		this.container.append(this.select);
		this.setData(this.options.data);
	};
	
	Select.prototype.setSelect = function(value) {
		if(value && value != ""){
			var index;
			var select = {};
			for(var key in this.items){
				select = this.items[key];
				if(value.indexOf(select.key) != -1 || value.indexOf(select.value) != -1){
					index = key;
					break;
				}
			}
			this.menu.find("li").removeClass("active");
			this.menu.find("li:eq("+index+")").addClass("active").find("a");
			this.container.find(".dropdown-toggle").removeAttr("disabled").find("span:first").text(select.key);
			this.selectItem = select;
			this.container.find("input[type='text']").attr("placeholder",select.key);
			this.container.find("input[name='" + this.options.name + "']").val(select.value);
			this.options.click(this, select);
			if(this.options.target){
				$("#"+this.options.target).val(select.value).text(select.value);
			}
			this.container.find("input[name='" + this.options.name + "']").val(select.value);
		}
	};
	
	Select.prototype.disable = function() {
		this.container.find(".dropdown-toggle").attr("disabled","disabled");
	};
	
	Select.prototype.setData = function(data) {
		$this = this;
		$this.menu.empty();
		$this.selectItem = null;
		$this.container.find("input[name='" + $this.options.name + "']").val("");
		this.items = data;
		for(var key in data){
			var item = data[key];
			if(!item)
				continue;
			if(typeof(item.value)=="undefined"){
				item.value = key;
			}
			$this.menu.append("<li><a href='javascript:void(0);' targets='"+item.value+"'>"+item.key+"</a></li>");
		}
		if(data.length > 0){
			if(!$this.options.display){
				$this.menu.find("li:first").addClass("active");
				$this.container.find(".dropdown-toggle").removeAttr("disabled").find("span:first").text($this.options.display?$this.options.display:data[0].key);
				$this.selectItem = {key:data[0].key, value:data[0].value, items:data[0].items};
				if($this.options.target){
					$("#"+$this.options.target).val($this.selectItem.value).text($this.selectItem.value);
				}
			}
			$this.menu.find("li").click($this, function(event){
				var select = event.data;
				select.menu.find("li").removeClass("active");
				$(this).addClass("active");
				select.selectItem = {key:$(this).text(), value:select.items[$(this).index()].value, items:select.items[$(this).index()].items};
				select.container.find(".dropdown-toggle span:first").text(select.selectItem.key);
				if(select.options.target){
					$("#"+select.options.target).val(select.selectItem.value).text(select.selectItem.value);
				}
				select.container.find("input[name='" + select.options.name + "']").val(select.selectItem.value);
				select.options.click(select, select.selectItem);
			});
		}else{
			$this.container.find(".dropdown-toggle span:first").text($this.options.display?$this.options.display:" ");
			$this.selectItem = {key:"", value:"", items:[]};
//			$this.container.find(".dropdown-toggle").attr("disabled","disabled");
		}
	};
	
	Select.defaultOption = {
		multi:false,
		click:function(){},
		icon:"",
		data:[],
		target:null,
		container:true,
		name:"",
		required:false
	};
	$.fn.select = function(option, param){
		
		return this.each(function() {
			var $this   = $(this);
			var data    = $this.data('lishe.select');
			var options = typeof option == 'object' && option;
			
			options = $.extend(true, {}, Select.defaultOption, $this.data(), options);
			
			if (!data) $this.data('lishe.select', (data = new Select(this, options)));
			if (typeof option == 'string') data[option](param);
		});
	};
	$.fn.select.Constructor = Select;
})(jQuery);


(function ($) {
	function CategorySelect(target, option) {
		this.options = option;
		this.container = $(target);
		this.selectItem = {key:"", value:""};
		this.init();
	};
	
	CategorySelect.prototype.init = function() {
		if(this.options.container){
			this.select = $("<div class='dropdown-scroll product-publish-box'>" +
				"<div class='dropdown-toggle btn btn-default product-publish-search' data-toggle='dropdown'>" +
					"<input type='hidden' name='" + this.options.name + "' id='" + this.options.name + "' required='" + this.options.required + "' />" +
					"<input type='text' value='' placeholder='"+this.options.display+"'>" +
				"</div>" +
				"<ul class='dropdown-menu'></ul>" +
			"</div>");
		}else{
			this.container.append("<input type='hidden' name='" + this.options.name + "' id='" + this.options.name + "' required='" + this.options.required + "' /><a class='dropdown-toggle btn btn-default' data-toggle='dropdown'>" +
					this.options.icon+" <span>"+this.options.display+"</span> <span class='caret'></span>" +
					"</a>").append("<ul class='dropdown-menu'></ul>");
			this.select = this.container;
		}
		this.menu = this.select.find(".dropdown-menu");
		this.container.append(this.select);
		var target = this;
		var $input = this.select.find(".dropdown-toggle").find("input[type='text']")
		$input.keyup(this, function(event){
			target.options.keyup(target.container,$input.val());
		});
		this.setData(this.options.data);
	};
	
	CategorySelect.prototype.setSelect = function(value) {
		if(value && value != ""){
			var index;
			var select = {};
			for(var key in this.items){
				select = this.items[key];
				if(value.indexOf(select.key) != -1 || value.indexOf(select.value) != -1){
					index = key;
					break;
				}
			}
			this.menu.find("li").removeClass("active");
			this.menu.find("li:eq("+index+")").addClass("active").find("a");
			this.container.find(".dropdown-toggle").removeAttr("disabled").find("span:first").text(select.key);
			this.selectItem = select;
			this.container.find("input[type='text']").attr("placeholder",select.key);
			this.container.find("input[name='" + this.options.name + "']").val(select.value);
			this.options.click(this, select);
			if(this.options.target){
				$("#"+this.options.target).val(select.value).text(select.value);
			}
		}
	};
	
	CategorySelect.prototype.disable = function() {
		this.container.find(".dropdown-toggle").attr("disabled","disabled");
	};
	
	CategorySelect.prototype.setData = function(data) {
		$this = this;
		$this.menu.empty();
		$this.selectItem = null;
		$this.container.find("input[name='" + $this.options.name + "']").val("");
		this.items = data;
		for(var key in data){
			var item = data[key];
			if(!item)
				continue;
			if(typeof(item.value)=="undefined"){
				item.value = key;
			}
			$this.menu.append("<li><a href='javascript:void(0);' targets='"+item.value+"'>"+item.key+"</a><i>&gt</i></li>");
		}
		if(typeof(data)=="object" || data.length > 0){
			if(!$this.options.display){
				$this.menu.find("li:first").addClass("active");
				$this.container.find(".dropdown-toggle").removeAttr("disabled").find("span:first").text($this.options.display?$this.options.display:data[0].key);
				$this.selectItem = {key:data[0].key, value:data[0].value, items:data[0].items};
				if($this.options.target){
					$("#"+$this.options.target).val($this.selectItem.value).text($this.selectItem.value);
				}
			}
			
			$this.menu.find("li").click($this, function(event){
				var select = event.data;
				select.menu.find("li").removeClass("active");
				$(this).addClass("active");
				select.selectItem = {key:$(this).find("a").text(), value:select.items[$(this).index()].value, items:select.items[$(this).index()].items};
				select.container.find("input[type='text']").attr("placeholder",select.selectItem.key);
				if(select.options.target){
					$("#"+select.options.target).val(select.selectItem.value).text(select.selectItem.value);
				}
				select.container.find("input[name='" + select.options.name + "']").val(select.selectItem.value);
				select.options.click(select, select.selectItem);
			});
		}else{
			$this.container.find(".dropdown-toggle span:first").text($this.options.display?$this.options.display:" ");
			$this.selectItem = {key:"", value:"", items:[]};
//			$this.container.find(".dropdown-toggle").attr("disabled","disabled");
		}
	};
	
	CategorySelect.defaultOption = {
		multi:false,
		click:function(){},
		keyup:function(){},
		icon:"",
		data:[],
		target:null,
		container:true,
		name:"",
		required:false
	};
	$.fn.categorySelect = function(option, param){
		
		return this.each(function() {
			var $this   = $(this);
			var data    = $this.data('lishe.select');
			var options = typeof option == 'object' && option;
			
			options = $.extend(true, {}, CategorySelect.defaultOption, $this.data(), options);
			
			if (!data) $this.data('lishe.select', (data = new CategorySelect(this, options)));
			if (typeof option == 'string') data[option](param);
		});
	};
	$.fn.categorySelect.Constructor = CategorySelect;
})(jQuery);

/*

AreaSelect - jQuery AreaSelect Plugin
-----------------------------------------------

*/
(function ($) {
	function AreaSelect(target, option) {
		this.options = option;
		this.container = $(target);
		this.init();
	};
	
	AreaSelect.prototype.init = function() {
		var $this = this;
		var ul = $("<ul class='list-inline'>" +
						"<li></li>" +
						"<li></li>" +
						"<li></li>" +
					"</ul>");
		this.container.append(ul);
		$this.province = $(ul.find("li:eq(0)"));
		$this.city = $(ul.find("li:eq(1)"));
		$this.area = $(ul.find("li:eq(2)"));
		
		$this.province.select({
			data:Web.Recource.areaSelect,
			click:function(ui, item){
				var citys = Web.Recource.areaSelect[item.value].items;
				$this.city.select("setData", citys);
				$this.area.select("setData", citys.length>0?citys[$this.city.data("lishe.select").selectItem.value].items:[]);
				$this.selectValue();
				$this.options.click($this.province, $this.value);
				$this.autoHide();
			}
		});
		$this.city.select({
			data:Web.Recource.areaSelect[0].items,
			click:function(ui, item){
				$this.area.select("setData", Web.Recource.areaSelect[$this.province.data("lishe.select").selectItem.value].items[item.value].items);
				$this.selectValue();
				$this.options.click($this.city, $this.value);
				$this.autoHide();
			}
		});
		$this.area.select({
			data:Web.Recource.areaSelect[0].items[0].items,
			click:function(ui, item){
				$this.selectValue();
				$this.options.click($this.area, $this.value);
				$this.autoHide();
			}
		});
		$this.autoHide();
		$this.selectValue();
	};
	AreaSelect.prototype.disable = function() {
		this.province.select("disable");
		this.city.select("disable");
		this.area.select("disable");
	};
	AreaSelect.prototype.setSelect = function(value) {
		var values = value.split(",");
		this.province.select("setSelect", values[0]);
		var citys = this.province.data("lishe.select").selectItem.items;
		this.city.select("setData", citys).select("setSelect", values[1]);
		var areas = this.city.data("lishe.select").selectItem.items;
		this.area.select("setData", areas).select("setSelect", values[2]);
		this.selectValue();
		this.autoHide();
	};
	
	AreaSelect.prototype.selectValue = function() {
		var province = this.province.data("lishe.select").selectItem;
		var city = this.city.data("lishe.select").selectItem;
		var area = this.area.data("lishe.select").selectItem;
		this.value = {
			key:province.key+"," + city.key + "," +area.key,
			value:province.value + "," + city.value + "," + area.value
		};
		if(this.options.target){
			$("#"+this.options.target).val(this.value.key+"_"+this.value.value).text(this.value.key+"_"+this.value.value);
		}
	};
	
	AreaSelect.prototype.autoHide = function() {
		if(this.province.data("lishe.select").items.length > 0){
			this.province.show();
		}else{
			this.province.hide();
		}
		if(this.city.data("lishe.select").items.length > 0){
			this.city.show();
		}else{
			this.city.hide();
		}
		if(this.area.data("lishe.select").items.length > 0){
			this.area.show();
		}else{
			this.area.hide();
		}
	};
	
	AreaSelect.defaultOption = {
		multi:false,
		code:null,
		target:null,
		click:function(select, value){}
	};
	$.fn.areaSelect = function(option, param){
		
		return this.each(function() {
			var $this   = $(this);
			var data    = $this.data('lishe.areaSelect');
			var options = typeof option == 'object' && option;
			
			options = $.extend(true, {}, AreaSelect.defaultOption, $this.data(), options);
			
			if (!data) $this.data('lishe.areaSelect', (data = new AreaSelect(this, options)));
			if (typeof option == 'string') data[option](param);
		});
	};
	$.fn.areaSelect.Constructor = AreaSelect;
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
		//this.ul = $("<ul class='pagination'/>");
		this.ul = $("<ul/>");
		this.container.append(this.ul);
		this.setData(this.options.pageSet);
	};
	
	PageSet.prototype.setData = function(pageSet) {
		var $this = this;
		if(!pageSet)
			$this.container.hide();
		$this.ul.find("*").remove();
		
		this.options.pageSet.page = pageSet.page;
		var num = $this.options.num > pageSet.totalpage?pageSet.totalpage:$this.options.num;
		var leftSpace,rightSpace;
		rightSpace = parseInt((num-1)/2);
		if(num%2==0){
			leftSpace = num/2;
		}else{
			leftSpace = rightSpace;
		}
		$this.ul.append("<li class='system-page-n "+(pageSet.page > 1?"enable":"disabled")+"' name='1'>&lt;&lt;</li>");
		$this.ul.append("<li class='system-page-n "+(pageSet.page > 1?"enable":"disabled")+"' name='"+(pageSet.page-1)+"'>&lt;</li>");
		
		var leftNum = pageSet.page - leftSpace;
		
		if(leftNum <= 1){
			leftNum = 1;
		}else{
			if(leftNum > 2)
				$this.ul.append("<li><font style='color:#898989'>...</font></li>");
		}
		for ( var i=leftNum; i < pageSet.page; i++) {
			$this.ul.append("<li class='system-page-l enable' name='"+i+"'>"+i+"</li>");
		}
		
		$this.ul.append("<li class='active'><font style='color:#898989'>"+pageSet.page+"</font></li>");
		
		var rightNum = pageSet.page + rightSpace;
		rightNum = rightNum>=num?num:rightNum;
		for ( var i = pageSet.page + 1; i <= rightNum; i++) {
			$this.ul.append("<li class='system-page-l enable' name='"+i+"'>"+i+"</li>");
		}
		if(rightNum < pageSet.totalpage){
			if((pageSet.totalpage-rightNum) >= 2)
				$this.ul.append("<li><font style='color:#898989'>...</font></li>");
			$this.ul.append("<li class='system-page-l enable' name='"+pageSet.totalpage+"'>"+pageSet.totalpage+"</li>");
		}
		$this.ul.append("<li class='system-page-n "+(pageSet.page < pageSet.totalpage?"enable":"disabled")+"' name='"+(pageSet.page+1)+"'>&gt;</li>");
		$this.ul.append("<li class='system-page-n "+(rightNum < pageSet.totalpage?"enable":"disabled")+"' name='"+pageSet.totalpage+"'>&gt;&gt;</li>");
		
		$this.ul.append("<li class='system-page-p'>总 "+pageSet.totalpage+" 页</li>");
		$this.ul.append("<li class='system-page-p'>共 " + pageSet.totalnum + " 条</li>");

		$this.ul.find("li.enable").click($this, function(event){
			event.data.options.itemClick($(this).attr("name"), $this);
		});
	};
	
	PageSet.defaultOption = {
		pageSet:{
			totalpage:1,	//总页数
			page:1		//当前页
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
			var data    = $this.data('lishe.pageSet');
			var options = typeof option == 'object' && option;
			
			options = $.extend(true, {}, PageSet.defaultOption, $this.data(), options);
			
			if (!data) $this.data('lishe.pageSet', (data = new PageSet(this, options)));
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
			listHeard += "<th name ='"+key+"' width='"+result.width +"' class='"+result.style+"'>"+result.name+"</th>";
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
			var data    = $this.data('lishe.listview');
			var options = typeof option == 'object' && option;
			
			options = $.extend(true, {}, ListView.defaultOption, $this.data(), options);
			
			if (!data) $this.data('lishe.listview', (data = new ListView(this, options)));
			if (typeof option == 'string') data[option](param);
		});
	};
	$.fn.listview.Constructor = ListView;
})(jQuery);

/*

TreeView - jQuery List Plugin
-----------------------------------------------

*/

(function($) {
	function TreeView(target, option) {
		this.container = $(target);
		this.options = option;
		this.groups = {};
		this.init();
	};

	TreeView.prototype.setData = function(dataResult) {
		var $this = this;
		if(!$this.mCSB_container){
			$this.mCSB_container = $this.container.find("div.mCSB_container");
		}
		$this.mCSB_container.find("*").remove();
		$this.groups = {};
		
		if(!dataResult)
			return;
		
		for(var key in dataResult) {
			var result = dataResult[key];
			if(!result)
				continue;
			
			var group = $("<div class='panel panel-default'/>");
			var item = $("<div/>");
			item.listview({
				parent:$this,
				scroll:false,
				dataResult:result.items,
				eachItem:$this.options.eachItem,
				defaultView:function(ui){
					return "";
				}
			});
			$this.mCSB_container.append(group.append($this.options.createHeard($this, group, result)).append(item));
			$this.groups[result.groupId] = group;
		}
		$this.checkScroll();
		$this.hideLoading();
		$this.options.dataResult = dataResult;
	};
	
	TreeView.prototype.loading = function(){
		this.container.proAlert("show");
	};
	
	TreeView.prototype.hideLoading = function(){
		this.container.proAlert("hide");
	};
	
	TreeView.prototype.addGroups = function(results){
		for ( var key in results) {
			var result = results[key];
			var group = $("<div class='panel panel-default'/>");
			this.mCSB_container.append(group.append(this.options.createHeard(this, group, result)));
		}
		this.checkScroll();
	};
	
	TreeView.prototype.addItems = function(groupId, results){
		this.groups[groupId].find("div.listview").listview("addItems", results);
	};
	
	TreeView.prototype.checkScroll = function(){
		this.container.mCustomScrollbar("update");
	};
	
	TreeView.prototype.scrollTo = function(position){
		this.container.mCustomScrollbar("scrollTo", position);
	};
	
	
	TreeView.prototype.init = function() {
		var $this = this;
		$this.container.addClass("treeview").css({
			height:$this.options.height,
			width:$this.options.width
		}).proAlert({icon:"fa-spinner fa-spin",modal:true}).mCustomScrollbar({
			scrollInertia:0,
			mouseWheelPixels:30,
			advanced:{
				autoScrollOnFocus:false
			}
		});
		$this.setData($this.options.dataResult);
	};
	
	$.fn.treeview = function(option, param) {
		TreeView.defaultOption = {
			height:"auto",
			width:"auto",
			createHeard:function(ui, group, result){
				var groupHeard = $("<a class='list-group-item' />");
				groupHeard.html("<span class='badge'>"+result.items.length+"</span>" +
						"<div style='max-width:"+(ui.options.width-80)+"px;float:left' class='text-overflow'><i class='fa fa-caret-right'></i> "+result.groupName+"</div>&nbsp;").
				click(function(event){
					ui.mCSB_container.find("td.list-group-item.active").removeClass("active");
					if(group.hasClass("active")){
						group.removeClass("active");
					} else {
						group.addClass("active");
					}
					ui.checkScroll();
				});
				return groupHeard;
			},
			eachItem:function(){},
			dataResult:null
		};
		 
		return this.each(function() {
			var $this   = $(this);
			var data    = $this.data('lishe.treeview');
			var options = typeof option == 'object' && option;
			
			options = $.extend(true, {}, TreeView.defaultOption, $this.data(), options);
			
			if (!data) $this.data('lishe.treeview', (data = new TreeView(this, options)));
			if (typeof option == 'string') data[option](param);
		});
	};
	
	$.fn.treeview.Constructor = TreeView;
})(jQuery);



/*

MsgAlert - jQuery Alert Plugin
-----------------------------------------------

*/

(function($) {
	function MsgAlert(target, option) {
		this.el = $(target);
	    this.options  = option;
		this.init();
	};

	var icon = {
		primary:"fa-question-circle",
		info:"fa-info-circle",
		success:"fa-check-circle",
		warning:"fa-warning",
		danger:"fa-exclamation-circle"
	};
	MsgAlert.prototype.init = function(){
		this.alert = $("<div class='alert alert-"+this.options.alert+" proAlert' style='"+this.options.style+"'>"+
				"<i class='fa "+(!this.options.icon?icon[this.options.alert]:this.options.icon)+" fa-lg'></i> "+ this.options.msg +
			"</div>");
		$("body").append(this.alert);
		
		if(this.options.modal){
			this.modal = $("<div class='alertModal'/>");
			$("body").append(this.modal);
		}
		if(this.options.delay != 0){
			this.show();
			this.destroy();
		}
	};
	
	MsgAlert.prototype.show = function(){
		var pos = {top: this.el.offset().top + this.el[0].offsetHeight/ 2 - parseInt(this.alert.css("height")) / 2,   left: this.el.offset().left + this.el[0].offsetWidth / 2 - parseInt(this.alert.css("width")) / 2  };
		this.alert.css({top:pos.top,left:pos.left}).show();
		if(this.options.modal){
			this.modal.height(this.el.height()).width(this.el.width()).css({top:this.el.offset().top,left:this.el.offset().left}).show();
		}
	};
	
	MsgAlert.prototype.destroy = function(){
		var $this = this;
		this.alert.fadeOut(this.options.delay,function(){
			$(this).remove();
			$this.el.removeData('lishe.msgAlert');
		});
		if(this.options.modal){
			this.modal.fadeOut(this.options.delay,function(){
				$(this).remove();
				$this.el.removeData('lishe.msgAlert');
			});
		}
	};
	
	MsgAlert.prototype.hide = function(){
		this.alert.hide();
		if(this.options.modal){
			this.modal.hide();
		}
	};

	$.fn.msgAlert = function(option) {
		MsgAlert.defaultOption = {
			alert:"info",
			icon:"",
			modal:false,
			delay:0,
			msg:"",
			style:""
		};
		
		return this.each(function() {
			var $this   = $(this);
			var data    = $this.data('lishe.msgAlert');
			var options = typeof option == 'object' && option;
			
			options = $.extend(true, {}, MsgAlert.defaultOption, $this.data(), options);
			
			if (!data) $this.data('lishe.msgAlert', (data = new MsgAlert(this, options)));
			if (typeof option == 'string') data[option]();
		});
	};
})(jQuery);

/*

ValidateAlert - jQuery Alert Plugin
-----------------------------------------------

*/

(function($) {
	function ValidateAlert(target, option) {
		this.el = $(target);
	    this.options  = option;
		this.init();
	};

	var icon = {
		primary:"fa-question-circle",
		info:"fa-info-circle",
		success:"fa-check-circle",
		warning:"fa-warning",
		danger:"fa-exclamation-circle"
	};
	
	ValidateAlert.prototype.init = function(){
		this.alert = $("<div class='alert alert-"+this.options.alert+"' style='"+this.options.style+"'>"+
				"<i class='fa "+(!this.options.icon?icon[this.options.alert]:this.options.icon)+" fa-lg'></i> "+ this.options.msg +
			"</div>");
		this.el.after(this.alert);
		this.alert.hide();
	};
	
	ValidateAlert.prototype.show = function(msg){
		if(msg)
			this.alert.text(msg);
		this.alert.show();
	};
	
	ValidateAlert.prototype.destroy = function(){
		var $this = this;
		this.alert.fadeOut(this.options.delay,function(){
			$(this).remove();
			$this.el.removeData('lishe.valAlert');
		});
	};
	
	ValidateAlert.prototype.hide = function(){
		this.alert.hide();
	};

	$.fn.valAlert = function(option, param) {
		ValidateAlert.defaultOption = {
			alert:"info",
			icon:"",
			modal:false,
			delay:0,
			msg:"",
			style:""
		};
		
		return this.each(function() {
			var $this   = $(this);
			var data    = $this.data('lishe.valAlert');
			var options = typeof option == 'object' && option;
			
			options = $.extend(true, {}, ValidateAlert.defaultOption, $this.data(), options);
			
			if (!data) $this.data('lishe.valAlert', (data = new ValidateAlert(this, options)));
			if (typeof option == 'string') data[option](param);
		});
	};
})(jQuery);


/*

ProgressAlert - jQuery Alert Plugin
-----------------------------------------------

*/

(function($) {
	function ProgressAlert(target, option) {
		this.el = $(target);
	    this.options  = option;
		this.init();
	};

	ProgressAlert.prototype.init = function(){
		this.alert = $("<div class='alert alert-"+this.options.alert+" proAlert' style='"+this.options.style+"'>"+
			"</div>");
		$("body").append(this.alert);
		
		if(this.options.modal){
			this.modal = $("<div class='alertModal'/>");
			$("body").append(this.modal);
		}
		if(this.options.delay != 0){
			this.show();
			this.destroy();
		}
	};
	
	ProgressAlert.prototype.show = function(){
		var pos = {top: this.el.offset().top + this.el[0].offsetHeight/ 2 - parseInt(this.alert.css("height")) / 2,   left: this.el.offset().left + this.el[0].offsetWidth / 2 - parseInt(this.alert.css("width")) / 2  };
		this.alert.css({top:pos.top,left:pos.left}).show();
		if(this.options.modal){
			this.modal.height(this.el.height()).width(this.el.width()).css({top:this.el.offset().top,left:this.el.offset().left}).show();
		}
	};
	
	ProgressAlert.prototype.destroy = function(){
		var $this = this;
		this.alert.fadeOut(this.options.delay,function(){
			$(this).remove();
			$this.el.removeData('lishe.proAlert');
		});
		if(this.options.modal){
			this.modal.fadeOut(this.options.delay,function(){
				$(this).remove();
				$this.el.removeData('lishe.proAlert');
			});
		}
	};
	
	ProgressAlert.prototype.hide = function(){
		this.alert.hide();
		if(this.options.modal){
			this.modal.hide();
		}
	};

	$.fn.proAlert = function(option) {
		ProgressAlert.defaultOption = {
			modal:false,
			delay:0,
			msg:"",
			style:""
		};
		
		return this.each(function() {
			var $this   = $(this);
			var data    = $this.data('lishe.proAlert');
			var options = typeof option == 'object' && option;
			
			options = $.extend(true, {}, ProgressAlert.defaultOption, $this.data(), options);
			
			if (!data) $this.data('lishe.proAlert', (data = new ProgressAlert(this, options)));
			if (typeof option == 'string') data[option]();
		});
	};
})(jQuery);

/*

ConfirAlert - jQuery Confirm Plugin
-----------------------------------------------

*/
$.extend({
	slideshow:function(option){
		var defaultOption = {
			data:[],
			start:0
		};
		var options = $.extend(true, {}, defaultOption, option);
		var slideshow = $("<div class='modal bs-example-modal-lg slideshow' tabindex='-1'>"+
							"<span class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></span>"+
							"<div class='modal-dialog modal-lg'>"+
								"<div class='modal-content'>" +
									"<div class='modal-body' style='height:"+($("body")[0].clientHeight-150)+"px'>" +
										"<img/>"+
										"<a href='javascript:;' class='left carousel-control'>"+
											"<span class='glyphicon-chevron-left fa fa-angle-left'></span>"+
										"</a>"+
										"<a href='javascript:;' class='right carousel-control'>"+
											"<span class='glyphicon-chevron-right fa fa-angle-right'></span>"+
										"</a>"+
									"</div>"+
									"<div class='modal-footer'></div>"+
								"</div>"+
							"</div>"+
						"</div>");
		var body = slideshow.find(".modal-body");
		var footer = slideshow.find(".modal-footer");
		var length = 0;
		for(var key in options.data){
			var url = options.data[key];
			if(url){
				footer.append("<a class='slideshow-block' href='"+url+"' target='img"+key+"'><img src='"+url+"'/></a>");
				length++;
			}
		}
		if(length < 2)
			slideshow.find("a").hide();
		slideshow.modal().on('hidden.bs.modal', function (e) {
			$(this).remove();
		}).find("img").resize();
		
		body.find("a.right").click(footer, function(event){
			event.data.find("a.active").next().click();
		});
		body.find("a.left").click(footer, function(event){
			event.data.find("a.active").prev().click();
		});
		footer.find("a").click({body:body,footer:footer}, function(evnet){
			evnet.data.footer.find("a").removeClass("active");
			evnet.data.body.find("img")[0].src = $(this).addClass("active").attr("href");
			return false;
		});
		$("body").append(slideshow);
		footer.find("a:eq("+options.start+")").click();
	},
	confAlert:function(option){
		var defaultOption = {
			title:"提示",
			backdrop:"static",
			size:null,
			height:"auto",
			context:"",
			okButton:{
				keyboard:true,
				text:"确定",
				dismiss:true
			},
			noButton:{
				keyboard:true,
				text:"取消",
				dismiss:true
			},
			cancel:false,
			onOk:function(ui){},
			onNo:function(ui){},
			onClick:function(ui, btn){},
			onShow:function(ui){}
		};
		var options = $.extend(true, {}, defaultOption, option);
		var confAlert = "<div class='modal fade bs-example-modal-"+options.size+"' tabindex='-1'>" +
							"<div class='modal-dialog modal-"+options.size+"'>" +
								"<div class='modal-content'>"+
									"<div class='modal-header'>" +
										"<button type='button' class='close' data-dismiss='modal' aria-hidden='true'>&times;</button>" +
										"<h4 class='modal-title'>"+options.title+"</h4>" +
									"</div>" +
									"<div class='modal-body text-break' style='min-height:"+options.height+"'></div>" +
									"<div class='modal-footer'>" +
										(options.cancel?"<button name='cancel' type='button' class='btn btn-default' data-dismiss='modal'>取消</button>":"") +
										(options.noButton?"<button name='no' type='button' class='btn btn-default' "+(options.noButton.dismiss?"data-dismiss='modal'":"")+">"+options.noButton.text+"</button>":"") +
										(options.okButton?"<button name='ok' type='button' class='btn btn-primary' "+(options.okButton.dismiss?"data-dismiss='modal'":"")+">"+options.okButton.text+"</button>":"") +
									"</div>" +
								"</div>" +
							"</div>" +
						"</div>";
		confAlert = $(confAlert);
		confAlert.find(".modal-body").append(options.context);
		if(options.okButton && options.okButton.keyboard){
			confAlert.keydown(function(event){
				if(event.keyCode == 13){
					confAlert.find(".modal-footer button[name=ok]").click();
				}
			});
		}
		confAlert.find(".modal-footer button[name=ok]").click(function(){
			options.onOk(confAlert);
			options.onClick(confAlert, this.name);
		});
		confAlert.find(".modal-footer button[name=no]").click(function(){
			options.onNo(confAlert);
			options.onClick(confAlert, this.name);
		});
		$("body").append(confAlert);
		confAlert.modal({backdrop:options.backdrop, keyboard:options.noButton?options.noButton.keyboard:false}).on("hidden.bs.modal", function (e) {
			$(this).remove();
		}).on("shown.bs.modal", function(){
			options.onShow(confAlert);
		});
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