package wfk.protocol.http.core.validate.exception;

import wfk.common.define.error.support.Errors;
import wfk.protocol.http.core.validate.support.AbstractParam;
import wfk.protocol.http.core.validate.support.param.StringParam;

/** 
 * @project Crap
 * 
 * @author Crap
 * 
 * @Copyright 2013 - 2014 All rights reserved. 
 * 
 * @email 422655094@qq.com
 * 
 */
public class ParamOutOfRangeException extends ValidationException {

	/**
	 * 
	 */
	private static final long serialVersionUID = -4556805811919636385L;

	public ParamOutOfRangeException(AbstractParam param) {
		super(Errors.PARAM_OUT_OF_RANGE);
		this.param = param;
		this.marks = new String[]{param.getValue(), getRange(param)};
	}
	
	public ParamOutOfRangeException(AbstractParam param, String range) {
		super(Errors.PARAM_OUT_OF_RANGE);
		this.marks = new String[]{param.getValue(), range};
	}
	
	protected String getRange(AbstractParam param) {
		String limit = param.getType() == StringParam.class?"length":"value";
		if(param.getMin() != null)
			limit = param.getMin() + " ≤ " + limit;
		if(param.getMax() != null)
			limit = limit + " ≤ " + param.getMax();
		return "["+limit+"]";
	}
}
