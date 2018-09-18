package wfk.process.dao.sql.orm.dao.support;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import wfk.process.dao.sql.orm.dao.ICommonDao;

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
@Repository
public class CommonDao extends AbstractBaseDaoImpl implements ICommonDao {

	public int count(String sql) {
		
		return this.count(sql, null);
	}

	public int count(String sql, Object[] params) {
		
		return getMapper().count(sql, params);
	}

	public int execute(String sql, Object[] params) {
		
		return getMapper().execute(sql, params);
	}

	public int execute(String sql) {
		
		return this.execute(sql, null);
	}
	

	
	
	public <T> List<T> queryEntityList(String sql, Class<T> entity) {
		
		return this.queryEntityList(sql, entity, null);
	}

	public <T> List<T> queryEntityList(String sql, Class<T> entity, Object[] params) {
		
		return super.query(sql, entity, params, null, null);
	}

	public <T> List<T> queryEntityList(String sql, Class<T> entity, Integer offset, Integer limit) {
		
		return this.queryEntityList(sql, entity, null, offset, limit);
	}

	public <T> List<T> queryEntityList(String sql, Class<T> entity, Object[] params, Integer offset, Integer limit) {
		
		return super.query(sql, entity, params, offset, limit);
	}
	
	

	public <T> List<T> queryEntityList(String sql, RowMapper<T> rowMapper) {
		return this.queryEntityList(sql, rowMapper, null);
	}

	public <T> List<T> queryEntityList(String sql, RowMapper<T> rowMapper, Object[] params) {
		return super.query(sql, rowMapper, params, null, null);
	}

	public <T> List<T> queryEntityList(String sql, RowMapper<T> rowMapper, Integer offset, Integer limit) {
		return this.queryEntityList(sql, rowMapper, null, offset, limit);
	}

	public <T> List<T> queryEntityList(String sql, RowMapper<T> rowMapper, Object[] params, Integer offset, Integer limit) {
		return super.query(sql, rowMapper, params, offset, limit);
	}
	
	
	public List<Object[]> query(String sql) {
		
		return this.query(sql, null);
	}

	public List<Object[]> query(String sql, Object[] params) {
		
		return super.queryArrayList(sql, params, null, null);
	}

	public List<Object[]> query(String sql, Integer offset, Integer limit) {

		return this.query(sql, null, offset, limit);
	}

	public List<Object[]> query(String sql, Object[] params, Integer offset, Integer limit) {
		
		return super.queryArrayList(sql, params, offset, limit);
	}

	
	
	public List<Map<String, Object>> queryForList(String sql) {
		
		return this.queryForList(sql, null);
	}

	public List<Map<String, Object>> queryForList(String sql, Object[] params) {
		
		return super.queryMapList(sql, params, null, null);
	}

	public List<Map<String, Object>> queryForList(String sql, Integer offset, Integer limit) {
		
		return this.queryForList(sql, null, offset, limit);
	}

	public List<Map<String, Object>> queryForList(String sql, Object[] params, Integer offset, Integer limit) {
		
		return super.queryMapList(sql, params, offset, limit);
	}

	
	
	public Object queryUniqueResult(String sql, Object[] params) {
		
		return getMapper().queryUnique(sql, params);
	}

	public Object queryUniqueResult(String sql) {
		
		return this.queryUniqueResult(sql, null);
	}


	public <T> T get(Class<T> paramClass, Serializable paramSerializable) {
		
		return getMapper().get(paramClass, paramSerializable);
	}

	
	public <T> T get(String sql, Class<T> paramClass, Object[] params) {
		List<T> resultList = getMapper().query(sql, paramClass, params);
		return resultList==null || resultList.size() == 0?null:resultList.get(0);
	}
	
	@Override
	public <T> T get(String sql, RowMapper<T> rowMapper, Object[] params) {
		List<T> resultList = super.query(sql, rowMapper, params, null, null);
		return resultList==null || resultList.size() == 0?null:resultList.get(0);
	}

	@Override
	public Map<String, Object> queryForMap(String sql) {

		return this.queryForMap(sql, null);
	}

	@Override
	public Map<String, Object> queryForMap(String sql, Object[] params) {
		List<Map<String, Object>> resultList = this.queryForList(sql, params);
		return resultList==null || resultList.size() == 0?null:resultList.get(0);
	}

}
