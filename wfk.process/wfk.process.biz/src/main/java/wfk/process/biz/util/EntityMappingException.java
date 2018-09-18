package wfk.process.biz.util;

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
 * RowMpperException异常
 */
public class EntityMappingException extends FrameworkRuntimeException {

	private static final long serialVersionUID = -7333552725998641151L;
	
	public EntityMappingException(Class<?> cls) {
		super("Unknown entity: " + cls.getName());
	}
	
}
