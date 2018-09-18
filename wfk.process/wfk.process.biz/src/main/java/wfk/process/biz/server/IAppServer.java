package wfk.process.biz.server;

import java.util.Map;

import wfk.common.define.bean.result.criteria.DataResult;

public interface IAppServer {
	
	public DataResult getAppList(Map<String,String> params);
}
