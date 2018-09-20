//一级导航列表
 var fixedList = [];
// setTimeout(function(){
//	 
// },100);
 
// var path = "";
// if(!window.PUBLIC){
// 	path = "";
// }

 $("#header").load("_template/header.html",function(){
     $("#clear-nav").css("height",$(".parent-fixed").height() +"px");

     var obj2 = [
         {
             text:"新闻中心",
             href:"javascript:trackFn('header-boeNews','/news/')",
        	 menu:[
                   {
                     text:"公司动态",
                     href:"/news/gsdt/"
                   },
                   {
                     text:"媒体视角",
                     href:"/news/mtsj/"
                   }
                 ]

         },

         //PC端地址
         {
             text:"BOE商城",
             href:"javascript:trackFn('header-mall','http://www.boemall.cn/store/mall.html')"
         },

         //手机端地址
         {
             text:"BOE商城",
             href:"javascript:trackFn('header-mall-xs','https://m.boe.com/mobileStore/index.html#!mall/%257B%257D')"
         }
     ];


     var listArr = [
         {
             text:"产品与服务",
             href:"javascript:trackFn('header-product','javascript:void(0);')",
             //二级
             menu:[
                 {
                     text:"显示和传感器件",
                     href:"javascript:trackFn('header-device','/product/xsqj/')",

                     //三级
                     menu:[
                         {
                             text:"TFT-LCD",
                             href:"javascript:trackFn('header-tft','/product/xsqj/?0')",
                             //四级
                             menu:[
                                 {
                                     text:"移动类显示产品",
                                     href:"javascript:trackFn('header-mobil','/product/xsqj/tft-lcd/yd/')"
                                 },
                                 {
                                     text:"IT类显示产品",
                                     href:"javascript:trackFn('header-it','/product/xsqj/tft-lcd/it/')"
                                 },
                                 {
                                     text:"电视产品",
                                     href:"javascript:trackFn('header-tv1','/product/xsqj/tft-lcd/tv/')"
                                 },
                                 {
                                     text:"商用显示产品",
                                     href:"javascript:trackFn('header-commercial1','/product/xsqj/tft-lcd/sy/')"
                                 },
                                 {
                                     text:"新应用显示产品",
                                     href:"javascript:trackFn('header-newApplication','/product/xsqj/tft-lcd/xyy/')"
                                 }
                             ]
                         },
                         {
                             text:"AMOLED",
                             href:"javascript:trackFn('header-amoled','/product/xsqj/?1')",
                             //四级
                             menu:[

                                 {
                                     text:"手机产品",
                                     href:"javascript:trackFn('header-mobilePhone','/product/xsqj/amoled/sjcp/')"
                                 },
                                 {
                                     text:"电视产品",
                                     href:"javascript:trackFn('header-tv2','/product/xsqj/amoled/tv/')"
                                 }
                                 //,
                                 //{
                                 //    //text:"穿戴产品",
                                 //    //href:"javascript:trackFn('header-wear','http://www.boe.com')"
                                 //}
                             ]
                         },
                         {
                             text:"微显示",
                             href:"javascript:trackFn('header-film','/product/xsqj/?2')",
                             menu:[
                                 {
                                     text:"VR/AR",
                                     href:"javascript:trackFn('header-vrar','/product/xsqj/xnxs/vr-ar/')"
                                 }
                             ]

                         },
                         {
                             text:"传感器",
                             href:"javascript:trackFn('header-virtual','/product/xsqj/?3')",
                             //四级
                             menu:[
                                 {
                                     text:"光传感器",
                                     href:"javascript:trackFn('header-xray','/product/xsqj/cgq/x-ray/')"
                                 },
                                 {
                                     text:"指纹识别",
                                     href:"javascript:trackFn('header-fingerprint','/product/xsqj/cgq/zwcgq/')"
                                 }
                             ]
                         }
                     ]
                 },
                 {
                     text:"智慧系统",
                     href:"javascript:trackFn('header-wisdom','/product/zhxt/')",

                     //三级


                     menu:[
                         {
                             text:"智慧零售",
                             href:"javascript:trackFn('header-wisdomRetail','/product/zhxt/?0')",
                             //四级
                             menu:[
                                 {
                                     text:"艺术零售解决方案-BOE画屏",
                                     href:"javascript:trackFn('header-igallery','/product/zhxt/zhls/iGallery/')"
                                 },
                                 {
                                     text:"商超零售解决方案",
                                     href:"javascript:trackFn('header-businessInformation','/product/zhxt/zhls/sc/')"
                                 },
                                 {
                                     text:"金融零售解决方案",
                                     href:"javascript:trackFn('header-financialInformation','/product/zhxt/zhls/jr/')"
                                 },
                                 {
                                     text:"智慧显示解决方案",
                                     href:"javascript:trackFn('header-commercial2','/product/zhxt/zhls/zhxs/')"
                                 }
                             ]
                         },
                         {
                             text:"智造服务",
                             href:"javascript:trackFn('header-intelligent','/product/zhxt/?1')",
                             /*//四级
                             menu:[
                                 {
                                     text:"家用显示产品",
                                     href:"javascript:trackFn('header-home','/product/zhxt/znzz/jy/ppzzj.html')"
                                 },
                                 {
                                     text:"商用类电子产品",
                                     href:"javascript:trackFn('header-commercialElectronics','/product/zhxt/znzz/sy/ppzzs.html')"
                                 },
                                 {
                                     text:"个人消费类电子产品",
                                     href:"javascript:trackFn('header-personal','/product/zhxt/znzz/gr/ppzzg.html')"
                                 }
                             ]*/
                         },
                         {
                             text:"智慧能源",
                             href:"javascript:trackFn('header-energy','/product/zhxt/?2')",
                             //四级
                            /* menu:[
                                 {
                                     text:"创能",
                                     href:"javascript:trackFn('header-conversion','/product/zhxt/zhny/cn/ppzzc.html')"
                                 },
                                 {
                                     text:"用能",
                                     href:"javascript:trackFn('header-storageTransaction','/product/zhxt/zhny/yn/ppzzy.html')"
                                 },
                                 {
                                     text:"植物工厂",
                                     href:"javascript:trackFn('header-newAgriculture','/product/zhxt/zhny/lsgc/ppzzl.html')"
                                 }
                             ]*/
                         },
                         {
                             text:"智慧车联",
                             href:"javascript:trackFn('header-cheUnion','/product/zhxt/?3')",
                        	/* menu:[
                                   {
                                       text:"车载显示核心器件",
                                       href:"javascript:trackFn('wisdom_device','/product/zhxt/zhcl/czxs/ppzzc.html')"
                                   },
                                   {
                                       text:"车载整机/系统方案",
                                       href:"javascript:trackFn('wisdom_machine','/product/zhxt/zhcl/czzj/ppzzc.html')"
                                   }
                               ] 	 */
                         }
                     ]
                 },
                 {
                     text:"健康服务",
                     href:"javascript:trackFn('header-health','/product/jkfw/')",

                     //三级
                     menu:[
                         {
                             text:"移动健康",
                             href:"javascript:trackFn('header-mobileHealth','/product/jkfw/?0')",
                             //四级
                             /*menu:[
                                 {
                                     text:"BOE无创血液监测",
                                     href:"javascript:trackFn('header-blood','/product/jkfw/ydjk/wcxy/')"
                                 },
                                 {
                                     text:"BOE无创血糖监测",
                                     href:"javascript:trackFn('header-bloodSugar','/product/jkfw/ydjk/wcxt/')"
                                 }
                             ]*/

                         },
                         {
                             text:"数字医院",
                             href:"javascript:trackFn('header-O2O','/product/jkfw/?1')",
                             //四级
                             menu:[
                                 {
                                     text:"北京明德医院",
                                     href:"javascript:trackFn('header-bj','/product/jkfw/ooyl/mdyy/')"
                                 },
                                 {
                                     text:"合肥京东方医院",
                                     href:"javascript:trackFn('header-hf','/product/jkfw/ooyl/jdfyy/')"
                                 }
                             ]

                         },
                         {
                             text:"再生医学",
                             href:"javascript:trackFn('header-regeneration','/product/jkfw/?2')"
                             //四级
                             //menu:[
                             //    //{
                             //    //    text:"细胞工程实验室",
                             //    //    href:"javascript:trackFn('header-cellEngineering','http://www.boe.com')"
                             //    //},
                             //    //{
                             //    //    text:"细胞制备中心",
                             //    //    href:"javascript:trackFn('header-CellPreparation','http://www.boe.com')"
                             //    //}
                             //]

                         },
                         {
                             text:"健康园区",
                             href:"javascript:trackFn('header-healthPark','/product/jkfw/?3')",
                             //四级
                             menu:[
                                 {
                                     text:"京东方恒通国际商务园",
                                     href:"javascript:trackFn('header-industry','/product/jkfw/jkyq/htsw/')"
                                 },
                                 {
                                     text:"京东方恒通国际创新园",
                                     href:"javascript:trackFn('header-business','/product/jkfw/jkyq/htcx/')"
                                 },
                                 {
                                     text:"京东方合肥恒通国际未来城",
                                     href:"javascript:trackFn('header-assets','/product/jkfw/jkyq/hfht/')"
                                 }
                                 /*,
                                 {
                                     text:"天津恒通企业港",
                                     href:"javascript:trackFn('header-property','/product/jkfw/jkyq/tjht/ppjjt.html ')"
                                 }*/
                             ]

                         }
                     ]
                 }

             ]
         },
         {
             text:"创新科技",
             href:"javascript:trackFn('header-innovate','/cxkj/')",
             menu:[
                 {
                     text:"BOE创新",
                     href:"javascript:trackFn('header-innovate_boeInnovate','/cxkj/boecx/')"
                 },
                 {
                     text:"科技知乎",
                     href:"javascript:trackFn('header-innovate_know','/cxkj/kjzh/')"
                 },
                 {
                     text:"创想空间",
                     href:"javascript:trackFn('header-innovate_creative','/cxkj/cxkj/')"
                 }
             ]
         }
     ];
     //导航右上脚列表   BOE创新
     var navBar = [
         {
             text:"关于我们",
             href:"javascript:trackFn('header-about','/about/')",
             menu:[
                   {
                     text:"公司介绍",
                     href:"/about/gsjs/"
                   },
                   {
                     text:"管理团队",
                     href:"/about/gltd/"
                   },
                   {
                     text:"企业荣誉",
                     href:"/about/qyry/"
                   },
                   {
                     text:"社会责任",
                     href:"/about/shzr/"
                   },
                   {
                     text:"BOE全球",
                     href:"/about/boeqq/"
                   }
                 ]
         },
         {
             text:"投资者关系",
             href:"javascript:trackFn('header-investor','/tzzgx/')",
             menu:[
                   {
                     text:"股票信息",
                     href:"/tzzgx/gpxx/"
                   },
                   {
                     text:"公司公告",
                     href:"/tzzgx/gsgg/"
                   },
                   {
                     text:"财务信息",
                     href:"/tzzgx/cwxx/"
                   },
                   {
                     text:"公司治理",
                     href:"/tzzgx/gszl/"
                   },
                   {
                     text:"投资者服务",
                     href:"/tzzgx/tzzfw/"
                   }
                 ]
         },
         {
             text:"加入我们",
             href:"javascript:trackFn('header-join','/join/')",
             menu:[
                   {
                     text:"校园招聘",
                     href:"/join/xyzp/"
                   },
                   {
                     text:"社会招聘",
                     href:"/join/shzp/"
                   },
                   {
                     text:"海外招聘",
                     href:"/join/hwzp/"
                   },
                   {
                     text:"员工成长",
                     href:"/join/ygcz/"
                   },
                   {
                     text:"员工福利",
                     href:"/join/ygfl/"
                   }
                 ]
         },
         {
             text:"多媒体中心",
             href:"javascript:trackFn('header-multimedia','/dmtzx/')",
             menu:[
                   {
                     text:"公司视频",
                     href:"/dmtzx/gssp/"
                   },
                   {
                     text:"BOE说",
                     href:"/dmtzx/boeshuo/"
                   }
                 ]
         }
     ];

     //var obj2vm = new Vue({
     //    el:".nav-list1",
     //    data:{
     //        list:obj2
     //    }
     //})

     //768以上导航
     var vm = new Vue({
         el:".list-navbar",
         data:{
             todos:listArr,
             list:obj2
         }
     });

     //手机端
     var xsVm = new Vue({
         el:".list-navbar2",
         data:{
             todos:listArr,
             todoss:obj2,
             list:navBar
         }
     })
     //导航右上角
     var lgVm = new Vue({
         el:".vue-navBar-right",
         data:{
             todos:navBar
         }
     });


     //    关于BOE商城两套地址 PC
     var urlObj = $(".header-nav-last");
     urlObj.eq(2).addClass("hidden-lg hidden-md hidden-sm");

     //   mobile
     var xsUrlObj = $(".xs-mall");
     xsUrlObj.eq(1).addClass("hidden-sm hidden-xs");


 // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^    索顶导航    ^^^^^^^^^^

     fixedList.push(listArr[0].menu);//三个一级页

 });


