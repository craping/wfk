package wfk.protocol.http.core.asm;

import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.objectweb.asm.ClassWriter;
import org.objectweb.asm.Label;
import org.objectweb.asm.MethodVisitor;
import org.objectweb.asm.Opcodes;

import wfk.common.define.util.ClassUtil;
import wfk.common.define.util.FileUtil;
import wfk.protocol.http.core.asm.annotation.Reflect;

public class MethodEnhancer extends ClassLoader implements Opcodes {

	private final Logger log = LogManager.getLogger(MethodEnhancer.class);
	
	/**
	 * @param cls
	 * @param executeMethod
	 * @return
	 * @throws ReflectMethodNotFoundException
	 * @throws NoSuchMethodException
	 * @throws SecurityException
	 */
	public Object generateSecure(Class<?> cls, Method executeMethod) throws ReflectMethodNotFoundException, NoSuchMethodException, SecurityException {
		Map<String, String> inParams = ClassUtil.getInParams(executeMethod);
		String outParam =  ClassUtil.getOutParam(executeMethod);
		List<String> exceptionArr = new ArrayList<String>();
		String[] exceptions = null;
		
		Class<?>[] exClass = executeMethod.getExceptionTypes();
		if(exClass != null && exClass.length > 0){
			for (Class<?> exCls : exClass) {
				exceptionArr.add(exCls.getName().replace(".", "/"));
			}
			exceptions = new String[exceptionArr.size()];
			exceptionArr.toArray(exceptions);
		}
		
		return generateSecure(cls, executeMethod.getName(), inParams, outParam, null, exceptions);
	}
	
	public Object generateSecure(Class<?> cls, String executeMethodName, Map<String, Class<?>> inParams, Class<?> outParam, String signature, String[] exceptions) throws ReflectMethodNotFoundException, NoSuchMethodException, SecurityException {
		Map<String, String> strMap = new HashMap<String, String>();
		for (Map.Entry<String, Class<?>> entry : inParams.entrySet()) {
			strMap.put(entry.getKey(), "L" + entry.getValue().getName().replace(".", "/") + ";");
		}
		
		String strOut = outParam == null ? "V" : "L" + outParam.getName().replace(".", "/") + ";";
		return generateSecure(cls, executeMethodName, strMap, strOut, signature, exceptions);
	}
	
	public Object generateSecure(Class<?> cls, String executeMethodName, Map<String, String> inParams, String outParam, String signature, String[] exceptions) throws ReflectMethodNotFoundException, NoSuchMethodException {
		// 新类的全称
		String secureClassName = cls.getName() + "$" + executeMethodName;
		String secureSimpleClassName = cls.getSimpleName() + "$" + executeMethodName;
		
		try {
			return Class.forName(secureClassName).newInstance();
		} catch (Exception e) {
			log.info("class not fount [{}] auto generate", secureClassName);
			
			Reflect reflect = cls.getAnnotation(Reflect.class);
			if(reflect == null)
				throw new ReflectMethodNotFoundException(cls);
			
			if(ClassUtil.getDeclaredMethod(cls, reflect.value()) == null)
				return null;
			
			try {
				byte[] b = dump(cls.getName(), reflect.value(), executeMethodName, secureClassName, inParams, outParam, signature, exceptions);
				FileUtil.createFile(b, ClassUtil.getClasspath(cls, secureSimpleClassName));
				
				return Class.forName(secureClassName).newInstance();
				// return loadClass(newcls, b).newInstance();
			} catch (Exception ex) {
				ex.printStackTrace();
				log.error("load [" + secureClassName + "] error", ex);
				return null;
			}
		}
	}

	private byte[] dump(String cls, String superMethodName, String executeMethodName, String newcls, Map<String, String> inParams, String outParam, String signature, String[] exceptions) throws Exception {

		String inParamStr = "";

		for (Map.Entry<String, String> entry : inParams.entrySet()) {
			inParamStr += entry.getValue();
		}

		// 父类的名称
		cls = cls.replace(".", "/");
		// 子类的名称
		newcls = newcls.replace(".", "/");
		// 构建 ASM 工具类对象
		ClassWriter cw = new ClassWriter(ClassWriter.COMPUTE_MAXS);
		MethodVisitor mv;
		cw.visit(V1_5, ACC_PUBLIC + ACC_SUPER, newcls, null, cls, null);
		cw.visitSource(newcls + ".java", null);
		{ // 构造方法，每个类必须
			mv = cw.visitMethod(ACC_PUBLIC, "<init>", "()V", signature, exceptions);// 方法名称
			mv.visitCode();
			Label l0 = new Label();
			mv.visitLabel(l0);
			mv.visitLineNumber(7, l0);
			mv.visitVarInsn(ALOAD, 0);// 加载 this 对象
			mv.visitMethodInsn(INVOKESPECIAL, cls, "<init>", "()V");// 调用父类的
																	// init 方法
			mv.visitInsn(RETURN);// 返回
			Label l1 = new Label();
			mv.visitLabel(l1);
			mv.visitLocalVariable("this", "L" + newcls + ";", null, l0, l1, 0);// 本地方法变量
			mv.visitMaxs(1, 1);// 设置本地堆栈
			mv.visitEnd();
		}

		{
			// superMethod方法，实现子类的相关方法
			mv = cw.visitMethod(ACC_PUBLIC, superMethodName, "(" + inParamStr + ")" + outParam, signature, exceptions);// 方法名称
			mv.visitCode();
			Label l0 = new Label();
			mv.visitLabel(l0);
			mv.visitLineNumber(10, l0);
			mv.visitVarInsn(ALOAD, 0);// 加载 this 对象
			for (int i = 1; i <= inParams.size(); i++) {
				mv.visitVarInsn(ALOAD, i);// 加载 num 参数
			}

			mv.visitMethodInsn(INVOKEVIRTUAL, cls, executeMethodName, "(" + inParamStr + ")" + outParam);// 调用父类的方法
			mv.visitInsn(ARETURN); // 返回对象的引用

			Label l1 = new Label();
			mv.visitLabel(l1);
			mv.visitLocalVariable("this", "L" + newcls + ";", null, l0, l1, 0);// 本地方法变量

			int i = 1;
			for (Map.Entry<String, String> entry : inParams.entrySet()) {
				mv.visitLocalVariable(entry.getKey(), entry.getValue(), null, l0, l1, i);// 本地方法变量
				i++;
			}

			mv.visitMaxs(3, 3);// 设置本地堆栈
			mv.visitEnd();
		}
		cw.visitEnd();
		return cw.toByteArray();
	}

	public Class<?> loadClass(String className, byte[] b) throws ClassNotFoundException {
		return defineClass(className, b, 0, b.length);
	}
}
