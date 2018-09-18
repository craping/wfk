package wfk.protocol.http.define.param;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.Part;

import wfk.common.define.bean.result.Errcode;
import wfk.common.define.error.support.Errors;
import wfk.protocol.http.core.validate.exception.ParamEmptyException;
import wfk.protocol.http.core.validate.exception.ParamFormatException;
import wfk.protocol.http.core.validate.exception.ValidationException;
import wfk.protocol.http.core.validate.support.param.ValidateParam;


public class FileParam extends ValidateParam {
	
	protected String ContentType;
	
	@Override
	protected Errcode validateValue(HttpServletRequest request, String paramString) throws ValidationException {
		try {
			Part part = request.getPart(this.value);
			if(part == null)
				throw new ParamEmptyException(this.value);
			
			if(this.ContentType != null){
				boolean formatError = true;
				String[] contentTypes = this.ContentType.split(",");
				for (String type : contentTypes) {
					if(part.getContentType().contains(type)){
						formatError = false;
						break;
					}
				}
				if(formatError)
					throw new ParamFormatException(this);
			}
			System.out.println("file size:"+part.getSize());
		} catch (IllegalStateException | IOException | ServletException e) {
			e.printStackTrace();
			return Errors.DATA_TYPE_ERROR;
		}
		return Errors.OK;
	}
}
