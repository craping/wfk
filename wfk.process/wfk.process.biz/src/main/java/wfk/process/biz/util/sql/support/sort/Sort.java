package wfk.process.biz.util.sql.support.sort;

import java.util.Map;

import wfk.common.define.util.StringUtil;

/**
 * @since JDK 1.7
 * 
 * @author Crap
 * 
 * @version 1.4.3
 * 
 * @copyright 2013 - 2014 深圳亿码擎天科技有限公司 All rights reserved.
 * 
 * @description SQL排序过滤类
 */
public class Sort implements SortFilter {
	
	protected String[] columns;
	
	/**
	 * @description 参数格式:[字段名,字段名,[...],排序方式|[字段名,字段名,[...],排序方式]]
	 * 
	 */
	public Sort(String sortColumn) {
		if(sortColumn != null && !sortColumn.equals("")) {
			columns = StringUtil.split(sortColumn, "|");
		}
	}
	
	public Sort(Map<String,String> params) {
		this(params.get("sort_order"));
	}

	@Override
	public String toSql() {
		if(this.columns == null || this.columns.length == 0)
			return "";
		
		StringBuffer sb = new StringBuffer(" ");

		String column = null;
		for (int i=0; i < columns.length; i ++) {
			
			column = columns[i];
			if(column != null && !column.equals("")) {
				
				String[] order = StringUtil.split(column, ",");// column.split(",");
				String  singleCol = null;
				for (int j = 0; j < order.length; j++) {
					singleCol = order[j];
					
					if(order.length == 1){
						sb.append(singleCol);
					}else{
						if(order.length - 1 == j){
							sb.append(" ").append(singleCol.toUpperCase());
						}else{
							sb.append(singleCol);
							if(order.length - 2 != j)
								sb.append(",");
						}
					}
						
				}
				if(columns.length - 1 != i)
					sb.append(",");
			}
			
		}
		
		return sb.toString().equals("")? "" : "ORDER BY" + sb.toString();
	}

	public String[] getColumns() {
		return columns;
	}

	public void setColumns(String[] columns) {
		this.columns = columns;
	}

}
