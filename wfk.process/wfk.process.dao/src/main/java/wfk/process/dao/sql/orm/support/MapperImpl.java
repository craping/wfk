package wfk.process.dao.sql.orm.support;

import java.io.Serializable;
import java.util.Collection;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import wfk.common.define.Constant;
import wfk.common.define.bean.mapper.support.ArrayMapper;
import wfk.common.define.bean.mapper.support.ObjectRowMapper;
import wfk.common.define.util.StringUtil;
import wfk.process.dao.sql.orm.IMapper;
import wfk.process.dao.sql.service.Mapper;

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
public class MapperImpl implements IMapper {
	
	@Autowired
	private SqlSession sqlSession;
	
	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	
	private final static String mapperPackage = Constant.System.SERVICE_PACKAGE+".";

	/**
	 * entity execute methods
	 */
	public Serializable save(Object paramObject) {
		String mapperName = mapperPackage + paramObject.getClass().getSimpleName()+"Mapper";
		try {
			@SuppressWarnings("unchecked")
			Class<Mapper<Object>> clazz = (Class<Mapper<Object>>) Class.forName(mapperName);
			Mapper<Object> mapper = sqlSession.getMapper(clazz);
			return mapper.insertSelective(paramObject);
			
		} catch (ClassNotFoundException e) {
			
			e.printStackTrace();
		}
		return null;
	}
	
	public Serializable[] save(Object... paramObjects) {
		try {
			Serializable[] sArray = new Serializable[paramObjects.length];
			String mapperName = mapperPackage + paramObjects[0].getClass().getSimpleName()+"Mapper";
			@SuppressWarnings("unchecked")
			Class<Mapper<Object>> clazz = (Class<Mapper<Object>>) Class.forName(mapperName);

			Mapper<Object> mapper = sqlSession.getMapper(clazz);
			for (int i = 0; i < paramObjects.length; i++) {
				sArray[i] = mapper.insertSelective(paramObjects[i]);
			}
			return sArray;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	public Serializable[] save(Collection<?> paramCollectionOfObject) {
		return save(paramCollectionOfObject.toArray());
	}
	
	/*public void saveOrUpdate(Object paramObject) {
		
		Session session = sessionFactory.getCurrentSession();
		sqlSession.merge(paramObject);
	}
	
	public void saveOrUpdate(Object... paramObjects) {
		Session session = sessionFactory.getCurrentSession();
		for (Object paramObject : paramObjects) {
			sqlSession.merge(paramObject);
		}
	}
	
	public void saveOrUpdate(Collection<?> paramCollectionOfObject) {
		Session session = sessionFactory.getCurrentSession();
		for (Object paramObject : paramCollectionOfObject) {
			sqlSession.merge(paramObject);
		}
	}*/
	
	public void update(Object paramObject) {
		String mapperName = mapperPackage + paramObject.getClass().getSimpleName()+"Mapper";
		try {
			@SuppressWarnings("unchecked")
			Class<Mapper<Object>> clazz = (Class<Mapper<Object>>) Class.forName(mapperName);
			Mapper<Object> mapper = sqlSession.getMapper(clazz);
			mapper.updateByPrimaryKeySelective(paramObject);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public void update(Object... paramObjects) {
		String mapperName = mapperPackage + paramObjects[0].getClass().getSimpleName()+"Mapper";
		try {
			
			@SuppressWarnings("unchecked")
			Class<Mapper<Object>> clazz = (Class<Mapper<Object>>) Class.forName(mapperName);
			Mapper<Object> mapper = sqlSession.getMapper(clazz);
			for (Object paramObject : paramObjects) {
				mapper.updateByPrimaryKeySelective(paramObject);
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public void update(Collection<?> paramCollectionOfObject) {
		update(paramCollectionOfObject.toArray());
	}
	
	public void remove(Class<?> entity, Object paramObject) {
		String mapperName = mapperPackage + entity.getSimpleName()+"Mapper";
		try {
			@SuppressWarnings("unchecked")
			Class<Mapper<Object>> clazz = (Class<Mapper<Object>>) Class.forName(mapperName);

			Mapper<Object> mapper = sqlSession.getMapper(clazz);
			mapper.deleteByPrimaryKey(paramObject);
			
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public void remove(Class<?> entity, Object... paramObjects) {
		String mapperName = mapperPackage + entity.getSimpleName()+"Mapper";
		try {
			@SuppressWarnings("unchecked")
			Class<Mapper<Object>> clazz = (Class<Mapper<Object>>) Class.forName(mapperName);

			Mapper<Object> mapper = sqlSession.getMapper(clazz);
			for (Object paramObject : paramObjects) {
				mapper.deleteByPrimaryKey(paramObject);
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public void remove(Class<?> entity, Collection<?> paramCollectionOfObject) {
		remove(entity, paramCollectionOfObject.toArray());
	}
	
	/**
	 * query single methods
	 */
	public Object queryUnique(String paramString, Object[] paramArrayOfObject) {
		return jdbcTemplate.queryForObject(paramString, paramArrayOfObject, Object.class);
	}
	
	@SuppressWarnings("unchecked")
	public <T> T get(Class<T> paramClass, Serializable paramSerializable) {

		String mapperName = mapperPackage + paramClass.getSimpleName()+"Mapper";
		
		try {
			Class<Mapper<Object>> clazz = (Class<Mapper<Object>>) Class.forName(mapperName);
			return (T) sqlSession.getMapper(clazz).selectByPrimaryKey(paramSerializable);
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}
	
	/**
	 * query limit List<?> methods
	 */
	@SuppressWarnings("unchecked")
	public <T> List<T> query(String paramString, Class<T> paramClass, Object[] paramArrayOfObject) {
		return (List<T>) this.query(paramString, new ObjectRowMapper(paramClass), paramArrayOfObject);
	}
	
	public <T> List<T> query(String paramString, RowMapper<T> rowMapper, Object[] paramArrayOfObject) {
		return jdbcTemplate.query(paramString, rowMapper, paramArrayOfObject);
	}
	
	public List<Object[]> query(String paramString, Object[] paramArrayOfObject) {
		return jdbcTemplate.query(paramString, new ArrayMapper(), paramArrayOfObject);
	}

	public List<Map<String, Object>> queryForList(String paramString, Object[] paramArrayOfObject) {
		return jdbcTemplate.queryForList(paramString, paramArrayOfObject);
	}
	
	/**
	 * query all List<?> methods
	 */
	public <T> List<T> loadAll(Class<T> paramClass) {
		
		return jdbcTemplate.queryForList("select * from "+getTableName(paramClass), paramClass);
	}
	
	
	/**
	 * execute methods
	 */
	public int execute(String paramString, Object[] paramArrayOfObject) {
		return jdbcTemplate.update(paramString, paramArrayOfObject);
	}
	
	public int[] batchExecute(String paramString, Object[] paramArrayOfObject) {
		
		return jdbcTemplate.batchUpdate(new String[]{});// .update(paramString, paramArrayOfObject);
	}
	
	public int count(String paramString, Object[] paramObject) {
		return ((Number)queryUnique(paramString, paramObject)).intValue();
	}
	
	
	
	


	
	public SqlSession getSqlSession() {
		return sqlSession;
	}

	public void setSqlSession(SqlSession sqlSession) {
		this.sqlSession = sqlSession;
	}

	public JdbcTemplate getJdbcTemplate() {
		return jdbcTemplate;
	}

	public void setJdbcTemplate(JdbcTemplate jdbcTemplate) {
		this.jdbcTemplate = jdbcTemplate;
	}
	
	/**
	 * 驼峰命名转为表名
	 * @author Crap
	 * @param str 字符串
	 * @return String
	 */
	public String getTableName(Class<?> paramClass){
		return StringUtil.toHungarian(paramClass.getSimpleName());
	}
}
