package wfk.common.define.bean.result.stream;

import org.codehaus.jackson.map.annotate.JsonSerialize;

import wfk.common.define.bean.result.Errcode;
import wfk.common.define.bean.result.Result;
import com.thoughtworks.xstream.annotations.XStreamAlias;

@XStreamAlias("root")
@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
public class StreamResult extends Result {

	/**
	 * 
	 */
	private static final long serialVersionUID = -1091419979872311310L;
	
	protected StreamData data;
	
	public StreamResult() {}

	public StreamResult(Errcode errcode) {
		super(errcode);
	}
	
	public StreamResult(Errcode errcode, StreamData data) {
		super(errcode);
		this.data = data;
	}
	
	public StreamResult(Errcode errcode, String msg, StreamData data) {
		super(errcode, msg);
		this.data = data;
	}
	
	public StreamData getData() {
		return data;
	}

	public void setData(StreamData data) {
		this.data = data;
	}
}
