package pt.unl.fct.di.apdc.firstwebapp.util;

public class ProfileData {

	public String email;
	public String username;
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
	public String department;

	private AuthToken token;

	public ProfileData() {}

	public ProfileData(String email, String username, String password, String name, int role, String state, String profile,
					   String landline, String phoneNumber, String occupation, String address, String nif, String department) {
		this.email = email;
		this.username = username;
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
		this.department = department;
	}

	public ProfileData(String email, String username, String password, String name, int role, String state, String profile,
					   String landline, String phoneNumber, String occupation, String address, String nif, AuthToken token, String department) {
		this.email = email;
		this.username = username;
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
		this.token = token;
		this.department = department;
	}


	public String getEmail() {
		return this.email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getUsername() {
		return this.username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return this.password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getRole() {
		return this.role;
	}

	public void setRole(int role) {
		this.role = role;
	}

	public String getState() {
		return this.state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getProfile() {
		return this.profile;
	}

	public void setProfile(String profile) {
		this.profile = profile;
	}

	public String getLandline() {
		return this.landline;
	}

	public void setLandline(String landline) {
		this.landline = landline;
	}

	public String getPhoneNumber() {
		return this.phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public String getOccupation() {
		return this.occupation;
	}

	public void setOccupation(String occupation) {
		this.occupation = occupation;
	}

	public String getAddress() {
		return this.address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getNif() {
		return this.nif;
	}

	public void setNif(String nif) {
		this.nif = nif;
	}

	public AuthToken getToken(){
		return token;
	}

	public String getDepartment() {return department; }

	public void setDepartment(String department) {this.department = department;}

}
