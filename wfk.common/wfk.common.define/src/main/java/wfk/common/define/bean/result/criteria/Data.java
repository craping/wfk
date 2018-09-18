package wfk.common.define.bean.result.criteria;

import java.util.ArrayList;
import java.util.List;

import org.codehaus.jackson.map.annotate.JsonSerialize;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)//jackson 1.x
@JsonInclude(Include.NON_NULL)//jackson 2.x
public class Data extends Page {

	/**
	 * 
	 */
	private static final long serialVersionUID = 3827967228536008000L;
	
	//@XStreamImplicit(itemFieldName="info")
	//protected Object info;	//数据集
	
	protected Object info;
	
	public Data() {}
	
	public Data(Object... info) {
		List<Object> list = new ArrayList<>();	
		for (Object object : info) {
			list.add(object);
		}
		this.info = list;
	}
	
	public Data(Object info) {
		this.info = info;
	}
	
	public Data(Object info, Page page) {
		this(info);
		setPage(page);
	}
	
	public Object getInfo() {
		return info;
	}

	public void setInfo(Object info) {
		this.info = info;
	}

	public void setInfo(Object... info) {
		List<Object> list = new ArrayList<>();
		for (Object object : info) {
			list.add(object);
		}
		this.info = list;
	}
	
	public void setPage(Page page) {
		this.totalnum = page.getTotalnum();
		this.totalpage = page.getTotalpage();
		this.num = page.getNum();
		this.page = page.getPage();
	}
}
