var CookieUtil =  {};CookieUtil.addCookie = function (name, value, expireHours, path, domain, secure){  var cookieString = name + "=" + encodeURIComponent(value);  if (expireHours && expireHours> 0) {	  var date = new Date();	  date.setTime( date.getTime() +  expireHours * 1000 * 60 * 60 );	  cookieString=cookieString + ";expires=" + date.toGMTString();  }  document.cookie = cookieString +   	( ( path ) ? ';path=' + path : '' ) +	( ( domain ) ? ';domain=' + domain : '' ) +	( ( secure ) ? ';secure' : '' ); };//not decode,server do encode and encodeCookieUtil.addCookieNotEncode = function (name, value, expireHours, path, domain, secure){	  var cookieString = name + "=" + value;	  if (expireHours && expireHours> 0) {		  var date = new Date();		  date.setTime( date.getTime() +  expireHours * 1000 * 60 * 60 );		  cookieString=cookieString + ";expires=" + date.toGMTString();	  }	  document.cookie = cookieString + 	  	( ( path ) ? ';path=' + path : '' ) +		( ( domain ) ? ';domain=' + domain : '' ) +		( ( secure ) ? ';secure' : '' ); 	};CookieUtil.getCookie = function (name){  var strCookie = document.cookie;  var arrCookie = strCookie.split("; ");  for(var i = 0; i < arrCookie.length; i++){    var arr = arrCookie[i].split("=");    if(arr[0] == name)      return decodeURIComponent(arr[1]);  }  return "";};CookieUtil.deleteCookie = function (name, path, domain ){  var date = new Date();  date.setTime(date.getTime() - 10000);  document.cookie =  name + '=' +  ( ( path ) ? ';path=' + path : '') +  ( ( domain ) ? ';domain=' + domain : '' ) +  "; expires=" + date.toGMTString();};CookieUtil.deleteAllCookie = function(){	 var strCookie = document.cookie;	 var arrCookie = strCookie.split(";");	 var date = new Date();	 date.setTime(date.getTime() - 10000);	 for(var i = 0; i < arrCookie.length; i++){	    var arr = arrCookie[i].split("=");	    document.cookie = arr[0] + "=v; expires=" + date.toGMTString();	 }};/** 清空购物车 废弃*/CookieUtil.clearCart = function () {	var cdomain = location.host;	if (cdomain.indexOf("boe.com") != -1) {//sit、pre、prd环境		cdomain = "boe.com";	} else if (cdomain.indexOf("192.168") != -1 			|| cdomain.indexOf("localhost") != -1			|| cdomain.indexOf("127.0.0.1") != -1){//兼容本地开发环境		cdomain = "";	} else {		cdomain = "boe.com";	}	CookieUtil.deleteCookie("memberCookieCartName1111", "/", cdomain);/*清除处理改在后台*/};/** 设置购物车 废弃*/CookieUtil.setCart = function (value) {	var cdomain = location.host;	if (cdomain.indexOf("boe.com") != -1) {//sit、pre、prd环境		cdomain = "boe.com";	} else if (cdomain.indexOf("192.168") != -1 			|| cdomain.indexOf("localhost") != -1			|| cdomain.indexOf("127.0.0.1") != -1){//兼容本地开发环境		cdomain = "";//不设置domain	} else {		cdomain = "boe.com";	}	CookieUtil.addCookieNotEncode("memberCookieCartName111", value, 30*24, "/", cdomain);};/** 设置地区 * value：json对象{provinceCode:11, province:北京, cityCode:1101, city:北京市区,  districCode:110101, distric:东城区} * */CookieUtil.setArea = function (value) {	CookieUtil.addCookie("defaultAddress", jsonToStr(value), 12*30*24, "/", "", "");};/** 获取地区cookie * return json对象的cookie * */CookieUtil.getArea = function () {	return strToJson(CookieUtil.getCookie("defaultAddress"));};//alert("cookie_util.js loaded");