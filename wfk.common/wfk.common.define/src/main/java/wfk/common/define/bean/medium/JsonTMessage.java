package wfk.common.define.bean.medium;

import java.util.List;

public class JsonTMessage {
	
	private Object directivity;
	
	private JsonTCmd req;
	
	private List<JsonTCmd> resps;

	public Object getDirectivity() {
		return directivity;
	}

	public void setDirectivity(Object directivity) {
		this.directivity = directivity;
	}

	public JsonTCmd getReq() {
		return req;
	}

	public void setReq(JsonTCmd req) {
		this.req = req;
	}

	public List<JsonTCmd> getResps() {
		return resps;
	}

	public void setResps(List<JsonTCmd> resps) {
		this.resps = resps;
	}

	
}
