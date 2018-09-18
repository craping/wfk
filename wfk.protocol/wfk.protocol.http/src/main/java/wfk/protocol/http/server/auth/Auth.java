package wfk.protocol.http.server.auth;

import java.io.Serializable;

/**
 * Auth鉴权信息
 */
public class Auth implements Serializable{

    private static final long serialVersionUID = -6939447877705891817L;
    
    private String clientId=null;		//用户标志ID
    private String clientIp=null;		//请求IP
    private String appFrom=null;		//应用来源
    private String scope = "all"; 		//授权范围
    private String redirectUri = "null";//授权回调地址
    private String authKey = "";		//申请应用时分配的app_key
    private String authSecret="";		//申请应用时分配到的app_secret
    private String authorizeCode= null;	//用来换取accessToken的授权码
    private int status = 0;				//认证状态,0:成功,1:获取Request失败 2:获取授权码失败, 3:获取Access失败
    
	
	public String getClientId() {
		return clientId;
	}
	public void setClientId(String clientId) {
		this.clientId = clientId;
	}
	public String getClientIp() {
		return clientIp;
	}
	public void setClientIp(String clientIp) {
		this.clientIp = clientIp;
	}
	public String getAppFrom() {
		return appFrom;
	}
	public void setAppFrom(String appFrom) {
		this.appFrom = appFrom;
	}
	public String getScope() {
		return scope;
	}
	public void setScope(String scope) {
		this.scope = scope;
	}
	public String getRedirectUri() {
		return redirectUri;
	}
	public void setRedirectUri(String redirectUri) {
		this.redirectUri = redirectUri;
	}
	public String getAuthKey() {
		return authKey;
	}
	public void setAuthKey(String authKey) {
		this.authKey = authKey;
	}
	public String getAuthSecret() {
		return authSecret;
	}
	public void setAuthSecret(String authSecret) {
		this.authSecret = authSecret;
	}
	public String getAuthorizeCode() {
		return authorizeCode;
	}
	public void setAuthorizeCode(String authorizeCode) {
		this.authorizeCode = authorizeCode;
	}
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
    
    

}
