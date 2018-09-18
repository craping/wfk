package wfk.common.define.bean.medium;

import java.util.List;

import org.codehaus.jackson.map.annotate.JsonSerialize;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)//jackson 1.x
@JsonInclude(Include.NON_NULL)//jackson 2.x
public class JsonCapacitys {
	
	private Object code;

    private Object name;

    private Object dataType;
    
    private Object capacityType;

    private Object describe;
    
    private List<JsonMessage> messages;

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

	public Object getDataType() {
		return dataType;
	}

	public void setDataType(Object dataType) {
		this.dataType = dataType;
	}

	public Object getCapacityType() {
		return capacityType;
	}

	public void setCapacityType(Object capacityType) {
		this.capacityType = capacityType;
	}

	public Object getDescribe() {
		return describe;
	}

	public void setDescribe(Object describe) {
		this.describe = describe;
	}

	public List<JsonMessage> getMessages() {
		return messages;
	}

	public void setMessages(List<JsonMessage> messages) {
		this.messages = messages;
	}


}
