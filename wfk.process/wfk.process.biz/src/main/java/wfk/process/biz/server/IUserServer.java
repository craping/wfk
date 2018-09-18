package wfk.process.biz.server;

import wfk.common.define.bean.result.Errcode;
import wfk.process.dao.sql.entity.TUser;

public interface IUserServer {
	
	public Errcode addUser(TUser user);
	
	public TUser getUser(String loginName, String loginPwd);
	
	public int countUser(String loginName);
}
