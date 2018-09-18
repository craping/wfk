package wfk.process.dao.sql.orm.support;

import wfk.process.dao.sql.orm.IPage;

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
public class MySQLPage implements IPage {

	public String getLimitString(String paramString, Integer paramInt1, Integer paramInt2) {
		if(paramInt2 == null)
			return paramString;
		StringBuffer sql = new StringBuffer(paramString);
		sql.append(" LIMIT ").append(paramInt1).append(",").append(paramInt2);
		return sql.toString();
	}
	
}
