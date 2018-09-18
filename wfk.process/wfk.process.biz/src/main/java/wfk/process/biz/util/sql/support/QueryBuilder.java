package wfk.process.biz.util.sql.support;

/**
 * @since JDK 1.7
 * 
 * @author Crap
 * 
 * @version 1.4.3
 * 
 * @copyright 2013 - 2014 深圳亿码擎天科技有限公司 All rights reserved.
 * 
 * @description SQL拼接类
 * 用于生成SQL语句
 */
public class QueryBuilder {
	
	private String sql;
	
	private String countSql;
	
	private Condition condition;
	
	private Profile profile;
	
	private Object[] sqlParams;
	
	public QueryBuilder(String sql) {
		this(sql, null, null, null);
	}
	
	public QueryBuilder(String sql, String countSql) {
		this(sql, countSql, null, null);
	}
	
	public QueryBuilder(String sql, Condition condition) {
		this(sql, null, condition);
	}
	
	public QueryBuilder(String sql, Profile profile) {
		this(sql, null, null, profile);
	}
	
	public QueryBuilder(String sql, String countSql, Profile profile) {
		this(sql, countSql, null, new Profile());
	}
	
	public QueryBuilder(String sql, String countSql, Condition condition) {
		this(sql, countSql, condition, new Profile());
	}
	
	public QueryBuilder(String sql, Condition condition, Profile profile) {
		this(sql, null, condition, profile);
	}
	
	public QueryBuilder(String sql, String countSql, Condition condition, Profile profile) {
		this.sql = sql;
		this.countSql = countSql==null?sql.replaceFirst("select.*?from", "select count(0) from") : countSql;
		this.condition = condition;
		this.profile = profile;
		if(this.condition!=null)
			this.sqlParams = this.condition.getValues();
	}
	
	
	public String getSql() {
		String sqlTemp = this.sql;
		if(this.condition != null)
			sqlTemp += " " + this.condition.toSql();
		if(this.profile != null)
			sqlTemp += " " + this.profile.toSql();
		return sqlTemp;
	}

	public void setSql(String sql) {
		this.sql = sql;
	}

	public String getCountSql() {
		if(this.condition != null)
			this.countSql += " " + this.condition.toSql();
		return countSql;
	}

	public void setCountSql(String countSql) {
		this.countSql = countSql;
	}

	public Condition getCondition() {
		return condition;
	}

	public void setCondition(Condition condition) {
		this.condition = condition;
	}

	public Profile getProfile() {
		return profile;
	}

	public void setProfile(Profile profile) {
		this.profile = profile;
	}

	public Object[] getSqlParams() {
		return sqlParams;
	}
	
	public void setSqlParams(Object[] sqlParams) {
		this.sqlParams = sqlParams;
	}
	
	public static void main(String[] args) {
		String sql = "select sum(if(t1.id is null,0,1)) appNum,t.* from t_product_application_relation t1 right join (select sum(if(t2.id is null,0,1)) capacitysNum,t1.* from t_product t1 left join t_capacitys t2 on t2.product_id=t1.id where t1.state != ? group by t1.id) t on t.id=t1.product_id";
		System.out.println(sql.replaceFirst("select.*?from", "select count(0) from"));
	}
	
}
