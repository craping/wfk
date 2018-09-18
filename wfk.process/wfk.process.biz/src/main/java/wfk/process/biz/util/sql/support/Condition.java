package wfk.process.biz.util.sql.support;

import wfk.process.biz.util.sql.support.filter.SqlFilter;

/**
 * @since JDK 1.7
 * 
 * @author Crap
 * 
 * @version 1.4.3
 * 
 * @copyright 2013 - 2014 深圳亿码擎天科技有限公司 All rights reserved.
 * 
 * @description SQL逻辑条件生成类
 * 用于参数筛选
 */
public class Condition implements SqlFilter {
	
	private SqlFilter[] sqlfilters;
	
	public Condition() {
		this(new SqlFilter[0]);
	}
	
	public Condition(SqlFilter... sqlfilters) {
		this.sqlfilters = sqlfilters;
	}

	@Override
	public String toSql() {
		StringBuffer filterSql = new StringBuffer();
		
		if(this.sqlfilters != null) {
			for (int i = 0; i < this.sqlfilters.length; i++) {
				SqlFilter filter = this.sqlfilters[i];
				if(filter != null)
					filterSql.append(" ").append(filter.toSql());
			}
		}
		
		return filterSql.toString();
	}
	
	@Override
	public String toClearSql() {
		StringBuffer filterSql = new StringBuffer();
		
		if(this.sqlfilters != null && this.sqlfilters.length > 0) {
			filterSql.append(" ").append(this.sqlfilters[0].toClearSql());
			
			for (int i = 1; i < this.sqlfilters.length; i++) {
				SqlFilter filter = this.sqlfilters[i];
				if(filter != null)
					filterSql.append(" ").append(filter.toSql());
			}
		}
		
		return filterSql.toString();
	}
	
	public Object[] getValues() {

		Object[] allValues = new Object[getValuesLength()];
		int size = 0, destPos = 0;
		for (SqlFilter sqlfilter : sqlfilters) {
			size = sqlfilter.getValues().length;
			System.arraycopy(sqlfilter.getValues(), 0, allValues, destPos, size);
			destPos += size;
		}
		return allValues;
	}
	
	/*public Object[] getValues1() {

		Object[] allValues = new Object[getValuesLength()];

		int index = 0;
		for (SqlFilter sqlfilter : sqlfilters) {
			Object[] values = sqlfilter.getValues();
			
			for (int i = 0; i < values.length; i++) {
				allValues[index] = values[i];
				index ++;
			}
		}
		return allValues;
	}*/
	
	private int getValuesLength() {
		int count = 0;
		for (SqlFilter sqlfilter : sqlfilters) {
			count += sqlfilter.getValues().length;
		}
		return count;
	}

	public SqlFilter[] getSqlfilters() {
		return sqlfilters;
	}

	public void setSqlfilters(SqlFilter[] sqlfilters) {
		this.sqlfilters = sqlfilters;
	}
}
