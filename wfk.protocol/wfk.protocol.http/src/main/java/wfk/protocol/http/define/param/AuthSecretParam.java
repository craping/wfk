package wfk.protocol.http.define.param;

import javax.servlet.http.HttpServletRequest;

import wfk.common.define.bean.result.Errcode;
import wfk.common.define.error.support.Errors;
import wfk.protocol.http.core.validate.exception.ValidationException;
import wfk.protocol.http.core.validate.support.AbstractParam;

public class AuthSecretParam extends AbstractParam {
	
	public AuthSecretParam() {
		this.value = "auth_secret";
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
