package wfk.protocol.http.core.validate.exception;

import java.util.Arrays;

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
public class ParamOutOfEnumsRangeException extends ParamOutOfRangeException {

	/**
	 * 
	 */
	private static final long serialVersionUID = -4875687366300431125L;

	public ParamOutOfEnumsRangeException(AbstractParam param) {
		super(param, Arrays.toString(param.getEnums()));
	}
	
	public ParamOutOfEnumsRangeException(AbstractParam param, String[] enums) {
		super(param, Arrays.toString(enums));
	}
}
