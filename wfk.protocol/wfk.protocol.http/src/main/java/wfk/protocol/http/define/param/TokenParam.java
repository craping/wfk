package wfk.protocol.http.define.param;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import wfk.common.define.bean.result.Errcode;
import wfk.common.define.error.support.Errors;
import wfk.protocol.http.core.validate.exception.ValidationException;
import wfk.protocol.http.core.validate.support.param.SingleParam;
import wfk.protocol.http.core.validate.support.param.ValidateParam;
import wfk.protocol.http.define.error.CustomErrors;


public class TokenParam extends ValidateParam implements SingleParam {
	public TokenParam() {
		this.desc="用户Token(登陆后即可无需传递)";
		this.defaultValue = "token";
	}
	
	@Override
	public boolean checkRequired(String param) {
		return true;
	}
	
	@Override
	protected Errcode validateValue(HttpServletRequest request, String paramString) throws ValidationException {
		HttpSession session = request.getSession();
		Object user = session.getAttribute("user");
		if(user == null)
			return CustomErrors.USER_ERROR_TOKEN;
		return Errors.OK;
	}
}
