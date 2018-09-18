package wfk.protocol.http.define.param;

import javax.servlet.http.HttpServletRequest;

import wfk.common.define.bean.result.Errcode;
import wfk.common.define.error.support.Errors;
import wfk.common.define.util.StringUtil;
import wfk.protocol.http.core.validate.exception.ParamFormatException;
import wfk.protocol.http.core.validate.exception.ParamOutOfEnumsRangeException;
import wfk.protocol.http.core.validate.exception.ValidationException;
import wfk.protocol.http.core.validate.support.param.StringParam;

public class SortParam extends StringParam {
	
	public SortParam() {
		this.value = "sort_order";
		this.desc = "排序. 参数格式:[字段名,字段名,[...],排序方式|[字段名,字段名,[...],排序方式]|[...]]";
		this.required = false;
	}
	
	@Override
	protected Errcode validateValue(HttpServletRequest request, String paramString) throws ValidationException {
		if(paramString == null || paramString.equals(""))
			throw new ParamFormatException(this);
		String[] orders = StringUtil.split(paramString, "|");
		if(orders.length == 0 || orders[0].equals(""))
			throw new ParamFormatException(this);
		
		for (String orderString : orders) {
			String[] order = StringUtil.split(orderString, ",");
			
			if(order.length == 0 || order[0].equals(""))
				throw new ParamFormatException(this);
			
			if(order.length > 1 && !order[1].equals("")) {
				validateSortEnumsRange(order[1], new String[]{"ASC", "DESC"});
			}
		}
		
		return Errors.OK;
	}
	
	@Override
	protected Errcode validateEnumsRange(String paramString) throws ValidationException {
		return super.validateEnumsRange(StringUtil.split(paramString, ",")[0]);
	}
	
	private void validateSortEnumsRange(String paramString, String[] enums) throws ValidationException {
		for (int i = 0; i < enums.length; i++) {
			if(String.valueOf(paramString).equalsIgnoreCase(enums[i]))
				return;
		}
		throw new ParamOutOfEnumsRangeException(this, enums);
	}
	
	@Override
	protected boolean validateMin(String paramString) {
		return true;
	}

	@Override
	protected boolean validateMax(String paramString) {
		return true;
	}
}
