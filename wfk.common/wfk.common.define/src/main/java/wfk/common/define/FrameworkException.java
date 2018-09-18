package wfk.common.define;

/** 
 * @project Crap
 * 
 * @author Crap
 * 
 * @Copyright 2013 - 2014 All rights reserved. 
 * 
 * @email 422655094@qq.com
 * 
 */
public class FrameworkException extends Exception {
	
	private static final long serialVersionUID = -3275698556861545365L;
	
	public FrameworkException() {}
	
	public FrameworkException(String msg) {
		super(msg);
	}
	
	public FrameworkException(String code, String message) {
        super("CODE=[" + code + "]; MSG=[" + message + "]");
    }

    public FrameworkException(String code, String message, Throwable cause) {
        super("CODE=[" + code + "]; MSG=[" + message + "]", cause);
    }

    public FrameworkException(Throwable cause) {
        super(cause);
    }
}
