package wfk.protocol.http.server.util;

/**
 * @since JDK 1.7
 * 
 * @author Crap
 * 
 * @version 1.4.3
 * 
 * @copyright 2013 - 2014 深圳亿码擎天科技有限公司 All rights reserved.
 * 
 * 针对特定路由允许连接数的配置
 */
public class RouteCfg {
    private String host;
    private int port;
    private int maxConnetions;
    
    /**
     * 存储对特定路由允许连接数的配置
     * @param host 特定路由
     * @param port 端口号
     * @param maxConnetions 最大连接数
     */
    public RouteCfg(String host, int port, int maxConnetions){
        this.host = host;
        this.port = port;
        this.maxConnetions = maxConnetions;

    }
    
    public String getHost() {
        return host;
    }
    public void setHost(String host) {
        this.host = host;
    }
    public int getPort() {
        return port;
    }
    public void setPort(int port) {
        this.port = port;
    }
    public int getMaxConnetions() {
        return maxConnetions;
    }
    public void setMaxConnetions(int maxConnetions) {
        this.maxConnetions = maxConnetions;
    }

}
