package wfk.process.biz.util.sql.support;

import java.util.Map;

import wfk.common.define.bean.result.criteria.Page;
import wfk.common.define.util.StringUtil;
import wfk.process.biz.util.sql.support.sort.Sort;
import wfk.process.biz.util.sql.support.sort.SortFilter;

/**
 * @since JDK 1.7
 * 
 * @author Crap
 * 
 * @version 1.4.3
 * 
 * @copyright 2013 - 2014 深圳亿码擎天科技有限公司 All rights reserved.
 * 
 * @description SQL拼接逻辑枚举
 * (已过期 请参照 {@link Profile})
 */
@Deprecated
public class ProfileCondition {
	
	private Condition[] conditions;

	private Page page;
	
	private SortFilter sortFilter;
	
	private Object[] sqlParams;
	
	private String sql;
	
	private String countSql;
	
	public ProfileCondition(String sql, Object[] sqlParams, Condition... conditions) {
		this(sql, sqlParams, null, conditions);
	}
	
	public ProfileCondition(String sql, Object[] sqlParams, Map<String,String> params, Condition... conditions) {
		this.sql = sql;
		this.sqlParams = sqlParams;
		this.page = new Page(params);
		this.sortFilter = new Sort(params);
		this.conditions = conditions;
		init();
	}

	public void init() {
		int length = this.sqlParams.length;
		Object[][] values = new Object[this.conditions.length][];
		
		for (int i = 0; i < this.conditions.length; i++) {
			values[i] = this.conditions[i].getValues();
			length += values[i].length;
		}
		
		int splitLength,index = 0, lastIndex = 0;
		Object[] allParams = new Object[length];
		
		String[] splitSql = StringUtil.split(this.sql, "{p}");
		splitLength = splitSql.length==1? 1 : splitSql.length - 1;
		for (int i = 0; i < splitLength; i++) {
			
			int count = StringUtil.countMatches(splitSql[i], "?");
			for (int j = lastIndex; j < count; j++) {
				allParams[index] = this.sqlParams[j];
				index ++;
			}
			lastIndex += count;
			for (Object value : values[i]) {
				allParams[index] = value;
				index ++;
			}
			
			splitSql[i] += this.conditions[i].toSql();
		}
		
		this.sqlParams = allParams;
		this.sql = StringUtil.toString(splitSql) + sortFilter.toSql();
	}
	
	public Condition[] getConditions() {
		return conditions;
	}

	public void setConditions(Condition[] conditions) {
		this.conditions = conditions;
	}

	public Page getPage() {
		return page;
	}

	public void setPage(Page page) {
		this.page = page;
	}

	public SortFilter getSortFilter() {
		return sortFilter;
	}

	public void setSortFilter(SortFilter sortFilter) {
		this.sortFilter = sortFilter;
	}

	public Object[] getSqlParams() {
		return sqlParams;
	}

	public void setSqlParams(Object[] sqlParams) {
		this.sqlParams = sqlParams;
	}

	public String getSql() {
		return sql;
	}

	public void setSql(String sql) {
		this.sql = sql;
	}

	public String getCountSql() {
		return countSql;
	}

	public void setCountSql(String countSql) {
		this.countSql = countSql;
	}	
}
