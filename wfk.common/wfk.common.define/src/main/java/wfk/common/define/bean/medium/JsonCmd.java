package wfk.common.define.bean.medium;

import org.codehaus.jackson.annotate.JsonIgnore;
import org.codehaus.jackson.map.annotate.JsonSerialize;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.thoughtworks.xstream.annotations.XStreamOmitField;

@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)//jackson 1.x
@JsonInclude(Include.NON_NULL)//jackson 2.x
public class JsonCmd {
	
	protected Object code;
	
	protected Object uuid;
	
	protected Object handle;
	
	protected Object descriptor;
	
	protected Object val;
	
	protected Object count;
	
	protected Object valAnalytical;
	
	@XStreamOmitField
	@JsonIgnore//jackson 1.x
	@com.fasterxml.jackson.annotation.JsonIgnore//jackson 2.x
	protected Object valCalc;
	
	@XStreamOmitField
	@JsonIgnore//jackson 1.x
	@com.fasterxml.jackson.annotation.JsonIgnore//jackson 2.x
	protected Object orderNo;

	public Object getCode() {
		return code;
	}

	public void setCode(Object code) {
		this.code = code;
	}

	public Object getUuid() {
		return uuid;
	}

	public void setUuid(Object uuid) {
		this.uuid = uuid;
	}

	public Object getHandle() {
		return handle;
	}

	public void setHandle(Object handle) {
		this.handle = handle;
	}

	public Object getDescriptor() {
		return descriptor;
	}

	public void setDescriptor(Object descriptor) {
		this.descriptor = descriptor;
	}

	public Object getVal() {
		return val;
	}

	public void setVal(Object val) {
		this.val = val;
	}

	public Object getCount() {
		return count;
	}

	public void setCount(Object count) {
		this.count = count;
	}

	public Object getValAnalytical() {
		return valAnalytical;
	}

	public void setValAnalytical(Object valAnalytical) {
		this.valAnalytical = valAnalytical;
	}

	public Object getValCalc() {
		return valCalc;
	}

	public void setValCalc(Object valCalc) {
		this.valCalc = valCalc;
	}

	public Object getOrderNo() {
		return orderNo;
	}

	public void setOrderNo(Object orderNo) {
		this.orderNo = orderNo;
	}
	
	
}
