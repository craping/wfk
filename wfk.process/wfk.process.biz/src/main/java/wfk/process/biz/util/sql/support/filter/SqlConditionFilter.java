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
 * @description SQL字段过滤接口
 */
public interface SqlConditionFilter extends  SqlFilter{
	
	public SqlFilter equal(Object value);
	
	public SqlFilter notEqual(Object value);
	
	public SqlFilter lessThan(Object value);
	
	public SqlFilter lessThanOrEqual(Object value);
	
	public SqlFilter greaterThan(Object value);
	
	public SqlFilter greaterThanOrEqual(Object value);
	
	public SqlFilter greaterLessThan(Object value1, Object value2);
	
	public SqlFilter greaterLessThanOrEqual(Object value1, Object value2);
	
	public SqlFilter contanis(Object value);
	
	public SqlFilter notContanis(Object value);
	
	public SqlFilter beginWith(Object value);
	
	public SqlFilter endWith(Object value);
	
	public SqlFilter isNull();
	
	public SqlFilter isNotNull();
	
	public SqlFilter isEmpty();
	
	public SqlFilter isNotEmpty();
	
	public SqlFilter betweenWith(Object value1, Object value2);
	
	public SqlFilter notBetweenWith(Object value1, Object value2);
	
	public SqlFilter in(Object[] values);
	
	public SqlFilter notIn(Object[] values);
}
