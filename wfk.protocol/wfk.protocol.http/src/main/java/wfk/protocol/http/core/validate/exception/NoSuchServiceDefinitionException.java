package wfk.protocol.http.core.validate.exception;

import wfk.common.define.error.support.Errors;

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
public class NoSuchServiceDefinitionException extends ValidationException {
	/**
	 * 
	 */
	private static final long serialVersionUID = -9177645561417152633L;
	
	private final String service;
	
	public NoSuchServiceDefinitionException(String service) {
		super(Errors.PARAM_SERVICE_NOT_DEFINITION, service.replace("$", "/"));
		this.service = service.replace("$", "/");
	}

	public String getService() {
		return service;
	}
}
