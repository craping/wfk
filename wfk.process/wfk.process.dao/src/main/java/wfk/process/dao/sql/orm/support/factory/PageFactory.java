package wfk.process.dao.sql.orm.support.factory;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Properties;

import org.springframework.beans.factory.FactoryBean;
import org.springframework.stereotype.Component;

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
@Component
public class PageFactory implements FactoryBean<IPage> {
	Properties dataSource = new Properties();
	PageDialect dialect;
	
	public PageFactory() {
		try {
			dataSource.load(PageFactory.class.getClassLoader().getResourceAsStream("dataSource-config.properties"));
			dialect = PageDialect.dialectOf(dataSource.getProperty("db.dialect"));
			
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	@Override
	public IPage getObject() throws Exception {
		 
		return dialect.getiPage();
	}

	@Override
	public Class<? extends IPage> getObjectType() {
		
		return dialect.getiPageClass();
	}

	@Override
	public boolean isSingleton() {
		
		return true;
	}

}
