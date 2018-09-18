package wfk.process.biz.server.support;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import wfk.common.define.bean.result.Errcode;
import wfk.common.define.bean.result.Result;
import wfk.common.define.error.support.Errors;
import wfk.process.biz.server.IUserServer;
import wfk.process.biz.util.IServiceDao;
import wfk.process.dao.sql.entity.TUser;


/**
 * @author Crap
 *
 * @date 2015年10月19日 上午10:13:55
 *
 *
 */
@Service
public class UserServer implements IUserServer {
	
	@Autowired
	private IServiceDao serviceDao;


	public IServiceDao getServiceDao() {
		return serviceDao;
	}

	public void setServiceDao(IServiceDao serviceDao) {
		this.serviceDao = serviceDao;
	}


	/**
	 * @author Crap
	 * @date 2015年10月21日 下午6:00:32
	 * @param user
	 * @return
	 */
	public Errcode addUser(TUser user) {
		serviceDao.getMapper().save(user);
		
		return new Result(Errors.OK);
	}
	
	/**
	 * @author Crap
	 * @date 2015年10月21日 下午6:02:01
	 * @param loginName
	 * @return
	 */
	public TUser getUser(String loginName, String loginPwd) {

		return serviceDao.get(
			"select * from t_user where loginName=? and loginPwd=md5(?)", 
			TUser.class,
			new Object[]{loginName, loginPwd}
		);
	}

	/**
	 * @author Crap
	 * @date 2015年11月3日 下午3:41:40
	 * @param loginName
	 * @return
	 */
	public int countUser(String loginName) {

		return serviceDao.count(
			"select count(0) from t_user where loginName=?", 
			new Object[]{loginName}
		);
	}
}
