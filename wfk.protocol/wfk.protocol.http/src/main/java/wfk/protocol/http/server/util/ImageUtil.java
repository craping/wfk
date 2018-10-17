package wfk.protocol.http.server.util;

import java.io.File;
import java.io.IOException;
import java.net.URISyntaxException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.Part;

import wfk.common.define.Configuration;
import wfk.protocol.http.core.util.FileUtil;

/**
 * 图片工具类
 * 
 * @author wangr
 *
 */

public class ImageUtil {
	
	// 获取上传文件目录
	private final static String UPLOAD_PATH = Configuration.getSysProp("sys.uploadPath");

	/**
	 * 保存上传图片
	 * 
	 * @param request 请求参数
	 * @param fileName 自定义文件名
	 * @param imgPath 自定义文件夹名 uploadfile/img/xxxx , 默认uploadfile/img/
	 * @return imgurl 图片路径
	 * @throws IOException
	 * @throws ServletException
	 * @throws URISyntaxException
	 */
	public static String saveImageFile(HttpServletRequest request, String fileName, String imgPath,String partPath) throws IOException, ServletException, URISyntaxException {
		// 生成上传文件根目录
		FileUtil.createDirs(UPLOAD_PATH + Configuration.getSysProp("sys.filePath"), true);
		// 获取图片文件码
		Part part = request.getPart(partPath);	
		if(part.getSize()<=0){
			return null;
		}
		String saveImgPath = UPLOAD_PATH + Configuration.getSysProp("sys.imgPath") + imgPath;	
		// 生存保存文件目录
		FileUtil.createDirs(saveImgPath, true);
		String url = saveImgPath +"/" +fileName;
		part.write(url);	// 写入文件
		String imgurl = url.substring(url.lastIndexOf("/uploadfile"), url.length());
		return imgurl;
	}
	
	/**
	 * @param request
	 * @param fileName
	 * @param imgPath
	 * @param partPath
	 * @return
	 * @throws IOException
	 * @throws ServletException
	 * @throws URISyntaxException
	 */
	public static String saveImages(HttpServletRequest request, String imgPath, String requestName, String fileName) throws IOException, ServletException, URISyntaxException{
		// 获取文件
		Part part = request.getPart(requestName);
		if (part == null ) {
			return null; // 文件不存在返回
		}
		if(part.getSize() == 0){
			return null; // 文件不存在返回
		}
		
		String path = UPLOAD_PATH + imgPath ;
		File file = new File(path);//创建文件夹
		if(!file.exists()){
			file.mkdirs();//创建
		}
		
		String type = part.getHeader("content-disposition");
		type = type.substring(type.lastIndexOf("."), type.length() - 1);
		String url = path + fileName + type;
		part.write(url); // 写入文件
		String imgurl = url.substring(url.lastIndexOf("/uploadfile"), url.length());
		return imgurl;
	}
	
	public static String num(){
		int a[] = new int[10];
		for (int i = 0; i <= 5; i++) {
			a[i] = (int) (Math.random() * 10); 
		}
		String num = "";
		for (int i = 0; i < 5; i++){
			num+= a[i];
	 	}
	    return num;
	}
	
	public static String getPath(String copyFlag) throws URISyntaxException {
		String path = "";//ManUserServer.class.getResource("/").toURI().getPath();
		path = path.substring(0, path.lastIndexOf("WEB-INF"));
		copyFlag = copyFlag.substring(copyFlag.lastIndexOf("uploadfile"), copyFlag.length());
		path = path + copyFlag;
		return path;
	}
}