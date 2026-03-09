# 01 - JSX and Rendering

## Nazariya

### JSX nima?
JSX - JavaScript XML. React elementlarini HTML ga o'xshash sintaksis bilan yozish imkonini beradi.

```jsx
// JSX
const element = <h1 className="title">Salom</h1>;

// Compile bo'lgandan keyin
const element = React.createElement("h1", { className: "title" }, "Salom");
```

### JSX qoidalar
```jsx
// 1. Bitta root element
return (
  <div>
    <h1>Title</h1>
    <p>Text</p>
  </div>
);

// Fragment - DOM ga qo'shilmaydi
return (
  <>
    <h1>Title</h1>
    <p>Text</p>
  </>
);

// 2. className, htmlFor (HTML atributlari)
<div className="box">
<label htmlFor="name">

// 3. Expressions - {} ichida
const name = "Ali";
<h1>Salom, {name}!</h1>
<h1>2 + 2 = {2 + 2}</h1>
<div>{isLoggedIn ? "Xush kelibsiz" : "Kiring"}</div>

// 4. Self-closing tags
<img src="..." />
<input type="text" />
<MyComponent />
```

### React rendering qanday ishlaydi?
```
1. State/Props o'zgaradi
2. Component re-render bo'ladi (Virtual DOM yangilanadi)
3. React diffing algorithm (Reconciliation)
4. Faqat o'zgargan qismlar Real DOM ga yoziladi
```

### Conditional rendering
```jsx
// &&
{isLoggedIn && <UserPanel />}

// ternary
{loading ? <Spinner /> : <Content />}

// early return
if (error) return <Error message={error} />;
if (loading) return <Loading />;
return <Content data={data} />;
```

### List rendering
```jsx
const items = ["Ali", "Vali", "Soli"];
return (
  <ul>
    {items.map((item, index) => (
      <li key={item}>{item}</li>  // key muhim!
    ))}
  </ul>
);
```

### key prop - nima uchun muhim?
```jsx
// key React ga qaysi element qaysi ekanini ko'rsatadi
// Index ishlatish - yomon (list tartib o'zgarsa)
{items.map((item, i) => <li key={i}>{item}</li>)} // xavfli

// Unique ID ishlatish - yaxshi
{items.map(item => <li key={item.id}>{item.name}</li>)} // to'g'ri
```

---

## Intervyu savollari
1. JSX nima va u qanday ishlaydi?
2. `key` prop nima uchun kerak?
3. Virtual DOM nima?
4. Reconciliation nima?
5. Index ni `key` sifatida ishlatish nima uchun yomon?

---

## Masalalar

### Masala 1
```jsx
// UserCard component yozing
// Props: name, email, avatar, role
// Conditional: role === "admin" bo'lsa badge ko'rsatsin
function UserCard({ name, email, avatar, role }) { }
```

### Masala 2
```jsx
// ProductList component
// filtering, sorting bilan
function ProductList({ products }) {
  // filter by category
  // sort by price
}
```
