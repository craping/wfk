package wfk.common.define.util;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.util.List;

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
public class TxtUtil {
	static Logger logger = LogManager.getLogger(TxtUtil.class);

	public static void writeTxt(String filename, Object[] headers,
			List<Object[]> cellList) throws Exception {
		FileWriter fw = new FileWriter(filename, false);
		BufferedWriter bw = new BufferedWriter(fw);

		// 标题
		String lineString = "";
		for (int i = 0; i < headers.length; i++) {
			Object[] row = (Object[]) headers[i];
			String title = (String) row[0];
			lineString += title;
			if (i < headers.length - 1) {
				lineString += ",";
			}
		}
		if (lineString != null && !lineString.isEmpty()) {
			bw.write(lineString);
			bw.newLine();
		}

		// 内容
		for (Object[] row : cellList) {
			lineString = "";
			for (int cols = 0; cols < row.length; cols++) {
				String cellContent = "";
				Object objCell = row[cols];
				if (objCell != null) {
					if (objCell instanceof Integer) {
						cellContent = objCell.toString();
					} else {
						cellContent = objCell.toString();
					}
				}
				lineString += cellContent;
				if (cols < row.length - 1) {
					lineString += ",";
				}
			}
			bw.write(lineString);
			bw.newLine();
		}

		bw.flush(); // 将数据更新至文件
		bw.close();
		fw.close();

		cellList = null;
	}

	public static void writeTxt(String filename, String[] lines)
			throws Exception {
		FileWriter fw = new FileWriter(filename, false);
		BufferedWriter bw = new BufferedWriter(fw);

		for (String line : lines) {
			if (line.length() > 0) {
				bw.write(line.trim());
				bw.write("\n");
				// bw.newLine();
			}
		}

		bw.flush(); // 将数据更新至文件
		bw.close();
		fw.close();
	}
}
