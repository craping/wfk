package wfk.common.define.bean.result.stream;

import java.util.HashMap;
import java.util.Map;

public class Header {
	
	protected Map<String, String> headers;
	
	protected Map<String, Long> dataHeader;
	/**
	 *文件名 
	 */
	//protected String fileName;
	
	public Header() {
	}
	
	public Header(Map<String, String> headers) {
		this.headers = headers;
	}
	
	public Header(String header, String value) {
		if(this.headers == null)
			this.headers = new HashMap<>();
		this.headers.put(header, value);
	}
	
	public Header(String header, Long value) {
		if(this.dataHeader == null)
			this.dataHeader = new HashMap<>();
		this.dataHeader.put(header, value);
	}
	
	public void setHeader(String header, String value) {
		if(this.headers == null)
			this.headers = new HashMap<>();
		this.headers.put(header, value);
	}
	
	public void setDataHeader(String header, Long value) {
		if(this.dataHeader == null)
			this.dataHeader = new HashMap<>();
		this.dataHeader.put(header, value);
	}
	
	public Map<String, String> getHeaders() {
		return headers;
	}

	public void setHeaders(Map<String, String> headers) {
		this.headers = headers;
	}
	public Map<String, Long> getDataHeader() {
		return dataHeader;
	}

	public void setDataHeader(Map<String, Long> dataHeader) {
		this.dataHeader = dataHeader;
	}

}
