package wfk.process.dao.sql.orm.dao.support;

import java.io.Serializable;
import java.util.List;

import wfk.process.dao.sql.orm.dao.ISingleDao;

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
public abstract class AbstractSingleDaoImpl<T> extends AbstractBaseDaoImpl implements ISingleDao<T> {

	protected abstract String getTableName();

	protected abstract Class<T> getEntityClass();

	protected abstract String[] getIdentityColumns();
	
	protected abstract String getSelectColumns();
	
	private boolean isEmpty(String s) {
		return ((s == null) || (s.trim().equals("")));
	}

	public int countAll() {

		return this.countByCondition(null, null);
	}

	public int countByCondition(String condition) {

		return this.countByCondition(condition, null);
	}

	public int countByCondition(String condition, Object[] params) {

		StringBuffer sql = new StringBuffer("select count(0) from " + getTableName() + " ");

		if (!isEmpty(condition)) {
			sql.append(" where " + condition);
		}

		return getMapper().count(sql.toString(), params);
	}

	protected boolean existByPk(Object[] pks) {
		StringBuffer sb = new StringBuffer();
		String[] cols = getIdentityColumns();
		for (int i = 0; i < cols.length; ++i) {
			sb.append(" " + cols[i] + "=? AND");
		}
		sb.setLength(sb.length() - 3);

		return this.existByCondition(sb.toString(), pks);
	}

	public boolean existByCondition(String condition) {

		return this.existByCondition(condition, null);
	}

	public boolean existByCondition(String condition, Object[] params) {

		return this.countByCondition(condition, params) > 0;
	}

	/*public List<T> findAll() {

		return (List<T>) getMapper().loadAll(getEntityClass());
	}*/

	public List<T> findAll(int offset, int limit) {

		return this.findByCondition("select "+ getSelectColumns() +" from " + getTableName(), offset, limit);
	}

	public List<T> findByCondition(String condition) {

		return this.findByCondition(condition, null);
	}

	public List<T> findByCondition(String condition, int offset, int limit) {

		return this.findByCondition(condition, null, offset, limit);
	}

	public List<T> findByCondition(String condition, Object[] params, int offset, int limit) {
		String sql = "select "+ getSelectColumns() +" from " + getTableName() + " ";
		if (!(isEmpty(condition))) {
			sql = sql + " where " + condition;
		}
		return (List<T>) super.query(sql, getEntityClass(), params, offset, limit);
	}

	public List<T> findByCondition(String condition, Object[] params) {
		String sql = "select "+ getSelectColumns() +" from " + getTableName() + " ";
		if (!(isEmpty(condition))) {
			sql = sql + " where " + condition;
		}
		return (List<T>) getMapper().query(sql, getEntityClass(), params);
	}

	public T findSingleByCondition(String condition) {

		return this.findSingleByCondition(condition, null);
	}

	protected T findByPk(Object[] pks) {
		if ((pks == null) || (pks.length == 0))
			throw new IllegalStateException("No Primary Key");
		StringBuffer sb = new StringBuffer();
		String[] cols = getIdentityColumns();
		for (int i = 0; i < cols.length; ++i) {
			sb.append(" " + cols[i] + "=? AND");
		}
		sb.setLength(sb.length() - 3);
		return findSingleByCondition(sb.toString(), pks);
	}

	public T findSingleByCondition(String condition, Object[] params) {
		List<T> resultList = this.findByCondition(condition, params);
		return (((resultList != null) && (resultList.size() > 0)) ? resultList.get(0) : null);
	}

	public T get(Serializable pk) {

		return (T) getMapper().get(getEntityClass(), pk);
	}

	/*public void remove() {

		getMapper().remove(getEntityClass(), getMapper().loadAll(getEntityClass()));
	}*/

	protected int removeByPk(Object[] pks) {
		StringBuffer sb = new StringBuffer();
		String[] cols = getIdentityColumns();
		for (int i = 0; i < cols.length; ++i) {
			sb.append(" " + cols[i] + "=? AND");
		}
		sb.setLength(sb.length() - 3);

		return this.removeByCondition(sb.toString(), pks);
	}

	protected int removeByCondition(String condition, Object[] params) {

		StringBuffer sql = new StringBuffer("delete from " + getTableName() + " ");

		if (!isEmpty(condition)) {
			sql.append(" where " + condition);
		}
		return getMapper().execute(sql.toString(), params);
	}

	public void create(T entity) {

		getMapper().save(entity);
	}

	public void remove(T entity) {

		getMapper().remove(getEntityClass(), entity);
	}

	/*public void saveOrUpdate(T entity) {

		getMapper().saveOrUpdate(entity);
	}*/

	public void update(T entity) {

		getMapper().update(entity);
	}

}
