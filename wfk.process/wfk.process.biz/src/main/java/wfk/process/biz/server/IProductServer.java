package wfk.process.biz.server;

import java.util.Map;

import wfk.common.define.bean.result.Errcode;
import wfk.common.define.bean.result.criteria.DataResult;
import wfk.process.dao.sql.entity.WFKProduct;

public interface IProductServer {

	// 添加商品
	public Errcode add(WFKProduct product);

	// 修改商品
	public Errcode update(WFKProduct product);

	// 商品 id获取商品
	public WFKProduct getInfoById(int id);

	// 商品对象 - 获取商品
	public DataResult getList(Map<String, String> params);
	
	// 查询产品文档列表
	public DataResult getProductFileList(Map<String, String> params);

}
