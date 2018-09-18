/*
 * $Header: /cvsroot/mvnforum/myvietnam/src/net/myvietnam/mvncore/util/FileUtil.java,v 1.36 2005/02/04 06:17:20 minhnn Exp $
 * $Author: minhnn $
 * $Revision: 1.36 $
 * $Date: 2005/02/04 06:17:20 $
 *
 * ====================================================================
 *
 * Copyright (C) 2002-2005 by MyVietnam.net
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or any later version.
 *
 * All copyright notices regarding MyVietnam and MyVietnam CoreLib
 * MUST remain intact in the scripts and source code.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA.
 *
 * Correspondence and Marketing Questions can be sent to:
 * info@MyVietnam.net
 *
 * @author: Minh Nguyen  minhnn@MyVietnam.net
 * @author: Mai  Nguyen  mai.nh@MyVietnam.net
 */

package wfk.protocol.http.core.util;
import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileFilter;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.ObjectOutputStream;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import wfk.common.define.bean.ByteOutputStream;

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
public final class FileUtil {

    private static Logger log = LogManager.getLogger(FileUtil.class);

    //private static FileUtil instance = new FileUtil();

    private FileUtil() { // prevent instantiation
    }

    public static List<File> getDirFiles(File dir) {
    	List<File> files = new ArrayList<File>();
    	if(dir.isDirectory()){
    		for (File file : dir.listFiles()) {
    			files.addAll(getDirFiles(file));
			}
        }
    	if(dir.isFile())
    		files.add(dir);
        return files;
    }
    
    public static List<File> getDirFiles(File dir, FileFilter filter) {
    	List<File> files = new ArrayList<File>();
    	if(dir.isDirectory()){
    		for (File file : dir.listFiles(filter)) {
    			if(file.isDirectory())
    				files.addAll(getDirFiles(file, filter));
    			else
    				files.add(file);
			}
        }
    	if(dir.isFile())
    		files.add(dir);
        return files;
    }
    
    public static void createDir(String dir, boolean ignoreIfExitst) throws IOException {
        File file = new File(dir);

        if (ignoreIfExitst && file.exists()) {
            return;
        }

        if ( file.mkdir() == false) {
            throw new IOException("Cannot create the directory = " + dir);
        }
    }

    public static void createDirs(String dir, boolean ignoreIfExitst) throws IOException {
        File file = new File(dir);

        if (ignoreIfExitst && file.exists()) {
            return;
        }

        if ( file.mkdirs() == false) {
            throw new IOException("Cannot create directories = " + dir);
        }
    }

    public static void deleteFile(String filename) throws IOException {
        File file = new File(filename);
        log.trace("Delete file = " + filename);
        if (file.isDirectory()) {
            throw new IOException("IOException -> BadInputException: not a file.");
        }
        if (file.exists() == false) {
            throw new IOException("IOException -> BadInputException: file is not exist.");
        }
        if (file.delete() == false) {
            throw new IOException("Cannot delete file. filename = " + filename);
        }
    }

    public static void deleteDir(File dir) throws IOException {
        if (dir.isFile()) throw new IOException("IOException -> BadInputException: not a directory.");
        File[] files = dir.listFiles();
        if (files != null) {
            for (int i = 0; i < files.length; i++) {
                File file = files[i];
                if (file.isFile()) {
                    file.delete();
                } else {
                    deleteDir(file);
                }
            }
        }
        dir.delete();
    }

    public static long getDirLength(File dir) throws IOException {
        if (dir.isFile()) throw new IOException("BadInputException: not a directory.");
        long size = 0;
        File[] files = dir.listFiles();
        if (files != null) {
            for (int i = 0; i < files.length; i++) {
                File file = files[i];
                long length = 0;
                if (file.isFile()) {
                    length = file.length();
                } else {
                    length = getDirLength(file);
                }
                size += length;
            }//for
        }//if
        return size;
    }

    public static long getDirLength_onDisk(File dir) throws IOException {
        if (dir.isFile()) throw new IOException("BadInputException: not a directory.");
        long size = 0;
        File[] files = dir.listFiles();
        if (files != null) {
            for (int i = 0; i < files.length; i++) {
                File file = files[i];
                long length = 0;
                if (file.isFile()) {
                    length = file.length();
                } else {
                    length = getDirLength_onDisk(file);
                }
                double mod = Math.ceil(((double)length)/512);
                if (mod == 0) mod = 1;
                length = ((long)mod) * 512;
                size += length;
            }
        }//if
        return size;
    }

    public static void emptyFile(String srcFilename) throws IOException {
        File srcFile = new File(srcFilename);
        if (!srcFile.exists()) {
            throw new FileNotFoundException("Cannot find the file: " + srcFile.getAbsolutePath());
        }
        if (!srcFile.canWrite()) {
            throw new IOException("Cannot write the file: " + srcFile.getAbsolutePath());
        }

        FileOutputStream outputStream = new FileOutputStream(srcFilename);
        outputStream.close();
    }

    public static void copyFile(String srcFilename, String destFilename, boolean overwrite) throws IOException {

        File srcFile = new File(srcFilename);
        if (!srcFile.exists()) {
            throw new FileNotFoundException("Cannot find the source file: " + srcFile.getAbsolutePath());
        }
        if (!srcFile.canRead()) {
            throw new IOException("Cannot read the source file: " + srcFile.getAbsolutePath());
        }

        File destFile = new File(destFilename);
        if (overwrite == false) {
            if (destFile.exists()) return;
        } else {
            if (destFile.exists()) {
                if (!destFile.canWrite()) {
                    throw new IOException("Cannot write the destination file: " + destFile.getAbsolutePath());
                }
            } else {
                if (!destFile.createNewFile()) {
                    throw new IOException("Cannot write the destination file: " + destFile.getAbsolutePath());
                }
            }
        }

        BufferedInputStream inputStream = null;
        BufferedOutputStream outputStream = null;
        byte[] block = new byte[1024];
        try {
            inputStream = new BufferedInputStream(new FileInputStream(srcFile));
            outputStream = new BufferedOutputStream(new FileOutputStream(destFile));
            while (true) {
                int readLength = inputStream.read(block);
                if (readLength == -1) break;// end of file
                outputStream.write(block, 0, readLength);
            }
        } finally {
            if (inputStream != null) {
                try {
                    inputStream.close();
                } catch (IOException ex) {
                    // just ignore
                }
            }
            if (outputStream != null) {
                try {
                    outputStream.close();
                } catch (IOException ex) {
                    // just ignore
                }
            }
        }
    }

    public static byte[] getBytes(InputStream inputStream) throws IOException {
        BufferedInputStream in = new BufferedInputStream(inputStream);
        ByteArrayOutputStream out = new ByteArrayOutputStream(1024);
        
        byte[] block = new byte[2048];
        int size = 0;
        while ((size = in.read(block)) != -1) {
            out.write(block, 0, size);
        } 
        
        in.close();
        out.close();
        return out.toByteArray();
    }
    
    public static ByteArrayOutputStream getByteArrayOutputStream(InputStream inputStream) throws IOException {
        BufferedInputStream in = new BufferedInputStream(inputStream);
        ByteArrayOutputStream out = new ByteArrayOutputStream(1024);
        
        byte[] block = new byte[2048];
        int size = 0;  
        while ((size = in.read(block)) != -1) {  
            out.write(block, 0, size);  
        } 
        in.close();
        out.close();
        return out;
    }
    
    public static ByteOutputStream getByteArrayOutputStream(Object obj) {

    	ByteOutputStream bo = new ByteOutputStream();
    	try {
            ObjectOutputStream oo = new ObjectOutputStream(bo);
            oo.writeObject(obj);
            bo.close();
            oo.close();
        } catch (Exception e) {
            System.out.println("translation" + e.getMessage());
            e.printStackTrace();
        }
        return bo;
    }
    
    public static ByteOutputStream getByteOutputStream(InputStream inputStream) throws IOException {
        BufferedInputStream in = new BufferedInputStream(inputStream);
        ByteOutputStream out = new ByteOutputStream(1024);
        
        byte[] block = new byte[2048];
        int size = 0;  
        while ((size = in.read(block)) != -1) {  
            out.write(block, 0, size);  
        } 
        in.close();
        out.close();
        return out;
    }
    
    public static String getFileFullName(String fullFilePath) {
        if (fullFilePath == null) {
            return "";
        }
        int index1 = fullFilePath.lastIndexOf('/');
        int index2 = fullFilePath.lastIndexOf('\\');

        //index is the maximum value of index1 and index2
        int index = (index1 > index2) ? index1 : index2;
        if (index == -1) {
            // not found the path separator
            return fullFilePath;
        }
        String fileName = fullFilePath.substring(index + 1);
        return fileName;
    }
    
    public static String getFileName(String fullFilePath) {
        if (fullFilePath == null) {
            return "";
        }
        int index1 = fullFilePath.lastIndexOf('/');
        int index2 = fullFilePath.lastIndexOf('\\');

        //index is the maximum value of index1 and index2
        int index = (index1 > index2) ? index1 : index2;
        if (index == -1) {
            // not found the path separator
            return fullFilePath.substring(0, fullFilePath.lastIndexOf("."));
        }
        String fileName = fullFilePath.substring(index + 1, fullFilePath.lastIndexOf("."));
        return fileName;
    }

    /**
     * This method write srcFile to the output, and does not close the output
     * @param srcFile File the source (input) file
     * @param output OutputStream the stream to write to, this method will not buffered the output
     * @throws IOException
     */
    public static void popFile(File srcFile, OutputStream output) throws IOException {

        BufferedInputStream input = null;
        byte[] block = new byte[1024];
        try {
            input = new BufferedInputStream(new FileInputStream(srcFile), 1024);
            while (true) {
                int length = input.read(block);
                if (length == -1) break;// end of file
                output.write(block, 0, length);
            }
        } finally {
            if (input != null) {
                try {
                    input.close();
                } catch (IOException ex) {
                    // just ignore
                }
            }
        }
    }
    
    /**
     * Create content to a fileName with the destEncoding
     *
     * @param content String
     * @param fileName String
     * @param destEncoding String
     * @throws FileNotFoundException
     * @throws IOException
     */
    public static void createFile(byte[] bytes, String fileName)
        throws FileNotFoundException, IOException {

    	if (bytes == null) {
            throw new IllegalArgumentException("Does not accept null input");
        }
        FileOutputStream fos = null;
        try { 
        	fos = new FileOutputStream(fileName);
            fos.write(bytes);
            fos.flush();
        } catch (FileNotFoundException fe) {
            log.error("Error", fe);
            throw fe;
        } catch (IOException e) {
            log.error("Error", e);
            throw e;
        } finally {
            try {
                if (fos != null) fos.close();
            } catch (IOException ex) {}
        }
    }

    /**
     * This method create a file text/css
     * NOTE: This method closes the inputStream after it have done its work.
     *
     * @param inputStream     the stream of a text/css file
     * @param cssFile   the output file, have the ".css" extension or orther extension
     * @throws IOException
     * @throws BadInputException
     * @throws AssertionException
     */
    public static void createFile(InputStream inputStream, String textFile)
        throws IOException {

        if (inputStream == null) {
            throw new IllegalArgumentException("Does not accept null input");
        }
        OutputStream outputStream = null;
        try {
            byte[] srcByte = FileUtil.getBytes(inputStream);
            outputStream = new FileOutputStream(textFile);
            outputStream.write(srcByte);
            return;
        } catch (IOException e) {
            log.error("Error", e);
            throw e;
        } finally { // this finally is very important
            inputStream.close();
            if (outputStream != null) outputStream.close();
        }
    }

    /**
     * Write content to a fileName with the destEncoding
     *
     * @param content String
     * @param fileName String
     * @param destEncoding String
     * @throws FileNotFoundException
     * @throws IOException
     */
    public static void writeFile(String content, String fileName, String destEncoding)
        throws FileNotFoundException, IOException {

        File file = null;
        try {
            file = new File(fileName);
            if (file.isFile() == false) {
                throw new IOException("'" + fileName + "' is not a file.");
            }
            if (file.canWrite() == false) {
                throw new IOException("'" + fileName + "' is a read-only file.");
            }
        } finally {
            // we dont have to close File here
        }

        BufferedWriter out = null;
        try {
            FileOutputStream fos = new FileOutputStream(fileName);
            out = new BufferedWriter(new OutputStreamWriter(fos, destEncoding));

            out.write(content);
            out.flush();
        } catch (FileNotFoundException fe) {
            log.error("Error", fe);
            throw fe;
        } catch (IOException e) {
            log.error("Error", e);
            throw e;
        } finally {
            try {
                if (out != null) out.close();
            } catch (IOException ex) {}
        }
    }

    public static String readFile(String fileName, String srcEncoding)
        throws FileNotFoundException, IOException {

        File file = null;
        try {
            file = new File(fileName);
            if (file.isFile() == false) {
                throw new IOException("'" + fileName + "' is not a file.");
            }
        } finally {
            // we dont have to close File here
        }

        BufferedReader reader = null;
        try {
            StringBuffer result = new StringBuffer(1024);
            FileInputStream fis = new FileInputStream(fileName);
            reader = new BufferedReader(new InputStreamReader(fis, srcEncoding));

            char[] block = new char[512];
            while (true) {
                int readLength = reader.read(block);
                if (readLength == -1) break;// end of file
                result.append(block, 0, readLength);
            }
            return result.toString();
        } catch (FileNotFoundException fe) {
            log.error("Error", fe);
            throw fe;
        } catch (IOException e) {
            log.error("Error", e);
            throw e;
        } finally {
            try {
                if (reader != null) reader.close();
            } catch (IOException ex) {}
        }
    }

    public static String getHumanSize(long size) {

        int sizeToStringLength = String.valueOf(size).length();
        String humanSize = "";
        DecimalFormat formatter = new DecimalFormat("##0.##");
        if (sizeToStringLength > 9) {
            humanSize += formatter.format((double) size / (1024 * 1024 * 1024)) + " GB";
        } else if (sizeToStringLength > 6) {
            humanSize += formatter.format((double) size / (1024 * 1024)) + " MB";
        } else if (sizeToStringLength > 3) {
            humanSize += formatter.format((double) size / 1024) + " KB";
        } else {
            humanSize += String.valueOf(size) + " Bytes";
        }
        return humanSize;
    }
    
    public static void main(String[] args) throws IOException {
		System.out.println(getDirFiles(new File("D:\\count\\a")).size());
	}
}