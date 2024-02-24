const model = require("../models/index");
const User = model.User;
const Role = model.Role;
const Permission = model.Permission;

module.exports = {
  get: (permissionList, permission) => {
    const permissionData = permissionList.find(
      ({ value }) => value === permission
    );
    if (permissionData) {
      return permissionData.value;
    }
  },

  isRole: (roleUser, roleId) => {
    return roleUser.find((role) => {
      return +role.id === +roleId;
    });
  },

  roleUser: async (req) => {
    const { id } = req.user;

    const user = await User.findOne({
      include: {
        model: Role,
      },
      where: {
        id: id,
      },
    });

    const userPermission = await User.findOne({
      include: {
        model: Permission,
      },
      where: {
        id: id,
      },
    });
    // permisson tắt
    const permissionUserPlus = userPermission.Permissions.map(({ value }) => {
      return value;
    });

    const roles = user.Roles;
    // permission qua role
    let permissions = await Promise.all(
      roles.map(async ({ id }) => {
        const role = await Role.findOne({
          include: {
            model: Permission,
          },
          where: {
            id: id,
          },
        });
        return role.Permissions;
      })
    );
    permissions = permissions.map((permission) => {
      return permission.map(({ value }) => value);
    });

    // permissions = [...new Set(permissions.flat(Infinity))];

    let permissionsUser = permissions.concat(permissionUserPlus);
    permissionsUser = [...new Set(permissionsUser.flat(Infinity))];

    return permissionsUser;
  },

  getPermissionUser: (permissionUser, permission) => {
    if (permissionUser.includes(permission)) {
      return true;
    }
    return false;
  },
};
