package wfk.common.define.bean.mapper.support;

import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

import org.springframework.jdbc.core.RowMapper;

/**
 * @since JDK 1.7
 * 
 * @author Crap
 * 
 * @version 1.4.3
 * 
 * @copyright 2013 - 2014 深圳亿码擎天科技有限公司 All rights reserved.
 */
public class MapRowMapper implements RowMapper<Map<String, Object>> {
	ResultSetMetaData rsmd;
	String[] keyArr;
	@Override
	public Map<String, Object> mapRow(ResultSet rs, int rowNum) throws SQLException {
		Map<String, Object> entity = new HashMap<String, Object>();
		
		rsmd = rs.getMetaData();
		
		int columnCount = rsmd.getColumnCount();
		keyArr = new String[columnCount];
		
		String key;
		for (int index = 1; index <= columnCount; ++index) {
			key = rsmd.getColumnLabel(index);
			if(hasColumn(key)){
				rsmd.getColumnTypeName(index);
				rsmd.getColumnClassName(index);
				key = (rsmd.getTableName(index).replaceFirst("t_", "")+"."+key.toLowerCase()).replace("_", "");
			}else{
				key = key.replace("_", "");
			}
			entity.put(key, getTypeOfObject(rs, index));
			keyArr[index-1] = key;
		}
		
		return entity;
	}
	
	protected boolean hasColumn(String columnName){
		for (String key : keyArr) {
			if(columnName.equals(key))
				return true;
		}
		return false;
	}
	
	protected Object getTypeOfObject(ResultSet rs, int index) throws SQLException{
		
		if(rsmd.getColumnTypeName(index).equals("TINYINT"))
			return rs.getInt(index);
		return rs.getObject(index);
	}
}
