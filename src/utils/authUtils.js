// utils/authUtils.js
export const hasRoutePermission = (permissions, currentPath) => {
    return permissions?.some((perm) => currentPath.startsWith(perm.route));
  };
  