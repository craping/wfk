package wfk.protocol.http.server.util;

import java.io.File;
import java.net.URI;
import java.nio.charset.Charset;
import java.security.KeyManagementException;
import java.security.NoSuchAlgorithmException;
import java.util.List;
import java.util.zip.GZIPInputStream;

import javax.net.ssl.SSLContext;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;
import javax.security.cert.CertificateException;
import javax.security.cert.X509Certificate;

import org.apache.http.Header;
import org.apache.http.HttpHost;
import org.apache.http.HttpResponse;
import org.apache.http.HttpVersion;
import org.apache.http.NameValuePair;
import org.apache.http.client.CookieStore;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.params.CookiePolicy;
import org.apache.http.client.params.HttpClientParams;
import org.apache.http.client.utils.URIUtils;
import org.apache.http.conn.params.ConnRoutePNames;
import org.apache.http.conn.routing.HttpRoute;
import org.apache.http.conn.scheme.PlainSocketFactory;
import org.apache.http.conn.scheme.Scheme;
import org.apache.http.conn.scheme.SchemeRegistry;
import org.apache.http.conn.ssl.SSLSocketFactory;
import org.apache.http.cookie.Cookie;
import org.apache.http.entity.StringEntity;
import org.apache.http.entity.mime.FormBodyPart;
import org.apache.http.entity.mime.MultipartEntity;
import org.apache.http.entity.mime.content.FileBody;
import org.apache.http.entity.mime.content.InputStreamBody;
import org.apache.http.entity.mime.content.StringBody;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.impl.conn.tsccm.ThreadSafeClientConnManager;
import org.apache.http.params.CoreConnectionPNames;
import org.apache.http.params.CoreProtocolPNames;
import org.apache.http.params.HttpParams;
import org.apache.http.params.HttpProtocolParams;
import org.apache.http.params.SyncBasicHttpParams;
import org.apache.http.util.EntityUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import wfk.common.define.bean.ByteOutputStream;
import wfk.common.define.util.FileUtil;

/**
 * @since JDK 1.7
 * 
 * @author Crap
 * 
 * @version 1.4.3
 * 
 * @copyright 2013 - 2014 深圳亿码擎天科技有限公司 All rights reserved.
 * 
 * 自定义参数的Httpclient。<br>
 * 提供httpGet，httpPost两种传送消息的方式<br>
 * 提供httpPost上传文件的方式 
 */
@SuppressWarnings("deprecation")
public class HttpRequest {

    // 默认参数设置
	
    public static final int CON_TIME_OUT_MS = 50000;
    public static final int SO_TIME_OUT_MS = 20000;
    public static final int MAX_CONNECTIONS_PER_HOST = 20;
    public static final int MAX_TOTAL_CONNECTIONS = 200;
    
    private int conTimeOutMs;
    private int soTimeOutMs;
    public CookieStore cookieStore = null;
    
    // 日志输出
    private final Logger log = LogManager.getLogger(HttpRequest.class);
    
    private DefaultHttpClient httpClient;
    
    public HttpRequest() {
        this(MAX_CONNECTIONS_PER_HOST, MAX_TOTAL_CONNECTIONS, CON_TIME_OUT_MS, SO_TIME_OUT_MS,null,null);
    }
    
    public HttpRequest(HttpHost proxy) {
        this(MAX_CONNECTIONS_PER_HOST, MAX_TOTAL_CONNECTIONS, CON_TIME_OUT_MS, SO_TIME_OUT_MS,null,proxy);
    }
    /**
     * 个性化配置连接管理器
     * @param maxConnectionsPerHost 设置默认的连接到每个主机的最大连接数
     * @param maxTotalConnections 设置整个管理连接器的最大连接数
     * @param conTimeOutMs  连接超时
     * @param soTimeOutMs socket超时
     * @param routeCfgList 特殊路由配置列表，若无请填null
     * @param proxy 代理设置，若无请填null
     */
	public HttpRequest(int maxConnectionsPerHost, int maxTotalConnections, int conTimeOutMs, int soTimeOutMs, List<RouteCfg> routeCfgList, HttpHost proxy) {

        this.conTimeOutMs=conTimeOutMs;
        this.soTimeOutMs=soTimeOutMs;
        // 使用默认的 socket factories 注册 "http" & "https" protocol scheme
        SchemeRegistry supportedSchemes = new SchemeRegistry();
        supportedSchemes.register(new Scheme("http", 80, PlainSocketFactory.getSocketFactory()));
        
        /** 
		 * 避免HttpClient的”SSLPeerUnverifiedException: peer not authenticated”异常 
		 * 不用导入SSL证书 
		 * @author Crap 
		 * 2015-04-15 10:58
		 * 
		 */
		try{
			SSLContext ctx = SSLContext.getInstance("TLS");  
	        X509TrustManager tm = new X509TrustManager() {  
	            public java.security.cert.X509Certificate[] getAcceptedIssuers() {  
	                return null;  
	            }  
	            @SuppressWarnings("unused")
				public void checkClientTrusted(X509Certificate[] arg0, String arg1) throws CertificateException {}  
	            @SuppressWarnings("unused")
				public void checkServerTrusted(X509Certificate[] arg0, String arg1) throws CertificateException {}  
	            public void checkClientTrusted(java.security.cert.X509Certificate[] chain, String authType) throws java.security.cert.CertificateException {  
	                // TODO Auto-generated method stub
	            }  
	            public void checkServerTrusted(java.security.cert.X509Certificate[] chain, String authType) throws java.security.cert.CertificateException {  
	                // TODO Auto-generated method stub
	            }
	        };  
	        ctx.init(null, new TrustManager[] { tm }, null); 
	        SSLSocketFactory ssf = new SSLSocketFactory(ctx, SSLSocketFactory.ALLOW_ALL_HOSTNAME_VERIFIER);
	        supportedSchemes.register(new Scheme("https", 443, ssf));
			
		}catch (KeyManagementException e){
			log.error("Key[httpclient.schemeRegistry] error", e);
            e.printStackTrace();
		}catch(NoSuchAlgorithmException e) {  
			log.error("Key[httpclient.schemeRegistry] error", e);
            e.printStackTrace();
        }
        
        //supportedSchemes.register(new Scheme("https", 443, SSLSocketFactory.getSocketFactory()));
        ThreadSafeClientConnManager connectionManager = new ThreadSafeClientConnManager(supportedSchemes);

        // 参数设置
        HttpParams httpParams = new SyncBasicHttpParams();
        HttpProtocolParams.setVersion(httpParams, HttpVersion.HTTP_1_1);

        httpParams.setParameter(CoreConnectionPNames.CONNECTION_TIMEOUT, conTimeOutMs);
        httpParams.setParameter(CoreConnectionPNames.SO_TIMEOUT, soTimeOutMs);
        
        //设置cookie
  		HttpClientParams.setCookiePolicy(httpParams, CookiePolicy.BROWSER_COMPATIBILITY);
  		// 模拟浏览器，解决一些服务器程序只允许浏览器访问的问题
  		httpParams.setParameter(CoreProtocolPNames.USER_AGENT, "Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0)");
  		httpParams.setParameter(CoreProtocolPNames.HTTP_CONTENT_CHARSET, "UTF-8");
      		
        HttpProtocolParams.setUseExpectContinue(httpParams, false);

        connectionManager.setDefaultMaxPerRoute(maxConnectionsPerHost);
        connectionManager.setMaxTotal(maxTotalConnections);

        //HttpClientParams.setCookiePolicy(httpParams, CookiePolicy.IGNORE_COOKIES);
        
        // 对特定路由修改最大连接数 
        if(null!=routeCfgList){
            for(RouteCfg routeCfg:routeCfgList){
                HttpHost localhost = new HttpHost(routeCfg.getHost(), routeCfg.getPort());
                connectionManager.setMaxForRoute(new HttpRoute(localhost), routeCfg.getMaxConnetions());
            }
        }  
        
        httpClient = new DefaultHttpClient(connectionManager, httpParams);
        
        //设置代理
        if(null!=proxy){
            httpClient.getParams().setParameter(ConnRoutePNames.DEFAULT_PROXY, proxy);
        }
    }

    
    /**
     * Get方法传送消息（无压缩）
     * 
     * @param url  连接的URL
     * @param queryString  请求参数串
     * @return 服务器返回的信息
     * @throws Exception
     */
    public String simpleHttpGet(String url, String queryString) throws Exception {

        String responseData = null;
        if (queryString != null && !queryString.equals("")) {
            url += "?" + queryString;
        }
        log.info("HttpRequest simpleHttpGet [1] url = " + url);

        HttpGet httpGet = new HttpGet(url);
        httpGet.getParams().setParameter("http.socket.timeout", conTimeOutMs);

        HttpResponse response;
        response = httpClient.execute(httpGet);
        log.info("HttpRequest simpleHttpGet [2] StatusLine : " + response.getStatusLine());
        responseData=EntityUtils.toString(response.getEntity());
        httpGet.abort();
        log.info("HttpRequest simpleHttpGet [3] Response = " + responseData.toString());

        return responseData.toString();
    }
    
    /**
     * Get方法传送消息
     * 
     * @param url  连接的URL
     * @param queryString  请求参数串
     * @return 服务器返回的信息
     * @throws Exception
     */
    public String httpGZIPGet(String url, String queryString) throws Exception {
    	return httpGZIPGet(url, queryString, "utf-8");
    }
    
    /**
     * Get方法传送消息
     * 
     * @param url  连接的URL
     * @param queryString  请求参数串
     * @return 服务器返回的信息
     * @throws Exception
     */
    public String httpGet(String url, String queryString) throws Exception {
    	return httpGet(url, queryString, "utf-8");
    }
    
    /**
     * Get方法传送消息
     * 
     * @param url  连接的URL
     * @param queryString  请求参数串
     * @return 服务器返回的信息
     * @throws Exception
     */
    public ByteOutputStream httpGetEntity(String url, String queryString) throws Exception {
    	return httpGetEntity(url, queryString, "utf-8");
    }
    
    /**
     * Get方法传送消息
     * 
     * @param url  连接的URL
     * @param queryString  请求参数串
     * @param charSet 字符集
     * @return 服务器返回的信息
     * @throws Exception
     */
    public String httpGZIPGet(String url, String queryString, String charSet) throws Exception {

        StringBuilder responseData = new StringBuilder();
        if (queryString != null && !queryString.equals("")) {
            url += "?" + queryString;
        }
        log.info("HttpRequest httpGet [1] url = " + url);

        HttpGet httpGet = new HttpGet(url);
        httpGet.addHeader("Accept-Encoding", "gzip,deflate,sdch");
        httpGet.getParams().setParameter("http.socket.timeout", conTimeOutMs);

        HttpResponse response = httpClient.execute(httpGet);
        log.info("HttpRequest httpGet [2] StatusLine : " + response.getStatusLine());
        Header contentType = response.getFirstHeader("Content-Type");
        System.out.println(contentType.getValue());
        
        try {
            byte[] b=new byte[2048];
            GZIPInputStream gzin = new GZIPInputStream(response.getEntity().getContent());
            int length=0;
            while((length=gzin.read(b))!=-1){
                responseData.append(new String(b,0,length, charSet));
            }
            gzin.close();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            httpGet.abort();
        }
        log.info("HttpRequest httpGet [3] Response = " + responseData.toString());

        return responseData.toString();
    }
    
    /**
     * Get方法传送消息
     * 
     * @param url  连接的URL
     * @param queryString  请求参数串
     * @param charSet 字符集
     * @return 服务器返回的信息
     * @throws Exception
     */
    public String httpGet(String url, String queryString, String charSet) throws Exception {

        String responseData = null;
        if (queryString != null && !queryString.equals("")) {
            url += "?" + queryString;
        }
        log.info("HttpRequest httpGet [1] url = " + url);

        HttpGet httpGet = new HttpGet(url);
        httpGet.getParams().setParameter("http.socket.timeout", conTimeOutMs);

        HttpResponse response = httpClient.execute(httpGet);
        log.info("HttpRequest httpGet [2] StatusLine : " + response.getStatusLine());
        
        try {
        	responseData = EntityUtils.toString(response.getEntity(), charSet);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            httpGet.abort();
        }
        log.info("HttpRequest httpGet [3] Response = " + responseData);

        return responseData;
    }
    
    /**
     * Get方法传送消息
     * 
     * @param url  连接的URL
     * @param queryString  请求参数串
     * @param charSet 字符集
     * @return 服务器返回的信息
     * @throws Exception
     */
    public ByteOutputStream httpGetEntity(String url, String queryString, String charSet) throws Exception {

    	ByteOutputStream entity = null;
        if (queryString != null && !queryString.equals("")) {
            url += "?" + queryString;
        }
        log.info("HttpRequest httpGet [1] url = " + url);

        HttpGet httpGet = new HttpGet(url);
        httpGet.getParams().setParameter("http.socket.timeout", conTimeOutMs);

        HttpResponse response = httpClient.execute(httpGet);
        log.info("HttpRequest httpGet [2] StatusLine : " + response.getStatusLine());
        cookieStore = httpClient.getCookieStore();
        
        try {
        	entity = FileUtil.getByteOutputStream(response.getEntity().getContent());
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            httpGet.abort();
        }
        log.info("HttpRequest httpGet [3] Response = " + entity);

        return entity;
    }
    
    /**
     * Post方法传送消息
     * 
     * @param url  连接的URL
     * @param queryString 请求参数串
     * @return 服务器返回的信息
     * @throws Exception
     */
    public String httpGZIPPost(String url, String queryString) throws Exception {
    	return httpGZIPPost(url, queryString, "utf-8");
    }
    
    /**
     * Post方法传送消息
     * 
     * @param url  连接的URL
     * @param queryString 请求参数串
     * @return 服务器返回的信息
     * @throws Exception
     */
    public String httpPost(String url, String queryString) throws Exception {
    	return httpPost(url, queryString, "utf-8", false);
    }
    
    /**
     * Post方法传送消息
     * 
     * @param url  连接的URL
     * @param queryString 请求参数串
     * @return 服务器返回的信息
     * @throws Exception
     */
    public String httpPost(String url, String queryString, boolean cookie) throws Exception {
    	return httpPost(url, queryString, "utf-8", cookie);
    }
    /**
     * Post方法传送消息
     * 
     * @param url  连接的URL
     * @param queryString 请求参数串
     * @param charSet 字符集
     * @return 服务器返回的信息
     * @throws Exception
     */
    public String httpGZIPPost(String url, String queryString, String charSet) throws Exception {
        StringBuilder responseData = new StringBuilder();
        URI tmpUri = new URI(url);
        URI uri = URIUtils.createURI(tmpUri.getScheme(), tmpUri.getHost(), tmpUri.getPort(), tmpUri.getPath(),
                queryString, null);
        log.info("HttpRequest httpPost [1] url = " + uri.toURL());

        HttpPost httpPost = new HttpPost(uri);
        httpPost.addHeader("Accept-Encoding", "gzip,deflate,sdch");
        httpPost.getParams().setParameter("http.socket.timeout", conTimeOutMs);
        if (queryString != null && !queryString.equals("")) {
            StringEntity reqEntity = new StringEntity(queryString);
            // 设置类型
            //reqEntity.setContentType("application/x-www-form-urlencoded");
            // 设置请求的数据
            httpPost.setEntity(reqEntity);
        }
        HttpResponse response = httpClient.execute(httpPost);
        log.info("HttpRequest httpPost [2] StatusLine = " + response.getStatusLine());

        try {
            byte[] b=new byte[2048];
            GZIPInputStream gzin = new GZIPInputStream(response.getEntity().getContent());
            int length=0;
            while((length=gzin.read(b))!=-1){
                responseData.append(new String(b,0,length, charSet));
            }
            gzin.close();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            httpPost.abort();
        }
        log.info("HttpRequest httpPost [3] Response = " + responseData.toString());
        return responseData.toString();
    }

    /**
     * Post方法传送消息
     * 
     * @param url  连接的URL
     * @param queryString 请求参数串
     * @param charSet 字符集
     * @return 服务器返回的信息
     * @throws Exception
     */
    public String httpPost(String url, String queryString, String charSet, boolean saveCookie) throws Exception {
        String responseData = null;
        URI tmpUri = new URI(url);
        //URI uri = URIUtils.createURI(tmpUri.getScheme(), tmpUri.getHost(), tmpUri.getPort(), tmpUri.getPath(), queryString, null);
        log.info("HttpRequest httpPost [1] url = " + tmpUri.toURL());
        
        
       
        HttpPost httpPost = new HttpPost(tmpUri);
        if(cookieStore != null){
	        List<Cookie> cookies = cookieStore.getCookies();
	        StringBuffer cookieHeader = new StringBuffer();
	        for (int i = 1; i < cookies.size(); i++) {
	        	Cookie cookie = cookies.get(i);
	        	cookieHeader.append(cookie.getName()).append("=").append(cookie.getValue()).append(";");
			}
	        httpPost.setHeader("Cookie", cookieHeader.toString());
        }
        httpPost.getParams().setParameter("http.socket.timeout", conTimeOutMs);
        if (queryString != null && !queryString.equals("")) {
            StringEntity reqEntity = new StringEntity(queryString, charSet);
            // 设置类型
            //reqEntity.setContentType("application/x-www-form-urlencoded");
            // 设置请求的数据
            httpPost.setEntity(reqEntity);
        }
        
        HttpResponse response = httpClient.execute(httpPost);
        if(saveCookie)
        	cookieStore = httpClient.getCookieStore();
        log.info("HttpRequest httpPost [2] StatusLine = " + response.getStatusLine());

        try {
        	responseData = EntityUtils.toString(response.getEntity(), charSet);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            httpPost.abort();
        }
        log.info("HttpRequest httpPost [3] Response = " + responseData);
        return responseData;
    }
    
    /**
     * Post方法传送消息
     * 
     * @param url  连接的URL
     * @param queryString 请求参数串
     * @return 服务器返回的信息
     * @throws Exception
     */
    public String httpPostWithFile(String url, String queryString, List<NameStreamPair> inputs) throws Exception {

        String responseData = null;

        URI tmpUri = new URI(url);
        URI uri = URIUtils.createURI(tmpUri.getScheme(), tmpUri.getHost(), tmpUri.getPort(), tmpUri.getPath(),
                queryString, null);
        System.out.println("HttpRequest httpPostWithFile [1]  uri = " + uri.toURL());
        MultipartEntity mpEntity = new MultipartEntity();
        HttpPost httpPost = new HttpPost(uri);
        httpPost.addHeader("Accept-Encoding", "gzip,deflate,sdch");
        StringBody stringBody;
        InputStreamBody inputBody;
        FormBodyPart fbp;

        List<NameValuePair> queryParamList = HttpStrOperate.getQueryParamsList(queryString);
        for (NameValuePair queryParam : queryParamList) {
            stringBody = new StringBody(queryParam.getValue(), Charset.forName("UTF-8"));
            fbp = new FormBodyPart(queryParam.getName(), stringBody);
            mpEntity.addPart(fbp);
            // System.out.println("------- "+queryParam.getName()+" = "+queryParam.getValue());
        }
        
        
        if(inputs != null){
        	for (int i = 0; i < inputs.size(); i++) {
        		NameStreamPair pair = inputs.get(i);
        		inputBody = new InputStreamBody(pair.getInputStream(), pair.getMimeType(), pair.getName());
        		fbp = new FormBodyPart("file"+i, inputBody);
	            mpEntity.addPart(fbp);
    		}
        }
        // System.out.println("---------- Entity Content Type = "+mpEntity.getContentType());

        httpPost.setEntity(mpEntity);
        HttpResponse response = httpClient.execute(httpPost);
        
        System.out.println("HttpRequest httpPost [2] StatusLine = " + response.getStatusLine());

        try {
        	responseData = EntityUtils.toString(response.getEntity(), "utf-8");
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            httpPost.abort();
        }
        //System.out.println("HttpRequest httpPost [3] Response = " + responseData);
        return responseData;
    }

    /**
     * Post方法传送消息
     * 
     * @param url  连接的URL
     * @param queryString 请求参数串
     * @return 服务器返回的信息
     * @throws Exception
     */
    public String httpGZIPPostWithFile(String url, String queryString, List<NameValuePair> files) throws Exception {

        StringBuilder responseData = new StringBuilder();

        URI tmpUri = new URI(url);
        URI uri = URIUtils.createURI(tmpUri.getScheme(), tmpUri.getHost(), tmpUri.getPort(), tmpUri.getPath(),
                queryString, null);
        System.out.println("HttpRequest httpPostWithFile [1]  uri = " + uri.toURL());
        MultipartEntity mpEntity = new MultipartEntity();
        HttpPost httpPost = new HttpPost(uri);
        httpPost.addHeader("Accept-Encoding", "gzip,deflate,sdch");
        StringBody stringBody;
        FileBody fileBody;
        File targetFile;
        String filePath;
        FormBodyPart fbp;

        List<NameValuePair> queryParamList = HttpStrOperate.getQueryParamsList(queryString);
        for (NameValuePair queryParam : queryParamList) {
            stringBody = new StringBody(queryParam.getValue(), Charset.forName("UTF-8"));
            fbp = new FormBodyPart(queryParam.getName(), stringBody);
            mpEntity.addPart(fbp);
            // System.out.println("------- "+queryParam.getName()+" = "+queryParam.getValue());
        }
        
        if(files != null){
	        for (NameValuePair param : files) {
	            filePath = param.getValue();
	            targetFile = new File(filePath);
	            System.out.println("---------- File Path = " + filePath + "\n---------------- MIME Types = "
	                    + HttpRequestUtil.getContentType(targetFile));
	            fileBody = new FileBody(targetFile, HttpRequestUtil.getContentType(targetFile), "UTF-8");
	            fbp = new FormBodyPart(param.getName(), fileBody);
	            mpEntity.addPart(fbp);
	
	        }
        }
        // System.out.println("---------- Entity Content Type = "+mpEntity.getContentType());

        httpPost.setEntity(mpEntity);
        HttpResponse response = httpClient.execute(httpPost);
        System.out.println("HttpRequest httpPostWithFile [2] StatusLine = " + response.getStatusLine());

        try {
            byte[] b=new byte[2048];
            GZIPInputStream gzin = new GZIPInputStream(response.getEntity().getContent());
            int length=0;
            while((length=gzin.read(b))!=-1){
                responseData.append(new String(b,0,length));
            }
            gzin.close();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            httpPost.abort();
        }
        
        //System.out.println("HttpRequest httpPostWithFile [3] Response = " + responseData.toString());
        return responseData.toString();
    }

    /**
     * 断开HttpRequest的连接
     */
    public void shutdownConnection() {
        try {
            httpClient.getConnectionManager().shutdown();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    
    public int getConTimeOutMs() {
        return conTimeOutMs;
    }

    public void setConTimeOutMs(int conTimeOutMs) {
        this.conTimeOutMs = conTimeOutMs;
    }

    public int getSoTimeOutMs() {
        return soTimeOutMs;
    }

    public void setSoTimeOutMs(int soTimeOutMs) {
        this.soTimeOutMs = soTimeOutMs;
    }

	public HttpClient getHttpClient() {
		return httpClient;
	}

	public void setHttpClient(DefaultHttpClient httpClient) {
		this.httpClient = httpClient;
	}
}
