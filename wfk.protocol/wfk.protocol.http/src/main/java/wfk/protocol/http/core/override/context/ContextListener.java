package wfk.protocol.http.core.override.context;

import javax.servlet.ServletContextEvent;
import javax.servlet.annotation.WebListener;

import org.springframework.web.context.ContextLoaderListener;

import wfk.common.define.Configuration;

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
@WebListener
public class ContextListener extends ContextLoaderListener {

	private ContextRegister register;
	
	@Override
	public void contextInitialized(ServletContextEvent event) {
		super.contextInitialized(event);
		this.register = new ContextRegister(getCurrentWebApplicationContext());
		this.register.initContextRegister();
	}
	
	@Override
	public void contextDestroyed(ServletContextEvent event) {
		super.contextDestroyed(event);
		Configuration.getInstance().getTimer().cancel();
	}
	
}
