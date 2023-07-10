package pt.unl.fct.di.apdc.firstwebapp.factory;

public enum ConstantFactory {
    INVALID_LOGIN("Missing or wrong parameter."),
    INVALID_EMAIL("Invalid email address"),
    INVALID_PASSWORD("Invalid password"),
    ATTEMPTING_REGISTER("Attempting to register the user: "),
    USER_EXISTS("User already exists"),
    EMAIL_EXISTS("Email already exists"),
    USER_DOESNT_EXIST("User doesn't exist"),
    // USER_ROLE(1),
    INATIVO_STATE("INATIVO"),
    INACTIVE_ACCOUNT("Account is not active, contact an admin!"),
    WRONG_PASSWORD("Wrong password"),
    ATIVO_STATE("ATIVO"),
    INVALID_DATA("Invalid Data"),
    RESTAURANT_EXISTS("A restaurant with that name already exists"),
    RESTAURANT_NOT_FOUND("There is no restaurant with that name"),
    RESTAURANTS_NOT_FOUND("No restaurants found"),
    RESTAURANT_ADDED("Restaurant added"),
    RESTAURANT_DELETED("Restaurant deleted"),
    INSUFFICIENT_PERMISSIONS("Doesn't have permissions"),
    NO_MANAGERS_FOUND("No owners found for restaurant ");






    private final String description;

    private ConstantFactory(String description) {
        this.description = description;
    }

    public String getDesc() {
        return this.description;
    }
}
