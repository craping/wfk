package wfk.process.biz.server;

import java.util.Map;

import wfk.common.define.bean.result.Errcode;
import wfk.common.define.bean.result.criteria.DataResult;
import wfk.process.dao.sql.entity.WFKNews;

public interface INewsServer {

	public Errcode add(WFKNews product);

	public Errcode update(WFKNews product);

	public WFKNews getInfoById(int id);

	public DataResult getList(Map<String, String> params);
}
