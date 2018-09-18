package wfk.process.dao.sql.orm;

import java.io.Serializable;
import java.util.Collection;
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
public abstract interface IMapper {
	
	/**
	 * entity execute methods
	 * @return 
	 */
	public abstract Serializable save(Object paramObject);
	
	public abstract Serializable[] save(Object... paramObject);
	
	public abstract Serializable[] save(Collection<?> paramCollectionOfObject);
	
	public abstract void update(Object paramObject);
	
	public abstract void update(Object... paramObject);
	
	public abstract void update(Collection<?> paramCollectionOfObject);
	
	/*public abstract void saveOrUpdate(Object paramObject);
	
	public abstract void saveOrUpdate(Object... paramObject);
	
	public abstract void saveOrUpdate(Collection<?> paramCollectionOfObject);*/

	public abstract void remove(Class<?> entity, Object paramObject);
	
	public abstract void remove(Class<?> entity, Object... paramObject);
	
	public abstract void remove(Class<?> entity, Collection<?> paramCollectionOfObject);
	
	/**
	 * query single methods
	 */
	public abstract Object queryUnique(String paramString, Object[] paramArrayOfObject);
	
	public abstract <T> T get(Class<T> paramClass, Serializable paramSerializable);

	/**
	 * query limit List<?> methods
	 */
	public abstract <T> List<T> query(String paramString, Class<T> paramClass, Object[] paramArrayOfObject);
	
	public abstract <T> List<T> query(String paramString, RowMapper<T> rowMapper, Object[] paramArrayOfObject);
	
	public abstract List<Object[]> query(String paramString, Object[] paramArrayOfObject);
	
	public abstract List<Map<String, Object>> queryForList(String paramString, Object[] paramArrayOfObject);

	/**
	 * query all List<?> methods
	 */
	public abstract <T> List<T> loadAll(Class<T> paramClass);
	
	/**
	 * execute methods
	 */
	public abstract int execute(String paramString, Object[] paramArrayOfObject);
	
	public abstract int count(String paramString, Object[] paramArrayOfObject);
	
	public abstract String getTableName(Class<?> paramClass);
}
