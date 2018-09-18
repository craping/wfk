package wfk.protocol.http.core.override.view;

import java.io.ByteArrayOutputStream;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.codehaus.jackson.JsonParser;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.web.servlet.view.AbstractView;

import wfk.common.define.bean.result.Result;



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
public class HtmlView extends AbstractView {

	/**
	 * Default content type: "text/html;charset=UTF-8".
	 * Overridable through {@link #setContentType}.
	 */
	public static final String DEFAULT_CONTENT_TYPE = "text/html;charset=UTF-8";
	
	private String modelKey;
	
	private String domain;
	
	private ObjectMapper objectMapper = new ObjectMapper();
	
	/**
	 * Construct a new {@code OctetStreamView}, setting the content type to {@code text/html;charset=UTF-8}.
	 */
	public HtmlView() {
		setContentType(DEFAULT_CONTENT_TYPE);
		setExposePathVariables(false);
		objectMapper.configure(JsonParser.Feature.ALLOW_SINGLE_QUOTES, true);
		objectMapper.configure(JsonParser.Feature.ALLOW_UNQUOTED_FIELD_NAMES, true);
	}

	@Override
	protected void renderMergedOutputModel(Map<String, Object> model, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Result result = (Result)model.get(modelKey);
		String domain = this.domain == null?request.getLocalAddr():this.domain;

		//Flush byte array to servlet output stream.
		ByteArrayOutputStream baos = new ByteArrayOutputStream();
		baos.write(("<script>document.domain='"+ domain +"';</script>").getBytes());
		baos.write(objectMapper.writeValueAsBytes(result));
		writeToResponse(response, baos);
		
	}

	public String getModelKey() {
		return modelKey;
	}

	public void setModelKey(String modelKey) {
		this.modelKey = modelKey;
	}

	public String getDomain() {
		return domain;
	}

	public void setDomain(String domain) {
		this.domain = domain;
	}
	
}
