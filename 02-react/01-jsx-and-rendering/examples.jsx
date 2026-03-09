// 01 — JSX & Rendering | Examples
import { useState } from "react";

// Conditional rendering
function StatusBadge({ status }) {
  const config = {
    active:  { label: "Faol",    bg: "#22c55e" },
    pending: { label: "Kutish",  bg: "#f59e0b" },
    blocked: { label: "Bloklangan", bg: "#ef4444" },
  };
  const { label, bg } = config[status] ?? { label: status, bg: "#6b7280" };
  return <span style={{ background: bg, padding: "2px 8px", borderRadius: 4 }}>{label}</span>;
}

// List rendering — to'g'ri key ishlatish
function UserList({ users = [] }) {
  if (!users.length) return <p>Foydalanuvchilar yo'q</p>;
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>               {/* ✅ id — stable, unique */}
          {user.name} — <StatusBadge status={user.status} />
        </li>
      ))}
    </ul>
  );
}

// Fragment ishlatish
function TableRow({ item }) {
  return (
    <>                                   {/* Fragment — extra div yo'q */}
      <td>{item.name}</td>
      <td>{item.price}</td>
      <td>{item.qty}</td>
    </>
  );
}

// Masala 1 — TodoList
function TodoList({ items = [] }) {
  if (!items.length) return <p style={{ color: "#9ca3af" }}>Hech narsa yo'q</p>;
  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {items.map(item => (
        <li
          key={item.id}
          style={{
            textDecoration: item.done ? "line-through" : "none",
            color: item.done ? "#9ca3af" : "#111",
            padding: "8px 0",
          }}
        >
          {item.text}
        </li>
      ))}
    </ul>
  );
}

export { StatusBadge, UserList, TableRow, TodoList };
