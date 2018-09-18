package wfk.process.biz.util;

import org.springframework.jdbc.core.RowMapper;

import wfk.common.define.bean.mapper.AbstractObjectRowMapper;
import wfk.common.define.bean.result.criteria.DataResult;
import wfk.process.biz.util.sql.support.Profile;
import wfk.process.biz.util.sql.support.QueryBuilder;
import wfk.process.dao.sql.orm.dao.ICommonDao;

public interface IServiceDao extends ICommonDao {
	
	public DataResult queryForArrayDataResult(String sql);
	
	public DataResult queryForArrayDataResult(String sql, Object[] sqlParams);
	
	public DataResult queryForArrayDataResult(String sql, String countSql, Profile profile);
	
	public DataResult queryForArrayDataResult(String sql, String countSql, Object[] sqlParams, Profile profile);
	
	public DataResult queryForArrayDataResult(QueryBuilder builder);
	
	
	
	public DataResult queryForMapDataResult(String sql);
	
	public DataResult queryForMapDataResult(String sql, Object[] sqlParams);
	
	public DataResult queryForMapDataResult(String sql, String countSql, Profile profile);
	
	public DataResult queryForMapDataResult(String sql, String countSql, Object[] sqlParams, Profile profile);
	
	public DataResult queryForMapDataResult(QueryBuilder builder);
	
	
	
	public DataResult queryForDataResult(Class<?> entity);
	
	public DataResult queryForDataResult(Class<?> entity, Profile profile);
	
	public DataResult queryForDataResult(String sql, Class<?> entity);
	
	public DataResult queryForDataResult(String sql, Class<?> entity, Object[] sqlParams);
	
	public DataResult queryForDataResult(String sql, String countSql, Class<?> entity, Profile profile);
	
	public DataResult queryForDataResult(String sql, String countSql, Class<?> entity, Object[] sqlParams, Profile profile);
	
	public DataResult queryForDataResult(QueryBuilder builder, Class<?> entity);
	
	
	
	public DataResult queryForDataResult(AbstractObjectRowMapper<?> rowMapper);
	
	public DataResult queryForDataResult(AbstractObjectRowMapper<?> rowMapper, Profile profile);
	
	public DataResult queryForDataResult(String sql, RowMapper<?> rowMapper);
	
	public DataResult queryForDataResult(String sql, RowMapper<?> rowMapper, Object[] sqlParams);
	
	public DataResult queryForDataResult(String sql, String countSql, RowMapper<?> rowMapper, Profile profile);
	
	public DataResult queryForDataResult(String sql, String countSql, RowMapper<?> rowMapper, Object[] sqlParams, Profile profile);
	
	public DataResult queryForDataResult(QueryBuilder builder, RowMapper<?> rowMapper);
}
