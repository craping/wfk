package wfk.common.define.bean.result.criteria;

import org.codehaus.jackson.map.annotate.JsonSerialize;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import wfk.common.define.bean.result.Errcode;
import wfk.common.define.bean.result.Result;
import com.thoughtworks.xstream.annotations.XStreamAlias;

@XStreamAlias("root")
@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)//jackson 1.x
@JsonInclude(Include.NON_NULL)//jackson 2.x
public class DataResult extends Result {

	/**
	 * 
	 */
	private static final long serialVersionUID = 8884509861114561764L;
	
	protected Data data;
	
	public DataResult() {}

	public DataResult(Errcode errcode) {
		super(errcode);
	}
	
	public DataResult(Errcode errcode, Data data) {
		super(errcode);
		this.data = data;
	}
	
	public DataResult(Errcode errcode, String msg, Data data) {
		super(errcode, msg);
		this.data = data;
	}
	
	public Data getData() {
		return data;
	}
	
	public void setData(Data data) {
		this.data = data;
	}
	
	
}
