// 07 — Enums | Examples

// as const pattern
const PERMISSIONS = {
  CREATE: "create",
  READ:   "read",
  UPDATE: "update",
  DELETE: "delete",
} as const;
type Permission = typeof PERMISSIONS[keyof typeof PERMISSIONS];

const USER_ROLES = { Admin: "admin", Editor: "editor", Viewer: "viewer" } as const;
type UserRole = typeof USER_ROLES[keyof typeof USER_ROLES];

const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  admin:  ["create", "read", "update", "delete"],
  editor: ["create", "read", "update"],
  viewer: ["read"],
};

function hasPermission(role: UserRole, perm: Permission): boolean {
  return ROLE_PERMISSIONS[role].includes(perm);
}

console.log(hasPermission("admin",  "delete")); // true
console.log(hasPermission("viewer", "delete")); // false
