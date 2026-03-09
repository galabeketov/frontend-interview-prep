# 02 - Components and Props

## Nazariya

### Component turlari
```jsx
// Function Component (zamonaviy)
function Button({ label, onClick, variant = "primary", disabled = false }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`btn btn-${variant}`}
    >
      {label}
    </button>
  );
}

// Props destructuring + default values
function Card({ title, children, className = "", style = {} }) {
  return (
    <div className={`card ${className}`} style={style}>
      <h2>{title}</h2>
      {children}
    </div>
  );
}
```

### Props patterns

```jsx
// Spread props
function Input({ className, ...rest }) {
  return <input className={`input ${className}`} {...rest} />;
}

// Render prop
function List({ items, renderItem }) {
  return <ul>{items.map((item, i) => <li key={i}>{renderItem(item)}</li>)}</ul>;
}

// Children patterns
function Modal({ children, title, footer }) {
  return (
    <div className="modal">
      <header>{title}</header>
      <main>{children}</main>
      {footer && <footer>{footer}</footer>}
    </div>
  );
}
```

### Props immutability
```jsx
// Props o'zgartirib bo'lmaydi!
function Wrong({ user }) {
  user.name = "Ali"; // xato! props mutate qilinmaydi
}

function Right({ user, onUpdate }) {
  onUpdate({ ...user, name: "Ali" }); // to'g'ri - callback orqali
}
```

---

## Masalalar

### Masala 1
```jsx
// Flexible Button component
// variant: primary | secondary | danger | ghost
// size: sm | md | lg
// loading state - spinner
// icon prop
```

### Masala 2
```jsx
// DataTable component
// columns: [{key, label, render?}]
// data: array
// sortable, pagination
```
