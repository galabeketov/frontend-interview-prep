// 03 - useState - Examples

import { useState, useMemo } from "react";

// Masala 1 - Shopping Cart
function ShoppingCart() {
  const [items, setItems] = useState([]);

  const addItem = (product) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) {
        return prev.map(i => i.id === product.id
          ? { ...i, qty: i.qty + 1 }
          : i
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeItem = (id) => setItems(prev => prev.filter(i => i.id !== id));

  const updateQuantity = (id, qty) => {
    if (qty <= 0) return removeItem(id);
    setItems(prev => prev.map(i => i.id === id ? { ...i, qty } : i));
  };

  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.qty, 0),
    [items]
  );

  return (
    <div>
      {items.map(item => (
        <div key={item.id}>
          <span>{item.name}</span>
          <button onClick={() => updateQuantity(item.id, item.qty - 1)}>-</button>
          <span>{item.qty}</span>
          <button onClick={() => updateQuantity(item.id, item.qty + 1)}>+</button>
          <button onClick={() => removeItem(item.id)}>X</button>
        </div>
      ))}
      <strong>Jami: {total} so'm</strong>
    </div>
  );
}

// Masala 2 - useForm
function useForm(initialValues, validate) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
    if (touched[name] && validate) {
      const errs = validate({ ...values, [name]: value });
      setErrors(errs);
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    if (validate) setErrors(validate(values));
  };

  const handleSubmit = (onSubmit) => (e) => {
    e.preventDefault();
    const allTouched = Object.keys(initialValues).reduce(
      (acc, k) => ({ ...acc, [k]: true }), {}
    );
    setTouched(allTouched);
    if (validate) {
      const errs = validate(values);
      setErrors(errs);
      if (Object.keys(errs).length > 0) return;
    }
    onSubmit(values);
  };

  return { values, errors, touched, handleChange, handleBlur, handleSubmit };
}
