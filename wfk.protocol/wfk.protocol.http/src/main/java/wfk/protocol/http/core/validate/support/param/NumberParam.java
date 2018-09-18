package wfk.protocol.http.core.validate.support.param;

import java.math.BigDecimal;

import javax.servlet.http.HttpServletRequest;

import wfk.common.define.bean.result.Errcode;
import wfk.common.define.error.support.Errors;
import wfk.common.define.util.StringUtil;
import wfk.protocol.http.core.validate.exception.ParamFormatException;
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
 */
public class NumberParam extends AbstractParam {
	
	@Override
	protected Errcode validateValue(HttpServletRequest request, String paramString) throws ValidationException {
		if(!StringUtil.isNumber(paramString))
			throw new ParamFormatException(this);
		return Errors.OK;
	}

	@Override
	protected boolean validateMin(String paramString) {
		if(this.min == null)
			return true;
		
		return new BigDecimal(paramString).compareTo(new BigDecimal(this.min)) > -1;
	}

	@Override
	protected boolean validateMax(String paramString) {
		if(this.max == null)
			return true;
		
		return new BigDecimal(paramString).compareTo(new BigDecimal(this.max)) < 1;
	}

	public static void main(String[] args) {
		System.out.println(new BigDecimal(4).compareTo(new BigDecimal(3)) > -1);
	}
}
