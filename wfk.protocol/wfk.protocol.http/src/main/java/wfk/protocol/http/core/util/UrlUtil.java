package wfk.protocol.http.core.util;

import java.io.UnsupportedEncodingException;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

/** 
 * @project Crap
 * 
 * @author Crap
 * 
 * @Copyright 2013 - 2014 All rights reserved. 
 * 
 * @email 422655094@qq.com
 * 
 */
public class UrlUtil {
	static Logger logger = LogManager.getLogger(UrlUtil.class);

	public static String decodeUrlParam(String src) {
		String decodeStr = src;
		try {
			decodeStr = java.net.URLDecoder.decode(src, "UTF-8");
		} catch (UnsupportedEncodingException ex) {
			logger.fatal(ex.getMessage(), ex);
		}
		return decodeStr;
	}

	public static String encodeUrlParam(String src) {
		String encodeStr = src;
		try {
			encodeStr = java.net.URLEncoder.encode(src, "UTF-8");
		} catch (UnsupportedEncodingException ex) {
			logger.fatal(ex.getMessage(), ex);
		}
		return encodeStr;
	}

	public static void main(String[] args) {
		// String str = "测试";
		String str = "测试短信ABC123";
		String encodeStr = encodeUrlParam(str);
		String decodeStr = decodeUrlParam(encodeStr);
		System.out.println(encodeStr);
		System.out.println(decodeStr);
	}

}
