// mocks/handlers.ts
import { http, HttpResponse } from "msw";

interface LoginRequestBody {
  email: string;
  password: string;
}

export const handlers = [
  http.post("/api/login", async ({ request }) => {
    console.log('🎯 MSW Handler called for /api/login');
    
    const body = (await request.json()) as LoginRequestBody;
    const { email, password } = body;

    console.log('📧 Email:', email);
    console.log('🔐 Password:', password);

    if (email === "test@test.com" && password === "123456") {
      console.log('✅ Login successful');
      return HttpResponse.json(
        { success: true, token: "mock-token" },
        { status: 200 }
      );
    }

    console.log('❌ Login failed');
    return HttpResponse.json(
      { success: false, message: "Invalid credentials" },
      { status: 401 }
    );
  }),
];