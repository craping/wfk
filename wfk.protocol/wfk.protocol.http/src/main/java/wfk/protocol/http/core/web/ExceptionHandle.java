package wfk.protocol.http.core.web;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.servlet.ModelAndView;

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
public interface ExceptionHandle {
	
	@ExceptionHandler(ValidationException.class)
	@ResponseStatus(HttpStatus.OK)
	public ModelAndView handleCustomException(HttpServletRequest request, HttpServletResponse response, Object handler, ValidationException ex);
	
	@ExceptionHandler({RuntimeException.class, Exception.class})
	@ResponseStatus(HttpStatus.OK)
	public ModelAndView handleException(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex);

}
