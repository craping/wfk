package wfk.protocol.http.core.asm;

import wfk.common.define.FrameworkRuntimeException;

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
public class ClassNotAssignableException extends FrameworkRuntimeException {

	private static final long serialVersionUID = -7937903169012484459L;
	
	public ClassNotAssignableException() {}
	
	public ClassNotAssignableException(String msg) {
		super(msg);
	}
}
