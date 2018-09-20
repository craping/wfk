/**
 * Created by chenzha on 2017/5/11.
 */

 setTimeout(function(){
	 var path = "";
	 if(!window.PUBLIC){
	 	path = "";
	 }
	 $("#footer").load("_template/footer.html",function(){


	         var footerArr1 = [
	             {	 
	            	 maxTitle:"产品与服务",
	                 m_href:"javascript:void(0);",
	                 title:"显示和传感器件",
	                 href:"javascript:trackFn('footer-display','/product/xsqj/')",
	                 text:[
	                     {
	                         text:"智慧系统",
	                         href:"javascript:trackFn('footer-wisdom','/product/zhxt/')"
	                     },
	                     {
	                         text:"健康服务",
	                         href:"javascript:trackFn('footer-health','/product/jkfw/')"
	                     }
	                 ]
	             },
	             {	 
	            	 maxTitle:"创新科技",
	                 m_href:"javascript:trackFn('footer-Innovation','/cxkj/')",
	                 title:"BOE创新",
	                 href:"javascript:trackFn('footer-Innovation','/cxkj/boecx/')",
	                 text:[
	                     {
	                         text:"科技知乎",
	                         href:"javascript:trackFn('footer-known','/cxkj/kjzh/')"
	                     },
	                     {
	                         text:"创想空间",
	                         href:"javascript:trackFn('footer-creative','/cxkj/cxkj/')"
	                     }
	                 ]
	             }

	         ];
	         var footerArr2 = [
               {	   
	            	   maxTitle:"关于我们",
	                   m_href:"javascript:trackFn('footer-on','/about/')",
                       title:"关于BOE",
                       href:"javascript:trackFn('footer-on','/about/')",
                       text:[
                            {
                               text:"投资者关系",
                               href:"javascript:trackFn('footer-investor','/tzzgx/')"
                            },
                            {
                               text:"企业社会责任",
                               href:"javascript:trackFn('footer-society','/about/shzr/')"
                            }
                       ]
                  	},
                   {
                       maxTitle:"新闻中心",
                       m_href:"javascript:trackFn('footer-investor','/news/')",
                   },
                   {
                       maxTitle:"BOE说",
                       m_href:"javascript:trackFn('footer-society','/dmtzx/boeshuo/')",
                       newsData:[
	                       	{
		                      title:"新闻中心",
		                      href:"javascript:trackFn('footer-investor','/news/')",
		                      text:[
		                          {
		                              text:"BOE说",
		                              href:"javascript:trackFn('footer-society','/dmtzx/boeshuo/')"
		                          }
		                      ]
		                  }
                       ]
                   }
               ];
	         // footer
	         var footerVm1 = new Vue({
	             el:".footerList1",
	             data:{
	                 todos:footerArr1,
	                 todoss:footerArr2
	             }
	         })
	         var footerVm2 = new Vue({
	             el:".footerList1",
	             data:{
	                 todos:footerArr2
	             }
	         });
	 });
	 
 },100);
 
