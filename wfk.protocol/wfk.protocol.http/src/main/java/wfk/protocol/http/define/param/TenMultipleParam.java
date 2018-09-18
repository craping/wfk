package wfk.protocol.http.define.param;

import javax.servlet.http.HttpServletRequest;

import wfk.common.define.bean.result.Errcode;
import wfk.common.define.error.support.Errors;
import wfk.protocol.http.core.validate.exception.ParamFormatException;
import wfk.protocol.http.core.validate.exception.ValidationException;
import wfk.protocol.http.core.validate.support.param.IntegerParam;


public class TenMultipleParam extends IntegerParam {
	
	@Override
	protected Errcode validateValue(HttpServletRequest request, String paramString) throws ValidationException {
		super.validateValue(request, paramString);
		int value = Integer.parseInt(paramString);
		if(value%10 != 0)
			throw new ParamFormatException(this);
		
		return Errors.OK;
	}
}
