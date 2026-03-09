// 16 — Testing (RTL) | Examples
// Bu fayllar .test.jsx extension bilan saqlash kerak

// -----------------------------------------
// 1. Button test
// -----------------------------------------
// import { render, screen } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";

/*
test("Counter increment/decrement", async () => {
  const user = userEvent.setup();
  render(<Counter initialCount={0} />);

  const incrementBtn = screen.getByRole("button", { name: /\+/i });
  const decrementBtn = screen.getByRole("button", { name: /-/i });
  const display      = screen.getByTestId("count-display");

  expect(display).toHaveTextContent("0");

  await user.click(incrementBtn);
  expect(display).toHaveTextContent("1");

  await user.click(incrementBtn);
  await user.click(incrementBtn);
  expect(display).toHaveTextContent("3");

  await user.click(decrementBtn);
  expect(display).toHaveTextContent("2");
});
*/

// -----------------------------------------
// 2. Form validation test
// -----------------------------------------
/*
test("LoginForm — shows errors on invalid submit", async () => {
  const user    = userEvent.setup();
  const onSubmit = jest.fn();

  render(<LoginForm onSubmit={onSubmit} />);

  // bo'sh submit
  await user.click(screen.getByRole("button", { name: /kirish/i }));

  expect(screen.getByText(/email noto'g'ri/i)).toBeInTheDocument();
  expect(onSubmit).not.toHaveBeenCalled();

  // to'g'ri ma'lumot kiritish
  await user.type(screen.getByPlaceholderText(/email/i), "test@mail.com");
  await user.type(screen.getByPlaceholderText(/parol/i), "password123");
  await user.click(screen.getByRole("button", { name: /kirish/i }));

  expect(onSubmit).toHaveBeenCalledWith({ email: "test@mail.com", password: "password123" });
});
*/

// -----------------------------------------
// 3. Async fetch test
// -----------------------------------------
/*
test("UserList — fetch, loading, success", async () => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: async () => [{ id: 1, name: "Ali" }, { id: 2, name: "Vali" }],
  });

  render(<UserList url="/api/users" />);

  // loading state
  expect(screen.getByText(/yuklanmoqda/i)).toBeInTheDocument();

  // data kelgach
  await waitFor(() => {
    expect(screen.getByText("Ali")).toBeInTheDocument();
    expect(screen.getByText("Vali")).toBeInTheDocument();
  });

  expect(screen.queryByText(/yuklanmoqda/i)).not.toBeInTheDocument();
});
*/

// -----------------------------------------
// 4. Custom hook test
// -----------------------------------------
/*
import { renderHook, act } from "@testing-library/react";

test("useDebounce", async () => {
  jest.useFakeTimers();
  const { result, rerender } = renderHook(({ val }) => useDebounce(val, 300), {
    initialProps: { val: "initial" },
  });

  expect(result.current).toBe("initial");

  rerender({ val: "updated" });
  expect(result.current).toBe("initial");  // hali o'zgarmagan

  act(() => jest.advanceTimersByTime(300));
  expect(result.current).toBe("updated");  // endi o'zgardi

  jest.useRealTimers();
});
*/

export {};   // module sifatida
