package wfk.common.define.util;

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
		//System.out.println("2014-06-17".compareTo("2014-06-17"));
		System.out.println(getDistance(parseDate("2007-01-01", DateFormat.Y_M_D), parseDate("2007-01-15", DateFormat.Y_M_D), Calendar.DAY_OF_WEEK)); 
	}
	
	public static long getDistance(Date startDate, Date endDate, int field) {
		Calendar  c1  = Calendar.getInstance();
		c1.setTime(startDate);
		Calendar  c2  = Calendar.getInstance();
		c2.setTime(endDate);
		int[] p1 = {c1.get(Calendar.YEAR), c1.get(Calendar.MONTH), c1.get(Calendar.DATE), c1.get(Calendar.HOUR)};
		int[] p2 = {c2.get(Calendar.YEAR), c2.get(Calendar.MONTH), c2.get(Calendar.DATE), c1.get(Calendar.HOUR)};
		
		long distance = 0;
		switch (field) {
		case Calendar.YEAR:
			distance = p2[0] - p1[0];
			break;
		case Calendar.MONTH:
			distance =  p2[0] * 12 + p2[1] - p1[0] * 12 - p1[1];
			break;
		case Calendar.DAY_OF_WEEK:
			distance =  (long) Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 7.0));
			break;
		case Calendar.DATE:
			distance =  (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);
			break;
		case Calendar.HOUR:
			distance =  (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60);
			break;
		default:
			distance =  0;
			break;
		}
		return distance + 1;
	}
}
