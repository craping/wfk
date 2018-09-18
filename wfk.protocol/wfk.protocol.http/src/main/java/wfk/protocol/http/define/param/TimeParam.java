package wfk.protocol.http.define.param;


public class TimeParam extends wfk.protocol.http.core.validate.support.param.TimeParam {

	public TimeParam() {
		this.format = "HH:mm:ss";
	}
	
	/*@Override
	protected Errcode validateValue(HttpServletRequest request, String paramString) throws ValidationException {
		if(!paramString.matches("^([0-1]?[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$"))
			throw new ParamFormatException(this);
		return Errors.OK;
	}*/
}
