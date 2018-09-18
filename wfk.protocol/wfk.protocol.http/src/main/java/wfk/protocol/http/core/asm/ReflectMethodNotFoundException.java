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
public class ReflectMethodNotFoundException extends FrameworkRuntimeException {

	private static final long serialVersionUID = -8153644159505218690L;
	
	private Class<?> cls;
	
	public ReflectMethodNotFoundException(Class<?> cls) {
		this.cls = cls;
	}
	
	@Override
	public String getMessage() {
		return String.format("class %s or superclass not defined @Reflect method", cls.getName());
	}
}
