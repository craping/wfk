package wfk.process.biz.server;

import wfk.process.dao.sql.entity.WFKUser;

public interface IUserServer {

	public WFKUser getUser(String loginName, String loginPwd);

}
