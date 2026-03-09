// 12 — React Router | Examples
import { Routes, Route, Navigate, useParams, useNavigate,
         useSearchParams, useLocation, Outlet, Link, NavLink } from "react-router-dom";
import { lazy, Suspense } from "react";

// ProtectedRoute
function ProtectedRoute({ children, allowedRoles }) {
  const { user, loading } = { user: null, loading: false }; // useAuth() dan keladi
  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (allowedRoles && !allowedRoles.includes(user.role))
    return <Navigate to="/403" replace />;
  return children;
}

// Layout with Outlet
function AppLayout() {
  return (
    <div style={{ display: "flex" }}>
      <nav style={{ width: 200 }}>
        <NavLink to="/"         style={({ isActive }) => ({ fontWeight: isActive ? "bold" : "normal" })}>Home</NavLink>
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/profile">Profile</NavLink>
      </nav>
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
    </div>
  );
}

// useSearchParams example
function UserList() {
  const [params, setParams] = useSearchParams();
  const filter = params.get("filter") ?? "all";
  const page   = Number(params.get("page")) || 1;

  const setFilter = (val) =>
    setParams(prev => { prev.set("filter", val); prev.set("page", "1"); return prev; });

  return (
    <div>
      <div>
        {["all","active","inactive"].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            style={{ fontWeight: filter === f ? "bold" : "normal" }}>
            {f}
          </button>
        ))}
      </div>
      <p>Page: {page}</p>
    </div>
  );
}

// useQueryParams hook
function useQueryParams(schema) {
  const [params, setParams] = useSearchParams();
  const parsed = Object.fromEntries(
    Object.entries(schema).map(([key, type]) => [key, type(params.get(key) ?? "")])
  );
  const setQuery = (updates) => {
    setParams(prev => {
      Object.entries(updates).forEach(([k, v]) => prev.set(k, String(v)));
      return prev;
    });
  };
  return [parsed, setQuery];
}

export { ProtectedRoute, AppLayout, UserList, useQueryParams };
