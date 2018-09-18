package wfk.protocol.http.core.validate.support.param;

import javax.servlet.http.HttpServletRequest;

import wfk.common.define.bean.result.Errcode;
import wfk.common.define.error.support.Errors;
import wfk.protocol.http.core.validate.exception.ParamFormatException;
import wfk.protocol.http.core.validate.exception.ValidationException;

/** 
 * @project Crap
 * 
 * @author Crap
 * 
 * @Copyright 2013 - 2014 All rights reserved. 
 * 
 * @email 422655094@qq.com
 * 
 *	正则参数
 *	继承该类,将验证 {@link #regex} 
 */
public class RegExpParam extends StringParam {
	
	protected String regex;
	
	@Override
	protected Errcode validateValue(HttpServletRequest request, String paramString) throws ValidationException {
		if(!paramString.matches(regex))
			throw new ParamFormatException(this);
		return Errors.OK;
	}

	public String getRegex() {
		return regex;
	}

	public void setRegex(String regex) {
		this.regex = regex;
	};
}
