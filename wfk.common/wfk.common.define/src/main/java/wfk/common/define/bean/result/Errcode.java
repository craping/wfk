package wfk.common.define.bean.result;

/** 
 * @project Crap
 * 
 * @author Crap
 * 
 * @Copyright 2013 - 2014 All rights reserved. 
 * 
 * @email 422655094@qq.com
 * 
 * 标准数据返回接口
 */
public interface Errcode {
	/** 
	 * 数据结果集
	 */
	public int getResult();
	/** 
	 * 数据错误码
	 */
	public int getErrcode();
	/** 
	 * 结果描述
	 */
	public String getMsg();
}
