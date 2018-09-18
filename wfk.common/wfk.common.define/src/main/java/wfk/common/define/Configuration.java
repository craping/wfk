package wfk.common.define;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import java.util.Timer;
import java.util.TimerTask;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import wfk.common.define.util.FileUtil;

/** 
 * 系统配置文件类 
 * @author Crap 
 * 
 */
public class Configuration extends TimerTask {
	
	private static Logger log = LogManager.getLogger(Configuration.class);
	
	private static Configuration configation;
	
	public final static Map<String, Properties> POP_MAP = new HashMap<String, Properties>();
	
	private static String sysConfig = "config";
	
	private boolean autoUpdate;
	
	private int updateTime = 60000;
	
	private Timer timer;
	
	private String charset = "utf-8";
	
	private String[] packagesToScan = {"config.custom"};

    private Configuration(){}
    
	public static void init() {
		if(configation == null)
			configation = new Configuration();
		configation.loadConfig();
	}
	
	public static Configuration getInstance(){
    	return configation;
    }
	
	public void loadConfig() {
		load();
		if(autoUpdate){
			log.info("Configation start auto load. info:[updateTime={}ms]", updateTime);
			timer = new Timer(true);
			timer.schedule(configation, updateTime, updateTime);
		}
	}
	
    public void run(){
    	load();
    }
    
    public void load(){
    	log.debug("Configation load, info:[charset={},packagesToScan={}]", charset, Arrays.toString(packagesToScan));

    	//获取config路径下配置文件
		List<File> files = new ArrayList<File>();
		for (String path : packagesToScan) {
			try {
				path = Configuration.class.getResource("/").toURI().getPath()+path.replace(".", "/");
			} catch (URISyntaxException e) {
				e.printStackTrace();
			}
			files.addAll(FileUtil.getDirFiles(new File(path)));
		}
    	
    	InputStream in = null;
    	Properties p = null;
    	String key = null;
    	try{
			for (File file : files) {
				key = FileUtil.getFileName(file.getName());
				in = new FileInputStream(file);
				InputStreamReader inR = new InputStreamReader(in, charset);
				if(POP_MAP.containsKey(key))
					POP_MAP.get(key).load(inR);
				else{
					p = new Properties();
					p.load(inR);
					POP_MAP.put(key, p);
				}
			}
    	}catch(Exception e){  
            e.printStackTrace(); 
            if(autoUpdate) {
            	timer.cancel();
            	log.error("Configation load error atuto update cancel. info:[filename={}]", key);
            } else{
            	log.error("Configation load error. info:[filename={}]", key);
            }
        }finally{
			try {
				if(in != null)
				in.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
        }
    }
    
    public static String getSysProp(String key) {
    	Properties pop = POP_MAP.get(sysConfig);
    	if(pop == null)
    		return null;
		return pop.getProperty(key);
	}
    
    
    
    
    
    
    
    public boolean isAutoUpdate() {
		return autoUpdate;
	}

	public void setAutoUpdate(boolean autoUpdate) {
		this.autoUpdate = autoUpdate;
	}

	public String[] getPackagesToScan() {
		return packagesToScan;
	}

	public void setPackagesToScan(String[] packagesToScan) {
		this.packagesToScan = packagesToScan;
	}

	public int getUpdateTime() {
		return updateTime;
	}

	public void setUpdateTime(int updateTime) {
		this.updateTime = updateTime;
	}

	public String getCharset() {
		return charset;
	}

	public void setCharset(String charset) {
		this.charset = charset;
	}
	
	public static Properties getProp(String propName) {
		return POP_MAP.get(propName);
	}
	
	public static String getSysConfig() {
		return sysConfig;
	}

	public static void setSysConfig(String sysConfig) {
		Configuration.sysConfig = sysConfig;
	}
	
	

    public Timer getTimer() {
		return timer;
	}

	public void setTimer(Timer timer) {
		this.timer = timer;
	}

	/** 
     * 测试主程序 
     * @param args
     */  
    public static void main(String[] args){
    	new Configuration().load();
    	System.out.println(Configuration.POP_MAP.size());
    	for (String key : Configuration.POP_MAP.keySet()) {
    		System.out.println("key="+key);
			Properties p = Configuration.POP_MAP.get(key);
			for (Object pKey : p.keySet()) {
				System.out.println(pKey+"="+p.get(pKey));
			}
			
		}
    }  
  
}  