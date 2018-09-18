package wfk.common.define.bean.mapper.support;

import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

import org.springframework.jdbc.core.RowMapper;

import wfk.common.define.util.StringUtil;

/**
 * @author Crap
 *
 * @date 2015年9月30日 上午11:09:50
 *
 * 不管列名是否冲突,都将显示表名前缀
 */
public class FullMapRowMapper implements RowMapper<Map<String, Object>> {
	ResultSetMetaData rsmd;

	@Override
	public Map<String, Object> mapRow(ResultSet rs, int rowNum) throws SQLException {
		Map<String, Object> entity = new HashMap<String, Object>();
		
		rsmd = rs.getMetaData();
		int columnCount = rsmd.getColumnCount();

		for (int index = 1; index <= columnCount; ++index) {
			entity.put(reName(rsmd.getTableName(index), rsmd.getColumnLabel(index), entity, 0), getTypeOfObject(rs, index));
		}
		
		return entity;
	}
	
	protected Object getTypeOfObject(ResultSet rs, int index) throws SQLException{
		
		if(rsmd.getColumnTypeName(index).equals("TINYINT"))
			return rs.getInt(index);
		return rs.getObject(index);
	}
	
	protected String reName(String tableName, String column, Map<String, Object> entity, int count){
		String key = StringUtil.toCamelCase(tableName+(count==0?"":count)+"."+ column);
		if(entity.containsKey(key))
			return reName(tableName, column, entity, count+1);
		else
			return key;
	}
}
