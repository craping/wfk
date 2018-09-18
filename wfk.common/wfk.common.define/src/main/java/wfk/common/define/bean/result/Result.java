package wfk.common.define.bean.result;

import java.io.Serializable;

import com.thoughtworks.xstream.annotations.XStreamAlias;

@XStreamAlias("root")
public class Result implements Errcode,Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -1511555127957243218L;
	
	protected int result;	//返回值 0-成功，非0-失败
	
	protected int errcode;	//返回错误码 0-成功 非0-参见错误列表
	
	protected String msg;	//错误信息
	
	protected String html;	//用于渲染HTML
	
	public Result() {}
	
	public Result(int result) {
		this.result = result;
	}
	
	public Result(int result, int errcode) {
		this(result);
		this.errcode = errcode;
	}
	
	public Result(int result, int errcode, String msg) {
		this(result, errcode);
		this.msg = msg;
	}
	
	public Result(Errcode errcode) {
		this(errcode, errcode.getMsg());
	}
	
	public Result(Errcode errcode, String msg) {
		setErrcode(errcode, msg);
	}
	
	public Result renderHTML(String html){
		this.html = html;
		return this;
	}
	
	@Override
	public String toString() {
		if(this.html == null)
			return "{\"result\":"+result+",\"errcode\":"+errcode+",\"msg\":\""+msg+"\"}";
		return this.html;
	}

	public int getResult() {
		return result;
	}

	public void setResult(int result) {
		this.result = result;
	}

	public int getErrcode() {
		return errcode;
	}

	public void setErrcode(int errcode) {
		this.errcode = errcode;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}
	
	public void setErrcode(Errcode errcode) {
		this.result = errcode.getResult();
		this.errcode = errcode.getErrcode();
		this.msg = errcode.getMsg();
	}
	
	public void setErrcode(Errcode errcode, String msg) {
		this.result = errcode.getResult();
		this.errcode = errcode.getErrcode();
		this.msg = msg;
	}
}
