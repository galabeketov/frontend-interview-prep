# 13 — Forms & Validation

## 📖 Nazariya

### Controlled vs Uncontrolled

```jsx
// Controlled — React state boshqaradi
function ControlledInput() {
  const [value, setValue] = useState("");
  return <input value={value} onChange={e => setValue(e.target.value)} />;
}

// Uncontrolled — DOM boshqaradi (ref bilan)
function UncontrolledInput() {
  const ref = useRef(null);
  const handleSubmit = () => console.log(ref.current.value);
  return <input ref={ref} defaultValue="" />;
}
```

### useForm custom hook

```jsx
function useForm({ initialValues, validate, onSubmit }) {
  const [values,      setValues]      = useState(initialValues);
  const [errors,      setErrors]      = useState({});
  const [touched,     setTouched]     = useState({});
  const [isSubmitting, setSubmitting] = useState(false);

  const handleChange = ({ target: { name, value, type, checked } }) => {
    const val = type === "checkbox" ? checked : value;
    setValues(prev => ({ ...prev, [name]: val }));
    if (touched[name] && validate)
      setErrors(validate({ ...values, [name]: val }));
  };

  const handleBlur = ({ target: { name } }) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    if (validate) setErrors(validate(values));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const allTouched = Object.keys(values).reduce((a,k) => ({...a,[k]:true}), {});
    setTouched(allTouched);
    if (validate) {
      const errs = validate(values);
      setErrors(errs);
      if (Object.keys(errs).length) return;
    }
    setSubmitting(true);
    try { await onSubmit(values); } finally { setSubmitting(false); }
  };

  const reset = () => { setValues(initialValues); setErrors({}); setTouched({}); };

  return { values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit, reset };
}
```

### Validation

```jsx
function validate(values) {
  const errors = {};
  if (!values.name.trim())
    errors.name = "Ism kiritish shart";
  if (!values.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
    errors.email = "Email noto'g'ri";
  if (values.password.length < 8)
    errors.password = "Parol 8 belgidan ko'p bo'lishi kerak";
  if (values.password !== values.confirm)
    errors.confirm = "Parollar mos emas";
  return errors;
}
```

### React Hook Form (library)

```jsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  name:     z.string().min(2, "Kamida 2 belgi"),
  email:    z.string().email("Noto'g'ri email"),
  password: z.string().min(8, "Kamida 8 belgi"),
});

function RegisterForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    await registerUser(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("name")} placeholder="Ism" />
      {errors.name && <p>{errors.name.message}</p>}

      <input {...register("email")} placeholder="Email" />
      {errors.email && <p>{errors.email.message}</p>}

      <input {...register("password")} type="password" />
      {errors.password && <p>{errors.password.message}</p>}

      <button disabled={isSubmitting}>
        {isSubmitting ? "Yuborilmoqda..." : "Ro'yxatdan o'tish"}
      </button>
    </form>
  );
}
```

---

## 🧠 Intervyu savollari

1. Controlled vs Uncontrolled component farqi?
2. Form validation qanday qilasiz?
3. React Hook Form nima uchun yaxshi?
4. Zod/Yup validation library nima?

---

## 🎯 Masalalar

```jsx
// Masala 1: Multi-step form
function MultiStepForm({ steps }) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({});
  // step 1: personal info, step 2: contacts, step 3: confirm
}

// Masala 2: Field array (dinamik fields)
// users = [{ name, email }] — qo'shish/o'chirish
```
