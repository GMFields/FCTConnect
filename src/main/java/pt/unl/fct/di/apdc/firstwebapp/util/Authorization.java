package pt.unl.fct.di.apdc.firstwebapp.util;

public class Authorization {
	
	private static int USER = 1;
	private static int GBO = 2;
	private static int GA = 3;
	private static int GS = 4;
	private static int SU = 5;

	public Authorization() {}

	public static boolean isDataFormatted(String username, String password, String name, String email){
		return isValid(username, password, name, email) && isValidEmail(email) && isValidPassword(password);
	}

	private static boolean isValid(String username, String password, String name, String email) {
		//Verifies if a user doesn't have any null fields
		return (username != null && password != null && name != null && email != null);
	}

	private static boolean isValidEmail(String email) {
		//Regular expression pattern to validate the email address
		String emailPattern = "^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$";
		return email != null && email.matches(emailPattern);
	}

	private static boolean isValidPassword(String password) {
		/* 	Regular expression pattern to validate the password.
		 *  Password must contain at least 6 characters, including one upper case letter,
		 *  one lower case letter, one number and one special character
		 */
		String passwordPattern = "^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,}$";
		return password.matches(passwordPattern);
	}


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
