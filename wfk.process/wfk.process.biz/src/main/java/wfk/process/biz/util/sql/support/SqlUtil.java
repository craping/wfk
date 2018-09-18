package wfk.process.biz.util.sql.support;

/**
 * @since JDK 1.7
 * 
 * @author Crap
 * 
 * @version 1.4.3
 * 
 * @copyright 2013 - 2014 深圳亿码擎天科技有限公司 All rights reserved.
 */
public class SqlUtil {
	public static Object[] mergeArrays(Object[]... arrs) {
		if (arrs == null || arrs.length == 0) {
			return new String[0];
		}
		
		if (arrs.length == 1) {
			return arrs[0];
		}

		int nSize = 0;
		for (Object[] _arr : arrs) {
			if (_arr == null) {
				continue;
			}
			nSize += _arr.length;
		}

		if (nSize == 0) {
			return new String[0];
		}

		String[] newArr = new String[nSize];
		int _size = 0, _destPos = 0;

		for (Object[] _arr : arrs) {
			if (_arr == null) {
				continue;
			}

			_size = _arr.length;
			if (_size == 0) {
				continue;
			}

			System.arraycopy(_arr, 0, newArr, _destPos, _size);
			_destPos += _size;
		}

		return newArr;
	}
}
