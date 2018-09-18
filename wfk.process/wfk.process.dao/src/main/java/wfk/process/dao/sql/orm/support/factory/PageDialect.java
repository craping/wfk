package wfk.process.dao.sql.orm.support.factory;

import wfk.process.dao.sql.orm.IPage;
import wfk.process.dao.sql.orm.support.DefaultPage;
import wfk.process.dao.sql.orm.support.MySQLPage;
import wfk.process.dao.sql.orm.support.SQLServer2005Page;

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
public enum PageDialect {
	Default("default", new DefaultPage(), DefaultPage.class),
	MySQL5("org.hibernate.dialect.MySQL5Dialect", new MySQLPage(), MySQLPage.class),
	//Microsoft_SQLServer2000("org.hibernate.dialect.SQLServerDialect", null, null),
	Microsoft_SQLServer2005("org.hibernate.dialect.SQLServer2005Dialect", new SQLServer2005Page(), SQLServer2005Page.class),
	Microsoft_SQLServer2008("org.hibernate.dialect.SQLServer2008Dialect", new SQLServer2005Page(), SQLServer2005Page.class);
	
	private final String dialect;
	private final IPage iPage;
	private final Class<? extends IPage> iPageClass;
	
	private PageDialect(String dialect, IPage iPage, Class<? extends IPage> iPageClass) {
		this.dialect = dialect;
		this.iPage = iPage;
		this.iPageClass = iPageClass;
	}

	public String getDialect() {
		return dialect;
	}

	public IPage getiPage() {
		return iPage;
	}
	
	public Class<? extends IPage> getiPageClass() {
		return iPageClass;
	}

	public static PageDialect dialectOf(String dialect){
		for (PageDialect pageDialect : values()) {
			if(pageDialect.dialect.equalsIgnoreCase(dialect))
				return pageDialect;
		}
		return Default;
	}
}
