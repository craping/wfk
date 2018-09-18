package wfk.protocol.http.define.param;

import javax.servlet.http.HttpServletRequest;

import wfk.common.define.bean.result.Errcode;
import wfk.common.define.error.support.Errors;
import wfk.protocol.http.core.validate.exception.ValidationException;
import wfk.protocol.http.core.validate.support.param.SingleParam;
import wfk.protocol.http.core.validate.support.param.ValidateParam;


public class ImageParam extends ValidateParam implements SingleParam {
	public ImageParam() {
		this.desc="用户Token";
		this.defaultValue = "token";
	}
	
	@Override
	public boolean checkRequired(String param) {
		return true;
	}
	
	@Override
	protected Errcode validateValue(HttpServletRequest request, String paramString) throws ValidationException {
		/*HttpSession session = request.getSession();
		TblUser user = (TblUser) session.getAttribute("user");
		if(user == null)
			return CustomErrors.USER_ERROR_TOKEN;*/
		return Errors.OK;
	}
}
