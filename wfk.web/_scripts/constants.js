/**
 * 资源配置对象
 * 
 * @author MeiZhi
 * @date 20140825
 */

 var pathname = location.pathname.split("/")[1];
 if(pathname==='cms-template'){
	 $.ajax({url:"/"+location.pathname.split("/")[1]+"/"+"core/var.js",async:false,dataType:"script",cache:false});
 }else{
//	 $.ajax({url:"/"+"portal"+"/"+"core/var.js",async:false,dataType:"script",cache:false});
	 $.ajax({url:"core/var.js",async:false,dataType:"script",cache:false});
 }
//$.ajax({url:"/"+location.pathname.split("/")[1]+"/"+"core/var.js",async:false,dataType:"script",cache:false});
