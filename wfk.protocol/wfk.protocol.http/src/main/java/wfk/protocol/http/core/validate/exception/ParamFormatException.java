package wfk.protocol.http.core.validate.exception;

import wfk.common.define.error.support.Errors;
import wfk.protocol.http.core.validate.support.AbstractParam;

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
public class ParamFormatException extends ValidationException {
	/**
	 * 
	 */
	private static final long serialVersionUID = -9177645561417152633L;
	
	public ParamFormatException(AbstractParam param) {
		super(Errors.PARAM_FORMAT_ERROR, param.getValue());
	}
}
