package wfk.process.biz.server.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import wfk.process.biz.server.IUserServer;
import wfk.process.biz.util.support.ServiceDao;
import wfk.process.dao.sql.entity.WFKUser;

@Service
public class UserServerImpl implements IUserServer{
	
	@Autowired
	private ServiceDao serviceDao;

	public ServiceDao getServiceDao() {
		return serviceDao;
	}

	public void setServiceDao(ServiceDao serviceDao) {
		this.serviceDao = serviceDao;
	}

	@Override
	public WFKUser getUser(String loginName, String loginPwd) {
		return serviceDao.get("select * from wfk_user where user_name=? and user_pwd=md5(?)",  WFKUser.class,
			new Object[]{loginName, loginPwd}
		);
	}
}