package wfk.protocol.http.define.param;

import wfk.protocol.http.core.validate.support.param.RegExpParam;


public class EmailParam extends RegExpParam {
	public EmailParam() {
		this.regex = "^([a-zA-Z0-9_\\-\\.\\+]+)@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.)|(([a-zA-Z0-9\\-]+\\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\\]?)$";
	}
}
