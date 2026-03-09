# 07 — Enums

## String enum (tavsiya)

```ts
enum Status {
  Pending  = "PENDING",
  Active   = "ACTIVE",
  Inactive = "INACTIVE",
}

// as const alternativa (afzal)
const ROLE = { Admin: "admin", Editor: "editor", Viewer: "viewer" } as const;
type UserRole = typeof ROLE[keyof typeof ROLE];
```

## as const — enum alternativasi

```ts
const PERMISSIONS = {
  CREATE: "create", READ: "read",
  UPDATE: "update", DELETE: "delete",
} as const;
type Permission = typeof PERMISSIONS[keyof typeof PERMISSIONS];
```

## Qachon enum, qachon as const?
| | Enum | as const |
|---|---|---|
| Runtime object | yep | yep |
| Reverse mapping | numeric: yep | no |
| Type safety | yep | yep |
| Tree shaking | no | yep |

## 🎯 Masala
```ts
// CRUD permission system
const PERMISSIONS = {} as const;
type Permission = ???;
type RolePermMap = Record<UserRole, Permission[]>;
```
