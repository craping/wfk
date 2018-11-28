package wfk.protocol.http.server.service;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import wfk.common.define.Configuration;
import wfk.common.define.bean.result.Errcode;
import wfk.common.define.bean.result.Result;
import wfk.common.define.bean.result.criteria.Data;
import wfk.common.define.bean.result.criteria.DataResult;
import wfk.common.define.error.support.Errors;
import wfk.process.biz.pojo.ProductPOJO;
import wfk.process.biz.server.IProductServer;
import wfk.process.dao.sql.entity.WFKProduct;
import wfk.process.dao.sql.entity.WFKProductFile;
import wfk.protocol.http.core.util.ClassUtil;
import wfk.protocol.http.core.validate.annotation.Parameter;
import wfk.protocol.http.core.validate.annotation.ServiceMethod;
import wfk.protocol.http.core.web.handler.ServiceHandler;
import wfk.protocol.http.define.param.TokenParam;
import wfk.protocol.http.server.util.FileUtil;
import wfk.protocol.http.server.util.ImageUtil;
import wfk.protocol.http.server.util.Tools;

@Controller("product")
public class ProductService extends ServiceHandler {
	
	private static final String SERVER_PATH = Configuration.getSysProp("sys.uploadPath");
	
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
		WFKProduct product = productServer.getSimpleInfo(Integer.parseInt(params.get("id")), null);
		product.setStatus(Integer.parseInt(params.get("status")));
		return productServer.update(product);
	}
	
	@ServiceMethod(
		value = "getSimpleInfo", 
		desc = "获取产品简略信息，不包含文档信息", 
		params = { 
			@Parameter(value="id", desc="商品ID")
		}
	)
	public Errcode getSimpleInfo(HttpServletRequest request, Map<String, String> params) {
		WFKProduct product = productServer.getSimpleInfo((Integer.parseInt(params.get("id"))), null);
		// 解析产品详情
		if (!Tools.isStrEmpty(product.getContent())){
			String file_url = SERVER_PATH + product.getContent();
			String real_content = FileUtil.getString(file_url);
			product.setContent(real_content);
		}
		return new DataResult(Errors.OK, new Data(product));
	}
	
	@ServiceMethod(
		value = "getFileInfo", 
		desc = "查看产品文档信息", 
		params = { 
			@Parameter(value="model", desc="产品型号")
		}
	)
	public Errcode getFileInfo(HttpServletRequest request, Map<String, String> params) {
		WFKProduct product = productServer.getSimpleInfo(null, params.get("model"));
		if (product == null)
			return new DataResult(Errors.DATA_NOT_EXIST);

		List<WFKProductFile> result = productServer.getFileList(product.getId());
		return new DataResult(Errors.OK, new Data(result));
	}

	@ServiceMethod(
		value = "getInfo", 
		desc = "获取完整产品信息", 
		params = { 
			@Parameter(value="id", desc="商品ID")
		}
	)
	public Errcode getInfo(HttpServletRequest request, Map<String, String> params) {
		WFKProduct product = productServer.getSimpleInfo(Integer.parseInt(params.get("id")), null);
		ProductPOJO pojo = new ProductPOJO();
		BeanUtils.copyProperties(product, pojo);
		
		// 解析产品详情
		if (!Tools.isStrEmpty(product.getContent())){
			String file_url = SERVER_PATH + product.getContent();
			String real_content = FileUtil.getString(file_url);
			pojo.setContent(real_content);
		}
		
		List<WFKProductFile> result = productServer.getFileList(product.getId());
		pojo.setFileList((List<WFKProductFile>) result);
		return new DataResult(Errors.OK, new Data(pojo));
	}

	@ServiceMethod(
		value = "getList", 
		desc = "获取产品列表", 
		params = { 
			@Parameter(value="product_name", desc="产品名称", required=false),
			@Parameter(value="panel_size", desc="面板尺寸", required=false),
			@Parameter(value="resolution", desc="分辨率", required=false),
			@Parameter(value="panel_brand", desc="品牌", required=false),
			@Parameter(value="panel_model", desc="面板型号", required=false),
			@Parameter(value="status", desc="商品状态1有效0无效", required=false),
			@Parameter(value="app_type", desc="应用类别：1笔记本2工控3安防4监控5医疗设备6广告机", required=false)
		}
	)
	public Errcode getList(HttpServletRequest request, Map<String, String> params) {
		return productServer.getList(params);
	}
	
	@ServiceMethod(
		value = "getProductFileList", 
		desc = "获取产品文档列表"
	)
	public Errcode getProductFileList(HttpServletRequest request, Map<String, String> params) {
		return productServer.getProductFileList(params);
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
		
		String content = params.get("context"); // 产品详情
		if (!Tools.isStrEmpty(content)) {
			String htmlFileName = params.get("panel_model") + ".html"; // 详情文件名
			String content_file = FileUtil.writeHtml(content, SERVER_PATH + Configuration.getSysProp("sys.html"), htmlFileName);
			product.setContent(content_file);
		}
		try {
			// 插入产品基本信息
			productServer.add(product);
		} catch (Exception ex) {
			ex.printStackTrace();
			return new Result(Errors.EXCEPTION_UNKNOW, ex.getMessage());
		}
		return new Result(Errors.OK);
	}
	
	@ServiceMethod(
		value = "updateProduct", 
		desc = "更新产品", 
		params = { 
			@Parameter(type = TokenParam.class),
			@Parameter(value="id", desc="产品id")
		}
	)
	public Errcode updateProduct(HttpServletRequest request, Map<String, String> params) {
		Integer pid = Integer.parseInt(params.get("id"));
		WFKProduct product = productServer.getSimpleInfo(pid, null);
		if (product == null)
			return new DataResult(Errors.DATA_NOT_EXIST);
		
		product = (WFKProduct)ClassUtil.fillObject(params, product);

		String content = params.get("context"); // 产品详情
		if (!Tools.isStrEmpty(content)) {
			String htmlFileName = product.getPanelModel() + ".html"; // 详情文件名
			String content_file = FileUtil.writeHtml(content, SERVER_PATH + Configuration.getSysProp("sys.html"), htmlFileName);
			product.setContent(content_file);
		}
		
		try {
			productServer.update(product);
		} catch (Exception ex) {
			ex.printStackTrace();
			return new Result(Errors.EXCEPTION_UNKNOW, ex.getMessage());
		}
		return new Result(Errors.OK);
	}
	
	@ServiceMethod(
		value = "oprFile", 
		desc = "保存产品文档",
		params={
			@Parameter(type = TokenParam.class),
			@Parameter(value="model", desc="产品型号"),
			@Parameter(value="mode", desc="操作类型"),
			@Parameter(value="seq", desc="序号"),
			@Parameter(value="grade", desc="等级", required=false, empty=true)
		}
	)
	public Errcode oprFile(HttpServletRequest request, Map<String, String> params) throws IOException, ServletException, URISyntaxException{
		String model = params.get("model"); // 产品型号
		String mode = params.get("mode");
		Integer seq = Integer.parseInt(params.get("seq"));
		WFKProduct product = new WFKProduct();
		product = productServer.getSimpleInfo(null, model);
		if (product == null)
			return new Result(Errors.DATA_NOT_EXIST);
		
		String file_url = Configuration.getSysProp("sys.img") + model + "/"; // 文件地址
		if (mode == "n" || mode.equals("n")) { // 新增
			WFKProductFile file = new WFKProductFile();
			file.setPid(product.getId());
			if (seq == 7) { // 规格书
				String specification_url = ImageUtil.saveImages(request, file_url, "specification", model);
				if (specification_url != null && specification_url !="") {
					file.setFileType(1);
					file.setFileUrl(specification_url);
					productServer.addFile(file);
				}
			} else { // iis 标准
				String grade = params.get("grade");
				String iis_url = ImageUtil.saveImages(request, file_url, "iis_" + seq, model + "_" + grade);
				if (iis_url != null && iis_url !="") {
					file.setFileType(2);
					file.setFileUrl(iis_url);
					file.setGeneralGrade(grade);
					file.setSeq(seq);
					productServer.addFile(file);
				}
			}
		} else if (mode == "u" || mode.equals("u")) {
			if (seq == 7) { // 规格书
				WFKProductFile file = productServer.getFileInfo(product.getId(), 1, null);
				if (file == null)
					return new Result(Errors.DATA_NOT_EXIST);
				
				String specification_url = ImageUtil.saveImages(request, file_url, "specification", model);
				if (specification_url != null && specification_url !="") {
					file.setFileUrl(specification_url);
					productServer.updateFile(file);
				}
			} else { // iis 标准
				WFKProductFile file = productServer.getFileInfo(product.getId(), 2, seq);
				String grade = params.get("grade");
				String iis_url = ImageUtil.saveImages(request, file_url, "iis_" + seq, model + "_" + grade);
				if (iis_url != null && iis_url !="") {
					file.setFileUrl(iis_url);
					file.setGeneralGrade(grade);
					productServer.updateFile(file);
				}
			}
		}
		return new Result(Errors.OK);
	}
	
	@ServiceMethod(
		value = "oprPic", 
		desc = "更新商品",
		params={
			@Parameter(value="model", desc="产品型号"),
			@Parameter(value="mode", desc="操作类型"),
			@Parameter(type = TokenParam.class),
		}
	)
	public Errcode oprPic(HttpServletRequest request, Map<String, String> params) throws IOException, ServletException, URISyntaxException{
	
		String model = params.get("model"); // 产品型号
		String mode = params.get("mode");
		WFKProduct product = productServer.getSimpleInfo(null, model);
		if (product == null)
			return new Result(Errors.DATA_NOT_EXIST);
		
		String file_url = Configuration.getSysProp("sys.img") + model + "/";
		if (mode == "n" || mode.equals("n")) { // 新增图片
			StringBuffer sb = new StringBuffer();
		    int n = 0;
		    for (int i = 0; i < 5; ++i) {
		    	String pic_name = "def_pic_" + i;
		    	String pic_path = ImageUtil.saveImages(request, file_url, pic_name, pic_name);
		    	if ((pic_path != null) && (!("".equals(pic_path)))) {
		    		if (n != 0) sb.append(",");
		    		sb.append(pic_path);
		    		++n;
		    	}
		    }
		    
			if (sb != null && !"".equals(sb.toString())) {
				WFKProductFile file = new WFKProductFile();
				file.setPid(product.getId());
				file.setFileType(3);
				file.setFileUrl(sb.toString());
				productServer.addFile(file);
			}
		} else if (mode == "u" || mode.equals("u")) { // 更新
			WFKProductFile file = productServer.getFileInfo(product.getId(), 3, null);
			if (file == null)
				return new Result(Errors.DATA_NOT_EXIST);
			
			String[] def_pic = request.getParameterValues("def_pic");
			StringBuffer sb = new StringBuffer();
			int n = 0;
			for(int i = 0; i < 5; i++){
				String pic_name = "def_pic_" + i;
				String pic_path = ImageUtil.saveImages(request, file_url, pic_name, pic_name);
				if(pic_path != null && !"".equals(pic_path)) {
					if(n != 0) sb.append(",");
					sb.append(pic_path);
					n ++;
				}
			}
			if(sb != null && !"".equals(sb.toString())) 
				file.setFileUrl(sb.toString());
			
			if(def_pic != null && def_pic.length > 0){
				for(String pic : def_pic){
					if(sb.length() > 0) sb.append(",");
					sb.append(pic);
				}
			}
			if(sb != null && !"".equals(sb.toString())) {
				file.setFileUrl(sb.toString());
		    } else {
		    	file.setFileUrl("");
			}
			productServer.updateFile(file);
		}
		return new Result(Errors.OK);
	}

	public IProductServer getProductServer() {
		return productServer;
	}

	public void setProductServer(IProductServer productServer) {
		this.productServer = productServer;
	}
}