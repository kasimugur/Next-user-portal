import { AuthContext, AuthContextType } from "@/context/AuthContext";
import { render, screen, waitFor } from "@testing-library/react";
import { useRouter } from "next/navigation";
import ProtectedRoute from "./ProtectedRoute";

const mockPush = jest.fn();

jest.mock("next/navigation", ()=> ({
  useRouter:()=> ({
    replace:mockPush,
  }),
}));

const renderWithAuth = (user:any) => {
  const value: AuthContextType = {
    user,
    setUser: jest.fn(),
  };
  return render(
    <AuthContext.Provider  value={value}>
       <ProtectedRoute>
        <div>SECRET</div>
      </ProtectedRoute>
    </AuthContext.Provider>

  )
}
describe("ProtectedRoute",()=>{
  test("user yoksa logine yölendirir", async()=>{
    renderWithAuth(null);
    await waitFor(()=> {
      expect(mockPush).toHaveBeenCalledWith("/login")
    })
  })
test("user varsa içeriği render eder", () => {
    renderWithAuth({ email: "test@test.com" });

    expect(screen.getByText("SECRET")).toBeInTheDocument();
  });

})