package wfk.protocol.http.core.override.view;



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
public class ImageView extends OctetStreamView {

	/**
	 * Default content type: "image/gif".
	 * Overridable through {@link #setContentType}.
	 */
	public static final String DEFAULT_CONTENT_TYPE = "image/gif";
	
	/**
	 * Construct a new {@code OctetStreamView}, setting the content type to {@code image/gif}.
	 */
	public ImageView() {
		setContentType(DEFAULT_CONTENT_TYPE);
		setExposePathVariables(false);
		setDisposition(false);
	}
}
