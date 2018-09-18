package wfk.protocol.http.define.param;

import javax.servlet.http.HttpServletRequest;

import wfk.common.define.bean.result.Errcode;
import wfk.common.define.error.support.Errors;
import wfk.protocol.http.core.validate.exception.ValidationException;
import wfk.protocol.http.core.validate.support.param.StringParam;
import wfk.protocol.http.define.error.CustomErrors;
import wfk.protocol.http.server.service.SystemService;
import com.octo.captcha.service.CaptchaServiceException;

public class CodeParam extends StringParam {
	public CodeParam() {
		this.desc="验证码";
		this.required = true;
	}
	
	@Override
	public boolean checkRequired(String param) {
		return true;
	}

	@Override
	protected Errcode validateValue(HttpServletRequest request, String paramString) throws ValidationException {
		if (request.getSession(false) == null)
			return Errors.PARAM_FORMAT_ERROR;

		boolean validated = false;
		try {
			validated = SystemService.captchaService.validateResponseForID(request.getSession().getId(), paramString.toLowerCase()).booleanValue();
		} catch (CaptchaServiceException e) {
			e.printStackTrace();
		}
		if(!validated)
			return CustomErrors.SYS_ERROR_ODE;
		
		return Errors.OK;
	}
}