package wfk.common.define.bean.mapper.support;

import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

/**
 * @author Crap
 *
 * @date 2015年9月30日 上午10:46:47
 *
 * 用户mapper query
 */
public class ArrayMapper implements RowMapper<Object[]> {

	protected ResultSetMetaData rsmd;
	
	@Override
	public Object[] mapRow(ResultSet rs, int rowNum) throws SQLException {
		
		if(rsmd == null)
			rsmd = rs.getMetaData();
		
		Object[] objs = new Object[rsmd.getColumnCount()];
		
		for (int i = 0; i < objs.length; i++) {
			objs[i] = rs.getObject(i+1);
		}
		return objs;
	}

}
