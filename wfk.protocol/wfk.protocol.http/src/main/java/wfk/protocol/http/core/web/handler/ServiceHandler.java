package wfk.protocol.http.core.web.handler;

import javax.servlet.http.HttpServletRequest;

import org.springframework.transaction.annotation.Transactional;

import wfk.common.define.bean.result.Errcode;
import wfk.protocol.http.core.asm.annotation.Reflect;

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
@Reflect("execute")
@Transactional
public abstract class ServiceHandler<T> {
	/**
	 *  ASM reflect to custom method
	 */
	public Errcode execute (HttpServletRequest request, T params) {return null;}
}