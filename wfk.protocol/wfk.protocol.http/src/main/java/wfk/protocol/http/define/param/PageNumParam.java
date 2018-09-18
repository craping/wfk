package wfk.protocol.http.define.param;

import wfk.protocol.http.core.validate.support.param.IntegerParam;


public class PageNumParam extends IntegerParam {
	
	public PageNumParam() {
		this.value = "page_num";
		this.required = false;
		//this.defaultValue = new String[]{"20"};
		this.desc="每页显示记录数";
	}
}
