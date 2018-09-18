package wfk.common.define.bean.medium;

import java.util.List;

public class JsonTCapacitys {
	
	private Object id;

    private Object code;

    private Object name;

    private Object type;

    private Object datatype;

    private Object description;

    private Object productId;
    
    private List<JsonTMessage> messages;

	public Object getId() {
		return id;
	}

	public void setId(Object id) {
		this.id = id;
	}

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

	public Object getType() {
		return type;
	}

	public void setType(Object type) {
		this.type = type;
	}

	public Object getDatatype() {
		return datatype;
	}

	public void setDatatype(Object datatype) {
		this.datatype = datatype;
	}

	public Object getDescription() {
		return description;
	}

	public void setDescription(Object description) {
		this.description = description;
	}

	public Object getProductId() {
		return productId;
	}

	public void setProductId(Object productId) {
		this.productId = productId;
	}

	public List<JsonTMessage> getMessages() {
		return messages;
	}

	public void setMessages(List<JsonTMessage> messages) {
		this.messages = messages;
	}
    
    
}
