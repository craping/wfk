package wfk.protocol.http.core.validate.support;

import javax.servlet.http.HttpServletRequest;

import wfk.common.define.bean.result.Errcode;
import wfk.common.define.error.support.Errors;
import wfk.protocol.http.core.validate.Validation;
import wfk.protocol.http.core.validate.annotation.Parameter;
import wfk.protocol.http.core.validate.exception.ParamIllegalRangeException;
import wfk.protocol.http.core.validate.exception.ParamOutOfEnumsRangeException;
import wfk.protocol.http.core.validate.exception.ParamOutOfRangeException;
import wfk.protocol.http.core.validate.exception.ValidationException;

/** 
 * @project Crap
 * 
 * @author Crap
 * 
 * @Copyright 2013 - 2014 All rights reserved. 
 * 
 * @email 422655094@qq.com
 * 
 * 注解对应的抽象类
 * @see Parameter
 */
public abstract class AbstractParam implements Validation<String> {
	/** 参数所属接口名 */
	protected String mapping;
	
	/** 参数名 */
	protected String value;
	/** 描述 */
	protected String desc;
	/** 是否为必要 */
	protected Boolean required;
	/** 是否为空 */
	protected Boolean empty;
	/** 是否有多个值 */
	protected Boolean multi;
	/** 默认值 */
	//protected List<String> defaultValue;
	protected String defaultValue;
	/** 参数取值范围(如果这个值被设定,min,max 则失效) */
	protected String[] enums;
	/** 参数最小值 */
	protected String min;
	/** 参数最大值 */
	protected String max;
	
	protected Class<? extends AbstractParam> type;
	
	/**
	 * 参数必要性检查
	 * @author Crap
	 * @param param
	 * @return boolean
	 */
	public boolean checkRequired(String param){
		return (required == null || required)?(param != null):true;
	}
	
	/**
	 * 参数为空检查
	 * @author Crap
	 * @param param
	 * @return boolean
	 */
	public boolean checkEmpty(String param){
		return (param != null && (empty == null || !empty))?(!param.equals("")):true;
	}
	
	/**
	 * 验证接口
	 * @param paramString 需要验证的参数值
	 * @return Errcode
	 * @throws ValidationException
	 */
	public Errcode validate(HttpServletRequest request, String paramString, Object... objects) throws ValidationException {
		if(this.enums != null && this.enums.length > 0) {
			return validateEnumsRange(paramString);
		}
		Errcode errcode = validateValue(request, paramString);
		if(!errcode.equals(Errors.OK))
			return errcode;
		return validateMinMaxRange(paramString);
		//return validateRange(paramString);
	}
	
	/**
	 * 验证参数是否存在范围内
	 * @author Crap
	 * @param paramString 需要验证的参数
	 * @return Errcode
	 * @exception ParamOutOfRangeException,ParamOutOfEnumsRangeException
	 * @throws ValidationException
	 */
	/*private Errcode validateRange(String paramString) throws ValidationException {
		if(this.enums == null || this.enums.length == 0) {
			//未设置枚举验证则验证min,max
			return validateMinMaxRange(paramString);
		}
		return validateEnumsRange(paramString);
	}*/
	
	
	/**
	 * 验证参数是否在最小(Min)最大(Max)值内
	 * @author Crap
	 * @param paramString 需要验证的参数
	 * @return Errcode
	 * @exception ParamOutOfRangeException
	 * @throws ValidationException
	 */
	protected Errcode validateMinMaxRange(String paramString) throws ValidationException {
		if(!validateMin(paramString) || !validateMax(paramString))
			throw new ParamOutOfRangeException(this);
		return Errors.OK;
	}
	
	
	/**
	 * 验证参数是否在枚举值范围内
	 * @author Crap
	 * @param paramString 需要验证的参数
	 * @return Errcode
	 * @exception ParamOutOfEnumsRangeException
	 * @throws ValidationException
	 */
	protected Errcode validateEnumsRange(String paramString) throws ValidationException {
		for (int i = 0; i < this.enums.length; i++) {
			if(String.valueOf(paramString).equals(this.enums[i]))
				return Errors.OK;
		}
		throw new ParamOutOfEnumsRangeException(this);
	}
	
	/**
	 * 检查参数验证规则的最小(Min)范围值是否合法
	 * @author Crap
	 * @param mapping 方法标记明
	 * @exception ParamIllegalRangeException
	 * @throws ValidationException
	 */
	protected void checkMinLegitimate(String mapping) throws ValidationException {
		try{
			if(this.min != null)
				validateValue(null, this.min);
		} catch (ValidationException e) {
			throw new ParamIllegalRangeException(String.format("param [%s] min:[%s] attribute is not legitimate", this.value, this.min));
		}
	}
	
	/**
	 * 检查参数验证规则的最大(Max)范围值是否合法
	 * @author Crap
	 * @param mapping 方法标记明
	 * @exception ParamIllegalRangeException
	 * @throws ValidationException
	 */
	protected void checkMaxLegitimate(String mapping) throws ValidationException {
		try{
			if(this.max != null)
				validateValue(null, this.max);
		} catch (ValidationException e) {
			throw new ParamIllegalRangeException(String.format("param [%s] max:[%s] attribute is not legitimate", this.value, this.max));
		}
	}
	
	/**
	 * 参数取值范围值合法性检查
	 * @author Crap
	 * @param mapping 需要被检查的方法的 mapping
	 * @throws ParamIllegalRangeException
	 */
	public void checkRangeLegitimate(String mapping) {
		try {
			for (int i = 0; i < this.enums.length; i++) {
				if(validateValue(null, this.enums[i]) != Errors.OK)
					throw new ParamIllegalRangeException(String.format("[%s] param [%s] enums:[%s] attribute is not legitimate", mapping.replace("$", "."), this.value, this.enums[i]));
			}
			checkMinLegitimate(mapping);
			checkMaxLegitimate(mapping);
		} catch (ValidationException e) {
			throw new ParamIllegalRangeException(e.getMessage());
		}
	}
	
	/**
	 * 验证参数是否否符合类型,具体参见实现类
	 * @param paramString 需要验证的参数值
	 * @return Errcode
	 * @throws ValidationException
	 */
	protected abstract Errcode validateValue(HttpServletRequest request, String paramString) throws ValidationException;
	
	/**
	 * 验证参数是否符合min值,具体参见实现类
	 * @author Crap
	 * @return boolean
	 */
	protected abstract boolean validateMin(String paramString);
	
	/**
	 * 验证参数是否符合max值,具体参见实现类
	 * @author Crap
	 * @return boolean
	 */
	protected abstract boolean validateMax(String paramString);
	

	public String getMapping() {
		return mapping;
	}

	public void setMapping(String mapping) {
		this.mapping = mapping;
	}

	public Boolean getRequired() {
		return required;
	}

	public Boolean getMulti() {
		return multi;
	}

	public Boolean isMulti() {
		return multi;
	}

	public void setMulti(Boolean multi) {
		this.multi = multi;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	public String getDesc() {
		return desc;
	}

	public void setDesc(String desc) {
		this.desc = desc;
	}

	public Boolean isRequired() {
		return required;
	}

	public void setRequired(Boolean required) {
		this.required = required;
	}

	/*public List<String> getDefaultValue() {
		return defaultValue;
	}

	public void setDefaultValue(List<String> defaultValue) {
		this.defaultValue = defaultValue;
	}*/

	public String[] getEnums() {
		return enums;
	}

	public String getDefaultValue() {
		return defaultValue;
	}

	public void setDefaultValue(String defaultValue) {
		this.defaultValue = defaultValue;
	}

	public void setEnums(String[] enums) {
		this.enums = enums;
	}

	public String getMin() {
		return min;
	}

	public void setMin(String min) {
		this.min = min;
	}

	public String getMax() {
		return max;
	}

	public void setMax(String max) {
		this.max = max;
	}

	public Class<? extends AbstractParam> getType() {
		return type;
	}

	public void setType(Class<? extends AbstractParam> type) {
		this.type = type;
	}

	public Boolean getEmpty() {
		return empty;
	}

	public void setEmpty(Boolean empty) {
		this.empty = empty;
	}
}
