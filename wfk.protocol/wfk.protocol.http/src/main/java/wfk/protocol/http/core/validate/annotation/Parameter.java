package wfk.protocol.http.core.validate.annotation;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import wfk.protocol.http.core.validate.support.AbstractParam;
import wfk.protocol.http.core.validate.support.param.StringParam;

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
@Target({ElementType.PARAMETER, ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface Parameter {
	//参数名称
	String value() default "";
	//参数类型
	Class<? extends AbstractParam> type() default StringParam.class;
	//参数描述
	String desc() default "";
	//是否为必要参数
	boolean required() default true;
	//是否可以为空
	boolean empty() default false;
	//是否有多个值
	boolean multi() default false;
	//默认值
	String defaultValue() default "";
	//参数枚举范围
	String[] enums() default {};
	//参数最小值
	String min() default "";
	//参数最小值
	String max() default "";
	//其他属性
	Attribute[] attribute() default {};
}
