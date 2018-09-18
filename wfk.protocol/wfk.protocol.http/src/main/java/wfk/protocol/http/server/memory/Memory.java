package wfk.protocol.http.server.memory;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.codehaus.jackson.JsonParser;
import org.codehaus.jackson.map.ObjectMapper;

import wfk.process.dao.sql.entity.TUser;

public class Memory {

	public static String SERVER_ID;
	
	public static String SERVER_URL;
	
	public static int GLOBAL_USERID = 0;
	
	public static int GLOBAL_TASKID = 0;
	
	public static Map<String, String> SYSTEM_CONFIG = new HashMap<>();
	
	private ObjectMapper mapper = new ObjectMapper();
	{
		mapper.configure(JsonParser.Feature.ALLOW_SINGLE_QUOTES, true);
		mapper.configure(JsonParser.Feature.ALLOW_UNQUOTED_FIELD_NAMES, true);
	}


	public static TUser getSessionUser(HttpServletRequest request){
		HttpSession session = request.getSession();
		if(session == null)
			return null;
		TUser sessionUser = (TUser) session.getAttribute("user");
		return sessionUser;
	}
	
}
