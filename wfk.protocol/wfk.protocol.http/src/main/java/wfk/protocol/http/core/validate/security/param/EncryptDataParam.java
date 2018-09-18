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
public class EncryptDataParam extends StringParam {
	
	public EncryptDataParam() {
		this.value = "encrypt_data";
		this.desc="加密数据";
	}
	
}
