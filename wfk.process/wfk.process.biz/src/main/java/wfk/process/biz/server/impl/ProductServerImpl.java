package wfk.process.biz.server.impl;

import java.util.List;
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
import wfk.process.dao.sql.entity.WFKProductFile;

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
	public WFKProduct getSimpleInfo(Integer id, String model) {
		String sql = "SELECT * FROM wfk_product WHERE id=" + id;
		if (model != null) {
			sql ="SELECT * FROM wfk_product WHERE panel_model='" + model +"';";
		}
		return serviceDao.get(sql, WFKProduct.class, null);
	}

	@Override
	public DataResult getList(Map<String, String> params) {
		String sql = "SELECT p.*,pl.file_url FROM wfk_product p LEFT JOIN wfk_product_file pl ON pl.pid = p.id AND pl.file_type=3 WHERE 1=1 ";
		QueryBuilder builder = new QueryBuilder(sql,
			new Condition(new SqlColumn(Logic.AND, "product_name").contanis(params.get("product_name")),
				new SqlColumn(Logic.AND, "panel_size").contanis(params.get("panel_size")),
				new SqlColumn(Logic.AND, "resolution").contanis(params.get("resolution")),
				new SqlColumn(Logic.AND, "panel_brand").contanis(params.get("panel_brand")),
				new SqlColumn(Logic.AND, "status").equal(params.get("status")),
				new SqlColumn(Logic.AND, "app_type").contanis(params.get("app_type")),
				new SqlColumn(Logic.AND, "panel_model").contanis(params.get("panel_model"))),
			new Profile(params));
		DataResult result = serviceDao.queryForMapDataResult(builder);
		return result;
	}

	@Override
	public DataResult getProductFileList(Map<String, String> params) {
		String sql = "SELECT p.id,p.panel_model,pl.file_url from wfk_product p LEFT JOIN wfk_product_file pl ON pl.pid = p.id AND pl.file_type=1 WHERE pl.file_url != '';";
		QueryBuilder builder = new QueryBuilder(sql, new Profile(params));
		DataResult result = serviceDao.queryForMapDataResult(builder);
		return result;
	}

	@Override
	public List<WFKProductFile> getFileList(Integer id) {
		String sql = "SELECT * FROM wfk_product_file WHERE pid =" + id ;
		List<WFKProductFile> l = serviceDao.queryEntityList(sql, WFKProductFile.class);
		return l;
	}

	@Override
	public Errcode addFile(WFKProductFile file) {
		serviceDao.getMapper().save(file);
		return new Result(Errors.OK);
	}

	@Override
	public Errcode updateFile(WFKProductFile file) {
		serviceDao.getMapper().update(file);
		return new Result(Errors.OK);
	}

	@Override
	public WFKProductFile getFileInfo(Integer pid, Integer fileType, Integer seq) {
		String sql = "SELECT * FROM wfk_product_file WHERE pid=" + pid + " AND file_type=" + fileType;
		if (seq != null) 
			sql += " AND seq=" + seq;
		return serviceDao.get(sql, WFKProductFile.class, null);
	}
}