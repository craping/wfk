/**
 * 
 */
package wfk.protocol.http.core.validate.annotation;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;




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
@Target({ElementType.METHOD, ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface ServiceMethod {
	/** 接口名*/
	String value() default "";
	/** 参数集合*/
	Parameter[] params() default {};
	/** 接口是否加密*/
	boolean security() default false;
	/** 描述*/
	String desc() default "";
}
