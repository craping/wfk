package wfk.protocol.http.core.validate.support.param;

import javax.servlet.http.HttpServletRequest;

import wfk.common.define.bean.result.Errcode;
import wfk.common.define.error.support.Errors;
import wfk.common.define.util.StringUtil;
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
 *	时间参数
 *	继承该类,将按照 {@link #format} 格式化验证参数
 */
public class TimeParam extends StringParam {
	
	protected String format;
	
	@Override
	protected Errcode validateValue(HttpServletRequest request, String paramString) throws ValidationException {
		if(!StringUtil.isDate(paramString, format))
			throw new ParamFormatException(this);
		return Errors.OK;
	}

	public String getFormat() {
		return format;
	}

	public void setFormat(String format) {
		this.format = format;
	}
}
