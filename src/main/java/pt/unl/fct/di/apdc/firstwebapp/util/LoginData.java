	package pt.unl.fct.di.apdc.firstwebapp.util;
	
	public class LoginData {
	
		public String username;
		public String password;
		public String email;
		public String name;
		
		public LoginData() {}
		
		public LoginData(String username, String password, String email, String name) {
			this.username = username;
			this.password = password;
			this.email = email;
			this.name = name;
		}
	
	
		public void setUsername(String username) {
			this.username = username;
		}
	
		public void setPassword(String password) {
			this.password = password;
		}
		
		public void setName(String name) {
			this.name = name;
		}
		
		public void setEmail(String email) {
			this.email = email;
		}

		public String getUsername() {
			return username;
		}
		
		public String getPassword() {
			return password;
		}
	
		public String getName() {
			return name;
		}
		
		public String getEmail() {
			return email;
		}

		public boolean isValid() {
			//Verifies if a user doesn't have any null fields	
			return (username != null && password != null && name != null && email != null);
		}
		
		public boolean isValidEmail() {
		    //Regular expression pattern to validate the email address
		    String emailPattern = "^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$";
		    return email != null && email.matches(emailPattern);
		}
		
		public  boolean isValidPassword() {
		    /* 	Regular expression pattern to validate the password.
		     *  Password must contain at least 6 characters, including one upper case letter, 
		     *  one lower case letter, one number and one special character
		     */
		    String passwordPattern = "^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,}$";
		    return password.matches(passwordPattern);
		}


	
		
	}
