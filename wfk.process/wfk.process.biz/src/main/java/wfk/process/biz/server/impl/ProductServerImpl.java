package wfk.process.biz.server.impl;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import wfk.common.define.bean.result.Errcode;
import wfk.common.define.bean.result.Result;
import wfk.common.define.bean.result.criteria.DataResult;
import wfk.common.define.error.support.Errors;
import wfk.process.biz.server.IProductServer;
import wfk.process.biz.util.sql.Logic;
import wfk.process.biz.util.sql.support.Condition;
import wfk.process.biz.util.sql.support.Profile;
import wfk.process.biz.util.sql.support.QueryBuilder;
import wfk.process.biz.util.sql.support.filter.SqlColumn;
import wfk.process.biz.util.support.ServiceDao;
import wfk.process.dao.sql.entity.WFKProduct;

@Service
public class ProductServerImpl implements IProductServer{
	
	@Autowired
	private ServiceDao serviceDao;

	public ServiceDao getServiceDao() {
		return serviceDao;
	}

	public void setServiceDao(ServiceDao serviceDao) {
		this.serviceDao = serviceDao;
	}

	@Override
	public Errcode add(WFKProduct product) {
		serviceDao.getMapper().save(product);
		return new Result(Errors.OK);
	}

	@Override
	public Errcode update(WFKProduct product) {
		serviceDao.getMapper().update(product);
		return new Result(Errors.OK);
	}

	@Override
	public WFKProduct getInfoById(int id) {
		String sql ="SELECT * FROM wfk_product WHERE id=?";
		return serviceDao.get(sql, WFKProduct.class, new Object[] { id });
	}

	@Override
	public DataResult getList(Map<String, String> params) {
		String sql = "SELECT * FROM wfk_product ";
		QueryBuilder builder = new QueryBuilder(sql,
			new Condition(new SqlColumn(Logic.AND, "stock_id").equal(params.get("stock_id")),
				new SqlColumn(Logic.AND, "brand").equal(params.get("brand"))),
			new Profile(params));
		DataResult result = serviceDao.queryForDataResult(builder, WFKProduct.class);
		return result;
	}

}
