package wfk.protocol.http.core.asm.adapter;

import java.util.Map;

import wfk.protocol.http.core.asm.MethodEnhancer;

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
public abstract class ClassAdapter {
	
	protected final MethodEnhancer mete = new MethodEnhancer();
	
	public abstract Map<String, Object> resolve(Class<?> clazz);
	
}
