package wfk.process.biz.server.impl;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import wfk.common.define.bean.result.Errcode;
import wfk.common.define.bean.result.Result;
import wfk.common.define.bean.result.criteria.DataResult;
import wfk.common.define.error.support.Errors;
import wfk.process.biz.server.INewsServer;
import wfk.process.biz.util.sql.Logic;
import wfk.process.biz.util.sql.support.Condition;
import wfk.process.biz.util.sql.support.Profile;
import wfk.process.biz.util.sql.support.QueryBuilder;
import wfk.process.biz.util.sql.support.filter.SqlColumn;
import wfk.process.biz.util.support.ServiceDao;
import wfk.process.dao.sql.entity.WFKNews;

@Service
public class NewsServerImpl implements INewsServer{
	
	@Autowired
	private ServiceDao serviceDao;

	public ServiceDao getServiceDao() {
		return serviceDao;
	}

	public void setServiceDao(ServiceDao serviceDao) {
		this.serviceDao = serviceDao;
	}

	@Override
	public Errcode add(WFKNews news) {
		serviceDao.getMapper().save(news);
		return new Result(Errors.OK);
	}

	@Override
	public Errcode update(WFKNews news) {
		serviceDao.getMapper().update(news);
		return new Result(Errors.OK);
	}

	@Override
	public WFKNews getInfoById(int id) {
		String sql ="SELECT * FROM wfk_news WHERE id=?";
		return serviceDao.get(sql, WFKNews.class, new Object[] { id });
	}

	@Override
	public DataResult getList(Map<String, String> params) {
		String sql = "SELECT * FROM wfk_news WHERE 1=1 ";
		QueryBuilder builder = new QueryBuilder(sql,
			new Condition(new SqlColumn(Logic.AND, "title").contanis(params.get("title")),
				new SqlColumn(Logic.AND, "type").equal(params.get("type")),
				new SqlColumn(Logic.AND, "status").equal(params.get("status")),
				new SqlColumn(Logic.AND, "pulish_time").startData(params.get("startTime")), 
				new SqlColumn(Logic.AND, "pulish_time").endData(params.get("endTime"))),
			new Profile(params));
		DataResult result = serviceDao.queryForDataResult(builder, WFKNews.class);
		return result;
	}
}