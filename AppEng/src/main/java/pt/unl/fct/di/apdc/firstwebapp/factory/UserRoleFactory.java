package pt.unl.fct.di.apdc.firstwebapp.factory;

public enum UserRoleFactory {
    USER_ROLE(1),
    ADMIN_ROLE(4);

    private int roleId;

    private UserRoleFactory(int roleId) {
        this.roleId = roleId;
    }

    public int getRoleId() {
        return roleId;
    }
}
