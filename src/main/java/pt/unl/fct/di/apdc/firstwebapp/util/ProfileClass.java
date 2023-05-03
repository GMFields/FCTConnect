package pt.unl.fct.di.apdc.firstwebapp.util;

public class ProfileClass {
	
	public String email;
	public String password;
	public String name;
	public int role;
	public String state;
	public String profile;
	public String landline;
	public String phoneNumber;
	public String occupation;
	public String address;
	public String nif;
	
	
	
	
	public ProfileClass() {}
	
	public ProfileClass(String email, String password, String name, int role, String state, String profile, 
			String landline, String phoneNumber, String occupation, String address, String nif) {
		this.email = email;
		this.password = password;
		this.name = name;
		this.role = role;
		this.state = state;
		this.profile = profile;
		this.landline = landline;
		this.phoneNumber = phoneNumber;
		this.occupation = occupation;
		this.address = address;
		this.nif = nif;
		
	}

	public String getEmail() {
		return email;
	}

	public String getPassword() {
		return password;
	}

	public String getName() {
		return name;
	}

	public int getRole() {
		return role;
	}

	public String getState() {
		return state;
	}

	public String getProfile() {
		return profile;
	}

	public String getLandline() {
		return landline;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public String getOccupation() {
		return occupation;
	}

	public String getAddress() {
		return address;
	}

	public String getNif() {
		return nif;
	}

}
