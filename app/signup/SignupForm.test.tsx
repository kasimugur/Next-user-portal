import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event"
import SignupForm from "./SignupForm";
import { server } from "@/mocks/server";
import { http, HttpResponse } from "msw";


describe("signupForm", () => {
  const fn = jest.fn();
  const user = userEvent.setup();
  const signUpConfirm = () => user.click(screen.getByText("Kayıt Ol"));

  test(("inputlar render oluyor ve hata gösteriyor (email boş)"), async () => {

    render(<SignupForm onSubmit={fn} />);

    await signUpConfirm()
    expect(screen.getByRole("alert")).toHaveTextContent("Email gerekli")
  })

  test("password confirm eşleşmiyorsa hata gösterir", async () => {

    render(<SignupForm onSubmit={fn} />);

    await user.type(screen.getByPlaceholderText("Email"), "test@test.com");
    await user.type(screen.getByPlaceholderText("Password"), "123456");
    await user.type(screen.getByPlaceholderText("Password confirm"), "654321");

    await signUpConfirm()
    expect(screen.getByRole("alert")).toHaveTextContent("Şifreler eşleşmiyor")
  })
  test("başarılı kayıt onSubmit tetikler (MSW success)", async () => {
    
    render(<SignupForm onSubmit={fn} />)
    
    await user.type(screen.getByPlaceholderText("Email"), "new@test.com");
    await user.type(screen.getByPlaceholderText("Password"), "123456");
    await user.type(screen.getByPlaceholderText("Password confirm"), "123456");
    
    await signUpConfirm()

    await waitFor(() => {
      expect(fn).toHaveBeenCalledWith({
        email: "new@test.com",
        password: "123456"
      })
    })
  })
  test("zaten kayıtlı email -> hata gösterir (MSW 409)", async()=>{
    render(<SignupForm onSubmit={fn} />);
    
    await user.type(screen.getByPlaceholderText("Email"), "exists@test.com");
    await user.type(screen.getByPlaceholderText("Password"), "123456");
    await user.type(screen.getByPlaceholderText("Password confirm"), "123456");
    
    await signUpConfirm()
    
    server.use(
    http.post("/api/signup", async () => {
      return HttpResponse.json(
        { success: false, message: "Email zaten kayıtlı" },
        { status: 409 }
      );
    })
  );
  })

})