package wfk.protocol.http.core.validate.exception;

import wfk.common.define.error.support.Errors;

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
public class ParamEmptyException extends ValidationException {
	/**
	 * 
	 */
	private static final long serialVersionUID = -847446769060544836L;
	private final String paramName;
	
	public ParamEmptyException(String paramName) {
		super(Errors.PARAM_EMPTY, paramName);
		this.paramName = paramName;
	}
	
	public String getParamName() {
		return paramName;
	}

}
