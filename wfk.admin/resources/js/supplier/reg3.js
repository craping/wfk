//加载RSA公钥
Web.Method.ajax("getPublicKey", {
	url:Web.Recource.serverSysURL,
	success:function(data){
		Crypto.setRSAPublicKey(data.info.n);
		Crypto.encryptFlag = data.info.id;
	},
	fail:function(data){}
});
var wait=5;  

function timeOut() {
	if (wait == 0) {
		window.location.href = "../supplier/company_msg.html";
	} else {
		setTimeout(function() {
			wait--;
			$("#count_dowm").html(wait + 's');
			timeOut();
		}, 1000)
	}
}
$(function(){
	timeOut(); 
	$("#go_login").click(function(){
		window.location.href="../supplier/login.html";
	});
});
