// 13 — Forms & Validation | Examples
import { useState, useRef } from "react";

// useForm hook
function useForm({ initialValues, validate, onSubmit }) {
  const [values,       setValues]   = useState(initialValues);
  const [errors,       setErrors]   = useState({});
  const [touched,      setTouched]  = useState({});
  const [isSubmitting, setSub]      = useState(false);

  const handleChange = ({ target: { name, value, type, checked } }) => {
    const val = type === "checkbox" ? checked : value;
    setValues(p => ({ ...p, [name]: val }));
    if (touched[name] && validate)
      setErrors(validate({ ...values, [name]: val }));
  };

  const handleBlur = ({ target: { name } }) => {
    setTouched(p => ({ ...p, [name]: true }));
    if (validate) setErrors(validate(values));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setTouched(Object.keys(values).reduce((a,k) => ({...a,[k]:true}), {}));
    if (validate) {
      const errs = validate(values);
      setErrors(errs);
      if (Object.keys(errs).length) return;
    }
    setSub(true);
    try { await onSubmit(values); } finally { setSub(false); }
  };

  const reset = () => { setValues(initialValues); setErrors({}); setTouched({}); };

  return { values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit, reset };
}

// Login form example
function LoginForm({ onSubmit }) {
  const validate = (v) => {
    const e = {};
    if (!v.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = "Email noto'g'ri";
    if (v.password.length < 6) e.password = "Kamida 6 belgi";
    return e;
  };

  const { values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit } =
    useForm({ initialValues: { email: "", password: "" }, validate, onSubmit });

  const field = (name, type = "text") => ({
    name, type,
    value: values[name],
    onChange: handleChange,
    onBlur: handleBlur,
  });

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div>
        <input {...field("email")} placeholder="Email" />
        {touched.email && errors.email && <p style={{ color: "red", fontSize: 12 }}>{errors.email}</p>}
      </div>
      <div>
        <input {...field("password", "password")} placeholder="Parol" />
        {touched.password && errors.password && <p style={{ color: "red", fontSize: 12 }}>{errors.password}</p>}
      </div>
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Kirish..." : "Kirish"}
      </button>
    </form>
  );
}

// Multi-step form
function MultiStepForm() {
  const [step,  setStep]  = useState(0);
  const [data,  setData]  = useState({});

  const steps = [
    { title: "Shaxsiy ma'lumot", fields: ["firstName", "lastName"] },
    { title: "Kontakt",          fields: ["email", "phone"] },
    { title: "Tasdiqlash",       fields: [] },
  ];

  const next   = (stepData) => { setData(p => ({...p, ...stepData})); setStep(s => s + 1); };
  const back   = ()         => setStep(s => s - 1);
  const submit = ()         => console.log("Final data:", data);

  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {steps.map((s, i) => (
          <span key={i} style={{ fontWeight: i === step ? "bold" : "normal", color: i < step ? "green" : "inherit" }}>
            {s.title}
          </span>
        ))}
      </div>
      {step === 0 && <Step1 onNext={next} />}
      {step === 1 && <Step2 onNext={next} onBack={back} />}
      {step === 2 && <Step3 data={data} onSubmit={submit} onBack={back} />}
    </div>
  );
}

function Step1({ onNext }) {
  const [firstName, setFirstName] = useState("");
  const [lastName,  setLastName]  = useState("");
  return (
    <div>
      <input placeholder="Ism"     value={firstName} onChange={e => setFirstName(e.target.value)} />
      <input placeholder="Familya" value={lastName}  onChange={e => setLastName(e.target.value)} />
      <button onClick={() => onNext({ firstName, lastName })}>Keyingi</button>
    </div>
  );
}
function Step2({ onNext, onBack }) {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  return (
    <div>
      <input placeholder="Email"  value={email} onChange={e => setEmail(e.target.value)} />
      <input placeholder="Telefon" value={phone} onChange={e => setPhone(e.target.value)} />
      <button onClick={onBack}>Orqaga</button>
      <button onClick={() => onNext({ email, phone })}>Keyingi</button>
    </div>
  );
}
function Step3({ data, onSubmit, onBack }) {
  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <button onClick={onBack}>Orqaga</button>
      <button onClick={onSubmit}>Yuborish</button>
    </div>
  );
}

export { useForm, LoginForm, MultiStepForm };
