# 14 — Error Boundaries

## 📖 Nazariya

Error Boundary — child component'lardagi JS xatolarini tutib, fallback UI ko'rsatuvchi **class component**.

```jsx
class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };   // fallback UI ga o'tish
  }

  componentDidCatch(error, info) {
    // Logging: Sentry, Datadog
    console.error(error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return <this.props.fallback
          error={this.state.error}
          reset={() => this.setState({ hasError: false, error: null })}
        />;
      }
      return <div>Xato yuz berdi</div>;
    }
    return this.props.children;
  }
}
```

### Ishlatish

```jsx
// Wrapper sifatida
<ErrorBoundary fallback={ErrorPage}>
  <Dashboard />
</ErrorBoundary>

// Granular — har section uchun
<ErrorBoundary fallback={SectionError}>
  <UserStats />
</ErrorBoundary>

<ErrorBoundary fallback={SectionError}>
  <RecentActivity />
</ErrorBoundary>
```

### Error boundary TUTMAYDI:
- Event handlers → `try/catch` ishlating
- Async code → `try/catch` ishlating
- SSR xatolari
- O'z ichidagi xatolar

### react-error-boundary library (tavsiya)

```jsx
import { ErrorBoundary, useErrorBoundary } from "react-error-boundary";

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div>
      <h2>Xatolik: {error.message}</h2>
      <button onClick={resetErrorBoundary}>Qayta urinish</button>
    </div>
  );
}

<ErrorBoundary
  FallbackComponent={ErrorFallback}
  onError={(error, info) => logError(error, info)}
  onReset={() => { /* cleanup state */ }}
>
  <Dashboard />
</ErrorBoundary>

// Hook — event handlerda xato throw qilish
function UserCard({ userId }) {
  const { showBoundary } = useErrorBoundary();
  const loadUser = async () => {
    try { await fetchUser(userId); }
    catch (err) { showBoundary(err); } // boundary'ga uzatish
  };
}
```

---

## 🧠 Intervyu savollari

1. Error boundary nima, nima uchun class?
2. `getDerivedStateFromError` vs `componentDidCatch` farqi?
3. Error boundary nima tutmaydi?
4. Granular error boundary qachon kerak?

---

## 🎯 Masalalar

```jsx
// withErrorBoundary HOC
function withErrorBoundary(Component, FallbackComponent) { }

// useErrorHandler — async xatolarni boundary'ga uzatish
function useErrorHandler() { }
```
