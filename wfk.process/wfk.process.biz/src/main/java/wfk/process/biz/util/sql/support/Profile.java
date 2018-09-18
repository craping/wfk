package wfk.process.biz.util.sql.support;

import java.util.Map;

import wfk.common.define.bean.result.criteria.Page;
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
 * @description SQL分页,排序条件生成类
 * 用于分页,排序SQL构造
 */
public class Profile implements SortFilter {
	
	private Page page;
	
	private SortFilter sortFilter;
	
	public Profile() {
		this.page = new Page(1);
	}
	
	public Profile(Map<String,String> params) {
		this(new Page(params), new Sort(params));
	}
	
	public Profile(Page page, SortFilter sortFilter) {
		this.page = page;
		this.sortFilter = sortFilter;
	}
	
	public String toSql(String sql) {
		if(this.sortFilter !=null)
			return sql + " " + this.sortFilter.toSql();
		return sql;
	}
	
	public String toSql() {
		if(this.sortFilter ==null)
			return "";
		return this.sortFilter.toSql();
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
}
