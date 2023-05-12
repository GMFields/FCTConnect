package pt.unl.fct.di.apdc.firstwebapp.util;

public class PasswordData {

	public String oldPWD;
	public String newPWD;
	
	public PasswordData() {
	}

	
	public PasswordData(String oldPWD, String newPWD) {
		this.oldPWD = oldPWD;
		this.newPWD = newPWD;
	}
	
	public String getOldPWD() {
		return oldPWD;
	}
	
	public String getNewPWD() {
		return newPWD;
	}
}
