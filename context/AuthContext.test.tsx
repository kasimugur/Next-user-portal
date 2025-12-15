import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { AuthProvider, useAuth } from "./AuthContext";

const TestComponent = () => {
  const { user, setUser } = useAuth();

  return (
    <div>
      <span data-testid="email">{user?.email ?? "no-user"}</span>
      <button onClick={() => setUser({ email: "test@test.com" })}>
        Set User
      </button>
    </div>
  );
};

describe("AuthContext", () => {
  test("default user null", () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByTestId("email")).toHaveTextContent("no-user");
  });

  test("setUser updates user state", async () => {
    const user = userEvent.setup();

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await user.click(screen.getByText("Set User"));

    expect(screen.getByTestId("email")).toHaveTextContent("test@test.com");
  });

  test("useAuth outside provider throws error", () => {
    const BrokenComponent = () => {
      useAuth();
      return null;
    };

    expect(() => render(<BrokenComponent />)).toThrow(
      "useAuth must be used inside <AuthProvider>"
    );
  });
});
