package wfk.process.biz.util.sql.support.sort;

import java.io.IOException;
import java.util.Map;

import org.codehaus.jackson.JsonParser;
import org.codehaus.jackson.map.ObjectMapper;

/**
 * @author Crap
 * 
 * @date 2015-06-29
 * 
 * @copyright 深圳阿猫阿狗网络科技有限公司 All rights reserved.
 * 
 * @description SQL排序过滤类
 */
public class SortExt implements SortFilter {
	
	private ObjectMapper mapper = new ObjectMapper();
	{
		mapper.configure(JsonParser.Feature.ALLOW_SINGLE_QUOTES, true);
		mapper.configure(JsonParser.Feature.ALLOW_UNQUOTED_FIELD_NAMES, true);
	}
	protected SortJson[] columns;
	
	/**
	 * @description 排序. 参数格式:[{'property':'','direction':''},{...},...]
	 * 
	 */
	public SortExt(String sortColumn) {
		if(sortColumn != null && !sortColumn.equals("")) {
			try {
				columns = mapper.readValue(sortColumn, SortJson[].class);
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
		}
	}
	
	public SortExt(Map<String,String> params) {
		this(params.get("sort"));
	}

	@Override
	public String toSql() {
		if(this.columns == null || this.columns.length == 0)
			return "";
		
		StringBuffer sb = new StringBuffer(" ");

		SortJson column = null;
		for (int i=0; i < columns.length; i ++) {
			column = columns[i];
			if(column != null) {
				sb.append(column.getProperty()).append(" ").append(column.getDirection());
				
			}
			if(columns.length - 1 != i)
				sb.append(",");
		}
		
		return sb.toString().equals("")? "" : "ORDER BY" + sb.toString();
	}

	public String replaceLowerCase(String str){
		String lower = "";
		for (int i = 0; i < str.length(); i++) {
			char c = str.charAt(i);
			if(Character.isUpperCase(c)){
				lower += "_"+Character.toLowerCase(c);
				continue;
			}
			lower += c;
		}
		return lower;
	}
	
	public SortJson[] getColumns() {
		return columns;
	}

	public void setColumns(SortJson[] columns) {
		this.columns = columns;
	}

}
