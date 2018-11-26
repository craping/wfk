package wfk.process.biz.server;

import java.util.List;
import java.util.Map;

import wfk.common.define.bean.result.Errcode;
import wfk.common.define.bean.result.criteria.DataResult;
import wfk.process.dao.sql.entity.WFKProduct;
import wfk.process.dao.sql.entity.WFKProductFile;

public interface IProductServer {

	// 添加商品
	public Errcode add(WFKProduct product);
	// 修改商品
	public Errcode update(WFKProduct product);
	// 商品 id获取商品
	public WFKProduct getSimpleInfo(Integer id, String model);
	// 商品对象 - 获取商品
	public DataResult getList(Map<String, String> params);
	// 查询产品文档列表
	public DataResult getProductFileList(Map<String, String> params);

	/******************** 产品文档 *****************/
	public List<WFKProductFile> getFileList(Integer id);
	public Errcode addFile(WFKProductFile file);
	public Errcode updateFile(WFKProductFile file);
}
