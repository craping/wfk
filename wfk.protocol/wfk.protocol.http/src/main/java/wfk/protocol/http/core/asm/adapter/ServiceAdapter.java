
package wfk.protocol.http.core.asm.adapter;

import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Controller;

import wfk.protocol.http.core.asm.ReflectMethodNotFoundException;
import wfk.protocol.http.core.validate.ValidationAdapter;
import wfk.protocol.http.core.validate.annotation.ServiceMethod;

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
public class ServiceAdapter extends ClassAdapter {
	
	private final Logger log = LogManager.getLogger(ServiceAdapter.class);
	
	public Map<String, Object> resolve(Class<?> clazz) {
		
		Map<String, Object> serviceBeanMap = new HashMap<String, Object>();
		
		Controller controller = clazz.getAnnotation(Controller.class);
		String module = (controller==null||controller.value().equals(""))?clazz.getSimpleName():controller.value();
		
		Method[] methods = clazz.getDeclaredMethods();

		for (Method met : methods) {
			ServiceMethod serviceMethod = met.getAnnotation(ServiceMethod.class);
			if(serviceMethod == null)
				continue;

			String method = serviceMethod.value().equals("")?met.getName():serviceMethod.value();
			String mapping = module+"$"+method.replace("/", "$").replace("\\", "$");
			
			ValidationAdapter.getInstance().registValidation(serviceMethod, mapping);
			log.info("regist [@ServiceMethod] to Validation mapping[{}]", mapping);
		
			Object asmObj = null;
			try {
				asmObj = mete.generateSecure(clazz, met);
			} catch (ReflectMethodNotFoundException | NoSuchMethodException | SecurityException e) {
				e.printStackTrace();
				return null;
			}
			log.info("generate secure [@ServiceMethod] to [{}] done", asmObj.getClass().getName());

			serviceBeanMap.put(mapping, asmObj);
		}
		
		return serviceBeanMap;
	}
}
