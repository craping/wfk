package wfk.protocol.http.core.validate.support;

/** 
 * @project Crap
 * 
 * @author Crap
 * 
 * @Copyright 2013 - 2014 All rights reserved. 
 * 
 * @email 422655094@qq.com
 * 
 */
public class ServiceMethodWrap {
	
	private String value;
	
	private AbstractParam [] params;
	
	private boolean security;
	
	private AbstractParam [] securityParams;
	
	private String desc;
	
	public String getValue() {
		return value;
	}
	public void setValue(String value) {
		this.value = value;
	}
	public AbstractParam[] getParams() {
		return params;
	}
	public void setParams(AbstractParam[] params) {
		this.params = params;
	}
	public boolean isSecurity() {
		return security;
	}
	public void setSecurity(boolean security) {
		this.security = security;
	}
	public String getDesc() {
		return desc;
	}
	public void setDesc(String desc) {
		this.desc = desc;
	}
	public AbstractParam[] getSecurityParams() {
		return securityParams;
	}
	public void setSecurityParams(AbstractParam[] securityParams) {
		this.securityParams = securityParams;
	}
	
	
}
