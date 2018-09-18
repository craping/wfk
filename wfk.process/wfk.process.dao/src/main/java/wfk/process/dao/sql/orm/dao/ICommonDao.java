package wfk.process.dao.sql.orm.dao;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

import org.springframework.jdbc.core.RowMapper;

/** 
 * @project Crap
 * 
 * @author Crap
 * 
 * @Copyright 2013 - 2014 All rights reserved. 
 * 
 * @email 422655094@qq.com
 * 
 */
public abstract interface ICommonDao extends IBaseDao {
	
	public abstract Object queryUniqueResult(String sql);
	
	public abstract Object queryUniqueResult(String sql, Object[] params);
	
	public abstract Map<String, Object> queryForMap(String sql);
	
	public abstract Map<String, Object> queryForMap(String sql, Object[] params);
	
	public abstract <T> T get(Class<T> paramClass, Serializable paramSerializable);
	
	public abstract <T> T get(String sql, Class<T> paramClass, Object[] params);
	
	public abstract <T> T get(String sql, RowMapper<T> rowMapper, Object[] params);
	
	public abstract <T> List<T> queryEntityList(String sql, Class<T> paramClass);
	
	public abstract <T> List<T> queryEntityList(String sql, Class<T> paramClass, Object[] params);
	
	public abstract <T> List<T> queryEntityList(String sql, Class<T> paramClass, Integer offset, Integer limit);

	public abstract <T> List<T> queryEntityList(String sql, Class<T> paramClass, Object[] params, Integer offset, Integer limit);

	
	public abstract <T> List<T> queryEntityList(String sql, RowMapper<T> rowMapper);
	
	public abstract <T> List<T> queryEntityList(String sql, RowMapper<T> rowMapper, Object[] params);
	
	public abstract <T> List<T> queryEntityList(String sql, RowMapper<T> rowMapper, Integer offset, Integer limit);

	public abstract <T> List<T> queryEntityList(String sql, RowMapper<T> rowMapper, Object[] params, Integer offset, Integer limit);
	
	
	public abstract List<Object []> query(String sql);

	public abstract List<Object []> query(String sql, Object[] params);

	public abstract List<Object []> query(String sql, Integer offset, Integer limit);

	public abstract List<Object []> query(String sql, Object[] params, Integer offset, Integer limit);
	
	
	public abstract List<Map<String, Object>> queryForList(String sql);

	public abstract List<Map<String, Object>> queryForList(String sql, Object[] params);

	public abstract List<Map<String, Object>> queryForList(String sql, Integer offset, Integer limit);

	public abstract List<Map<String, Object>> queryForList(String sql, Object[] params, Integer offset, Integer limit);
	
	
	public abstract int execute(String sql);

	public abstract int execute(String sql, Object[] params);

	public abstract int count(String sql);

	public abstract int count(String sql, Object[] params);
}
