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
		String sql = "SELECT * FROM wfk_product WHERE 1=1";
		QueryBuilder builder = new QueryBuilder(sql,
			new Condition(new SqlColumn(Logic.AND, "product_name").contanis(params.get("product_name")),
				new SqlColumn(Logic.AND, "stock_id").equal(params.get("stock_id")),
				new SqlColumn(Logic.AND, "panel_size").contanis(params.get("panel_size")),
				new SqlColumn(Logic.AND, "resolution").contanis(params.get("resolution")),
				new SqlColumn(Logic.AND, "brand").contanis(params.get("brand")),
				new SqlColumn(Logic.AND, "status").equal(params.get("status")),
				new SqlColumn(Logic.AND, "app_type").equal(params.get("app_type")),
				new SqlColumn(Logic.AND, "model").contanis(params.get("model"))),
			new Profile(params));
		DataResult result = serviceDao.queryForDataResult(builder, WFKProduct.class);
		return result;
	}

	@Override
	public DataResult getProductFileList(Map<String, String> params) {
		String sql = "SELECT id,product_name,product_name_en,file_url FROM wfk_product WHERE file_url !='';";
		QueryBuilder builder = new QueryBuilder(sql, new Profile(params));
		DataResult result = serviceDao.queryForMapDataResult(builder);
		return result;
	}
}