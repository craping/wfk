package wfk.process.dao.sql.orm;

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
public abstract interface IPage {
	
	public abstract String getLimitString(String paramString, Integer paramInt1, Integer paramInt2);
}
