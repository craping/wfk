package wfk.protocol.http.core.validate.support.param;

import javax.servlet.http.HttpServletRequest;

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
 *	组合参数
 *	继承该类,将验证 {@link #params} 中所有参数
 *	类本身不参与验证
 */
public abstract class MultiParam extends ValidateParam implements SingleParam {
	
	/** 多参数组合验证 */
	protected AbstractParam[] params;
	
	public MultiParam() {
		this.required = false;
		this.multi = false;
	}
	
	@Override
	public boolean checkRequired(String param) {
		return true;
	}
	
	@Override
	protected Errcode validateValue(HttpServletRequest request, String paramString) throws ValidationException {
		return Errors.OK;
	}

	public AbstractParam[] getParams() {
		return params;
	}

	public void setParams(AbstractParam[] params) {
		this.params = params;
	}
}
