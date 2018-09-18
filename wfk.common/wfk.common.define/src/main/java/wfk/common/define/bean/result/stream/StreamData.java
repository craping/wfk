package wfk.common.define.bean.result.stream;

import java.util.Map;

import org.codehaus.jackson.annotate.JsonProperty;
import org.codehaus.jackson.map.annotate.JsonSerialize;

import wfk.common.define.bean.ByteOutputStream;

@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
public class StreamData {
	
	protected Header header;
	
	@JsonProperty
	protected ByteOutputStream info;		//数据流
	
	public StreamData() {}
	
	public StreamData(Header header) {
		this.header = header;
	}
	public StreamData(ByteOutputStream info) {
		this.info = info;
	}
	
	public StreamData(Header header, ByteOutputStream info) {
		this.header = header;
		this.info = info;
	}
	
	
	public StreamData(String header, String value) {
		this.header = new Header(header, value);
	}
	
	public StreamData(Map<String, String> headers) {
		this.header = new Header(headers);
	}
	public StreamData(Map<String, String> headers, ByteOutputStream info) {
		this.header = new Header(headers);
		this.info = info;
	}
	
	public ByteOutputStream getInfo() {
		return info;
	}

	public void setInfo(ByteOutputStream info) {
		this.info = info;
	}

	public Header getHeader() {
		return header;
	}

	public void setHeader(Header header) {
		this.header = header;
	}
	
}
