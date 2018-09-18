package wfk.protocol.http.define.param;

import javax.servlet.http.HttpServletRequest;

import wfk.common.define.bean.result.Errcode;
import wfk.common.define.error.support.Errors;
import wfk.protocol.http.core.validate.exception.ValidationException;
import wfk.protocol.http.core.validate.support.AbstractParam;

public class AuthKeyParam extends AbstractParam {
	
	public AuthKeyParam() {
		this.value = "auth_key";
	}
	
	@Override
	protected Errcode validateValue(HttpServletRequest request, String paramString) throws ValidationException {
		
		return Errors.OK;
	}

	@Override
	protected boolean validateMin(String paramString) {
		return true;
	}

	@Override
	protected boolean validateMax(String paramString) {
		return true;
	}
	
	@Override
	protected void checkMinLegitimate(String mapping) throws ValidationException {
	};
	
	@Override
	protected void checkMaxLegitimate(String mapping) throws ValidationException {	
		
	};
	
}
