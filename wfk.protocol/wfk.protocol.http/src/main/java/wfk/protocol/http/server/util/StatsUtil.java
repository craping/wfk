package wfk.protocol.http.server.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import wfk.common.define.util.DateUtil;

public class StatsUtil {
	
	public static String getBillTableName(String baseTableName,Date strDate) {
		return baseTableName + "_" + DateUtil.formatDate("yyyyMMdd", strDate);
	}
	
	public static String getBillTableName(String baseTableName,String strDate) {
		return baseTableName + "_" + DateUtil.formatDate("yyyy-MM-dd","yyyyMMdd", strDate);
	}
	
	public static void main(String[] args) throws ParseException {
		new SimpleDateFormat("yyyy-MM-dd").parse("2015-05-04");
		String a = "a,b,,,c";
		String url = "C:/Users/Administrator/git/wfk/wfk.admin/uploadfile/html/1540542798561.html";
		String imgurl = url.substring(url.lastIndexOf("/uploadfile"), url.length());
		System.out.println(imgurl);
		
	}
}
