package wfk.protocol.http.define.param;

import wfk.protocol.http.core.validate.support.AbstractParam;
import wfk.protocol.http.core.validate.support.param.MultiParam;

public class PageParam extends MultiParam {
	
	public PageParam() {
		this.params = new AbstractParam[]{new PageFlagParam(), new PageNumParam()};
	}
	
}
