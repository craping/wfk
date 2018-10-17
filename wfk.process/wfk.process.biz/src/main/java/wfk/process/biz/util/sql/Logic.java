package wfk.process.biz.util.sql;

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
 */
public enum Logic {
	NULL(""),
	WHERE("WHERE"),
	HAVING("HAVING"),
	AND("AND"),
	OR("OR"),
	AND_NOT("AND NOT"),
	OR_NOT("OR NOT"),
	SORT_BY("SORT BY"),
	GROUP_BY("GROUP BY"),
	ORDER_BY("ORDER BY ");
	
	public enum Sort {
		ASC("ASC"),
		DESC("DESC");
		
		private final String logic;
		
		private Sort(String logic) {
			this.logic = logic;
		}
		
		public String getLogic() {
			return logic;
		}
	}
	
	private final String logic;
	
	private Logic(String logic) {
		this.logic = logic;
	}

	public String getLogic() {
		return logic;
	}

}
