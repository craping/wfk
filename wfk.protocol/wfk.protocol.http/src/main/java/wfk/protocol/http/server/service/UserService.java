package wfk.protocol.http.server.service;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import wfk.common.define.bean.result.Errcode;
import wfk.common.define.bean.result.Result;
import wfk.common.define.bean.result.criteria.Data;
import wfk.common.define.bean.result.criteria.DataResult;
import wfk.common.define.error.support.Errors;
import wfk.process.biz.server.IUserServer;
import wfk.process.dao.sql.entity.WFKUser;
import wfk.protocol.http.core.validate.annotation.Parameter;
import wfk.protocol.http.core.validate.annotation.ServiceMethod;
import wfk.protocol.http.core.web.handler.ServiceHandler;
import wfk.protocol.http.define.error.CustomErrors;
import wfk.protocol.http.define.param.TokenParam;
import wfk.protocol.http.server.memory.Memory;

@Controller("user")
public class UserService extends ServiceHandler {
	
	@Autowired
	private IUserServer userServer;
	
	@ServiceMethod(
		value="adminLogin",
		desc="管理员登录",
		security = true,
		params = {
			@Parameter(value="login_name",  desc="登录名"),
			@Parameter(value="login_pwd",  desc="密码"),
		}
	)
	public Errcode adminLogin(HttpServletRequest request, Map<String,String> params) {
		WFKUser user = userServer.getUser(params.get("login_name"), params.get("login_pwd"));
		if (user == null)	//判断用户是否存在
			return new Result(CustomErrors.USER_ERROR_ACCOUNT);

		HttpSession session = request.getSession();
		session.setAttribute("user", user); // 设置登录状态
		return new DataResult(Errors.OK);
	}
	
	@ServiceMethod(
		value="userInfo",
		desc="获取用户信息",
		params={
			@Parameter(type=TokenParam.class)
		}
	)
	public Errcode getUserInfo(HttpServletRequest request, Map<String,String> params) {
		WFKUser sessionUser = (WFKUser)Memory.getSessionUser(request);
		sessionUser.setUserPwd(null);
		return new DataResult(Errors.OK, new Data(sessionUser));
	}

	public IUserServer getUserServer() {
		return userServer;
	}

	public void setUserServer(IUserServer userServer) {
		this.userServer = userServer;
	}
}
