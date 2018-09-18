package wfk.protocol.http.core.override.servlet;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebInitParam;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.DispatcherServlet;

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
@MultipartConfig
@WebServlet(
	name="spring",
	urlPatterns={"/api/*"},
	initParams={@WebInitParam(name="contextConfigLocation", value="classpath:config/system/spring-servlet.xml")},
	loadOnStartup=1
)
public class FrameworkDispatcherServlet extends DispatcherServlet {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 8292152651145432966L;

	//private String encoding = "utf-8";
	
	@Override
	public void init(ServletConfig config) throws ServletException {
		//encoding = config.getInitParameter("encoding");
		super.init(config);
	}
	
	@Override
	protected void doService(HttpServletRequest request, HttpServletResponse response) throws Exception {
		//request.setCharacterEncoding(encoding);
		super.doService(request, response);
	}
}
