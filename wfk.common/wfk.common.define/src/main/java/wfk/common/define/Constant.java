package wfk.common.define;

public interface Constant {
	
	interface System {
		
		String DEFAULT_PASSWORD = "111111";
		String SERVICE_PACKAGE = Configuration.getSysProp("dao.mapper.package");
		String SYS_EXCELPATH = Configuration.getSysProp("sys.excelPath");
		/**
		 *	规定的系统参数名 
		 */
		interface ParamName {
			String LOGIN_CREDIT = "login_credit";
			String SIGNIN_CREDIT = "signin_credit";
		}
		
		/**
		 *	系统参数默认值 
		 */
		interface ParamValue {
			int LOGIN_CREDIT = 5;
			int SIGNIN_CREDIT = 5;
		}
		
		interface State {
			String INVALID = "ST000";	//已失效
			String ACTIVE = "ST001";	//活动的
			String LOCKED = "ST002";	//锁定的
			String EXCEPTION = "ST003";	//异常的
		}
		
		interface StateFlag {
			int Y = 1;					//启用
			int N = 0;					//未启用
		}
		
		interface RealFlag {
			int Y = 1;
			int N = 0;
		}
		
		/**
		 *	菜单类型
		 */
		interface UiType{
			int FIRSTMENU = 1;
			int SECONDMENU = 2;
			int THREEMENU = 3;
		}

		/**
		 *	关联类型
		 */
		interface RelType{
			int APK = 1;
			int GOODS = 2;
		}
		
		/**
		 *	短信类型
		 */
		interface CodeType{
			int REGISTER = 1;
			int RESET = 2;
		}
	}
	
	interface Capacitys{
		
		interface Type{
			int T0 = 0;	//显示
			int T1 = 1;	//控制
			int T2 = 2;	//显示控制
		}
		
		interface DataType{
			int T0 = 0;	//其他
			int T1 = 1;	//整型
			int T2 = 2;	//浮点
			int T3 = 3;	//字符串
			int T4 = 4;	//布尔
		}
	}
}
