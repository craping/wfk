setTimeout(function () {
	var path = "";
	if (!window.PUBLIC) {
		path = "";
	}
	$("#footer").load("_template/footer.html", function () {
		//二维码的left common

        $(".wx-code").css("left", $(".weixin-box").find("span").offset().left - 10 + "px");

        //底部微信二维码 common
        $(".xin-icon").mouseover(function () {
            $(".wx").css("display", "block");
        }).mouseout(function () {
            $(".wx").css("display", "none");
        });
        //领英
        $(".yl-icon").mouseover(function () {
            $(".yl").css("display", "block");
        }).mouseout(function () {
            $(".yl").css("display", "none");
		});
		

		var footerArr1 = [
			{
				maxTitle: NAVI["公司简介"],
				m_href: "javascript:void(0)",
				title: NAVI["关于我们"],
				href: "javascript:trackFn('about.html')",
				text: [
					{
						text: NAVI["发展"],
						href: "javascript:trackFn('development.html')"
					},
					/* {
						text: NAVI["技术优势"],
						href: ""
					}, */
					{
						text: NAVI["品牌"],
						href: "javascript:trackFn('brand.html')"
					}
				]
			},
			{
				maxTitle: NAVI["产品中心"],
				m_href: "javascript:void(0);",
				title: NAVI["显示和传感器件"],
				href: "",
				text: [
				]
			}

		];
		var footerArr2 = [
			{
				maxTitle: NAVI["新闻中心"],
				m_href: "javascript:trackFn('news.html')",
				title: NAVI["公司新闻"],
				href: "javascript:trackFn('information.html?type=1')",
				text: [
					{
						text: NAVI["行业新闻"],
						href: "javascript:trackFn('information.html?type=2')"
					},
					{
						text: NAVI["社会热点"],
						href: "javascript:trackFn('information.html?type=3')"
					}
				]
			}
		];
		// footer
		var footerVm1 = new Vue({
			el: ".footerList1",
			data: {
				todos: footerArr1,
				todoss: footerArr2
			}
		})
		var footerVm2 = new Vue({
			el: ".footerList1",
			data: {
				todos: footerArr2
			}
		});
		var footerVm2 = new Vue({
			el: ".weixin-box"
		});
	});
}, 100);

