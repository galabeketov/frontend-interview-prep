# 10 - Component Patterns

## Nazariya

### Compound Components
```jsx
// Tab bilan Tab.Panel birgalikda ishlaydi
function Tabs({ children, defaultTab }) {
  const [active, setActive] = useState(defaultTab);
  return (
    <TabsContext.Provider value={{ active, setActive }}>
      {children}
    </TabsContext.Provider>
  );
}
Tabs.Tab = function Tab({ id, children }) {
  const { active, setActive } = useContext(TabsContext);
  return <button onClick={() => setActive(id)} className={active === id ? "active" : ""}>{children}</button>;
};
Tabs.Panel = function Panel({ id, children }) {
  const { active } = useContext(TabsContext);
  return active === id ? <div>{children}</div> : null;
};

// Ishlatish
<Tabs defaultTab="profile">
  <Tabs.Tab id="profile">Profil</Tabs.Tab>
  <Tabs.Tab id="settings">Sozlamalar</Tabs.Tab>
  <Tabs.Panel id="profile"><ProfileForm /></Tabs.Panel>
  <Tabs.Panel id="settings"><SettingsForm /></Tabs.Panel>
</Tabs>
```

### Render Props
```jsx
function DataFetcher({ url, render }) {
  const { data, loading } = useFetch(url);
  return render({ data, loading });
}

// Ishlatish
<DataFetcher url="/api/users" render={({ data, loading }) => (
  loading ? <Spinner /> : <UserList users={data} />
)} />
```

### HOC (Higher Order Component)
```jsx
function withAuth(Component) {
  return function AuthenticatedComponent(props) {
    const { isAuthenticated } = useAuth();
    if (!isAuthenticated) return <Redirect to="/login" />;
    return <Component {...props} />;
  };
}

const ProtectedDashboard = withAuth(Dashboard);
```

### Controlled vs Uncontrolled
```jsx
// Controlled - parent boshqaradi
function ControlledInput({ value, onChange }) {
  return <input value={value} onChange={onChange} />;
}

// Uncontrolled - internal state
function UncontrolledInput({ defaultValue, onSubmit }) {
  const ref = useRef();
  return (
    <form onSubmit={() => onSubmit(ref.current.value)}>
      <input ref={ref} defaultValue={defaultValue} />
    </form>
  );
}
```

---

## Masalalar

### Masala 1
```jsx
// Accordion compound component
// Accordion, Accordion.Item, Accordion.Header, Accordion.Body
// allowMultiple prop
```

### Masala 2
```jsx
// withLoading HOC - loading va error state
function withLoading(Component) { }
```
