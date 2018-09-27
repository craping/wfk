function onValue(val){
	document.getElementById("status").value=val;
}

function toAdd(){	
	var name=document.getElementById("name").innerHTML;
	var status=document.getElementById("status").value;
	var adThumbnail=document.getElementById("adThumbnail").value;
	Web.Method.ajax("adpositionid/add",{data:{
		name:name,
		status:status,
		adThumbnail:adThumbnail
	},
	success:function(data){
		alert(data);
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

function UpladFile(){
	$.ajaxFileUpload({  
	         url:Web.Recource.server+"/FileUpload.do",             //需要链接到服务器地址  
	         secureuri:false,  
	         fileElementId:'uploadFileInput',                         //文件选择框的id属性  
	         dataType: 'jsonp',                                     //服务器返回的格式，可以是json  
	         success: function (data, status)             //相当于java中try语句块的用法  
	         {     
	        	 alert(data.src);
	         },  
	         error: function (data, status, e)             //相当于java中catch语句块的用法  
	         {  
	        	var adb= document.getElementById("adThumbnail");
	        	alert(data+"   "+e);
	        	adb.value="J:/abc/tanyue.jpg";
	        	
	  
	         }  
	       }  
	     );  
}  
