package wfk.process.biz.util.sql.support.filter;

/**
 * @since JDK 1.7
 * 
 * @author Crap
 * 
 * @version 1.4.3
 * 
 * @copyright 2013 - 2014 深圳亿码擎天科技有限公司 All rights reserved.
 * 
 * @description SQL过滤器
 */
public interface SqlFilter {

	public String toSql();
	
	public String toClearSql();
	
	public Object[] getValues();
}
