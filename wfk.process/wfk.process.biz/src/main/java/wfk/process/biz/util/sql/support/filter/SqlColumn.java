package wfk.process.biz.util.sql.support.filter;

import wfk.process.biz.util.sql.Logic;

/**
 * @since JDK 1.7
 * 
 * @author Crap
 * 
 * @version 1.4.3
 * 
 * @copyright 2013 - 2014 深圳亿码擎天科技有限公司 All rights reserved.
 * 
 * @description SQL字段过滤类
 */
public class SqlColumn implements SqlConditionFilter {
	
	protected Logic logic;
	
	protected String column;
	
	protected String condition;
	
	protected SqlFilter filter;
	
	protected Object[] values = {};
	
	public SqlColumn(Logic logic) {
		this(logic, "");
	}
	
	public SqlColumn(String column) {
		this(Logic.AND, column);
	}
	
	public SqlColumn(Logic logic, String column) {
		this.filter = new ConditionFilter();
		this.logic = logic;
		this.column = column;
	}
	
	public SqlFilter values(Object... value) {
		this.values = value;
		return this;
	}
	
	public SqlFilter equal(Object value) {
		if(value != null) {
			this.values = new Object[]{value};
			this.condition = "=?";
		} else {
			this.condition = "";
		}
		return this.filter;
	}
	
	public SqlFilter notEqual(Object value) {
		if(value != null) {
			this.values = new Object[]{value};
			this.condition = "!=?";
		} else {
			this.condition = "";
		}
		return this.filter;
	}
	
	public SqlFilter lessThan(Object value) {
		if(value != null) {
			this.values = new Object[]{value};
			this.condition = "<?";
		} else {
			this.condition = "";
		}
		return this.filter;
	}
	
	public SqlFilter lessThanOrEqual(Object value) {
		if(value != null) {
			this.values = new Object[]{value};
			this.condition = "<=?";
		} else {
			this.condition = "";
		}
		return this.filter;
	}
	
	public SqlFilter greaterThan(Object value) {
		if(value != null) {
			this.values = new Object[]{value};
			this.condition = ">?";
		} else {
			this.condition = "";
		}
		return this.filter;
	}
	
	public SqlFilter greaterThanOrEqual(Object value) {
		if(value != null) {
			this.values = new Object[]{value};
			this.condition = ">=?";
		} else {
			this.condition = "";
		}
		return this.filter;
	}
	
	public SqlFilter greaterLessThan(Object value1, Object value2) {
		String greaterThanSql = greaterThan(value1).toClearSql();
		String lessThanSql = lessThan(value2).toClearSql();
		
		if(!greaterThanSql.equals("") && !lessThanSql.equals("")) {
			this.values = new Object[]{value1, value2};
			this.condition = "(" + greaterThanSql + " AND "  + lessThanSql + ")";
		} else {
			if(!greaterThanSql.equals(""))
				this.values = new Object[]{value1};
			if(!lessThanSql.equals(""))
				this.values = new Object[]{value2};
			this.condition = greaterThanSql + lessThanSql;
		}
		this.column = "";
		return this.filter;
	}
	
	public SqlFilter greaterLessThanOrEqual(Object value1, Object value2) {
		String greaterThanOrEqualSql = greaterThanOrEqual(value1).toClearSql();
		String lessThanOrEqualSql = lessThanOrEqual(value2).toClearSql();
		
		if(!greaterThanOrEqualSql.equals("") && !lessThanOrEqualSql.equals("")) {
			this.values = new Object[]{value1, value2};
			this.condition = "(" + greaterThanOrEqualSql + " AND "  + lessThanOrEqualSql + ")";
		} else {
			if(!greaterThanOrEqualSql.equals(""))
				this.values = new Object[]{value1};
			if(!lessThanOrEqualSql.equals(""))
				this.values = new Object[]{value2};
			this.condition = greaterThanOrEqualSql + lessThanOrEqualSql;
		}
		this.column = "";
		return this.filter;
	}
	
	
	public SqlFilter contanis(Object value) {
		if(value != null) {
			this.values = new Object[]{"%" + value + "%"};
			this.condition = " LIKE ?";
		} else {
			this.condition = "";
		}
		return this.filter;
	}
	
	public SqlFilter notContanis(Object value) {
		if(value != null) {
			this.values = new Object[]{"%" + value + "%"};
			this.condition = " NOT LIKE ?";
		} else {
			this.condition = "";
		}
		return this.filter;
	}
	
	public SqlFilter beginWith(Object value) {
		if(value != null) {
			this.values = new Object[]{value + "%"};
			this.condition = " LIKE ?";
		} else {
			this.condition = "";
		}
		return this.filter;
	}
	
	public SqlFilter endWith(Object value) {
		if(value != null) {
			this.values = new Object[]{"%" + value};
			this.condition = " LIKE ?";
		} else {
			this.condition = "";
		}
		return this.filter;
	}
	
	public SqlFilter isNull() {
		this.condition = " IS NULL";
		return this.filter;
	}
	
	public SqlFilter isNull(Object value) {
		if(value != null)
			this.condition = " IS NULL";
		else
			this.condition = "";
		return this.filter;
	}
	
	public SqlFilter isNotNull() {
		this.condition = " IS NOT NULL";
		return this.filter;
	}
	
	public SqlFilter isNotNull(Object value) {
		if(value != null)
			this.condition = " IS NOT NULL";
		else
			this.condition = "";
		return this.filter;
	}
	
	public SqlFilter isEmpty() {
		this.condition = "= ''";
		return this.filter;
	}
	
	public SqlFilter isNotEmpty() {
		this.condition = "!= ''";
		return this.filter;
	}
	
	public SqlFilter betweenWith(Object value1, Object value2) {
		if(value1!=null && value2!=null){
			this.values = new Object[]{value1, value2};
			this.condition = " BETWEEN ? AND ?";
		} else {
			this.condition = "";
		}
		return this.filter;
	}
	
	public SqlFilter notBetweenWith(Object value1, Object value2) {
		if(value1!=null && value2!=null){
			this.values = new Object[]{value1, value2};
			this.condition = " NOT BETWEEN ? AND ?";
		} else {
			this.condition = "";
		}
		return this.filter;
	}
	
	public SqlFilter in(Object[] values) {
		StringBuffer sb = new StringBuffer();
		
		if(values != null && values.length > 1) {
			this.values = values;
			sb.append(" IN (");
			int length = values.length-1;
			
			for (int i = 0; i < length; i++) {
				sb.append("?,");
			}
			
			sb.append("?)");
		}
		this.condition = sb.toString();
		return this.filter;
	}
	
	public SqlFilter notIn(Object[] values) {
		StringBuffer sb = new StringBuffer();
		
		if(values != null && values.length > 1) {
			this.values = values;
			sb.append(" NOT IN (");
			int length = values.length-1;
			
			for (int i = 0; i < length; i++) {
				sb.append("?,");
			}
			
			sb.append("?)");
		}
		this.condition = sb.toString();
		return this.filter;
	}

	public SqlFilter startData(Object value) {
		if(value != null) {
			this.values = new Object[]{value};
			this.condition = " >= date_format(?,'%Y%m%d')";
		} else {
			this.condition = "";
		}
		return this.filter;
	}
	public SqlFilter endData(Object value) {
		if(value != null) {
			this.values = new Object[]{value};
			this.condition = " <= (date_format(?,'%Y%m%d')+1)";
		} else {
			this.condition = "";
		}
		return this.filter;
	}
	
	class ConditionFilter implements SqlFilter {
		
		@Override
		public String toSql() {
			return condition.trim().equals("")? "" : logic.getLogic() + " " + column + condition;
		}

		@Override
		public String toClearSql() {
			return condition.trim().equals("")? "" : column + condition;
		}
		
		@Override
		public Object[] getValues() {
			return values;
		}
	}

	public Logic getLogic() {
		return logic;
	}

	public void setLogic(Logic logic) {
		this.logic = logic;
	}
	
	public String getCondition() {
		return condition;
	}

	public void setCondition(String condition) {
		this.condition = condition;
	}

	public String getColumn() {
		return column;
	}

	public void setColumn(String column) {
		this.column = column;
	}

	public SqlFilter getFilter() {
		return filter;
	}

	public void setFilter(SqlFilter filter) {
		this.filter = filter;
	}

	public Object[] getValues() {
		return values;
	}

	public void setValues(Object[] values) {
		this.values = values;
	}

	@Override
	public String toSql() {
		return logic.getLogic() + " " + column;
	}

	@Override
	public String toClearSql() {
		return logic.getLogic() + " " + column;
	}
}
