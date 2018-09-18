package wfk.protocol.http.core.override.context;

import java.lang.reflect.Field;
import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.support.BeanDefinitionBuilder;
import org.springframework.beans.factory.support.DefaultListableBeanFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Controller;

import wfk.protocol.http.core.asm.adapter.ClassAdapter;
import wfk.protocol.http.core.asm.adapter.ServiceAdapter;
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
 * 动态方法注册 
 * 
 */
public class ContextRegister {
	
	private final Logger log = LogManager.getLogger(ContextRegister.class);
			
	public static ApplicationContext CONTEXT;

	public ContextRegister(ApplicationContext applicationContext){
		CONTEXT = applicationContext;
	}
	
	public void initContextRegister() {
		registService();
	}
	
	protected void registService() {
		log.info("regist [@ServiceMethod] to Spring beanFactory");
		
		DefaultListableBeanFactory beanFactory = (DefaultListableBeanFactory) CONTEXT.getAutowireCapableBeanFactory();
		
		Map<String, Object> beanMap = CONTEXT.getBeansWithAnnotation(Controller.class);
		
		ClassAdapter adapter = new ServiceAdapter();
		
		for (Map.Entry<String, Object> entry : beanMap.entrySet()) {
			Class<?> resolveClass = entry.getValue().getClass().toString().contains("$$")? entry.getValue().getClass().getSuperclass():entry.getValue().getClass();
			
			if(!ServiceHandler.class.isAssignableFrom(resolveClass)){
				continue;
				//throw new ClassNotAssignableException(String.format("class [%s] can not assignable from %s", clazz.getName(), ServiceHandler.class.getName()));
			}
			
			Map<String, String> property = new HashMap<String, String>();
			//获取父类中需要Spring注入的属性
			Field[] fields = resolveClass.getFields();
			for (Field field : fields) {
				Autowired autowired = field.getAnnotation(Autowired.class);
				if(autowired == null){
					Resource resource = field.getAnnotation(Resource.class);
					if(resource == null)
						continue;
					property.put(field.getName(), resource.name());
				}else{
					property.put(field.getName(), field.getName());
				}
			}
			
			Map<String, Object> serviceBeanMap = adapter.resolve(resolveClass);

			for (Map.Entry<String, Object> entry1: serviceBeanMap.entrySet()) {
				
				log.info("regist bean info:[{}={}]", entry1.getKey(), entry1.getValue().getClass().getName());
				
				BeanDefinitionBuilder bean = BeanDefinitionBuilder.genericBeanDefinition(entry1.getValue().getClass());
				for (Map.Entry<String, String> p : property.entrySet()){
					bean.setScope("prototype");
					bean.addPropertyReference(p.getKey(), p.getValue());
				}
				beanFactory.registerBeanDefinition(entry1.getKey(), bean.getRawBeanDefinition());
			}
		}
	}
}
