package wfk.protocol.http.define.param;

import wfk.protocol.http.core.validate.support.param.RegExpParam;


public class MobileParam extends RegExpParam {
	public MobileParam() {
		this.regex = "^0?(13[0-9]|15[0-9]|18[0-9]|14[57])[0-9]{8}$";
	}
}
