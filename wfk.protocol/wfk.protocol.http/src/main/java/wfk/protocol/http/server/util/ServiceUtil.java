package wfk.protocol.http.server.util;

import java.io.BufferedReader;
import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.codehaus.jackson.JsonParseException;
import org.codehaus.jackson.JsonParser;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.type.TypeReference;

/**
 * @author Crap
 *
 * @date 2015年10月10日 上午10:23:25
 *
 * Service工具类
 */
public class ServiceUtil {
	
	private static ObjectMapper mapper = new ObjectMapper();
	static{
		mapper.configure(JsonParser.Feature.ALLOW_SINGLE_QUOTES, true);
		mapper.configure(JsonParser.Feature.ALLOW_UNQUOTED_FIELD_NAMES, true);
	}
	
	public static String getRequestBody(HttpServletRequest request){
		//获取request body中的数据
		BufferedReader reader;
		String str = "";
		String inputLine;
		try {
			reader = request.getReader();
			while ((inputLine = reader.readLine()) != null) {
				str += inputLine;
			}
			reader.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return str;
	}
	
	public static <T> T getRequestBean(HttpServletRequest request, Class<T> paramClass) throws JsonParseException, JsonMappingException, IOException{
		
		return getRequestBean(getRequestBody(request), paramClass);
	}
	
	public static <T> T getRequestBean(String str, Class<T> paramClass) throws JsonParseException, JsonMappingException, IOException{
		//转化为json实体
		return mapper.readValue(str, paramClass);
	}
	
	public static <T> List<T> getRequestListBean(HttpServletRequest request, TypeReference<List<T>> type) throws JsonParseException, JsonMappingException, IOException{

		return getRequestListBean(getRequestBody(request), type);
	}
	
	public static <T> List<T> getRequestListBean(String str, TypeReference<List<T>> type) throws JsonParseException, JsonMappingException, IOException{
		//转化为json实体
		return mapper.readValue(str, type);
	}

}
