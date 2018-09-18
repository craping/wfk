package wfk.protocol.http.server.service.web;

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
import wfk.protocol.http.core.validate.annotation.Parameter;
import wfk.protocol.http.core.validate.annotation.ServiceMethod;
import wfk.protocol.http.core.validate.security.Coder;
import wfk.protocol.http.core.web.handler.ServiceHandler;
import wfk.protocol.http.define.error.CustomErrors;
import wfk.protocol.http.define.param.EmailParam;
import wfk.protocol.http.define.param.MobileParam;
import wfk.protocol.http.define.param.TokenParam;
import wfk.protocol.http.server.memory.Memory;
import wfk.process.biz.server.IUserServer;
import wfk.process.dao.sql.entity.TUser;

@Controller("user")
public class UserService extends ServiceHandler {

	@Autowired
	private IUserServer userServer;
	
	@ServiceMethod(
		value="register",
		desc="用户注册",
		security=true,
		params={
			@Parameter(value="name",  desc="名称"),
			@Parameter(value="loginName",  desc="登录名"),
			@Parameter(value="loginPwd",  desc="密码"),
			@Parameter(value="email", type=EmailParam.class,  desc="邮箱"),
			@Parameter(value="phone", type=MobileParam.class,  desc="电话号码")
			
		}
	)
	public Errcode register(HttpServletRequest request, Map<String,String> params) {
		
		TUser user = new TUser();
		user.setName(params.get("name"));
		user.setLoginname(params.get("loginName"));
		user.setLoginpwd(Coder.encryptMD5(params.get("loginPwd")));
		user.setEmail(params.get("email"));
		user.setPhonecode(params.get("phone"));
		
		if(userServer.countUser(user.getLoginname()) > 0)
			return new Result(CustomErrors.USER_ERROR_EXIST);
		
		return userServer.addUser(user);
	}
	
	@ServiceMethod(
		value="login",
		desc="用户登录",
		security=true,
		params={
			@Parameter(value="loginName",  desc="登录名"),
			@Parameter(value="loginPwd",  desc="密码")
		}
	)
	public Errcode login(HttpServletRequest request, Map<String,String> params) {
		
		TUser user = userServer.getUser(params.get("loginName"), params.get("loginPwd"));
		if(user == null)
			return new Result(CustomErrors.USER_ERROR_ACCOUNT);
		
		HttpSession session = request.getSession();
		session.setAttribute("user", user);
		
		return new DataResult(Errors.OK, new Data(user));
	}
	
	@ServiceMethod(
		value="getUserInfo",
		desc="获取用户信息",
		params={
			@Parameter(type=TokenParam.class)
		}
	)
	public Errcode getUserInfo(HttpServletRequest request, Map<String,String> params) {
		
		TUser sessionUser = Memory.getSessionUser(request);
		sessionUser.setLoginpwd(null);
		return new DataResult(Errors.OK, new Data(sessionUser));
	}

	
	@ServiceMethod(
		value="modifyPwd",
		desc="修改密码",
		params={
			@Parameter(value="loginName",  desc="登录名"),
			@Parameter(value="loginPwd",  desc="密码"),
			@Parameter(value="code",  desc="验证码")
		}
	)
	public Errcode modifyPwd(HttpServletRequest request, Map<String,String> params) {
		
		TUser user = userServer.getUser(params.get("loginName"), params.get("loginPwd"));
		if(user == null)
			return new Result(CustomErrors.USER_ERROR_ACCOUNT);
		
		HttpSession session = request.getSession();
		session.setAttribute("user", user);
		
		return new DataResult(Errors.OK, new Data(user));
	}

	public IUserServer getUserServer() {
		return userServer;
	}

	public void setUserServer(IUserServer userServer) {
		this.userServer = userServer;
	}
	
	
}
