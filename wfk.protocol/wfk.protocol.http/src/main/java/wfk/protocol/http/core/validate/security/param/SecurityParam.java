package wfk.protocol.http.core.validate.security.param;

import wfk.protocol.http.core.validate.support.AbstractParam;
import wfk.protocol.http.core.validate.support.param.MultiParam;

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
public class SecurityParam extends MultiParam {
	
	public SecurityParam() {
		this.params = new AbstractParam[]{new EncryptDataParam(), new EncryptSourceParam(), new EncryptFlagParam()};
	}
	
}
