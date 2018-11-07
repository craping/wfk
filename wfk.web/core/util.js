/* console兼容 */
window.console=window.console||{log:function(){},info:function(){}};

/* json2 */
if (typeof JSON !== 'object') {
    JSON = {};
}

(function () {
    'use strict';

    function f(n) {
        return n < 10 ? '0' + n : n;
    }

    if (typeof Date.prototype.toJSON !== 'function') {

        Date.prototype.toJSON = function () {

            return isFinite(this.valueOf())
                ? this.getUTCFullYear()     + '-' +
                    f(this.getUTCMonth() + 1) + '-' +
                    f(this.getUTCDate())      + 'T' +
                    f(this.getUTCHours())     + ':' +
                    f(this.getUTCMinutes())   + ':' +
                    f(this.getUTCSeconds())   + 'Z'
                : null;
        };

        String.prototype.toJSON      =
            Number.prototype.toJSON  =
            Boolean.prototype.toJSON = function () {
                return this.valueOf();
            };
    }

    var cx,
        escapable,
        gap,
        indent,
        meta,
        rep;


    function quote(string) {

        escapable.lastIndex = 0;
        return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
            var c = meta[a];
            return typeof c === 'string'
                ? c
                : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
        }) + '"' : '"' + string + '"';
    }


    function str(key, holder) {

        var i,          // The loop counter.
            k,          // The member key.
            v,          // The member value.
            length,
            mind = gap,
            partial,
            value = holder[key];

        if (value && typeof value === 'object' &&
                typeof value.toJSON === 'function') {
            value = value.toJSON(key);
        }

        if (typeof rep === 'function') {
            value = rep.call(holder, key, value);
        }

        switch (typeof value) {
        case 'string':
            return quote(value);

        case 'number':

            return isFinite(value) ? String(value) : 'null';

        case 'boolean':
        case 'null':

            return String(value);

        case 'object':

            if (!value) {
                return 'null';
            }

            gap += indent;
            partial = [];

            if (Object.prototype.toString.apply(value) === '[object Array]') {

                length = value.length;
                for (i = 0; i < length; i += 1) {
                    partial[i] = str(i, value) || 'null';
                }

                v = partial.length === 0
                    ? '[]'
                    : gap
                    ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']'
                    : '[' + partial.join(',') + ']';
                gap = mind;
                return v;
            }

            if (rep && typeof rep === 'object') {
                length = rep.length;
                for (i = 0; i < length; i += 1) {
                    if (typeof rep[i] === 'string') {
                        k = rep[i];
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            } else {

                for (k in value) {
                    if (Object.prototype.hasOwnProperty.call(value, k)) {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            }

            v = partial.length === 0
                ? '{}'
                : gap
                ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}'
                : '{' + partial.join(',') + '}';
            gap = mind;
            return v;
        }
    }

    if (typeof JSON.stringify !== 'function') {
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
        meta = {    // table of character substitutions
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"' : '\\"',
            '\\': '\\\\'
        };
        JSON.stringify = function (value, replacer, space) {

            var i;
            gap = '';
            indent = '';

            if (typeof space === 'number') {
                for (i = 0; i < space; i += 1) {
                    indent += ' ';
                }

            } else if (typeof space === 'string') {
                indent = space;
            }

            rep = replacer;
            if (replacer && typeof replacer !== 'function' &&
                    (typeof replacer !== 'object' ||
                    typeof replacer.length !== 'number')) {
                throw new Error('JSON.stringify');
            }

            return str('', {'': value});
        };
    }

    if (typeof JSON.parse !== 'function') {
        cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
        JSON.parse = function (text, reviver) {

            var j;

            function walk(holder, key) {

                var k, v, value = holder[key];
                if (value && typeof value === 'object') {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }

            text = String(text);
            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function (a) {
                    return '\\u' +
                        ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }

            if (/^[\],:{}\s]*$/
                    .test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
                        .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
                        .replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

                j = eval('(' + text + ')');

                return typeof reviver === 'function'
                    ? walk({'': j}, '')
                    : j;
            }

            throw new SyntaxError('JSON.parse');
        };
    }
}());

/**
 * function trim()
 * @method 截取字符串的首尾空格
 * @param null
 * @return String
 */
String.prototype.trim=function(){return this.replace(/(^\s*)|(\s*$)/g,'');};
/**
 * function setLength()
 * @method 按实际长度截取字符串(中文为英文两倍)
 * @param Number 最大长度
 * @return Number 截取后的字符串
 */
String.prototype.setLength=function(max){
	var n=0,s="";
	for(var i=0;i<this.length;i++){
		if(this.charCodeAt(i)>128){n+=2;}else{n++;}
		s+=this.charAt(i);
		if(n>=max){return s;}
	}
	return s;
};
/**
 * function getLength()
 * @method 返回实际长度(中文为英文两倍)
 * @param null
 * @return Number 长度
 */
String.prototype.getLength=function(){
	var n=0;
	for(var i=0;i<this.length;i++){
		if(this.charCodeAt(i)>128){n+=2;}else{n++;}
	}
	return n;
};

var UTIL={
	
/* 判断数组是否包含某些元素中的任意一个 */
	anyHas : function(o,a){
		for(var n=0;n<a.length;n++){
			for(var i=0;i<o.length&&o[i]!=a[n];i++);
			return !(i==o.length);
		}
	},

/* 判断数组是否包含这些全部元素 */
	allHas : function(o,a){
		for(var n=0;n<a.length;n++){
			for(var i=0;i<o.length&&o[i]!=a[n];i++);
			if(i==o.length)return false;
		}return true;
	},
		
/* 按键控制 */
	keyBind : function (key,trig){
		if(window.KEY_REG==null)window.KEY_REG=[];
		if(key>0&&!UTIL.keyRegHas(key))
			window.KEY_REG.push({key:key,trig:trig});
		return window.KEY_REG;
	},
	keyUnbind : function (key){
		if(window.KEY_REG!=null)
			for(var i=0;i<window.KEY_REG.length;i++)
				if(window.KEY_REG[i].key==key){
					window.KEY_REG.splice(i,1);
					i--;
				}
		return window.KEY_REG;
	},
/* 按键是否被注册 */
	keyRegHas : function(key){
		if(window.KEY_REG!=null)
			for(var i=0;i<window.KEY_REG.length;i++)
				if(window.KEY_REG[i].key==key)
					return true;
		return false;
	},
/* 悬浮监测 */
	hoverCheck : function (){
		var o=UTIL.parseArg(arguments);
		if(window.HOVER_REG==null)window.HOVER_REG=[];
		if(UTIL.isArray(o))
			for(var i=0;i<o.length;i++)
				UTIL.hoverCheck(o[i]);
		if(o instanceof HTMLElement)
			$(o).hover(function(){
				if(!UTIL.hoverHas(o))
					window.HOVER_REG.push(o);
			},function(){
				if(window.HOVER_REG!=null){
					for(var i=0;i<window.HOVER_REG.length;i++)
						if(window.HOVER_REG[i]==o){
							window.HOVER_REG.splice(i,1);
							i--;
						}
				}
			});
		return window.HOVER_REG;
	},
/* 悬浮检测 */
	hoverHas : function (){
		var o=UTIL.parseArg(arguments);
		var arr=[];
		function f(o){
			if(window.HOVER_REG!=null){
				for(var i=0;i<window.HOVER_REG.length;i++){
					if(window.HOVER_REG[i]==o)
						arr.push(o);
				}
			}
		}
		if(UTIL.isArray(o))
			for(var n=0;n<o.length;n++)
				f(o[n]);
		else
			f(o);
		if(arr.length>0)
			return arr;
		else
			return null;
	},
/* 判断数组 */
	isArray : function (o){
	    return Object.prototype.toString.call(o)==="[object Array]";
	},
/* 阻止默认事件 */
	preventDefault : function (e){
		if(document.all)window.event.returnValue=false;
		e.preventDefault();
		return false;
	},
/* 阻止冒泡 */
	stopPropagation : function (e,o){
		e=e||window.event;
		e.stopPropagation?e.stopPropagation():e.cancelBubble=true;
		if(o)$(o).parents().each(function(){var p=this;if(p.href)p.onclick=UTIL.preventDefault;});
	},
/* 输入提示 */
	inputTip : function (o,tip){
		o.lang=tip;
		$(o).focus(function(){if(this.value==this.lang)this.value="";this.style.color="#353535";});
		$(o).blur(function(){if(this.value.trim()==""||this.value==this.lang){this.value=this.lang;this.style.color="#999999";}});
		$(o).blur();
	},
/* 获取参数 */
	getSearch : function (k){
		return location.href.split(k+"=")[1].split("&")[0];
	},
/* 获取参数 */
	checkhrefKV : function (key){var s=location.search,_s="??"+s,r,v,k;if(s){if(key){r=eval("/\\W"+key+"=/");if(_s.split(r)[1])v=_s.split(r)[1].split("&")[0];k=(_s.match(r)+"").substring(1);return v?(k+v).split("="):null;}else return s;}},
	checkhref : function (key){if(UTIL.checkhrefKV(key)){if(key)return UTIL.checkhrefKV(key)[1];else return UTIL.checkhrefKV();}else return null;},

/* jsonp请求 */
	jsonpAjax : function (url,success,error,txt,jsonp){
		txt=txt?txt:"";
		$.ajax({
			url:url,
			dataType:"jsonp",
			jsonp:jsonp?jsonp:"jsonpcallback",
			success:success?success:function(data){console.log(url);console.log(txt+"请求成功：");console.log(data);},
			error:error?error:function(data){console.log(url);console.log("%c"+txt+"请求失败：","color:red");console.log(data);}
		});
	},
    postRequest: function (dataUrl, params) {
        return $.ajax({
            url: dataUrl,
            type: 'GET',
            data: "jsonStr=" + encodeURI(JSON.stringify(params)) + "&sort=" + (params.sort || "createTime") + "&order=" + (params.order || "desc") + (params.pageNo ? "&pageNo=" + params.pageNo : "") + (params.pageSize ? "&pageSize=" + params.pageSize : ""),
            dataType: 'jsonp',
            error: function (x, h, r) {
            	console.log(x);
            	console.log(h);
            	console.log(r);
                alert("Request Error");
            }
        });
    },
/* cors请求 */
	corsAjax : function(o){
		var x=window.XDomainRequest;
		if(x&&o.url.indexOf(location.host)<0){
			var r=new x();
			r.open(o.type||"post",o.url,o.async||true);
			r.onload=function(){o.success(r.responseText);};
			r.onerror=function(){o.error(r.responseText,r.statusText);};
			r.send(o.data);
		}else
		$.ajax(o);
	},

/* 补充资源 */
	supplement : function(){
		for(var i=0;i<arguments.length;i++){
			var o=arguments[i];
			if(o.type=="js"){
				if($("script[src$='"+o.url+"']").size()<1){
					var d=document.createElement("script");
					d.src=VAR.CURRENT()+o.url;
					$("body").append(d);
					console.log("supplement js: "+o.url);
					console.log(d);
				}
			}
			if(o.type=="css"){
				if($("link[href$='"+o.url+"']").size()<1){
					var d=document.createElement("link");
					d.href=VAR.CURRENT()+o.url;
					d.rel="stylesheet";
					$("head").append(d);
					console.log("supplement css:"+o.url);
					console.log(d);
				}
			}
		}
	},
	
/* 链接地址处理 */
	linkDispose : function(){
		var a=UTIL.parseArg(arguments);
		if(a==null||UTIL.anyHas(a,"img"))
		$("img").each(function(){
			var src=$(this).attr("src");
			if(src.match(/./)!="/"&&src.indexOf("http://")<0)
				$(this).attr("src",VAR.CURRENT()+src);
		});
		if(a==null||UTIL.anyHas(a,"a"))
		$("a").each(function(){
			var href=$(this).attr("href");
			if(href!=null){
				if(href=="#")
					$(this).attr("href","javascript:;");
				else if(href=="index.html")
					$(this).attr("href","/index.html");
				else if(href.match(/./)!="/"&&href.indexOf("javascript:")<0&&href.indexOf("http://")<0&&href.indexOf("mailto")<0)
					$(this).attr("href",VAR.CURRENT()+href);
			}
		});
	},
	
	parseArg : function(arg){
		var arr=UTIL.parseArray(arg);
		if(arr.length>1)
			return arr;
		else
			return arr[0];
	},
/* 数组转换(返回多维数组，用于arguments等非正规数组转为普通数组 */	
	parseArray : function(arg){
		var arr=[];
		function f(arg,arr){
			if(arg.length){
				arr.push([]);
				for(var i=0;i<arg.length;i++)
					if(arg[i])f(arg[i],arr[arr.length-1]);
			}else
				arr.push(arg);
		}
		if(arg)f(arg,arr);
		return arr[0];
	},
/* 数组转换(返回一维数组，可用于多维数组转换为一维数组 */
	parseArraySimple : function(arg){
		var arr=[];
		function f(arg){
			if(arg.length){
				for(var i=0;i<arg.length;i++)
					if(arg[i])f(arg[i]);
			}else
				arr.push(arg);
		}
		if(arg)f(arg);
		return arr;
	},
/* 查询字典 返回key-value键值对 对象 参数(字典,键:可以为数组,值) 例：getDictKV(DICT,["name","sername"],"telephone") */
	getDictKV : function(d,k,v){
		var o={};
		function f(d,k,v){
			for(var m=0;m<d.length;m++){
				if(UTIL.isArray(d[m][k])){
					for(var n=0;n<d[m][k].length;n++)
						o[d[m][k][n]]=d[m][v]||null;
				}else if(d[m][k])o[d[m][k]]=d[m][v]||null;
			}
		}
		if(UTIL.isArray(k)){
			for(var i=0;i<k.length;i++)
				f(d,k[i],v);
		}else f(d,k,v);
		return o;
	},
	indexOfDictValue : function(d,s,f){
		var a=[];
		for(var i=0;i<d.length;i++){
			for(var v in d[i]){
				if((f&&f(s,d[i][v])||s==d[i][v])){
					a.push(i);
				}
			}
		}
		return a;
	},
	getUrlData:function(url){
		var dataString = url?url.split("?")[1]:window.location.href.split("?")[1];
		var result = new Object();
		if(dataString){
			dataString = decodeURI(dataString);
			var dataArray = new Array();
			dataArray = dataString.split("&");
			 
			for(var key in dataArray){
				var data = dataArray[key].split("=");
				result[data[0]] = data[1];
			}
		}
		return result;
	}
};

$(function(){
	
	$(this).keydown(function(e){
		if(window.KEY_REG){
			var reg=window.KEY_REG;
			for(var i=0;i<reg.length;i++){
				if(e.keyCode==reg[i].key){
					(reg[i].trig)();
				}
			}
		}
	});
	
});
console.log("UTIL: UTIL loaded");