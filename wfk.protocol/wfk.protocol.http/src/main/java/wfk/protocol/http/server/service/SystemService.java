package wfk.protocol.http.server.service;

import java.security.interfaces.RSAPublicKey;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;

import wfk.common.define.bean.medium.JsonPublicKey;
import wfk.common.define.bean.result.Errcode;
import wfk.common.define.bean.result.criteria.Data;
import wfk.common.define.bean.result.criteria.DataResult;
import wfk.common.define.error.support.Errors;
import wfk.protocol.http.core.validate.ValidationAdapter;
import wfk.protocol.http.core.validate.annotation.ServiceMethod;
import wfk.protocol.http.core.validate.security.Coder;
import wfk.protocol.http.core.web.handler.ServiceHandler;
import wfk.protocol.http.server.util.PackageUtil;

@Controller("sys")
public class SystemService extends ServiceHandler {
	
	/**
	 * 系统模块--------------------------------------------------------------
	 */
	@ServiceMethod(
		value="getPublicKey",
		desc="随机获取公钥"
	)
	public Errcode getPublicKey(HttpServletRequest request, Map<String,String> params) {
		int index = (int)(Math.random()*ValidationAdapter.keyPairList.size());
		RSAPublicKey publicKey = (RSAPublicKey)ValidationAdapter.keyPairList.get(index).getPublic();

		JsonPublicKey jsonKeyPair = new JsonPublicKey();
		jsonKeyPair.setId(index);
		jsonKeyPair.setN(publicKey.getModulus().toString());
		jsonKeyPair.setE(publicKey.getPublicExponent().toString());
		try {
			jsonKeyPair.setPublicKey(Coder.encryptBASE64(publicKey.getEncoded()));
		} catch (Exception e) {
			e.printStackTrace();
		}
		return new DataResult(Errors.OK, new Data(jsonKeyPair));
	}
	
	@ServiceMethod(
		value="apiDocument",
		desc="获取API文档"
	)
	public Errcode apiDocument(HttpServletRequest request, Map<String,String> params) {
		String host = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+request.getContextPath()+request.getServletPath();
		String document = null;
		try {
			document = PackageUtil.apiResolve("wfk.protocol.http.server.service", host);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return new DataResult(Errors.OK, new Data(document));
	}
}