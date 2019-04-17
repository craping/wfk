package wfk.protocol.http.core.web.handler;

import javax.servlet.http.HttpServletRequest;

import net.sf.json.JSONObject;
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
public abstract class ServiceJSONHandler extends ServiceHandler<JSONObject> {
	/**
	 *  ASM reflect to custom method
	 */
	public Errcode execute (HttpServletRequest request, JSONObject params) {return null;}
}