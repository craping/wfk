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
public class DefaultPage implements IPage {

	@Override
	public String getLimitString(String paramString, Integer paramInt1, Integer paramInt2) {
		return paramString;
	}

}
