package wfk.protocol.http.define.error;

import java.util.Locale;
import java.util.Properties;

import wfk.common.define.Configuration;
import wfk.common.define.error.LanguageErrcode;


public enum HttpErrors implements LanguageErrcode {
	/*
	 * 接口业务错误集,result=2
	 */
	DATA_NOT_EXIST(2, 2001, "数据不存在");
	
	
	public Locale defaultLanguage;	//默认语言
	{
		String prop = Configuration.getSysProp("sys.defaultLanguage");
		String[] language = null;
		if(prop != null && prop.contains("_"))
			language = prop.split("_");
		if(language != null && language.length > 1){
			defaultLanguage = new Locale(language[0],language[1]);
		}else{
			defaultLanguage = Locale.getDefault();
		}
	}
	private final int result;		//一级错误码
	private final int errcode;		//二级错误码
	private final String msg;		//错误描述
	
	private HttpErrors(int result) {
		this(result, null);
	}
	
	private HttpErrors(int result, String msg) {
		this.result = result;
		this.errcode = this.ordinal();
		String localMsg = matchMsg(name(), defaultLanguage);
		if(localMsg == null || localMsg.equals(""))
			this.msg = msg==null?("Error:["+name()+"]"):msg;
		else
			this.msg = localMsg;
	}
	
	private HttpErrors(int result, int errcode) {
		this(result, errcode, null);
	}
	
	private HttpErrors(int result, int errcode, String msg) {
		this.result = result;
		this.errcode = errcode;
		String localMsg = matchMsg(name(), defaultLanguage);
		if(localMsg == null || localMsg.equals(""))
			this.msg = msg==null?("Error:["+name()+"]"):msg;
		else
			this.msg = localMsg;
	}
	
	public int getResult() {
		return this.result;
	}
	public int getErrcode() {
		return this.errcode;
	}
	public String getMsg() {
		return this.msg;
	}
	public String getMsg(Locale locale){
		return matchMsg(name(), locale);
	}
	
	public LanguageErrcode LOCALE(final Locale locale){
		return new LanguageErrcode() {
			
			public int getResult() {
				return result;
			}
			
			public String getMsg() {
				return matchMsg(name(), locale);
			}
			
			public int getErrcode() {
				return errcode;
			}

			public LanguageErrcode LOCALE(Locale locale) {
				return HttpErrors.this.LOCALE(locale);
			}
		};
	}
	
	private static String matchMsg(String key, String language){
		Properties p = Configuration.getProp(language);
		if(p==null)
			return null;
		
		String msg = p.getProperty(key);
		
		return msg;
	}
	
	public static String matchMsg(String key, Locale locale){
		return matchMsg(key, locale.toString());
	}
	
	public static void main(String[] args) {
//		System.out.println(CustomErrors.USER_ERROR_TOKEN.errcode);
	}
}
