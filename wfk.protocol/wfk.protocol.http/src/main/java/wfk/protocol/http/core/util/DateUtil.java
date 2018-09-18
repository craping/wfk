package wfk.protocol.http.core.util;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import wfk.common.define.bean.DateFormat;

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
public class DateUtil {
	static Logger logger = LogManager.getLogger(DateUtil.class);

	public static String getAmountDate(int field, int amount, DateFormat format) {
		return getAmountDate(field, amount, format.toString());
	}
	
	public static String getAmountDate(int field, int amount, String format) {
		String strDate = new SimpleDateFormat(format).format(getAmountDate(field, amount));
		return strDate;
	}
	
	public static String getAmountDate(Date date, int field, int amount, DateFormat format) {
		return getAmountDate(date, field, amount, format.toString());
	}
	
	public static String getAmountDate(Date date, int field, int amount, String format) {
		String strDate = new SimpleDateFormat(format).format(getAmountDate(date, field, amount));
		return strDate;
	}
	
	public static Date getAmountDate(int field, int amount) {
		Calendar cal = Calendar.getInstance();
		cal.add(field, amount);
		return cal.getTime();
	}
	
	public static Date getAmountDate(Date date, int field, int amount) {
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		cal.add(field, amount);
		return cal.getTime();
	}

	public static String formatDate(DateFormat format, Date date) {
		return formatDate(format.toString(), date);
	}
	
	public static String formatDate(String format, Date date) {
		SimpleDateFormat formatter = new SimpleDateFormat(format);
		formatter.setLenient(false);
		try {
			return formatter.format(date);
		} catch (Exception ex) {
			logger.fatal(ex.getMessage(), ex);
		}
		return null;
	}
	
	public static String formatDate(String inFormat, String toFormat, String strDate) {
		String formatDate = strDate;
		SimpleDateFormat formatter = new SimpleDateFormat(toFormat);
		formatter.setLenient(false);
		try {
			formatDate = formatter.format(parseDate(strDate, inFormat));
		} catch (Exception ex) {
			logger.fatal(ex.getMessage(), ex);
		}
		return formatDate;
	}

	public static Date parseDate(String strDate, String format) {
		Date date = null;
		try {
			SimpleDateFormat simpleDateFormat = new SimpleDateFormat(format);
			date = simpleDateFormat.parse(strDate);
		} catch (Exception ex) {
			logger.fatal(ex.getMessage(), ex);
		}
		return date;
	}

	public static Date parseDate(String strDate, DateFormat format) {
		return parseDate(strDate, format.toString());
	}
	
	public static void main(String[] args) {
		System.out.println("2014-06-17".compareTo("2014-06-17"));
		
	}
}
