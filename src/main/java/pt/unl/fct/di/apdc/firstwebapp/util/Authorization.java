package pt.unl.fct.di.apdc.firstwebapp.util;

public class Authorization {
	
	private static int USER = 1;
	private static int GBO = 2;
	private static int GA = 3;
	private static int GS = 4;
	private static int SU = 5;



	public Authorization() {}
	
	public static boolean canDeleteUser(int userDeletedRole, int userLoggedInRole) {
	    if(userDeletedRole == USER && userLoggedInRole == USER) {
	    	return false;
	    }
	    else if(userDeletedRole < userLoggedInRole) {
	    	return true;
	    }
	    return false;
	}

	
	public static boolean canChangeOwnRole(int currentRole) {
		return currentRole == SU;
	}
	
	public static boolean canChangeOwnState(int currentRole) {
		return (currentRole == GBO || currentRole == GA || currentRole == GS || currentRole == SU);
	}
										
	public static boolean changeRole(int userRole, int tokenRole, int dataRole) {
		if(tokenRole == SU) {
			return true;
		}	  
		else if(tokenRole == GS && userRole == USER && dataRole == GBO) {
			return true;
		}
		else if(tokenRole == GS && (userRole == dataRole)) {
			return true;
		}
		else if(tokenRole == GA && (userRole == dataRole)) {
			return true;
		}
		else if(tokenRole == GBO && (userRole == dataRole)) {
			return true;
		}
		return false;
	}

	public static boolean changeState(int userRole, int tokenRole, int dataRole) {
		if(tokenRole == SU) {
			return true;
		}
		else if(tokenRole == GS && (userRole == GA || userRole == GBO) && dataRole <= GS ) {
			return true;
		}
		else if(tokenRole == GA && (userRole == GBO || userRole == USER) && dataRole <= GA ) {
			return true;
		}
		else if(tokenRole == GBO && (userRole == USER) && dataRole <= GBO ) {
			return true;
		}
		
		return false;
	}
	
	
}
