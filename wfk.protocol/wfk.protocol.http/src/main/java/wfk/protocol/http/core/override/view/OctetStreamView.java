package wfk.protocol.http.core.override.view;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.view.AbstractView;

import wfk.common.define.bean.result.Errcode;
import wfk.common.define.bean.result.stream.StreamData;
import wfk.common.define.bean.result.stream.StreamResult;
import wfk.common.define.util.FileUtil;


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
public class OctetStreamView extends AbstractView {

	/**
	 * Default content type: "application/x-javascript".
	 * Overridable through {@link #setContentType}.
	 */
	public static final String DEFAULT_CONTENT_TYPE = "application/octet-stream";
	
	private boolean disposition;
	
	private String modelKey;
	/**
	 * Construct a new {@code OctetStreamView}, setting the content type to {@code application/octet-stream}.
	 */
	public OctetStreamView() {
		setContentType(DEFAULT_CONTENT_TYPE);
		setExposePathVariables(false);
		setDisposition(true);
	}
	
	@Override
	protected boolean generatesDownloadContent() {
		return false;
	}
	
	@Override
	protected void renderMergedOutputModel(Map<String, Object> model, HttpServletRequest request, HttpServletResponse response) throws Exception {
		StreamResult result;
		Object object = model.get(modelKey);
		
		if(!(object instanceof StreamResult)) {
			result = serialization(object);
		} else {
			result = (StreamResult) object;
		}
		
		Map<String, String> headers = result.getData().getHeader().getHeaders();
		if(headers != null) {
			for (Map.Entry<String, String> entry: headers.entrySet()) {
				if(entry.getKey().contains("Disposition") && !disposition)
					continue;
				response.setHeader(entry.getKey(), entry.getValue());
				//response.setHeader("Content-Disposition", "attachment;filename="+result.getData().getFileName());
			}
		}
		
		Map<String, Long> dataHeader = result.getData().getHeader().getDataHeader();
		if(dataHeader != null) {
			for (Map.Entry<String, Long> entry: dataHeader.entrySet()) {
				response.setDateHeader(entry.getKey(), entry.getValue());
			}
		}
		//Flush byte array to servlet output stream.
		writeToResponse(response, result.getData().getInfo());
	}
	
	/**
	 * 将对象序列化输出
	 * @author Crap
	 * @param object
	 * @return StreamResult
	 */
	protected StreamResult serialization(Object object) {
		StreamResult streamResult = new StreamResult((Errcode)object);
		
		StreamData data = disposition?new StreamData("Content-Disposition", "attachment;filename=DataResult.serializ"):new StreamData();
		data.setInfo(FileUtil.getByteArrayOutputStream(object));
		
		streamResult.setData(data);
		return streamResult;
	}

	public String getModelKey() {
		return modelKey;
	}

	public void setModelKey(String modelKey) {
		this.modelKey = modelKey;
	}

	public boolean isDisposition() {
		return disposition;
	}

	public void setDisposition(boolean disposition) {
		this.disposition = disposition;
	}
}
