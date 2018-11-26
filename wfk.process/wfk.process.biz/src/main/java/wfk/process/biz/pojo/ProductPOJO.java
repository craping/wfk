package wfk.process.biz.pojo;

import java.util.List;

import wfk.process.dao.sql.entity.WFKProduct;
import wfk.process.dao.sql.entity.WFKProductFile;

public class ProductPOJO extends WFKProduct {

	public List<WFKProductFile> fileList;

	public List<WFKProductFile> getFileList() {
		return fileList;
	}

	public void setFileList(List<WFKProductFile> fileList) {
		this.fileList = fileList;
	}

}
