package wfk.common.define.bean.medium;

import java.util.List;

import org.codehaus.jackson.map.annotate.JsonSerialize;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)//jackson 1.x
@JsonInclude(Include.NON_NULL)//jackson 2.x
public class JsonMessage {
	
	private Object directivity;
	
	private JsonCmd req;
	
	private List<JsonCmd> resps;

	public Object getDirectivity() {
		return directivity;
	}

	public void setDirectivity(Object directivity) {
		this.directivity = directivity;
	}

	public JsonCmd getReq() {
		return req;
	}

	public void setReq(JsonCmd req) {
		this.req = req;
	}

	public List<JsonCmd> getResps() {
		return resps;
	}

	public void setResps(List<JsonCmd> resps) {
		this.resps = resps;
	}
	
	
}
