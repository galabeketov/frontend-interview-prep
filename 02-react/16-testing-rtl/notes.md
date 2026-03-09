# 16 — Testing (Jest + RTL)

## 📖 Nazariya

**React Testing Library** — user behaviour'ga asoslanib test yozish.

> "Test implementation details emas, user behaviour'ni test qiling."

### Setup

```bash
npm install --save-dev @testing-library/react @testing-library/user-event jest
```

### Asosiy API

```jsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

test("button click", async () => {
  const user = userEvent.setup();
  render(<Counter />);

  const button = screen.getByRole("button", { name: /increment/i });
  await user.click(button);

  expect(screen.getByText("1")).toBeInTheDocument();
});
```

### Query turlari

```jsx
// getBy   — 1 ta topilishi shart, yo'q bo'lsa throw
// queryBy — topilmasa null qaytaradi
// findBy  — async, Promise qaytaradi

screen.getByText("Hello");
screen.getByRole("button", { name: /submit/i });
screen.getByLabelText("Email");
screen.getByPlaceholderText("Enter email");
screen.getByTestId("submit-btn");

// Prioritet tartibi (eng yaxshidan to'g'rigacha):
// 1. getByRole        — accessibility
// 2. getByLabelText   — form
// 3. getByPlaceholder — input
// 4. getByText        — matn
// 5. getByTestId      — oxirgi chora
```

### Async test

```jsx
test("fetches and displays users", async () => {
  // API mock
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: async () => [{ id: 1, name: "Ali" }],
  });

  render(<UserList />);

  expect(screen.getByText(/loading/i)).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.getByText("Ali")).toBeInTheDocument();
  });
});
```

### Custom hook test

```jsx
import { renderHook, act } from "@testing-library/react";

test("useCounter", () => {
  const { result } = renderHook(() => useCounter(0));

  act(() => result.current.increment());
  expect(result.current.count).toBe(1);

  act(() => result.current.reset());
  expect(result.current.count).toBe(0);
});
```

### Mock

```jsx
// Module mock
jest.mock("./api", () => ({
  fetchUser: jest.fn().mockResolvedValue({ id: 1, name: "Ali" }),
}));

// Spy
const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});

// Timer mock
jest.useFakeTimers();
act(() => jest.advanceTimersByTime(1000));
jest.useRealTimers();
```

---

## 🧠 Intervyu savollari

1. RTL falsafasi nima?
2. `getBy`, `queryBy`, `findBy` farqi?
3. Query prioriteti qanday?
4. `userEvent` vs `fireEvent` farqi?
5. Custom hook qanday test qilinadi?

---

## 🎯 Masalalar

```jsx
// Quyidagilarni test qiling:

// 1. LoginForm — valid/invalid submit
// 2. useDebounce — debounce ishlashi
// 3. UserList — fetch, loading, error holatlari
```
