package wfk.protocol.http.core.validate;

import java.lang.reflect.AccessibleObject;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.net.URLDecoder;
import java.security.KeyPair;
import java.security.PrivateKey;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import wfk.common.define.bean.result.Errcode;
import wfk.common.define.error.support.Errors;
import wfk.common.define.util.ClassUtil;
import wfk.common.define.util.StringUtil;
import wfk.protocol.http.core.asm.ParamAttrNotMatchException;
import wfk.protocol.http.core.validate.annotation.Attribute;
import wfk.protocol.http.core.validate.annotation.Parameter;
import wfk.protocol.http.core.validate.annotation.ServiceMethod;
import wfk.protocol.http.core.validate.exception.NoSuchServiceDefinitionException;
import wfk.protocol.http.core.validate.exception.ParamEmptyException;
import wfk.protocol.http.core.validate.exception.ParamIllegalRangeException;
import wfk.protocol.http.core.validate.exception.ParamRequiredException;
import wfk.protocol.http.core.validate.exception.ValidationException;
import wfk.protocol.http.core.validate.security.CryptoCipher;
import wfk.protocol.http.core.validate.security.RSA;
import wfk.protocol.http.core.validate.security.param.EncryptDataParam;
import wfk.protocol.http.core.validate.security.param.EncryptFlagParam;
import wfk.protocol.http.core.validate.security.param.EncryptSourceParam;
import wfk.protocol.http.core.validate.support.AbstractParam;
import wfk.protocol.http.core.validate.support.ServiceMethodWrap;
import wfk.protocol.http.core.validate.support.param.MultiParam;
import wfk.protocol.http.core.validate.support.param.SingleParam;
import wfk.protocol.http.core.validate.support.param.ValidateParam;

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
public class ValidationAdapter implements Validation<Map<String,String>> {
	
	private static ValidationAdapter instance;
	
	private static Logger log = LogManager.getLogger(ValidationAdapter.class);
			
	public static final Map<String, ServiceMethodWrap> vMap = new HashMap<String, ServiceMethodWrap>();
	
	public static final List<KeyPair> keyPairList = new ArrayList<>();
	static {
		for (int i = 0; i <30; i++) {
			keyPairList.add(RSA.generateKeyPair());
		}
	}
	private CryptoCipher cipher;
	
	public static ValidationAdapter getInstance() {
		if(instance == null) {
			synchronized(ValidationAdapter.class){  
                //再次检查实例是否存在，如果不存在才真正地创建实例
                if(instance == null){  
                    instance = new ValidationAdapter();  
                }  
            }
		}
		return instance;
	}

	private ValidationAdapter() {}
	
	public void registValidation(ServiceMethod serviceMethod, String mapping) {
		
		Parameter[] params = serviceMethod.params();
		AbstractParam[] aParams = new AbstractParam[params.length];
		
		for (int i = 0; i < params.length; i++) {
			aParams[i] = generateAbstractParam(params[i], mapping);
		}
		ServiceMethodWrap methodWrap = new ServiceMethodWrap();
		methodWrap.setValue(serviceMethod.value());
		methodWrap.setParams(aParams);
		methodWrap.setSecurity(serviceMethod.security());
		methodWrap.setDesc(serviceMethod.desc());
		if(methodWrap.isSecurity()){
			methodWrap.setSecurityParams(new AbstractParam[]{new EncryptDataParam(), new EncryptSourceParam(), new EncryptFlagParam()});
		}
		vMap.put(mapping, methodWrap);
	}
	
	/**
	 * 加密传输参数解密
	 * @author Crap
	 * @param webParams 请求的参数Map
	 * @return Errcode 错误码
	 * @throws ValidationException
	 */
	public CryptoCipher decrypt(Map<String,String> webParams, AbstractParam[] securityParams) throws ValidationException {
		CryptoCipher cipher = new CryptoCipher();
		try {
			validateParams(null, webParams, securityParams);
			
			String encryptData = webParams.get("encrypt_data");
			String encryptSource = webParams.get("encrypt_source");
			int encryptFlag = Integer.parseInt(webParams.get("encrypt_flag"));
			
			String paramsStr;
			PrivateKey privateKey = keyPairList.get(encryptFlag).getPrivate();
			if(encryptSource!= null && encryptSource.equalsIgnoreCase("javascript")){
				paramsStr = cipher.decryptJS(encryptData, privateKey);
			}else{
				paramsStr = cipher.decrypt(encryptData, privateKey);
			}
			paramsStr = URLDecoder.decode(paramsStr, "UTF-8");
			String[] params = paramsStr.split("&");
			for (String string : params) {
				String[] param = StringUtil.split(string, "=");
				webParams.put(param[0], param[1]);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return cipher;
	}
	
	/**
	 * 接口参数适配验证
	 * @author Crap
	 * @param request HttpServletRequest
	 * @param params 请求的参数Map
	 * @param objects String:mapping
	 * @return Errcode 错误码
	 * @throws ValidationException
	 */
	public Errcode validate(HttpServletRequest request, Map<String,String> params, Object... objects) throws ValidationException {
		String mapping = String.valueOf(objects[0]);
		
		ServiceMethodWrap wrap = vMap.get(mapping);
		if(wrap == null)
			throw new NoSuchServiceDefinitionException(mapping);
		if(wrap.isSecurity()){
			this.cipher = decrypt(params, wrap.getSecurityParams());
		}
		log.debug("request input param:{}", params);
		Errcode errcode = validateParams(request, params, wrap.getParams());
		log.debug("request finally param:{}", params);
		return errcode;
	}
	
	/**
	 * 适配类参数验证
	 * @author Crap
	 * @param request
	 * @param params 请求的参数Map
	 * @param aParams 参数验证类型集合
	 * @return Errcode 错误码
	 * @throws ValidationException
	 */
	public Errcode validateParams(HttpServletRequest request, Map<String,String> params, AbstractParam[] aParams) throws ValidationException {
		StringBuffer nullParam = new StringBuffer();
		StringBuffer emptyParam = new StringBuffer("");
		if(validateRequired(nullParam, emptyParam, request, params, aParams)){
			nullParam.deleteCharAt(nullParam.length() - 1);
			throw new ParamRequiredException(nullParam.toString());
		}
		if(emptyParam.length() > 0){
			emptyParam.delete(emptyParam.length() - 1, emptyParam.length());
			throw new ParamEmptyException(emptyParam.toString());
		}
		return validateValue(request, params, aParams);
	}
	
	/**
	 * 参数必要,为空验证
	 * @author Crap
	 * @param nullParam 接收为空字段字符串
	 * @param request
	 * @param params 请求的参数Map
	 * @param aParams 参数验证类型集合
	 * @return boolean
	 * @throws ValidationException
	 */
	public boolean validateRequired(StringBuffer nullParam, StringBuffer emptyParam, HttpServletRequest request, Map<String,String> params, AbstractParam[] aParams) throws ValidationException {
		boolean required = false;
		
		for (AbstractParam abstractParam : aParams) {
			//验证组合参数
			if(abstractParam instanceof MultiParam){
				MultiParam mParam = (MultiParam)abstractParam;
				if(mParam.getParams().length > 0){
					required = validateRequired(nullParam, emptyParam, request, params, mParam.getParams());
				}
			}
			
			String value = params.get(abstractParam.getValue());
			
			if(value==null && abstractParam.getDefaultValue() != null && !abstractParam.getDefaultValue().equals("")) {
				value = abstractParam.getDefaultValue();
				params.put(abstractParam.getValue(), value);
			}
			
			if(!(abstractParam instanceof ValidateParam) && !abstractParam.checkRequired(value)) {
				required = true;
				nullParam.append(abstractParam.getValue()).append(",");
			}
			if(!(abstractParam instanceof ValidateParam) && !abstractParam.checkEmpty(value)){
				emptyParam.append(abstractParam.getValue()).append(",");
			}
		}
		
		return required;
	}
	
	/**
	 * 参数值验证
	 * @author Crap
	 * @param request
	 * @param params 请求的参数Map
	 * @param aParams 参数验证类型集合
	 * @return Errcode 错误码
	 * @throws ValidationException
	 */
	public Errcode validateValue(HttpServletRequest request, Map<String,String> params, AbstractParam[] aParams) throws ValidationException {
		for (AbstractParam abstractParam : aParams) {
			String value = params.get(abstractParam.getValue());
			
			//验证组合参数
			if(value == null && abstractParam instanceof MultiParam){
				MultiParam mParam = (MultiParam)abstractParam;
				if(mParam.getParams().length > 0){
					Errcode errcode = validateValue(request, params, mParam.getParams());
					if(!errcode.equals(Errors.OK))
						return errcode;
				}
			}
			
			if(value != null){
				Errcode errcode = abstractParam.validate(request, value);
				if(!errcode.equals(Errors.OK))
					return errcode;
				
				params.put(abstractParam.getValue(), value);
			}
		}
		return Errors.OK;
	}
	
	
	/**
	 * 通过{@Parameter} 生成 {@AbstractParam}抽象参数验证类型
	 * @author Crap
	 * @param parameter 参数注解
	 * @return AbstractParam
	 * @throws InstantiationException,IllegalAccessException
	 */
	private AbstractParam generateAbstractParam(Parameter parameter, String mapping) {
		AbstractParam aParam = null;
		try {	
			Class<? extends AbstractParam> param = parameter.type();
			aParam = param.newInstance();
			
			Field[] fields = ClassUtil.getDeclaredFields(param);
			AccessibleObject.setAccessible(fields, true);
			
			log.info("regist [{}.{}] to Validation ", mapping.replace("$", "."), parameter.value());
			for (Field field : fields) {
				try {
					if(field.get(aParam) == null) {
						if(!SingleParam.class.isAssignableFrom(param) && field.getName().equals("value") && parameter.value().equals(""))
							throw new ParamIllegalRangeException(String.format("[%s] Parameter[type:%s] attribute [value] is \"\"", mapping.replace("$", "."), parameter.type().getName()));
						bindParamAttribute(aParam, parameter, field);
					}
				} catch (IllegalArgumentException e) {
					e.printStackTrace();
					log.error("error", e);
				} catch (InvocationTargetException e) {
					e.getTargetException().printStackTrace();
					log.error("error", e.getTargetException());
				}
			}
			
			aParam.checkRangeLegitimate(mapping);
			aParam.setMapping(mapping);
			
		} catch (InstantiationException | IllegalAccessException e) {
			e.printStackTrace();
			log.error("error", e);
		}
		return aParam;
	}
	
	/**
	 * 绑定验证参数类型属性
	 * @author Crap
	 * @param aParam {@AbstractParam} 实体
	 * @param param {@Parameter} 实体
	 * @param field {@AbstractParam} 属性
	 * @throws IllegalAccessException, IllegalArgumentException, InvocationTargetException
	 */
	private void bindParamAttribute(AbstractParam aParam, Parameter param, Field field) throws IllegalAccessException, IllegalArgumentException, InvocationTargetException {
		
		Attribute[] attrs = param.attribute();
		
		for (int i = 0; i < attrs.length; i++) {
			Attribute attr = attrs[i];
			if(field.getName().equals(attr.name())) {
				if(!String.class.isAssignableFrom(field.getType()))
					throw new ParamAttrNotMatchException(field.getDeclaringClass(), attr);
				
				field.set(aParam, attr.value());
				return;
			}
		}
		
		try {
			Method method = Parameter.class.getDeclaredMethod(field.getName());
			Object value = method.invoke(param);
			
			if(field.getType().equals(String.class) && value.equals("")) {
				field.set(aParam, null);
				return;
			} else if(field.getName().equals("defaultValue")) {
				/*List<String> vlist = new ArrayList<String>();
				String [] vArray = (String[]) value;
				
				for (String string : vArray) {
					vlist.add(string);
				}*/
				//field.set(aParam, vlist.size()>0? vlist : null);
				//field.set(aParam, vArray.length>0? vArray : null);
				String defaultValue = (String)value;
				field.set(aParam, defaultValue.equals("")?null:defaultValue);
				return;
			}
			field.set(aParam, value);
			
		} catch (NoSuchMethodException | SecurityException e) {
			log.warn("param:[{}] can not found match attribute:[{}] ", param.value(), field.getName());
		}
		
	}
	
	public CryptoCipher getCipher() {
		return cipher;
	}

	public void setCipher(CryptoCipher cipher) {
		this.cipher = cipher;
	}
}
