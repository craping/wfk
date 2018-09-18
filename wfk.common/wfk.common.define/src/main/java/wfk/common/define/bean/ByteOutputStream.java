package wfk.common.define.bean;

import java.io.ByteArrayOutputStream;
import java.io.UnsupportedEncodingException;

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
public class ByteOutputStream extends ByteArrayOutputStream {
	
	public ByteOutputStream() {
		super();
	}
	
	public ByteOutputStream(int size) {
		super(size);
	}
	
	public String getBuf() {
		String bufStr = null;
		try {
			if(super.buf != null)
				bufStr = new String(super.buf, "ISO-8859-1");
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		return bufStr;
	}

	public int getCount() {
		return super.count;
	}
}
