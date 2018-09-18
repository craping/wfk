package wfk.common.define.bean.medium;

import java.util.List;

import org.codehaus.jackson.map.annotate.JsonSerialize;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)//jackson 1.x
@JsonInclude(Include.NON_NULL)//jackson 2.x
public class JsonProduct {
	
	private Object code;

	private Object[] serviceCode;
	
    private Object name;

    private Object model;
    
    private Object type;

    private Object chip;

    private Object icon;
    
    private Object describe;

    private Object createtime;

    private Object joinType;

    private Object msgAlignment;

    private Object deviceAuthorization;
    
    private List<JsonCapacitys> capacitys;

	public Object getCode() {
		return code;
	}

	public void setCode(Object code) {
		this.code = code;
	}

	public Object getName() {
		return name;
	}

	public void setName(Object name) {
		this.name = name;
	}

	public Object getModel() {
		return model;
	}

	public void setModel(Object model) {
		this.model = model;
	}

	public Object getType() {
		return type;
	}

	public void setType(Object type) {
		this.type = type;
	}

	public Object getChip() {
		return chip;
	}

	public void setChip(Object chip) {
		this.chip = chip;
	}

	public Object getIcon() {
		return icon;
	}

	public void setIcon(Object icon) {
		this.icon = icon;
	}

	public Object getDescribe() {
		return describe;
	}

	public void setDescribe(Object describe) {
		this.describe = describe;
	}

	public Object getCreatetime() {
		return createtime;
	}

	public void setCreatetime(Object createtime) {
		this.createtime = createtime;
	}

	public Object getJoinType() {
		return joinType;
	}

	public void setJoinType(Object joinType) {
		this.joinType = joinType;
	}

	public Object getMsgAlignment() {
		return msgAlignment;
	}

	public void setMsgAlignment(Object msgAlignment) {
		this.msgAlignment = msgAlignment;
	}

	public Object getDeviceAuthorization() {
		return deviceAuthorization;
	}

	public void setDeviceAuthorization(Object deviceAuthorization) {
		this.deviceAuthorization = deviceAuthorization;
	}

	public List<JsonCapacitys> getCapacitys() {
		return capacitys;
	}

	public void setCapacitys(List<JsonCapacitys> capacitys) {
		this.capacitys = capacitys;
	}

	public Object[] getServiceCode() {
		return serviceCode;
	}

	public void setServiceCode(Object[] serviceCode) {
		this.serviceCode = serviceCode;
	}
	
}
