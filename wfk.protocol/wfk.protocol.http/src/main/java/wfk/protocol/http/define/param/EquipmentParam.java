package wfk.protocol.http.define.param;

import wfk.protocol.http.core.validate.support.AbstractParam;
import wfk.protocol.http.core.validate.support.param.MultiParam;
import wfk.protocol.http.core.validate.support.param.StringParam;

public class EquipmentParam extends MultiParam {
	
	public EquipmentParam() {
		StringParam mac = new StringParam();
		mac.setValue("mac");
		mac.setRequired(false);
		mac.setEmpty(true);
		mac.setDesc("手机mac地址");
		mac.setMax("20");
		
		StringParam imei = new StringParam();
		imei.setValue("imei");
		imei.setRequired(false);
		imei.setEmpty(true);
		imei.setDesc("手机imei序列号");
		imei.setMax("20");
		
		StringParam imsi = new StringParam();
		imsi.setValue("imsi");
		imsi.setRequired(false);
		imsi.setEmpty(true);
		imsi.setDesc("手机imsi序列号");
		imsi.setMax("20");
		
		StringParam androidId = new StringParam();
		androidId.setValue("androidId");
		androidId.setRequired(false);
		androidId.setEmpty(true);
		androidId.setDesc("安卓序列号");
		androidId.setMax("20");
		
		StringParam studioVersion = new StringParam();
		studioVersion.setValue("studioVersion");
		studioVersion.setRequired(false);
		studioVersion.setEmpty(true);
		studioVersion.setDesc("平台版本号");
		studioVersion.setMax("20");
		
		StringParam systemVersion = new StringParam();
		systemVersion.setValue("systemVersion");
		systemVersion.setRequired(false);
		systemVersion.setEmpty(true);
		systemVersion.setDesc("手机系统版本号");
		systemVersion.setMax("20");
		
		StringParam brand = new StringParam();
		brand.setValue("brand");
		brand.setRequired(false);
		brand.setEmpty(true);
		brand.setDesc("品牌");
		brand.setMax("20");
		
		StringParam model = new StringParam();
		model.setValue("model");
		model.setRequired(false);
		model.setEmpty(true);
		model.setDesc("机型");
		model.setMax("20");
		
		StringParam src = new StringParam();
		src.setValue("src");
		src.setRequired(false);
		src.setEmpty(true);
		src.setDesc("机器分辨率");
		src.setMax("20");
		
		StringParam netType = new StringParam();
		netType.setValue("netType");
		netType.setRequired(false);
		netType.setEmpty(true);
		netType.setDefaultValue("0");
		netType.setDesc("网络类型[0:没有网络,1:WIFI网络,2:wap网络,3:net网络]");
		netType.setEnums(new String[]{"0","1","2","3"});
		
		StringParam batchId = new StringParam();
		batchId.setRequired(true);
		batchId.setEmpty(false);
		batchId.setValue("batchId");
		batchId.setDesc("批次ID");
		batchId.setMax("20");
		
		this.params = new AbstractParam[]{mac, imei, imsi, androidId, studioVersion, systemVersion, brand, model, src, netType, batchId};
	}
	
}
