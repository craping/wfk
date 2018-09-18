package wfk.protocol.http.core.web;

import java.io.IOException;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.codehaus.jackson.JsonParser;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import wfk.common.define.bean.result.Errcode;
import wfk.common.define.bean.result.Result;
import wfk.common.define.error.support.Errors;
import wfk.protocol.http.core.override.context.ContextRegister;
import wfk.protocol.http.core.validate.Validation;
import wfk.protocol.http.core.validate.ValidationAdapter;
import wfk.protocol.http.core.validate.exception.ValidationException;
import wfk.protocol.http.core.validate.security.CryptoCipher;
import wfk.protocol.http.core.web.handler.ServiceHandler;

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
@Controller("ServiceController$Framework")
public class ServiceController implements ExceptionHandle {
	
	private static Logger log = LogManager.getLogger(ServiceController.class);

	private ObjectMapper mapper = new ObjectMapper();
	{
		mapper.configure(JsonParser.Feature.ALLOW_SINGLE_QUOTES, true);
		mapper.configure(JsonParser.Feature.ALLOW_UNQUOTED_FIELD_NAMES, true);
	}
	
	@RequestMapping(value="{module}/{method}", method={RequestMethod.GET, RequestMethod.POST})
	public ModelAndView executeRequest(HttpServletRequest request, @RequestParam Map<String,String> params, @PathVariable String module, @PathVariable String method) throws Exception {
		
		String mapping = module+"$"+method;
		//param validation
		Validation<Map<String,String>> vld = ValidationAdapter.getInstance();
		Errcode errcode = vld.validate(request, params, mapping);
		if(!errcode.equals(Errors.OK))
			throw new ValidationException(errcode);

		//handle execute
		ModelAndView view = new ModelAndView();
		Errcode result = ContextRegister.CONTEXT.getBean(mapping, ServiceHandler.class).execute(request, params);


		CryptoCipher cipher = ((ValidationAdapter)vld).getCipher();
		if(cipher != null && cipher.getClientAESKey() != null){
			view.addObject("result", cipher.encrypt(mapper.writeValueAsString(result)));
			((ValidationAdapter)vld).setCipher(null);
		}else{
			view.addObject("result", result);
		}
		return view;
	}
	
	@RequestMapping(value="{project}/{module}/{method}", method={RequestMethod.GET, RequestMethod.POST})
	public ModelAndView executeRequest(HttpServletRequest request, @RequestParam Map<String,String> params, @PathVariable String project, @PathVariable String module, @PathVariable String method) throws Exception {
		
		String mapping = project+"$"+module+"$"+method;
		//param validation
		Validation<Map<String,String>> vld = ValidationAdapter.getInstance();
		Errcode errcode = vld.validate(request, params, mapping);
		if(!errcode.equals(Errors.OK))
			throw new ValidationException(errcode);

		//handle execute
		ModelAndView view = new ModelAndView();
		Errcode result = ContextRegister.CONTEXT.getBean(mapping, ServiceHandler.class).execute(request, params);
		
		CryptoCipher cipher = ((ValidationAdapter)vld).getCipher();
		if(cipher != null && cipher.getClientAESKey() != null){
			view.addObject("result", cipher.encrypt(mapper.writeValueAsString(result)));
			((ValidationAdapter)vld).setCipher(null);
		}else{
			view.addObject("result", result);
		}
		return view;
	}

	
	public ModelAndView handleCustomException(HttpServletRequest request, HttpServletResponse response, Object handler, ValidationException ex) {
		Validation<Map<String,String>> vld = ValidationAdapter.getInstance();
		CryptoCipher cipher = ((ValidationAdapter)vld).getCipher();
		
		ModelAndView view = new ModelAndView();
		log.debug(ex.getMessage());
		if(cipher != null && cipher.getClientAESKey() != null){
			try {
				view.addObject("result", cipher.encrypt(mapper.writeValueAsString(ex.toResult())));
			} catch (IOException e) {
				e.printStackTrace();
			}
			((ValidationAdapter)vld).setCipher(null);
		}else{
			view.addObject("result", ex.toResult());
		}
		return view;
	}
	
	public ModelAndView handleException(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) {
		Validation<Map<String,String>> vld = ValidationAdapter.getInstance();
		CryptoCipher cipher = ((ValidationAdapter)vld).getCipher();
		
		ModelAndView view = new ModelAndView();
		if(cipher != null && cipher.getClientAESKey() != null){
			try {
				view.addObject("result", cipher.encrypt(mapper.writeValueAsString(new Result(Errors.EXCEPTION_UNKNOW, ex.getMessage()))));
			} catch (IOException e) {
				e.printStackTrace();
			}
			((ValidationAdapter)vld).setCipher(null);
		}else{
			view.addObject("result", new Result(Errors.EXCEPTION_UNKNOW, ex.getMessage()));
		}
		log.error("EXCEPTION_UNKNOW", ex);
		return view;
	}
}