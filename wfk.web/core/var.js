/**
 * 资源配置对象
 * 
 */

var IP_DICT = [
	//for Test
		{
			STORE : "http://sitstore.boe.com",
			SOCIAL : "http://sitsocial.boe.com",
			PORTAL : "http://sitwww.boe.com",
			PORTAL_CDN : "http://sitwww.boe.com",
			ADM : "http://sitcmscam.boe.com",
			MOBILE : "https://sitmobile.boe.com"
		},
	//for pre-product	
		{
			STORE : "http://prestore.boe.com",
			SOCIAL : "http://presocial.boe.com",
			PORTAL : "http://prewww.boe.com",
			PORTAL_CDN : "http://prewww.boe.com",
			ADM : "http://precmscam.boe.com",
			MOBILE : "https://premobile.boe.com"
		},
	//for product	 PORTAL_CDN : "http://newwww.boe.com",
		{
			STORE : "http://store.boe.com",
			SOCIAL : "http://social.boe.com",
			PORTAL : "http://www.boe.com",
			PORTAL_CDN : "http://portimg.boe.com",
			ADM : "http://cmscam.boe.com",
			MOBILE : "https://m.boe.com"
		},
	//for Test https
		{
			STORE : "https://sitstore.boe.com",
			SOCIAL : "https://sitsocial.boe.com",
			PORTAL : "https://sitwww.boe.com",
			PORTAL_CDN : "http://sitwww.boe.com",
			ADM : "https://sitcmscam.boe.com",
			MOBILE : "httpss://sitmobile.boe.com"
		},
	//for pre-product	
		{
			STORE : "https://prestore.boe.com",
			SOCIAL : "https://presocial.boe.com",
			PORTAL : "https://prewww.boe.com",
			PORTAL_CDN : "http://prewww.boe.com",
			ADM : "https://precmscam.boe.com",
			MOBILE : "httpss://premobile.boe.com"
		},
	//for product	 PORTAL_CDN : "https://newwww.boe.com",
		{
			STORE : "https://store.boe.com",
			SOCIAL : "https://social.boe.com",
			PORTAL : "https://www.boe.com",
			PORTAL_CDN : "http://portimg.boe.com",
			ADM : "https://cmscam.boe.com",
			MOBILE : "httpss://m.boe.com"
		},
	//for product2
		{
			STORE : "http://store.boe.com",
			SOCIAL : "http://social.boe.com",
			PORTAL : "http://www.boe.com",
			PORTAL_CDN : "http://portimg.boe.com",
			ADM : "http://cmscam.boe.com",
			MOBILE : "https://m.boe.com"
		}
];


var pathname = location.pathname.split("/")[1];
if(pathname==='cms-template'){
	 $.ajax({url: "/"+location.pathname.split("/")[1]+"/core/util.js",async:false,dataType:"script"});
}else{
	 $.ajax({url: "core/util.js",async:false,dataType:"script"});
}
//$.ajax({url: "/"+location.pathname.split("/")[1]+"/core/util.js",async:false,dataType:"script"});

var IP = IP_DICT[UTIL.indexOfDictValue(IP_DICT,location.protocol+"//"+location.host)[0]];

var PROJ = {
	// 模版库
	TEMPLATE : IP.ADM + "/cms-template/",
	// 版本库
	VERSION : IP.ADM + "/cms-version/",
	// EDIT
	EDIT : IP.ADM + "/cms-edit/",
	// 素材库
	ARTICLE : IP.ADM + "/cms-article/",
	// miniShop
	MINISHOP : IP.ADM + "/miniShop/",
	// 官网接口
	_PORTAL : IP.PORTAL+"/portal/",
	// 官网
	PORTAL : IP.PORTAL+"/portal/",
	// store
	STORE : IP.STORE+"/store/"
};

var VAR = {
	// 是否为英文版
	_EN : function(){return VAR.INDEX_NAME().indexOf("_en")>0?"_en":"";},
	pEN : function(){return VAR.INDEX_NAME().indexOf("_en")>0?"en/":"";},
	E : function(){return VAR.INDEX_NAME().indexOf("_en")>0?"e":"";},
	// 当前环境
	CURRENT : function(){return "/"+location.pathname.split("/")[1]+"/";},
	// 模版路径
	TEMPLATE_PATH : function(){var s=location.pathname.split("template/");return s.length>1?"/"+s[s.length-1]:location.pathname;},
	// HTML名
	HTML_NAME : function(){var s=VAR.TEMPLATE_PATH().split("/");return s[s.length-1];},
	// 模版前缀
	INDEX_NAME : function(){return UTIL.checkhref("fileName")?UTIL.checkhref("fileName").split("template")[0]:VAR.TEMPLATE_PATH().split(VAR.HTML_NAME())[0].replace("/","").replace(/\//mg,"_");},
	// 主模版名
	TEMPLATE_MAIN_NAME : function(){return VAR.INDEX_NAME()+"template_main";},
	// 子模版名
	TEMPLATE_PART_NAME : function(){return VAR.INDEX_NAME()+"template_part";},
	// 一级栏目
	HEAD_COLUMN : function(){return VAR.INDEX_NAME().split("_")[0];},
	// 官网主栏目
	CURRENT_COLUMN : function(){var n=VAR.INDEX_NAME().split("portal"+VAR._EN()+"_")[1];return n?n.split("_")[0]:null;},
	// 简写名
	SIMPLE_NAME : function(){var s="",n=VAR.INDEX_NAME().split("_");for(var i=0;i<n.length;i++)if(n[i][0])s+=n[i][0];return s;},
	// 发布路径
	SITE_PATH : function(){
		var s=("/"+VAR.INDEX_NAME().split("$")[0].replace(/_/mg,"/")).replace("/service/","/store-service/").replace("/user/","/store-member/").replace("/portal/", "/");
		return s.indexOf("store-service/")>0?IP.PORTAL+s:s.indexOf("store-member/")>0?IP.PORTAL+s:IP.PORTAL+s;
	},
	// 发布完整路径
	SITE_URL : function(){return VAR.SITE_PATH()+VAR.SIMPLE_NAME()+".html";}
};

var VAL = {
	// 模版过滤器
	FILTER_TEMPLATE_BEGIN : "<!-- Filter Template Begin -->",
	FILTER_TEMPLATE_END : "<!-- Filter Template End -->"	
};

var URL = {
	// 整站首页地址
	HOME_URL : PROJ.STORE + "index.html",
	
	// 关于BOE
	ENTERPRISE_HOME_URL : PROJ.PORTAL + VAR.pEN() + "home/p"+VAR.E()+"h.html",
	// 关于我们
	ENTERPRISE_ABOUTUS_URL : PROJ.PORTAL + VAR.pEN() + "guanyuwomen/p"+VAR.E()+"g.html",
	// 关于我们 > 社会责任
	ENTERPRISE_ABOUTUS_QIYESHEHUIZEREN_URL : PROJ.PORTAL + VAR.pEN() + "guanyuwomen/qiyeshehuizeren/p"+VAR.E()+"gq.html",
	// 关于我们 > 社会责任 > 环境保护
	ENTERPRISE_ABOUTUS_QIYESHEHUIZEREN_HUANJINGBAOH_URL : PROJ.PORTAL + VAR.pEN() + "guanyuwomen/qiyeshehuizeren/huanjinganli/p"+VAR.E()+"gqh.html",
	// 创新科技
	ENTERPRISE_CREATE_URL : PROJ.PORTAL + VAR.pEN() + "chuangxinkeji/p"+VAR.E()+"c.html",
	// 创新科技 > 科技前沿
	ENTERPRISE_CREATE_KEJIQIANYAN_URL : PROJ.PORTAL + VAR.pEN() + "chuangxinkeji/kejiqianyan/p"+VAR.E()+"ck.html",
	// 创新科技 > boe创新
	ENTERPRISE_CREATE_BOECHUANGXIN_URL : PROJ.PORTAL + VAR.pEN() + "chuangxinkeji/boechuangxin/p"+VAR.E()+"cb.html",
	// 个人与家用
	ENTERPRISE_PERSONAL_URL : PROJ.PORTAL + VAR.pEN() + "gerenyujiayong/p"+VAR.E()+"g.html",
	// 商用与服务
	ENTERPRISE_BUSINESS_URL : PROJ.PORTAL + VAR.pEN() + "shangyongyufuwu/p"+VAR.E()+"s.html",
	// 新闻中心
	ENTERPRISE_NEWS_URL : PROJ.PORTAL + VAR.pEN() + "xinwenzhongxin/p"+VAR.E()+"x.html",
	// 新闻中心 > 视频报道
	ENTERPRISE_NEWS_SHIPINBAODAO_URL : PROJ.PORTAL + VAR.pEN() + "xinwenzhongxin/shipinbaodao/p"+VAR.E()+"xs.html",
	// 投资者关系
	ENTERPRISE_INVEST_URL : PROJ.PORTAL + VAR.pEN() + "touzizheguanxi/p"+VAR.E()+"t.html",
	// 加入我们
	JOINUS_URL : PROJ.PORTAL + VAR.pEN() + "jiaruwomen/p"+VAR.E()+"j.html",
	// 联系我们
	CONTACTUS_URL : PROJ.PORTAL + VAR.pEN() + "touzizheguanxi/lianxiwomen/lianxiwomenxiangxi/p"+VAR.E()+"tll.html",
	
	// 视频中心
	VIDEOCENTER_URL : PROJ.PORTAL + VAR.pEN() + "videocenter/p"+VAR.E()+"v.html",
	
	// BOE说
	BOETALK_URL : PROJ.PORTAL + VAR.pEN() + "boeshuo/p"+VAR.E()+"b.html",
	// BOE商城
	STORE_HOME_URL : PROJ.STORE + "mall.html",
	
	// 服务首页地址
	SERVICE_HOME_URL : PROJ.STORE + "service/service.html",
	// 产品问答列表
	PRODUCT_LIST_URL : PROJ.STORE + "service/product_qa.html",
	// 用户专享
	MEMBER_POWER_URL : PROJ.STORE + "member/member!introduction.html",
	
	// 网站题图
	SITE_MAP_URL : PROJ.STORE + "sitemap/sitemap.html",
	
	// 公共文件目录
	COMMON_FILE_FOLDER : VAR.CURRENT() + "_page/common/",
	// 模版文件目录
	TEMPLATE_FILE_FOLDER : VAR.CURRENT() + "_template/",
	
	// 表单数据接口
	BASE_DATA_URL : PROJ.EDIT + "edit/findTemplate.action",
	// 加载子模板接口
	GET_TEMPLATE_URL : PROJ.TEMPLATE + "GetFileByFileName",
	// 保存子模板接口
	SAVE_TEMPLATE_URL : PROJ.VERSION + "saveFileInFo",
	// 发布接口
	PUBLISH_URL : PROJ.VERSION + "puslish",
	// 获取图片接口
	PIC_GET_URL : PROJ.ARTICLE + "picture/findPictureJsonp.action",
	// 图片库js
	PIC_RES_URL : PROJ.ARTICLE + "js/picResource.js",
	// 图片库页面
	PIC_DIALOG_URL : PROJ.ARTICLE + "page/article/picDialog.html",
	// 查询图片库接口
	FIND_PIC_URL : PROJ.ARTICLE + "picture/findPictureJsonp.action",
	// 文件接口
	ARTICLE_FILE_URL : PROJ.ARTICLE + "file/showFile.action",
	// 查询详情信息接口
	QUERY_DETAIL_URL : PROJ.PORTAL + "portal/queryDetailInfo.action",
	// 视频库js--20170630
	VIDEO_RES_URL : PROJ.ARTICLE + "js/videoResource.js",
	// 视频库弹窗页面--20170630
	VIDEO_DIALOG_URL : PROJ.ARTICLE + "page/article/videoDialog.html",
};

var DICT = [
            {
            	CN:"首页",
            	EN:"Homepage",
            	URL:URL.HOME_URL
            },
            {
            	CN:["关于京东方","关于BOE"],
            	EN:["About BOE","AboutBOE"],
            	INDEX:"home",
            	URL:URL.ENTERPRISE_HOME_URL
            },
            {
            	CN:"企业概览",
            	EN:"Company Overview",
            	INDEX:"guanyuwomen",
            	URL:URL.ENTERPRISE_ABOUTUS_URL
            },
            {
            	CN:"社会责任",
            	EN:"CSR",
            	INDEX:"guanyuwomen_qiyeshehuizeren",
            	URL:URL.ENTERPRISE_ABOUTUS_QIYESHEHUIZEREN_URL
            },
            {
            	CN:"环境保护",
            	EN:"Environmental Protection",
            	INDEX:"guanyuwomen_qiyeshehuizeren_huanjinganli",
            	URL:URL.ENTERPRISE_ABOUTUS_QIYESHEHUIZEREN_HUANJINGBAOH_URL
            },
            {
            	CN:"创新科技",
            	EN:"Technology Innovation",
            	INDEX:"chuangxinkeji",
            	URL:URL.ENTERPRISE_CREATE_URL
            },
            {
            	CN:"科技前沿",
            	EN:"Technology Frontier",
            	INDEX:"chuangxinkeji_qianyankeji",
            	URL:URL.ENTERPRISE_CREATE_KEJIQIANYAN_URL
            },
            {
            	CN:"boe创新",
            	EN:"BOE Innovation",
            	INDEX:"chuangxinkeji_boechuangxin",
            	URL:URL.ENTERPRISE_CREATE_BOECHUANGXIN_URL
            },
            {
            	CN:"个人与家用",
            	EN:"Personal & Home",
            	INDEX:"gerenyujiayong",
            	URL:URL.ENTERPRISE_PERSONAL_URL
            },
            {
            	CN:"产品与服务",
            	EN:"Commercial & Service",
            	INDEX:"shangyongyufuwu",
            	URL:URL.ENTERPRISE_BUSINESS_URL
            },
            {
            	CN:"新闻中心",
            	EN:"News Center",
            	INDEX:"xinwenzhongxin",
            	URL:URL.ENTERPRISE_NEWS_URL
            },
            {
            	CN:"视频报道",
            	EN:"Videos News",
            	URL:URL.ENTERPRISE_NEWS_SHIPINBAODAO_URL
            },
            {
            	CN:"投资者关系",
            	EN:"Investor Relations",
            	INDEX:"touzizheguanxi",
            	URL:URL.ENTERPRISE_INVEST_URL
            },
            {
            	CN:"加入我们",
            	EN:"Join Us",
            	INDEX:"jiaruwomen",
            	URL:URL.JOINUS_URL
            },
            {
            	CN:"BOE商城",
            	EN:"BOE store",
            	URL:URL.STORE_HOME_URL
            },
            {
            	CN:"联系我们",
            	EN:["Contact Us","Contact us"],
            	INDEX:"touzizheguanxi_lianxiwomen_lianxiwomenxiangxi",
            	URL:URL.CONTACTUS_URL
            },
            {
            	CN:"网站地图",
            	EN:"Site map",
            	URL:URL.SITE_MAP_URL
            },
            {
            	CN:"隐私条款",
            	URL:PROJ.STORE+"register/register!getPrivacy.html"
            },
           /* {
            	CN:"社区规则",
            	URL:PROJ.STORE+"register/register!getCommunity.html"
            },*/
            {
            	CN:"视频中心",
            	EN:["Videocenter","Videocenter"],
            	INDEX:"videocenter",
            	URL:URL.VIDEOCENTER_URL
            },
            {
            	CN:"BOE说",
            	EN:["boeTalk","boeTalk"],
            	INDEX:"boeTalk",
            	URL:URL.BOETALK_URL
            },
            {
            	CN:"除名查询",
            	URL:PROJ.STORE+"member/member_del_search.html"
            },
            {
            	CN:"营业执照",
            	URL:PROJ.STORE+"register/register!getBusiness.html"
            },
            {
            	CN:"服务",
            	URL:URL.SERVICE_HOME_URL
            },
            {
            	CN:"产品问答",
            	URL:URL.PRODUCT_LIST_URL
            },
            {
            	CN:"会员专享",
            	URL:URL.MEMBER_POWER_URL
            }
           ];

var NAVI = UTIL.getDictKV(DICT,["CN","EN"],"URL");
	
window.console=window.console||{log:function(){},info:function(){}};
console.log("VAR: VAR loaded");

var current = VAR.CURRENT();
if(current==='/cms-template/'){
	$.ajax({url: VAR.CURRENT() + "core/load.js",async:false,dataType:"script",cache:false});
}else{
	$.ajax({url: "/" + "core/load.js",async:false,dataType:"script",cache:false});
}

//$.ajax({url: VAR.CURRENT() + "core/load.js",async:false,dataType:"script",cache:false});
