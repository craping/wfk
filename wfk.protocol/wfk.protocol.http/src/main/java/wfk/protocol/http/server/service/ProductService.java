package wfk.protocol.http.server.service;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

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
	
	// 系统上传路径
	private static final String SERVER_PATH = Configuration.getSysProp("sys.uploadPath"); 
	
	@Autowired
	private IProductServer productServer;

	public List<String> picesList(String htmlCode) {
		List<String> imageSrcList = new ArrayList<String>();
		Pattern p = Pattern.compile("<img\\b[^>]*\\bsrc\\b\\s*=\\s*('|\")?([^'\"\n\r\f>]+(\\.jpg|\\.bmp|\\.eps|\\.gif|\\.mif|\\.miff|\\.png|\\.tif|\\.tiff|\\.svg|\\.wmf|\\.jpe|\\.jpeg|\\.dib|\\.ico|\\.tga|\\.cut|\\.pic)\\b)[^>]*>", Pattern.CASE_INSENSITIVE);
		Matcher m = p.matcher(htmlCode);
		String quote = null;
		String src = null;
		while (m.find()) {
			quote = m.group(1);
			src = (quote == null || quote.trim().length() == 0) ? m.group(2).split("\\s+")[0] : m.group(2);
			imageSrcList.add(src);
		}
		return imageSrcList;
	}

	@ServiceMethod(
		value = "delProduct", 
		desc = "删除商品", 
		params = { 
			@Parameter(type = TokenParam.class),
			@Parameter(value = "id", desc = "商品ID") 
		}
	)
	public Errcode delProduct(HttpServletRequest request, Map<String, String> params) {
		WFKProduct product = productServer.getInfoById(Integer.parseInt(params.get("id")));
		product.setStatus(0);
		return productServer.update(product);
	}

	@ServiceMethod(
		value = "getInfoById", 
		desc = "根据ID查看商品详情", 
		params = { 
			@Parameter(type = TokenParam.class),
			@Parameter(value="id", desc="商品ID")
		}
	)
	public Errcode getProductById(HttpServletRequest request, Map<String, String> params) {
		WFKProduct product = productServer.getInfoById(Integer.parseInt(params.get("id")));
		return new DataResult(Errors.OK, new Data(product));
	}

	@ServiceMethod(
		value = "getList", 
		desc = "获取产品列表", 
		params = { 
			//@Parameter(type = TokenParam.class)
		}
	)
	public Errcode getProductList(HttpServletRequest request, Map<String, String> params) {
		return productServer.getList(params);
	}

	
	@ServiceMethod(
		value = "addProduct", 
		desc = "保存商品",
		params={
			//@Parameter(type = TokenParam.class),
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
		
		Errcode es = null;
		try {
			es = productServer.add(product);
		} catch (Exception e) {
			e.printStackTrace();
			return new Result(Errors.EXCEPTION_UNKNOW);
		}
	
		return new Result(Errors.OK);
	}
	
	
	@ServiceMethod(
			value = "updatePro", 
			desc = "更新商品"
	)
	public Errcode updatePro(HttpServletRequest request, Map<String, String> params) throws IOException, ServletException, URISyntaxException{
		
		String proId = params.get("proId");
		
		return new Result(Errors.OK);
	}

	public IProductServer getProductServer() {
		return productServer;
	}

	public void setProductServer(IProductServer productServer) {
		this.productServer = productServer;
	}
	
	
}
