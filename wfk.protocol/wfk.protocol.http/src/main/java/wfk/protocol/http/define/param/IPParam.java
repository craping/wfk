package wfk.protocol.http.define.param;

import wfk.protocol.http.core.validate.support.param.RegExpParam;


public class IPParam extends RegExpParam {
	public IPParam() {
		this.regex = "^(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[0-9]{1,2})(\\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[0-9]{1,2})){3}$";
	}
}
