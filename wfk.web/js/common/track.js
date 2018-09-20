/* by  ohkei@qq.com  2017.5.25 */

var _hmt = _hmt || [];
(function() {
	var hm = document.createElement("script");
	hm.src = "https://hm.baidu.com/hm.js?4ea4fc530ed4220278c643746a5a71bf";
	var s = document.getElementsByTagName("script")[0];
	s.parentNode.insertBefore(hm, s);
})();

window.$pgname = function() {
	var _url = location.href;
	var _name = _url.split(".htm")[0].split("/").pop();
	return _name;
}

window.$device = function() {
	var urlhash = window.location.hash;
	if(!urlhash.match("fromapp")) {
		if((navigator.userAgent.match(/(iPhone|iPod|Android|ios|iPad)/i))) {
			//alert("你是手机浏览器");
			return "mb"
		}
	}
	return "pc";
}

window.trackFn = function(_id, _url, _open) {
	var _pgname = $pgname();
	var _device = $device();
	console.log("【监测】", _pgname, _id, _device);
	_hmt.push(['_trackEvent', _pgname, _id, _device]);

	if(_open == "openNewWindow") {
		if(_url) {
			setTimeout(function() {
				window.open(_url);
			}, 300);
		}
	} else { //判断是跳转pc商城还是移动端商城
		if((_url.indexOf("store.boe.com") != -1) && (windW < 767)) {
			setTimeout(function() {
				window.location.href = "https://m.boe.com/mobileStore/index.html#!mall/%7B%7D";
			}, 300);
		} else {
			if(_url != '') {
				setTimeout(function() {
					window.location.href = _url;
				}, 300);
			}
		}
	};
};

//当前页pageview
//trackFn(0);