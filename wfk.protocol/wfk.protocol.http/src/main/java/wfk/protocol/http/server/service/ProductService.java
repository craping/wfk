package wfk.protocol.http.server.service;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import wfk.common.define.Configuration;
import wfk.common.define.bean.result.Errcode;
import wfk.common.define.bean.result.Result;
import wfk.common.define.bean.result.criteria.Data;
import wfk.common.define.bean.result.criteria.DataResult;
import wfk.common.define.error.support.Errors;
import wfk.process.biz.server.IProductServer;
import wfk.process.dao.sql.entity.WFKProduct;
import wfk.protocol.http.core.util.ClassUtil;
import wfk.protocol.http.core.validate.annotation.Parameter;
import wfk.protocol.http.core.validate.annotation.ServiceMethod;
import wfk.protocol.http.core.web.handler.ServiceHandler;
import wfk.protocol.http.define.param.TokenParam;
import wfk.protocol.http.server.util.ImageUtil;

@Controller("product")
public class ProductService extends ServiceHandler {
	
	@Autowired
	private IProductServer productServer;

	@ServiceMethod(
		value = "delProduct", 
		desc = "删除商品", 
		params = { 
			@Parameter(type = TokenParam.class),
			@Parameter(value = "id", desc = "商品ID"),
			@Parameter(value = "status", desc = "状态") 
		}
	)
	public Errcode delProduct(HttpServletRequest request, Map<String, String> params) {
		WFKProduct product = productServer.getInfoById(Integer.parseInt(params.get("id")));
		product.setStatus(Integer.parseInt(params.get("status")));
		return productServer.update(product);
	}

	@ServiceMethod(
		value = "getInfoById", 
		desc = "根据ID查看商品详情", 
		params = { 
			@Parameter(value="id", desc="商品ID")
		}
	)
	public Errcode getInfoById(HttpServletRequest request, Map<String, String> params) {
		WFKProduct product = productServer.getInfoById(Integer.parseInt(params.get("id")));
		return new DataResult(Errors.OK, new Data(product));
	}

	@ServiceMethod(
		value = "getList", 
		desc = "获取产品列表", 
		params = { 
			@Parameter(value="product_name", desc="产品名称", required=false),
			@Parameter(value="stock_id", desc="产品编号", required=false),
			@Parameter(value="panel_size", desc="面板尺寸", required=false),
			@Parameter(value="resolution", desc="分辨率", required=false),
			@Parameter(value="brand", desc="品牌", required=false),
			@Parameter(value="model", desc="面板型号", required=false),
			@Parameter(value="status", desc="商品状态1有效0无效", required=false)
		}
	)
	public Errcode getList(HttpServletRequest request, Map<String, String> params) {
		return productServer.getList(params);
	}

	@ServiceMethod(
		value = "addProduct", 
		desc = "保存商品",
		params={
			@Parameter(type = TokenParam.class),
		}
	)
	public Errcode addProduct(HttpServletRequest request, Map<String, String> params) throws IOException, ServletException, URISyntaxException{
		WFKProduct product = new WFKProduct();
		product = ClassUtil.fillObject(params, product);
		
		String stock_id = params.get("stock_id");
		String file_url = ImageUtil.saveImages(request, Configuration.getSysProp("sys.img") + stock_id + "/", "specification", stock_id);
		product.setFileUrl(file_url);
	
		StringBuffer sb = new StringBuffer();
		int n = 0;
		for(int i = 0; i < 5; i++){
			String pic_name = "def_pic_" + i;
			String pic_path = ImageUtil.saveImages(request, Configuration.getSysProp("sys.img") + stock_id + "/", pic_name, pic_name);
			if(pic_path != null && !"".equals(pic_path)) {
				if(n != 0) sb.append(",");
				sb.append(pic_path);
				n ++;
			}
		}
		if(sb != null && !"".equals(sb.toString())) 
			product.setImages(sb.toString());
		
		productServer.add(product);
		return new Result(Errors.OK);
	}
	
	@ServiceMethod(
		value = "updateProduct", 
		desc = "更新商品",
		params={
			@Parameter(type = TokenParam.class),
		}
	)
	public Errcode updateProduct(HttpServletRequest request, Map<String, String> params) throws IOException, ServletException, URISyntaxException{
		
		String pid = params.get("id");
		WFKProduct product = ClassUtil.fillObject(params, productServer.getInfoById(Integer.parseInt(pid)));
		
		String[] def_pic = request.getParameterValues("def_pic");
		String stock_id = product.getStockId().toString();
		
		String file_url = ImageUtil.saveImages(request, Configuration.getSysProp("sys.img") + stock_id + "/", "specification", stock_id);
		if (file_url != null && file_url !="") {
			product.setFileUrl(file_url);
		}
		
		StringBuffer sb = new StringBuffer();
		int n = 0;
		for(int i = 0; i < 5; i++){
			String pic_name = "def_pic_" + i;
			String pic_path = ImageUtil.saveImages(request, Configuration.getSysProp("sys.img") + stock_id + "/", pic_name, pic_name);
			if(pic_path != null && !"".equals(pic_path)) {
				if(n != 0) sb.append(",");
				sb.append(pic_path);
				n ++;
			}
		}
		if(sb != null && !"".equals(sb.toString())) 
			product.setImages(sb.toString());
		
		if(def_pic != null && def_pic.length > 0){
			for(String pic : def_pic){
				if(sb.length() > 0) sb.append(",");
				sb.append(pic);
			}
		}
		if(sb != null && !"".equals(sb.toString())) {
			product.setImages(sb.toString());
	    } else {
	    	product.setImages("");
		}
	
		productServer.update(product);
		return new Result(Errors.OK);
	}

	public IProductServer getProductServer() {
		return productServer;
	}

	public void setProductServer(IProductServer productServer) {
		this.productServer = productServer;
	}
}