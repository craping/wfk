package wfk.process.biz.util.sql.support;

import java.util.Map;

import wfk.common.define.bean.result.criteria.Page;
import wfk.process.biz.util.sql.support.sort.SortExt;
import wfk.process.biz.util.sql.support.sort.SortFilter;

/**
 * @author Crap
 * 
 * @date 2015-06-26
 * 
 * @copyright 深圳阿猫阿狗网络科技有限公司 All rights reserved.
 * 
 * @description SQL分页,排序条件生成类
 * 用于分页,排序SQL构造
 */
public class ProfileExt extends Profile {
	
	private Page page;
	
	private SortFilter sortFilter;
	
	public ProfileExt() {
		this.page = new Page(1);
	}
	
	public ProfileExt(Map<String,String> params) {
		this(new Page(params), new SortExt(params));
	}
	
	public ProfileExt(Page page, SortFilter sortFilter) {
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
