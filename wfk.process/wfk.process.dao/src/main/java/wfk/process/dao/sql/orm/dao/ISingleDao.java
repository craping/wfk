package wfk.process.dao.sql.orm.dao;

import java.io.Serializable;
import java.util.List;

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
public abstract interface ISingleDao<T> extends IBaseDao {
	
	public abstract int countAll();

	public abstract int countByCondition(String paramString);

	public abstract int countByCondition(String paramString, Object[] paramArrayOfObject);

	public abstract boolean existByCondition(String paramString);

	public abstract boolean existByCondition(String paramString, Object[] paramArrayOfObject);

	public abstract void create(T paramT);

	public abstract void update(T paramT);

	public abstract void remove(T paramT);

	public abstract void saveOrUpdate(T paramT);

	public abstract List<T> findAll();

	public abstract List<T> findAll(int paramInt1, int paramInt2);

	public abstract List<T> findByCondition(String paramString);

	public abstract T findSingleByCondition(String paramString);
	
	public abstract T findSingleByCondition(String paramString, Object[] paramArrayOfObject);

	public abstract List<T> findByCondition(String paramString, int paramInt1, int paramInt2);

	public abstract List<T> findByCondition(String paramString, Object[] paramArrayOfObject, int paramInt1, int paramInt2);

	public abstract List<T> findByCondition(String paramString, Object[] paramArrayOfObject);
	
	public abstract T get(Serializable paramSerializable);
	
	public abstract T load(Serializable paramSerializable);

	public abstract void removeAll();
}
