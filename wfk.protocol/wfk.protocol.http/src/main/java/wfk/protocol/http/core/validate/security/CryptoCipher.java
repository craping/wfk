package wfk.protocol.http.core.validate.security;

import java.net.URLEncoder;
import java.security.PrivateKey;

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
public class CryptoCipher{
	
	private byte[] clientAESKey;
	
	public byte[] getClientAESKey() {
		return clientAESKey;
	}

	public void setClientAESKey(byte[] clientAESKey) {
		this.clientAESKey = clientAESKey;
	}

	/**
     * 加密数据
     * 
     * @param plaintext 明文字符串
     * @return 密文字符串
     */
    public String encrypt(String plaintext) {
    	try{
			String ciphertext = Coder.encryptBASE64(AES.encrypt(URLEncoder.encode(plaintext, "UTF-8").getBytes("UTF-8"), this.clientAESKey));
			return ciphertext.replaceAll("\r|\n", "");
    	}catch(Exception e){
    		e.printStackTrace();
    	}
    	return null;
    }
    
    /**
     * 加密数据
     * 
     * @param plaintext 明文字符串
     * @return 密文字符串
     */
    public String encryptSafe(String plaintext) {
    	try{
	    	byte[] key = AES.generateKey(16);
	    	
	    	String serverAESKey = Coder.encryptBASE64(AES.encrypt(key, this.clientAESKey));
			String ciphertext = Coder.encryptBASE64(AES.encrypt(URLEncoder.encode(plaintext, "UTF-8").getBytes("UTF-8"), key));
			
			return (serverAESKey + "?" + ciphertext).replaceAll("\r|\n", "");
    	}catch(Exception e){
    		e.printStackTrace();
    	}
    	return null;
    }
    
    /**
     * 解密数据
     * 
     * @param key 密钥(公钥加密则传私钥饥解密,私钥加密则传公钥解密)
     * @param ciphertext 密文的字符串(base64)
     * @return 明文字符串
     */
    public String decrypt(String base64Ciphertext, PrivateKey privateKey) {
    	try{
	    	String[] ciphertextArr = base64Ciphertext.split("[?]");
			String base64ClientAESKeyStr = ciphertextArr[0];
			String base64DataStr = ciphertextArr[1];
			
			//String privateKeyStr = "MIICeAIBADANBgkqhkiG9w0BAQEFAASCAmIwggJeAgEAAoGBAIn3APiA+OZUBst/EDia4YNmcsQ3NeUDxTp81csER7J3dAoNW75MOBGV2RPe8AUsKOeLwrTZMebe+wOdYywQPLbCHQLJJMFig3oDMSm/YsntSk4umXVFATVfHzTJm45Timwo+29fTVJPh9hOOlxAbXRV9YMrbH3cdr0EyGBPBQq5AgMBAAECgYAJbDFIx6Y4NOzx4Q++jfVxAAI+nHa12XgS8ou3fedXrQjj1t25NYNu0Akvbj5+W/G/PrBhoaPi3L/QE2O+kq1SxEg53p3dHOIVEDu3879JPfU7FUnNiv/t9sQwq9v4twRwS6BrnwSWKwdI+YYXVHqaiKw3G4I5bGS4OYkR6IMYAQJBANBniEYv9o4ez+BrPOXFlrObX6iyG0A7uWeCXorfI6LjynE0jVO5x0KSlRQid/vAzhfQbWog71wQUut1lyBOJ/kCQQCpeS//MlkzJwM51bM6qJUR9rUvYDZIojKa1dWOUCxKx51eDk3UqIXPkCTA5UiNxaR0NRyiVZHIkhNDkqVnKijBAkEAyXJaWqYAKM6F2AMwwVXmX0SgCdvn1YYlqHVvV8NrmgegZx8KQVVB1AsGyYir/BEZ5hEVwlGFrbMlw+5Nn++MWQJBAKL47mYb1dmyB5EjZ1LecVQwCja/8BPTHpT1U4Oip6VV5ohfewso8F0VQbLaCvaC/M3fkWSuox3dE3dk23ik+0ECQQCT0y1ILOk6F6Un3WMZGU1ijrb6kafvneKaLdkdrX/JsM3S34eCWefTlSA+/xyOsRPHZ8dom9/W4bGK8gVaqwvA";
			byte[] clientAESKey = RSA.decrypt(privateKey, Coder.decryptBASE64(base64ClientAESKeyStr));
			//byte[] clientAESKey = RSA.decrypt(privateKeyStr, Coder.decryptBASE64(base64ClientAESKeyStr), PrivateKey.class);
			this.clientAESKey = clientAESKey;
			
			String ciphertext = AES.decrypt(Coder.decryptBASE64(base64DataStr), clientAESKey);
			
			return ciphertext;
    	}catch(Exception e){
    		e.printStackTrace();
    	}
    	return null;
    }
    
    /**
     * 解密数据
     * 
     * @param key 密钥(公钥加密则传私钥饥解密,私钥加密则传公钥解密)
     * @param ciphertext 密文的字符串(base64)
     * @return 明文字符串
     */
    public String decryptJS(String base64Ciphertext, PrivateKey privateKey) {
    	try{
	    	String[] ciphertextArr = base64Ciphertext.split("[?]");
			String base64ClientAESKeyStr = ciphertextArr[0];
			String base64DataStr = ciphertextArr[1];
			
			//String privateKeyStr = "MIICeAIBADANBgkqhkiG9w0BAQEFAASCAmIwggJeAgEAAoGBAIn3APiA+OZUBst/EDia4YNmcsQ3NeUDxTp81csER7J3dAoNW75MOBGV2RPe8AUsKOeLwrTZMebe+wOdYywQPLbCHQLJJMFig3oDMSm/YsntSk4umXVFATVfHzTJm45Timwo+29fTVJPh9hOOlxAbXRV9YMrbH3cdr0EyGBPBQq5AgMBAAECgYAJbDFIx6Y4NOzx4Q++jfVxAAI+nHa12XgS8ou3fedXrQjj1t25NYNu0Akvbj5+W/G/PrBhoaPi3L/QE2O+kq1SxEg53p3dHOIVEDu3879JPfU7FUnNiv/t9sQwq9v4twRwS6BrnwSWKwdI+YYXVHqaiKw3G4I5bGS4OYkR6IMYAQJBANBniEYv9o4ez+BrPOXFlrObX6iyG0A7uWeCXorfI6LjynE0jVO5x0KSlRQid/vAzhfQbWog71wQUut1lyBOJ/kCQQCpeS//MlkzJwM51bM6qJUR9rUvYDZIojKa1dWOUCxKx51eDk3UqIXPkCTA5UiNxaR0NRyiVZHIkhNDkqVnKijBAkEAyXJaWqYAKM6F2AMwwVXmX0SgCdvn1YYlqHVvV8NrmgegZx8KQVVB1AsGyYir/BEZ5hEVwlGFrbMlw+5Nn++MWQJBAKL47mYb1dmyB5EjZ1LecVQwCja/8BPTHpT1U4Oip6VV5ohfewso8F0VQbLaCvaC/M3fkWSuox3dE3dk23ik+0ECQQCT0y1ILOk6F6Un3WMZGU1ijrb6kafvneKaLdkdrX/JsM3S34eCWefTlSA+/xyOsRPHZ8dom9/W4bGK8gVaqwvA";
			byte[] clientAESKey = RSA.decrypt(privateKey, Coder.decryptBASE64(base64ClientAESKeyStr));
			//byte[] clientAESKey = RSA.decrypt(privateKeyStr, Coder.decryptBASE64(base64ClientAESKeyStr), PrivateKey.class);
			
			clientAESKey = new String(clientAESKey, "UTF-8").getBytes("ISO-8859-1");
			this.clientAESKey = clientAESKey;
			
			String ciphertext = AES.decryptJS(Coder.decryptBASE64(base64DataStr), clientAESKey);
			return ciphertext;
    	}catch(Exception e){
    		e.printStackTrace();
    	}
    	return null;
    }
}