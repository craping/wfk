package wfk.protocol.http.core.validate.support.param;

import wfk.common.define.bean.result.Errcode;
import wfk.common.define.error.support.Errors;
import wfk.protocol.http.core.validate.exception.ValidationException;
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
 * 	验证参数
 *  继承该类 只有validateValue 功能
 */
public abstract class ValidateParam extends AbstractParam {

	@Override
	protected boolean validateMin(String paramString) {
		return true;
	}

	@Override
	protected boolean validateMax(String paramString) {
		return true;
	}
	
	@Override
	protected Errcode validateEnumsRange(String paramString) throws ValidationException {
		return Errors.OK;
	}
	
	@Override
	public void checkRangeLegitimate(String mapping) {
	}
}
