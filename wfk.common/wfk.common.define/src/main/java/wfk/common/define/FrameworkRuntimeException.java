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
public class FrameworkRuntimeException extends RuntimeException {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1376483386393288855L;

	public FrameworkRuntimeException() {}
	
	public FrameworkRuntimeException(String msg) {
		super(msg);
	}
	
	public FrameworkRuntimeException(String code, String message) {
        super("CODE=[" + code + "]; MSG=[" + message + "]");
    }

    public FrameworkRuntimeException(String code, String message, Throwable cause) {
        super("CODE=[" + code + "]; MSG=[" + message + "]", cause);
    }

    public FrameworkRuntimeException(Throwable cause) {
        super(cause);
    }
}
