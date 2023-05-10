package pt.unl.fct.di.apdc.firstwebapp.util;

import java.util.UUID;

public class TokenClass {
	public String username;
	public int role;
	public String tokenID;
	public long creationData;
	public long expirationData;
	
	public TokenClass() {}

	public TokenClass(String username, int role, String tokenID, long creationData, long expirationData) {
		this.username = username;
		this.role = role;
		this.tokenID = tokenID;
		this.creationData = creationData;
		this.expirationData = expirationData;
	}
	
	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public int getRole() {
		return role;
	}

	public void setRole(int role) {
		this.role = role;
	}

	public String getTokenID() {
		return tokenID;
	}

	public void setTokenID(String tokenID) {
		this.tokenID = tokenID;
	}

	public long getCreationData() {
		return creationData;
	}

	public void setCreationData(long creationData) {
		this.creationData = creationData;
	}

	public long getExpirationData() {
		return expirationData;
	}

	public void setExpirationData(long expirationData) {
		this.expirationData = expirationData;
	}

}
