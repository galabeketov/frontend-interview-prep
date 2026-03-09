// 10 - Component Patterns - Examples

import { createContext, useContext, useState } from "react";

// Masala 1 - Accordion
const AccordionContext = createContext();

function Accordion({ children, allowMultiple = false }) {
  const [openItems, setOpenItems] = useState(new Set());

  const toggle = (id) => {
    setOpenItems(prev => {
      const next = new Set(allowMultiple ? prev : []);
      prev.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <AccordionContext.Provider value={{ openItems, toggle }}>
      <div className="accordion">{children}</div>
    </AccordionContext.Provider>
  );
}

Accordion.Item = function AccordionItem({ id, children }) {
  const { openItems, toggle } = useContext(AccordionContext);
  const isOpen = openItems.has(id);
  return (
    <div className="accordion-item">
      {children({ isOpen, toggle: () => toggle(id) })}
    </div>
  );
};

// Usage
function FAQ() {
  return (
    <Accordion allowMultiple>
      {[{ id: 1, q: "Savol 1", a: "Javob 1" }, { id: 2, q: "Savol 2", a: "Javob 2" }].map(item => (
        <Accordion.Item key={item.id} id={item.id}>
          {({ isOpen, toggle }) => (
            <>
              <button onClick={toggle}>{item.q} {isOpen ? "-" : "+"}</button>
              {isOpen && <p>{item.a}</p>}
            </>
          )}
        </Accordion.Item>
      ))}
    </Accordion>
  );
}

// Masala 2 - withLoading HOC
function withLoading(Component) {
  return function WithLoadingComponent({ loading, error, ...props }) {
    if (loading) return <div className="loading">Yuklanmoqda...</div>;
    if (error) return <div className="error">{error}</div>;
    return <Component {...props} />;
  };
}

const UserListWithLoading = withLoading(function UserList({ users }) {
  return <ul>{users.map(u => <li key={u.id}>{u.name}</li>)}</ul>;
});
