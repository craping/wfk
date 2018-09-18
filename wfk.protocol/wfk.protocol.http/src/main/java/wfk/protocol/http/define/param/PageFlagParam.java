package wfk.protocol.http.define.param;

import wfk.protocol.http.core.validate.support.param.IntegerParam;

public class PageFlagParam extends IntegerParam {
	
	public PageFlagParam() {
		this.value = "page_flag";
		this.required = false;
		this.defaultValue = "1";
		this.desc="页数";
	}
	
}
