# 12 — React Router

## 📖 Nazariya

React Router v6 — SPA uchun client-side routing.

### Asosiy setup

```jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"          element={<Home />} />
        <Route path="/users"     element={<UserList />} />
        <Route path="/users/:id" element={<UserDetail />} />
        <Route path="*"          element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
```

### Nested Routes + Outlet

```jsx
<Route path="/dashboard" element={<DashboardLayout />}>
  <Route index        element={<DashboardHome />} />
  <Route path="stats" element={<Stats />} />
  <Route path="users" element={<Users />} />
</Route>

function DashboardLayout() {
  return (
    <div>
      <Sidebar />
      <main><Outlet /></main>   {/* child route shu yerga */}
    </div>
  );
}
```

### Hooks

```jsx
// useParams
const { id } = useParams();

// useNavigate
const navigate = useNavigate();
navigate("/dashboard");
navigate(-1);                           // orqaga
navigate("/login", { replace: true }); // history almashtirish

// useSearchParams
const [params, setParams] = useSearchParams();
const page = Number(params.get("page")) || 1;
setParams(prev => { prev.set("page", "2"); return prev; });

// useLocation
const { pathname, search, state } = useLocation();
```

### Protected Route

```jsx
function ProtectedRoute({ children, allowedRoles }) {
  const { user, loading } = useAuth();
  if (loading) return <Spinner />;
  if (!user) return <Navigate to="/login" replace />;
  if (allowedRoles && !allowedRoles.includes(user.role))
    return <Navigate to="/403" replace />;
  return children;
}
```

### Lazy + Router

```jsx
const Dashboard = lazy(() => import("./pages/Dashboard"));

<Suspense fallback={<PageLoader />}>
  <Routes>
    <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
  </Routes>
</Suspense>
```

---

## 🧠 Intervyu savollari

1. BrowserRouter vs HashRouter farqi?
2. `<Link>` va `<a>` farqi?
3. Nested routes qanday ishlaydi, Outlet nima?
4. Protected route implement qilish?
5. `useNavigate` vs `<Navigate>` farqi?

---

## 🎯 Masalalar

```jsx
// Masala 1: RoleBasedRoute
function RoleBasedRoute({ children, allowedRoles }) { }

// Masala 2: useQueryParams — type-safe
function useQueryParams(schema) { }
// const { page, filter } = useQueryParams({ page: Number, filter: String });
```
