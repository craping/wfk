package wfk.protocol.http.core.validate;

import javax.servlet.http.HttpServletRequest;

import wfk.common.define.bean.result.Errcode;
import wfk.protocol.http.core.validate.exception.ValidationException;

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
public interface Validation<T> {
	public Errcode validate(HttpServletRequest request, T paramObject, Object... objects) throws ValidationException;
}
