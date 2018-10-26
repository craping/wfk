package wfk.protocol.http.server.service;

import java.io.File;
import java.io.IOException;
import java.net.URISyntaxException;
import java.util.Date;
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
import wfk.process.biz.server.INewsServer;
import wfk.process.dao.sql.entity.WFKNews;
import wfk.protocol.http.core.util.ClassUtil;
import wfk.protocol.http.core.validate.annotation.Parameter;
import wfk.protocol.http.core.validate.annotation.ServiceMethod;
import wfk.protocol.http.core.web.handler.ServiceHandler;
import wfk.protocol.http.server.util.FileUtil;
import wfk.protocol.http.server.util.ImageUtil;
import wfk.protocol.http.server.util.Tools;

@Controller("news")
public class NewsService extends ServiceHandler {
	
	private static final String SERVER_PATH = Configuration.getSysProp("sys.uploadPath");
	
	@Autowired
	private INewsServer newsServer;

	@ServiceMethod(
		value = "oprNews", 
		desc = "操作新闻", 
		params = { 
			//@Parameter(type = TokenParam.class),
			@Parameter(value = "id", desc = "新闻id"),
			@Parameter(value = "status", desc = "状态") 
		}
	)
	public Errcode oprNews(HttpServletRequest request, Map<String, String> params) {
		WFKNews news = newsServer.getInfoById(Integer.parseInt(params.get("id")));
		news.setStatus(Integer.parseInt(params.get("status")));
		return newsServer.update(news);
	}

	@ServiceMethod(
		value = "getInfoById", 
		desc = "根据ID查看新闻详情", 
		params = { 
			//@Parameter(type = TokenParam.class),
			@Parameter(value="id", desc="商品ID")
		}
	)
	public Errcode getInfoById(HttpServletRequest request, Map<String, String> params) {
		WFKNews news = newsServer.getInfoById(Integer.parseInt(params.get("id")));
		if (!Tools.isStrEmpty(news.getContent())){
			String file_url = SERVER_PATH + news.getContent();
			String real_content = FileUtil.getString(file_url);
			news.setContent(real_content);
		}
		return new DataResult(Errors.OK, new Data(news));
	}

	@ServiceMethod(
		value = "getList", 
		desc = "获取新闻列表", 
		params = { 
			//@Parameter(type = TokenParam.class)
		}
	)
	public Errcode getList(HttpServletRequest request, Map<String, String> params) {
		return newsServer.getList(params);
	}

	
	@ServiceMethod(
		value = "addNews", 
		desc = "新增新闻",
		params={
			@Parameter(value = "type", desc = "新闻类别"),
			@Parameter(value = "title", desc = "新闻标题"),
			@Parameter(value = "context", desc = "新闻内容")
		}
	)
	public Errcode addNews(HttpServletRequest request, Map<String, String> params) throws IOException, ServletException, URISyntaxException{

		String content = params.get("context");
		if (Tools.isStrEmpty(content)) {
			return new Result(Errors.DATA_TYPE_ERROR);
		}
		
		WFKNews news = new WFKNews();
		news = ClassUtil.fillObject(params, news);
		
		String title_file = ImageUtil.saveImages(request, Configuration.getSysProp("sys.newsimg"), "title_pic", new Date().getTime()+"");
		news.setTitleFile(title_file);
		
		String htmlFileName = new Date().getTime() + ".html"; // 新闻详情文件名
		String content_file = FileUtil.writeHtml(content, SERVER_PATH + Configuration.getSysProp("sys.html"), htmlFileName);
		news.setContent(content_file);	
		news.setPulishTime(new Date());

		newsServer.add(news);
		return new Result(Errors.OK);
	}
	
	
	@ServiceMethod(
		value = "updateNews", 
		desc = "修改新闻",
		params={
			@Parameter(value = "id", desc = "新闻id"),
			@Parameter(value = "type", desc = "新闻类别"),
			@Parameter(value = "title", desc = "新闻标题"),
			@Parameter(value = "context", desc = "新闻内容")
		}
	)
	public Errcode updateNews(HttpServletRequest request, Map<String, String> params) throws IOException, ServletException, URISyntaxException{
		
		String content = params.get("context");
		if (Tools.isStrEmpty(content)) {
			return new Result(Errors.DATA_TYPE_ERROR);
		}
		
		WFKNews news = newsServer.getInfoById(Integer.parseInt(params.get("id")));
		news = ClassUtil.fillObject(params, news);
		
		String title_file = ImageUtil.saveImages(request, Configuration.getSysProp("sys.newsimg"), "title_pic", new Date().getTime()+"");
		news.setTitleFile(title_file);
		
		String htmlFileName = new Date().getTime() + ".html"; // 新闻详情文件名
		String content_file = FileUtil.writeHtml(content, SERVER_PATH + Configuration.getSysProp("sys.html"), htmlFileName);
		news.setContent(content_file);	
		news.setPulishTime(new Date());

		newsServer.update(news);
		return new Result(Errors.OK);
	}

	public INewsServer getNewsServer() {
		return newsServer;
	}

	public void setNewsServer(INewsServer newsServer) {
		this.newsServer = newsServer;
	}
}