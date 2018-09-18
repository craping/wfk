package wfk.process.dao.sql.orm.dao.support;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import wfk.process.dao.sql.orm.IMapper;
import wfk.process.dao.sql.orm.IPage;
import wfk.process.dao.sql.orm.dao.IBaseDao;

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
public abstract class AbstractBaseDaoImpl implements IBaseDao {

	@Autowired
	private IPage page;

	@Autowired
	private IMapper mapper;

	protected <T> List<T> query(String sql, Class<T> entity, Object[] params, Integer offset, Integer limit) {
		return getMapper().query(getPage().getLimitString(sql, offset, limit), entity, params);
	}
	
	protected <T> List<T> query(String sql, RowMapper<T> rowMapper, Object[] params, Integer offset, Integer limit) {
		return getMapper().query(getPage().getLimitString(sql, offset, limit), rowMapper, params);
	}
	
	protected List<Object[]> queryArrayList(String sql, Object[] params, Integer offset, Integer limit) {
		return getMapper().query(getPage().getLimitString(sql, offset, limit), params);
	}
	
	protected List<Map<String, Object>> queryMapList(String sql, Object[] params, Integer offset, Integer limit) {
		return getMapper().queryForList(getPage().getLimitString(sql, offset, limit), params);
	}
	
	

	public IPage getPage() {

		return this.page;
	}

	public void setPage(IPage page) {
		this.page = page;
	}

	public IMapper getMapper() {
		return mapper;
	}

	public void setMapper(IMapper mapper) {
		this.mapper = mapper;
	}

}
