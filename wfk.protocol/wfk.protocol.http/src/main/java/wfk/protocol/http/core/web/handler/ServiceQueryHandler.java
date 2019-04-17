package wfk.protocol.http.core.web.handler;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import wfk.common.define.bean.result.Errcode;

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
public abstract class ServiceQueryHandler extends ServiceHandler<Map<String,String>> {
	/**
	 *  ASM reflect to custom method
	 */
	public Errcode execute (HttpServletRequest request, Map<String,String> params) {return null;}
}