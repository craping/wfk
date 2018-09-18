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
public class SQLServer2005Page implements IPage {

	public String getLimitString(String paramString, Integer paramInt1, Integer paramInt2) {
		if(paramInt2 == null)
			return paramString;
		
		StringBuffer sql = new StringBuffer();
		if(paramInt1 == 0){
			sql.append("SELECT TOP ")
			.append(paramInt2)
			.append(paramString.substring(6));
		} else {
			sql.append("SELECT * FROM (SELECT ROW_NUMBER() OVER(ORDER BY (SELECT 0)) AS row$number,")
			.append(paramString.substring(6))
			.append(") T  WHERE row$number BETWEEN ")
			.append(paramInt1).append(" AND ")
			.append((paramInt1 + paramInt2));
		}
		return sql.toString();
	}

}
