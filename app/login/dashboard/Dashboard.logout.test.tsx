import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DashboardPage from "./page";
import { AuthContext } from "@/context/AuthContext";

const mockReplace = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    replace: mockReplace,
  }),
}));

test("logout tıklanınca user temizlenir ve login'e gider", async () => {
  const userEventInstance = userEvent.setup();

  const logoutMock = jest.fn();

  render(
    <AuthContext.Provider
      value={{
        user: { email: "test@test.com" },
        setUser: jest.fn(),
        logout: logoutMock,
      }}
    >
      <DashboardPage />
    </AuthContext.Provider>
  );

  await userEventInstance.click(screen.getByText("Çıkış Yap"));

  expect(logoutMock).toHaveBeenCalled();
  expect(mockReplace).toHaveBeenCalledWith("/login");
});
