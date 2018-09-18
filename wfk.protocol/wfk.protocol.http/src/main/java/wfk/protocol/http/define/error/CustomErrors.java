package wfk.protocol.http.define.error;

import java.util.Locale;
import java.util.Properties;

import wfk.common.define.Configuration;
import wfk.common.define.Constant;
import wfk.common.define.error.LanguageErrcode;


public enum CustomErrors implements LanguageErrcode {

	/*
	 * 系统错误集,result=201
	 */
	SYS_ERROR_ODE(201,"验证码错误"),
	
	/*
	 * 接口错误集,result=3
	 */
	USER_ERROR_NONE(3, "用户名不能为空"),
	USER_ERROR_TOKEN(3,399, "用户未登录或失效"),
	USER_ERROR_ACCESSTOKEN(4,400,"需要校验交易密码"),
	USER_ERROR_ACCOUNT(3,398, "用户不存在或密码错误"),
	USER_ERROR_CODE(3,"为了您的安全，请输入验证码"),
	USER_ERROR_EXIST(3, "用户已存在"),
	USER_ERROR_EMAIL_EXIST(3, "该邮箱已被注册"),
	USER_ERROR_PHONE_EXIST(3, "该手机号码已被注册"),
	USER_ERROR_NOT_EXIST(3, "用户不存在"),
	USER_ERROR_PASSWORD(3, "密码错误"),
	USER_ERROR_OLD_PASSWORD(3, "原始密码错误"),
	USER_ERROR_QUESTION_EMPTY(3, "请先设置安全问题"),
	USER_ERROR_QUESTION(3, "安全问题错误"),
	USER_ERROR_MAIL(3, "邮件发送失败"),
	USER_ERROR_SMS(3, "短信发送失败"),
	USER_ERROR_SMS_CHECK(3, "短信验证码错误或不存在"),
	USER_ERROR_SMS_UNCHECK(3, "手机号码未验证"),
	USER_ERROR_SMS_EXPIRE(3, "短信验证码过期"),
	USER_ERROR_SMS_LIMIT_REPEAT(3, "操作太频繁请稍后再试"),
	USER_ERROR_SMS_LIMIT_DAY(3, "该账号已达到今日发送上限"),
	USER_ERROR_COMMENT_EXIST(3, "已经评论过"),
	USER_ERROR_COMMENT_NO_BUY(3, "购买过此商品才可评论"),
	
	USER_ERROR_SIGNIN_EXIST(3, "今天已经签到过"),
	
	PRODUT_ERROR_CHIP_NOT_MATCH(3, "产品芯片不匹配"),
	/*
	 * op错误集,result=5
	 */
	OP_OPRATE_SUCCESS(0,502,"操作成功"),
	OP_USER_RESET_PASSWORD(0, "密码重置成功，重置后密码为："+Constant.System.DEFAULT_PASSWORD),
	
	OP_USER_ERROR_TOKEN(5,501, "用户未登录或失效"),
	OP_USER_ERROR_ACCOUNT(5, "用户不存在或密码错误"),
	OP_USER_ERROR_PASSWORD(5, "原始密码错误"),
	OP_USER_ERROR_OPER_PASSWORD(5, "原始操作密码错误"),
	OP_USER_ERROR_EXIST(5, "用户已存在"),
	OP_USER_OLDPWD_ERROR(5,"旧密码输入有误"),
	OP_USER_FILE_ERROR(5,"请上传APK文件"),
	OP_USER_FILE_EXIST(5,"上传的APK文件已经存在"),
	
	OP_AUTH_ERROR_NOAUTH(5, "您没有此操作的权限"),
	OP_AUTH_GROUP_ERROR_EXIST(5, "该权限组已存在"),	
	OP_AUTH_GROUP_ERROR_DELETE(5, "该权限组下面还有所属用户，不能删除此权限组");
	
	
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
	
	private CustomErrors(int result) {
		this(result, null);
	}
	
	private CustomErrors(int result, String msg) {
		this.result = result;
		this.errcode = this.ordinal();
		String localMsg = matchMsg(name(), defaultLanguage);
		if(localMsg == null || localMsg.equals(""))
			this.msg = msg==null?("Error:["+name()+"]"):msg;
		else
			this.msg = localMsg;
	}
	
	private CustomErrors(int result, int errcode) {
		this(result, errcode, null);
	}
	
	private CustomErrors(int result, int errcode, String msg) {
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
				return CustomErrors.this.LOCALE(locale);
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
