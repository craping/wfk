package wfk.protocol.http.core.validate.support.param;

import javax.servlet.http.HttpServletRequest;

import wfk.common.define.bean.result.Errcode;
import wfk.common.define.error.support.Errors;
import wfk.common.define.util.StringUtil;
import wfk.protocol.http.core.validate.exception.ParamIllegalRangeException;
import wfk.protocol.http.core.validate.exception.ValidationException;
import wfk.protocol.http.core.validate.support.AbstractParam;

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
public class StringParam extends AbstractParam {
	
	@Override
	protected Errcode validateValue(HttpServletRequest request, String paramString) throws ValidationException {
		return Errors.OK;
	}

	@Override
	protected boolean validateMin(String paramString) {
		if(this.min == null)
			return true;
		
		return paramString.length() >= Integer.parseInt(this.min);
	}

	@Override
	protected boolean validateMax(String paramString) {
		if(this.max == null)
			return true;
		
		return paramString.length() <= Integer.parseInt(this.max);
	}
	
	@Override
	protected void checkMinLegitimate(String mapping) throws ValidationException {
		if(this.min != null && !StringUtil.isInteger(this.min))
			throw new ParamIllegalRangeException(String.format("[%s] param [%s] min:[%s] attribute is not legitimate", mapping.replace("$", "."), this.value, this.min));
	};
	
	@Override
	protected void checkMaxLegitimate(String mapping) throws ValidationException {	
		if(this.max != null && !StringUtil.isInteger(this.max))
			throw new ParamIllegalRangeException(String.format("[%s] param [%s] max:[%s] attribute is not legitimate", mapping.replace("$", "."), this.value, this.max));
	}

}
