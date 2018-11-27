$.ajax({ url: "core/util.js", async: false, dataType: "script" });
var URL = {};
var DICT = [{
	CN: "English",
	EN: "中文版"
}, {
	CN: "首页",
	EN: "Home"
}, {
	CN: "公司简介",
	EN: "Company Profile"
}, {
	CN: "产品中心",
	EN: "Commercial"
}, {
	CN: "新闻中心",
	EN: "News Center"
}, {
	CN: "WUFK商城",
	EN: "WUFK store"
}, {
	CN: "文档支持",
	EN: "Document"
}, {
	CN: "联系我们",
	EN: "Contact Us"
}, {
	CN: "加入我们",
	EN: "Join Us"
}, {
	CN: "多媒体",
	EN: "Multimedia Center"
},


{
	CN: "个搜索结果",
	EN: "search results"
},{
	CN: "约有",
	EN: "About"
},{
	CN: "概览",
	EN: "Overview"
},

{
	CN: "关于我们",
	EN: "About Us"
}, {
	CN: "发展",
	EN: "Development"
}, {
	CN: "技术优势",
	EN: ""
}, {
	CN: "品牌",
	EN: "Brand"
},

{
	CN: "显示和传感器件",
	EN: "Display & Sensor Devices"
}, {
	CN: "笔记本液晶屏",
	EN: "Notebook LCD"
}, {
	CN: "工控液晶屏",
	EN: "Industrial LCD"
}, {
	CN: "安防液晶屏",
	EN: "Security LCD"
}, {
	CN: "监控液晶屏",
	EN: "Monitor LCD"
}, {
	CN: "医疗设备屏",
	EN: "Medical Device LCD"
}, {
	CN: "广告机液晶屏",
	EN: "Advertising LCD"
},

{
	CN: "产品图片",
	EN: "Photo"
},{
	CN: "产品参数",
	EN: "General Features"
},{
	CN: "产品详细",
	EN: "Spesc"
},{
	CN: "规格书下载",
	EN: "Datasheets Download"
},{
	CN: "验货标准(IIS)下载",
	EN: "Inspection Standard (IIS) Download"
},



{
	CN: "公司新闻",
	EN: "Company News"
}, {
	CN: "行业新闻",
	EN: "Industry News"
}, {
	CN: "社会热点",
	EN: "Social Hotspots"
}, {
	CN: "内容",
	EN: "Content"
}, {
	CN: "发布时间",
	EN: "PublishTime"
}, {
	CN: "分享至",
	EN: "share to"
}, {
	CN: "了解更多",
	EN: "More"
}, {
	CN: "阅读全文",
	EN: "More"
}, {
	CN: "相关内容推荐",
	EN: "Relevant content recommended"
}, {
	CN: "打开微信扫一扫",
	EN: "Open WeChat sweep"
}, 


{
	CN: "在社交媒体上关注我们",
	EN: "Focus on us on social media"
},{
	CN: "深圳市微方凯科技有限公司 版权所有",
	EN: "深圳市微方凯科技有限公司 版权所有"
},{
	CN: "粤ICP备13081708号-1",
	EN: "粤ICP备13081708号-1"
},


{
	CN: "销售热线",
	EN: "Sale Tel"
},{
	CN: "邮&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;箱",
	EN: "E-mail"
},{
	CN: "校园招聘",
	EN: "Campus Recruitment"
},{
	CN: "社会招聘",
	EN: "Social Recruitment"
},{
	CN: "微信号",
	EN: "Wechat"
},{
	CN: "地址",
	EN: "Address"
}];

var NAVIP = {
	stockId:["现货编号", "Stock ID"],
	panelBrand:["面板品牌", "Brand"],
	PanelModel:["面板型号", "Model"],
	panelSize: ["面板尺寸", "Panel Size"],
	panelType: [
		"面板类型", "Panel Type", 
		"a-Si TFT-LCD：非晶硅薄膜晶体管液晶显示器<br />LTPS TFT-LCD：低温多晶硅薄膜晶体管液晶显示器<br />HTPS TFT-LCD：高温多晶硅薄膜晶体管液晶显示器<br />AM OLED：主动矩阵式有机发光二极体<br />PM OLED：被动矩阵式有机发光二极体<br />TOLED：透明有机发光二极体<br />STN LCD：STN液晶显示器<br />CSTN LCD：彩色STN液晶显示器<br />FSTN LCD：覆膜型STN液晶显示器<br />CG-Silicon：连续微粒硅 (是LTPS的变种)<br />EL：电致发光<br />EPD：电纸书显示器",
		"a-Si TFT-LCD: a-Si Active Matrix TFT LCD<br />LTPS TFT-LCD: Low-temperature Polysilicon TFT LCD<br />HTPS TFT-LCD: High-temperature Polysilicon TFT LCD<br />AM OLED: Active Matrix Organic Light Emitting Diode<br />PM OLED: Passive Matrix Organic Light Emitting Diode<br />TOLED: Transparent Organic Light Emitting Diode<br />STN LCD: STN LCD<br />FSTN LCD: Film STN LCD<br />CSTN LCD: Color STN LCD<br />CG-Silicon: Continuous Grain Silicon, it's a variant of the LTPS<br />EL: EL display<br />EPD: Electronic Paper Display"
	],
	resolution: ["分辨率", "Resolution"],
	pixelFormat: [
		"像素排列", "Pixel Format",
		"LCR Vertical Stripe：左中右 垂直条状<br />Rectangle：正方形<br />RGB Delta：红绿蓝 三角形<br />RGB Horizontal Stripe：红绿蓝 水平条状<br />RGB Vertical Stripe：红绿蓝 垂直条状<br />RGBW Rectangle：红绿蓝白 正方形<br />RG/BW PenTile：(红绿)(蓝白) 垂直条状<br />RG/BG PenTile：(红绿)(蓝绿) 垂直条状<br />RGBY Vertical Stripe：红绿蓝黄 垂直条状",
		""
	],
	displayArea: ["显示区域", "Display Area"],
	OutlineSize: ["外观尺寸", "Outline Size"],
	surface: ["表面处理", "Surface"],
	brightness: ["显示亮度", "Brightness"],
	contrastRatio: ["对比度", "Contrast Ratio"],
	viewingAngle: [
		"可视角度", "Viewing Angle",
		"左/右/上/下", "Left / Right / Up / Down"
	],
	displayMode: [
		"显示模式", "Display Mode",
		"IPS硬屏系列：AAS, ADS, AHVA, FFS, IPS, New Mode2, PLS, SFT, Vistarich<br />VA软屏系列：ASV, HVA, MVA, PVA, SVA, UV²A, VA",
		"IPS Family: AAS, ADS, AHVA, FFS, IPS, New Mode2, PLS, SFT, Vistarich<br />VA Family: ASV, HVA, MVA, PVA, SVA, UV²A, VA"
	],
	bestView: ["最佳视角", "Best View on"],
	responseTime: ["响应时间", "Response Time"],
	displaycolor: ["显示颜色", "Display Color"],
	lampType: [
		"灯管类型", "Lamp Type", 
		"CCFL、EEFL、HCFL、FFL数量：x pcs<br />WLED、RGB LED数量：x strings、xSxP<br />举例说明3S8P×2CN <br />3S：3 LED串联<br />8P：8串并联<br />2CN：2个端子",
		"8S6P: 8 Serial, 6 Parallel"
	],
	frequency: [
		"扫描频率", "Frequency", 
		"120Hz (60HZ输入)：内置MEMC电路<br />120Hz+120Hz：120Hz面板+120Hz背光<br />240Hz (60HZ输入)：内置MEMC电路",
		"120Hz (60HZ Input) : Embedded MEMC Circuit<br />120Hz+120Hz : 120Hz Panel+120Hz Backlight<br />240Hz (60HZ Input) : Embedded MEMC Circuit"
	],
	touchScreen: ["触摸面板", "Touch Screen"],
	shapeStyle: ["物理形状", "Shape Style"],
	application: ["应用产品", "Application"],
	signalInterface: ["接口类型", "Signal Interface"],
	inputVoltage: ["电压供应", "Input Voltage"],
	environment: ["应用环境", "Environment"],

	quality:["产品品质", "Quality"],
	generalGrade:["通用等级", "General Grade", "业内通用的等级标准", "Grand Standard of Panel Manufacturer"],
	zbdRate: ["ZBD比例", "ZBD Rate", "ZBD比例：无亮点屏所占比例", "Grade generally used in Industry"],
	rmaPolicy: ["退修政策", "RMA Policy"],
	quantity: ["现货数量", "Quantity"],
	moq: ["起  订  量", "MOQ"],
	sample: ["样品提供", "Sample"],
	stockLocation: ["现货地点", "Stock Location"],
	delivery: ["交货地点", "Delivery"],
	leadTime: ["交货周期", "Lead Time"],
	priceTerm: ["价格条款", "Price Term"],
	priceTerm: ["价格条款", "Price Term"],
	unitPrice: ["销售单价", "Unit Price"],
	postDate: ["发布日期", "Post Date"],
	expirydate: ["有  效  期", "Expiry date"],
	composition: [
		"面板组成", "Composition", 
		"液晶片：TN/STN显示屏，不带边框和背光。<br />液晶模组：液晶模块，带边框，一般带背光。<br />液晶玻璃：TFT CELL/FOG/COG，不带背光和边框。<br />屏幕总成：液晶屏+触摸屏总成<br />双显示屏：多用于手机。",
		"LCD: TN/STN without bezel & backlight<br />LCM: TN/STN/TFT with bezel & backlight<br />CELL: TFT CELL/FOG/COG without bezel & backlight<br />Assembly: Display+Touch Screen Digitizer Assembly<br />Dual: Dual pisplay"
	],
	mode: ["显示模式", "Mode"],
	signalType: ["信号类型", "Signal Type"],
	rohsCompliance: ["RoHS", "RoHS Compliance"],
	datasheet: ["屏规格书", "Datasheet"]
};
var data = UTIL.getUrlData();
var NAVI = UTIL.getDictKV(DICT, ["CN"], data.lang=="EN"? "EN" : "CN");
if(data.lang == "EN"){
	var link = document.createElement("link");
	link.type = "text/css";
	link.rel = "stylesheet";
	link.href = "css/en.css";
	document.getElementsByTagName("head")[0].appendChild(link);
}
console.log("VAR: VAR loaded");
