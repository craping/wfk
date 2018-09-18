package wfk.protocol.http.core.validate.exception;

import java.text.MessageFormat;

import wfk.common.define.FrameworkException;
import wfk.common.define.bean.result.Errcode;
import wfk.common.define.bean.result.Result;
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
public class ValidationException extends FrameworkException {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 917046328449572946L;
	
	protected final Errcode errcode;
	protected Object[] marks;
	protected AbstractParam param;

	public ValidationException(Errcode errcode) {
		this.errcode = errcode;
		marks = new Object[0];
	}
	
	public ValidationException(Errcode errcode, Object... marks) {
		this.errcode = errcode;
		this.marks = marks;
	}
	
	@Override
	public String getMessage() {
		return MessageFormat.format(errcode.getMsg(), marks);
	}
	
	public Errcode getErrcode() {
		return errcode;
	}

	public Object[] getMarks() {
		return marks;
	}

	public AbstractParam getParam() {
		return param;
	}

	public void setParam(AbstractParam param) {
		this.param = param;
	}
	
	public Result toResult() {
		return new Result(this.errcode, getMessage());
	}
}
