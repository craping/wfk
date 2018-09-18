package wfk.protocol.http.core.validate.security.param;

import wfk.protocol.http.core.validate.ValidationAdapter;
import wfk.protocol.http.core.validate.support.param.IntegerParam;

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
public class EncryptFlagParam extends IntegerParam {
	
	public EncryptFlagParam() {
		this.value = "encrypt_flag";
		this.desc="密钥对标志";
		this.min = "0";
		this.max = String.valueOf(ValidationAdapter.keyPairList.size() - 1);
	}
}
