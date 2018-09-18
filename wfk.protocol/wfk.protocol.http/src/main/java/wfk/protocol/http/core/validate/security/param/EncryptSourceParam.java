package wfk.protocol.http.core.validate.security.param;

import wfk.protocol.http.core.validate.support.param.StringParam;

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
public class EncryptSourceParam extends StringParam {
	
	public EncryptSourceParam() {
		this.value = "encrypt_source";
		this.desc="加密源";
		this.enums = new String[]{"java","javascript","android"};
	}
	
}
