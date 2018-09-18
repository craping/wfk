package wfk.protocol.http.core.validate.support.param;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import wfk.common.define.bean.result.Errcode;
import wfk.common.define.error.support.Errors;
import wfk.protocol.http.core.validate.exception.ValidationException;
import wfk.protocol.http.core.validate.support.AbstractParam;

/** 
 * @project Crap
 * 
 * @author Crap
 * 
 * @Copyright 2013 - 2014 All rights reserved. 
 * 
 * @email 422655094@qq.com
 * 
 *	枚举参数
 *	继承该类,将 {@link #E} 中所有属性 作为枚举范围验证
 *	类本身不参与验证
 */
public abstract class EnumParam extends AbstractParam {
	
	protected Object E;
	
	public EnumParam(Object E) {
		this.E = E;
		genEnums(E);
	}
	
	protected void genEnums(Object E) {
		if(E == null)
			return;
		
		List<String> eList = null;
		
		if(E instanceof Enum<?>[]){
			eList = AnalysisEnum((Enum<?>[]) E);
		}else if(E.getClass().isArray()){
			Object[] array = (Object[]) E;
			this.enums = new String[array.length];
			for (int i = 0; i < array.length; i++) {
				this.enums[i] = array[i].toString();
			}
		}else{
			eList = AnalysisClass(E);
		}
		this.enums = new String[eList.size()];
		eList.toArray(this.enums);
	}
	
	
	protected List<String> AnalysisClass(Object E) {
		List<String> eList = new ArrayList<>();
		
		Field[] fields = E.getClass().getFields();
		for (Field field : fields) {
			if(!field.getType().isPrimitive())
				continue;
			try {
				eList.add(field.get(E).toString());
			} catch (IllegalArgumentException | IllegalAccessException e) {
				e.printStackTrace();
			}
		}
		
		return eList;
	}
	
	protected List<String> AnalysisEnum(Enum<?>[] enums) {
		List<String> eList = new ArrayList<>();
		for (Enum<?> e : enums) {
			eList.add(e.name());
		}
		
		return eList;
	}
	
	@Override
	protected Errcode validateValue(HttpServletRequest request, String paramString) throws ValidationException {
		return Errors.OK;
	}

	@Override
	protected boolean validateMin(String paramString) {
		return true;
	}

	@Override
	protected boolean validateMax(String paramString) {
		return true;
	}

	public Object getE() {
		return E;
	}

	public void setE(Object e) {
		E = e;
	}
	
}
